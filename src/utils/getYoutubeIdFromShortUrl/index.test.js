import { getYoutubeIdFromShortUrl } from ".";

describe("getYoutubeIdFromShortUrl", () => {
  it("should work", () => {
    expect(getYoutubeIdFromShortUrl("https://youtu.be/Rmec9e2_7bc")).toEqual(
      "Rmec9e2_7bc"
    );
  });
});
