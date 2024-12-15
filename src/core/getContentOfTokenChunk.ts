import type { Section } from "~/types/section";
import type { Token } from "~/types/token";
import chunkifyTokens from "./chunkifyTokens";

export default function getContentOfTokenChunk(chunk: Token[]): Section["content"] {
  if (chunk[0]?.type === "fence") {
    return [chunk[0].content];
  }
  const internalPart = chunk.slice(1, -1);
  if (internalPart.length < 1) throw new Error("IRREGULAR_CHUNK", { cause: chunk });
  if (internalPart.length > 1) {
    const tokenChunks = chunkifyTokens(internalPart);
    return [tokenChunks.map(subChunk => {
      return getContentOfTokenChunk(subChunk).join("\n");
    })];
  } else {
    const token = internalPart[0] as Token;
    if (token.type === "inline") {
      return [token.content];
    } else {
      throw new Error("IRREGULAR_CHUNK", { cause: chunk });
    }
  }
}
