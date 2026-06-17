import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Home,
  Sparkles,
  Workflow,
  Wallet,
  BookOpen,
  Scale,
  ArrowUpRight,
  Check,
  X,
  Terminal,
  Zap,
  Globe,
  Shield,
  LineChart,
  Code2,
} from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "aatman — Websites for businesses, built in minutes" },
      {
        name: "description",
        content:
          "Answer a few questions about your business. aatman generates a production-ready website — no designers, no dev cycles.",
      },
    ],
  }),
  component: Index,
});

const navItems = [
  { name: "home", url: "#home", icon: Home },
  { name: "features", url: "#features", icon: Sparkles },
  { name: "workflow", url: "#workflow", icon: Workflow },
  { name: "pricing", url: "#pricing", icon: Wallet },
  { name: "resources", url: "#resources", icon: BookOpen },
  { name: "tradeoffs", url: "#tradeoffs", icon: Scale },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <NavBar items={navItems} />
      <Hero />
      <Features />
      <WorkflowSection />
      <Pricing />
      <Resources />
      <Tradeoffs />
      <Footer />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-24"
    >
      <div className="absolute inset-0 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse" />
          v1.0 — now in public beta
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.95] text-glow"
        >
          ship a website
          <br />
          <span className="text-muted-foreground">before your coffee</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed"
        >
          aatman generates a production-grade website for your business from a
          short questionnaire. no designers. no dev cycles. just answers in,
          a live URL out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#workflow"
            className="group inline-flex items-center gap-2 rounded-md bg-foreground text-background px-5 py-3 text-sm font-semibold hover:bg-foreground/90 transition"
          >
            $ start build
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/40 backdrop-blur px-5 py-3 text-sm font-semibold text-foreground hover:bg-card transition"
          >
            view docs
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="rounded-lg border border-border bg-card/60 backdrop-blur shadow-2xl text-left overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="ml-2 text-[11px] text-muted-foreground">~ aatman/build.sh</span>
            </div>
            <pre className="px-4 py-4 text-xs leading-6 text-muted-foreground">
{`> business_name:    "north & co. coffee"
> industry:         "f&b · café"
> pages:            ["home", "menu", "about", "contact"]
> tone:             "warm, minimal, editorial"
`}<span className="text-foreground">✓ deployed → northandco.aatman.app  (38s)</span>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- FEATURES ---------------- */
const features = [
  { icon: Zap, title: "instant_generate()", body: "From form submit to live URL in under a minute. No queues, no waitlists." },
  { icon: Code2, title: "production_code", body: "Clean React + semantic HTML output. SEO, accessibility and performance baked in." },
  { icon: Globe, title: "custom_domain", body: "Bring your own domain or use a free .aatman.app subdomain by default." },
  { icon: Shield, title: "secure_by_default", body: "HTTPS, security headers, image optimization and CDN — wired up automatically." },
  { icon: Workflow, title: "iterate_in_chat", body: "Don't like a section? Refine it through a chat prompt. Re-deploy in one click." },
  { icon: LineChart, title: "built_in_analytics", body: "Page views, bounce, top sources — all in a single, privacy-first dashboard." },
];

function Features() {
  return (
    <section id="features" className="relative px-6 py-32 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeader tag="// 01" title="features" subtitle="Everything you need to put your business online. Nothing you don't." />
        <div className="mt-16 grid gap-px bg-border rounded-lg overflow-hidden border border-border md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group bg-background p-8 hover:bg-card transition"
            >
              <f.icon className="h-5 w-5 text-foreground" strokeWidth={1.75} />
              <h3 className="mt-6 text-base font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WORKFLOW + ANALYTICS ---------------- */
const steps = [
  { n: "01", t: "answer", d: "Tell us your business name, what you sell, and the tone you want." },
  { n: "02", t: "generate", d: "Our model assembles copy, layout, sections and images for your industry." },
  { n: "03", t: "review", d: "Preview every page. Tweak any block with a single prompt." },
  { n: "04", t: "deploy", d: "Publish to a free subdomain or your own. SSL and CDN included." },
];

const stats = [
  { v: "47s", l: "avg. time to first deploy" },
  { v: "98", l: "median lighthouse score" },
  { v: "12k+", l: "sites built in beta" },
  { v: "94%", l: "users skip the dev quote" },
];

function WorkflowSection() {
  return (
    <section id="workflow" className="relative px-6 py-32 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeader tag="// 02" title="how it works" subtitle="Four steps between you and a website that converts." />

        <div className="mt-16 grid md:grid-cols-4 gap-px bg-border border border-border rounded-lg overflow-hidden">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-background p-8"
            >
              <span className="text-xs text-muted-foreground">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{s.t}()</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>

        {/* Analytics panel */}
        <div className="mt-12 rounded-lg border border-border bg-card/40 backdrop-blur overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" />
              measured_improvements.json
            </div>
            <span className="text-[11px] text-muted-foreground">last 30 days</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
            {stats.map((s) => (
              <div key={s.l} className="p-8">
                <div className="text-4xl font-bold tracking-tighter text-foreground">{s.v}</div>
                <div className="mt-2 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
const tiers = [
  {
    name: "starter",
    price: "$0",
    cadence: "/forever",
    desc: "For shop owners testing the waters.",
    features: ["1 site", "aatman.app subdomain", "Up to 5 pages", "Basic analytics"],
    cta: "start free",
    highlight: false,
  },
  {
    name: "studio",
    price: "$29",
    cadence: "/month",
    desc: "For growing local businesses.",
    features: ["3 sites", "Custom domain", "Unlimited pages", "Forms & integrations", "Priority generation"],
    cta: "go studio",
    highlight: true,
  },
  {
    name: "scale",
    price: "$89",
    cadence: "/month",
    desc: "For multi-brand & agencies.",
    features: ["Unlimited sites", "Team workspace", "White-label exports", "Advanced analytics", "Dedicated support"],
    cta: "talk to us",
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-32 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeader tag="// 03" title="pricing" subtitle="Pay for what you ship. Cancel any time." />
        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`rounded-lg border p-8 flex flex-col ${
                t.highlight
                  ? "border-foreground bg-card"
                  : "border-border bg-card/40"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-foreground">{t.name}</h3>
                {t.highlight && (
                  <span className="text-[10px] uppercase tracking-widest text-background bg-foreground px-2 py-0.5 rounded">
                    popular
                  </span>
                )}
              </div>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tighter text-foreground">{t.price}</span>
                <span className="text-xs text-muted-foreground">{t.cadence}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t.desc}</p>
              <ul className="mt-8 space-y-3 text-sm text-foreground/90 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-foreground" strokeWidth={2} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full rounded-md py-3 text-sm font-semibold transition ${
                  t.highlight
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "border border-border bg-background text-foreground hover:bg-muted"
                }`}
              >
                {t.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- RESOURCES ---------------- */
const resources = [
  {
    cat: "guide",
    t: "what actually makes a business website convert",
    d: "Hierarchy, trust signals, and the 5-second test — explained without jargon.",
    read: "8 min",
  },
  {
    cat: "glossary",
    t: "DNS, hosting, SSL — what each one actually does",
    d: "The technical stack of any website, broken down for non-developers.",
    read: "6 min",
  },
  {
    cat: "playbook",
    t: "writing copy that sounds human (not corporate)",
    d: "How to brief aatman so the generated copy matches your real voice.",
    read: "5 min",
  },
  {
    cat: "guide",
    t: "SEO basics: ranking without hiring an agency",
    d: "Titles, metadata, sitemaps and the few things that move the needle.",
    read: "10 min",
  },
];

function Resources() {
  return (
    <section id="resources" className="relative px-6 py-32 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="// 04"
          title="resources"
          subtitle="Get fluent in the technical side of running your own website."
        />
        <div className="mt-16 grid md:grid-cols-2 gap-4">
          {resources.map((r, i) => (
            <motion.a
              key={r.t}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-lg border border-border bg-card/40 backdrop-blur p-8 hover:bg-card transition flex flex-col"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>// {r.cat}</span>
                <span>{r.read}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-foreground leading-snug">
                {r.t}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.d}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-xs text-foreground">
                read article
                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRADEOFFS ---------------- */
const pros = [
  "Live in minutes, not weeks",
  "No designer or developer needed",
  "Costs less than a single freelancer invoice",
  "Edit anything through plain-English prompts",
  "Built-in SEO, speed and accessibility",
];

const cons = [
  "Not built for highly custom web apps",
  "Less control than hand-written code",
  "Custom integrations may need our team",
  "Brand systems still benefit from a human designer",
];

function Tradeoffs() {
  return (
    <section id="tradeoffs" className="relative px-6 py-32 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          tag="// 05"
          title="advantages & tradeoffs"
          subtitle="An honest look at when aatman is the right call — and when it isn't."
        />
        <div className="mt-16 grid md:grid-cols-2 gap-4">
          <div className="rounded-lg border border-border bg-card/40 backdrop-blur p-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3.5 w-3.5" /> advantages.log
            </div>
            <ul className="mt-6 space-y-4">
              {pros.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-foreground/90">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card/40 backdrop-blur p-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <X className="h-3.5 w-3.5" /> tradeoffs.log
            </div>
            <ul className="mt-6 space-y-4">
              {cons.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 rounded-lg border border-border bg-gradient-to-br from-card/60 to-background p-10 text-center">
          <h3 className="text-3xl sm:text-4xl font-bold tracking-tighter text-foreground">
            ready to ship?
          </h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            Answer a handful of questions. Walk away with a live website you'd
            actually send to a customer.
          </p>
          <a
            href="#home"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground text-background px-6 py-3 text-sm font-semibold hover:bg-foreground/90 transition"
          >
            $ aatman init
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- SHARED ---------------- */
function SectionHeader({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-2xl">
      <span className="text-xs text-muted-foreground">{tag}</span>
      <h2 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tighter text-foreground">
        {title}
      </h2>
      <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{subtitle}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 pb-28 sm:pb-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-foreground" />
          <span className="text-foreground font-semibold">aatman</span>
          <span>— websites, generated.</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground transition">privacy</a>
          <a href="#" className="hover:text-foreground transition">terms</a>
          <a href="#" className="hover:text-foreground transition">contact</a>
        </div>
      </div>
    </footer>
  );
}
