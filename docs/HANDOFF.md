# AppliQ: handoff summary (paste this into the backend chat)

## What this is
AppliQ ("Application + Queue") is a personal job/internship application tracker for ONE user (the author, a 3rd-year
Digital Engineering student at SIIT, Thammasat). Goal: use it for real, deploy it with a real database, and put it on
her resume as a full-stack project she can explain end to end. Target: finish in ~4 days total; the frontend part is done.

## Frontend status: DONE (v1.5), runs on LocalStorage
Stack: React 18 + Vite 5 + plain JavaScript, no router, no UI library. Folder `src/` is layered (see README):
UI components -> hooks -> `lib/` (pure rules) -> `data/storage.js` (the ONLY file that touches localStorage).
Rules for any AI editing the code are in `CLAUDE.md` (layering, derived data, small changes, no new deps).

Features built: sticky sidebar nav, big monthly calendar (event names inside day cells), to-do list (add/edit/delete/
done/undo, stars + derived urgency), quick notes, stats cards + stage bar, upcoming deadlines, applications table
(search/filter/sort), Kanban with drag + confirm modal (+ optional date and note), application detail with status
timeline, resources (links), Profile page (resume facts, links), minimum-GPA heads-up (never blocks applying),
export/import JSON backup (validated, asks before replacing), cream/butter pastel theme, AppliQ logo.

## Key design decisions (do not break)
1. Single source of truth: calendar events are DERIVED from application dates + tasks + personal events (never stored).
2. `priority` field = INTEREST (how much she wants it): High/Medium/Low shown as 3/2/1 stars. Stored.
3. Urgency = DERIVED from dates (`lib/urgency.js`): overdue / <=3 days / <=7 days / ok. Never stored.
4. ONE status rule: `lib/statusRules.js moveStatus()` (sets appliedDate on Applied, appends history). Kanban drag,
   status dropdown and edit form all go through it.
5. Status groups live in `constants.js` (TO_APPLY_STATUSES, SENT_STATUSES, CLOSED_STATUSES). Do not retype them.
6. Statuses: To Apply, Preparing, Applied, Under Review, Interview, Technical Test, Offer, Rejected, Withdrawn.

## Current data shapes (what the frontend sends/expects)
- application: id, company, position, jobType (Internship/Full-time/Part-time), location (On-site/Hybrid/Remote),
  jobLink, status, priority (=interest), deadline, appliedDate, followUpDate, interviewDate, testDate,
  expectedResultDate, nextAction, actionDate, eligibility, requiredDocs, hrContact, notes, minGpa (optional number),
  history: [{at (ISO), from (null for creation), to, note}]
- task: id, title, dueDate, applicationId (nullable), done (bool), priority (=importance 1-3 stars)
- personal event: id, title, date, type, notes
- resource: id, name, type (Resume/Portfolio/Transcript/...), version, url, updated
- profile (single object per user): name, summary, university, degree, years, gpa, highSchool, highSchoolGpa,
  languages, hardSkills[], softSkills[], email, phone, linkedin, github, portfolio
- notes: one string per user

## Suggested database (MySQL or PostgreSQL), every table has user_id from day one
users(id, email, password_hash, created_at)
applications(id, user_id, company, position, job_type, location, job_link, status, interest(1-3), deadline,
  applied_date, follow_up_date, interview_date, test_date, expected_result_date, next_action, action_date,
  eligibility, required_docs, hr_contact, notes, min_gpa)   -- rename frontend `priority` -> `interest`
status_history(id, application_id, from_status, to_status, note, changed_at)   -- replaces the `history` array
tasks(id, user_id, application_id NULL, title, due_date, done, importance(1-3))
personal_events(id, user_id, title, date, type, notes)
resources(id, user_id, name, type, version, url, updated_at)
profiles(user_id PK, ...profile fields..., hard_skills JSON, soft_skills JSON)
user_notes(user_id PK, body)
No calendar table (derived). No stored urgency (derived).

## What is left to do (in order)
1. Backend: Node.js + Express + MySQL/PostgreSQL (matches her GREENLOOP stack). Layers: routes -> controllers ->
   services -> db. Put the status rule (update status + insert status_history + set applied_date) in ONE service,
   in a DB transaction. Config via `.env`; schema as `schema.sql` / migrations.
2. Auth: register/login with hashed passwords + JWT; every query filtered by user_id (data isolation).
3. Endpoints (REST): applications CRUD + PATCH /applications/:id/status; tasks CRUD; events CRUD; resources CRUD;
   GET/PUT /profile; GET/PUT /notes. Test with Postman.
4. Frontend swap: replace `src/data/storage.js` (+ `hooks/useStore.js`) with per-record API calls (an `api.js`
   with getApplications, createApplication, updateApplication, changeStatus, ...). Components must not call fetch.
   Server should generate ids (frontend currently makes string ids with Date.now()).
5. Deploy (frontend + backend + DB), write README (what/why/how to run/architecture diagram), add live link and
   GitHub link to resume. Describe it honestly: the first frontend draft was AI-generated, then restructured and
   extended; she must be able to explain the layers, schema and status flow.
6. Later / optional: match-percentage vs requirements, Import CSV, dark mode, charts, tests + CI.

## Known limitations
- Data is per-browser until the backend exists; Drag & drop is mouse/trackpad only (use the status dropdown on touch).
- Personal events cannot be deleted from the UI yet. Calendar/overview still lives in `App.jsx` (could be split).
- Code is dense (generated style); run `npm run format` (Prettier) once. Versions in package.json were pinned from
  memory; adjust if `npm install` complains. Not yet verified by a full `npm run build` in the assistant's sandbox.
