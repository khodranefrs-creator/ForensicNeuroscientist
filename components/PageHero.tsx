import type { ReactNode } from "react";

type PageHeroProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  aside?: ReactNode;
  children?: ReactNode;
};

export function PageHero({
  index,
  eyebrow,
  title,
  lead,
  aside,
  children,
}: PageHeroProps) {
  return (
    <header className="pageHero">
      <p className="eyebrow">
        <span className="eyebrowMark" aria-hidden="true" />
        {index} / {eyebrow}
      </p>
      <div className="pageHeroGrid">
        <div className="pageHeroMain">
          <h1>{title}</h1>
          <p className="pageHeroLead">{lead}</p>
          {children}
        </div>
        {aside ? <aside className="pageHeroAside">{aside}</aside> : null}
      </div>
    </header>
  );
}

export function FactList({
  facts,
}: {
  facts: Array<{ label: string; value: string }>;
}) {
  return (
    <dl className="factList">
      {facts.map((fact) => (
        <div key={fact.label} className="factRow">
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
