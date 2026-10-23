"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
import { cx } from "@/lib/format";
import { LogoMark } from "./Logo";
import { ArrowRight, ArrowUpRight, Close, Menu, YouTube } from "./Icons";

function isCurrent(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandBlock({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={cx("brandBlock", compact && "brandBlockCompact")}
    >
      <LogoMark size={compact ? 36 : 48} priority decorative />
      <span className="brandBlockText">
        <span className="brandKicker">Forensic neuroscience</span>
        <span className="brandName">The Forensic Neuroscientist</span>
        <span className="brandSub">{site.logoWordmark}</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
  }, [open]);

  return (
    <>
      <aside className="sidebar" aria-label="Site navigation">
        <div className="sidebarTop">
          <BrandBlock />
        </div>

        <nav className="sidebarNav" aria-label="Primary navigation">
          <ol className="navList">
            {navigation.map((item, index) => {
              const active = isCurrent(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cx("navLink", active && "navLinkActive")}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="navNumber">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="navLabel">{item.label}</span>
                    <span className="navMark" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="sidebarFoot">
          <a
            className="sideYoutube"
            href={site.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTube />
            <span>Watch on YouTube</span>
            <ArrowUpRight />
          </a>
          <Link className="sideContact" href="/contact">
            <span>Start a conversation</span>
            <ArrowRight />
          </Link>
          <p className="sideMotto">{site.motto}</p>
        </div>
      </aside>

      <header className="mobileHeader">
        <BrandBlock compact />
        <button
          type="button"
          className="menuToggle"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <Close /> : <Menu />}
          <span>Menu</span>
        </button>
      </header>

      {open ? (
        <div className="mobileDrawerRoot">
          <button
            type="button"
            className="drawerBackdrop"
            aria-label="Close navigation menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
          />
          <div
            className="mobileDrawer"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
            ref={panelRef}
          >
            <div className="drawerTop">
              <p id="mobile-menu-title" className="drawerTitle">
                Navigation
              </p>
              <button
                type="button"
                className="drawerClose"
                aria-label="Close navigation menu"
                onClick={() => setOpen(false)}
                ref={closeButtonRef}
              >
                <Close />
              </button>
            </div>

            <nav aria-label="Mobile navigation">
              <ol className="drawerNavList">
                {navigation.map((item, index) => {
                  const active = isCurrent(pathname, item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cx(
                          "drawerNavLink",
                          active && "drawerNavLinkActive",
                        )}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setOpen(false)}
                      >
                        <span className="navNumber">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <div className="drawerFoot">
              <a
                href={site.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="drawerYoutube"
                onClick={() => setOpen(false)}
              >
                <YouTube />
                <span>Watch on YouTube</span>
                <ArrowUpRight />
              </a>
              <p>{site.tagline}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
