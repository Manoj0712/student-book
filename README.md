# E-Digital Books — MERN Mini System

A MERN-based tool for teachers to build e-digital book pages on a fixed A4
canvas (**Editor**), and for students to read them back on any device
(**Reader**). Both views live in one React + TypeScript app, split by route.

## Architecture

```
project-root/
├── client/     React + TypeScript + Tailwind + react-router-dom + react-grid-layout
└── server/     Node + Express + Mongoose (MongoDB)
```

**Why one client app instead of two separate apps?**
The Editor and Reader render the exact same widget JSON — splitting them into
two codebases would mean duplicating (and keeping in sync) every widget
renderer. Instead, both routes share a single `WidgetRenderer` component, so
what a teacher sees in **Preview** is guaranteed to match what a student sees
in the **Reader**, pixel for pixel, with zero duplicated rendering logic.

**Editor (`/editor`)**
- Fixed 800×1000px canvas, laid out with `react-grid-layout` in *grid-unit*
  mode (80 cols × 10px row height = 10px grid resolution). This drives
  drag-to-move, resize handles, and free-form (non-compacting) placement.
- Add/delete components from a toolbar (Text, Image, Video, Audio, 3D Object
  placeholder, Live Data placeholder).
- Click a component to open the **Properties panel** (right sidebar on
  desktop, bottom sheet on mobile) and edit its type-specific fields.
- **Bring to Front / Send to Back** buttons reorder a widget's position in
  the `widgets` array, which controls stacking order.
- **Preview** mode toggles off all editing chrome and renders through the
  same component the Reader uses — a true WYSIWYG check before saving.
- **Save / Update** posts the page JSON to `POST /api/books` (new page) or
  `PUT /api/books/:id` (editing a previously-opened page). An **Open**
  dropdown loads any saved page back into the Editor for revision.
- On narrow screens, the canvas is edited at 100% (grid math relies on real
  pixel dimensions — CSS-transform scaling would desync drag coordinates), with
  a 50%/75%/100% zoom control for overview vs. edit modes, and native pinch-zoom
  left enabled as a fallback.

**Reader (`/reader`)**
- **Load Book / JSON** control: a dropdown of books saved on the backend,
  *and* a raw JSON file upload — since the spec names both a saved-book
  loader and a JSON payload as the format.
- Renders each widget type using semantic HTML with inline styles, exactly
  per spec: Text → `<h1>/<h2>/<h3>/<p>`, Image → `<img>`, Video → `<video>`,
  Audio → `<audio>`.
- Fully responsive: rather than fetch fixed pixel positions, each widget's
  grid position/size is converted to **percentages** of the canvas, and the
  canvas itself is a fluid box with a CSS `aspect-ratio` matching the page's
  orientation. This means the exact same JSON renders correctly from a phone
  up to a desktop with no extra breakpoints or JS-measured resizing.

**Extending the spec's JSON schema.** The original spec's example JSON has no
positioning data. Since the Editor needs to persist *where* a teacher dragged
each widget, every widget gets an additional `layout: { x, y, w, h }` field
(in grid units) and a stable `id` (used as the React/grid-layout key). Any
hand-written JSON that omits these (like the spec's own example) is
auto-normalized with sane defaults on load, so the original example payload
still works unmodified.

## Backend (`server/`)

- `models/Book.js` — Mongoose schema matching the task's JSON shape, with
  `widgets[].props` stored as `Mixed` (each widget type has a different
  props shape) and `widgets[].layout` as an explicit sub-schema.
- `controllers/bookController.js` + `routes/bookRoutes.js` — full CRUD on
  `/api/books`.
- `server.js` — Express app, CORS enabled (client runs on a different port),
  JSON body parsing, centralized error handler.

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env      # set MONGO_URI if not using local default
npm run dev                # nodemon; or: npm start
```
Runs on `http://localhost:5000`. Requires a running MongoDB instance
(local, or a MongoDB Atlas connection string in `.env`).

### 2. Frontend
```bash
cd client
npm install
cp .env.example .env      # set VITE_API_URL if backend isn't on :5000
npm run dev
```
Runs on `http://localhost:5173`. Visit `/editor` to build a page, `/reader`
to read one back.

## npm packages used

**server/**: `express`, `mongoose`, `cors`, `dotenv`; `nodemon` (dev).

**client/**: `react`, `react-dom`, `react-router-dom` (routing between
Editor/Reader), `react-grid-layout` (drag/resize/reorder canvas — pinned to
the stable 1.x API; the 2.x line is an unrelated rewrite with a different
prop interface), `uuid` (stable widget ids); `typescript`, `tailwindcss`,
`vite` (build/dev).

## Bonus features implemented

- ✅ Preview mode in the Editor (reuses the Reader's exact rendering path)
- ✅ Toolbar buttons to reorder widgets (Bring to Front / Send to Back)
- ✅ Drag-and-drop *and* resize (not just move) via react-grid-layout
- ✅ Responsive Reader down to mobile width, with a live-updating "Live Data"
  placeholder widget as a taste of what a real data-bound widget would do
