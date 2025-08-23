import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Search,
  MoreVertical,
  RefreshCw,
  LayoutGrid,
  List as ListIcon,
  Plus,
  ArrowDownUp,
  Copy,
  Trash2,
  Scissors,
  Clipboard,
  Upload,
  Download,
  Settings,
  Star,
  Folder as FolderIcon,
  File as FileIcon,
  HardDrive,
  GripVertical,
  MonitorSmartphone,
  Sun,
  Moon,   // 👈 ye add karo
} from "lucide-react";


// ---------- Helpers ----------
const fmtBytes = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
};

const nowMinus = (days) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};

// ---------- Mock FS Model ----------
const seedFS = () => ({
  QuickAccess: {
    Desktop: [
      { name: "Project Alpha", type: "folder", modified: nowMinus(1) },
      { name: "Screenshots", type: "folder", modified: nowMinus(5) },
      { name: "todo.txt", type: "file", ext: "txt", size: 1540, modified: nowMinus(2) },
    ],
    Documents: [
      { name: "Resume.pdf", type: "file", ext: "pdf", size: 245760, modified: nowMinus(10) },
      { name: "Invoices", type: "folder", modified: nowMinus(22) },
      { name: "Notes", type: "folder", modified: nowMinus(3) },
    ],
    Downloads: [
      { name: "setup.exe", type: "file", ext: "exe", size: 104857600, modified: nowMinus(0) },
      { name: "wallpaper.jpg", type: "file", ext: "jpg", size: 2048000, modified: nowMinus(1) },
    ],
    Pictures: [
      { name: "Vacation", type: "folder", modified: nowMinus(35) },
      { name: "Family.jpg", type: "file", ext: "jpg", size: 3481600, modified: nowMinus(50) },
    ],
  },
  ThisPC: {
    "Local Disk (C:)": {
      used: 128 * 1024 ** 3,
      total: 256 * 1024 ** 3,
      children: [
        { name: "Users", type: "folder", modified: nowMinus(120) },
        { name: "Windows", type: "folder", modified: nowMinus(15) },
        { name: "Program Files", type: "folder", modified: nowMinus(8) },
      ],
    },
    "Data (D:)": {
      used: 420 * 1024 ** 3,
      total: 1024 * 1024 ** 3,
      children: [
        { name: "Media", type: "folder", modified: nowMinus(6) },
        { name: "Backups", type: "folder", modified: nowMinus(60) },
      ],
    },
  },
});

// ---------- UI Primitives ----------
const Button = ({ className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-sm hover:bg-zinc-200/60 active:scale-[.98] transition border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const ToolbarButton = ({ icon: Icon, label, onClick, shortcut, className = "" }) => (
  <Button
    onClick={onClick}
    className={`group hover:bg-zinc-100/70 border-zinc-200 ${className}`}
  >
    {Icon && <Icon size={18} className="shrink-0" />}
    <span className="hidden md:inline">{label}</span>
    {shortcut && (
      <kbd className="ml-1 rounded bg-zinc-200 px-1 text-[10px]">{shortcut}</kbd>
    )}
  </Button>
);

const Chip = ({ children }) => (
  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">{children}</span>
);

// ---------- Main Component ----------
const FileExplorer = () => {
  const [fs, setFs] = useState(seedFS());
  const [darkMode, setDarkMode] = useState(true);

  const [nav, setNav] = useState({
    section: "QuickAccess",
    path: ["Desktop"], // e.g., ["Desktop"] or ["ThisPC", "Local Disk (C:)"]
  });
  const [history, setHistory] = useState([["QuickAccess", "Desktop"]]);
  const [histIndex, setHistIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid"); // grid | list
  const [selected, setSelected] = useState(new Set());
  const [contextMenu, setContextMenu] = useState(null); // {x,y,item}
  const [renaming, setRenaming] = useState(null); // item name

  const content = useMemo(() => {
    // Resolve items for current nav
    if (nav.section === "QuickAccess") {
      const folder = nav.path[0];
      return fs.QuickAccess[folder] || [];
    }
    if (nav.section === "ThisPC") {
      if (nav.path.length === 1) {
        // At drives root -> show drives as pseudo-folders
        return Object.entries(fs.ThisPC).map(([name, info]) => ({
          name,
          type: "drive",
          info,
          modified: nowMinus(7),
        }));
      }
      // Inside a drive
      const drive = fs.ThisPC[nav.path[0]];
      return drive?.children || [];
    }
    return [];
  }, [fs, nav]);

  const filtered = useMemo(() => {
    if (!query) return content;
    const q = query.toLowerCase();
    return content.filter((it) => it.name.toLowerCase().includes(q));
  }, [content, query]);

  // ---------- Navigation helpers ----------
  const pushHistory = (nextNav) => {
    const key = [nextNav.section, ...nextNav.path];
    const newHist = [...history.slice(0, histIndex + 1), key];
    setHistory(newHist);
    setHistIndex(newHist.length - 1);
  };

  const goBack = () => {
    if (histIndex <= 0) return;
    const idx = histIndex - 1;
    setHistIndex(idx);
    const key = history[idx];
    setNav({ section: key[0], path: key.slice(1) });
    setSelected(new Set());
  };

  const goForward = () => {
    if (histIndex >= history.length - 1) return;
    const idx = histIndex + 1;
    setHistIndex(idx);
    const key = history[idx];
    setNav({ section: key[0], path: key.slice(1) });
    setSelected(new Set());
  };

  const openQuick = (folder) => {
    const next = { section: "QuickAccess", path: [folder] };
    setNav(next);
    setSelected(new Set());
    pushHistory(next);
  };

  const openDriveRoot = () => {
    const next = { section: "ThisPC", path: ["__root__"] };
    // store only section in history for root marker
    setNav({ section: "ThisPC", path: [] });
    setSelected(new Set());
    pushHistory({ section: "ThisPC", path: [] });
  };

  const openDrive = (driveName) => {
    const next = { section: "ThisPC", path: [driveName] };
    setNav(next);
    setSelected(new Set());
    pushHistory(next);
  };

  const openItem = (item) => {
    if (item.type === "folder") {
      // Open as subfolder within current level (for demo we flatten)
      // Just navigate to a new quick access temp folder with empty contents
      const tmpName = item.name;
      const next = { section: nav.section, path: [tmpName] };
      // Ensure it exists in QuickAccess for demo
      setFs((prev) => ({
        ...prev,
        QuickAccess: {
          ...prev.QuickAccess,
          [tmpName]: prev.QuickAccess[tmpName] || [],
        },
      }));
      setNav(next);
      pushHistory(next);
      setSelected(new Set());
      return;
    }
    if (item.type === "drive") {
      openDrive(item.name);
      return;
    }
  };

  // ---------- Mutations ----------
  const createNewFolder = () => {
    const base = "New folder";
    let n = 0;
    let name = base;
    const names = new Set(content.map((i) => i.name));
    while (names.has(name)) {
      n += 1;
      name = `${base} (${n})`;
    }
    const folder = { name, type: "folder", modified: new Date() };
    const update = (items) => [folder, ...items];

    setFs((prev) => {
      const copy = { ...prev };
      if (nav.section === "QuickAccess") {
        const key = nav.path[0];
        copy.QuickAccess = { ...copy.QuickAccess, [key]: update(copy.QuickAccess[key] || []) };
      } else if (nav.section === "ThisPC") {
        if (nav.path.length === 1) {
          // inside a drive
          const drive = { ...copy.ThisPC[nav.path[0]] };
          drive.children = update(drive.children || []);
          copy.ThisPC = { ...copy.ThisPC, [nav.path[0]]: drive };
        }
      }
      return copy;
    });
    setRenaming(name);
  };

  const deleteSelected = () => {
    if (selected.size === 0) return;
    setFs((prev) => {
      const copy = { ...prev };
      const filterOut = (items) => items.filter((i) => !selected.has(i.name));
      if (nav.section === "QuickAccess") {
        const key = nav.path[0];
        copy.QuickAccess = { ...copy.QuickAccess, [key]: filterOut(copy.QuickAccess[key] || []) };
      } else if (nav.section === "ThisPC") {
        if (nav.path.length === 1) {
          const drive = { ...copy.ThisPC[nav.path[0]] };
          drive.children = filterOut(drive.children || []);
          copy.ThisPC = { ...copy.ThisPC, [nav.path[0]]: drive };
        }
      }
      return copy;
    });
    setSelected(new Set());
  };

  const renameItem = (oldName, newName) => {
    if (!newName || newName.trim() === oldName) return setRenaming(null);
    setFs((prev) => {
      const copy = { ...prev };
      const mapRename = (items) => items.map((i) => (i.name === oldName ? { ...i, name: newName } : i));
      if (nav.section === "QuickAccess") {
        const key = nav.path[0];
        copy.QuickAccess = { ...copy.QuickAccess, [key]: mapRename(copy.QuickAccess[key] || []) };
      } else if (nav.section === "ThisPC" && nav.path.length === 1) {
        const drive = { ...copy.ThisPC[nav.path[0]] };
        drive.children = mapRename(drive.children || []);
        copy.ThisPC = { ...copy.ThisPC, [nav.path[0]]: drive };
      }
      return copy;
    });
    setRenaming(null);
  };

  // ---------- Context Menu ----------
  const onContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item });
    setSelected(new Set([item.name]));
  };

  useEffect(() => {
    const close = () => setContextMenu(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  // ---------- Render ----------
  const breadcrumbs = useMemo(() => {
    const parts = [];
    if (nav.section === "QuickAccess") {
      parts.push("Home");
      parts.push(nav.path[0]);
    } else if (nav.section === "ThisPC") {
      parts.push("This PC");
      if (nav.path[0]) parts.push(nav.path[0]);
    }
    return parts;
  }, [nav]);

  const toggleSelection = (name) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div  
     className={`${
    darkMode
      ? "bg-zinc-900 text-white"
      : "bg-gradient-to-b from-zinc-50 to-white text-zinc-800"
  } h-screen w-full`}>
      {/* Title bar */}
     <div className="flex items-center gap-2">
  <Button className="hover:bg-blue-50"><MonitorSmartphone size={18} /><span className="hidden md:inline">Responsive</span></Button>
  <Button onClick={() => setDarkMode(!darkMode)} className="hover:bg-blue-50">
    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
  </Button>
  <Button className="hover:bg-blue-50"><Settings size={18} /></Button>
</div>


      {/* Command bar */}
<div className={`flex flex-wrap items-center gap-2 px-3 py-2 
  ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white/80 border-zinc-200"}`}>
        <ToolbarButton icon={Plus} label="New" onClick={createNewFolder} />
        <ToolbarButton icon={Scissors} label="Cut" />
        <ToolbarButton icon={Copy} label="Copy" />
        <ToolbarButton icon={Clipboard} label="Paste" />
        <ToolbarButton icon={Upload} label="Share" />
        <ToolbarButton icon={Trash2} label="Delete" onClick={deleteSelected} />
        <div className="h-5 w-px bg-zinc-200 mx-1" />
        <ToolbarButton icon={ArrowDownUp} label="Sort" />
        <ToolbarButton icon={view === "grid" ? LayoutGrid : ListIcon} label="View" onClick={() => setView(view === "grid" ? "list" : "grid")} />
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 rounded-2xl border bg-white px-2 py-1.5">
            {breadcrumbs.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm text-zinc-700">{b}</span>
                {i !== breadcrumbs.length - 1 && <GripVertical size={14} className="text-zinc-300" />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-2xl  py-2 border-slate-500 ">
           <input
           type="text"
           placeholder="Search..."
           className={`w-full rounded-xl px-3 py-2 text-sm outline-none 
             ${darkMode 
               ? "bg-zinc-800 text-zinc-200 placeholder-zinc-400 focus:bg-zinc-700" 
               : "bg-zinc-100 text-zinc-800 placeholder-zinc-500 focus:bg-white"} 
           `}
         />
            <RefreshCw size={16} className="text-zinc-500" />
          </div>
          <Button className="hover:bg-blue-50"><MoreVertical size={18} /></Button>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-12 h-[calc(100vh-110px)]">
        {/* Navigation Pane */}
        <aside className={`col-span-3 md:col-span-2 border-r overflow-auto p-2 
  ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-white/60 border-zinc-200"}`}>

          <div className="text-xs uppercase tracking-wide text-zinc-500 px-2 mb-1">Quick access</div>
          <nav className="space-y-1">
            {Object.keys(fs.QuickAccess).map((key) => (
                      <button
  key={key}
  onClick={() => openQuick(key)}
  className={`w-full flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm transition-colors
    ${darkMode 
      ? "text-zinc-200 hover:bg-zinc-700 border border-transparent hover:border-zinc-600" 
      : "text-zinc-800 hover:bg-zinc-100 border border-transparent hover:border-zinc-200"} 
    ${nav.section === "QuickAccess" && nav.path[0] === key 
      ? (darkMode ? "bg-zinc-700" : "bg-zinc-100") 
      : ""}`}
>
  <FolderIcon size={16} /> {key}
                </button>
            ))}
          </nav>

          <div className="mt-4 text-xs uppercase tracking-wide text-zinc-500 px-2 mb-1">This PC</div>
          <button
            className={`w-full flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm hover:bg-zinc-100 ${
              nav.section === "ThisPC" && nav.path.length === 0 ? "bg-zinc-100" : ""
            }`}
            onClick={openDriveRoot}
          >
            <HardDrive size={16} /> This PC
          </button>
          <div className="mt-1 space-y-1">
            {Object.entries(fs.ThisPC).map(([name, info]) => (
            <button
             key={name}
             className={`w-full flex items-center gap-2 rounded-xl px-2 py-1.5 text-sm 
               hover:bg-zinc-100 dark:hover:bg-zinc-600
               ${nav.section === "ThisPC" && nav.path[0] === name ? "bg-zinc-100 dark:bg-zinc-600" : ""}`}
             onClick={() => openDrive(name)}
           >
  <           HardDrive size={16} /> {name}
             <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">
               {Math.round((info.used / info.total) * 100)}%
             </span>
           </button>
            ))}
          </div>
        </aside>

        {/* Content Pane */}
        <main className="col-span-9 md:col-span-10 overflow-auto">
          {/* Header path */}
          <div className="px-3 py-2 border-b bg-white/80 sticky top-0 z-20">
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              {breadcrumbs.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="hover:underline cursor-pointer" onClick={() => (i === 0 ? (nav.section === "ThisPC" ? openDriveRoot() : openQuick(b === "Home" ? "Desktop" : b)) : null)}>
                    {b}
                  </span>
                  {i !== breadcrumbs.length - 1 && <ChevronRight size={14} />}
                </div>
              ))}
            </div>
            
          </div>

          {/* Items */}
          <div className="p-3">
            {view === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {filtered.map((item) => (
                  <motion.div
                      key={item.name}
                      layout
                      onDoubleClick={() => openItem(item)}
                      onContextMenu={(e) => onContextMenu(e, item)}
                      className={`group rounded-2xl border p-3 cursor-default select-none ${
                        darkMode
                          ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-white"
                          : "bg-white hover:shadow-sm border-zinc-200 text-zinc-800"
                      } ${selected.has(item.name) ? "ring-2 ring-blue-500" : ""}`}
                      onClick={(e) => {
                        if (e.shiftKey || e.ctrlKey || e.metaKey) toggleSelection(item.name);
                        else setSelected(new Set([item.name]));
                      }}
                    >
                      <div className={`rounded-xl p-2 border ${
                        darkMode ? "bg-zinc-700 border-zinc-600" : "bg-zinc-50 border-zinc-200"
                      }`}>
                        {item.type === "folder" && <FolderIcon />}
                        {item.type === "file" && <FileIcon />}
                       {item.type === "drive" && <HardDrive />}
                      </div>
                    </motion.div>
                    
                ))}
              </div>
            ) : (
              <div className="rounded-2xl overflow-hidden border bg-white">
                <div className="grid grid-cols-12 text-xs uppercase tracking-wide text-zinc-500 px-3 py-2 border-b">
                  <div className="col-span-6">Name</div>
                  <div className="col-span-3">Date modified</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-1 text-right pr-2">Size</div>
                </div>
                <div>
                  {filtered.map((item) => (
                  <div className={`rounded-2xl overflow-hidden border ${
                        darkMode ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200"
                      }`}>
                      <div className="col-span-6 flex items-center gap-2">
                        <div className="w-6 h-6 grid place-items-center rounded border bg-zinc-50">
                          {item.type === "folder" && <FolderIcon size={16} />}
                          {item.type === "file" && <FileIcon size={16} />}
                          {item.type === "drive" && <HardDrive size={16} />}
                        </div>
                        {renaming === item.name ? (
                          <input
                            autoFocus
                            defaultValue={item.name}
                            onBlur={(e) => renameItem(item.name, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") renameItem(item.name, e.currentTarget.value);
                              if (e.key === "Escape") setRenaming(null);
                            }}
                            className="rounded-md border px-2 py-1"
                          />
                        ) : (
                          <span className="truncate" title={item.name}>{item.name}</span>
                        )}
                      </div>
                      <div className="col-span-3 text-zinc-500">
                        {item.modified ? new Date(item.modified).toLocaleString() : "—"}
                      </div>
                      <div className="col-span-2 text-zinc-500">
                        {item.type === "file" ? (item.ext || "File").toUpperCase() : item.type === "folder" ? "Folder" : "Drive"}
                      </div>
                      <div className="col-span-1 text-right pr-2 text-zinc-500">
                        {item.size ? fmtBytes(item.size) : item.type === "drive" ? `${fmtBytes(item.info.used)} / ${fmtBytes(item.info.total)}` : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Status bar */}
<div className={`sticky bottom-0 px-3 py-2 flex items-center 
  ${darkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white/80 border-zinc-200 text-zinc-800"}`}>
        <span><b>{filtered.length}</b> items</span>
        {selected.size > 0 && <Chip>{selected.size} selected</Chip>}
        <div className="ml-auto flex items-center gap-2">
          <Button onClick={() => setView("grid")} className={view === "grid" ? "bg-zinc-100" : ""}><LayoutGrid size={16} /> Grid</Button>
          <Button onClick={() => setView("list")} className={view === "list" ? "bg-zinc-100" : ""}><ListIcon size={16} /> List</Button>
        </div>
      </div>

      {/* Context menu */}
      <AnimatePresence>
        {contextMenu && (
        <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.97 }}
  transition={{ duration: 0.12 }}
  className={`fixed z-[100] min-w-[180px] rounded-xl border shadow-xl overflow-hidden ${
    darkMode ? "bg-zinc-800 border-zinc-700 text-white" : "bg-white border-zinc-200 text-zinc-800"
  }`}
  style={{ left: contextMenu.x, top: contextMenu.y }}
  onClick={(e) => e.stopPropagation()}
>

            <MenuItem onClick={() => { openItem(contextMenu.item); setContextMenu(null); }}>Open</MenuItem>
            <MenuItem onClick={() => { setRenaming(contextMenu.item.name); setContextMenu(null); }}>Rename</MenuItem>
            <MenuItem onClick={() => { deleteSelected(); setContextMenu(null); }} icon={Trash2}>Delete</MenuItem>
            <div className="h-px bg-zinc-100" />
            <MenuItem onClick={() => setContextMenu(null)} icon={Copy}>Copy</MenuItem>
            <MenuItem onClick={() => setContextMenu(null)} icon={Scissors}>Cut</MenuItem>
            <MenuItem onClick={() => setContextMenu(null)} icon={Clipboard}>Paste</MenuItem>
            <div className="h-px bg-zinc-100" />
            <MenuItem onClick={() => setContextMenu(null)} icon={MoreVertical}>Properties</MenuItem>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MenuItem = ({ children, onClick, icon: Icon, darkMode }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left ${
      darkMode ? "hover:bg-zinc-700 text-zinc-200" : "hover:bg-zinc-50 text-zinc-800"
    }`}
  >
    {Icon && <Icon size={16} className="opacity-70" />} {children}
  </button>
);


export default FileExplorer;
