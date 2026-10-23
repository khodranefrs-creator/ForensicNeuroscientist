export const site = {
  name: "The Forensic Neuroscientist",
  tagline: "Where neuroscience meets forensic practice.",
  description:
    "An education, training, and consultation organization exploring the connections between neuroscience, human behavior, forensic practice, and the law.",
  channelUrl: "https://www.youtube.com/@TheForensicNeuroscientist",
  channelHandle: "@TheForensicNeuroscientist",
  channelId: "UCG7IfMzsQzZk1IgfgHtCtQQ",
  referenceVideoId: "uGySNlWnPRk",
  founder: "Professor Jerrod Brown, Ph.D.",
  motto: "Learn. Connect. Apply.",
  logoWordmark: "Forensic Neuroscience Training Academy",
  sourceNote:
    "Public information on this site is drawn from the organization's brief and its official YouTube channel. External readings are attributed to their publishers.",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Education & Training", href: "/education" },
  { label: "Explore the Field", href: "/explore" },
  { label: "Video Library", href: "/videos" },
  { label: "Research & Resources", href: "/resources" },
  { label: "Consultation", href: "/consultation" },
  { label: "Contact", href: "/contact" },
] as const;

export const contactTopics = [
  "General inquiry",
  "Education & training",
  "Consultation",
  "Research & resources",
] as const;

export type ContactTopic = (typeof contactTopics)[number];
