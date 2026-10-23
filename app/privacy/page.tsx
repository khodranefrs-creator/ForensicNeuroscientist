import type { Metadata } from "next";
import { ArrowLink } from "@/components/ArrowLink";
import { FactList, PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "A short privacy note for The Forensic Neuroscientist website, covering the inquiry form, embedded YouTube videos, and external links.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        index="08"
        eyebrow="Privacy"
        title={
          <>
            A short <em>privacy note</em>.
          </>
        }
        lead="This site is designed to collect as little as possible. It has no accounts, no newsletter, no advertising trackers, and no analytics script."
        aside={
          <FactList
            facts={[
              { label: "Analytics", value: "None" },
              { label: "Advertising", value: "None" },
              { label: "Inquiry form", value: "Used to respond to the message" },
              { label: "Updated", value: "October 2026" },
            ]}
          />
        }
      />

      <section className="section privacySection">
        <div className="privacyGrid">
          <aside className="privacyIndex" aria-label="Privacy sections">
            <p className="kicker">Contents</p>
            <ol>
              <li>
                <a href="#inquiry-form">Inquiry form</a>
              </li>
              <li>
                <a href="#youtube">YouTube embeds</a>
              </li>
              <li>
                <a href="#external-links">External links</a>
              </li>
              <li>
                <a href="#your-choices">Your choices</a>
              </li>
            </ol>
          </aside>

          <div className="privacyBody">
            <article id="inquiry-form">
              <h2>Inquiry form</h2>
              <p>
                The inquiry form asks for your name, email address, optional
                organization, an inquiry category, and a message. Those details
                are used to understand and respond to your inquiry.
              </p>
              <p>
                If delivery is configured for the site, the message is forwarded
                to the organization’s inquiry endpoint. If delivery is not
                configured, the form says so and the message is not transmitted
                or stored. The form does not use the details for marketing.
              </p>
              <p>
                Please do not include sensitive personal, clinical, or case
                information in the first message.
              </p>
            </article>

            <article id="youtube">
              <h2>YouTube embeds</h2>
              <p>
                Video players are not loaded until you choose to play a video.
                When a video loads, YouTube may receive technical information
                about your browser and may set cookies or similar storage under
                its own policies. This site uses the YouTube privacy-enhanced
                domain for embeds where available.
              </p>
              <p>
                Watching a video is optional. You can also open the video
                directly on YouTube.
              </p>
            </article>

            <article id="external-links">
              <h2>External links</h2>
              <p>
                Research links point to third-party publishers. This site does
                not control their content, privacy practices, or availability.
                Review the destination’s policy before sharing information
                there.
              </p>
            </article>

            <article id="your-choices">
              <h2>Your choices</h2>
              <p>
                You can ask about the handling of an inquiry by using the
                contact form and choosing “General inquiry.” Please do not send
                sensitive information in that request.
              </p>
              <p>
                If a legal or organizational privacy policy is required for a
                future engagement, it should be provided by the organization in
                writing. This short note describes the behavior of the website.
              </p>
            </article>

            <div className="privacyNotice">
              <p className="kicker">Educational disclaimer</p>
              <p>
                This website provides educational information only. It is not
                medical advice, legal advice, a diagnosis, or a substitute for
                case-specific professional judgment. No clinical, legal, or
                emergency service is provided through this site.
              </p>
            </div>

            <ArrowLink href="/contact">Ask a privacy question</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
