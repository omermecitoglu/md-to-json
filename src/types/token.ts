import type { Prettify } from "./prettify";
import type { Token as MarkdownItToken } from "markdown-it/index.js";

export type Token = Prettify<Pick<MarkdownItToken, "type" | "content">>;
