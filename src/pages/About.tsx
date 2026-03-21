import { useNavigate } from "react-router-dom";
import { Map, Navigation, Star, Users, GitFork, ChevronRight, Route, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Interactive Maps",
    description:
      "Visualize every G2 and G road test route on a live Leaflet map, with smooth panning and zoom.",
  },
  {
    icon: Route,
    title: "Multiple Routes per Centre",
    description:
      "Each test centre may have several route variants. Browse them all and pick the one you want to study.",
  },
  {
    icon: Navigation,
    title: "Practice Mode",
    description:
      "Follow the route in real-time with your GPS. A pulsing marker shows your location as you drive.",
  },
  {
    icon: Zap,
    title: "Speed Limit Markers",
    description:
      "Know exactly where speed changes. Yellow markers highlight every posted speed zone along the route.",
  },
  {
    icon: Shield,
    title: "Hazard Warnings",
    description:
      "Red hazard markers flag tricky intersections, railway crossings, and common test-fail spots.",
  },
  {
    icon: GitFork,
    title: "Open Source & Community",
    description:
      "Missing a route? Submit a request or contribute route data directly. The project is open to everyone.",
  },
];

const stats = [
  { value: "40+", label: "Test Centres" },
  { value: "100+", label: "Route Paths" },
  { value: "Free", label: "Always" },
  { value: "Open", label: "Source" },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src="/favicon.png" alt="DriveTest Routes Logo" className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-primary text-lg tracking-tight">
              DriveTest Routes CA
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Open Map <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Gradient blobs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-12 right-0 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            Free · Open Source · Community-Driven
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Ace Your Canadian&nbsp;
            <span className="text-primary">Road Test</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            DriveTest Routes Canada gives you interactive, GPS-accurate maps of G2 and G test
            routes across Ontario — with speed markers, hazard flags, and a live practice mode.
            Study smart. Drive confidently.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-xl hover:bg-primary/90 transition-colors text-base shadow-lg shadow-primary/25"
            >
              <Map className="h-5 w-5" /> Explore Routes
            </button>
            <a
              href="https://github.com/ngochoan1011/drive-test-route-ca"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-border bg-card text-foreground font-semibold px-7 py-3 rounded-xl hover:bg-secondary transition-colors text-base"
            >
              <GitFork className="h-5 w-5" /> View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-2">Everything you need to prepare</h2>
        <p className="text-muted-foreground text-center mb-12">
          Packed with tools that turn stress into confidence.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-200"
            >
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-card border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Find your test centre",
                desc: "Search by city or browse the map to locate your DriveTest centre.",
              },
              {
                step: "02",
                title: "Select a route",
                desc: "Pick from available G2 or G routes. Each one is colour-coded with hazards and speed zones.",
              },
              {
                step: "03",
                title: "Practice & succeed",
                desc: "Enable Practice Mode and follow the route with your real-time GPS before test day.",
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <span className="text-5xl font-extrabold text-primary/20 mb-3">{item.step}</span>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="bg-primary/5 border border-primary/15 rounded-3xl p-12">
          <Users className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">Missing your test centre?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We're constantly expanding. If you have route data (JSON, GPX, or KML), submit it and
            help other drivers in your city prepare.
          </p>
          <button
            onClick={() => navigate("/request-route")}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-7 py-3 rounded-xl hover:bg-primary/90 transition-colors text-base shadow-lg shadow-primary/25"
          >
            <Star className="h-5 w-5" /> Request or Contribute a Route
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} DriveTest Routes Canada. Open-source &amp; free.</span>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="hover:text-foreground transition-colors">
              Map
            </button>
            <button onClick={() => navigate("/request-route")} className="hover:text-foreground transition-colors">
              Request Route
            </button>
            <a
              href="https://github.com/ngochoan1011/drive-test-route-ca"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
