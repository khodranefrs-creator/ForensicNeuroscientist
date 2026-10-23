export type Video = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  href: string;
};

const rawVideos = [
  {
    id: "dmBHtk7Whw8",
    title:
      "The Twinkie Defense Explained: Dan White, Diet & Criminal Behavior | Dr. Jerrod Brown",
    published: "2026-10-22",
  },
  {
    id: "xzcnGXXRaZQ",
    title:
      "Forensic Neuroscience Explained: Brain, Behavior & the Law | Dr. Jerrod Brown",
    published: "2026-10-22",
  },
  {
    id: "LW6aHZOQQSs",
    title:
      "Neurocriminology Explained: The Neuroscience Behind Criminal Behavior | Dr. Jerrod Brown",
    published: "2026-10-22",
  },
  {
    id: "XshfZ-XH__E",
    title:
      "How Plastic Building Blocks Support Neuroplasticity & Behaviour Change | Matty Peacock",
    published: "2026-10-22",
  },
  {
    id: "5n7m64i5VZ4",
    title:
      "Jigsaw Puzzles, Neuroplasticity & Behaviour Change | Matty Peacock",
    published: "2026-10-21",
  },
  {
    id: "wOB-qzGhlvs",
    title:
      "Juvenile Sex Offending: Root Causes, Trauma & Interventions | Dr. Jerrod Brown",
    published: "2026-10-21",
  },
  {
    id: "UxvXWqInz6k",
    title:
      "How Colouring Supports Neuroplasticity & Behaviour Change | Matty Peacock",
    published: "2026-10-21",
  },
  {
    id: "KakXQ-VrhJQ",
    title:
      "The Criminologist Meets Criminal Behaviorology | Neurocriminology & Criminal Behavior",
    published: "2026-10-20",
  },
  {
    id: "dzDAV9HNL1w",
    title:
      "The 10 E's of Ethical & Effective Helping Practice | Dr. Joshua Kirven",
    published: "2026-10-20",
  },
  {
    id: "642qJwOCltw",
    title:
      "Road Rage Explained: What Drives Driver Aggression? | Dr. Jerrod Brown",
    published: "2026-10-19",
  },
  {
    id: "D-hu4Kexh_o",
    title:
      "Familicide & Family Annihilators: Understanding Family Mass Murder | Dr. Jerrod Brown",
    published: "2026-10-19",
  },
  {
    id: "SFlODyWvJuQ",
    title:
      "Risk, Need & Responsibility in Forensic Mental Health | Joseph Arvidson #criminaljustice",
    published: "2026-10-14",
  },
  {
    id: "uGySNlWnPRk",
    title:
      "Welcome to The Forensic Neuroscientist | Exploring Brain Science & Criminal Behavior",
    published: "2026-10-13",
  },
  {
    id: "qTzBXjv4Zhg",
    title:
      "Mysopedia: The Psychology of Sadistic Child Murderers | Dr. Jerrod Brown",
    published: "2026-10-08",
  },
] as const;

export const videos: Video[] = rawVideos.map((video) => ({
  ...video,
  thumbnail: `/videos/${video.id}.jpg`,
  href: `https://www.youtube.com/watch?v=${video.id}`,
}));

export const referenceVideo = videos.find(
  (video) => video.id === "uGySNlWnPRk",
)!;

export const referenceVideoDescription =
  "A short introduction to the channel's educational mission, connecting brain science with forensic psychology, criminal justice, and the law.";

export const referenceVideoDuration = "3 min 15 sec";
