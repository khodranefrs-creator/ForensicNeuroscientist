import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { ArrowRight, ArrowUpRight, YouTube } from "@/components/Icons";
import { FactList, PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Forensic Neuroscientist is an education, training, and consultation organization founded by Professor Jerrod Brown, Ph.D.",
};

const principles = [
  {
    number: "01",
    title: "Evidence has limits",
    body:
      "A finding is not a verdict. The site treats measurement, inference, and legal judgment as different things.",
  },
  {
    number: "02",
    title: "Uncertainty is information",
    body:
      "Error rates, effect sizes, and unanswered questions belong in the conversation, not outside it.",
  },
  {
    number: "03",
    title: "Sources are named",
    body:
      "External research is attributed to its authors and publishers. It is never presented as the organization's own work.",
  },
  {
    number: "04",
    title: "Education is not diagnosis",
    body:
      "The site explains ideas. It does not assess, diagnose, or give individual medical or legal advice.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="About"
        title={
          <>
            A clear view of a <em>complex field</em>.
          </>
        }
        lead="The Forensic Neuroscientist is an education, training, and consultation organization. Its public work makes research-informed neuroscience accessible without letting the claims outrun the evidence."
        aside={
          <FactList
            facts={[
              { label: "Founded by", value: site.founder },
              { label: "Public home", value: site.channelHandle },
              { label: "Focus", value: "Education · Training · Consultation" },
              { label: "Motto", value: site.motto },
            ]}
          />
        }
      />

      <section className="section aboutNarrative" aria-labelledby="about-purpose">
        <div className="narrativeGrid">
          <div className="narrativeHeading">
            <p className="kicker">The purpose</p>
            <h2 id="about-purpose">
              Where neuroscience meets forensic practice.
            </h2>
          </div>
          <div className="narrativeBody">
            <p className="leadParagraph">
              The organization explores the connections between brain science,
              human behavior, forensic mental health, psychology, criminal
              justice, and the law.
            </p>
            <p>
              Through expert discussions, educational videos, and
              research-informed insights, its public work examines criminal
              behavior, trauma, mental health, assessment, intervention, and
              emerging scientific developments.
            </p>
            <p>
              The audience is broad by design: professionals, students,
              researchers, and anyone curious about how neuroscience is being
              used—and misused—in forensic and psycholegal contexts.
            </p>
            <p className="narrativePull">
              The throughline is simple: learn, connect, apply. The discipline
              is in keeping the limits visible while doing so.
            </p>
            <div className="inlineActions">
              <ArrowLink href="/education">
                Education & training
              </ArrowLink>
              <ArrowLink href="/explore">Explore the field</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section principlesSection" aria-labelledby="principles-title">
        <SectionIntro
          index="01.1"
          kicker="Editorial principles"
          title={<span id="principles-title">What guides the work.</span>}
          description="These are the standards this site applies to its own language, not claims about any individual's credentials or the outcome of any engagement."
        />
        <div className="principlesGrid">
          {principles.map((principle) => (
            <article className="principleCard" key={principle.number}>
              <span className="principleNumber">{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section founderSection" aria-labelledby="founder-title">
        <div className="founderGrid">
          <div className="founderPortrait">
            <div className="founderMonogram" aria-hidden="true">
              JB
            </div>
            <p className="kicker">Founder</p>
            <p className="founderNameLarge">{site.founder}</p>
            <p className="founderNote">
              The public channel identifies Professor Jerrod Brown, Ph.D., as
              the founder of The Forensic Neuroscientist. Further biography and
              institutional affiliations are not published on this site.
            </p>
          </div>
          <div className="founderBody">
            <h2 id="founder-title">A public education project, with scientific care.</h2>
            <p>
              The founder’s role here is presented only as far as the public
              record supports it. The site does not invent qualifications,
              university affiliations, publications, clients, awards, or
              testimonials.
            </p>
            <p>
              What the public channel does establish is a mission: accessible,
              research-informed education exploring how brain science connects
              with forensic and psycholegal practice.
            </p>
            <a
              className="profileLink"
              href={site.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <span className="kicker">Official profile</span>
                <span className="profileHandle">{site.channelHandle}</span>
              </span>
              <YouTube />
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="section scopeSection" aria-labelledby="scope-title">
        <SectionIntro
          index="01.2"
          kicker="Scope"
          title={<span id="scope-title">What this site is—and is not.</span>}
        />
        <div className="scopeGrid">
          <div className="scopePanel scopePanelYes">
            <p className="kicker">This site is</p>
            <ul>
              <li>A public educational resource.</li>
              <li>A gateway to the organization’s YouTube work.</li>
              <li>A place to begin an education, training, or consultation inquiry.</li>
              <li>Careful about uncertainty, attribution, and evidence.</li>
            </ul>
          </div>
          <div className="scopePanel scopePanelNo">
            <p className="kicker">This site is not</p>
            <ul>
              <li>A clinical or diagnostic service.</li>
              <li>A source of legal advice or expert-witness instruction.</li>
              <li>A complete review of the literature.</li>
              <li>A substitute for case-specific professional judgment.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="closingCta" aria-labelledby="about-closing">
        <div>
          <p className="kicker">Continue</p>
          <h2 id="about-closing">Bring the next question into focus.</h2>
        </div>
        <div className="closingActions">
          <Link className="btn btnAccent" href="/contact">
            Send an inquiry <ArrowRight />
          </Link>
          <a
            className="textLink textLinkLight"
            href={site.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube /> Watch on YouTube
          </a>
        </div>
      </section>
    </>
  );
}
