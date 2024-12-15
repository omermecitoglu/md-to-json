import { describe, expect, it } from "@jest/globals";
import getContentOfTokenChunk from "./getContentOfTokenChunk";

describe("getContentOfTokenChunk", () => {
  it("should handle nexted chunks", () => {
    const input = [
      { type: "bullet_list_open", content: "unimportant content" },

      { type: "list_item_open", content: "unimportant content" },
      { type: "paragraph_open", content: "unimportant content" },
      { type: "inline", content: "unimportant content" },
      { type: "paragraph_close", content: "unimportant content" },
      { type: "list_item_close", content: "unimportant content" },

      { type: "list_item_open", content: "unimportant content" },
      { type: "paragraph_open", content: "unimportant content" },
      { type: "inline", content: "unimportant content" },
      { type: "paragraph_close", content: "unimportant content" },
      { type: "list_item_close", content: "unimportant content" },

      { type: "bullet_list_close", content: "unimportant content" },
    ];
    const output = getContentOfTokenChunk(input);
    expect(output).toStrictEqual([
      [
        "unimportant content",
        "unimportant content",
      ],
    ]);
  });

  it("should throw an error when the internal part is empty", () => {
    const input = [
      { type: "paragraph_open", content: "unimportant content" },
      { type: "paragraph_close", content: "unimportant content" },
    ];
    expect(() => getContentOfTokenChunk(input)).toThrow(new Error("IRREGULAR_CHUNK"));
  });

  it("should throw an error when the only internal token in the chunk is not inline", () => {
    const input = [
      { type: "paragraph_open", content: "unimportant content" },
      { type: "not_inline", content: "unimportant content" },
      { type: "paragraph_close", content: "unimportant content" },
    ];
    expect(() => getContentOfTokenChunk(input)).toThrow(new Error("IRREGULAR_CHUNK"));
  });
});
