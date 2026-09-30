import { describe, it, expect } from "vitest";
import { MAKER_DETAILS, getMakerDetails } from "../../../../src/utils/catalog/makerDetails.js";
import { allMakerSlugs, isDesignFamily } from "../../../../src/utils/catalog/lensMetadata.js";
import { describeDetailRegistry } from "./detailRegistryHarness.js";

describeDetailRegistry({
  registryName: "MAKER_DETAILS",
  registry: MAKER_DETAILS,
  ids: allMakerSlugs(),
  idNoun: "known maker slug",
  nonEmptyStringFields: ["headquarters", "summary", "history"],
});

describe("getMakerDetails", () => {
  it("returns details for a known slug", () => {
    const details = getMakerDetails("nikon");
    expect(details).not.toBeNull();
    expect(details!.founded).toBe(1917);
  });

  it("returns null for an unknown slug", () => {
    expect(getMakerDetails("unknown-maker")).toBeNull();
  });
});

it("keeps design-family groups separate from company founding dates", () => {
  for (const [slug, details] of Object.entries(MAKER_DETAILS)) {
    if (isDesignFamily(slug)) expect(details.founded).toBeNull();
    else expect(details.founded).toBeGreaterThan(0);
  }
});
