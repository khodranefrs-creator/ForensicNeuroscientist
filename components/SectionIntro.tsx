import type { ReactNode } from "react";
import { cx } from "@/lib/format";

type SectionIntroProps = {
  index: string;
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
};

export function SectionIntro({
  index,
  kicker,
  title,
  description,
  className,
}: SectionIntroProps) {
  return (
    <div className={cx("sectionIntro", className)}>
      <div className="sectionIntroIndex" aria-hidden="true">
        {index}
      </div>
      <div className="sectionIntroBody">
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
        {description ? <p className="sectionDescription">{description}</p> : null}
      </div>
    </div>
  );
}
