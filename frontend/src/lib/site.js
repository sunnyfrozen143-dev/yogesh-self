export const WHATSAPP_NUMBER = "919043432286";
export const WHATSAPP_DISPLAY = "+91 90434 32286";
export const EMAIL = "dryogeshkumar@gmail.com";

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
