import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Upload, Search, Grid3x3, List, Image, Film, FileText,
  Trash2, Download, Copy, MoreHorizontal, FolderOpen, Plus,
} from "lucide-react";
import { useState } from "react";

const mediaItems = [
  { id: 1, name: "hero-banner.jpg", type: "image", size: "2.4 MB", dims: "1920×600", used: 3, emoji: "🖼️" },
  { id: 2, name: "product-earbuds.jpg", type: "image", size: "890 KB", dims: "800×800", used: 1, emoji: "📸" },
  { id: 3, name: "summer-sale-video.mp4", type: "video", size: "18 MB", dims: "1920×1080", used: 1, emoji: "🎬" },
  { id: 4, name: "category-electronics.jpg", type: "image", size: "1.1 MB", dims: "640×480", used: 4, emoji: "🖼️" },
  { id: 5, name: "brand-logo-white.png", type: "image", size: "124 KB", dims: "400×120", used: 8, emoji: "📸" },
  { id: 6, name: "collection-banner.jpg", type: "image", size: "3.2 MB", dims: "1440×500", used: 2, emoji: "🖼️" },
  { id: 7, name: "lookbook-spring.pdf", type: "document", size: "5.6 MB", dims: "—", used: 0, emoji: "📄" },
  { id: 8, name: "product-wallet.jpg", type: "image", size: "760 KB", dims: "800×800", used: 1, emoji: "📸" },
];

const folders = ["All Files", "Products", "Banners", "Blog", "Videos", "Documents"];

export default function MediaLibrary() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState("All Files");
  const [selected, setSelected] = useState<number[]>([]);

  const filtered = mediaItems.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const typeIcon = (type: string) => {
    if (type === "image") return <Image className="h-4 w-4 text-accent" />;
    if (type === "video") return <Film className="h-4 w-4 text-[hsl(210_80%_52%)]" />;
    return <FileText className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <PageShell
      title="Media Library"
      subtitle="Manage all your store images, videos, and documents"
      actions={
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <Button variant="outline" size="sm" className="border-destructive/40 text-destructive"
              onClick={() => { setSelected([]); toast({ title: `${selected.length} files deleted` }); }}>
              <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete ({selected.length})
            </Button>
          )}
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Upload className="h-3.5 w-3.5 mr-1.5" /> Upload Files
          </Button>
        </div>
      }
    >
      <div className="flex gap-5">
        {/* Sidebar Folders */}
        <div className="w-44 flex-shrink-0 space-y-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Folders</span>
            <button className="text-muted-foreground hover:text-accent"><Plus className="h-3.5 w-3.5" /></button>
          </div>
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFolder(f)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors text-xs font-medium ${activeFolder === f ? "bg-accent/10 text-accent" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
            >
              <FolderOpen className="h-3.5 w-3.5 flex-shrink-0" />
              {f}
            </button>
          ))}

          <div className="pt-4 border-t border-border mt-4">
            <p className="text-[10px] text-muted-foreground mb-2 font-semibold uppercase">Storage</p>
            <div className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">Used</span>
                <span className="text-foreground font-medium">32 MB</span>
              </div>
              <div className="w-full h-1.5 bg-muted rounded-full">
                <div className="h-full bg-accent rounded-full" style={{ width: "32%" }} />
              </div>
              <p className="text-[10px] text-muted-foreground">32 MB / 100 MB</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>
            <div className="flex items-center gap-1 border border-border rounded-lg p-0.5">
              <button onClick={() => setViewMode("grid")} className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>
                <Grid3x3 className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}>
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
            <span className="text-[10px] text-muted-foreground">{filtered.length} files</span>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {/* Upload Drop Zone */}
              <label className="border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent transition-colors aspect-square group">
                <Upload className="h-6 w-6 text-muted-foreground group-hover:text-accent" />
                <span className="text-[10px] text-muted-foreground group-hover:text-accent text-center px-2">Drop files here or click to upload</span>
              </label>

              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id)}
                  className={`relative group cursor-pointer rounded-xl border transition-all ${selected.includes(item.id) ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}`}
                >
                  <div className="aspect-square bg-muted/50 rounded-t-xl flex items-center justify-center text-3xl">
                    {item.emoji}
                  </div>
                  <div className="p-2">
                    <p className="text-[10px] font-medium text-foreground truncate">{item.name}</p>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[9px] text-muted-foreground">{item.size}</span>
                      <Badge variant="secondary" className="text-[9px] px-1 capitalize">{item.type}</Badge>
                    </div>
                  </div>
                  {selected.includes(item.id) && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-[8px] text-accent-foreground font-bold">✓</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button className="w-6 h-6 bg-card rounded-md border border-border flex items-center justify-center hover:border-accent" onClick={(e) => e.stopPropagation()}>
                      <Download className="h-3 w-3 text-muted-foreground" />
                    </button>
                    <button className="w-6 h-6 bg-card rounded-md border border-border flex items-center justify-center hover:border-accent" onClick={(e) => e.stopPropagation()}>
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden xalco-shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    {["File", "Type", "Size", "Dimensions", "Used In", ""].map((h) => (
                      <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                            {typeIcon(item.type)}
                          </div>
                          <span className="text-xs font-medium text-foreground">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3"><Badge variant="secondary" className="text-[10px] capitalize">{item.type}</Badge></td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{item.size}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{item.dims}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{item.used} places</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6"><Download className="h-3 w-3 text-muted-foreground" /></Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6"><Trash2 className="h-3 w-3 text-destructive/60" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
