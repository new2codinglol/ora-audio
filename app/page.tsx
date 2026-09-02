import Image from "next/image";
import { DetailViewer, Nav, Reveal, type Detail } from "./_c/Bits";
import { Cabinet } from "./_c/Cabinet";

const U = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=76&auto=format&fit=crop`;

const PHOTO = {
  cone: "1597183739841-5ca26ab0a604",
  port: "1575169813404-1659ec864f1a",
};

const NAV: [string, string][] = [
  ["The speaker", "#detail"],
  ["How it is made", "#made"],
  ["Specification", "#spec"],
];

const DETAILS: Detail[] = [
  {
    id: "cone",
    tab: "The cone",
    title: "A woven cone, because paper tears",
    photo: U(PHOTO.cone, 1100),
    alt: "Close view of a woven mid-bass driver cone and its phase plug",
    body: "140 mm of woven glass fibre with a machined aluminium phase plug at the centre. It is stiffer than paper and it does not soften after four humid years in a room nobody air-conditions.",
    spec: "140 mm mid-bass · 25 mm soft dome tweeter · crossover at 2.4 kHz, second order",
  },
  {
    id: "port",
    tab: "The port",
    title: "Cut into the back, by hand",
    photo: U(PHOTO.port, 1100),
    alt: "A flared bass port cut into a solid timber cabinet panel",
    body: "A flared rear port, tuned to 42 Hz and finished on the same lathe that cuts the driver seat. Machine-flared ports chuff on anything with a sustained low note. This one does not, and you can hear where the money went.",
    spec: "Rear-firing, 62 mm throat, 42 Hz tuning · keep 20 cm from the wall",
  },
];

const SPECS: [string, string][] = [
  ["Cabinet", "Solid walnut, 19 mm, mitred and splined"],
  ["Drivers", "140 mm woven glass fibre + 25 mm soft dome"],
  ["Amplifier", "Class D, 60 W continuous per channel"],
  ["Response", "48 Hz – 22 kHz ±3 dB"],
  ["Inputs", "Wi-Fi, Bluetooth 5.3 aptX, optical, 3.5 mm"],
  ["Standby", "0.4 W. It does not phone anyone overnight"],
  ["Dimensions", "310 × 190 × 240 mm"],
  ["Weight", "7.4 kg the pair"],
  ["Warranty", "Eight years, drivers and amplifier included"],
];

const MAKING = [
  {
    n: "01",
    t: "Timber first",
    b: "Cabinets are cut from one board per pair, so the grain runs across both. It takes a week longer and it is the reason we cannot make more than sixty pairs a month.",
  },
  {
    n: "02",
    t: "One amplifier, no app",
    b: "Setup is a button on the back and a cable. There is no account, no firmware nag, and nothing that stops working when a company you have never heard of shuts down a server.",
  },
  {
    n: "03",
    t: "Repairable on purpose",
    b: "Eight screws to the driver, twelve to the amplifier board. Both are sold separately and will be for a decade. We will send you the schematic if you ask.",
  },
];

export default function Home() {
  return (
    <div>
      <Nav items={NAV} />

      {/* A serial number on a made object, down the right margin. */}
      <span
        className="edge-label lab fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 text-dim lg:block"
        aria-hidden
      >
        Ora · one model · Bristol
      </span>

      {/* ---------------------------------------------------------- hero */}
      {/* The hero is the cabinet itself rather than a photograph. Every stock
          shot to hand is a different speaker — the last one was a fabric
          cylinder on a page describing a mitred walnut box — and a page whose
          whole argument is candour cannot open on the wrong object. */}
      <section id="top" className="grain relative overflow-hidden">
        <div className="wrap grid items-center gap-12 pb-24 pt-32 lg:grid-cols-[1fr_1.05fr] lg:pb-28 lg:pt-40">
          <div className="relative z-10">
            <p className="lab text-dim">Solid walnut · two drivers · one amplifier</p>
            <h1 className="display mt-6 max-w-[13ch]">One speaker, made properly.</h1>
            <p className="lead mt-7 max-w-[42ch] text-cream/80">
              Cut from one board per pair in a workshop in Bristol. There is no second model, no
              subscription, and no app that expires.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#order" className="btn btn-solid px-7 py-3.5 text-[15px]">
                Order a pair — £1,180
              </a>
              <a href="#detail" className="btn btn-ghost px-7 py-3.5 text-[15px]">
                Look closer
              </a>
            </div>
            <p className="mt-7 text-[13.5px] text-dim">
              Six week lead time · free return for ninety days · sixty pairs a month
            </p>
          </div>

          <div className="relative h-[380px] w-full sm:h-[540px]">
            <Cabinet />
            <p className="lab absolute inset-x-0 bottom-0 text-center text-dim">
              Scroll to turn it
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- detail */}
      <section id="detail" className="hair screen">
        <div className="wrap py-24">
          <Reveal className="mb-14">
            <p className="lab text-dim">Two parts of it</p>
            <h2 className="h2 mt-5 max-w-[20ch]">Everything expensive about it is inside.</h2>
          </Reveal>
          <DetailViewer details={DETAILS} />
        </div>
      </section>

      {/* ---------------------------------------------------------- made */}
      <section id="made" className="hair screen">
        <div className="wrap py-24">
          <Reveal className="mb-14">
            <p className="lab text-dim">How it is made</p>
            <h2 className="h2 mt-5 max-w-[22ch]">
              Sixty pairs a month, and that is the ceiling.
            </h2>
          </Reveal>

          <div className="grid gap-12 md:grid-cols-3">
            {MAKING.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.07}>
                <div className="hair pt-6">
                  <p className="lab text-dim">{m.n}</p>
                  <h3 className="h3 mt-4">{m.t}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-cream/75">{m.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- spec */}
      <section id="spec" className="hair screen">
        <div className="wrap grid gap-14 py-24 lg:grid-cols-[.85fr_1.15fr]">
          <Reveal>
            <p className="lab text-dim">Specification</p>
            <h2 className="h2 mt-5">The whole sheet.</h2>
            <p className="lead mt-6 max-w-[30ch] text-cream/75">
              Ora is a thirty square metre speaker. It will fill a living room, a studio, or a
              shop floor at half volume, and it will not pretend to fill a hall — there is no
              larger model to sell you, so there is no reason to undersell this one.
            </p>
            <p className="mt-5 max-w-[30ch] text-[13.5px] text-dim">
              If a number below is missing it is because we do not measure it, not because it is
              unflattering.
            </p>
          </Reveal>

          <Reveal delay={0.07}>
            <dl>
              {SPECS.map(([k, v], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-[9rem_1fr] gap-6 py-4 sm:grid-cols-[11rem_1fr] ${
                    i > 0 ? "hair" : ""
                  }`}
                >
                  <dt className="lab pt-1 text-dim">{k}</dt>
                  <dd className="text-[15px] leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- order */}
      <section id="order" className="hair screen">
        <div className="wrap py-24">
          <Reveal>
            <p className="lab text-dim">Ninety days</p>
            <h2 className="h2 mt-5 max-w-[20ch]">
              A showroom tells you what a speaker sounds like in a showroom.
            </h2>
            <p className="lead mt-6 max-w-[38ch] text-cream/80">
              Take it home. If it is wrong we pay the courier both ways.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#order" className="btn btn-solid px-8 py-4 text-[15px]">
                Order a pair — £1,180
              </a>
              <span className="text-[13.5px] text-dim">
                Six week lead time · shipped from Bristol
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- footer */}
      <footer className="hair">
        <div className="wrap flex flex-wrap items-end justify-between gap-8 py-14">
          <p className="display">Ora</p>
          <div className="max-w-[54ch]">
            <p className="text-[13.5px] leading-relaxed text-dim">
              Ora is a fictional brand. The speaker, the workshop and the price are invented, and
              nothing here is for sale. This page is a design-engineering portfolio piece by Jason
              Low —{" "}
              <a
                href="https://github.com/new2codinglol/ora-audio"
                className="text-brass underline underline-offset-[3px]"
              >
                read the source
              </a>
              .
            </p>
            <p className="mt-4 text-[12px] leading-relaxed text-dim/70">
              Detail photography from Unsplash: Alexey Demidov, Scott Major, Max Anderson,
              Michael C. The cabinet is modelled, not photographed.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
