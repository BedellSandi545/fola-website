/**
 * Agency copy. Sources: brochure (B) and business plan 2026–2030 (P).
 * Descriptions marked "FCA wording" paraphrase the source for the web.
 */

/** B: "Why work with FCA?" pillars. */
export const pillars = [
  { title: "Strategy", body: "Strategy-led creativity. Every idea starts with your goals." },
  { title: "The team", body: "A team that gets involved, from planning to execution." },
  { title: "Creative work", body: "Creative work with purpose. Content and campaigns built to connect." },
  { title: "Partner in your growth", body: "Focused on visibility, engagement and results." },
] as const;

/** P: "Understand > Strategize > Create > Execute > Measure > Improve". Descriptions: FCA wording drawn from P. */
export const approach = [
  { title: "Understand", body: "We learn your business, your audience and what you want to achieve before anything else." },
  { title: "Strategize", body: "We shape a practical, sustainable plan around those goals." },
  { title: "Create", body: "We produce the content, visuals and stories the plan calls for." },
  { title: "Execute", body: "We put the work into the world, on the right platforms at the right moments." },
  { title: "Measure", body: "We look at how the work is performing against the goals we set together." },
  { title: "Improve", body: "We refine what comes next based on what we learn." },
] as const;

/** P: core values, lightly edited for grammar. */
export const values = [
  { title: "Creativity", body: "We approach challenges with fresh ideas, creative thinking and compelling storytelling." },
  { title: "Excellence", body: "We are committed to professional, high-quality work that creates meaningful value." },
  {
    title: "Innovation",
    body: "We embrace new technologies, platforms, trends and approaches that improve the way businesses communicate.",
  },
  { title: "Growth", body: "Growth is at the centre of our work. We help our clients, and ourselves, keep improving." },
  { title: "Integrity", body: "We build relationships through honesty, accountability, professionalism and trust." },
  { title: "Collaboration", body: "Strong results come from working closely with clients, creatives and strategic partners." },
] as const;

/** P: growth and expansion plan. */
export const roadmap = [
  {
    period: "2025–2026",
    title: "Establishment",
    body: "Opening the agency, serving a diverse range of brands, building a portfolio and establishing a presence in the Liberian market.",
  },
  {
    period: "2026–2028",
    title: "Consolidation and scale",
    body: "More long-term client relationships, stronger internal systems, a larger team and greater production capability.",
  },
  {
    period: "2028–2030",
    title: "Regional expansion",
    body: "Regional partnerships, serving businesses across Africa and growing into a recognised African marketing brand.",
  },
] as const;

/** P: vision and mission. */
export const vision =
  "To become a leading African marketing brand, helping businesses across Africa achieve meaningful growth through strategic and creative marketing solutions.";
export const mission = "To support businesses across Africa in building an improved and more competitive economy.";

/** P: sectors served in the first year. */
export const sectors = ["Hospitality", "Retail", "NGOs", "Beauty", "Energy", "Technology"] as const;

/** P: owner and founding. NEEDS CLIENT CONFIRMATION before publishing the name. */
export const founder = { name: "Precious Folasade Odiaji", role: "Founder and CEO" } as const;
export const founded = "September 2025";

/** P: "FCA has served ten (10) brands" in its first year. Client names are intentionally not shown (client request, 2026-11-18). */
export const brandsServedFirstYearWords = "ten";
