import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import AdminShell from "@/components/admin/AdminShell";
import { useBlogAuthors, type BlogAuthor } from "@/hooks/useBlogAuthors";
import { uploadBlogImage } from "@/lib/uploadImage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Users,
  User,
  Upload,
  Search,
  Loader2,
  Sparkles,
} from "lucide-react";

const DUMMY_SEED_AUTHORS = [
  {
    name: "Sarah Jenkins",
    slug: "sarah-jenkins",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&q=80",
  },
  {
    name: "David Miller",
    slug: "david-miller",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=80",
  },
  {
    name: "Emily Davis",
    slug: "emily-davis",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces&q=80",
  },
  {
    name: "Michael Carter",
    slug: "michael-carter",
    avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&q=80",
  },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

const AdminBlogAuthors = () => {
  const { toast } = useToast();
  const { authors, loading, error, refetch, addAuthor, updateAuthor, deleteAuthor } = useBlogAuthors();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<BlogAuthor | null>(null);

  // Form states: only Name and Avatar Image
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);

  const openAddModal = () => {
    setEditingAuthor(null);
    setName("");
    setAvatarUrl("");
    setModalOpen(true);
  };

  const openEditModal = (author: BlogAuthor) => {
    setEditingAuthor(author);
    setName(author.name || "");
    setAvatarUrl(author.avatar_url || "");
    setModalOpen(true);
  };

  const handleAvatarFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const url = await uploadBlogImage(file);
      setAvatarUrl(url);
      toast({ title: "Avatar uploaded successfully" });
    } catch (err: any) {
      toast({
        title: "Avatar upload failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
      if (avatarFileInputRef.current) {
        avatarFileInputRef.current.value = "";
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    const finalSlug = (editingAuthor?.slug || slugify(name.trim())).replace(/^\/+/, "");

    setSaving(true);
    try {
      if (editingAuthor) {
        await updateAuthor(editingAuthor.id, {
          name: name.trim(),
          slug: finalSlug,
          avatar_url: avatarUrl.trim() || null,
        });
        toast({ title: "Author updated successfully" });
      } else {
        await addAuthor({
          name: name.trim(),
          slug: finalSlug,
          avatar_url: avatarUrl.trim() || null,
        });
        toast({ title: "Author added successfully" });
      }
      setModalOpen(false);
    } catch (err: any) {
      toast({
        title: "Failed to save author",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const seedDummyAuthors = async () => {
    setSaving(true);
    try {
      for (const author of DUMMY_SEED_AUTHORS) {
        await supabase.from("blog_authors").upsert(author, { onConflict: "slug" });
      }
      await refetch();
      toast({ title: "4 US Dummy Authors added to backend!" });
    } catch (err: any) {
      toast({
        title: "Failed to seed authors",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, authorName: string) => {
    if (!window.confirm(`Are you sure you want to delete author "${authorName}"?`)) {
      return;
    }
    try {
      await deleteAuthor(id);
      toast({ title: "Author deleted" });
    } catch (err: any) {
      toast({
        title: "Delete failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const filteredAuthors = (authors || []).filter((a) => {
    const q = searchQuery.toLowerCase();
    return (a.name || "").toLowerCase().includes(q);
  });

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/blog">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Users className="h-6 w-6 text-violet-600" />
                Blog Authors
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage authors assigned to your blog articles ({authors.length} total)
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <Button
              variant="outline"
              onClick={seedDummyAuthors}
              disabled={saving}
              className="border-violet-200 text-violet-700 hover:bg-violet-50 gap-2 shadow-xs"
              title="Quickly add Sarah Jenkins, David Miller, Emily Davis & Michael Carter"
            >
              <Sparkles className="h-4 w-4 text-violet-600" />
              {saving ? "Adding..." : "Add 4 Dummy Authors"}
            </Button>
            <Button
              onClick={openAddModal}
              className="bg-violet-600 hover:bg-violet-700 text-white gap-2 shadow-xs"
            >
              <Plus className="h-4 w-4" /> Add Author
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border/60 shadow-xs">
          <Search className="h-4 w-4 text-muted-foreground ml-2 shrink-0" />
          <input
            type="text"
            placeholder="Search authors by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm outline-none bg-transparent placeholder:text-muted-foreground"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-muted-foreground hover:text-foreground px-2"
            >
              Clear
            </button>
          )}
        </div>

        {error && (
          <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Authors List / Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
          </div>
        ) : filteredAuthors.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border/80 bg-white p-12 text-center shadow-xs">
            <Users className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-foreground">No authors found</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              {searchQuery
                ? "No authors match your search criteria."
                : "You haven't added any authors yet. Add an author to start assigning bylines to your posts."}
            </p>
            {!searchQuery && (
              <div className="flex flex-wrap justify-center items-center gap-3 mt-5">
                <Button
                  onClick={seedDummyAuthors}
                  disabled={saving}
                  className="gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  {saving ? "Adding Authors..." : "Add 4 US Dummy Authors"}
                </Button>
                <Button
                  onClick={openAddModal}
                  variant="outline"
                  className="gap-1.5 border-violet-200 text-violet-700 hover:bg-violet-50"
                >
                  <Plus className="h-4 w-4" /> Add Custom Author
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAuthors.map((author) => (
              <div
                key={author.id}
                className="rounded-xl border border-border/60 bg-white shadow-xs hover:shadow-sm transition-all overflow-hidden flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Avatar Preview */}
                  <div className="relative shrink-0">
                    {author.avatar_url ? (
                      <img
                        src={author.avatar_url}
                        alt={author.name || "Author"}
                        className="h-12 w-12 rounded-full object-cover border-2 border-violet-100 shadow-xs"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = "none";
                          (e.currentTarget.nextElementSibling as HTMLElement)?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <div
                      className={`h-12 w-12 rounded-full bg-violet-100 text-violet-700 font-bold flex items-center justify-center text-base border-2 border-violet-200 ${
                        author.avatar_url ? "hidden" : ""
                      }`}
                    >
                      {(author.name || "A").charAt(0).toUpperCase()}
                    </div>
                  </div>

                  {/* Author Name */}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground text-base truncate" title={author.name || ""}>
                      {author.name || "Unnamed Author"}
                    </h3>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(author)}
                    className="h-8 px-2.5 text-xs font-medium hover:text-violet-700 hover:bg-violet-50 text-muted-foreground"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1 text-violet-600" /> Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(author.id, author.name)}
                    className="h-8 px-2.5 text-xs font-medium hover:text-red-700 hover:bg-red-50 text-muted-foreground"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1 text-red-500" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ─── Add / Edit Modal (Only Name and Image) ───────────────── */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md bg-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                <User className="h-5 w-5 text-violet-600" />
                {editingAuthor ? "Edit Author" : "Add New Author"}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                {editingAuthor ? "Update author name and photo." : "Fill in author name and photo."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSave} className="space-y-4 py-2">
              {/* Avatar Live Preview & Upload */}
              <div className="flex items-center gap-4 p-3 bg-secondary/10 rounded-lg border border-border/40">
                <div className="h-16 w-16 rounded-full overflow-hidden bg-violet-100 flex items-center justify-center shrink-0 border-2 border-violet-200">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <User className="h-8 w-8 text-violet-400" />
                  )}
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <Label className="text-xs font-semibold text-foreground">Avatar Photo</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => avatarFileInputRef.current?.click()}
                      disabled={uploadingAvatar}
                      className="h-8 text-xs gap-1.5 border-violet-200 text-violet-700 hover:bg-violet-50"
                    >
                      {uploadingAvatar ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Upload className="h-3.5 w-3.5" />
                      )}
                      Upload Image
                    </Button>
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setAvatarUrl("")}
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    ref={avatarFileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Avatar URL alternative */}
              <div className="space-y-1">
                <Label htmlFor="avatarUrl" className="text-xs font-semibold text-muted-foreground">
                  Or Paste Avatar Image URL
                </Label>
                <Input
                  id="avatarUrl"
                  placeholder="https://images.unsplash.com/... or storage link"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <Label htmlFor="authorName" className="text-xs font-semibold text-foreground">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="authorName"
                  placeholder="e.g. David Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-9 text-sm"
                />
              </div>

              <DialogFooter className="pt-2 gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving || !name.trim()}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  {saving && <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />}
                  {editingAuthor ? "Update Author" : "Add Author"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminShell>
  );
};

export default AdminBlogAuthors;
