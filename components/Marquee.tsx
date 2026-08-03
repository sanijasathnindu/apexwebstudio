const items = [
  "STRATEGY",
  "WEB DESIGN",
  "CREATIVE DEVELOPMENT",
  "E-COMMERCE",
  "WEBGL",
  "MOTION",
  "SEO",
  "DIGITAL SYSTEMS",
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marqueeGroup" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <div className="marqueeItem" key={item}>
          <span>{item}</span>
          <i>✦</i>
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="marquee" aria-label="APEX WEB Studio capabilities">
      <div className="marqueeTrack">
        <MarqueeGroup />
        <MarqueeGroup hidden />
      </div>
    </section>
  );
}
