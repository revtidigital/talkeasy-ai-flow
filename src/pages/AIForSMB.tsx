import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/submitContactForm";
import { trackFormSuccess } from "@/lib/tracking";

const smbServices = [
  {
    title: "AI Readiness Audit",
    price: "from $4,999",
    description:
      "The most common entry point. 3-week fixed-fee engagement that maps your highest-ROI AI opportunities. Audit fee credited toward the build.",
    href: "/services/ai-strategy-audit",
    url: "https://theconverseai.com/services/ai-strategy-audit",
  },
  {
    title: "AI Voice Agents",
    price: "from $2,500 setup + usage",
    description:
      "Answer inbound calls 24/7, qualify leads, book appointments. Most SMBs recover the setup cost in month 1 on missed-call recovery alone.",
    href: "/services/ai-voice-agents",
    url: "https://theconverseai.com/services/ai-voice-agents",
  },
  {
    title: "Agent Sprint",
    price: "$9,995",
    description:
      "4 weeks to one production agent. Pick one back-office workflow (invoice processing, ticket triage, vendor onboarding).",
    href: "/services/agentic-automation",
    url: "https://theconverseai.com/services/agentic-automation",
  },
  {
    title: "Sales Intelligence & Outreach",
    price: "Performance Pilot, pay per meeting",
    description:
      "6-week pilot. Pay per Stage-2 meeting, not per send. Starts at $300/meeting.",
    href: "/services/sales-ai",
    url: "https://theconverseai.com/services/sales-ai",
  },
  {
    title: "Custom AI Agent Development",
    price: "$2K Feasibility Review → $25K+ build",
    description:
      "When off-the-shelf doesn't fit. Start with the $2K 1-week feasibility review before committing.",
    href: "/services/custom-ai-agents",
    url: "https://theconverseai.com/services/custom-ai-agents",
  },
  {
    title: "Document & Knowledge Intelligence",
    price: "pilot from $15K",
    description:
      "When new hires take forever to ramp and your SOPs are a mess.",
    href: "/services/knowledge-intelligence",
    url: "https://theconverseai.com/services/knowledge-intelligence",
  },
  {
    title: "AI Integration Services",
    price: "from $10K per integration",
    description:
      "When your CRM or helpdesk has \"AI features\" but they don't do anything useful.",
    href: "/services/ai-integration",
    url: "https://theconverseai.com/services/ai-integration",
  },
];

const smbNeeds = [
  {
    quote: "We know AI could help us — we have no idea where to start.",
    recommendation: "Start with an AI Readiness Audit ($4,999). 3 weeks to a prioritized roadmap.",
    href: "/services/ai-strategy-audit",
    cta: "AI Readiness Audit",
  },
  {
    quote: "We're missing calls / leads / support requests because we can't staff 24/7.",
    recommendation:
      "Deploy AI Voice Agents. Answer 100% of inbound, qualify leads, book appointments — live in 4 weeks.",
    href: "/services/ai-voice-agents",
    cta: "AI Voice Agents",
  },
  {
    quote: "Our team is drowning in repetitive back-office work.",
    recommendation: "Start with a 4-week Agent Sprint. One production agent. $9,995 flat.",
    href: "/services/agentic-automation",
    cta: "Agent Sprint",
  },
  {
    quote: "We need more pipeline but can't afford SDRs.",
    recommendation: "Sales Intelligence & Outreach Performance Pilot. Pay per meeting booked.",
    href: "/services/sales-ai",
    cta: "Sales Intelligence & Outreach",
  },
  {
    quote: "New hires take forever to ramp. Our SOPs are a mess.",
    recommendation:
      "A Knowledge Assistant ingests your docs and answers team questions in seconds. Pilot from $15K.",
    href: "/services/knowledge-intelligence",
    cta: "Knowledge Assistant",
  },
  {
    quote: "Our CRM/helpdesk has \"AI features\" but they don't do anything useful.",
    recommendation: "AI Integration Services extends your existing tools with custom AI layers that actually work.",
    href: "/services/ai-integration",
    cta: "AI Integration Services",
  },
];

const journey = [
  {
    title: "Month 0 — Discovery.",
    description: "30-min free call. We figure out if AI helps you, and where to start.",
  },
  {
    title: "Month 1 — First engagement.",
    description: "Typically a Readiness Audit or an Agent Sprint. Budget: $5K–$25K.",
  },
  {
    title: "Months 2–3 — Build the first system.",
    description: "Voice agent, knowledge assistant, custom agent, or integration. Live by month 3.",
  },
  {
    title: "Months 4–6 — Expand coverage.",
    description: "Second and third workflows. By month 4, the second system starts paying for the first.",
  },
  {
    title: "Ongoing.",
    description: "Managed retainer or clean handoff — your call.",
  },
];

const industries = [
  "D2C & e-commerce — WhatsApp commerce, support bots, abandoned-cart voice calls",
  "Professional services — RFP automation, sales outreach, knowledge assistants",
  "B2B SaaS — SDR automation, support deflection, onboarding assistants",
  "Real estate — lead qualification voice bots, property matching agents",
  "Healthcare clinics — appointment scheduling, reminders, intake automation",
  "Education & EdTech — admissions outreach, student support, content assistants",
  "Local services — 24/7 reception, missed-call recovery, booking automation",
  "Manufacturing & trade — invoice automation, vendor management, procurement agents",
];

const benchmarks = [
  { label: "Voice agents", value: "40% of missed calls recovered within first month" },
  { label: "Custom support agents", value: "30–60% of Tier-1 tickets deflected" },
  { label: "Sales outreach pilots", value: "8–14 Stage-2 meetings per quarter, pay-per-meeting" },
  { label: "Knowledge assistants", value: "50%+ reduction in \"where do I find…\" questions" },
  { label: "Finance automation", value: "70%+ reduction in manual invoice cycles" },
];

const stats = [
  { label: "Founded", value: "[TO CONFIRM: YYYY]" },
  { label: "HQ", value: "Jaipur, India (+ US presence)" },
  { label: "Parent", value: "Revti Digital" },
  { label: "SMB clients served", value: "[TO CONFIRM]" },
  { label: "AI systems shipped", value: "[TO CONFIRM]" },
  {
    label: "Verticals",
    value: "D2C, B2B SaaS, BFSI, healthcare, education, real estate, professional services",
  },
];

const faqs = [
  {
    question: "Can we afford AI as a small business?",
    answer:
      "If \"small\" means under 10 employees — probably not custom builds yet. Start with our Strategy Audit or a voice agent pilot. If you're 20–500 employees, yes — our pricing is built for you.",
  },
  {
    question: "What's the minimum engagement?",
    answer:
      "The $2,000 Agent Feasibility Review and the $2,500 Voice Agent setup are our smallest fixed-scope entries. Audit starts at $4,999. Sales outreach Performance Pilot is pay-per-meeting.",
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes — especially funded B2B SaaS and services startups. We don't do equity-for-work engagements.",
  },
  {
    question: "We don't have technical staff. Can you still help?",
    answer:
      "Yes. We deliver turnkey systems with clean handoff docs. Many SMB clients have no internal AI team.",
  },
  {
    question: "What tools do we need to already have?",
    answer:
      "Usually just the tools you already run — CRM, helpdesk, spreadsheets, WhatsApp. We integrate with what exists.",
  },
  {
    question: "How do we measure ROI?",
    answer:
      "We define 2–3 outcome metrics with you at kickoff and report weekly/monthly. Most engagements pay back in 3–6 months.",
  },
  {
    question: "What AI should a small business implement first?",
    answer:
      "Depends on your biggest pain. Missing calls → voice agent. Too much repetitive back-office work → Agent Sprint. No pipeline → sales outreach pilot. Can't decide → Readiness Audit. Or take the 2-min diagnostic above.",
  },
  {
    question: "Can we start small and expand?",
    answer:
      "Yes. Most SMB clients start with one engagement, see results, then expand. No contract lock-in.",
  },
];

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const AIForSMB = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      toast({
        title: "Enter a valid email",
        description: "We’ll use it to send your SMB AI starting point PDF.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactForm({
        fullName: "SMB AI Starting Point PDF",
        email,
        phone: "",
        countryName: "",
        product: "SMB AI Starting Point PDF",
        subject: "SMB AI Starting Point PDF request",
        message: "Requested the SMB AI Starting Point PDF from /solutions/ai-for-smb.",
        form_source: "SMB AI Starting Point PDF",
      });
      trackFormSuccess("smb_ai_pdf");
      setEmail("");
      toast({
        title: "PDF on the way",
        description: "Check your inbox for the SMB AI starting point PDF.",
      });
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again or book a call with our team.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "AI for Small & Mid-Sized Businesses (SMB)",
        url: "https://theconverseai.com/solutions/ai-for-smb",
        description:
          "Affordable AI services for SMBs and mid-market — voice agents, custom AI, outbound, knowledge assistants. Fixed-fee, live in weeks. Book a call.",
      },
      {
        "@type": "ItemList",
        name: "AI services SMBs actually use",
        itemListElement: smbServices.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            url: service.url,
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
      {
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
            name: "AI for SMBs",
            item: "https://theconverseai.com/solutions/ai-for-smb",
          },
        ],
      },
      {
        "@type": "BusinessAudience",
        name: "Small and mid-sized businesses",
        audienceType: "SMB",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>AI for Small &amp; Mid-Sized Businesses (SMB) | ConverseAI</title>
        <meta
          name="description"
          content="Affordable AI services for SMBs and mid-market — voice agents, custom AI, outbound, knowledge assistants. Fixed-fee, live in weeks. Book a call."
        />
        <meta property="og:title" content="AI for Small & Mid-Sized Businesses (SMB) | ConverseAI" />
        <meta
          property="og:description"
          content="Affordable AI services for SMBs and mid-market — voice agents, custom AI, outbound, knowledge assistants. Fixed-fee, live in weeks. Book a call."
        />
        <link rel="canonical" href="https://theconverseai.com/solutions/ai-for-smb" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background pt-16 md:pt-20">
        <main id="main-content">
          <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-primary/15 via-violet/10 to-background">
            <div className="absolute top-16 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-violet/15 rounded-full blur-3xl" />
            <div className="container-tight relative z-10 text-center py-12">
              <AnimatedSection>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-4">AI for SMBs</p>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Big AI. SMB price point. Same team.
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <h2 className="text-xl sm:text-2xl text-foreground/80 font-semibold mb-6">
                  AI services for small and mid-sized businesses — built for outcomes, priced to be accessible.
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
                  You don&apos;t need a $500K AI project. You need one that pays back in 90 days. That&apos;s what we build
                  for SMBs and mid-market teams in India and the US.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="hero" size="xl">
                    <a href="#smb-diagnostic" title="Find my starting point with the SMB AI diagnostic">
                      Find my starting point (2-min diagnostic)
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                  <Button asChild variant="hero-outline" size="xl">
                    <a href="#smb-services" title="Browse SMB-friendly services">
                      Browse SMB-friendly services
                    </a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section id="smb-diagnostic" className="section-padding">
            <div className="container-tight">
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <AnimatedSection>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">SMB AI diagnostic</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Phase 2 ships a 2-minute diagnostic that recommends your best starting service based on team size,
                      biggest pain, current AI use, and budget.
                    </p>
                    <p className="text-lg text-muted-foreground mb-6">
                      Until that&apos;s live, grab the SMB AI Starting Point PDF. It covers the same questions, with
                      recommended next steps you can use immediately.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Team size and growth stage</li>
                      <li>• Biggest operational pain today</li>
                      <li>• Current AI usage (if any)</li>
                      <li>• Budget range for a 90-day ROI project</li>
                    </ul>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.1}>
                  <div className="glass-card rounded-2xl p-8 border border-primary/10 bg-white/90">
                    <h3 className="text-2xl font-semibold mb-3">Get your AI Starting Point PDF</h3>
                    <p className="text-muted-foreground mb-6">
                      Enter your email and we&apos;ll send the PDF with the recommended SMB starting plays.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-1">
                        <label htmlFor="smb-email" className="sr-only">
                          Email address
                        </label>
                        <Input
                          id="smb-email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          className="h-12 bg-white/70 border-muted focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Get Your AI Starting Point PDF"}
                        <ArrowRight className="w-5 h-5" />
                      </Button>
                    </form>
                    <p className="text-sm text-muted-foreground mt-4">
                      Prefer to talk it through?{" "}
                      <Link to="/contact-us" className="text-primary font-semibold hover:underline">
                        Book a 30-min discovery call
                      </Link>
                      .
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          <section className="section-padding bg-secondary/20">
            <div className="container-tight">
              <AnimatedSection>
                <div className="max-w-3xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Why this page exists</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Most AI services are built for Fortune 500 buyers — long engagements, six-figure minimums, enterprise
                    sales cycles. SMBs get ignored or priced out.
                  </p>
                  <p className="text-xl font-semibold text-foreground mb-4">
                    You don&apos;t have an AI budget problem. You have an AI scoping problem.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We built our service menu differently. Fixed-fee engagements. 4-week sprints. Starting prices a small
                    business can actually afford. Outcomes that move your P&amp;L next quarter.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section id="smb-services" className="section-padding">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    The AI services SMBs actually use
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Ranked by how often we start here.
                  </p>
                </div>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 gap-6">
                {smbServices.map((service, index) => (
                  <AnimatedSection key={service.title}>
                    <div className="glass-card rounded-2xl p-8 border border-border/60 bg-white/90 h-full">
                      <p className="text-sm font-semibold text-primary mb-2">#{index + 1}</p>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm font-semibold text-foreground/80 mb-4">{service.price}</p>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <Link
                        to={service.href}
                        className="text-primary font-semibold inline-flex items-center gap-2 hover:underline"
                      >
                        Explore {service.title}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding bg-secondary/20">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">What SMBs typically want from us</h2>
                </div>
              </AnimatedSection>
              <div className="grid lg:grid-cols-2 gap-6">
                {smbNeeds.map((need) => (
                  <AnimatedSection key={need.quote}>
                    <div className="rounded-2xl border border-border/60 bg-white/90 p-6 h-full">
                      <p className="text-lg font-semibold mb-3">&ldquo;{need.quote}&rdquo;</p>
                      <p className="text-muted-foreground mb-4">{need.recommendation}</p>
                      <Link to={need.href} className="text-primary font-semibold inline-flex items-center gap-2">
                        {need.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Why SMBs work with us</h2>
                </div>
              </AnimatedSection>
              <div className="grid md:grid-cols-3 gap-6">
                <AnimatedSection>
                  <div className="rounded-2xl border border-primary/10 bg-white/90 p-6 h-full">
                    <h3 className="text-lg font-semibold mb-2">Fixed fees, not open-ended.</h3>
                    <p className="text-muted-foreground">
                      Every engagement is fixed-fee, fixed-timeline. No T&amp;M creep. You know the price before we start.
                    </p>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.1}>
                  <div className="rounded-2xl border border-primary/10 bg-white/90 p-6 h-full">
                    <h3 className="text-lg font-semibold mb-2">Ship in weeks.</h3>
                    <p className="text-muted-foreground">
                      Most engagements go live in 4–8 weeks. Big firms take 4–8 months.
                    </p>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.2}>
                  <div className="rounded-2xl border border-primary/10 bg-white/90 p-6 h-full">
                    <h3 className="text-lg font-semibold mb-2">Jaipur-built engineering, US-grade craft.</h3>
                    <p className="text-muted-foreground">
                      Our pricing reflects the economics; our quality doesn&apos;t.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          <section className="section-padding bg-gradient-to-br from-background via-secondary/20 to-background">
            <div className="container-tight">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                  A typical SMB journey with us
                </h2>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 gap-6">
                {journey.map((step) => (
                  <AnimatedSection key={step.title}>
                    <div className="rounded-2xl border border-border/60 bg-white/90 p-6 h-full">
                      <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries we commonly serve</h2>
                </div>
              </AnimatedSection>
              <ul className="max-w-4xl mx-auto space-y-3 text-muted-foreground text-lg">
                {industries.map((industry) => (
                  <li key={industry}>• {industry}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-padding bg-secondary/20">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">SMB outcome benchmarks</h2>
                </div>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 gap-6">
                {benchmarks.map((benchmark) => (
                  <AnimatedSection key={benchmark.label}>
                    <div className="rounded-2xl border border-border/60 bg-white/90 p-6 h-full">
                      <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">{benchmark.label}</p>
                      <p className="text-lg font-semibold text-foreground">{benchmark.value}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-tight">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">ConverseAI by the numbers</h2>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border/60 bg-white/90 p-6">
                    <p className="text-sm uppercase tracking-wide text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding bg-secondary/20">
            <div className="container-tight">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">FAQs</h2>
              </AnimatedSection>
              <div className="space-y-6 max-w-4xl mx-auto">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-2xl border border-border/60 bg-white/90 p-6">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding bg-gradient-to-r from-primary/10 via-violet/10 to-background">
            <div className="container-tight text-center">
              <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Big AI, SMB price point.</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Take the 2-min diagnostic to find your starting point — or book a 30-min discovery call. We&apos;ll be
                  straight with you about what&apos;s worth building and what&apos;s not.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <Button asChild variant="hero" size="xl">
                  <a href="#smb-diagnostic" title="Find my starting point">
                    Find my starting point
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AIForSMB;
