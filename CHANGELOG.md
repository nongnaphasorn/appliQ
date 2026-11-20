# AppliQ changelog (how the project evolved)

AppliQ ("Application + Queue") is a personal job/internship application tracker.
Each version below is a git tag (`v1.0` ... `v1.5`). Read top to bottom to see the evolution.

## Before v1.0: planning (no code yet)
1. **Idea:** one place instead of Google Sheets + Calendar + Notes + To-do for internship applications.
2. **Feature list, then cut to an MVP:** calendar-first dashboard, application CRUD, Kanban pipeline, to-do, notes.
   Nice-to-haves (gamification, CSV import, dark mode) postponed so a usable version ships first.
3. **Data model first:** applications, tasks, personal events, resources. The calendar is NOT a table: it is derived
   from application dates (single source of truth), so changing a deadline once updates everything.
4. **First frontend draft** generated with an AI tool (React + Vite + LocalStorage), used as a prototype to try the flow.

## v1.0: original prototype (tag `v1.0`, commit 97e615e)
The untouched AI-generated draft. Works as a demo but everything lives in one dense `App.jsx`. Kept as a restore point.

## v1.1: structure + theme (tag `v1.1`)
- **Why:** AI code tends to pile up in one file; the structure had to be fixed before adding features or a backend.
- Split `App.jsx` into layers: `constants`, `lib` (pure rules), `data/storage.js` (only file touching localStorage),
  `hooks`, `components/ui`, `features/*`. No behaviour change.
- Added `vite.config.js`, Prettier, pinned dependency versions, `CLAUDE.md` (rules for AI helpers).
- New cream + butter pastel theme with colour tokens (green theme removed).

## v1.2: calendar shows event names (tag `v1.2`)
- Day cells now show event names as small coloured chips (max 3 + "+N more") so the month is readable at a glance.
- Removed the Star Jar idea (not needed yet) and its code.

## v1.3: stars, profile, GPA heads-up (tag `v1.3`)
- Fixed calendar cells that had lost their rounded look.
- Priority shown as stars on applications and tasks (tasks got a priority field).
- Removed "My Journey" (tasks already cover it).
- New **Profile** page (education, GPA, skills, contact links) so resume facts are one click away.
- Optional **minimum GPA** per application: shows a heads-up when below, never blocks applying.

## v1.4: interest vs urgency, new name (tag `v1.4`)
- **Design decision:** stars = how much I want the company (stored); urgency = derived from dates and changes with
  time (overdue / <=3 days / <=7 days). Two different ideas, so two different things on screen.
- Task stars made horizontal everywhere.
- Renamed **Career Bloom -> AppliQ**, new logo mark and favicon.

## v1.5: bug fixes + final frontend structure (tag `v1.5`)
- **One status rule** (`lib/statusRules.js`): Kanban drag, dropdown and edit form behave the same; sets applied date.
- **Status history** with a timeline in the application detail (replaces appending text to notes).
- Tasks: edit, delete, mark done and undo, show completed.
- Safer backup import (validation + confirmation); confirm-dialog note is a controlled input.
- Split `App.jsx` further: KanbanBoard, ApplicationsTable, ApplicationDetail, ConfirmMove, StatsOverview,
  TodoWidget, ResourcesSection.
- Added `docs/HANDOFF.md` (data model, decisions, backend plan).

## Next: backend (planned, v2.x)
Database schema, Node/Express REST API with login (JWT), swap `data/storage.js` for API calls, deploy,
live demo link. See `docs/HANDOFF.md`.
