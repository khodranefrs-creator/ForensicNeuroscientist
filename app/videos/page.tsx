import type { Metadata } from "next";
import { ArrowLink } from "@/components/ArrowLink";
import { FactList, PageHero } from "@/components/PageHero";
import { VideoLibrary } from "@/components/VideoLibrary";
import { videos } from "@/content/videos";
import { YouTube } from "@/components/Icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Video Library",
  description:
    "Recent uploads from The Forensic Neuroscientist's official YouTube channel. Search the verified video titles and watch on YouTube.",
};

export default function VideosPage() {
  return (
    <>
      <PageHero
        index="04"
        eyebrow="Video library"
        title={
          <>
            The conversation, <em>in public</em>.
          </>
        }
        lead="Recent uploads from the organization's official YouTube channel. Video titles, dates, and links are taken from the channel feed and are not re-edited into claims they do not make."
        aside={
          <FactList
            facts={[
              { label: "Source", value: "Official YouTube channel" },
              { label: "Library", value: `${videos.length} recent uploads` },
              { label: "Updated", value: "From the channel feed" },
              { label: "Note", value: "Some episodes discuss violence and trauma" },
            ]}
          />
        }
      />

      <section className="section librarySection" aria-labelledby="library-title">
        <div className="libraryHeader">
          <div>
            <p className="kicker">Watch & search</p>
            <h2 id="library-title">Recent uploads.</h2>
          </div>
          <div className="libraryHeaderNote">
            <p>
              Videos load from YouTube only when you choose to play one. Some
              episodes address violence, trauma, and offending; titles are shown
              as published.
            </p>
            <a
              href={site.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTube /> {site.channelHandle}
            </a>
          </div>
        </div>

        <VideoLibrary videos={videos} />
      </section>

      <section className="libraryFooter" aria-labelledby="library-footer-title">
        <div>
          <p className="kicker">The archive</p>
          <h2 id="library-footer-title">More on the channel.</h2>
          <p>
            The site shows a recent window into the channel, not a complete
            archive. Visit YouTube for the full collection and future uploads.
          </p>
        </div>
        <ArrowLink
          href={site.channelUrl}
          external
          className="arrowLinkLight"
        >
          Open the official channel
        </ArrowLink>
      </section>
    </>
  );
}
