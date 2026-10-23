import Link from "next/link";
import { navigation, site } from "@/content/site";
import { resources } from "@/content/resources";
import { FullLogo } from "./Logo";
import { ArrowUpRight, YouTube } from "./Icons";

export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="footerInner">
        <div className="footerGrid">
          <div className="footerBrand">
            <Link href="/" aria-label={`${site.name} — home`}>
              <FullLogo width={420} />
            </Link>
            <p className="footerDescription">
              An education, training, and consultation organization exploring
              the connections between brain science, human behavior, forensic
              practice, and the law.
            </p>
            <p className="footerMotto">
              <span />
              Learn. Connect. Apply.
            </p>
          </div>

          <nav className="footerColumn" aria-label="Footer navigation">
            <h2>Navigate</h2>
            <ul>
              {navigation.slice(1).map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footerColumn">
            <h2>Connect</h2>
            <ul>
              <li>
                <a
                  href={site.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTube />
                  YouTube channel <ArrowUpRight />
                </a>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy">Privacy</Link>
              </li>
            </ul>

            <h2 className="footerSubheading">External reading</h2>
            <ul className="footerReading">
              {resources.map((resource) => (
                <li key={resource.href}>
                  <a
                    href={resource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.title}
                    <ArrowUpRight />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footerBottom">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="footerDisclaimer">
            Educational content only. Not medical or legal advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
