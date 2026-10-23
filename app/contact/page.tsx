import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { ArrowUpRight, YouTube } from "@/components/Icons";
import { FactList, PageHero } from "@/components/PageHero";
import { site, type ContactTopic } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send an inquiry to The Forensic Neuroscientist about education, training, consultation, research, or a general question.",
};

function topicFromQuery(
  value: string | string[] | undefined,
): ContactTopic | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;

  const normalized = raw.toLowerCase();
  if (normalized === "education") return "Education & training";
  if (normalized === "consultation") return "Consultation";
  if (normalized === "research") return "Research & resources";
  if (normalized === "general") return "General inquiry";
  return undefined;
}

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const defaultTopic = topicFromQuery(params.topic);
  const deliveryConfigured = Boolean(process.env.INQUIRY_WEBHOOK_URL);

  return (
    <>
      <PageHero
        index="07"
        eyebrow="Contact"
        title={
          <>
            Start with a <em>question</em>.
          </>
        }
        lead="A clear first note is enough. Share the question, the context, and what a useful next step would look like. The form is the only contact route published on this site."
        aside={
          <FactList
            facts={[
              { label: "Contact route", value: "Inquiry form" },
              { label: "Response time", value: "Not promised on this site" },
              { label: "Privacy", value: "Details used to respond to the inquiry" },
              { label: "Emergencies", value: "Not monitored" },
            ]}
          />
        }
      />

      <section className="section contactSection" aria-labelledby="contact-form-title">
        <div className="contactGrid">
          <aside className="contactAside">
            <p className="kicker">Before you write</p>
            <h2 id="contact-form-title">Make the question specific.</h2>
            <ul className="contactGuide">
              <li>
                <span>01</span>
                <p>
                  Say what the question is and why it matters now.
                </p>
              </li>
              <li>
                <span>02</span>
                <p>
                  Describe the setting—without names, case details, or sensitive
                  personal information.
                </p>
              </li>
              <li>
                <span>03</span>
                <p>
                  Name the outcome you need: a clearer frame, a learning
                  conversation, or a next step.
                </p>
              </li>
            </ul>

            <div className="contactChannel">
              <p className="kicker">Public updates</p>
              <a
                href={site.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YouTube />
                <span>
                  <strong>{site.channelHandle}</strong>
                  <small>Official YouTube channel</small>
                </span>
                <ArrowUpRight />
              </a>
              <p>
                The channel is the public home for videos and updates. It is not
                a monitored inquiry route.
              </p>
            </div>

            <p className="contactSafety">
              If you or someone else is at immediate risk, contact local
              emergency services or a crisis line in your region.
            </p>
          </aside>

          <div className="contactFormWrap">
            <ContactForm
              defaultTopic={defaultTopic}
              deliveryConfigured={deliveryConfigured}
            />
          </div>
        </div>
      </section>
    </>
  );
}
