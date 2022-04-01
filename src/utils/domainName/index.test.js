import { domainName } from ".";

describe("domainName", () => {
  it("should be null", () => {
    expect(domainName(null)).toBeNull();
  });

  it("should be youtube", () => {
    expect(
      domainName("https://www.youtube.com/watch?v=dlfjs_eEEzs&t=118s")
    ).toEqual("youtube");
  });

  it("should be youtu", () => {
    expect(domainName("https://youtu.be/dlfjs_eEEzs")).toEqual("youtu");
  });

  it("should be abc", () => {
    expect(domainName("www.abc.au.uk")).toEqual("abc");
  });

  it("should work with https", () => {
    expect(domainName("https://github.com")).toEqual("github");
  });

  it("should work with http", () => {
    expect(domainName("http://github.ca")).toEqual("github");
  });

  it("should work with ru", () => {
    expect(domainName("https://www.google.ru")).toEqual("google");
  });

  it("should work with uk", () => {
    expect(domainName("http://www.google.co.uk")).toEqual("google");
  });

  it("should work with www.yandex.com", () => {
    expect(domainName("www.yandex.com")).toEqual("yandex");
  });

  it("should work with yandex.ru", () => {
    expect(domainName("yandex.ru")).toEqual("yandex");
  });

  it("should work with yandex", () => {
    expect(domainName("yandex")).toEqual("yandex");
  });
});
