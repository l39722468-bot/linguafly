jest.mock("@opennextjs/cloudflare", () => ({
  getCloudflareContext: jest.fn(),
}));

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { searchTutorKnowledge } from "@/lib/ai/tutor-knowledge";

describe("tutor knowledge retrieval", () => {
  it("retrieves a small set of published article snippets from D1", async () => {
    const all = jest.fn().mockResolvedValue({
      results: [{
        title: "Practise English for travel",
        slug: "practise-english-for-travel",
        category: "viajes",
        level: "A2",
        canonical: null,
        excerpt: "At the airport, ask for your boarding pass.",
      }],
    });
    const bind = jest.fn(() => ({ all }));
    const prepare = jest.fn(() => ({ bind }));
    (getCloudflareContext as jest.Mock).mockResolvedValue({ env: { DB: { prepare } } });

    await expect(searchTutorKnowledge("I want to practise travel", "travel")).resolves.toEqual([
      {
        title: "Practise English for travel",
        slug: "practise-english-for-travel",
        category: "viajes",
        level: "A2",
        url: "https://linguafly.app/blog/viajes/practise-english-for-travel",
        excerpt: "At the airport, ask for your boarding pass.",
      },
    ]);

    expect(prepare).toHaveBeenCalledWith(expect.stringContaining("articles_fts MATCH ?"));
    expect(bind).toHaveBeenCalledWith(expect.stringContaining('"travel"'), 3);
  });

  it("fails open when the Cloudflare D1 context is unavailable", async () => {
    (getCloudflareContext as jest.Mock).mockRejectedValue(new Error("No runtime context"));
    await expect(searchTutorKnowledge("past simple", "grammar")).resolves.toEqual([]);
  });
});
