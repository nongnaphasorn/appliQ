# Career Bloom — React starter project

A single-user job and internship application tracker. This is a real React frontend project with browser LocalStorage persistence. It has no login, backend, or Supabase dependency.

## Included features

- Calendar-first dashboard with month navigation and event color categories
- Application create, view, edit, delete, search, filter, and sorting
- Kanban pipeline with drag-and-drop and a confirmation step
- Moving an application to Interview or Technical Test can capture its date
- Application dates automatically appear on the calendar
- To-do list with optional application links
- Quick notes saved automatically
- Dashboard statistics, status breakdown, and upcoming deadlines
- Resources list for document metadata and external links
- Weekly goals and a simple career garden section
- JSON export/import backup
- Responsive layout for desktop and mobile

## Requirements

Install Node.js 18+ (npm is included with Node.js).

## Run the project

1. Extract the ZIP file.
2. Open a terminal in the `career-bloom` folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local address printed by Vite, usually `http://localhost:5173`.

For a production build, run `npm run build`. To preview it locally, run `npm run preview`.

## Source structure

```text
src/
  constants.js            statuses, status colours (single place)
  lib/                    pure helpers: dates.js, ids.js, applicationRules.js, stars.js
  data/                   storage.js (only file touching localStorage), seed.js (demo data)
  hooks/useStore.js       React hook on top of data/storage.js
  components/ui/          Modal, Field, Badge, SectionTitle
  features/               applications/, calendar/, todos/, resources/
  App.jsx                 page layout + state wiring (still large; next step: split per feature)
  styles.css              theme tokens + layout
```

Run `npm run format` once to turn the dense code into readable, formatted code. See `CLAUDE.md` for the rules.

## How the data is connected

LocalStorage keys start with `cb-`:

- `cb-apps`: applications (source of truth for application dates)
- `cb-tasks`: tasks, with optional `applicationId`
- `cb-events`: personal calendar events
- `cb-resources`: resource metadata and links
- `cb-notes`: quick notes
- `cb-goals`: weekly goals

Application calendar events are derived from each application's date fields by `appEvents()` in `src/App.jsx`. They are not stored as duplicate calendar records. Editing an application's deadline, interview date, test date, follow-up date, or expected result date therefore changes the calendar automatically. Personal events and task due dates are stored separately and merged into the calendar view.

## Kanban workflow

The Kanban board uses native HTML drag-and-drop, avoiding an extra dependency. Dropping a card in another status column opens a confirmation dialog. For Interview and Technical Test, the dialog can collect the related date. Confirming updates the application record; the calendar then derives the relevant event from that updated record. The application details dialog also has a status selector for touch and keyboard users.

## Current limitations

- Data stays in this browser profile on this device. Clearing browser storage can erase it; use Export backup regularly.
- Resources store metadata and external URLs; files are not uploaded.
- No cloud sync, user accounts, email notifications, or multi-user features.
- A proper immutable status-history timeline is not implemented yet; notes can hold update context for now.
- The drag-and-drop board is optimized for mouse/trackpad. Use the status selector in details on touch devices.

## Backend later

Suggested tables: `applications`, `tasks`, `personal_events`, `resources`, `weekly_goals`, and `application_status_history`. Use stable database IDs and an `application_id` foreign key for linked tasks. Keep application date fields as the source of truth for their calendar events. When adding a backend, replace `src/data/storage.js` (and then move to per-record API functions) with API/database calls while keeping the UI components and date-derivation logic separate.
