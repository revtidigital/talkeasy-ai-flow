import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  BarChart3,
  Bot,
  Mic,
  Puzzle,
  FileSearch,
  TrendingUp,
  Cpu,
  Shield,
  Clock,
  Globe,
  Users,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ContactFormDialog from "@/components/ContactFormDialog";

// ─── Data ──────────────────────────────────────────────────────────────────────

const services = [
  {
    number: "01",
    icon: BarChart3,
    title: "AI Strategy & Readiness Audit",
    description:
      "Fixed-fee, 3-week engagement that maps your highest-ROI AI opportunities, scores them by feasibility, and delivers a 90-day action plan. Starts at $4,999 / ₹3,50,000. Audit fee is credited toward your first build.",
    cta: "See the AI Strategy Audit",
    href: "/services",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Agentic Systems & Process Automation",
    description:
      "Productized AI agents that run back-office processes end-to-end — invoice-to-pay, ticket triage, reconciliation, vendor onboarding. The evolution of RPA. Start with our 4-week Agent Sprint: $9,995 flat, one production agent live.",
    cta: "See Agentic Automation services",
    href: "/services",
  },
  {
    number: "03",
    icon: Mic,
    title: "AI Voice Agents",
    description:
      "Human-sounding voice bots for inbound support, outbound qualification, collections, appointment booking. Multilingual (Hindi, English, regional Indian languages, Spanish). 24/7 operation, zero hold time.",
    cta: "See AI Voice Agents",
    href: "/services",
  },
  {
    number: "04",
    icon: Bot,
    title: "Custom AI Agent Development",
    description:
      "Bespoke agents for your unique workflow — SDR research, AR clerk, L2 support, RFP drafting, internal analyst. Built from scratch, not templated. You own the code, data, and IP.",
    cta: "See Custom AI Agent Development",
    href: "/services",
  },
  {
    number: "05",
    icon: Puzzle,
    title: "AI Integration Services",
    description:
      "Plug AI into the tools you already run — Salesforce, HubSpot, Zoho, Zendesk, SAP, Tally, custom internal systems. No rip-and-replace.",
    cta: "See AI Integration Services",
    href: "/services",
  },
  {
    number: "06",
    icon: FileSearch,
    title: "Document & Knowledge Intelligence",
    description:
      "Private, permission-aware AI that reads your documents, contracts, SOPs, and knowledge bases — and answers with citations. Deployed in your cloud.",
    cta: "See Knowledge Intelligence services",
    href: "/services",
  },
  {
    number: "07",
    icon: TrendingUp,
    title: "Sales Intelligence & Outreach",
    description:
      "Signal-based outbound done for you. Lead research, enrichment, personalized multi-channel campaigns. Start with a 6-week Performance Pilot: pay per qualified meeting.",
    cta: "See Sales AI services",
    href: "/services",
  },
];

const howWeWork = [
  {
    step: "Step 1",
    label: "Discover",
    timeframe: "week 0",
    description:
      "Free 30-min call. We understand your workflow, stack, and constraints. No slide dump.",
  },
  {
    step: "Step 2",
    label: "Scope",
    timeframe: "week 1",
    description:
      "Fixed-fee proposal with outcome targets, timeline, deliverables. No T&M.",
  },
  {
    step: "Step 3",
    label: "Build",
    timeframe: "weeks 2–8",
    description:
      "Sprint-based delivery. Working output weekly, not at the end.",
  },
  {
    step: "Step 4",
    label: "Deploy & measure",
    timeframe: "week 8+",
    description:
      "Go live with evals, monitoring, weekly ops. We stay on retainer or hand off clean.",
  },
];

const whyUs = [
  {
    icon: Bot,
    title: "Product + services DNA",
    description:
      "We run our own AI product at scale. You're not our first AI deployment.",
  },
  {
    icon: Clock,
    title: "Ship in weeks, not quarters",
    description: "Fixed-fee, fixed-timeline. No T&M creep.",
  },
  {
    icon: Shield,
    title: "Own your stack",
    description:
      "No lock-in; pick the model, framework, and cloud that fits your business.",
  },
  {
    icon: Globe,
    title: "India + US delivery",
    description:
      "Built in Jaipur, delivered to US standards, priced 40–60% below US boutiques.",
  },
  {
    icon: CheckCircle,
    title: "Execution, not slideware",
    description: "Every engagement ends with something running in production.",
  },
];

const faqs = [
  {
    question:
      "What are AI services and how are they different from AI tools?",
    answer:
      "AI services are end-to-end engagements — strategy, build, integration, deployment, and ongoing ops. AI tools are software licenses. Services are what you need when AI has to fit your workflow, your data, and the tools you already run.",
  },
  {
    question:
      "How is this different from a big consultancy like Deloitte or Accenture?",
    answer:
      "We actually build what we recommend. Our engagements end in production systems, not decks — and we're 30–60% of the cost because we're India-delivered with US-grade engineering.",
  },
  {
    question:
      "Do you only work with our existing stack, or do we have to migrate?",
    answer:
      "We work with what you have. Most engagements extend your current tools (Salesforce, HubSpot, Zoho, Zendesk, SAP, Tally) rather than replacing them.",
  },
  {
    question: "Who owns the code and the AI agents you build for us?",
    answer:
      "You do. Code, prompts, configs, data — all yours. We deliver clean handoff documentation on every project.",
  },
  {
    question: "What AI models do you use — are we locked in?",
    answer:
      "No lock-in. We pick the model, framework, and cloud that fits your use case — and you can swap later without a rebuild.",
  },
  {
    question: "How do you handle data security and compliance?",
    answer:
      "We deploy in your cloud (AWS/Azure/GCP/VPC) where required. We follow DPDP (India), GDPR, SOC 2, and HIPAA where applicable. No training on your data.",
  },
  {
    question: "What's the typical engagement size and timeline?",
    answer:
      "Audits: 3–4 weeks, fixed fee (from $4,999). Builds: 4–12 weeks depending on complexity. Ongoing managed services available monthly.",
  },
  {
    question:
      "Can you work with our internal team, or do you need to own the whole thing?",
    answer:
      "Both. We embed with internal teams or run end-to-end — depending on what you need. Clean handoff in either case.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://theconverseai.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://theconverseai.com/services",
    },
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "ConverseAI AI Services",
  url: "https://theconverseai.com/services",
  description:
    "End-to-end AI services: strategy audits, agent development, voice bots, integrations, and knowledge AI. Fixed-fee, shipped in weeks.",
  areaServed: ["IN", "US"],
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Services",
    itemListElement: services.map((s, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
      },
    })),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

// ─── FAQ Accordion Item ─────────────────────────────────────────────────────

const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-foreground hover:bg-secondary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-expanded={open}
      >
        <span>{question}</span>
        <ChevronDown
          className={`shrink-0 w-5 h-5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-muted-foreground leading-relaxed text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

// ─── Page Component ──────────────────────────────────────────────────────────

const Services = () => {
  return (
    <>
      <Helmet>
        <title>AI Services Company: Agents, Automation &amp; Voice | ConverseAI</title>
        <meta
          name="description"
          content="End-to-end AI services: strategy audits, agent development, voice bots, integrations, and knowledge AI. Fixed-fee, shipped in weeks. Book a free call."
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="AI services for business, AI consulting services, AI development company, AI agency, AI implementation partner, AI solutions provider, enterprise AI services India, AI integration services, AI automation services"
        />
        <meta property="og:title" content="AI Services Company: Agents, Automation & Voice | ConverseAI" />
        <meta
          property="og:description"
          content="End-to-end AI services: strategy audits, agent development, voice bots, integrations, and knowledge AI. Fixed-fee, shipped in weeks. Book a free call."
        />
        <meta property="og:url" content="https://theconverseai.com/services" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://theconverseai.com/services" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(professionalServiceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background pt-16 md:pt-20">
        <main id="main-content">

          {/* ── Hero ──────────────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden py-20 md:py-28">
            <div
              className="absolute inset-0 bg-gradient-to-b from-secondary/60 via-background to-background"
              aria-hidden="true"
            />
            <div
              className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute top-40 right-1/4 w-72 h-72 bg-violet/10 rounded-full blur-3xl"
              aria-hidden="true"
            />

            <div className="container-tight relative z-10">
              <AnimatedSection>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <span
                    className="w-2 h-2 rounded-full bg-mint animate-pulse"
                    aria-hidden="true"
                  />
                  AI Services for Business
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  AI services that actually ship —{" "}
                  <span className="gradient-text">not slide decks.</span>
                </h1>

                <h2 className="text-xl sm:text-2xl font-semibold text-muted-foreground mb-5">
                  AI services for businesses that want outcomes, not strategy
                  frameworks.
                </h2>

                <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
                  We help growing businesses move from "AI is amazing" to "AI is
                  running our work." Strategy audits, custom agents, agentic
                  automation, voice, integration, knowledge intelligence, and
                  outbound — delivered by people who've shipped AI in
                  production, not pitched it in PowerPoint.
                </p>

                <div className="flex flex-wrap gap-4">
                  <ContactFormDialog
                    trigger={
                      <Button
                        size="lg"
                        className="text-base px-8 gap-2"
                        aria-label="Get my 90-day AI roadmap"
                      >
                        Get my 90-day AI roadmap
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Button>
                    }
                  />
                  <ContactFormDialog
                    trigger={
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-base px-8 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        aria-label="Start with a $4,999 AI Readiness Audit"
                      >
                        Start with a $4,999 AI Readiness Audit →
                      </Button>
                    }
                  />
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ── What are AI services? ─────────────────────────────────────────── */}
          <section className="py-16 md:py-20 bg-secondary/30">
            <div className="container-tight">
              <AnimatedSection>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  What are AI services?
                </h2>
                <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed text-base">
                  <p>
                    AI services are engagements where a specialist team scopes,
                    builds, integrates, and runs AI systems inside your business
                    — strategy audits, custom AI agent development, voice AI,
                    AI-powered automation, AI integration with your existing
                    CRM/ERP/helpdesk, and AI-native knowledge and sales systems.
                  </p>
                  <p>
                    <strong className="text-foreground">
                      The difference between AI tools and AI services:
                    </strong>{" "}
                    tools are software you buy and try to figure out. Services
                    are teams that build the AI that fits your workflow, deploy
                    it with guardrails, and make sure it works.
                  </p>
                  <p>
                    Most companies know AI can transform their operations. Far
                    fewer know where to start, what's worth building, or how to
                    make it talk to the tools they already run on. That's the gap
                    we close.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ── The Problem We Solve ─────────────────────────────────────────── */}
          <section className="py-16 md:py-20">
            <div className="container-tight">
              <AnimatedSection>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  The problem we solve
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  You've already tried:
                </p>
                <ul className="space-y-3 mb-8 max-w-2xl">
                  {[
                    "A ChatGPT Enterprise license that barely anyone uses",
                    'A "pilot" that stalled after the demo',
                    "Tools with AI features that don't talk to each other",
                    "A consulting firm that shipped a 120-slide deck and no working product",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-muted-foreground">
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full bg-primary shrink-0"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                  Most AI services firms don't run AI themselves. We do — every
                  day, in our own conversational AI product, at scale. That's the
                  difference.
                </p>
              </AnimatedSection>
            </div>
          </section>

          {/* ── Our Services ─────────────────────────────────────────────────── */}
          <section className="py-16 md:py-24 bg-secondary/30" aria-labelledby="services-heading">
            <div className="container-tight">
              <AnimatedSection>
                <h2
                  id="services-heading"
                  className="text-3xl sm:text-4xl font-bold text-center mb-4"
                >
                  Our services
                </h2>
                <p className="text-lg text-muted-foreground text-center mb-14 max-w-xl mx-auto">
                  Seven practice areas. Every one ends with something running in
                  production.
                </p>
              </AnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, idx) => {
                  const Icon = service.icon;
                  return (
                    <AnimatedSection key={service.number} delay={idx * 0.05}>
                      <div className="bg-white rounded-2xl border border-border/60 p-6 h-full flex flex-col hover:shadow-lg transition-shadow duration-300 group">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                          </div>
                          <span className="text-xs font-bold text-muted-foreground/50 mt-2">
                            {service.number}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-3 leading-snug">
                          {service.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                          {service.description}
                        </p>
                        <Link
                          to={service.href}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all"
                          aria-label={service.cta}
                        >
                          {service.cta}
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── How We Work ──────────────────────────────────────────────────── */}
          <section className="py-16 md:py-24" aria-labelledby="how-we-work-heading">
            <div className="container-tight">
              <AnimatedSection>
                <h2
                  id="how-we-work-heading"
                  className="text-3xl sm:text-4xl font-bold text-center mb-14"
                >
                  How we work
                </h2>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {howWeWork.map((step, idx) => (
                  <AnimatedSection key={step.step} delay={idx * 0.08}>
                    <div className="relative bg-white border border-border/60 rounded-2xl p-6 hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-4">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                        {step.step} — {step.timeframe}
                      </p>
                      <h3 className="text-base font-bold text-foreground mb-2">
                        {step.label}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* ── Why ConverseAI ───────────────────────────────────────────────── */}
          <section className="py-16 md:py-24 bg-secondary/30" aria-labelledby="why-us-heading">
            <div className="container-tight">
              <AnimatedSection>
                <h2
                  id="why-us-heading"
                  className="text-3xl sm:text-4xl font-bold text-center mb-14"
                >
                  Why ConverseAI
                </h2>
              </AnimatedSection>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyUs.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <AnimatedSection key={item.title} delay={idx * 0.06}>
                      <div className="flex gap-4 bg-white border border-border/60 rounded-2xl p-6 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── By the Numbers ───────────────────────────────────────────────── */}
          <section className="py-16 md:py-20" aria-labelledby="numbers-heading">
            <div className="container-tight">
              <AnimatedSection>
                <h2
                  id="numbers-heading"
                  className="text-3xl sm:text-4xl font-bold text-center mb-10"
                >
                  ConverseAI by the numbers
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {[
                    {
                      label: "Headquarters",
                      value: "Jaipur, India",
                      sub: "US business presence",
                    },
                    {
                      label: "Parent company",
                      value: "Revti Digital",
                      sub: "",
                    },
                    {
                      label: "Verticals served",
                      value: "7+",
                      sub: "D2C, B2B SaaS, BFSI, healthcare, education, real estate, professional services",
                    },
                    {
                      label: "Languages supported (voice)",
                      value: "20+",
                      sub: "Hindi, English, Tamil, Telugu, Marathi, Kannada, Bengali, Spanish & more",
                    },
                    {
                      label: "Model coverage",
                      value: "All major LLMs",
                      sub: "Claude, OpenAI, Gemini, Llama, Qwen, Mistral",
                    },
                    {
                      label: "Frameworks",
                      value: "LangGraph, CrewAI, MCP",
                      sub: "OpenAI Agents SDK, Claude Agent SDK & more",
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white border border-border/60 rounded-2xl p-6 text-center"
                    >
                      <p className="text-2xl font-bold text-primary mb-1">
                        {stat.value}
                      </p>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        {stat.label}
                      </p>
                      {stat.sub && (
                        <p className="text-xs text-muted-foreground">{stat.sub}</p>
                      )}
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ── Who We Work With ─────────────────────────────────────────────── */}
          <section className="py-16 md:py-20 bg-secondary/30" aria-labelledby="who-we-work-heading">
            <div className="container-tight">
              <AnimatedSection>
                <h2
                  id="who-we-work-heading"
                  className="text-3xl sm:text-4xl font-bold mb-6"
                >
                  Who we work with
                </h2>
                <div className="max-w-2xl space-y-4 text-muted-foreground text-base leading-relaxed">
                  <p>
                    SMB and mid-market teams (20–5,000 employees) in India and
                    the US.
                  </p>
                  <p>
                    Heads of Ops, RevOps, CX, IT, Sales, Finance — anyone owning
                    a painful workflow.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      "B2B SaaS",
                      "Services",
                      "D2C",
                      "BFSI",
                      "Healthcare",
                      "Education",
                      "Real Estate",
                      "Manufacturing",
                    ].map((v) => (
                      <span
                        key={v}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </section>

          {/* ── FAQs ─────────────────────────────────────────────────────────── */}
          <section className="py-16 md:py-24" aria-labelledby="faq-heading">
            <div className="container-tight max-w-3xl">
              <AnimatedSection>
                <h2
                  id="faq-heading"
                  className="text-3xl sm:text-4xl font-bold text-center mb-12"
                >
                  Frequently asked questions
                </h2>
              </AnimatedSection>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <AnimatedSection key={faq.question}>
                    <FaqItem question={faq.question} answer={faq.answer} />
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          {/* ── Final CTA ────────────────────────────────────────────────────── */}
          <section className="py-20 md:py-28 bg-gradient-to-b from-secondary/40 to-background">
            <div className="container-tight text-center">
              <AnimatedSection>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Not sure where to start?
                </h2>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                  Start with the $4,999 AI Readiness Audit. If we build together
                  after, the audit fee is credited toward your first engagement.
                  If we're not the right fit, we'll say so in 30 minutes.
                </p>
                <ContactFormDialog
                  trigger={
                    <Button
                      size="lg"
                      className="text-base px-10 gap-2"
                      aria-label="Get my 90-day AI roadmap"
                    >
                      Get my 90-day AI roadmap
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Button>
                  }
                />
              </AnimatedSection>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
};

export default Services;
