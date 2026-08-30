export const WHATSAPP_NUMBER = "919043432286";
export const WHATSAPP_DISPLAY = "+91 90434 32286";
export const EMAIL = "dryogeshkumar@gmail.com";

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export const DEFAULT_TITLE =
  "Dr. Yogesh Kumar — Prosthodontist & Implantologist | Complex Oral Rehabilitation, Chennai";
export const DEFAULT_DESC =
  "Dr. Yogesh Kumar — Prosthodontist & Implantologist, Chennai. Complex oral rehabilitation: full-mouth rehabilitation, full-arch implants, advanced implant solutions and smile rehabilitation.";

export const setMeta = (title, description) => {
  document.title = title;
  const m = document.querySelector('meta[name="description"]');
  if (m && description) m.setAttribute("content", description);
};
