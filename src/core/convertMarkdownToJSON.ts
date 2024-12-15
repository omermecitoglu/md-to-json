import MarkdownIt from "markdown-it";
import type { Section } from "~/types/section";
import bundleChunks from "./bundleChunks";
import chunkifyTokens from "./chunkifyTokens";

type ConversionResult = {
  success: true,
  sections: Section[],
} | {
  success: false,
  errorCode: "UNKNOWN_CLOSER_TYPE" | "EMPTY_CHUNK" | "IRREGULAR_CHUNK",
  errorCause?: unknown,
};

export default function convertMarkdownToJSON(markdown: string): ConversionResult {
  try {
    const md = new MarkdownIt();
    const tokens = md.parse(markdown, {});
    const tokenChunks = chunkifyTokens(tokens);
    return {
      success: true,
      sections: tokenChunks.reduce(bundleChunks, []),
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        errorCode: error.message as "UNKNOWN_CLOSER_TYPE",
        errorCause: error.cause,
      };
    }
    throw error;
  }
}
