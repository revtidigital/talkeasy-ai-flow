import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const painPoints = [
  "New hires take 3–6 months to ramp because no one can find anything",
  "Contract teams spend hours locating clauses across thousands of agreements",
  "Support teams answer the same questions with conflicting answers",
  "Employees paste confidential docs into ChatGPT because your intranet search is unusable",
];

const comparisonRows = [
  {
    label: "Deployment",
    converse: "Your cloud / VPC / on-prem",
    glean: "Glean SaaS, their cloud",
    diy: "Yours",
  },
  {
    label: "Model choice",
    converse: "Any — Claude, GPT, Llama, Qwen",
    glean: "Glean's stack",
    diy: "You choose",
  },
  {
    label: "Cost (500 users, year 1)",
    converse: "$40K–$100K one-time + $2K–10K/mo",
    glean: "$240K–$300K/yr ($40–50/user)",
    diy: "3–6 months of eng time + infra",
  },
  {
    label: "Time to production",
    converse: "4–6 weeks",
    glean: "6-month rollout typical",
    diy: "3–6+ months",
  },
  {
    label: "Permission-aware retrieval",
    converse: "Yes (inherits source ACLs)",
    glean: "Yes",
    diy: "Depends on build quality",
  },
  {
    label: "Citation-backed answers",
    converse: "Yes (configurable refuse-if-no-citation)",
    glean: "Yes",
    diy: "Depends",
  },
  {
    label: "Custom domain accuracy",
    converse: "Tuned per engagement",
    glean: "Generic enterprise search",
    diy: "You tune",
  },
  {
    label: "On-prem / air-gapped option",
    converse: "Yes",
    glean: "No (SaaS-only)",
    diy: "Yes",
  },
  {
    label: "Best for",
    converse: "Teams wanting domain-tuned RAG with control",
    glean: "Large enterprises comfortable with SaaS + pricing",
    diy: "Teams with AI engineering talent + time",
  },
];

const ragVsFineTuneRows = [
  {
    label: "Use for",
    rag: "Injecting knowledge from your documents",
    fineTune: "Teaching specialized reasoning or output patterns",
  },
  {
    label: "Handles frequent updates",
    rag: "Yes (re-index in minutes)",
    fineTune: "No (re-train per change)",
  },
  {
    label: "Citations",
    rag: "Yes",
    fineTune: "No",
  },
  {
    label: "Permission-aware",
    rag: "Yes",
    fineTune: "No (model memorizes)",
  },
  {
    label: "Typical cost",
    rag: "$15K–$150K build",
    fineTune: "$30K–$200K+ per tune cycle",
  },
  {
    label: "Typical accuracy for internal-doc Q&A",
    rag: "85–95% (measured, see benchmark below)",
    fineTune: "Lower — model can't cite source",
  },
];

const buildAreas = [
  {
    title: "Employee knowledge assistants",
    description:
      "Ask anything about policies, SOPs, benefits, IT, HR, compliance — get a cited answer in seconds. Deployed in Slack, Teams, your intranet, or a custom chat UI.",
  },
  {
    title: "Customer support knowledge bots",
    description:
      "Grounded on your help center, internal playbooks, and product docs. Deployable as a chatbot, WhatsApp bot, or agent-facing co-pilot.",
  },
  {
    title: "Contract intelligence",
    description:
      "Search, summarize, and extract clauses across thousands of agreements. Compare contracts. Flag missing terms. Auto-draft from templates.",
  },
  {
    title: "SOP & compliance assistants",
    description:
      "For regulated industries (BFSI, pharma, healthcare) — answers tied to the current version of a policy, with clause-level citations and audit trail.",
  },
  {
    title: "Sales enablement assistants",
    description:
      "Grounded on battle cards, win/loss notes, case studies. Instant answers during discovery calls.",
  },
  {
    title: "RFP and proposal assistants",
    description:
      "Pulls from your response library, past proposals, and product docs. Drafts responses with citations.",
  },
];

const buildPrinciples = [
  {
    title: "Grounded answers only, with citations.",
    description:
      "Every answer links back to source documents and page numbers. If it can't cite, it won't answer — configurable per use case.",
  },
  {
    title: "Permission-aware.",
    description:
      "Users only see content they have access to in the source system (SharePoint ACLs, Google Drive permissions, Confluence groups). No data leakage across roles.",
  },
  {
    title: "Your cloud, your control.",
    description:
      "Deployed in your AWS/Azure/GCP VPC. Open models (Llama, Qwen, Mistral) for on-prem. No data leaves your perimeter.",
  },
  {
    title: "Real-time sync.",
    description: "When a document updates, the index updates. No stale answers from last quarter's policy.",
  },
  {
    title: "Eval-first — the ConverseAI RAG Accuracy Benchmark.",
    description:
      "We measure citation precision, answer accuracy, refusal correctness against a domain-specific test set built per engagement. Weekly eval review post-launch.",
  },
  {
    title: "Multi-modal.",
    description:
      "PDFs with tables and images, scanned documents, handwriting, audio transcripts — not just clean text.",
  },
];

const dataSources = [
  "SharePoint",
  "Google Drive",
  "Confluence",
  "Notion",
  "Dropbox",
  "OneDrive",
  "Box",
  "Slack",
  "Microsoft Teams",
  "Zendesk",
  "Salesforce attachments",
  "Internal wikis",
  "Databases",
  "Custom document stores",
  "Email archives",
  "PDF libraries",
  "Contract repositories",
];

const howItWorks = [
  {
    title: "Week 0 — Knowledge audit.",
    description: "What you have, where it lives, access patterns, accuracy bar.",
  },
  {
    title: "Weeks 1–3 — Build.",
    description: "Ingestion pipeline, embeddings, retrieval, LLM orchestration, permissions, UI.",
  },
  {
    title: "Week 4 — Deploy.",
    description: "Internal pilot. Eval tuning.",
  },
  {
    title: "Weeks 5–6 — Scale.",
    description: "Full rollout, monitoring, feedback loop.",
  },
];

const whyConverse = [
  "Built in your cloud, not ours. VPC/on-prem deployment with open models.",
  "Accuracy-measured. Every RAG build has an eval harness with citation precision + answer accuracy measured weekly.",
  "Conversational AI DNA. Ships as a real assistant — WhatsApp, Slack, Teams, web, voice — not just a search box.",
  "Domain-specific. Pharma SOPs, BFSI compliance, legal contracts — not generic enterprise search.",
  "India pricing, US quality. 4–6 week pilots vs. 6-month Glean rollouts.",
];

const outcomes = [
  "Answer policy/SOP questions in 5 seconds instead of 2 hours of searching",
  "Cut new-hire ramp time by 40–60%",
  "Find a specific contract clause across 10,000 agreements in under 10 seconds",
  "Deflect 30–50% of internal IT/HR tickets with a grounded assistant",
  "100% citation-backed answers — zero hallucination tolerance for compliance",
];

const pricingRows = [
  {
    engagement: "Pilot",
    scope: "One use case, one data source, 4–6 weeks",
    range: "$15K–$40K",
  },
  {
    engagement: "Production build",
    scope: "Multi-source, multi-channel deployment",
    range: "$40K–$150K",
  },
  {
    engagement: "Managed retainer",
    scope: "Tuning, evals, re-indexing, new sources",
    range: "$2K–$10K/month",
  },
];

const faqs = [
  {
    question: "How does RAG work on internal documents?",
    answer:
      "We ingest your documents, split them into chunks, create vector embeddings, and store them in a vector database. When you ask a question, the system retrieves the most relevant chunks and feeds them to an LLM to generate a grounded answer with citations.",
  },
  {
    question: "Is enterprise RAG secure and private?",
    answer:
      "Yes, when built right. We deploy in your cloud, use permission-aware retrieval, and never train on your data. Open models for fully on-prem deployments.",
  },
  {
    question: "What's the cost of building a knowledge assistant?",
    answer: "Pilots from $15K / ₹5L. Production deployments $40K–$150K / ₹15L–₹40L.",
  },
  {
    question: "RAG vs. fine-tuning — which is better for internal docs?",
    answer:
      "RAG for most cases. Handles frequent updates, provides citations, respects permissions. See the comparison table above.",
  },
  {
    question: "How do you compare to Glean?",
    answer:
      "Glean is SaaS, priced per-seat, generic enterprise search. We build custom RAG in your cloud, with domain-tuning, open models, and lower year-1 cost at most scales. Honest: Glean is the right call for some Fortune 500 buyers; we're a better fit for teams wanting control, accuracy, or air-gapped deployment.",
  },
  {
    question: "What accuracy can we expect?",
    answer:
      "Measured via our RAG Accuracy Benchmark per engagement. Typical deployments hit 85–95% answer accuracy with near-100% citation fidelity. We define the target accuracy bar with you in week 1.",
  },
  {
    question: "How do you handle permissions — will employees see docs they shouldn't?",
    answer:
      "No. We inherit permissions from the source system (SharePoint ACLs, Google Drive permissions). The retrieval layer filters before content ever reaches the LLM.",
  },
  {
    question: "Can it handle scanned PDFs, images, and tables?",
    answer:
      "Yes. Modern OCR, layout-aware parsing, and multi-modal embeddings handle complex documents including scans, diagrams, and tables.",
  },
  {
    question: "What happens when documents are updated?",
    answer: "Real-time or scheduled re-indexing. Changes propagate in minutes.",
  },
  {
    question: "Can we deploy on-prem, fully air-gapped?",
    answer:
      "Yes. Open models (Llama 3.3, Qwen, Mistral) on your hardware, no external API calls. Common for defense, BFSI, healthcare.",
  },
];

const KnowledgeIntelligence = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://theconverseai.com/services/knowledge-intelligence#service",
        name: "Document & Knowledge Intelligence",
        description:
          "Private, citation-backed enterprise RAG and AI knowledge assistants over your documents, built in your cloud.",
        serviceType: "Enterprise RAG implementation and AI knowledge assistants",
        provider: {
          "@type": "Organization",
          name: "ConverseAI",
          url: "https://theconverseai.com",
        },
        areaServed: ["India", "United States"],
      },
      {
        "@type": "Offer",
        "@id": "https://theconverseai.com/services/knowledge-intelligence#offer",
        name: "Knowledge intelligence build",
        url: "https://theconverseai.com/services/knowledge-intelligence",
        price: "15000-150000",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
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
            name: "Services",
            item: "https://theconverseai.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Document & Knowledge Intelligence",
            item: "https://theconverseai.com/services/knowledge-intelligence",
          },
        ],
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
    ],
  };

  return (
    <>
      <Helmet>
        <title>Enterprise RAG &amp; AI Document Assistants | ConverseAI</title>
        <meta
          name="description"
          content="Private, citation-backed enterprise RAG and AI knowledge assistants over your docs. Built in your cloud. Live in 4–6 weeks. Book a demo."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Enterprise RAG & AI Document Assistants | ConverseAI" />
        <meta
          property="og:description"
          content="Private, citation-backed enterprise RAG and AI knowledge assistants over your docs. Built in your cloud. Live in 4–6 weeks. Book a demo."
        />
        <link rel="canonical" href="https://theconverseai.com/services/knowledge-intelligence" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background pt-16 md:pt-20">
        <main id="main-content">
          <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-br from-primary/15 via-violet/10 to-background">
            <div className="absolute top-16 left-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-violet/15 rounded-full blur-3xl" />
            <div className="container-tight relative z-10 text-center py-12">
              <AnimatedSection>
                <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-4">
                  Document &amp; Knowledge Intelligence
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                  Your best documentation is trapped in your worst search tool.
                </h1>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <h2 className="text-xl sm:text-2xl text-foreground/80 font-semibold mb-6">
                  Enterprise RAG implementation and AI knowledge assistants, built in your cloud.
                </h2>
              </AnimatedSection>
              <AnimatedSection delay={0.3}>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
                  AI that reads your SOPs, contracts, policies, and internal docs — and answers with citations.
                  Permission-aware. Deployed in your VPC or on-prem. Zero hallucination tolerance for compliance teams.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact-us">
                    <Button variant="hero" size="xl" title="Book a free knowledge audit">
                      Book a free knowledge audit
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button asChild variant="hero-outline" size="xl">
                    <a href="#live-demo" title="Try the live demo">
                      Try the live demo (upload a sample doc)
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section id="live-demo" className="section-padding">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Live demo (coming soon)</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Upload a sample PDF or paste text, ask a question, and see the cited answer. We&apos;ll add an email
                    gate after the first question when the demo launches in phase 2.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <div className="rounded-2xl border border-border/60 bg-white/90 p-8 text-center">
                  <p className="text-lg font-semibold mb-3">
                    [INTERACTIVE] Upload a sample PDF or paste text → ask a question → see the cited answer.
                  </p>
                  <p className="text-sm text-muted-foreground italic">
                    Phase 2 placeholder — launching after initial traffic.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </section>

          <section className="section-padding bg-secondary/20">
            <div className="container-tight">
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <AnimatedSection>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">The problem</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      80% of your business data is unstructured — SOPs, contracts, policies, playbooks, meeting notes,
                      tribal Slack threads. Your team spends roughly 20% of their week searching through it.
                    </p>
                    <ul className="space-y-3 text-muted-foreground">
                      {painPoints.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.1}>
                  <div className="glass-card rounded-2xl p-8 border border-primary/10 bg-white/80">
                    <h3 className="text-2xl font-semibold mb-4">Enterprise RAG fixes this — when built right.</h3>
                    <p className="text-lg text-muted-foreground mb-4">
                      When it&apos;s built badly, it hallucinates with citations. We build it right — accuracy-measured,
                      permission-aware, deployed in your cloud.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      The result is a knowledge assistant your compliance team trusts and your teams actually use.
                    </p>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">ConverseAI vs Glean vs DIY RAG</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Honest positioning: Glean is excellent if you&apos;re a Fortune 500 comfortable with SaaS pricing and
                    generic enterprise search. We fit when you want domain-tuned accuracy, your cloud, open models, or 4–6
                    week shipping.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <Table className="rounded-2xl overflow-hidden border border-border/60 bg-white/90">
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead />
                      <TableHead>ConverseAI custom RAG</TableHead>
                      <TableHead>Glean / Guru</TableHead>
                      <TableHead>DIY (your engineering team)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonRows.map((row) => (
                      <TableRow key={row.label}>
                        <TableCell className="font-semibold text-foreground">{row.label}</TableCell>
                        <TableCell>{row.converse}</TableCell>
                        <TableCell>{row.glean}</TableCell>
                        <TableCell>{row.diy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AnimatedSection>
            </div>
          </section>

          <section className="section-padding bg-secondary/20">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">RAG vs fine-tuning — which do you need?</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    For internal knowledge: RAG wins almost always. Fine-tuning is for specialized reasoning patterns,
                    not knowledge injection.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <Table className="rounded-2xl overflow-hidden border border-border/60 bg-white/90">
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead />
                      <TableHead>RAG</TableHead>
                      <TableHead>Fine-tuning</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ragVsFineTuneRows.map((row) => (
                      <TableRow key={row.label}>
                        <TableCell className="font-semibold text-foreground">{row.label}</TableCell>
                        <TableCell>{row.rag}</TableCell>
                        <TableCell>{row.fineTune}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AnimatedSection>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">What we build</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Enterprise RAG and AI knowledge assistants deployed where your teams already work.
                  </p>
                </div>
              </AnimatedSection>
              <div className="grid lg:grid-cols-2 gap-8">
                {buildAreas.map((area, index) => (
                  <AnimatedSection key={area.title} delay={index * 0.1}>
                    <div className="rounded-2xl border border-border/60 bg-white/90 p-6 h-full">
                      <h3 className="text-xl font-semibold mb-3">{area.title}</h3>
                      <p className="text-muted-foreground">{area.description}</p>
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
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">How we build it right</h2>
                </div>
              </AnimatedSection>
              <div className="grid lg:grid-cols-2 gap-8">
                {buildPrinciples.map((item, index) => (
                  <AnimatedSection key={item.title} delay={index * 0.1}>
                    <div className="rounded-2xl border border-border/60 bg-white/90 p-6 h-full">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
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
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Data sources we connect</h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    We plug into your document stack, inherit permissions, and keep your index in sync.
                  </p>
                </div>
              </AnimatedSection>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dataSources.map((source, index) => (
                  <AnimatedSection key={source} delay={index * 0.05}>
                    <div className="rounded-xl border border-border/60 bg-white/90 p-4 text-muted-foreground">
                      {source}
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding bg-secondary/20">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
                </div>
              </AnimatedSection>
              <div className="grid md:grid-cols-2 gap-6">
                {howItWorks.map((step, index) => (
                  <AnimatedSection key={step.title} delay={index * 0.1}>
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
              <div>
                <AnimatedSection>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Why ConverseAI</h2>
                    <ul className="space-y-3 text-muted-foreground mb-8">
                      {whyConverse.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-2xl font-semibold mb-4">Outcomes you can expect</h3>
                    <ul className="space-y-3 text-muted-foreground">
                      {outcomes.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-primary mt-1" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>

          <section className="section-padding bg-secondary/20">
            <div className="container-tight">
              <AnimatedSection>
                <div className="text-center mb-10">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Pricing</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    India: ₹5L–₹40L for a build; ₹50K–₹2L/month retainer.
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <Table className="rounded-2xl overflow-hidden border border-border/60 bg-white/90">
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Engagement</TableHead>
                      <TableHead>Scope</TableHead>
                      <TableHead>Range</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pricingRows.map((row) => (
                      <TableRow key={row.engagement}>
                        <TableCell className="font-semibold text-foreground">{row.engagement}</TableCell>
                        <TableCell>{row.scope}</TableCell>
                        <TableCell>{row.range}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AnimatedSection>
            </div>
          </section>

          <section className="section-padding">
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Put your knowledge to work.</h2>
              </AnimatedSection>
              <AnimatedSection delay={0.1}>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Book a free 30-min knowledge audit. We&apos;ll map your sources and recommend the fastest path to a working
                  RAG system.
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.2}>
                <Link to="/contact-us">
                  <Button variant="hero" size="xl" title="Book my knowledge audit">
                    Book my knowledge audit
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </AnimatedSection>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default KnowledgeIntelligence;
