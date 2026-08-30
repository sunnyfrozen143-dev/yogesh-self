import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Loader2, LogOut, MessageCircle, RefreshCw, Search } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STATUSES = ["new", "contacted", "consulted", "closed"];
const STATUS_STYLES = {
  new: "bg-slate-900 text-white",
  contacted: "bg-amber-100 text-amber-900 border border-amber-300",
  consulted: "bg-emerald-100 text-emerald-900 border border-emerald-300",
  closed: "bg-slate-100 text-slate-500 border border-slate-200",
};

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

export default function Admin() {
  const [key, setKey] = useState(sessionStorage.getItem("yk_admin_key") || "");
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async (k) => {
    setBusy(true);
    setErr("");
    try {
      const res = await axios.get(`${API}/consultations`, { headers: { "x-admin-key": k } });
      setRows(res.data.consultations);
      setAuthed(true);
      setKey(k);
      sessionStorage.setItem("yk_admin_key", k);
    } catch {
      setErr("Invalid access key. Please try again.");
      setAuthed(false);
      sessionStorage.removeItem("yk_admin_key");
    }
    setBusy(false);
  }, []);

  useEffect(() => {
    if (key) load(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStatus = async (id, status) => {
    const prev = rows;
    setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await axios.patch(`${API}/consultations/${id}`, { status }, { headers: { "x-admin-key": key } });
    } catch {
      setRows(prev);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("yk_admin_key");
    setAuthed(false);
    setKey("");
    setKeyInput("");
    setRows([]);
  };

  const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: rows.filter((r) => r.status === s).length }), {});
  const filtered = rows.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (!q) return true;
    const hay = `${r.name} ${r.phone} ${r.location} ${r.chief_complaint}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm border border-border bg-white p-10">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Private</p>
          <h1 className="mt-4 font-serif text-3xl tracking-tight">Enquiries Dashboard</h1>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Enter your access key to view consultation requests.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (keyInput.trim()) load(keyInput.trim());
            }}
            className="mt-8 space-y-4"
          >
            <input
              data-testid="admin-key-input"
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Access key"
              className="w-full bg-white border border-input px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-foreground"
            />
            {err && <p data-testid="admin-auth-error" className="text-sm text-red-700">{err}</p>}
            <button
              data-testid="admin-login-btn"
              disabled={busy}
              className="w-full bg-primary text-primary-foreground py-3.5 text-sm hover:bg-slate-700 disabled:opacity-60 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div>
            <span className="font-serif text-xl leading-none block">Enquiries</span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted-foreground">
              Dr. Yogesh Kumar — Private
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              data-testid="admin-refresh-btn"
              onClick={() => load(key)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${busy ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              data-testid="admin-logout-btn"
              onClick={logout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" /> Lock
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          <div data-testid="admin-stat-total" className="border border-border bg-white p-5">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Total</p>
            <p className="mt-2 font-serif text-4xl">{rows.length}</p>
          </div>
          {STATUSES.map((s) => (
            <div key={s} data-testid={`admin-stat-${s}`} className="border border-border bg-white p-5">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{s}</p>
              <p className="mt-2 font-serif text-4xl">{counts[s]}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {["all", ...STATUSES].map((s) => (
            <button
              key={s}
              data-testid={`admin-filter-${s}`}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-sm border transition-colors duration-200 ${
                filter === s
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
          <div className="relative ml-auto w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              data-testid="admin-search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, phone, location..."
              className="w-full bg-white border border-input pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-foreground"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div data-testid="admin-empty-state" className="border border-border bg-white p-16 text-center text-muted-foreground">
            No enquiries {filter !== "all" ? `with status "${filter}"` : ""} {q ? `matching "${q}"` : ""} yet.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((r) => (
              <article
                key={r.id}
                data-testid={`admin-enquiry-${r.id}`}
                className="border border-border bg-white p-6 lg:p-8 grid lg:grid-cols-12 gap-6"
              >
                <div className="lg:col-span-3">
                  <h3 className="font-serif text-2xl tracking-tight">{r.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {r.age} yrs · {r.location}
                  </p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.15em] uppercase text-slate-500">
                    {r.mode === "online_screening" ? "Online screening requested" : "In-person · Chennai"}
                  </p>
                  <p className="mt-2 font-mono text-xs text-muted-foreground">{fmtDate(r.created_at)}</p>
                </div>
                <div className="lg:col-span-5">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 mb-1.5">Chief concern</p>
                  <p className="text-sm leading-relaxed">{r.chief_complaint}</p>
                  {r.goal && (
                    <>
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 mt-4 mb-1.5">
                        Wants to be able to
                      </p>
                      <p className="text-sm leading-relaxed text-muted-foreground">{r.goal}</p>
                    </>
                  )}
                </div>
                <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
                  <span className={`inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider ${STATUS_STYLES[r.status] || STATUS_STYLES.new}`}>
                    {r.status}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      data-testid={`admin-whatsapp-${r.id}`}
                      href={`https://wa.me/${r.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm border border-border px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                    >
                      <MessageCircle className="w-4 h-4" /> {r.phone}
                    </a>
                    <select
                      data-testid={`admin-status-select-${r.id}`}
                      value={r.status}
                      onChange={(e) => setStatus(r.id, e.target.value)}
                      className="border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
