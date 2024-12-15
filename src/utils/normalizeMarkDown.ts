export default function normalizeMarkDown(text: string) {
  return text.split("\n").map(line => line.trimStart()).join("\n");
}
