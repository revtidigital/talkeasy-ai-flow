import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useCaseStudies } from "@/hooks/useCaseStudies";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut, ArrowUp, ArrowDown, ExternalLink } from "lucide-react";

const AdminDashboard = () => {
  const { user, signOut } = useAdminAuth();
  const { data: caseStudies, loading, error } = useCaseStudies();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [deleteSlug, setDeleteSlug] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [reordering, setReordering] = useState(false);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    const { error } = await supabase.from("case_studies").delete().eq("id", deleteId);
    setDeleting(false);
    setDeleteSlug(null);
    setDeleteId(null);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Case study deleted" });
      // Refresh by reloading
      navigate(0);
    }
  }

  async function handleReorder(index: number, direction: "up" | "down") {
    const sorted = [...caseStudies].sort((a, b) => (a as any).displayOrder - (b as any).displayOrder);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;

    setReordering(true);
    const itemA = sorted[index];
    const itemB = sorted[swapIndex];

    // Swap display_order values
    const orderA = (itemA as any).displayOrder ?? index + 1;
    const orderB = (itemB as any).displayOrder ?? swapIndex + 1;

    const [r1, r2] = await Promise.all([
      supabase.from("case_studies").update({ display_order: orderB }).eq("id", itemA.id),
      supabase.from("case_studies").update({ display_order: orderA }).eq("id", itemB.id),
    ]);

    setReordering(false);
    if (r1.error || r2.error) {
      toast({ title: "Reorder failed", variant: "destructive" });
    } else {
      navigate(0);
    }
  }

  async function handleSignOut() {
    await signOut();
    navigate("/admin/login");
  }

  const categoryColors: Record<string, string> = {
    "WhatsApp Marketing": "bg-green-100 text-green-700",
    "AI Chatbot": "bg-blue-100 text-blue-700",
    "Omni-Channel": "bg-violet-100 text-violet-700",
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Top bar */}
      <header className="bg-white border-b border-border/60 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-primary text-lg">ConverseAI</span>
            <span className="text-muted-foreground text-sm">/ Admin</span>
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

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Case Studies</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage the case studies shown on your website
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/case-studies/new">
              <Plus className="w-4 h-4 mr-1.5" />
              New Case Study
            </Link>
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            Failed to load case studies: {error}
          </div>
        )}

        {!loading && !error && caseStudies.length === 0 && (
          <div className="rounded-xl border border-border/60 bg-white p-12 text-center">
            <p className="text-muted-foreground mb-4">No case studies yet.</p>
            <Button asChild>
              <Link to="/admin/case-studies/new">
                <Plus className="w-4 h-4 mr-1.5" />
                Create your first case study
              </Link>
            </Button>
          </div>
        )}

        {!loading && !error && caseStudies.length > 0 && (
          <div className="rounded-xl border border-border/60 bg-white overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10 text-center">Order</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Industry</TableHead>
                  <TableHead className="hidden lg:table-cell">Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {caseStudies.map((cs, idx) => (
                  <TableRow key={cs.id}>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-0.5">
                        <button
                          onClick={() => handleReorder(idx, "up")}
                          disabled={idx === 0 || reordering}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs text-muted-foreground font-mono">{idx + 1}</span>
                        <button
                          onClick={() => handleReorder(idx, "down")}
                          disabled={idx === caseStudies.length - 1 || reordering}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{cs.company}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                          {cs.tagline}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[cs.category] ?? "bg-gray-100 text-gray-600"}`}
                      >
                        {cs.category}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                      {cs.industry}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                      {cs.publishedDate}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={`/case-studies/${cs.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View live"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/admin/case-studies/${cs.id}/edit`} aria-label="Edit">
                            <Pencil className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            setDeleteSlug(cs.slug);
                            setDeleteId(cs.id);
                          }}
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteSlug} onOpenChange={(open) => !open && setDeleteSlug(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete case study?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete <strong>{deleteSlug}</strong>. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
