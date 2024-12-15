import { describe, expect, it } from "@jest/globals";
import bundleChunks from "./bundleChunks";

describe("bundleChunks", () => {
  it("should throw an error if an empty array is provided", () => {
    expect(() => bundleChunks([], [])).toThrow(new Error("EMPTY_CHUNK"));
  });
});