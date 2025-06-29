import { describe, expect, it } from "vitest";
import findNextCloserIndex from "./findNextCloserIndex";

describe("findNextCloserIndex", () => {
  it("should return the index of first closer in a collection of tokens", () => {
    const input = [
      { type: "paragraph_open", content: "unimportant content" },
      { type: "paragraph_close", content: "unimportant content" },
    ];
    const output = findNextCloserIndex(input);
    expect(output).toBe(1);
  });

  it("should return 0 if the provided collection is empty", () => {
    const output = findNextCloserIndex([]);
    expect(output).toBe(0);
  });

  it("should throw an error if it finds an unknown closer type", () => {
    const input = [
      { type: "unknown_open", content: "unimportant content" },
      { type: "unknown_close", content: "unimportant content" },
    ];
    expect(() => findNextCloserIndex(input)).toThrow("UNKNOWN_CLOSER_TYPE");
  });
});
