export default function getTokenCloserType(tokenType: string) {
  switch (tokenType) {
    case "bullet_list_open": return "bullet_list_close";
    case "list_item_open": return "list_item_close";
    case "paragraph_open": return "paragraph_close";
    case "heading_open": return "heading_close";
    case "fence": return "fence";
    default: return null;
  }
}
