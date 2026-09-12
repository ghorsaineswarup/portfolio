const items = [
  "FULL-STACK DEVELOPMENT",
  "AI ENGINEERING",
  "MACHINE LEARNING",
  "WEB APPLICATIONS"
];

export default function Marquee() {
  return (
    <div className="marquee-strip" aria-label="Areas of focus">
      <div className="marquee-track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>
            {item} <b className="diamond">◆</b>
          </span>
        ))}
      </div>
    </div>
  );
}
