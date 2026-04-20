import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2, LogOut } from "lucide-react";

/* ─── Form types ───────────────────────────────────────────── */
interface MetricField {
  value: string;
  label: string;
  description: string;
}

interface SectionField {
  title: string;
  content: string;
}

interface FormValues {
  slug: string;
  company: string;
  industry: string;
  category: string;
  tagline: string;
  excerpt: string;
  hero_image: string;
  logo: string;
  read_time: string;
  published_date: string;
  challenge: string;
  solution: string;
  outcome: string;
  testimonial_quote: string;
  testimonial_author: string;
  testimonial_role: string;
  testimonial_avatar: string;
  features_used: string; // comma-separated
  use_case: string; // comma-separated
  display_order: number;
  metrics: MetricField[];
  sections: SectionField[];
}

/* ─── Helpers ──────────────────────────────────────────────── */
function splitComma(val: string): string[] {
  return val
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/* ─── Component ────────────────────────────────────────────── */
const AdminCaseStudyForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { user, signOut } = useAdminAuth();
  const { toast } = useToast();
  const [loadingData, setLoadingData] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      slug: "",
      company: "",
      industry: "",
      category: "",
      tagline: "",
      excerpt: "",
      hero_image: "",
      logo: "",
      read_time: "",
      published_date: "",
      challenge: "",
      solution: "",
      outcome: "",
      testimonial_quote: "",
      testimonial_author: "",
      testimonial_role: "",
      testimonial_avatar: "",
      features_used: "",
      use_case: "",
      display_order: 99,
      metrics: [{ value: "", label: "", description: "" }],
      sections: [{ title: "", content: "" }],
    },
  });

  const { fields: metricFields, append: appendMetric, remove: removeMetric } = useFieldArray({
    control,
    name: "metrics",
  });

  const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
    control,
    name: "sections",
  });

  /* ─── Load existing data when editing ─────────────────────── */
  useEffect(() => {
    if (!isEdit) return;
    supabase
      .from("case_studies")
      .select("*")
      .eq("id", Number(id))
      .maybeSingle()
      .then(({ data, error }) => {
        if (error || !data) {
          toast({ title: "Not found", variant: "destructive" });
          navigate("/admin");
          return;
        }
        const metrics = (data.metrics as MetricField[]) ?? [];
        const sections = (data.sections as SectionField[]) ?? [];
        const t = (data.testimonial as { quote?: string; author?: string; role?: string; avatarUrl?: string }) ?? {};
        reset({
          slug: data.slug,
          company: data.company,
          industry: data.industry,
          category: data.category,
          tagline: data.tagline,
          excerpt: data.excerpt,
          hero_image: data.hero_image,
          logo: data.logo,
          read_time: data.read_time,
          published_date: data.published_date,
          challenge: data.challenge,
          solution: data.solution,
          outcome: data.outcome,
          testimonial_quote: t.quote ?? "",
          testimonial_author: t.author ?? "",
          testimonial_role: t.role ?? "",
          testimonial_avatar: t.avatarUrl ?? "",
          features_used: (data.features_used ?? []).join(", "),
          use_case: (data.use_case ?? []).join(", "),
          display_order: data.display_order ?? 99,
          metrics: metrics.length > 0 ? metrics : [{ value: "", label: "", description: "" }],
          sections: sections.length > 0 ? sections : [{ title: "", content: "" }],
        });
        setLoadingData(false);
      });
  }, [id, isEdit, reset, navigate, toast]);

  /* ─── Submit ───────────────────────────────────────────────── */
  async function onSubmit(values: FormValues) {
    setSaving(true);

    const payload = {
      slug: values.slug.trim(),
      company: values.company.trim(),
      industry: values.industry.trim(),
      category: values.category.trim(),
      tagline: values.tagline.trim(),
      excerpt: values.excerpt.trim(),
      hero_image: values.hero_image.trim(),
      logo: values.logo.trim(),
      read_time: values.read_time.trim(),
      published_date: values.published_date.trim(),
      challenge: values.challenge.trim(),
      solution: values.solution.trim(),
      outcome: values.outcome.trim(),
      testimonial: {
        quote: values.testimonial_quote.trim(),
        author: values.testimonial_author.trim(),
        role: values.testimonial_role.trim(),
        ...(values.testimonial_avatar.trim() ? { avatarUrl: values.testimonial_avatar.trim() } : {}),
      },
      features_used: splitComma(values.features_used),
      use_case: splitComma(values.use_case),
      display_order: Number(values.display_order),
      metrics: values.metrics.filter((m) => m.label && m.value),
      sections: values.sections.filter((s) => s.title && s.content),
    };

    let error;
    if (isEdit) {
      ({ error } = await supabase.from("case_studies").update(payload).eq("id", Number(id)));
    } else {
      ({ error } = await supabase.from("case_studies").insert(payload));
    }

    setSaving(false);

    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: isEdit ? "Case study updated" : "Case study created" });
      navigate("/admin");
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  /* ─── Shared field style ───────────────────────────────────── */
  const fieldClass = "space-y-1.5";
  const errorClass = "text-xs text-red-600 mt-1";

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Top bar */}
      <header className="bg-white border-b border-border/60 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Case Studies
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-1.5" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-foreground mb-6">
          {isEdit ? "Edit Case Study" : "New Case Study"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ── Basic Info ─────────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-border/60 p-6 space-y-5">
            <h2 className="font-semibold text-base text-foreground">Basic Info</h2>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className={fieldClass}>
                <Label htmlFor="company">Company name *</Label>
                <Input id="company" {...register("company", { required: "Required" })} />
                {errors.company && <p className={errorClass}>{errors.company.message}</p>}
              </div>
              <div className={fieldClass}>
                <Label htmlFor="slug">
                  Slug *{" "}
                  <span className="text-xs text-muted-foreground font-normal">
                    (URL-friendly, e.g. my-company-name)
                  </span>
                </Label>
                <Input
                  id="slug"
                  {...register("slug", {
                    required: "Required",
                    pattern: { value: /^[a-z0-9-]+$/, message: "Lowercase letters, numbers and hyphens only" },
                  })}
                />
                {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
              </div>
              <div className={fieldClass}>
                <Label htmlFor="industry">Industry *</Label>
                <Input id="industry" {...register("industry", { required: "Required" })} placeholder="e.g. Retail & E-Commerce" />
                {errors.industry && <p className={errorClass}>{errors.industry.message}</p>}
              </div>
              <div className={fieldClass}>
                <Label htmlFor="category">Category *</Label>
                <Input id="category" {...register("category", { required: "Required" })} placeholder="e.g. WhatsApp Marketing" />
                {errors.category && <p className={errorClass}>{errors.category.message}</p>}
              </div>
              <div className={fieldClass}>
                <Label htmlFor="published_date">Published date</Label>
                <Input id="published_date" {...register("published_date")} placeholder="e.g. March 2025" />
              </div>
              <div className={fieldClass}>
                <Label htmlFor="read_time">Read time</Label>
                <Input id="read_time" {...register("read_time")} placeholder="e.g. 5 min read" />
              </div>
              <div className={fieldClass}>
                <Label htmlFor="display_order">Display order</Label>
                <Input id="display_order" type="number" {...register("display_order", { valueAsNumber: true })} />
              </div>
            </div>

            <div className={fieldClass}>
              <Label htmlFor="tagline">Tagline *</Label>
              <Input id="tagline" {...register("tagline", { required: "Required" })} placeholder="Short headline for the case study" />
              {errors.tagline && <p className={errorClass}>{errors.tagline.message}</p>}
            </div>

            <div className={fieldClass}>
              <Label htmlFor="excerpt">Excerpt *</Label>
              <Textarea id="excerpt" rows={3} {...register("excerpt", { required: "Required" })} placeholder="2-3 sentence summary shown in cards" />
              {errors.excerpt && <p className={errorClass}>{errors.excerpt.message}</p>}
            </div>
          </section>

          {/* ── Images ─────────────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-border/60 p-6 space-y-5">
            <h2 className="font-semibold text-base text-foreground">Images</h2>
            <div className={fieldClass}>
              <Label htmlFor="hero_image">Hero image URL *</Label>
              <Input id="hero_image" {...register("hero_image", { required: "Required" })} placeholder="https://…" />
              {errors.hero_image && <p className={errorClass}>{errors.hero_image.message}</p>}
            </div>
            <div className={fieldClass}>
              <Label htmlFor="logo">Logo URL</Label>
              <Input id="logo" {...register("logo")} placeholder="https://…" />
            </div>
          </section>

          {/* ── Metrics ────────────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-border/60 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-base text-foreground">Metrics</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendMetric({ value: "", label: "", description: "" })}
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add metric
              </Button>
            </div>
            {metricFields.map((field, idx) => (
              <div key={field.id} className="grid sm:grid-cols-3 gap-4 pb-4 border-b border-border/40 last:border-0 last:pb-0">
                <div className={fieldClass}>
                  <Label>Value</Label>
                  <Input {...register(`metrics.${idx}.value`)} placeholder="e.g. 3×" />
                </div>
                <div className={fieldClass}>
                  <Label>Label</Label>
                  <Input {...register(`metrics.${idx}.label`)} placeholder="e.g. Revenue Growth" />
                </div>
                <div className="flex gap-2 items-end">
                  <div className={`${fieldClass} flex-1`}>
                    <Label>Description</Label>
                    <Input {...register(`metrics.${idx}.description`)} placeholder="Short description" />
                  </div>
                  {metricFields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                      onClick={() => removeMetric(idx)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </section>

          {/* ── Article Content ─────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-border/60 p-6 space-y-5">
            <h2 className="font-semibold text-base text-foreground">Article Content</h2>
            <div className={fieldClass}>
              <Label htmlFor="challenge">The Challenge *</Label>
              <Textarea id="challenge" rows={4} {...register("challenge", { required: "Required" })} />
              {errors.challenge && <p className={errorClass}>{errors.challenge.message}</p>}
            </div>
            <div className={fieldClass}>
              <Label htmlFor="solution">The Solution *</Label>
              <Textarea id="solution" rows={4} {...register("solution", { required: "Required" })} />
              {errors.solution && <p className={errorClass}>{errors.solution.message}</p>}
            </div>
            <div className={fieldClass}>
              <Label htmlFor="outcome">Business Impact & Results *</Label>
              <Textarea id="outcome" rows={4} {...register("outcome", { required: "Required" })} />
              {errors.outcome && <p className={errorClass}>{errors.outcome.message}</p>}
            </div>
          </section>

          {/* ── Detailed Sections ───────────────────────────────── */}
          <section className="bg-white rounded-xl border border-border/60 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-base text-foreground">Additional Sections</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendSection({ title: "", content: "" })}
              >
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add section
              </Button>
            </div>
            {sectionFields.map((field, idx) => (
              <div key={field.id} className="space-y-3 pb-5 border-b border-border/40 last:border-0 last:pb-0">
                <div className="flex gap-2">
                  <div className={`${fieldClass} flex-1`}>
                    <Label>Section title</Label>
                    <Input {...register(`sections.${idx}.title`)} placeholder="e.g. Why ConverseAI?" />
                  </div>
                  {sectionFields.length > 1 && (
                    <div className="flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeSection(idx)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
                <div className={fieldClass}>
                  <Label>Content</Label>
                  <Textarea rows={3} {...register(`sections.${idx}.content`)} />
                </div>
              </div>
            ))}
          </section>

          {/* ── Testimonial ─────────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-border/60 p-6 space-y-5">
            <h2 className="font-semibold text-base text-foreground">Testimonial</h2>
            <div className={fieldClass}>
              <Label htmlFor="testimonial_quote">Quote</Label>
              <Textarea id="testimonial_quote" rows={3} {...register("testimonial_quote")} />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className={fieldClass}>
                <Label htmlFor="testimonial_author">Author name</Label>
                <Input id="testimonial_author" {...register("testimonial_author")} placeholder="e.g. Priya Sharma" />
              </div>
              <div className={fieldClass}>
                <Label htmlFor="testimonial_role">Author role</Label>
                <Input id="testimonial_role" {...register("testimonial_role")} placeholder="e.g. Head of Digital, StyleMart" />
              </div>
            </div>
            <div className={fieldClass}>
              <Label htmlFor="testimonial_avatar">Avatar URL (optional)</Label>
              <Input id="testimonial_avatar" {...register("testimonial_avatar")} placeholder="https://…" />
            </div>
          </section>

          {/* ── Tags ────────────────────────────────────────────── */}
          <section className="bg-white rounded-xl border border-border/60 p-6 space-y-5">
            <h2 className="font-semibold text-base text-foreground">Tags</h2>
            <div className={fieldClass}>
              <Label htmlFor="features_used">
                Features used{" "}
                <span className="text-xs text-muted-foreground font-normal">(comma-separated)</span>
              </Label>
              <Input
                id="features_used"
                {...register("features_used")}
                placeholder="WhatsApp AI Chatbot, Live Chat, CSAT Report"
              />
            </div>
            <div className={fieldClass}>
              <Label htmlFor="use_case">
                Use cases{" "}
                <span className="text-xs text-muted-foreground font-normal">(comma-separated)</span>
              </Label>
              <Input
                id="use_case"
                {...register("use_case")}
                placeholder="Abandoned cart recovery, Order tracking"
              />
            </div>
          </section>

          {/* ── Submit ──────────────────────────────────────────── */}
          <div className="flex items-center gap-3 justify-end pb-8">
            <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : isEdit ? "Save changes" : "Create case study"}
            </Button>
          </div>

        </form>
      </main>
    </div>
  );
};

export default AdminCaseStudyForm;
