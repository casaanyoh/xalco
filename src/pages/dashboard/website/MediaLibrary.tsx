import { PageShell } from "@/components/dashboard/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Upload, Search, Grid3x3, List, Image, Film, FileText,
  Trash2, Download, Copy, FolderOpen, Plus, HardDrive,
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

  const filtered = mediaItems.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const typeIcon = (type: string) => {
    if (type === "image") return <Image className="h-4 w-4 text-accent" />;
    if (type === "video") return <Film className="h-4 w-4 text-[hsl(210,80%,52%)]" />;
    return <FileText className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <PageShell
      title="Media Library"
      subtitle="Manage all your store images, videos, and documents"
      actions={
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <Button variant="outline" size="sm" className="border-destructive/30 text-destructive"
              onClick={() => { setSelected([]); toast({ title: `${selected.length} files deleted` }); }}>
              <Trash2 className="h-3.5 w-3.5 mr-1.5" /> Delete ({selected.length})
            </Button>
          )}
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 xalco-shadow-sm">
            <Upload className="h-3.5 w-3.5 mr-1.5" /> Upload Files
          </Button>
        </div>
      }
    >
      <div className="flex gap-5">
        {/* Sidebar */}
        <div className="w-48 flex-shrink-0 space-y-1">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Folders</span>
            <button className="text-muted-foreground hover:text-accent transition-colors"><Plus className="h-3.5 w-3.5" /></button>
          </div>
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFolder(f)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all text-xs font-medium ${
                activeFolder === f
                  ? "bg-accent/8 text-accent border border-accent/15"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
              }`}
            >
              <FolderOpen className="h-3.5 w-3.5 flex-shrink-0" />
              {f}
            </button>
          ))}

          <div className="pt-5 border-t border-border mt-5">
            <div className="flex items-center gap-2 mb-3">
              <HardDrive className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-[10px] text-muted-foreground font-semibold uppercase">Storage</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px]">
                <span className="text-muted-foreground">Used</span>
                <span className="text-foreground font-semibold">32 MB</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full">
                <div className="h-full bg-gradient-to-r from-accent to-[hsl(152,60%,40%)] rounded-full" style={{ width: "32%" }} />
              </div>
              <p className="text-[10px] text-muted-foreground">32 MB / 100 MB</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search files..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
            </div>
            <div className="flex items-center gap-0.5 border border-border rounded-xl p-1 bg-muted/20">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-accent text-accent-foreground xalco-shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                <Grid3x3 className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-accent text-accent-foreground xalco-shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
            <Badge variant="secondary" className="text-[10px]">{filtered.length} files</Badge>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <label className="border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent hover:bg-accent/[0.02] transition-all aspect-square group">
                <Upload className="h-7 w-7 text-muted-foreground group-hover:text-accent transition-colors" />
                <span className="text-[10px] text-muted-foreground group-hover:text-accent text-center px-3 font-medium">Drop files here or click to upload</span>
              </label>

              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id)}
                  className={`relative group cursor-pointer rounded-2xl border transition-all duration-200 ${
                    selected.includes(item.id) ? "border-accent bg-accent/[0.03] xalco-shadow" : "border-border hover:border-accent/40 hover:xalco-shadow-sm"
                  }`}
                >
                  <div className="aspect-square bg-muted/30 rounded-t-2xl flex items-center justify-center text-4xl">
                    {item.emoji}
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] font-medium text-foreground truncate">{item.name}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[9px] text-muted-foreground">{item.size}</span>
                      <Badge variant="secondary" className="text-[9px] px-1.5 capitalize">{item.type}</Badge>
                    </div>
                  </div>
                  {selected.includes(item.id) && (
                    <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-accent rounded-full flex items-center justify-center xalco-shadow-sm">
                      <span className="text-[10px] text-accent-foreground font-bold">✓</span>
                    </div>
                  )}
                  <div className="absolute top-2.5 left-2.5 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <button className="w-7 h-7 bg-card/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:border-accent transition-colors" onClick={(e) => e.stopPropagation()}>
                      <Download className="h-3 w-3 text-muted-foreground" />
                    </button>
                    <button className="w-7 h-7 bg-card/90 backdrop-blur-sm rounded-lg border border-border flex items-center justify-center hover:border-accent transition-colors" onClick={(e) => e.stopPropagation()}>
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl overflow-hidden xalco-shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/20">
                    {["File", "Type", "Size", "Dimensions", "Used In", ""].map((h) => (
                      <th key={h} className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted/30 rounded-lg flex items-center justify-center flex-shrink-0">{typeIcon(item.type)}</div>
                          <span className="text-xs font-medium text-foreground">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5"><Badge variant="secondary" className="text-[10px] capitalize">{item.type}</Badge></td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground">{item.size}</td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground">{item.dims}</td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground">{item.used} places</td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><Download className="h-3 w-3 text-muted-foreground" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><Trash2 className="h-3 w-3 text-destructive/60" /></Button>
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
