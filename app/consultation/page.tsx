import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { ArrowRight, ArrowUpRight, YouTube } from "@/components/Icons";
import { FactList, PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Consultation",
  description:
    "Begin a consultation inquiry with The Forensic Neuroscientist. The question, context, and scope come first.",
};

const inquirySteps = [
  {
    number: "01",
    title: "Send a brief note",
    body:
      "Use the inquiry form to describe the question, the setting, and the decision you are trying to make. Avoid sensitive personal details.",
  },
  {
    number: "02",
    title: "Clarify the question",
    body:
      "A good first conversation separates the presenting question from the underlying one. It also identifies what is outside the scope.",
  },
  {
    number: "03",
    title: "Agree scope and next steps",
    body:
      "No engagement is assumed until scope, expectations, and any next step are agreed directly.",
  },
];

const limits = [
  "Clinical diagnosis or treatment.",
  "Legal advice, expert-witness instruction, or case strategy through this website.",
  "Emergency or crisis support.",
  "A guaranteed answer, outcome, or timeline.",
];

export default function ConsultationPage() {
  return (
    <>
      <PageHero
        index="06"
        eyebrow="Consultation"
        title={
          <>
            Bring a question, <em>not a certainty</em>.
          </>
        }
        lead="Consultation begins with the question, the context, and the decision you are trying to make. The aim is a clearer frame—not a premature answer."
        aside={
          <FactList
            facts={[
              { label: "Starting point", value: "The question and its context" },
              { label: "Scope", value: "Agreed directly" },
              { label: "Website", value: "No clinical, legal, or emergency service" },
              { label: "Next step", value: "Send an inquiry" },
            ]}
          />
        }
      />

      <section className="section consultationIntro" aria-labelledby="consultation-approach">
        <div className="consultationIntroGrid">
          <div>
            <p className="kicker">The approach</p>
            <h2 id="consultation-approach">
              Clarity is the first <em>deliverable</em>.
            </h2>
          </div>
          <div className="consultationIntroBody">
            <p className="leadParagraph">
              Forensic neuroscience can inform a conversation without settling
              it. The most useful consultation often begins by making the
              question more precise.
            </p>
            <p>
              What is being asked? What evidence would bear on it? What are the
              limits of that evidence? Which decisions belong to science, and
              which belong to law, ethics, or clinical judgment? These are the
              questions that shape a responsible next step.
            </p>
            <p className="consultationPull">
              The goal is not more certainty. It is a better-calibrated
              understanding of what can responsibly be said.
            </p>
          </div>
        </div>
      </section>

      <section className="section consultationStepsSection" aria-labelledby="inquiry-steps">
        <SectionIntro
          index="06.1"
          kicker="How an inquiry works"
          title={<span id="inquiry-steps">Three steps, no shortcuts.</span>}
          description="These steps describe the inquiry process. They are not a promise of availability, response time, or engagement."
        />
        <div className="stepsGrid">
          {inquirySteps.map((step) => (
            <article className="stepCard" key={step.number}>
              <span className="stepNumber">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section consultationFitSection" aria-labelledby="fit-title">
        <div className="fitGrid">
          <div className="fitPanel fitPanelYes">
            <p className="kicker">An inquiry can hold</p>
            <h2 id="fit-title">A real question and its setting.</h2>
            <ul>
              <li>An education or training need.</li>
              <li>
                A question at the intersection of neuroscience, behavior, and
                forensic practice.
              </li>
              <li>A request to discuss fit and scope directly.</li>
              <li>A general professional question about the field.</li>
            </ul>
          </div>
          <div className="fitPanel fitPanelNo">
            <p className="kicker">It cannot hold</p>
            <h2>Work that belongs elsewhere.</h2>
            <ul>
              {limits.map((limit) => (
                <li key={limit}>{limit}</li>
              ))}
            </ul>
            <p>
              If your situation involves risk of harm or an emergency, contact
              the appropriate local emergency or clinical service.
            </p>
          </div>
        </div>
      </section>

      <section className="closingCta" aria-labelledby="consultation-closing">
        <div>
          <p className="kicker">Begin</p>
          <h2 id="consultation-closing">What is the question you need to move forward?</h2>
        </div>
        <div className="closingActions">
          <Link className="btn btnAccent" href="/contact?topic=consultation">
            Start a consultation inquiry <ArrowRight />
          </Link>
          <a
            className="textLink textLinkLight"
            href={site.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube /> Watch on YouTube <ArrowUpRight />
          </a>
        </div>
      </section>

      <section className="section consultationFaq" aria-labelledby="consultation-more">
        <SectionIntro
          index="06.2"
          kicker="Before you write"
          title={<span id="consultation-more">A useful note is specific.</span>}
        />
        <div className="faqGrid">
          <div>
            <h3>What to include</h3>
            <p>
              The question, why it matters, who it affects, and what a useful
              next step would look like. Keep personal and clinical details out
              of the first message.
            </p>
          </div>
          <div>
            <h3>What happens next</h3>
            <p>
              The organization can clarify whether the question fits its work
              and what, if anything, should happen next. No response time is
              promised on this site.
            </p>
          </div>
          <div>
            <h3>What not to assume</h3>
            <p>
              Sending an inquiry does not create a professional relationship,
              an engagement, or an obligation to provide a service.
            </p>
          </div>
        </div>
        <ArrowLink href="/contact">Use the inquiry form</ArrowLink>
      </section>
    </>
  );
}
