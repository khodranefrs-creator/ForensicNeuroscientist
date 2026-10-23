import Image from "next/image";

export function HeroPlate() {
  return (
    <figure className="heroPlate">
      <div className="plateTop">
        <span>Plate 01</span>
        <span>A field of inference</span>
      </div>

      <div className="plateArt">
        <div className="plateGrid" aria-hidden="true" />
        <svg
          className="plateOrbit"
          viewBox="0 0 600 600"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="300" cy="300" r="236" className="orbitLine" />
          <circle cx="300" cy="300" r="188" className="orbitLine orbitDashed" />
          <circle cx="300" cy="300" r="120" className="orbitLine" />
          <path d="M300 24v552M24 300h552" className="orbitCross" />
          <path
            d="M300 64a236 236 0 0 1 236 236"
            className="orbitAccent"
          />
          <circle cx="300" cy="64" r="5" className="orbitNodeAccent" />
          <circle cx="536" cy="300" r="4" className="orbitNode" />
          <circle cx="300" cy="536" r="3" className="orbitNode" />
          <circle cx="64" cy="300" r="3" className="orbitNode" />
          <circle cx="151" cy="169" r="3" className="orbitNode" />
          <circle cx="449" cy="169" r="3" className="orbitNode" />
          <circle cx="470" cy="440" r="3" className="orbitNode" />
        </svg>

        <div className="plateMark">
          <Image
            src="/brand/forensic-mark.png"
            alt="A blue brain beside an orange fingerprint profile."
            width={678}
            height={677}
            priority
            sizes="(max-width: 900px) 55vw, 240px"
            className="plateLogo"
          />
        </div>

        <span className="plateAnno plateAnnoA">Observation</span>
        <span className="plateAnno plateAnnoB">Measurement</span>
        <span className="plateAnno plateAnnoC">Inference</span>
        <span className="plateAnno plateAnnoD">Limit</span>
      </div>

      <figcaption className="plateCaption">
        <blockquote>
          A brain image is data. It is not a verdict.
        </blockquote>
        <div className="plateFoot">
          <span>Fig. 01</span>
          <span>The brain is one input among many</span>
        </div>
      </figcaption>
    </figure>
  );
}
