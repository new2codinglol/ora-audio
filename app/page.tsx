import Image from "next/image";
import { DetailViewer, Reveal, type Detail } from "./_c/Bits";

const U = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=76&auto=format&fit=crop`;

const PHOTO = {
  cabinet: "1651197227613-c5a1b6340219",
  cone: "1597183739841-5ca26ab0a604",
  port: "1575169813404-1659ec864f1a",
  room: "1593906106036-9fa76d556af3",
};

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
  {
    id: "room",
    tab: "In the room",
    title: "Loud enough for one room, honestly",
    photo: U(PHOTO.room, 1100),
    alt: "The speaker standing in a dark room lit by a single shaft of daylight",
    body: "Ora is a 30 square metre speaker. It will fill a living room, a studio, or a shop floor at half volume, and it will not pretend to fill a hall. There is no larger model to sell you, so we have no reason to undersell this one.",
    spec: "60 W continuous per channel · 48 Hz – 22 kHz ±3 dB · 86 dB sensitivity",
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
      {/* ---------------------------------------------------------- nav */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-6">
          <a href="#top" className="font-display text-2xl tracking-tight">
            Ora
          </a>
          <div className="ml-auto hidden gap-7 text-sm text-bone/70 sm:flex">
            <a href="#detail" className="transition-colors duration-200 hover:text-brass">
              The speaker
            </a>
            <a href="#making" className="transition-colors duration-200 hover:text-brass">
              How it is made
            </a>
            <a href="#specs" className="transition-colors duration-200 hover:text-brass">
              Specification
            </a>
          </div>
          <a
            href="#buy"
            className="btn btn-ghost ml-auto border border-brass/40 px-5 py-2.5 text-sm sm:ml-0"
          >
            £1,180
          </a>
        </nav>
      </header>

      {/* --------------------------------------------------------- hero */}
      <section id="top" className="relative">
        <div className="vignette relative h-[92vh] min-h-[560px] w-full overflow-hidden">
          <Image
            src={U(PHOTO.cabinet, 2000)}
            alt="An Ora speaker in solid walnut, lit from one side against a dark room"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="breathe pointer-events-none absolute -left-[10%] -top-[20%] h-[70%] w-[60%] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(194,163,92,.34), transparent 65%)",
              filter: "blur(40px)",
            }}
            aria-hidden
          />
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-6 pb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-brass">One model · made to order</p>
            <h1 className="mt-5 max-w-3xl font-display text-[3.2rem] leading-[0.95] tracking-[-0.02em] sm:text-7xl">
              One speaker,
              <br />
              made properly.
            </h1>
            <p className="mt-6 max-w-lg leading-relaxed text-bone/75">
              Solid walnut, two drivers, one amplifier, and a rear port cut by hand. There is no
              second model, no subscription and no app that expires.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#buy"
                className="btn btn-solid bg-brass px-7 py-3.5 text-sm font-semibold text-pitch"
              >
                Order a pair — £1,180
              </a>
              <a
                href="#detail"
                className="btn btn-ghost border border-brass/40 px-7 py-3.5 text-sm"
              >
                Look closer
              </a>
            </div>
            <p className="mt-5 text-xs text-ash">
              Six week lead time · free return for ninety days · shipped from Bristol
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- detail */}
      <section id="detail" className="lit">
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.24em] text-brass">Three parts of it</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
              Everything expensive about it is inside.
            </h2>
          </Reveal>

          <Reveal delay={0.06} className="mt-12">
            <DetailViewer details={DETAILS} />
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- making */}
      <section id="making" className="border-t hair bg-coal">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <h2 className="max-w-xl font-display text-4xl leading-tight sm:text-5xl">
              Sixty pairs a month, and that is the ceiling.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {MAKING.map((m, i) => (
              <Reveal key={m.n} delay={i * 0.07}>
                <div className="border-t hair pt-6">
                  <p className="font-display text-sm text-brass">{m.n}</p>
                  <h3 className="mt-3 font-display text-2xl leading-snug">{m.t}</h3>
                  <p className="mt-3 leading-relaxed text-bone/70">{m.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- specs */}
      <section id="specs" className="lit border-t hair">
        <div className="relative z-10 mx-auto grid max-w-6xl gap-14 px-6 py-24 lg:grid-cols-[.9fr_1.1fr]">
          <Reveal>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">Specification</h2>
            <p className="mt-4 max-w-sm leading-relaxed text-bone/70">
              The whole sheet. If a number is missing it is because we do not measure it, not
              because it is unflattering.
            </p>
            <div className="vignette relative mt-10 aspect-[5/4] overflow-hidden">
              <Image
                src={U(PHOTO.port, 900)}
                alt="Detail of the hand-cut rear port in a walnut cabinet"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <dl>
              {SPECS.map(([k, v], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-[8.5rem_1fr] gap-5 py-4 sm:grid-cols-[11rem_1fr] ${
                    i > 0 ? "border-t hair" : ""
                  }`}
                >
                  <dt className="text-xs uppercase tracking-[0.16em] text-brass">{k}</dt>
                  <dd className="text-bone/80">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------------------------------- buy */}
      <section id="buy" className="relative border-t hair">
        <div className="vignette relative h-[420px] overflow-hidden">
          <Image
            src={U(PHOTO.room, 1800)}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-6">
            <h2 className="max-w-lg font-display text-4xl leading-tight sm:text-5xl">
              Ninety days in your own room.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-bone/75">
              A showroom tells you what a speaker sounds like in a showroom. Take it home; if it is
              wrong we pay the courier both ways.
            </p>
            <a
              href="#buy"
              className="btn btn-solid mt-8 inline-block bg-brass px-8 py-4 text-sm font-semibold text-pitch"
            >
              Order a pair — £1,180
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- footer */}
      <footer className="border-t hair bg-coal">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="font-display text-3xl">Ora</p>
          <div className="mt-10 grid gap-6 border-t hair pt-6 text-xs leading-relaxed text-ash sm:grid-cols-2">
            <p>
              Ora is a fictional brand. This page is a design-engineering portfolio piece by Jason
              Low — the speaker, the workshop and the price are invented, and nothing here is for
              sale.
            </p>
            <p className="sm:text-right">
              Photography from Unsplash: Alexey Demidov, Scott Major, Max Anderson, Michael C.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
