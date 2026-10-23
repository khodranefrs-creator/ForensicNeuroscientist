import type { Metadata } from "next";
import { ArrowLink } from "@/components/ArrowLink";
import { External } from "@/components/Icons";
import { FactList, PageHero } from "@/components/PageHero";
import { SectionIntro } from "@/components/SectionIntro";
import { readingChecklist, resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Research & Resources",
  description:
    "A verified external reading list on forensic neuroscience, neuroethics, and the law, plus a checklist for reading neuroscience claims carefully.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Research & resources"
        title={
          <>
            Read widely. <em>Read carefully</em>.
          </>
        }
        lead="A short, verified external reading list for the questions this field keeps asking. These sources belong to their authors and publishers—not to The Forensic Neuroscientist."
        aside={
          <FactList
            facts={[
              { label: "Nature", value: "Third-party reading list" },
              { label: "Attribution", value: "Authors, publishers, and journals" },
              { label: "Client publications", value: "None listed on this site" },
              { label: "Use", value: "Context, not conclusions" },
            ]}
          />
        }
      />

      <section className="section resourceArchive" aria-labelledby="reading-list">
        <SectionIntro
          index="05.1"
          kicker="The reading list"
          title={<span id="reading-list">Three places to begin.</span>}
          description="Each entry is an external publication. Bibliographic details are shown so the source can be checked at its publisher."
        />

        <div className="resourceArchiveList">
          {resources.map((resource, index) => (
            <article className="archiveResource" key={resource.href}>
              <div className="archiveResourceTop">
                <span className="archiveNumber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="resourceType">{resource.type}</span>
              </div>
              <div className="archiveResourceBody">
                <h2>{resource.title}</h2>
                <p className="archiveAuthors">{resource.authors}</p>
                <p className="archivePublication">
                  {resource.publication}. {resource.publisher}, {resource.year}.
                </p>
                <p className="archiveNote">{resource.note}</p>
                <a
                  className="archiveLink"
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open source <External />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section checklistSection" aria-labelledby="checklist-title">
        <div className="checklistGrid">
          <div className="checklistIntro">
            <p className="kicker">A reading discipline</p>
            <h2 id="checklist-title">
              Five questions for any neuroscience claim.
            </h2>
            <p>
              These questions do not replace expertise. They are a practical way
              to slow down before a finding becomes a story.
            </p>
            <div className="checklistNote">
              <span aria-hidden="true">*</span>
              <p>
                External sources are provided for educational context. A link
                is not an endorsement, and a study does not automatically
                generalize to a person or a legal case.
              </p>
            </div>
          </div>
          <ol className="checklistList">
            {readingChecklist.map((item, index) => (
              <li key={item.question}>
                <span className="checklistNumber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{item.question}</h3>
                  <p>{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="resourcesClosing" aria-labelledby="resources-closing-title">
        <div>
          <p className="kicker">Continue</p>
          <h2 id="resources-closing-title">
            Put the reading to <em>work</em>.
          </h2>
        </div>
        <div className="closingActions">
          <ArrowLink href="/explore" className="arrowLinkLight">
            Explore the field
          </ArrowLink>
          <ArrowLink href="/videos" className="arrowLinkLight">
            Watch the video library
          </ArrowLink>
        </div>
      </section>
    </>
  );
}
