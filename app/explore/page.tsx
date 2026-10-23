import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLink } from "@/components/ArrowLink";
import { FieldDiagram, type DiagramVariant } from "@/components/FieldDiagram";
import { ArrowRight, External } from "@/components/Icons";
import { FactList, PageHero } from "@/components/PageHero";
import { fieldTopics } from "@/content/field";
import { resources } from "@/content/resources";
import { cx } from "@/lib/format";

export const metadata: Metadata = {
  title: "Explore the Field",
  description:
    "Four educational entry points into forensic neuroscience: brain and behavior, memory and evidence, neuroscience and the law, and neuroethics.",
};

const diagramVariants: DiagramVariant[] = [
  "brain",
  "memory",
  "law",
  "ethics",
];

export default function ExplorePage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Explore the field"
        title={
          <>
            Four ways into a <em>difficult question</em>.
          </>
        }
        lead="Forensic neuroscience is not a single finding or a single technique. It is a set of questions about measurement, behavior, memory, responsibility, and the limits of what evidence can support."
        aside={
          <FactList
            facts={[
              { label: "Approach", value: "Evidence, inference, and limits" },
              { label: "Sources", value: "External reading list" },
              { label: "Use", value: "Educational, not diagnostic" },
              { label: "Scope", value: "An entry point, not a complete review" },
            ]}
          />
        }
      >
        <nav className="fieldChapterNav" aria-label="Field notes">
          {fieldTopics.map((topic) => (
            <a href={`#${topic.slug}`} key={topic.slug}>
              <span>{topic.number}</span>
              {topic.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="fieldArticles">
        {fieldTopics.map((topic, index) => (
          <article
            className={cx(
              "fieldArticle",
              index % 2 === 1 && "fieldArticleReverse",
            )}
            id={topic.slug}
            key={topic.slug}
          >
            <div className="fieldArticleVisual">
              <div className="fieldArticleVisualTop">
                <span>Field note</span>
                <span>{topic.number}</span>
              </div>
              <FieldDiagram
                variant={diagramVariants[index]}
                className="fieldArticleDiagram"
              />
              <p>{topic.short}</p>
            </div>

            <div className="fieldArticleContent">
              <p className="kicker">{topic.number} / Entry point</p>
              <h2>{topic.title}</h2>
              <p className="leadParagraph">{topic.intro}</p>

              <div className="fieldBlocks">
                <div className="fieldBlock">
                  <h3>What the science can show</h3>
                  <ul>
                    {topic.canShow.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="fieldBlock fieldBlockLimit">
                  <h3>What it cannot settle</h3>
                  <ul>
                    {topic.cannotSettle.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="fieldQuestions">
                <h3>Questions to carry</h3>
                <ol>
                  {topic.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ol>
              </div>

              <div className="fieldSources">
                <p className="kicker">Further reading</p>
                <ul>
                  {topic.sourceIndexes.map((sourceIndex) => {
                    const source = resources[sourceIndex];
                    if (!source) return null;
                    return (
                      <li key={source.href}>
                        <a
                          href={source.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>
                            <span className="sourceTitle">{source.title}</span>
                            <span className="sourceMeta">
                              {source.authors} · {source.year}
                            </span>
                          </span>
                          <External />
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <p className="sourceDisclaimer">
                  External sources are provided for further reading. They are
                  not publications of The Forensic Neuroscientist.
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="fieldClosing" aria-labelledby="field-closing-title">
        <div>
          <p className="kicker">A closing note</p>
          <h2 id="field-closing-title">
            A field note is not a <em>finding</em>.
          </h2>
        </div>
        <div className="fieldClosingBody">
          <p>
            The purpose of these notes is to improve the questions, not to
            deliver a verdict. Read the original sources, check the methods, and
            keep the context in view.
          </p>
          <div className="closingActions">
            <Link className="btn btnAccent" href="/resources">
              Open the reading list <ArrowRight />
            </Link>
            <ArrowLink href="/videos" className="arrowLinkLight">
              Watch the conversations
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
