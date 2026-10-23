export type FieldTopic = {
  slug: string;
  number: string;
  title: string;
  short: string;
  intro: string;
  canShow: string[];
  cannotSettle: string[];
  questions: string[];
  sourceIndexes: number[];
};

export const fieldTopics: FieldTopic[] = [
  {
    slug: "brain-and-behavior",
    number: "01",
    title: "Brain & Behavior",
    short:
      "How neural systems, development, and context shape what people do.",
    intro:
      "Neuroscience can describe associations between brain function and behavior. It cannot read a person's intentions from a scan. The useful questions are about measurement, comparison, and uncertainty.",
    canShow: [
      "How neural and bodily systems support attention, emotion, learning, and decision-making.",
      "How development, injury, sleep, stress, and environment can shape behavior.",
      "Why group-level findings often do not transfer neatly to one person.",
    ],
    cannotSettle: [
      "Whether a person formed a particular intent.",
      "Whether a person is guilty or innocent.",
      "What caused a specific act without broader evidence and context.",
    ],
    questions: [
      "What exactly was measured, and what does that measure stand for?",
      "Compared with whom, and under what conditions?",
      "How large is the effect, and how uncertain is the estimate?",
      "What else could explain the pattern?",
    ],
    sourceIndexes: [0, 2],
  },
  {
    slug: "memory-and-evidence",
    number: "02",
    title: "Memory & Evidence",
    short:
      "How remembering works—and why confidence is not the same as accuracy.",
    intro:
      "Memory is not a recording. It is reconstructed each time it is retrieved, shaped by attention, expectation, retelling, and context. That does not make memory useless; it makes the conditions of an account important.",
    canShow: [
      "How attention, stress, sleep, and interviewing conditions can affect encoding and recall.",
      "Why memory can be detailed, vivid, and mistaken at the same time.",
      "How identification procedures can reduce or introduce error.",
    ],
    cannotSettle: [
      "Prove that a specific memory is accurate from confidence or detail alone.",
      "Establish intent or guilt.",
      "Turn a laboratory finding into a verdict without legal reasoning and case-specific evidence.",
    ],
    questions: [
      "When and how was the memory first recorded?",
      "What has happened between the event and the retelling?",
      "Were identification procedures blind and unbiased?",
      "Is confidence being treated as evidence of accuracy?",
    ],
    sourceIndexes: [0, 2],
  },
  {
    slug: "neuroscience-and-law",
    number: "03",
    title: "Neuroscience & the Law",
    short: "What scientific evidence can—and cannot—do in a courtroom.",
    intro:
      "A courtroom is not a laboratory. Legal questions and scientific questions are different, and the bridge between them has to be built carefully. Admissibility depends on relevance, reliability, legal standards, and the judge's gatekeeping role.",
    canShow: [
      "Inform questions about perception, memory, development, or the limits of an assessment.",
      "Help courts understand the strengths and weaknesses of a technique.",
      "Complicate simple stories about cause and responsibility.",
    ],
    cannotSettle: [
      "Decide guilt, innocence, or legal responsibility.",
      "Guarantee that a technique is accepted in every jurisdiction.",
      "Replace case-specific facts, legal rules, and human judgment.",
    ],
    questions: [
      "Is the technique relevant to the legal question being asked?",
      "What is its error rate, and how was it validated?",
      "Has it been tested in this population and context?",
      "What does the law require before this evidence can be heard?",
    ],
    sourceIndexes: [0, 1],
  },
  {
    slug: "neuroethics-and-critical-thinking",
    number: "04",
    title: "Neuroethics & Critical Thinking",
    short: "The questions that begin where the technology ends.",
    intro:
      "Neuroscience raises questions that measurement alone cannot answer. What should be measured? Who consents? Who owns the data? What happens when a finding is uncertain, incidental, or stigmatizing? Critical thinking is part of responsible science.",
    canShow: [
      "Make visible the ethical stakes of prediction, privacy, and consent.",
      "Help separate what a technology can detect from what a society should do with it.",
      "Encourage careful language about uncertainty, agency, and responsibility.",
    ],
    cannotSettle: [
      "Settle normative questions by appeal to a brain image.",
      "Remove the need for legal, ethical, and clinical judgment.",
      "Guarantee that a finding will be used fairly.",
    ],
    questions: [
      "Who benefits, and who bears the risk?",
      "What assumptions are built into the measurement?",
      "How will uncertainty be communicated?",
      "What would change our minds?",
    ],
    sourceIndexes: [1, 2],
  },
];
