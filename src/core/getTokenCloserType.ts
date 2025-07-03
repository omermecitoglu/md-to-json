export default function getTokenCloserType(tokenType: string) {
  switch (tokenType) {
    case "bullet_list_open": return "bullet_list_close";
    case "list_item_open": return "list_item_close";
    case "paragraph_open": return "paragraph_close";
    case "heading_open": return "heading_close";
    case "blockquote_open": return "blockquote_close";
    case "table_open": return "table_close";
    case "thead_open": return "thead_close";
    case "tbody_open": return "tbody_close";
    case "th_open": return "th_close";
    case "tr_open": return "tr_close";
    case "td_open": return "td_close";
    case "fence": return "fence";
    default: return null;
  }
}
