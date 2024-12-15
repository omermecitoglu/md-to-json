import type { Token } from "~/types/token";
import getTokenCloserType from "./getTokenCloserType";

export default function findNextCloserIndex(tokens: Token[]) {
  const nextToken = tokens[0];
  if (!nextToken) return 0;
  const closerType = getTokenCloserType(nextToken.type);
  if (!closerType) throw new Error("UNKNOWN_CLOSER_TYPE", { cause: nextToken.type });
  const closerIndex = tokens.findIndex(t => t.type === closerType);
  return Math.max(0, closerIndex);
}
