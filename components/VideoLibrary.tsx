"use client";

import Image from "next/image";
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Video } from "@/content/videos";
import { formatShortDate } from "@/lib/format";
import { ArrowUpRight, Close, Play, Search } from "./Icons";

type VideoLibraryProps = {
  videos: Video[];
};

export function VideoLibrary({ videos }: VideoLibraryProps) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState<Video | null>(null);
  const deferredQuery = useDeferredValue(query);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const filteredVideos = useMemo(() => {
    const needle = deferredQuery.trim().toLowerCase();
    const matches = needle
      ? videos.filter((video) => video.title.toLowerCase().includes(needle))
      : videos;

    return [...matches].sort((a, b) => {
      const comparison = a.published.localeCompare(b.published);
      return sort === "newest" ? -comparison : comparison;
    });
  }, [deferredQuery, sort, videos]);

  useEffect(() => {
    if (!selected) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelected(null);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusables = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = bodyOverflow;
      previousFocus?.focus();
    };
  }, [selected]);

  return (
    <div className="videoLibrary">
      <div className="libraryToolbar">
        <div className="searchField">
          <Search />
          <label htmlFor="video-search" className="visuallyHidden">
            Search video titles
          </label>
          <input
            id="video-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles…"
            autoComplete="off"
          />
          {query ? (
            <button
              type="button"
              className="searchClear"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <Close />
            </button>
          ) : null}
        </div>

        <label className="sortField" htmlFor="video-sort">
          <span>Sort</span>
          <select
            id="video-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </label>
      </div>

      <p className="libraryCount" aria-live="polite">
        <span>{filteredVideos.length}</span> of {videos.length} recent uploads
      </p>

      {filteredVideos.length > 0 ? (
        <div className="videoGrid">
          {filteredVideos.map((video) => (
            <article className="videoCard" key={video.id}>
              <button
                type="button"
                className="videoThumb"
                onClick={() => setSelected(video)}
                aria-label={`Play video: ${video.title}`}
              >
                <Image
                  src={video.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  className="videoThumbImage"
                />
                <span className="videoThumbWash" aria-hidden="true" />
                <span className="videoPlay" aria-hidden="true">
                  <Play />
                </span>
              </button>

              <div className="videoCardMeta">
                <time dateTime={video.published}>
                  {formatShortDate(video.published)}
                </time>
                <span>YouTube</span>
              </div>

              <h3>
                <button
                  type="button"
                  className="videoTitleButton"
                  onClick={() => setSelected(video)}
                >
                  {video.title}
                </button>
              </h3>

              <a
                className="videoExternal"
                href={video.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube <ArrowUpRight />
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="emptyState" role="status">
          <p className="kicker">No results</p>
          <h3>No video titles match “{deferredQuery}”.</h3>
          <p>Try a broader term, or browse every upload on the channel.</p>
          <button type="button" onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      )}

      {selected ? (
        <div
          className="videoDialogBackdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <div
            className="videoDialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-dialog-title"
            ref={dialogRef}
          >
            <div className="videoDialogTop">
              <p className="kicker">Now playing</p>
              <button
                type="button"
                className="videoDialogClose"
                aria-label="Close video player"
                onClick={() => setSelected(null)}
                ref={closeButtonRef}
              >
                <Close />
              </button>
            </div>
            <div className="videoDialogFrame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selected.id}?autoplay=1&rel=0&modestbranding=1`}
                title={selected.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
            <div className="videoDialogFooter">
              <h2 id="video-dialog-title">{selected.title}</h2>
              <a
                href={selected.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open on YouTube <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
