import { getYoutubeVideoId } from ".";

describe("getYoutubeVideoId", () => {
  it("should return null for null", () => {
    expect(getYoutubeVideoId(null)).toBeNull();
  });

  it("should return null for it it's not a youtube url", () => {
    expect(getYoutubeVideoId("https://www.google.com/")).toBeNull();
  });

  it("should work for normal urls", () => {
    expect(
      getYoutubeVideoId("https://www.youtube.com/watch?v=Rmec9e2_7bc")
    ).toEqual("Rmec9e2_7bc");
  });

  it("should work for short urls", () => {
    expect(getYoutubeVideoId("https://youtu.be/Rmec9e2_7bc")).toEqual(
      "Rmec9e2_7bc"
    );
  });
});
