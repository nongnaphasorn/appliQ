# Rules for Career Bloom (give this file to any AI before it edits code)

## Architecture (layers, top to bottom)
- `features/*`, `components/ui/*`  -> UI only: show data, handle clicks. No business rules.
- `lib/*`                          -> pure functions (dates, calendar events, stars). No React, no storage.
- `hooks/*`                        -> React glue (e.g. useStore).
- `data/*`                         -> the ONLY place that talks to storage / (later) the backend API.
- Never skip a layer. Components must NOT call localStorage or fetch directly.

## Data rules
- Application dates are the single source of truth. Calendar events and stars are DERIVED, never stored.
- Status names live only in `src/constants.js`. Do not retype status lists elsewhere.

## Working rules
- Change only what I ask. Do not refactor unrelated files.
- If a change touches more than 3 files, stop and show the plan first.
- No new dependencies without asking. No `document.getElementById` inside React code.
- Prefer editing an existing function over adding a near-duplicate.
- One file = one job. If a file passes ~200 lines, propose a split.
- Run `npm run format` before every commit.
