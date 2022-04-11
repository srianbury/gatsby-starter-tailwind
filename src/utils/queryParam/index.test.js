import { queryParam } from ".";

describe("queryParam", () => {
  it("should return null for null url", () => {
    expect(queryParam(null, "id")).toBeNull();
  });

  it("should return null for null key", () => {
    expect(
      queryParam("https://www.youtube.com/watch?v=otMBarbktc8", null)
    ).toBeNull();
  });

  it("should work", () => {
    expect(
      queryParam("https://www.youtube.com/watch?v=otMBarbktc8", "v")
    ).toEqual("otMBarbktc8");
  });
});
