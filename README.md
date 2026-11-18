<<<<<<< HEAD
# Patchday — Vulnerability triage workspace

Patchday is a small React application for a security analyst who needs to decide which software vulnerabilities deserve attention first and track remediation across a mixed production environment.

## Run locally

Requires Node.js 20.19 or newer, or 22.12 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a static production build, run `npm run build`; Vite writes it to `dist/`. The app can be deployed to any static host that supports Vite output, such as Vercel, Netlify, or GitHub Pages (with the appropriate base path).

## Deployment

Build the app with `npm run build`; Vite writes the static files to `dist/`. For Vercel, import the repository and use `npm run build` as the build command and `dist` as the output directory.

## Problem and intended user

Vulnerability scanners generate more findings than a small application security team can investigate at once. An application security analyst needs a quick way to identify urgent issues, understand the affected asset and owning team, and communicate the next remediation step. Patchday brings severity, CVSS score, environment, age, ownership, and risk signals into one triage view. The initial focus is the analyst's first question: “What should I look at next, and why?”

## What's included

- Summary metrics and a compact finding activity visualization.
- Search across finding IDs, names, CVEs, assets, and teams.
- Severity and status filters, with priority, newest, and asset sorting.
- A finding detail drawer with affected asset context, risk signals, and remediation guidance.
- A state-changing action to resolve or reopen a finding; overview metrics and the severity chart update from that state.
- CSV export for the currently filtered findings.
- Loading, recoverable error, and no-results states.
- Responsive navigation, dashboard layout, and horizontally scrollable table for narrow screens.

## Architecture

The `App` component in `src/main.jsx` owns the finding collection and page state. `src/components/` contains the `Sidebar`, `Topbar`, `FindingsSection`, and `FindingDrawer` feature components, plus reusable `IconButton`, `Metric`, and `SeverityRow` UI components. `useMemo` derives the visible list from search, filter, and sort inputs; the selected record feeds the detail drawer. `updateStatus` is the single state update path for resolve/reopen and also updates the selected record. This is deliberately sized for a short exercise. If the application grew, I would move mock data behind a service hook and add routing and a tested API/cache layer.

## Technical decisions

- **React + JavaScript + Vite:** familiar frontend fundamentals, fast local iteration, and a small static production build without backend setup.
- **Local mock data:** the exercise explicitly permits mock data. Keeping it in the app makes the demo deterministic apart from the refresh error simulation and keeps focus on architecture and interaction.
- **Component boundaries:** `Metric`, `SeverityRow`, and `IconButton` show simple reuse while keeping the domain-specific dashboard composition readable.
- **State:** React state is sufficient for a single-page prototype. Search and filter values remain separate, explicit state; the displayed list is derived rather than copied into another state variable.
- **Styling:** plain CSS keeps layout and responsive behavior visible without adding a design-system dependency.
- **Charts:** a small CSS chart avoids a heavyweight chart package for a single compact visualization.
- **Icons:** Lucide React supplies consistent, lightweight interface icons.

## Accessibility and usability

Controls have accessible names, filters have labels, findings can be selected with a keyboard, feedback uses a live status region, focus has a visible style, and reduced-motion preferences are honored. Severity and status are shown with text as well as color. On small screens, navigation becomes a dismissible drawer and the data table remains readable through horizontal scrolling.

## Tests

Run `npm test` to execute the Vitest and Testing Library suite. It covers dashboard content after loading, severity filtering, the no-results state, and resolving a finding (including the updated row and summary count).

## Assumptions and tradeoffs

- The findings and activity chart are illustrative mock data, not live vulnerability intelligence. CVE links point to the public NVD record page; scores, affected assets, and remediation details in this demo are not authoritative security advice.
- The chart is a static illustration and the date-range control is presentational; historical series data is not modeled.
- Refresh simulates network latency and sometimes a recoverable failure to make loading/error states visible. It does not fetch a server.
- Search and filters run in memory. Pagination is a one-page shell because the dataset is intentionally small.
- A small number of controls expose lightweight “coming soon” feedback instead of implying that unimplemented screens exist.

## AI-assisted development

AI was used as a development collaborator to help turn the open-ended prompt into a narrow user/workflow, draft the initial React structure and mock data, and iterate on responsive layout and interaction details. I reviewed and adjusted the generated code, chose the scope and state model, and documented where the prototype is simulated. No live AI inference is used by the product. The remediation text is static demo content, not an AI-generated recommendation at runtime.

## Next steps with more time

1. Replace the mock source with a typed API boundary, loading cache, and real pagination.
2. Add unit tests for prioritization, filtering, export, and state transitions.
3. Make the activity visualization data-driven and clarify date-range behavior.
4. Add assignment, snooze, and remediation audit history with permission-aware actions.
5. Validate CVE metadata and remediation against a trusted source before presenting it as operational guidance.

## Notes

The interface name, company, people, assets, IP addresses, and records are fictional. The app requires no secrets or backend service.
=======
# patchday-triage
>>>>>>> 5a9f2cdcf85b4fbb3271e7db3b466a4553a321ba
