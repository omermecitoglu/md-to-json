import { describe, expect, it } from "@jest/globals";
import getTokenCloserType from "./getTokenCloserType";

describe("getTokenCloserType", () => {
  it("should return the correct token closer type", () => {
    expect(getTokenCloserType("bullet_list_open")).toBe("bullet_list_close");
    expect(getTokenCloserType("list_item_open")).toBe("list_item_close");
    expect(getTokenCloserType("paragraph_open")).toBe("paragraph_close");
    expect(getTokenCloserType("heading_open")).toBe("heading_close");
    expect(getTokenCloserType("unknown")).toBe(null);
  });
});
