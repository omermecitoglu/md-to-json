import type { Token } from "~/types/token";
import findNextCloserIndex from "./findNextCloserIndex";

export default function chunkifyTokens(tokens: Token[]) {
  const clone = [...tokens];
  const slices = [] as Token[][];
  while (clone.length) {
    const slice = clone.splice(0, findNextCloserIndex(clone) + 1);
    slices.push(slice);
  }
  return slices;
}
