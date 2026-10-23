import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { FieldDiagram } from "@/components/FieldDiagram";
import { HeroPlate } from "@/components/HeroPlate";
import { ArrowRight, ArrowUpRight, External, YouTube } from "@/components/Icons";
import { SectionIntro } from "@/components/SectionIntro";
import { VideoFeature } from "@/components/VideoFeature";
import { fieldTopics } from "@/content/field";
import { resources } from "@/content/resources";
import { site } from "@/content/site";
import {
  referenceVideo,
  referenceVideoDescription,
  referenceVideoDuration,
} from "@/content/videos";

const diagramVariants = ["brain", "memory", "law", "ethics"] as const;

export default function HomePage() {
  return (
    <>
      <section className="homeHero" aria-labelledby="home-title">
        <div className="homeHeroMeta">
          <p className="eyebrow">
            <span className="eyebrowMark" aria-hidden="true" />
            Forensic neuroscience · Behavior · Law
          </p>
          <p className="heroFolio">Field notes / 2026</p>
        </div>

        <div className="homeHeroGrid">
          <div className="homeHeroCopy">
            <h1 id="home-title">
              The science behind the <em>evidence</em>.
            </h1>
            <p className="heroLead">
              Explore the connections between the brain, human behavior, and the
              questions that shape our understanding of evidence.
            </p>
            <div className="heroActions">
              <Link className="btn btnPrimary" href="/explore">
                Explore the field <ArrowRight />
              </Link>
              <a
                className="textLink"
                href={site.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTube /> Watch on YouTube <ArrowUpRight />
              </a>
            </div>

            <div className="heroFacts">
              <div>
                <span className="metaLabel">Focus</span>
                <span>Education · Training · Consultation</span>
              </div>
              <div>
                <span className="metaLabel">Founded by</span>
                <span>{site.founder}</span>
              </div>
            </div>
          </div>

          <HeroPlate />
        </div>

        <div className="heroFoot">
          <span>Neuroscience, read carefully</span>
          <span className="heroFootRule" aria-hidden="true" />
          <span>01 — 08</span>
        </div>
      </section>

      <section className="mottoBand" aria-label="Organization summary">
        <div className="mottoBandInner">
          <p className="mottoKicker">{site.motto}</p>
          <p className="mottoStatement">{site.tagline}</p>
          <div className="mottoAside">
            <p>An education, training, and consultation organization.</p>
            <ArrowLink href="/about">About the organization</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section exploreSection" aria-labelledby="explore-title">
        <div className="sectionTopGrid">
          <SectionIntro
            index="01"
            kicker="Explore the field"
            title={
              <span id="explore-title">
                A field is not a single <em>finding</em>.
              </span>
            }
            description="Forensic neuroscience sits where brain science, behavior, and law meet. These four entry points are invitations to ask better questions—not a syllabus, and not a verdict."
          />
          <div className="sectionTopAside">
            <p className="kicker">Reading position</p>
            <p>
              Every claim has a measurement behind it, a comparison around it,
              and a limit somewhere in it.
            </p>
            <ArrowLink href="/explore">Enter the field</ArrowLink>
          </div>
        </div>

        <div className="fieldHomeLayout">
          <Link
            className="fieldFeature"
            href="/explore#brain-and-behavior"
          >
            <div className="fieldFeatureTop">
              <span>{fieldTopics[0].number}</span>
              <span>Primary entry point</span>
            </div>
            <h3>{fieldTopics[0].title}</h3>
            <p>{fieldTopics[0].short}</p>
            <FieldDiagram
              variant={diagramVariants[0]}
              className="fieldFeatureDiagram"
            />
            <span className="fieldRead">
              Read the field note <ArrowUpRight />
            </span>
          </Link>

          <div className="fieldList">
            {fieldTopics.slice(1).map((topic, index) => (
              <Link
                className="fieldListRow"
                href={`/explore#${topic.slug}`}
                key={topic.slug}
              >
                <span className="fieldListNumber">{topic.number}</span>
                <span className="fieldListText">
                  <span className="fieldListTitle">{topic.title}</span>
                  <span className="fieldListShort">{topic.short}</span>
                </span>
                <FieldDiagram
                  variant={diagramVariants[index + 1]}
                  className="fieldListDiagram"
                />
                <span className="fieldListArrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section videoSection"
        aria-labelledby="featured-video-title"
      >
        <div className="videoSectionHeader">
          <SectionIntro
            index="02"
            kicker="From the channel"
            title={
              <span id="featured-video-title">
                The conversation, <em>in public</em>.
              </span>
            }
            description="Research-informed discussion, made accessible. The video library is drawn directly from the organization's official YouTube channel."
          />
          <div className="channelCard">
            <p className="kicker">Official channel</p>
            <a
              href={site.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.channelHandle} <ArrowUpRight />
            </a>
            <p>Recent uploads on YouTube</p>
          </div>
        </div>

        <VideoFeature
          video={referenceVideo}
          description={referenceVideoDescription}
          duration={referenceVideoDuration}
        />

        <div className="videoSectionFoot">
          <p>
            New episodes examine forensic neuroscience, criminal behavior,
            trauma, mental health, assessment, intervention, and emerging
            science.
          </p>
          <ArrowLink href="/videos" className="arrowLinkLight">
            Browse the video library
          </ArrowLink>
        </div>
      </section>

      <section className="section educationSection" aria-labelledby="education-title">
        <div className="educationHomeGrid">
          <div className="educationHomeIntro">
            <SectionIntro
              index="03"
              kicker="Education & training"
              title={
                <span id="education-title">
                  Learning that keeps the <em>question</em> open.
                </span>
              }
              description="Complex ideas become useful when they are translated without being flattened. The organization's public work is built for professionals, students, researchers, and curious minds."
            />
            <ArrowLink href="/education">
              Explore education & training
            </ArrowLink>
          </div>

          <div className="learningStack">
            <div className="learningRow">
              <span className="learningNumber">01</span>
              <h3>Learn.</h3>
              <p>Start with the evidence, the method, and the limits.</p>
            </div>
            <div className="learningRow">
              <span className="learningNumber">02</span>
              <h3>Connect.</h3>
              <p>
                Bring neuroscience into conversation with forensic practice,
                psychology, and the law.
              </p>
            </div>
            <div className="learningRow">
              <span className="learningNumber">03</span>
              <h3>Apply.</h3>
              <p>
                Translate complexity into clearer questions and better-informed
                decisions.
              </p>
            </div>
            <p className="learningTopics">
              Topics include forensic neuroscience, criminal behavior, trauma,
              mental health, assessment, intervention, and emerging scientific
              developments.
            </p>
          </div>
        </div>
      </section>

      <section className="section evidenceSection" aria-labelledby="evidence-title">
        <div className="evidenceHeader">
          <p className="kicker">A note on evidence</p>
          <h2 id="evidence-title">
            Separate the <em>signal</em> from the conclusion.
          </h2>
          <p>
            Scientific findings are valuable precisely because they are
            bounded. Good communication keeps those boundaries visible.
          </p>
        </div>

        <div className="evidenceColumns">
          <div className="evidenceCard">
            <span className="evidenceNumber">01</span>
            <h3>What the science can show</h3>
            <p>
              Patterns, associations, and probabilities—often at the level of
              groups rather than individuals.
            </p>
          </div>
          <div className="evidenceCard">
            <span className="evidenceNumber">02</span>
            <h3>What it cannot settle</h3>
            <p>
              Guilt, intent, or the cause of a single act. Those are legal and
              human questions, not scan readings.
            </p>
          </div>
          <div className="evidenceCard">
            <span className="evidenceNumber">03</span>
            <h3>Why the distinction matters</h3>
            <p>
              Precise language protects people from claims that outrun the
              evidence and from certainty that the science cannot support.
            </p>
          </div>
        </div>

        <p className="evidenceFootnote">
          <span aria-hidden="true">*</span>
          Educational content on this site is not medical or legal advice and
          does not assess or diagnose any individual.
        </p>
      </section>

      <section
        className="section consultationSection"
        aria-labelledby="consultation-title"
      >
        <div className="consultationGrid">
          <div className="consultationTitle">
            <p className="kicker">04 / Consultation</p>
            <h2 id="consultation-title">
              Bring a question, <em>not a certainty</em>.
            </h2>
            <span className="consultationMark" aria-hidden="true">
              04
            </span>
          </div>
          <div className="consultationBody">
            <p className="consultationLead">
              Consultation begins with the question, the context, and the
              decision you are trying to make. The scope of any engagement is
              agreed directly.
            </p>
            <p>
              This website does not provide clinical diagnosis, legal advice,
              expert-witness services, or emergency support. It is a starting
              point for a professional conversation.
            </p>
            <ul className="consultationChecklist">
              <li>Share the question and why it matters.</li>
              <li>Describe the setting and the people involved, without sensitive personal details.</li>
              <li>Say what a useful next step would look like.</li>
            </ul>
            <ArrowLink href="/contact?topic=consultation">
              Start a consultation inquiry
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="section resourcesSection" aria-labelledby="resources-title">
        <div className="resourcesHeader">
          <SectionIntro
            index="05"
            kicker="Research & resources"
            title={
              <span id="resources-title">
                Read widely. <em>Read carefully</em>.
              </span>
            }
            description="A short, external reading list for the questions this field keeps asking. These are third-party sources, not publications of The Forensic Neuroscientist."
          />
          <div className="resourcesStamp" aria-hidden="true">
            <span>External</span>
            <span>Verified</span>
            <span>Sources</span>
          </div>
        </div>

        <div className="resourceListHome">
          {resources.map((resource, index) => (
            <a
              className="resourceRow"
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              key={resource.href}
            >
              <span className="resourceNumber">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="resourceRowBody">
                <span className="resourceType">{resource.type}</span>
                <span className="resourceTitle">{resource.title}</span>
                <span className="resourceMeta">
                  {resource.authors} · {resource.year}
                </span>
              </span>
              <External />
            </a>
          ))}
        </div>

        <div className="resourcesFoot">
          <p>
            Sources are linked to their publishers. Always check the original
            publication for context, methods, and limitations.
          </p>
          <ArrowLink href="/resources">Open the full reading list</ArrowLink>
        </div>
      </section>

      <section className="section aboutHome" aria-labelledby="about-home-title">
        <div className="aboutHomeGrid">
          <div className="aboutHomeHeading">
            <p className="kicker">06 / About</p>
            <h2 id="about-home-title">
              Evidence, <em>translated</em> with care.
            </h2>
            <FieldDiagram variant="brain" className="aboutHomeDiagram" />
          </div>
          <div className="aboutHomeBody">
            <p className="aboutLead">
              The Forensic Neuroscientist is an education, training, and
              consultation organization. Its public work explores how brain
              science connects with human behavior, forensic mental health,
              psychology, criminal justice, and the law.
            </p>
            <p>
              Founded by {site.founder}, the organization creates accessible,
              research-informed education for professionals, students,
              researchers, and curious minds.
            </p>
            <div className="founderCard">
              <div>
                <p className="kicker">Founder</p>
                <p className="founderName">{site.founder}</p>
              </div>
              <a
                href={site.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="founderLink"
              >
                Official channel <ArrowUpRight />
              </a>
            </div>
            <ArrowLink href="/about">Read about the organization</ArrowLink>
          </div>
        </div>
      </section>

      <section className="homeContact" aria-labelledby="home-contact-title">
        <div className="homeContactGrid">
          <div>
            <p className="kicker">07 / Contact</p>
            <h2 id="home-contact-title">
              Start with a <em>question</em>.
            </h2>
          </div>
          <div className="homeContactBody">
            <p>
              Whether you are teaching, researching, or trying to understand a
              complex idea, the first step is a clear question. Send a note and
              begin there.
            </p>
            <div className="homeContactActions">
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
          </div>
        </div>
      </section>
    </>
  );
}
