import type { StaticImageData } from "next/image";
import beachEvent from "@images/beach-event-setup.jpeg";
import teamGroup from "@images/fca-team-group.jpeg";
import consultation from "@images/client-consultation.jpeg";
import onsite from "@images/onsite-discussion-group.jpeg";
import tmMall from "@images/tm-mall-videography-shoot.jpeg";
import workingSession from "@images/team-working-session.jpeg";
import cameraBts from "@images/behind-the-scenes-camera.jpeg";
import portraitNavy from "@images/portrait-navy-dress.jpeg";
import portraitRed from "@images/portrait-red-blazer.jpeg";
import portraitDuo from "@images/portrait-duo.jpeg";

export type Photo = { src: StaticImageData; alt: string };

/** Single source of truth for photography and alt text. See docs/IMPLEMENTATION_PLAN.md › Asset inventory. */
export const photos = {
  beachEvent: {
    src: beachEvent,
    alt: "Crew setting up a drum kit and speakers on a beachside terrace at sunset, with the ocean horizon behind them.",
  },
  teamGroup: {
    src: teamGroup,
    alt: "Six members of the FCA team in white FCA polo shirts, smiling in front of an illustrated wall.",
  },
  consultation: {
    src: consultation,
    alt: "An FCA team member in conversation with a client outdoors.",
  },
  onsite: {
    src: onsite,
    alt: "Five people standing together on a business site, discussing plans.",
  },
  tmMall: {
    src: tmMall,
    alt: "A videographer showing footage on a camera rig to a woman in a pink dress during a shoot.",
  },
  workingSession: {
    src: workingSession,
    alt: "Team members working on laptops around a meeting-room table.",
  },
  cameraBts: {
    src: cameraBts,
    alt: "Close-up of a camera screen showing a portrait being photographed.",
  },
  portraitNavy: {
    src: portraitNavy,
    alt: "Studio portrait of a woman in a navy double-breasted dress, arms folded, seated.",
  },
  portraitRed: {
    src: portraitRed,
    alt: "Studio portrait of a woman in a red blazer, hand raised to her chin.",
  },
  portraitDuo: {
    src: portraitDuo,
    alt: "Studio portrait of two women, one in a red blazer and one in a navy dress.",
  },
} satisfies Record<string, Photo>;
