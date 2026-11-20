import assert from "node:assert/strict";
import { test } from "node:test";
import { recentArtworks } from "../lib/recent-artworks.ts";

test("recent works keep their gallery index and expire after seven days", () => {
  const dates = [undefined, "2026-11-13", "2026-11-14", "2026-11-21", "2026-11-20"];
  const works = dates.map(addedAt => ({ addedAt }));
  const recent = recentArtworks(works, Date.parse("2026-11-20"));
  assert.deepEqual(recent.map(({ index }) => index), [4, 2]);
});
