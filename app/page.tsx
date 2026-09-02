import Image from "next/image";
import { DetailViewer, Nav, Reveal, type Detail } from "./_c/Bits";
import { Cabinet } from "./_c/Cabinet";

const U = (id: string, w: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=76&auto=format&fit=crop`;

const PHOTO = {
  cabinet: "1651197227613-c5a1b6340219",
  cone: "1597183739841-5ca26ab0a604",
  port: "1575169813404-1659ec864f1a",
  room: "1593906106036-9fa76d556af3",
};

const NAV: [string, string][] = [
  ["The speaker", "#speaker"],
  ["Detail", "#detail"],
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
      <Nav items={NAV} />

      {/* A product serial number translated to UI, down the right margin. */}
      <span
        className="edge-label lab micro fixed right-[10px] top-1/2 z-40 hidden -translate-y-1/2 text-driftwood lg:block"
        aria-hidden
      >
        Ora 1-model — Bristol
      </span>

      {/* ---------------------------------------------------------- hero */}
      {/* Full-viewport photograph, the object in context. Everything else
          floats on it: the lockup upper-left, the info card lower-left, the
          thumbnail lower-right. */}
      <section id="top" className="relative h-screen w-full overflow-hidden">
        <Image
          src={U(PHOTO.room, 2000)}
          alt="An Ora speaker standing in a dark room lit by a single shaft of daylight"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-walnut/55" aria-hidden />

        <div className="relative flex h-full flex-col justify-between px-6 pb-6 pt-[104px]">
          <div>
            <p className="lab capt text-cream/80">Solid walnut · two drivers · one amplifier</p>
            <h1 className="lab display mt-[10px]">Ora</h1>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-[18px]">
            {/* the semi-transparent attribution card */}
            <div className="r-card max-w-[46ch] bg-walnut/70 p-[24px] backdrop-blur-[2px]">
              <p className="lab capt">
                Designed and made in Bristol. Sixty pairs a month, and that is the ceiling.
              </p>
              <div className="divider my-[14px]" />
              <p className="body-voice">
                One speaker, made properly. There is no second model, no subscription and no app
                that expires.
              </p>
            </div>

            {/* the lower-right card. In the reference this is a video
                thumbnail; there is no video, so it does the same job for
                something that exists — it opens the detail viewer. */}
            <a href="#detail" className="r-card group flex items-center gap-[14px] bg-walnut/70 p-[12px] backdrop-blur-[2px]">
              <span className="relative block h-[54px] w-[72px] overflow-hidden">
                <Image src={U(PHOTO.cone, 240)} alt="" fill sizes="72px" className="object-cover" />
              </span>
              <span className="lab capt pr-[10px]">
                Look closer
                <br />
                <span className="text-driftwood">Three parts of it</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- speaker */}
      {/* Void mode: the object centred on the canvas, heading left, body
          right, 18px gutters. Both text columns stay left-aligned. */}
      <section id="speaker" className="screen divider w-full px-6 py-[68px]">
        <div className="grid items-center gap-[18px] lg:grid-cols-[1fr_1.1fr_1fr]">
          <Reveal>
            <h2 className="lab headline">Everything expensive about it is inside.</h2>
          </Reveal>

          <div className="relative h-[46vh] min-h-[320px] w-full lg:h-[72vh]">
            <Cabinet />
          </div>

          <Reveal delay={0.08}>
            <p className="body-voice">
              Two drivers, one amplifier, and a rear port cut by hand into solid nineteen
              millimetre walnut. Turn the page and the cabinet turns with you.
            </p>
            <p className="lab capt mt-[24px] text-driftwood">Scroll to turn it</p>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- detail */}
      <section id="detail" className="screen divider w-full px-6 py-[68px]">
        <Reveal className="mb-[41px]">
          <p className="lab capt text-driftwood">02 — Three parts of it</p>
          <h2 className="lab headline mt-[14px]">Isn&rsquo;t just a box with a cone in it.</h2>
        </Reveal>
        <DetailViewer details={DETAILS} />
      </section>

      {/* ---------------------------------------------------------- made */}
      <section id="made" className="screen divider w-full px-6 py-[68px]">
        <Reveal className="mb-[41px]">
          <p className="lab capt text-driftwood">03 — How it is made</p>
          <h2 className="lab headline mt-[14px]">Sixty pairs a month, and that is the ceiling.</h2>
        </Reveal>

        <div className="grid gap-[41px] md:grid-cols-3">
          {MAKING.map((m, i) => (
            <Reveal key={m.n} delay={i * 0.08}>
              <div className="divider pt-[18px]">
                <p className="lab capt text-driftwood">{m.n}</p>
                <h3 className="lab sub mt-[14px]">{m.t}</h3>
                <p className="body-voice mt-[18px] text-[18px] leading-[1.26]">{m.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- spec */}
      <section id="spec" className="screen divider w-full px-6 py-[68px]">
        <div className="grid gap-[41px] lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <p className="lab capt text-driftwood">04 — Specification</p>
            <h2 className="lab headline mt-[14px]">The whole sheet.</h2>
            <p className="body-voice mt-[24px] max-w-[22ch]">
              If a number is missing it is because we do not measure it, not because it is
              unflattering.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl>
              {SPECS.map(([k, v], i) => (
                <div
                  key={k}
                  className={`grid grid-cols-[10rem_1fr] gap-[18px] py-[14px] ${
                    i > 0 ? "divider" : ""
                  }`}
                >
                  <dt className="lab capt text-driftwood">{k}</dt>
                  <dd className="lab capt">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------------- order */}
      <section id="order" className="screen divider w-full px-6 py-[68px]">
        <Reveal>
          <p className="lab capt text-driftwood">05 — Ninety days</p>
          <h2 className="lab display mt-[14px] max-w-[16ch]">
            A showroom tells you what a speaker sounds like in a showroom.
          </h2>
          <p className="body-voice mt-[24px] max-w-[26ch]">
            Take it home. If it is wrong we pay the courier both ways.
          </p>

          {/* the one filled surface on the page */}
          <div className="mt-[41px] flex flex-wrap items-center gap-[18px]">
            <a href="#order" className="btn-fill r-pill lab capt inline-block">
              Order a pair — £1,180
            </a>
            <span className="lab capt text-driftwood">
              Six week lead time · shipped from Bristol
            </span>
          </div>
        </Reveal>
      </section>

      {/* -------------------------------------------------------- footer */}
      <footer className="divider w-full px-6 py-[41px]">
        <div className="flex flex-wrap items-end justify-between gap-[24px]">
          <p className="lab display">Ora</p>
          <div className="max-w-[52ch]">
            {/* Ember: credit lines and the source link only, never a control. */}
            <p className="lab capt text-ember">
              Built by Jason Low ·{" "}
              <a href="https://github.com/new2codinglol/ora-audio" className="link">
                Read the source
              </a>
            </p>
            <p className="lab capt mt-[10px] text-driftwood">
              Ora is a fictional brand. The speaker, the workshop and the price are invented, and
              nothing here is for sale.
            </p>
            <p className="legal mt-[14px] text-driftwood">
              * Photography from Unsplash — Alexey Demidov, Scott Major, Max Anderson, Michael C.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
