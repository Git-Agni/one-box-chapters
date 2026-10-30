import { describe, expect, it } from "vitest";
import { homeBShare, homeVariantCookieDomain, pickHomeVariant } from "./home-variant";

describe("homeBShare", () => {
  it("defaults to an even split and clamps to 0-100", () => {
    expect(homeBShare(undefined)).toBe(50);
    expect(homeBShare("")).toBe(50);
    expect(homeBShare("nope")).toBe(50);
    expect(homeBShare("0")).toBe(0);
    expect(homeBShare("25")).toBe(25);
    expect(homeBShare("140")).toBe(100);
    expect(homeBShare("-3")).toBe(0);
  });
});

describe("pickHomeVariant", () => {
  it("assigns new visitors by the share and asks for the cookie to be written", () => {
    expect(pickHomeVariant(undefined, 50, 0.2)).toEqual({ variant: "b", fresh: true });
    expect(pickHomeVariant(undefined, 50, 0.7)).toEqual({ variant: "a", fresh: true });
    expect(pickHomeVariant("junk", 50, 0.7)).toEqual({ variant: "a", fresh: true });
  });

  it("keeps a returning visitor in their arm", () => {
    expect(pickHomeVariant("a", 50, 0.01)).toEqual({ variant: "a", fresh: false });
    expect(pickHomeVariant("b", 50, 0.99)).toEqual({ variant: "b", fresh: false });
  });

  it("share 0 ends the test: everyone on a, cookie ignored, nothing written", () => {
    expect(pickHomeVariant("b", 0, 0.01)).toEqual({ variant: "a", fresh: false });
    expect(pickHomeVariant(undefined, 0, 0.01)).toEqual({ variant: "a", fresh: false });
  });

  it("share 100 ships b to everyone, rewriting old a cookies", () => {
    expect(pickHomeVariant("a", 100, 0.99)).toEqual({ variant: "b", fresh: true });
    expect(pickHomeVariant("b", 100, 0.99)).toEqual({ variant: "b", fresh: false });
  });
});

describe("homeVariantCookieDomain", () => {
  it("shares the cookie across the site's hosts only", () => {
    expect(homeVariantCookieDomain("example.com")).toBe(".example.com");
    expect(homeVariantCookieDomain("www.example.com")).toBe(".example.com");
    expect(homeVariantCookieDomain("localhost:3000")).toBeUndefined();
    expect(homeVariantCookieDomain("evilexample.com")).toBeUndefined();
    expect(homeVariantCookieDomain("site.vercel.app")).toBeUndefined();
  });
});
