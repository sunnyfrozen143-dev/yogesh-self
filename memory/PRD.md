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

## Implemented (2026-06 fork session)
- Enquiry email alerts: every new consultation triggers an email to OWNER_EMAIL (dryogeshkumar@gmail.com — still to confirm) via Emergent managed email (backend/emailer.py, background task, guardrail gate, from_name "Dr. Yogesh Kumar"). Verified live send (202 + log).
- Enquiries Dashboard at /admin (frontend/src/pages/Admin.jsx): key-locked (ADMIN_KEY, sessionStorage), stat cards, status filters (new/contacted/consulted/closed), search, per-lead WhatsApp link, status select → PATCH /api/consultations/{id}, refresh, lock.
- PATCH /api/consultations/{cid} endpoint (admin-guarded, status enum validated). Auth now fails closed if ADMIN_KEY unset.
- Case Stories section (components/CaseStories.jsx, id="cases"): 3 de-identified editorial case narratives (presented/thinking/changed) + navbar link + CTA to consult form.
- React Router added: "/" landing, "/admin" dashboard. Deleted orphaned Facility.jsx.
- Testing agent iteration_1: 100% backend + frontend pass; test data cleaned.

## Implemented (2026-06 fork session, part 2)
- Real photos: hero portrait (wh5zb4y1 asset) + hands-on surgical training photo in Philosophy sticky column (mu4d9h9a asset). Stock hero photo removed.
- Case Stories rewritten with 4 REAL de-identified cases from Dr. Yogesh's uploaded case-profile PPTX: (1) zygomatic + All-on-4 dual-arch atrophy, (2) maxillary implant rescue/revision with zygoma, (3) aesthetic zone symphysis grafting + Maryland bridge (26M RTA), (4) full-mouth rehab with direct sinus lift.
- Patient Education hub: Learn section on landing (id="learn") + 5 SEO articles at /learn/:slug (src/lib/articles.js): dental-implants-explained, full-arch-implants-all-on-4, zygomatic-implants-no-bone, worn-teeth-full-mouth-rehabilitation, loose-dentures-options. Article pages (src/pages/Article.jsx) with document.title SEO, CTA panel, related articles, unknown-slug redirect. Landing hash-scroll (/#consult, /#learn) added.
- PPTX source saved insights: obturator, smile design veneers, TMD, guided surgery cases available for future case stories/articles (file was 106MB, not stored in repo).
- Testing agent iteration_2: 100% frontend pass.

## Implemented (2026-06 fork session, part 3)
- SEO & Search visibility: OG/Twitter meta tags in index.html (portrait as share image → WhatsApp/social preview cards), public/sitemap.xml (6 URLs), public/robots.txt (Disallow /admin), per-article meta description via setMeta helper in lib/site.js. NOTE: sitemap/robots URLs hardcoded to preview domain — update when custom domain is added.
- 3 more case stories from PPTX (total 7): Case 05 maxillectomy hollow-bulb obturator, Case 06 digital smile design veneers (trial smile first), Case 07 fully guided All-on-6 immediate loading. Section shows 4 with "View 3 more case stories" expander (case-stories-show-more).
- Consultation mode flow: consult form now has "Preferred first consultation" selector — In-person (Chennai) or Online screening first (video after booking, for outstation patients). Backend ConsultationCreate.mode field (validated enum, 422 on invalid), shown in admin dashboard + alert email. Copy updated in form sidebar (4 steps) and FAQ ("Where will my consultation take place?").
- Self-tested: sitemap/robots 200, OG tags served, POST with mode=online_screening + email fired, invalid mode 422, mode selector + 7-case expand verified via screenshot.

## Backlog
- P0: Confirm alert email address (currently assumed dryogeshkumar@gmail.com in backend/.env OWNER_EMAIL)
- P2: SEO: OG images, sitemap, meta descriptions per article
- P2: More case stories/articles from remaining PPTX cases (obturator/maxillofacial prosthesis, smile design veneers, guided full-arch, implant-supported overdenture)
- P2: Google Business Profile + Search Console; custom domain on Dr. Yogesh's name
- P2: Scheduled specialist consultation days section (Tamil Nadu locations)
- P2: Analytics dashboard (enquiry → consultation → acceptance funnel); pagination on GET /api/consultations if leads exceed 500

## Next Tasks
1. Confirm correct alert email address (OWNER_EMAIL in backend/.env)
2. Update sitemap.xml/robots.txt URLs when custom domain is connected
3. Optional: WhatsApp notification to doctor in addition to email
