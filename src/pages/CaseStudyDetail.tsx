import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ArrowRight, Clock, Building2, Tag, CheckCircle, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import ContactFormDialog from "@/components/ContactFormDialog";
import { getCaseStudyBySlug, caseStudies } from "@/data/caseStudies";

const categoryColors: Record<string, string> = {
  "WhatsApp Marketing": "bg-green-100 text-green-700",
  "AI Chatbot": "bg-primary/10 text-primary",
  "Omni-Channel": "bg-violet-100 text-violet-700",
};

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined;

  useEffect(() => {
    if (!caseStudy) {
      navigate("/case-studies", { replace: true });
    }
  }, [caseStudy, navigate]);

  if (!caseStudy) return null;

  const otherStudies = caseStudies.filter((cs) => cs.slug !== slug).slice(0, 2);

  return (
    <>
      <Helmet>
        <title>{`${caseStudy.company} Case Study | ConverseAI`}</title>
        <meta name="description" content={caseStudy.excerpt} />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={`${caseStudy.company} | ConverseAI Case Study`} />
        <meta property="og:description" content={caseStudy.excerpt} />
        <meta property="og:image" content={caseStudy.heroImage} />
        <link rel="canonical" href={`https://theconverseai.com/case-studies/${caseStudy.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background pt-16 md:pt-20">
        <main id="main-content">
          {/* Hero */}
          <section className="relative overflow-hidden">
            <div className="h-[420px] md:h-[500px] relative">
              <img
                src={caseStudy.heroImage}
                alt={`${caseStudy.company} case study hero`}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col justify-end pb-10 px-4">
                <div className="container-tight">
                  <Link
                    to="/case-studies"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-4 transition-colors"
                    aria-label="Back to all case studies"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    All Case Studies
                  </Link>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[caseStudy.category] ?? "bg-white/20 text-white"}`}
                    >
                      <Tag className="w-3 h-3" aria-hidden="true" />
                      {caseStudy.category}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                      <Building2 className="w-3 h-3" aria-hidden="true" />
                      {caseStudy.industry}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {caseStudy.readTime} · {caseStudy.publishedDate}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
                    {caseStudy.tagline}
                  </h1>
                </div>
              </div>
            </div>
          </section>

          {/* Metrics Bar */}
          <AnimatedSection>
            <div className="bg-primary/5 border-y border-primary/10 py-8">
              <div className="container-tight">
                <div
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                  role="list"
                  aria-label="Key results"
                >
                  {caseStudy.metrics.map((m) => (
                    <div key={m.label} className="text-center" role="listitem">
                      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{m.value}</div>
                      <div className="text-sm font-semibold text-foreground">{m.label}</div>
                      <div className="text-xs text-muted-foreground mt-1 leading-snug">{m.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Main Content */}
          <div className="container-tight py-16 md:py-20">
            <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
              {/* Article body */}
              <div className="lg:col-span-2 space-y-12">
                {/* Excerpt */}
                <AnimatedSection>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary pl-5">
                    {caseStudy.excerpt}
                  </p>
                </AnimatedSection>

                {/* Challenge / Solution / Outcome */}
                {[
                  { heading: "The Challenge", icon: "🎯", text: caseStudy.challenge },
                  { heading: "The Solution", icon: "💡", text: caseStudy.solution },
                  { heading: "The Outcome", icon: "🚀", text: caseStudy.outcome },
                ].map((block, i) => (
                  <AnimatedSection key={block.heading} delay={i * 0.1}>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                        <span aria-hidden="true">{block.icon}</span>
                        {block.heading}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">{block.text}</p>
                    </div>
                  </AnimatedSection>
                ))}

                {/* Detailed Sections */}
                {caseStudy.sections.map((section, i) => (
                  <AnimatedSection key={section.title} delay={i * 0.08}>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-3">{section.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  </AnimatedSection>
                ))}

                {/* Testimonial */}
                <AnimatedSection>
                  <blockquote className="relative glass-card rounded-2xl p-8 border border-primary/20">
                    <Quote
                      className="absolute top-6 left-6 w-8 h-8 text-primary/20"
                      aria-hidden="true"
                    />
                    <p className="text-lg font-medium text-foreground leading-relaxed pl-6 mb-6">
                      "{caseStudy.testimonial.quote}"
                    </p>
                    <footer className="flex items-center gap-4 pl-6 border-t border-border/40 pt-5">
                      <div className="w-10 h-10 rounded-full gradient-cta flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {caseStudy.testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <cite className="not-italic font-semibold text-foreground text-sm block">
                          {caseStudy.testimonial.author}
                        </cite>
                        <span className="text-xs text-muted-foreground">{caseStudy.testimonial.role}</span>
                      </div>
                    </footer>
                  </blockquote>
                </AnimatedSection>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-28 space-y-6">
                  {/* Company Card */}
                  <AnimatedSection>
                    <div className="glass-card rounded-2xl p-6 border border-border/50">
                      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide mb-4">
                        About the Company
                      </h3>
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={caseStudy.logo}
                          alt={`${caseStudy.company} logo`}
                          className="w-12 h-12 rounded-xl object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        <div>
                          <p className="font-semibold text-foreground">{caseStudy.company}</p>
                          <p className="text-xs text-muted-foreground">{caseStudy.industry}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Features Used */}
                  <AnimatedSection delay={0.1}>
                    <div className="glass-card rounded-2xl p-6 border border-border/50">
                      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wide mb-4">
                        ConverseAI Features Used
                      </h3>
                      <ul className="space-y-2">
                        {caseStudy.featuresUsed.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AnimatedSection>

                  {/* CTA */}
                  <AnimatedSection delay={0.15}>
                    <div className="rounded-2xl gradient-cta p-6 text-white">
                      <h3 className="font-bold text-lg mb-2">Get similar results</h3>
                      <p className="text-sm text-white/80 mb-5 leading-relaxed">
                        Talk to our team and discover how ConverseAI can transform your customer engagement.
                      </p>
                      <ContactFormDialog>
                        <Button
                          className="w-full bg-white text-primary hover:bg-white/90 font-semibold"
                          aria-label="Start your free trial"
                        >
                          Start Free Trial
                          <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                        </Button>
                      </ContactFormDialog>
                    </div>
                  </AnimatedSection>
                </div>
              </aside>
            </div>
          </div>

          {/* More Case Studies */}
          {otherStudies.length > 0 && (
            <section className="border-t border-border/40 py-16 md:py-20 bg-secondary/30">
              <div className="container-tight">
                <AnimatedSection>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 text-center">
                    More Success Stories
                  </h2>
                </AnimatedSection>
                <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                  {otherStudies.map((cs, i) => (
                    <AnimatedSection key={cs.id} delay={i * 0.1}>
                      <article className="group glass-card-hover rounded-2xl overflow-hidden border border-border/50">
                        <div className="relative overflow-hidden h-44">
                          <img
                            src={cs.heroImage}
                            alt={`${cs.company} case study`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                          <div className="absolute bottom-3 left-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[cs.category] ?? "bg-white/20 text-white"}`}
                            >
                              {cs.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-semibold text-foreground text-base mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                            {cs.tagline}
                          </h3>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {cs.metrics.slice(0, 2).map((m) => (
                              <span
                                key={m.label}
                                className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium"
                              >
                                {m.value} {m.label}
                              </span>
                            ))}
                          </div>
                          <Link
                            to={`/case-studies/${cs.slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all"
                            aria-label={`Read full case study: ${cs.company}`}
                          >
                            Read Story
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        </div>
                      </article>
                    </AnimatedSection>
                  ))}
                </div>
                <AnimatedSection delay={0.2}>
                  <div className="text-center mt-10">
                    <Link to="/case-studies">
                      <Button variant="hero-outline" size="lg">
                        View All Case Studies
                        <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </AnimatedSection>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CaseStudyDetail;
