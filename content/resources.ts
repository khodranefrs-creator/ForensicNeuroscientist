export type Resource = {
  title: string;
  authors: string;
  publication: string;
  publisher: string;
  year: string;
  href: string;
  type: string;
  note: string;
};

export const resources: Resource[] = [
  {
    title: "Reference Guide on Neuroscience",
    authors: "Henry T. Greely & Nita A. Farahany",
    publication: "Reference Manual on Scientific Evidence, 4th edition",
    publisher: "National Academies Press & Federal Judicial Center",
    year: "2025",
    href: "https://www.ncbi.nlm.nih.gov/books/NBK621611/",
    type: "Reference guide",
    note: "A judge-facing overview of neuroscience techniques, the interpretation of study results, and questions about admissibility.",
  },
  {
    title:
      "Neuroforensics: Exploring the Legal Implications of Emerging Neurotechnologies",
    authors:
      "National Academies of Sciences, Engineering, and Medicine",
    publication: "Proceedings of a workshop",
    publisher: "National Academies Press",
    year: "2018",
    href: "https://www.ncbi.nlm.nih.gov/books/NBK512978/",
    type: "Workshop proceedings",
    note: "An interdisciplinary discussion of how emerging neurotechnologies interact with legal questions, evidence, and civil liberties.",
  },
  {
    title:
      "Neuroethics and neurolaw in forensic neuropsychiatry: A guide for clinicians",
    authors: "Neil Krishan Aggarwal & Abhishek Jain",
    publication: "Behavioral Sciences & the Law, 42(1), 11–19",
    publisher: "Wiley",
    year: "2024",
    href: "https://doi.org/10.1002/bsl.2638",
    type: "Peer-reviewed article",
    note: "A clinician-oriented guide to the ethical and legal questions raised by neuroscience in forensic mental health practice.",
  },
];

export const readingChecklist = [
  {
    question: "What was measured?",
    detail:
      "A brain image is not a thought. Ask what the signal, task, or test actually stands for.",
  },
  {
    question: "Compared with whom?",
    detail:
      "Group averages and control groups matter. A difference from a group is not a diagnosis of a person.",
  },
  {
    question: "How uncertain is it?",
    detail:
      "Look for effect sizes, error rates, confidence intervals, and the limits the authors name.",
  },
  {
    question: "What else could explain it?",
    detail:
      "Development, context, sleep, stress, injury, and environment can all shape behavior and measurement.",
  },
  {
    question: "What is the legal question?",
    detail:
      "Scientific relevance is not the same as legal relevance. Courts decide what the law permits.",
  },
];
