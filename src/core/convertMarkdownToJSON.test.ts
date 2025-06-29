import { describe, expect, it, vi } from "vitest";
import normalizeMarkDown from "~/utils/normalizeMarkDown";
import convertMarkdownToJSON from "./convertMarkdownToJSON";

describe("convertMarkdownToJSON", () => {
  it("should convert a markdown string to a JSON object", () => {
    const input = normalizeMarkDown(`
      # The most useful node module

      description of the most useful node module in the world

      ## Installation

      \`\`\`bash
      npm install my - node - module
      \`\`\`

      ## Usage

      \`\`\`javascript
      import { usefulFunction } from "my-node-module"

      // Example usage
      const output = usefulFunction("input");
      console.log(output);
      \`\`\`

      ## License

      This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
    `);
    const output = convertMarkdownToJSON(input);
    expect(output).toStrictEqual({
      success: true,
      sections: [
        {
          title: "The most useful node module",
          content: [
            "description of the most useful node module in the world",
          ],
        },
        {
          title: "Installation",
          content: [
            "npm install my - node - module\n",
          ],
        },
        {
          title: "Usage",
          content: [
            [
              'import { usefulFunction } from "my-node-module"',
              "",
              "// Example usage",
              'const output = usefulFunction("input");',
              "console.log(output);",
              "",
            ].join("\n"),
          ],
        },
        {
          title: "License",
          content: [
            "This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.",
          ],
        },
      ],
    });
  });

  it("should handle content without heading", () => {
    const input = normalizeMarkDown(`
      some descriptive text without heading

      # Header

      description under the header
    `);
    const output = convertMarkdownToJSON(input);
    expect(output).toStrictEqual({
      success: true,
      sections: [
        {
          content: [
            "some descriptive text without heading",
          ],
        },
        {
          title: "Header",
          content: [
            "description under the header",
          ],
        },
      ],
    });
  });

  it("should handle bullet lists correctly", () => {
    const input = normalizeMarkDown(`
      # To Do List

      - [] Wake up early.
      - [] Have breakfast.
      - [] Take a short walk.
      - [] Complete pending tasks.
    `);
    const output = convertMarkdownToJSON(input);
    expect(output).toStrictEqual({
      success: true,
      sections: [
        {
          title: "To Do List",
          content: [
            [
              "[] Wake up early.",
              "[] Have breakfast.",
              "[] Take a short walk.",
              "[] Complete pending tasks.",
            ],
          ],
        },
      ],
    });
  });

  it("should handle a list and text in the same section", () => {
    const input = normalizeMarkDown(`
      # Header

      - 1
      - 2
      - 3

      text with a list
    `);
    const output = convertMarkdownToJSON(input);
    expect(output).toStrictEqual({
      success: true,
      sections: [
        {
          title: "Header",
          content: [
            ["1", "2", "3"],
            "text with a list",
          ],
        },
      ],
    });
  });

  it("should return an unsuccessful result when there is an internal error thrown", async () => {
    const module = await import("./findNextCloserIndex");
    const spy = vi.spyOn(module, "default").mockImplementation(() => {
      throw new Error("UNKNOWN_CLOSER_TYPE", { cause: "test" });
    });
    const output = convertMarkdownToJSON("# Header");
    expect(output).toStrictEqual({ success: false, errorCode: "UNKNOWN_CLOSER_TYPE", errorCause: "test" });
    spy.mockRestore();
  });

  it("should throw it upstream if catches an unknown internal error", async () => {
    const module = await import("./findNextCloserIndex");
    const spy = vi.spyOn(module, "default").mockImplementation(() => {
      throw "UNKNOWN_INTERNAL_ERROR";
    });
    expect(() => convertMarkdownToJSON("# Header")).toThrow("UNKNOWN_INTERNAL_ERROR");
    spy.mockRestore();
  });
});
