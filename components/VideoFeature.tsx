"use client";

import Image from "next/image";
import { useState } from "react";
import type { Video } from "@/content/videos";
import { formatDate } from "@/lib/format";
import { ArrowUpRight, Play, YouTube } from "./Icons";

type VideoFeatureProps = {
  video: Video;
  description: string;
  duration: string;
};

export function VideoFeature({
  video,
  description,
  duration,
}: VideoFeatureProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="videoFeatureGrid">
      <div className="featuredMedia">
        <div className="featuredPlayer">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
            />
          ) : (
            <button
              type="button"
              className="featuredPoster"
              onClick={() => setPlaying(true)}
            >
              <Image
                src={video.thumbnail}
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                className="featuredImage"
              />
              <span className="visuallyHidden">{video.title}</span>
              <span className="posterWash" aria-hidden="true" />
              <span className="playSeal" aria-hidden="true">
                <Play />
              </span>
              <span className="posterMeta">
                Play film <span>{duration}</span>
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="featuredCopy">
        <div className="featuredMeta">
          <span className="featuredLabel">Featured film</span>
          <span>{formatDate(video.published)}</span>
          <span>{duration}</span>
        </div>
        <h3>{video.title}</h3>
        <p>{description}</p>
        <div className="featuredActions">
          <a
            className="textLink"
            href={video.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on YouTube <ArrowUpRight />
          </a>
          <a
            className="textLink textLinkMuted"
            href="https://www.youtube.com/@TheForensicNeuroscientist"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube /> Visit the channel
          </a>
        </div>
        <p className="featuredNote">
          Loaded from YouTube only when you choose to play it.
        </p>
      </div>
    </div>
  );
}
