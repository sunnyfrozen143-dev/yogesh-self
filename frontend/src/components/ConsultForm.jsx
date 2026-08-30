import { useState } from "react";
import axios from "axios";
import { MessageCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Reveal, Overline } from "@/components/Reveal";
import { waLink, WHATSAPP_DISPLAY } from "@/lib/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const steps = [
  "You share your concerns below",
  "The coordinator calls you for pre-consultation guidance and booking",
  "Optional: an online video consultation for initial screening",
  "You meet Dr. Yogesh in Chennai for your specialist consultation",
];

const TIME_SLOTS = ["11:00 AM", "12:30 PM", "3:00 PM", "5:00 PM", "6:30 PM", "8:00 PM"];

const nextDates = () => {
  const out = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (out.length < 10) {
    if (d.getDay() !== 0) {
      out.push({
        value: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString("en-IN", { weekday: "short" }),
        date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
};

const inputCls =
  "w-full bg-white border border-input px-4 py-3.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring/30 focus:border-foreground transition-colors duration-300";

export default function ConsultForm() {
  const [form, setForm] = useState({ name: "", age: "", location: "", phone: "", chief_complaint: "", goal: "", mode: "in_person", preferred_date: "", preferred_time: "" });
  const [dates] = useState(nextDates);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

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
      setError("Something went wrong. Please try again or reach us on WhatsApp.");
    }
    setBusy(false);
  };

  return (
    <section data-testid="consult-section" id="consult" className="py-28 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Overline>Begin here</Overline>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.1]">
                Request a <em className="text-slate-500">Consultation</em>
              </h2>
              <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
                A specialist consultation is a structured experience — not “what
                problem do you have?” For complex cases it can take 60–90 minutes,
                because the plan deserves that time.
              </p>
              <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-md border-l-2 border-foreground/20 pl-4">
                Consultations are held in <span className="text-foreground">Chennai</span>.
                Travelling from outside? After booking, an online video consultation
                can be arranged for initial screening — so your case is assessed
                before you travel.
              </p>
              <ol className="mt-10 space-y-5">
                {steps.map((s, i) => (
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
                Prefer to talk first? WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            {done ? (
              <div data-testid="consult-success" className="border border-border bg-white p-10 lg:p-14">
                <CheckCircle2 className="w-10 h-10 text-slate-700" />
                <h3 className="mt-6 font-serif text-3xl tracking-tight">Request received, {form.name.split(" ")[0]}.</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
                  Your details are with Dr. Yogesh's care team. The fastest way to
                  complete your pre-consultation is to continue on WhatsApp — your
                  details will be pre-filled.
                </p>
                <a
                  data-testid="whatsapp-followup-btn"
                  href={waLink(`Hello Dr. Yogesh, I just submitted a consultation request.\nName: ${form.name}\nAge: ${form.age}\nLocation: ${form.location}\nConcern: ${form.chief_complaint}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 text-sm hover:bg-slate-700 transition-colors duration-300"
                >
                  <MessageCircle className="w-4 h-4" />
                  Continue on WhatsApp
                </a>
              </div>
            ) : (
              <form data-testid="consult-form" onSubmit={submit} className="border border-border bg-background p-8 lg:p-12 space-y-7">
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">Full name *</label>
                    <input data-testid="consult-name-input" required minLength={2} value={form.name} onChange={set("name")} className={inputCls} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">Age *</label>
                    <input data-testid="consult-age-input" required type="number" min={1} max={120} value={form.age} onChange={set("age")} className={inputCls} placeholder="e.g. 64" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-7">
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">Location *</label>
                    <input data-testid="consult-location-input" required minLength={2} value={form.location} onChange={set("location")} className={inputCls} placeholder="City / area" />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">Phone / WhatsApp *</label>
                    <input data-testid="consult-phone-input" required minLength={6} value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+91 ..." />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">Chief concern *</label>
                  <input data-testid="consult-complaint-input" required minLength={2} value={form.chief_complaint} onChange={set("chief_complaint")} className={inputCls} placeholder="e.g. Multiple missing teeth, loose dentures, worn teeth" />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">
                    What would you most like to be able to do again?
                  </label>
                  <textarea data-testid="consult-goal-input" rows={4} value={form.goal} onChange={set("goal")} className={inputCls} placeholder="e.g. I want to eat normally with my family." />
                </div>
                <div>
                  <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2.5">
                    Preferred first consultation
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      ["in_person", "In-person", "At the clinical facility · Chennai"],
                      ["online_screening", "Online screening first", "Video call after booking — ideal if travelling from outside Chennai"],
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
                      <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                        Preferred day — video screening
                      </label>
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
                      <label className="block font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">
                        Preferred time
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TIME_SLOTS.map((t) => (
                          <button
                            key={t}
                            type="button"
                            data-testid={`consult-time-${t.replace(/[\s:]/g, "-")}`}
                            onClick={() => setForm({ ...form, preferred_time: form.preferred_time === t ? "" : t })}
                            className={`px-4 py-2 border text-sm transition-colors duration-200 ${
                              form.preferred_time === t
                                ? "border-foreground bg-primary text-primary-foreground"
                                : "border-input bg-white hover:border-foreground/50"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This is your requested slot — the coordinator confirms the exact
                      time on the call. Sundays are not available.
                    </p>
                  </div>
                )}
                {error && <p data-testid="consult-error" className="text-sm text-red-700">{error}</p>}
                <button
                  data-testid="consult-submit-btn"
                  disabled={busy}
                  className="w-full sm:w-auto bg-primary text-primary-foreground px-10 py-4 text-sm tracking-wide hover:bg-slate-700 disabled:opacity-60 transition-colors duration-300 flex items-center justify-center gap-3"
                >
                  {busy && <Loader2 className="w-4 h-4 animate-spin" />}
                  {busy ? "Sending..." : "Submit Request"}
                </button>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your information stays within Dr. Yogesh's patient-care system and
                  is used only to arrange your consultation.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
