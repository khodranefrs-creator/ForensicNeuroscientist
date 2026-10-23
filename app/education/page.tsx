import type { Metadata } from "next";
import { ArrowLink } from "@/components/ArrowLink";
import { FieldDiagram } from "@/components/FieldDiagram";
import { ArrowUpRight, Check } from "@/components/Icons";
import { FactList, PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Education & Training",
  description:
    "Research-informed education exploring forensic neuroscience, human behavior, trauma, mental health, assessment, intervention, and emerging science.",
};

const learningPrinciples = [
  {
    number: "01",
    title: "Question first",
    body:
      "Start with the question someone actually needs to answer, not with a technique looking for an application.",
  },
  {
    number: "02",
    title: "Evidence in context",
    body:
      "Explain what a study measured, who was studied, and what the comparison does—and does not—support.",
  },
  {
    number: "03",
    title: "Limits named",
    body:
      "Treat uncertainty as part of the lesson. A clear limit is more useful than a false certainty.",
  },
  {
    number: "04",
    title: "Application without overreach",
    body:
      "Connect ideas to practice while keeping diagnosis, legal judgment, and individual assessment in their proper places.",
  },
];

const audiences = [
  "Professionals working across forensic mental health, psychology, criminal justice, and related fields.",
  "Students and early-career practitioners building a foundation in neuroscience and behavior.",
  "Researchers who want their work to meet the questions practitioners are asking.",
  "Curious minds who want a careful introduction to complex ideas.",
];

const topics = [
  "Forensic neuroscience",
  "Criminal behavior",
  "Trauma",
  "Mental health",
  "Assessment",
  "Intervention",
  "Emerging scientific developments",
];

export default function EducationPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Education & training"
        title={
          <>
            Learning that keeps the <em>question</em> open.
          </>
        }
        lead="Complex ideas become useful when they are translated without being flattened. The Forensic Neuroscientist creates accessible, research-informed education for people who need to think carefully about brain science, behavior, and forensic practice."
        aside={
          <FactList
            facts={[
              {
                label: "Audience",
                value: "Professionals, students, researchers, curious minds",
              },
              { label: "Motto", value: site.motto },
              {
                label: "Public formats",
                value: "Expert discussions, educational videos, research insights",
              },
              { label: "Inquiries", value: "Scope agreed directly" },
            ]}
          />
        }
      />

      <section className="section educationIntroSection" aria-labelledby="education-approach">
        <div className="educationIntroGrid">
          <div>
            <p className="kicker">The approach</p>
            <h2 id="education-approach">
              Teach the evidence. <em>Keep</em> the edges.
            </h2>
          </div>
          <div className="educationIntroBody">
            <p className="leadParagraph">
              Neuroscience is often asked to answer questions it cannot answer
              alone. Education should make that visible, not hide it behind
              technical language.
            </p>
            <p>
              The learning approach here is editorial and evidence-led. It
              favors clear explanation, explicit sources, and disciplined
              language about what a finding can support.
            </p>
            <FieldDiagram
              variant="brain"
              className="educationIntroDiagram"
            />
          </div>
        </div>
      </section>

      <section className="section learningPrinciplesSection" aria-labelledby="learning-principles">
        <SectionIntro
          index="02.1"
          kicker="Learning principles"
          title={<span id="learning-principles">Four commitments.</span>}
          description="These principles describe how educational material is framed on this site and in the public channel."
        />
        <div className="learningPrinciplesGrid">
          {learningPrinciples.map((principle) => (
            <article className="learningPrinciple" key={principle.number}>
              <span className="principleNumber">{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section audienceSection" aria-labelledby="audience-title">
        <div className="audienceGrid">
          <div>
            <p className="kicker">Who it is for</p>
            <h2 id="audience-title">A shared language across disciplines.</h2>
            <p>
              The most useful conversations happen when people bring different
              expertise to the same question. This work is designed to make that
              possible.
            </p>
          </div>
          <ul className="audienceList">
            {audiences.map((audience) => (
              <li key={audience}>
                <Check />
                <span>{audience}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section topicsSection" aria-labelledby="topics-title">
        <div className="topicsGrid">
          <div>
            <p className="kicker">The territory</p>
            <h2 id="topics-title">Topics in the public work.</h2>
            <p>
              The channel explores forensic neuroscience, criminal behavior,
              trauma, mental health, assessment, intervention, and emerging
              scientific developments.
            </p>
          </div>
          <ul className="topicCloud" aria-label="Topics">
            {topics.map((topic, index) => (
              <li key={topic}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section trainingSection" aria-labelledby="training-title">
        <div className="trainingGrid">
          <div className="trainingCopy">
            <p className="kicker">Organized learning</p>
            <h2 id="training-title">A learning need is a conversation.</h2>
            <p>
              No course catalogue, schedule, certification, or enrollment
              pathway is published on this site. If you are planning education
              or professional development and want to discuss whether the
              organization�s expertise fits the question, start with an inquiry.
            </p>
            <p>
              The scope, format, and any next step are confirmed directly. The
              site does not promise availability, accreditation, or a particular
              outcome.
            </p>
            <ArrowLink href="/contact?topic=education">
              Discuss an education or training need
            </ArrowLink>
          </div>
          <div className="trainingNote">
            <p className="kicker">A useful first note</p>
            <ul>
              <li>Who is the learning for?</li>
              <li>What should they be able to do differently?</li>
              <li>Which assumptions or misconceptions need to be addressed?</li>
              <li>What would a useful outcome look like?</li>
            </ul>
            <a
              href={site.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Browse the public channel <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
