import { useState } from "react";
import axios from "axios";
import { MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal, Overline } from "@/components/Reveal";
import { waLink, WHATSAPP_DISPLAY } from "@/lib/site";
import { useLang } from "@/lib/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const TIME_SLOTS = ["11:00 AM", "12:30 PM", "3:00 PM", "5:00 PM", "6:30 PM", "8:00 PM"];

const nextDates = (locale) => {
  const out = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (out.length < 10) {
    if (d.getDay() !== 0) {
      out.push({
        value: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString(locale, { weekday: "short" }),
        date: d.toLocaleDateString(locale, { day: "numeric", month: "short" }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
};

const inputCls =
  "w-full bg-white border border-input px-4 py-3.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-foreground transition-colors duration-300";

export default function ConsultForm() {
  const { lang, t } = useLang();
  const f = t.form;
  const [form, setForm] = useState({ name: "", age: "", location: "", phone: "", chief_complaint: "", goal: "", mode: "in_person", preferred_date: "", preferred_time: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const dates = nextDates(lang === "ta" ? "ta-IN" : "en-IN");

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload = { ...form, age: parseInt(form.age, 10) };
      if (payload.mode !== "online_screening") {
        payload.preferred_date = "";
        payload.preferred_time = "";
      }
      await axios.post(`${API}/consultations`, payload);
      setDone(true);
    } catch {
      setError(f.error);
    }
    setBusy(false);
  };

  return (
    <section data-testid="consult-section" id="consult" className="py-28 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Overline>{f.overline}</Overline>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.15]">
                {f.title} <em className="text-slate-500">{f.titleEm}</em>
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">{f.para}</p>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-md border-l-2 border-foreground/20 pl-4">
                {f.chennaiNote1}<span className="text-foreground">{f.chennaiCity}</span>{f.chennaiNote2}
              </p>
              <ol className="mt-10 space-y-5">
                {f.steps.map((s, i) => (
                  <li key={s} className="flex gap-5 items-baseline">
                    <span className="font-serif text-2xl text-slate-400">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-muted-foreground">{s}</span>
                  </li>
                ))}
              </ol>
              <a
                data-testid="consult-whatsapp-direct"
                href={waLink("Hello Dr. Yogesh, I would like to request a consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-3 text-sm border-b border-foreground/30 pb-1 hover:border-foreground transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                {f.talkFirst} {WHATSAPP_DISPLAY}
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            {done ? (
              <div data-testid="consult-success" className="border border-border bg-white p-10 lg:p-14">
                <CheckCircle2 className="w-10 h-10 text-slate-700" />
                <h3 className="mt-6 font-serif text-3xl tracking-tight">{f.doneTitle(form.name.split(" ")[0])}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">{f.donePara}</p>
                <a
                  data-testid="whatsapp-followup-btn"
                  href={waLink(
                    `Hello Dr. Yogesh, I just submitted a consultation request.\nName: ${form.name}\nAge: ${form.age}\nLocation: ${form.location}\nConcern: ${form.chief_complaint}` +
                    (form.mode === "online_screening"
                      ? `\nPreferred: Online screening consultation${form.preferred_date ? `\nRequested day: ${form.preferred_date}` : ""}${form.preferred_time ? `\nRequested time: ${form.preferred_time}` : ""}`
                      : "\nPreferred: In-person consultation, Chennai")
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm hover:bg-slate-700 transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  {f.doneCta}
                </a>
              </div>
            ) : (
              <form data-testid="consult-form" onSubmit={submit} className="border border-border bg-background p-8 lg:p-12 space-y-7">
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">{f.name}</label>
                    <input data-testid="consult-name-input" required minLength={2} value={form.name} onChange={set("name")} className={inputCls} placeholder={f.namePh} />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">{f.age}</label>
                    <input data-testid="consult-age-input" required type="number" min={1} max={120} value={form.age} onChange={set("age")} className={inputCls} placeholder={f.agePh} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">{f.location}</label>
                    <input data-testid="consult-location-input" required minLength={2} value={form.location} onChange={set("location")} className={inputCls} placeholder={f.locationPh} />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">{f.phone}</label>
                    <input data-testid="consult-phone-input" required minLength={6} value={form.phone} onChange={set("phone")} className={inputCls} placeholder={f.phonePh} />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">{f.complaint}</label>
                  <input data-testid="consult-complaint-input" required minLength={2} value={form.chief_complaint} onChange={set("chief_complaint")} className={inputCls} placeholder={f.complaintPh} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">{f.goal}</label>
                  <textarea data-testid="consult-goal-input" rows={4} value={form.goal} onChange={set("goal")} className={inputCls} placeholder={f.goalPh} />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">{f.modeLabel}</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      ["in_person", f.modeInPerson, f.modeInPersonHint],
                      ["online_screening", f.modeOnline, f.modeOnlineHint],
                    ].map(([value, label, hint]) => (
                      <button
                        key={value}
                        type="button"
                        data-testid={`consult-mode-${value}`}
                        onClick={() => setForm({ ...form, mode: value })}
                        className={`text-left border px-4 py-3.5 transition-colors duration-300 ${
                          form.mode === value
                            ? "border-foreground bg-primary text-primary-foreground"
                            : "border-input bg-white hover:border-foreground/50"
                        }`}
                      >
                        <span className="block text-sm">{label}</span>
                        <span className={`block mt-1 text-xs leading-snug ${form.mode === value ? "text-slate-300" : "text-muted-foreground"}`}>
                          {hint}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {form.mode === "online_screening" && (
                  <div data-testid="consult-slot-picker" className="border border-border bg-white p-5 space-y-5">
                    <div>
                      <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{f.slotDay}</label>
                      <div className="flex flex-wrap gap-2">
                        {dates.map((d) => (
                          <button
                            key={d.value}
                            type="button"
                            data-testid={`consult-date-${d.value}`}
                            onClick={() => setForm({ ...form, preferred_date: form.preferred_date === d.value ? "" : d.value })}
                            className={`px-3 py-2 border text-center transition-colors duration-200 ${
                              form.preferred_date === d.value
                                ? "border-foreground bg-primary text-primary-foreground"
                                : "border-input bg-white hover:border-foreground/50"
                            }`}
                          >
                            <span className="block font-mono text-[9px] uppercase tracking-widest">{d.day}</span>
                            <span className="block text-sm mt-0.5">{d.date}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{f.slotTime}</label>
                      <div className="flex flex-wrap gap-2">
                        {TIME_SLOTS.map((tm) => (
                          <button
                            key={tm}
                            type="button"
                            data-testid={`consult-time-${tm.replace(/[\s:]/g, "-")}`}
                            onClick={() => setForm({ ...form, preferred_time: form.preferred_time === tm ? "" : tm })}
                            className={`px-4 py-2 border text-sm transition-colors duration-200 ${
                              form.preferred_time === tm
                                ? "border-foreground bg-primary text-primary-foreground"
                                : "border-input bg-white hover:border-foreground/50"
                            }`}
                          >
                            {tm}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.slotNote}</p>
                  </div>
                )}
                {error && <p data-testid="consult-error" className="text-sm text-red-700">{error}</p>}
                <button
                  data-testid="consult-submit-btn"
                  disabled={busy}
                  className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 text-sm tracking-wide hover:bg-slate-700 disabled:opacity-60 transition-colors duration-300 flex items-center justify-center gap-3"
                >
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                  {busy ? f.sending : f.submit}
                </button>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.privacy}</p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
