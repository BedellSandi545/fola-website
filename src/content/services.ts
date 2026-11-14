/**
 * Business plan › "Service Provision". Deliverables are transcribed; summaries are FCA wording.
 * The current offering: NEEDS CLIENT CONFIRMATION.
 */
export type ServiceCategory = {
  slug: string;
  title: string;
  summary: string;
  items: readonly string[];
};

export const services: readonly ServiceCategory[] = [
  {
    slug: "marketing",
    title: "Marketing and digital marketing",
    summary:
      "Plans and campaigns that put your business in front of the right people, online and off, and keep your channels active.",
    items: [
      "Marketing strategy",
      "Digital marketing",
      "Social media marketing",
      "Social media management",
      "Campaign development",
      "Digital promotions",
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    summary: "A clear position and a consistent look and voice, so people recognise you and understand what you stand for.",
    items: ["Digital branding", "Brand positioning", "Visual communication", "Brand content", "Creative direction"],
  },
  {
    slug: "content",
    title: "Content production",
    summary: "Photography, video and writing made with a purpose, from social posts to promotional films and documentaries.",
    items: [
      "Social media content",
      "Creative campaigns",
      "Script writing",
      "Photography",
      "Videography",
      "Promotional videos",
      "Documentary production",
      "Audio-visual promotions",
    ],
  },
  {
    slug: "events",
    title: "Events and promotions",
    summary: "Support before, during and after your event, from planning and promotion to coverage on the day.",
    items: ["Event marketing", "Event planning support", "Event coverage", "Promotional campaigns"],
  },
  {
    slug: "training",
    title: "Training",
    summary: "Practical sessions that help your team plan, create and manage marketing with confidence.",
    items: ["Marketing training", "Social media training", "Content-creation training", "Business-development training"],
  },
  {
    slug: "consultancy",
    title: "Business consultancy",
    summary: "Advice that connects your marketing to the wider goals of your business.",
    items: ["Business development", "Marketing consultancy"],
  },
];

export const serviceSlugs = services.map((s) => s.slug);
