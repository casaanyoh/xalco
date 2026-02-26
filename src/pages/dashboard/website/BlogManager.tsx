import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  Plus, Search, Pencil, Trash2, Eye, Clock, User,
  FileText, Tag, Calendar, Globe, ImageIcon, AlignLeft,
  TrendingUp, BarChart3,
} from "lucide-react";
import { useState } from "react";

const posts = [
  { id: 1, title: "Top 10 Tech Gadgets of 2026", status: "published", author: "Admin", date: "Feb 18, 2026", views: 1240, category: "Tech", readTime: "5 min" },
  { id: 2, title: "How to Choose the Perfect Backpack", status: "published", author: "Sarah K.", date: "Feb 15, 2026", views: 867, category: "Bags", readTime: "4 min" },
  { id: 3, title: "Spring Collection Preview", status: "draft", author: "Admin", date: "Feb 12, 2026", views: 0, category: "Fashion", readTime: "3 min" },
  { id: 4, title: "Customer Story: James's Journey", status: "published", author: "Admin", date: "Feb 10, 2026", views: 543, category: "Stories", readTime: "6 min" },
  { id: 5, title: "Our Sustainability Commitment", status: "scheduled", author: "Sarah K.", date: "Feb 22, 2026", views: 0, category: "Company", readTime: "4 min" },
];

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  published: { bg: "bg-[hsl(152,60%,40%)]/8", text: "text-[hsl(152,60%,40%)]", dot: "bg-[hsl(152,60%,40%)]" },
  draft: { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground" },
  scheduled: { bg: "bg-[hsl(38,92%,50%)]/8", text: "text-[hsl(38,92%,50%)]", dot: "bg-[hsl(38,92%,50%)]" },
};

export default function BlogManager() {
  const [search, setSearch] = useState("");
  const [composing, setComposing] = useState(false);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (composing) {
    return (
      <PageShell
        title="New Blog Post"
        subtitle="Write and publish a new article"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setComposing(false)} className="border-border text-muted-foreground">Cancel</Button>
            <Button variant="outline" size="sm" className="border-border text-muted-foreground">Save Draft</Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm"
              onClick={() => { toast({ title: "Post published!" }); setComposing(false); }}>
              <Globe className="h-3.5 w-3.5 mr-1.5" /> Publish
            </Button>
          </div>
        }
      >
        <div className="max-w-3xl space-y-5">
          <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm space-y-5">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Post Title</Label>
              <Input placeholder="Enter a compelling title..." className="text-lg font-semibold h-12 border-0 border-b border-border rounded-none px-0 focus-visible:ring-0" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Slug / URL</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1.5 rounded-lg">/blog/</span>
                <Input placeholder="post-url-slug" className="h-9 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs">Category</Label>
                <Input placeholder="e.g. Tech, Fashion..." className="h-9 text-sm" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Tags</Label>
                <Input placeholder="tag1, tag2..." className="h-9 text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 border-b border-border pb-3">
              {[AlignLeft, ImageIcon, Tag].map((Icon, i) => (
                <button key={i} className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <Textarea
              placeholder="Write your article content here... You can use markdown formatting."
              className="min-h-[280px] text-sm leading-relaxed border-0 p-0 resize-none focus-visible:ring-0"
            />
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 xalco-shadow-sm space-y-4">
            <h3 className="text-xs font-semibold text-foreground">SEO Preview</h3>
            <div className="bg-muted/30 rounded-xl p-4 space-y-1 border border-border">
              <p className="text-sm font-medium text-[hsl(210,80%,52%)] hover:underline cursor-pointer">Post Title — XALCO Blog</p>
              <p className="text-[10px] text-[hsl(152,60%,40%)]">xalco.lovable.app/blog/post-url-slug</p>
              <p className="text-xs text-muted-foreground">Your meta description will appear here. Make it compelling to improve click-through rates.</p>
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Blog Manager"
      subtitle="Create and manage your store's blog content"
      actions={
        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm" onClick={() => setComposing(true)}>
          <Plus className="h-3.5 w-3.5 mr-1.5" /> New Post
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Posts", value: posts.length, icon: FileText, color: "hsl(172 66% 40%)" },
          { label: "Published", value: posts.filter((p) => p.status === "published").length, icon: Globe, color: "hsl(152 60% 40%)" },
          { label: "Total Views", value: "2,650", icon: BarChart3, color: "hsl(210 80% 52%)" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-2xl p-4 xalco-shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}12` }}>
              <s.icon className="h-4.5 w-4.5" style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Posts List */}
      <div className="bg-card border border-border rounded-2xl xalco-shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
          </div>
        </div>
        <div className="divide-y divide-border">
          {filtered.map((post) => {
            const sc = statusConfig[post.status];
            return (
              <div key={post.id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/10 transition-colors group">
                <div className="w-10 h-10 bg-accent/8 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="h-4 w-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate group-hover:text-accent transition-colors">{post.title}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <User className="h-2.5 w-2.5" />{post.author}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Calendar className="h-2.5 w-2.5" />{post.date}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Clock className="h-2.5 w-2.5" />{post.readTime}
                    </span>
                    <Badge variant="secondary" className="text-[10px] px-1.5">{post.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {post.views > 0 && (
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Eye className="h-3 w-3" />{post.views.toLocaleString()}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                    {post.status}
                  </span>
                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><Trash2 className="h-3.5 w-3.5 text-destructive/60" /></Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
