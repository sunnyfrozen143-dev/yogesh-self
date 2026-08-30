# PRD — Dr. Yogesh Kumar: Personal Brand & Patient Acquisition Website

## Original Problem Statement
Build a personal brand website for Dr. Yogesh Kumar, MDS Prosthodontist & Implantologist (Chennai), centred on the specialist — not a clinic. Positioning: "I help patients and families understand complex dental treatment options before making major treatment decisions." Brand voice: calm, specialist, evidence-led, patient-centred. Target: high-intent patients with complex dental problems + their family decision-makers. Current model: specialist-led practice using selected clinical facilities (The Dental Avenue, Chennai).

## User Personas
- High-intent patient with complex dental problems (worn teeth, missing teeth, failing dentures, conflicting treatment plans)
- Family decision-maker (adult child / spouse of an elderly patient) researching on their behalf
- Dr. Yogesh (site owner) receiving structured consultation requests

## Core Requirements (static)
- Brand centred on "Dr. Yogesh Kumar", not a clinic
- Homepage hero: name, specialty, "understand the problem first" message, Request a Consultation CTA
- "When should you consult a Prosthodontist?" section
- 6-step treatment philosophy (Understand → Maintain)
- 4 clinical categories (Full-mouth rehab, Full-arch implants, Advanced implants, Smile & aesthetic)
- Facility positioning (The Dental Avenue = clinical facility, Dr. Yogesh = treating specialist)
- Patient intake form (name, age, location, phone, chief concern, "What would you most like to be able to do again?") + WhatsApp follow-up
- AI assistant answering patient questions (no diagnosis, no prices, no fear marketing)
- Award-level design: kinetic masked hero reveal, numbered manifesto, editorial marquee, Lenis smooth scroll, parallax, framer-motion reveals

## Implemented (2026-08-30)
- Full multi-section marketing site (React + Tailwind, Cormorant Garamond / Manrope / JetBrains Mono, warm bone + slate navy editorial palette)
- Kinetic hero with masked line-by-line reveal + parallax portrait in clipped frame
- Slow editorial trust marquee (react-fast-marquee)
- Positioning statement, Who-should-consult checklist, Philosophy manifesto (dark navy, sticky layout, chapters 01–06), Categories hover-invert rows 01–04
- Facility/Dental Avenue positioning section removed per user request (2026-08-30); FAQ and footer reworded to generic "well-equipped clinical facilities in Chennai"
- Backend (FastAPI + MongoDB): POST /api/consultations (intake), GET /api/consultations (guarded by x-admin-key), POST /api/ask (SSE-streamed AI assistant, gpt-5.4 via Emergent Universal Key, chat history persisted)
- Frontend chat widget with streaming responses, session persistence
- WhatsApp deep links with pre-filled messages (+91 90434 32286)
- Page title/meta updated

## Backlog
- P0: Replace hero/facility stock photos with real photos of Dr. Yogesh and The Dental Avenue
- P1: Email/WhatsApp notification to Dr. Yogesh when a new consultation request arrives (Resend integration)
- P1: Simple admin page to view consultation requests (currently API-only with admin key)
- P1: Case library / de-identified case stories section
- P2: SEO: blog/education articles per content pillars, OG images, sitemap
- P2: Google Business Profile + search Console setup; custom domain on Dr. Yogesh's name
- P2: Scheduled specialist consultation days section (Tamil Nadu locations) — Month 7–9 roadmap
- P2: Analytics dashboard (enquiry → consultation → acceptance funnel)

## Next Tasks
1. Get real portrait + facility photos from Dr. Yogesh and swap them in
2. Add enquiry notification (Resend email) so no request is missed
3. Build /admin enquiries view
4. Confirm correct email address (currently assumed dryogeshkumar@gmail.com)
