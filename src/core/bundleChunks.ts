import type { Section } from "~/types/section";
import type { Token } from "~/types/token";
import getContentOfTokenChunk from "./getContentOfTokenChunk";

export default function bundleChunks(bundle: Section[], chunk: Token[]): Section[] {
  const opener = chunk[0];
  if (!opener) throw new Error("EMPTY_CHUNK", { cause: chunk });
  if (opener.type === "heading_open") {
    const [title] = getContentOfTokenChunk(chunk);
    return [
      ...bundle,
      { title, content: [] },
    ];
  }
  const newItem = getContentOfTokenChunk(chunk);
  const lastSection = bundle[bundle.length - 1];
  if (!lastSection) {
    return [
      { content: [...newItem] },
    ];
  }
  return [
    ...bundle.slice(0, -1),
    {
      ...lastSection,
      content: [
        ...lastSection.content,
        ...newItem,
      ],
    },
  ];
}
