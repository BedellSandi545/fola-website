import { photos, type Photo } from "./images";

/**
 * Brochure: captioned photographs. These are moments from real engagements,
 * not case studies. No outcomes or metrics are claimed.
 */
export type FieldNote = { id: string; title: string; body: string; photo: Photo; discipline: string };

export const fieldNotes: readonly FieldNote[] = [
  {
    id: "videography",
    title: "On the ground with the video team",
    body: "Working alongside the videography team to bring a brand's story to life.",
    photo: photos.tmMall,
    discipline: "Content production",
  },
  {
    id: "consultation",
    title: "Client consultation",
    body: "Listening first, understanding your needs and shaping the right marketing approach.",
    photo: photos.consultation,
    discipline: "Strategy",
  },
  {
    id: "onsite",
    title: "On-site discussion",
    body: "Turning business goals into practical creative direction.",
    photo: photos.onsite,
    discipline: "Strategy",
  },
  {
    id: "beach-event",
    title: "Event planning and coordination",
    body: "Behind the scenes of a summer beach event in the making.",
    photo: photos.beachEvent,
    discipline: "Events and promotions",
  },
];
