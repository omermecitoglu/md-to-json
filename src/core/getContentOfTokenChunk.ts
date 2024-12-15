import type { Token } from "~/types/token";
import chunkifyTokens from "./chunkifyTokens";

export default function getContentOfTokenChunk(chunk: Token[]): string[] {
  if (chunk[0]?.type === "fence") {
    return [chunk[0].content];
  }
  const internalPart = chunk.slice(1, -1);
  if (internalPart.length < 1) throw new Error("IRREGULAR_CHUNK", { cause: chunk });
  if (internalPart.length > 1) {
    const tokenChunks = chunkifyTokens(internalPart);
    return tokenChunks.map<string>(subChunk => {
      return getContentOfTokenChunk(subChunk).join("\n");
    });
  } else {
    const token = internalPart[0] as Token;
    if (token.type === "inline") {
      return [token.content];
    } else {
      throw new Error("IRREGULAR_CHUNK", { cause: chunk });
    }
  }
}
