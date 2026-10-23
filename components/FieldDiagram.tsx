import { cx } from "@/lib/format";

export type DiagramVariant = "brain" | "memory" | "law" | "ethics";

type FieldDiagramProps = {
  variant: DiagramVariant;
  className?: string;
};

export function FieldDiagram({ variant, className }: FieldDiagramProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      className={cx("fieldDiagram", className)}
      aria-hidden="true"
      focusable="false"
    >
      <g className="diagramGrid">
        <path d="M0 40h240M0 80h240M0 120h240M60 0v160M120 0v160M180 0v160" />
      </g>

      {variant === "brain" ? (
        <g className="diagramInk">
          <circle cx="120" cy="80" r="52" />
          <circle cx="120" cy="80" r="38" className="diagramDashed" />
          <path d="M82 78c2-18 17-32 37-32 19 0 35 12 39 30 7 9 6 24-3 32-9 12-24 17-37 12-15 6-32-1-38-15-5-8-5-19 2-27Z" />
          <path d="M88 93 108 62l29 19 20-16M107 62l4 42M137 81l8 31M88 93l18 24" />
          <circle cx="88" cy="93" r="3.5" />
          <circle cx="108" cy="62" r="3.5" />
          <circle cx="137" cy="81" r="3.5" />
          <circle cx="157" cy="65" r="3.5" className="diagramAccent" />
          <circle cx="111" cy="104" r="3.5" />
          <circle cx="145" cy="112" r="3.5" />
        </g>
      ) : null}

      {variant === "memory" ? (
        <g className="diagramInk">
          <path d="M24 116h192" />
          <path d="M44 116c10-50 46-58 64-22 14 28 32 30 44 4 14-31 40-27 56 18" />
          <path d="M44 116c18-24 38-26 52-8" className="diagramDashed" />
          <circle cx="44" cy="116" r="3.5" />
          <circle cx="108" cy="94" r="3.5" />
          <circle cx="152" cy="98" r="3.5" />
          <circle cx="208" cy="116" r="5" className="diagramAccent" />
          <path d="M44 60v56M108 72v44M152 66v50M208 54v62" className="diagramDashed" />
        </g>
      ) : null}

      {variant === "law" ? (
        <g className="diagramInk">
          <path d="M120 26v108M64 54h112M64 54 48 92h32L64 54ZM176 54l-16 38h32l-16-38Z" />
          <path d="M96 134h48" />
          <path d="M120 26l-8-12h16l-8 12Z" />
          <circle cx="64" cy="54" r="3.5" />
          <circle cx="176" cy="54" r="3.5" className="diagramAccent" />
          <circle cx="120" cy="26" r="3.5" />
          <path d="M120 86 84 108M120 86l36 22M84 108h72" className="diagramDashed" />
          <circle cx="120" cy="86" r="3.5" />
        </g>
      ) : null}

      {variant === "ethics" ? (
        <g className="diagramInk">
          <path d="M120 138V78M120 78 68 36M120 78V24M120 78l54-42" />
          <path d="M68 36 54 52M68 36l16 12M120 24l-12 16M120 24l12 16M174 36l-14 12M174 36l14 16" className="diagramDashed" />
          <circle cx="120" cy="78" r="4" />
          <circle cx="68" cy="36" r="3.5" />
          <circle cx="120" cy="24" r="3.5" className="diagramAccent" />
          <circle cx="174" cy="36" r="3.5" />
          <circle cx="54" cy="52" r="2.5" />
          <circle cx="84" cy="48" r="2.5" />
          <circle cx="108" cy="40" r="2.5" />
          <circle cx="132" cy="40" r="2.5" />
          <circle cx="160" cy="48" r="2.5" />
          <circle cx="188" cy="52" r="2.5" />
        </g>
      ) : null}
    </svg>
  );
}
