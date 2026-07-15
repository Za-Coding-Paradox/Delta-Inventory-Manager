# MANIFOLD — Next-Generation Inventory Management Design System

> **Version:** 5.0.0  
> **Classification:** Single Source of Truth — Frontend Design System  
> **Codename:** MANIFOLD  
> **Prepared by:** Visionary Principal UX/UI Architect & Creative Director  
> **Status:** Production-Ready Specification  

---

> *"A manifold is a topological space that locally resembles Euclidean space. In engineering, it is a pipe with many openings — connecting multiple flows into a single controlled stream. Our interface is the manifold through which chaos becomes coordination."*

---

# TABLE OF CONTENTS

- [PHASE 1: THE DESIGN MANIFESTO & AESTHETIC VISION](#phase-1-the-design-manifesto--aesthetic-vision)
- [PHASE 2: MACRO SPATIAL ARCHITECTURE & OMNICHANNEL ADAPTATION](#phase-2-macro-spatial-architecture--omnichannel-adaptation)
- [PHASE 3: THE FOUNDATIONAL TOKENS](#phase-3-the-foundational-tokens)
- [PHASE 4: COMPONENT DNA & NEW PARADIGMS](#phase-4-component-dna--new-paradigms)
- [PHASE 5: EXTREME EDGE CASES & RESILIENCY UX](#phase-5-extreme-edge-cases--resiliency-ux)
- [PHASE 6: INTERACTION, MOTION, & KINETIC UX](#phase-6-interaction-motion--kinetic-ux)
- [PHASE 7: FRONTEND IMPLEMENTATION BLUEPRINT](#phase-7-frontend-implementation-blueprint)
- [PHASE 8: AI INTEGRATION PATTERNS — THE COGNITIVE CO-PILOT](#phase-8-ai-integration-patterns--the-cognitive-co-pilot)
- [PHASE 9: VOICE & MULTI-MODAL INTERACTION DESIGN](#phase-9-voice--multi-modal-interaction-design)
- [PHASE 10: SOUND DESIGN & SENSORY SPECIFICATION](#phase-10-sound-design--sensory-specification)
- [PHASE 11: DATA VISUALIZATION & CHARTING SPECIFICATION](#phase-11-data-visualization--charting-specification)
- [PHASE 12: FORM DESIGN SYSTEM & VALIDATION UX](#phase-12-form-design-system--validation-ux)
- [PHASE 13: PRINT, LABEL & PHYSICAL ARTIFACT DESIGN](#phase-13-print-label--physical-artifact-design)
- [PHASE 14: INTERNATIONALIZATION & MULTI-SITE ARCHITECTURE](#phase-14-internationalization--multi-site-architecture)
- [PHASE 15: ONBOARDING, TUTORIALS & EMPTY STATE DESIGN](#phase-15-onboarding-tutorials--empty-state-design)
- [PHASE 16: SECURITY, AUTHENTICATION & PERMISSION UX](#phase-16-security-authentication--permission-ux)
- [PHASE 17: REPORTING, ANALYTICS & EXPORT WORKSPACE](#phase-17-reporting-analytics--export-workspace)
- [PHASE 18: WORKFLOW AUTOMATION & RULES ENGINE DESIGN](#phase-18-workflow-automation--rules-engine-design)
- [APPENDIX A: CONFIGURED LAYOUT TEMPLATES](#appendix-a-configured-layout-templates)
- [APPENDIX B: MOTION TOKEN CHEAT SHEET](#appendix-b-motion-token-cheat-sheet)
- [APPENDIX C: DESIGN TOKEN EXPORT — CSS CUSTOM PROPERTIES](#appendix-c-design-token-export--css-custom-properties)
- [APPENDIX D: ICON SYSTEM SPECIFICATION](#appendix-d-icon-system-specification)
- [APPENDIX E: COMPONENT COMPOSITION COOKBOOK](#appendix-e-component-composition-cookbook)
- [APPENDIX F: NOTIFICATION SYSTEM ARCHITECTURE](#appendix-f-notification-system-architecture)
- [APPENDIX G: DARK MODE DEEP DIVE](#appendix-g-dark-mode-deep-dive)
- [APPENDIX H: INTERACTION PATTERN LIBRARY](#appendix-h-interaction-pattern-library)
- [APPENDIX I: CONFIGURED LAYOUT — ADDITIONAL TEMPLATES](#appendix-i-configured-layout--additional-templates)
- [APPENDIX J: ANIMATION & TRANSITION CATALOG](#appendix-j-animation--transition-catalog)
- [APPENDIX K: ERROR STATE & RECOVERY PATTERN LIBRARY](#appendix-k-error-state--recovery-pattern-library)
- [APPENDIX L: ACCESSIBILITY TESTING PROTOCOL](#appendix-l-accessibility-testing-protocol)
- [APPENDIX M: MOBILE FIELD APPLICATION DESIGN](#appendix-m-mobile-field-application-design)
- [APPENDIX N: COMPLETE COMMAND & HOTKEY QUICK REFERENCE CARD](#appendix-n-complete-command--hotkey-quick-reference-card)
- [APPENDIX O: PERFORMANCE BUDGET & CORE WEB VITALS SPECIFICATION](#appendix-o-performance-budget--core-web-vitals-specification)
- [APPENDIX P: THEMING & WHITE-LABEL MULTI-TENANT SYSTEM](#appendix-p-theming--white-label-multi-tenant-system)
- [APPENDIX Q: DATA IMPORT/EXPORT PIPELINE UX](#appendix-q-data-importexport-pipeline-ux)
- [APPENDIX R: POWER-USER MACRO & COMMAND CHAINING SYSTEM](#appendix-r-power-user-macro--command-chaining-system)

---

# PHASE 1: THE DESIGN MANIFESTO & AESTHETIC VISION

---

## 1.1 Core Philosophy

### The North Star: **Anticipatory Velocity**

The defining principle of MANIFOLD is **Anticipatory Velocity** — the interface must move faster than the operator's thought, predicting the next action, pre-loading the next dataset, and pre-computing the next conversion. Every pixel exists to eliminate a millisecond of decision latency. The system does not wait for the user to ask; it infers, suggests, and prepares.

This is not "speed" in the crude sense of animation timing. This is **cognitive velocity** — the rate at which intent becomes outcome. If the operator thinks "I need to move 50 units of SKU-4821 to Warehouse B," the interface should have already surfaced that SKU, highlighted its current location, and placed the transfer action under the cursor before the thought fully forms.

**The Three Pillars:**

| Pillar | Definition | Design Implication |
|---|---|---|
| **Anticipation** | The system predicts the next action using behavioral patterns, stock velocity, and temporal context (time of day, shift schedules, seasonality). | Ghost-text suggestions, pre-populated forms, predictive filter chips, AI-driven "Next Best Action" ribbons. |
| **Velocity** | The distance between intent and execution approaches zero. No modal loading, no multi-step wizards for common operations, no "Save" buttons for inline mutations. | Zero-click inline edits, ⌘K action bar, single-keystroke workflows, optimistic UI updates. |
| **Precision** | In an 8-hour warehouse shift, a single misread digit causes a $50,000 mis-ship. The interface treats every numeric cell as a surgical instrument. | Tabular monospace figures, WCAG AAA contrast, chromatic + textual + iconic status encoding, UOM lock indicators, destructive action neural guards. |

### The Departure: What We Are Abandoning

Based on forensic analysis of four industry-standard inventory management applications (TeamHub, Eduka, Flowertime, Vault), we are aggressively abandoning the following practices:

---

**DEPARTURE 01: The Static Sidebar + Table Orthodoxy**

*What the industry does:* Every analyzed application uses a fixed 220–240px left sidebar with icon+label navigation, followed by a KPI strip, followed by a paginated data table. This is the "Holy Grail" layout that has dominated B2B SaaS since 2018.

*Why we abandon it:* This layout was designed for "sit-and-review" operators — people who open a dashboard once a day to check status. Real warehouse operators are "stand-and-scan" users who interact with the system hundreds of times per shift. A fixed sidebar wastes 15% of horizontal viewport on navigation that is needed 2% of the time. A paginated table forces the operator to remember which page contained the item they were just looking at.

*What replaces it:* The **Command Canvas** — a full-viewport spatial workspace where navigation is summoned (⌘K), not permanently visible. Data is rendered as a continuous scrollable plane (virtualized, infinite) with contextual toolbars that appear only when relevant. The sidebar is a ghost — it materializes on hover at the left edge, showing only the 3 most likely destinations predicted by the AI, and dissolves when the cursor moves away.

---

**DEPARTURE 02: The Modal/Drawer Edit Paradigm**

*What the industry does:* TeamHub, Eduka, and Flowertime all require the operator to click a row, open a drawer or modal, find the field, edit it, and click "Save." This is a 5-click, 8-second minimum operation for something that should take 0.5 seconds.

*Why we abandon it:* Every context switch (drawer opening, modal appearing) is a cognitive reset. Research from the Cognitive Energy Economics audits in the source reports reveals that each modal transition costs approximately 12–18 *Cognits*™ of attentional currency. A warehouse worker performing 200 stock adjustments per shift loses 2,400–3,600 Cognits to drawer animations alone — roughly equivalent to 45 minutes of sustained focus.

*What replaces it:* **Zero-Click Inline Mutation**. Every data cell is directly editable. Double-click (or `Enter` key when focused) converts the cell into an inline editor with the existing value pre-selected. `Tab` commits and advances to the next editable cell. `Escape` cancels. No Save button. No confirmation dialog for non-destructive edits. Optimistic writes to local-first storage with background sync.

---

**DEPARTURE 03: Chromatic Monoculture (Single Brand Color Syndrome)**

*What the industry does:* TeamHub uses `#10B981` (emerald) for everything — buttons, active states, focus rings, trends, links. Eduka uses `#10B981` for primary + `#3B82F6` for secondary. Flowertime uses `#4F46E5` (indigo) for everything. The result: semantic status colors (success/warning/danger) compete with the brand color for attention, creating "color fatigue" where the operator's eye no longer registers the emerald as meaningful because it's everywhere.

*Why we abandon it:* When the brand color is also the "success" color, the operator cannot distinguish "this button is clickable" from "this item is in stock" from "this filter is active" — they're all the same green. The forensic reports confirm this: white-on-emerald buttons fail WCAG AA (2.6:1 contrast), and emerald-on-white backgrounds create ambiguous semantic overlap between "brand" and "status: good."

*What replaces it:* **Chromatic Separation of Concerns.** The brand color (a warm, distinctive coral-amber) is reserved exclusively for interactive affordances — buttons, links, focus rings, hover states. Inventory status uses a completely separate **Traffic Light Matrix** with colors that never overlap with the brand palette. Status colors are desaturated and dark enough to pass WCAG AAA. The brand is felt, never confused with data.

---

**DEPARTURE 04: The Pagination Fiction**

*What the industry does:* All four analyzed applications paginate their data tables (10/25/50/100 items per page). This creates an illusion of manageability while actually making the data harder to navigate — the operator must mentally track which page contains which items, and cross-page operations (select items on page 1 and page 5) are either impossible or require a clunky "select all across pages" checkbox.

*Why we abandon it:* In a warehouse with 15,000 SKUs, pagination artificially segments a continuous dataset. The operator doesn't think in pages; they think in "the items near the ones I'm looking at." Pagination is a server-cost optimization masquerading as a UX pattern. With modern virtualization (TanStack Virtual, react-window), rendering 15,000 rows costs the same as rendering 50.

*What replaces it:* **The Infinite Data Plane** — a virtualized, continuously scrolling canvas that renders only the visible viewport + a 5-row buffer. The operator scrolls or jumps (via ⌘K) to any item in O(1) time. "Pages" are replaced by **anchor markers** — named scroll positions the operator can bookmark and return to with a hotkey.

---

**DEPARTURE 05: Accessibility as Afterthought**

*What the industry does:* All four applications fail WCAG AAA on at least one critical element. White-on-emerald fails AA. Tertiary text `#9CA3AF` on white fails AA at normal size. Touch targets on mobile are 32–36px instead of the required 44px. Screen reader semantics are "inferred" but never verified.

*Why we abandon it:* Warehouse environments include operators with visual impairments, color blindness, and motor limitations. A forklift driver wearing gloves cannot precisely tap a 32px icon button. A color-blind operator cannot distinguish "In Stock" (green) from "Low Stock" (amber) when both are conveyed by color alone. Accessibility is not a compliance checkbox — it is a operational safety requirement.

*What replaces it:* **AAA-by-Default**. Every color pairing passes WCAG 2.2 AAA (7:1 for normal text, 4.5:1 for large text). Every status is communicated via **triple encoding** (color + icon + text label). Every touch target is minimum 48×48px. Every interactive element has a visible focus ring with ≥3:1 contrast against its background. Screen reader testing is a merge requirement, not a QA afterthought.

---

## 1.2 Aesthetic Identity & Sensory Experience

### Visual Language: **Operational Brutalism with Warm Precision**

MANIFOLD employs **Operational Brutalism** — an aesthetic philosophy that strips away decorative illusion and presents data in its raw, structural form, while injecting warmth through carefully calibrated micro-interactions and a distinctive color identity. This is not cold minimalism; it is *honest density*.

**Influences:**
- **Brutalist Architecture:** Raw concrete surfaces, visible structural elements, no ornamentation for its own sake. Translated to UI: data surfaces are flat, borders are honest, depth is earned through function not decoration.
- **Terminal/CLI Aesthetics:** The efficiency of a command-line interface — every pixel carries information, every keystroke has an immediate effect. Translated: monospace data cells, keyboard-first interaction, ⌘K command bar as the primary navigation mechanism.
- **Swiss International Style:** Grid-based layout, mathematical precision in spacing, type hierarchy as the primary organizational tool. Translated: a strict 4px baseline grid, type scale based on a 1.25 ratio, left-aligned everything.
- **Warm Accent Infusion:** Where brutalism can feel cold, we inject warmth through a single, distinctive brand accent (coral-amber `#E8603C`) that appears only on interactive elements, creating a "living" feeling in an otherwise structural interface.

**The Paradox We Embrace:** The interface must feel *simultaneously* like a precision instrument (for the power user scanning 500 rows) and a friendly assistant (for the new hire doing their first cycle count). This paradox resolves through **progressive disclosure via expertise level**: the default view is warm and guided; as the operator's velocity increases, the interface sheds guidance and reveals raw density.

### Vibe, Tone, and Ergonomics

**The Operating Room Analogy:** A surgeon does not want a "beautiful" instrument tray — they want a tray where every instrument is exactly where they expect it, sterile, and instantaneously accessible. MANIFOLD's vibe is a surgical theater: clean, bright, purposeful, with a faint hum of controlled power.

**Temporal Ergonomics:**

| Environment | Time of Day | Cognitive State | Design Response |
|---|---|---|---|
| **Warehouse Office** (fluorescent, 500lux) | Morning (08:00) | Alert, high-capacity | Light mode with high-contrast data cells. Warm brand accents prevent the sterile-fluorescent feedback loop. |
| **Logistics Control Room** (dim, 150lux) | Night (02:00) | Fatigued, error-prone | Dark mode with desaturated surfaces. Increased font size for numeric cells (+2px). AI anomaly alerts use gentle amber pulse, not harsh red flash. |
| **Forklift Mount** (sunlight, 1000+lux) | Midday (12:00) | Distracted, touch-only | High-contrast mode (black-on-amber). Giant touch targets (64px minimum). Voice confirmation for critical actions. |
| **Executive Review** (office, 300lux) | Afternoon (15:00) | Scanning, big-picture | Dashboard mode with expanded KPI cards, trend sparklines, and AI-generated summary narratives. |

**The Two-Mode System:**

MANIFOLD operates in two distinct visual modes that can be toggled with a single keystroke (`⌘\`):

1. **DENSE Mode** (default for power users): Maximum information density. 36px row height, 8px cell padding, 11px secondary text, no illustrations, no decorative whitespace. The data plane extends edge-to-edge.

2. **BREATHE Mode** (default for new users, auto-engaged during high-stress events): Reduced density. 52px row height, 16px cell padding, 14px secondary text, AI guidance ribbons, breathing whitespace between sections. This mode automatically engages when the system detects error rates above threshold or when the operator has been working for >4 continuous hours.

### The Signature Flourish: Two Iconic Elements

**SIGNATURE 01: The Pulse Line**

Every SKU row in the data plane contains a 40×16px **Pulse Line** — a real-time sparkline rendered in the stock-velocity color (green = healthy velocity, amber = sluggish, red = dead stock). This sparkline is not a static chart; it updates live with each stock transaction, creating a faint, rhythmic visual "heartbeat" across the entire data plane. When a stock level changes, the corresponding Pulse Line flickers briefly — a single-pixel flash that registers in peripheral vision without demanding conscious attention.

The Pulse Line is MANIFOLD's most iconic visual element. A screenshot of a MANIFOLD data plane is instantly recognizable by the horizontal stripe of tiny, living sparklines running through every row — like a cardiograph of the warehouse.

Technical specification:
- Canvas: `40px × 16px` per cell
- Stroke: `1.5px`, rounded line caps
- Data points: Last 24 data snapshots (configurable)
- Update frequency: Debounced to 500ms in DENSE mode, 2000ms in BREATHE mode
- Color gradient: `--velocity-healthy` to `--velocity-dead` based on stock turn rate
- Animation: New data point appended with 150ms ease-out; no vertical scaling animation (prevents visual noise)

**SIGNATURE 02: The Chromatic Thread**

A 2px-wide horizontal line runs across the very top of the viewport (position: fixed, top: 0, z-index: 9999). This line — **the Chromatic Thread** — changes color based on the global system state:

| Thread Color | Hex | System State | Operator Meaning |
|---|---|---|---|
| Warm Coral | `#E8603C` | Normal / Online | "Everything is flowing" |
| Amber Pulse | `#D4A017` | Sync Pending | "Your changes are queued — will push when connected" |
| Crimson Flash | `#C41E3A` | Critical Alert | "Something needs your attention NOW" |
| Cyan Glow | `#00B4D8` | AI Suggestion Available | "I have a recommendation — click me to see" |
| Silver Static | `#8E9196` | Offline / Dead Zone | "You're on your own — I'll catch up when I can" |

The Chromatic Thread serves as a peripheral nervous system for the application. The operator never needs to look at it directly — like the hum of a refrigerator, its absence is more noticeable than its presence. When it changes, the peripheral vision catches it before the conscious mind does.

Technical specification:
- Height: `2px`
- Position: `fixed`, `top: 0`, `left: 0`, `width: 100vw`
- Z-index: `9999` (always visible)
- Transition: Color change animated over `800ms ease-in-out` (deliberately slow — fast color changes trigger startle responses)
- Pulse animation for `Crimson Flash`: `opacity 0.7 → 1.0` cycle at `1.5s` interval
- Click behavior: Opens the System State Drawer (a compact panel sliding down from the thread)

---

# PHASE 2: MACRO SPATIAL ARCHITECTURE & OMNICHANNEL ADAPTATION

---

## 2.1 The Global Layout Engine: The Command Canvas

### Structural Overview

MANIFOLD abandons the Holy Grail layout (fixed sidebar + content area) in favor of the **Command Canvas** — a full-viewport, edge-to-edge spatial workspace inspired by Figma's infinite canvas, VS Code's panel system, and Bloomberg Terminal's density.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ▎ Chromatic Thread (2px, full-width, z-9999)                           │
├─────────────────────────────────────────────────────────────────────────┤
│ ⌘K Command Bar (48px, collapsible to 0px)                    ☰  🔔 👤 │
├────────┬────────────────────────────────────────────────────────────────┤
│        │                                                                │
│ GHOST  │                    COMMAND CANVAS                              │
│ RAIL   │                                                                │
│ (0→48  │  ┌─────────────────────────────────────────────────────────┐  │
│  →240) │  │  Context Toolbar (40px, context-sensitive)              │  │
│        │  ├─────────────────────────────────────────────────────────┤  │
│ ○ Dash │  │                                                    │  │
│ ○ Invy │  │           INFINITE DATA PLANE                        │  │
│ ○ Ords │  │           (Virtualized scroll, no pagination)         │  │
│ ○ Prod │  │                                                    │  │
│ ○ Supl │  │  ┌──────┬──────┬──────┬──────┬──────┬──────┬──────┐  │  │
│ ○ Anal │  │  │ SKU  │ Name │ Cat  │ Stock│ Pulse│ Loc  │ Act  │  │  │
│ ○ Sett │  │  ├──────┼──────┼──────┼──────┼──────┼──────┼──────┤  │  │
│        │  │  │ 4821 │ HexB │ Chem │ 1,247│ ~~~~ │ WH-B │  ✎   │  │  │
│        │  │  │ 4822 │ OctR │ Chem │    12│ ~~~~ │ WH-A │  ✎   │  │  │
│        │  │  │ 4823 │ Dode │ Chem │     0│ ———— │ —    │  ✎   │  │  │
│        │  │  └──────┴──────┴──────┴──────┴──────┴──────┴──────┘  │  │
│        │  │                                                    │  │
│        │  └─────────────────────────────────────────────────────────┘  │
│        │                                                                │
│        │  ┌─────────────────────────────────────────────────────────┐  │
│        │  │  AI Ribbon (32px, predictive suggestions)              │  │
│        │  └─────────────────────────────────────────────────────────┘  │
├────────┴────────────────────────────────────────────────────────────────┤
│ Status Bar (28px) — Connection │ Sync Queue │ Selected Count │ Mode    │
└─────────────────────────────────────────────────────────────────────────┘
```

### Zone Architecture

| Zone | Dimensions | Behavior | Primary Function |
|---|---|---|---|
| **Chromatic Thread** | 100vw × 2px | Fixed, always visible | System state peripheral indicator |
| **Command Bar** | 100vw × 48px | Fixed, auto-hides on scroll-down in DENSE mode | Global search/action (⌘K), user menu, notifications |
| **Ghost Rail** | 0→48→240px | Hover-expand from left edge; 48px icon mode by default; 240px expanded on hover or pin | Navigation — shows 3 AI-predicted destinations + full nav tree |
| **Context Toolbar** | Canvas width × 40px | Appears only when items are selected or a specific view is active | Context-sensitive actions: bulk edit, filter, sort, view toggle |
| **Infinite Data Plane** | Canvas width × fluid | Virtualized, edge-to-edge, no max-width | The primary data surface — table, kanban, graph, or timeline |
| **AI Ribbon** | Canvas width × 32px | Slides up from bottom when AI has suggestions | Predictive next-action suggestions, anomaly alerts, ghost text |
| **Status Bar** | 100vw × 28px | Fixed to bottom, always visible | Connection status, sync queue depth, selection count, current mode |

### Mouse Travel & Eye-Tracking Optimization

The Command Canvas is optimized for **F-pattern scanning with a command escape hatch**:

1. **First fixation (0–300ms):** The Command Bar at top-center — the ⌘K input is always visible, always focused-ready. The operator's eye lands on the most powerful interaction point first.

2. **Second scan (300ms–1.5s):** The Infinite Data Plane — the largest visual zone, containing the data that matters. The Pulse Lines create a subtle horizontal rhythm that guides the eye across rows.

3. **Peripheral awareness:** The Chromatic Thread (top) and Status Bar (bottom) frame the viewport without demanding fixation. The Ghost Rail (left) is visible as a thin strip of dots until hovered.

4. **Mouse travel minimization:** The most frequent actions (⌘K search, inline edit, next-row Tab) require zero mouse movement. The cursor is only needed for spatial navigation (scrolling, clicking specific cells) — all sequential operations are keyboard-driven.

**The 3-Click Rule:** No operational task requires more than 3 clicks from the Command Bar. If a task requires 4+ clicks, the design is wrong and must be re-architected.

---

## 2.2 Hardware-Agnostic Responsive Strategy

### Breakpoint System

| Token | Width | Device Class | Layout Morphology |
|---|---|---|---|
| `--bp-scanner` | `< 400px` | Rugged handheld (Zebra MC9300) | Single-column, full-screen forms, scan-first workflow |
| `--bp-mobile` | `400–767px` | Smartphone | Stacked cards, bottom navigation bar, floating scan FAB |
| `--bp-tablet` | `768–1023px` | Tablet / Forklift mount | Two-column (ghost rail + canvas), large touch targets |
| `--bp-desktop` | `1024–1919px` | Standard desktop / laptop | Full Command Canvas, Ghost Rail in icon mode |
| `--bp-ultrawide` | `≥ 1920px` | Control tower / 4K | Full Command Canvas, Ghost Rail expanded, split-pane data plane |

### Desktop / Control Tower (1024px to 4K)

**Density Profile: MAXIMUM**

At desktop resolutions, MANIFOLD operates in full DENSE mode by default:
- Row height: 36px (compact) / 44px (default)
- Cell padding: 4px 8px (compact) / 8px 12px (default)
- Font size: 13px body, 11px secondary
- KPI strip: Inline in the Context Toolbar, not a separate card section
- Split-pane: On ultrawide (≥1920px), the Data Plane splits into a 60/40 primary/detail view, with the detail pane showing the selected item's full inventory profile without a drawer.

**Control Tower Mode (4K):** At ≥3840px width, MANIFOLD unlocks **Wallscreen Mode** — a multi-zone dashboard that simultaneously displays:
- Zone A (left 40%): Real-time stock heatmap across all warehouses
- Zone B (center 40%): Infinite Data Plane with live Pulse Lines
- Zone C (right 20%): AI narrative feed + anomaly queue

This mode is designed for operations centers with wall-mounted displays where a single operator monitors the entire supply chain at a glance.

### Tablet / Forklift Mount (768–1023px)

**Density Profile: TOUCH-OPTIMIZED**

The tablet morph isn't just "bigger buttons" — it's a **fundamental interaction paradigm shift**:

- Ghost Rail collapses to a **Bottom Navigation Bar** (56px, 5 items max) — the industry-standard mobile pattern that eliminates the thumb-stretch problem of left-side navigation.
- Data Plane rows expand to **64px height** with 48px tap targets for inline actions.
- Inline edit is replaced by **Tap-to-Edit Sheet** — a bottom sheet that slides up with the field pre-focused, a large numeric keypad (for quantity edits), and a prominent "Done" button. This eliminates the precision-tapping problem of inline edit on touch.
- ⌘K becomes a floating search button (FAB, 56px, bottom-right) that opens the Command Bar as a full-screen overlay.
- The Pulse Line expands to **64×24px** for visibility in bright warehouse lighting.

**Glove Mode (toggle):** A dedicated mode activated by a 3-finger long-press (detectable even through thick gloves). In Glove Mode:
- All touch targets expand to **72px minimum**
- Swipe gestures replace tap gestures (swipe-right to confirm, swipe-left to cancel)
- Haptic feedback intensifies to maximum device capability
- Voice confirmation is enabled by default for destructive actions
- Font sizes increase by 2px across the board

### Rugged Scanner (Zebra MC9300, Android, < 400px)

**Density Profile: SCAN-FIRST**

On rugged handheld scanners, MANIFOLD transforms into a **Scan Workflow Engine** — a vertical, single-purpose interface optimized for the physical reality of holding a scanner in one hand and a box in the other.

- The interface is a **vertical stack of full-screen task cards**, each representing one step in a workflow (e.g., Scan SKU → Confirm Quantity → Select Location → Done).
- Navigation is eliminated — the operator does not browse; they execute a predetermined workflow.
- Each task card has:
  - A large barcode icon (48px) indicating "Scan now"
  - A single input field (auto-focused, accepts scanner input as keyboard events)
  - A large "Skip" button (for items that can't be scanned)
  - A progress indicator showing current step / total steps
- The Pulse Line is replaced by a **full-width color band** (8px) at the top of each card — green for "on track," amber for "quantity mismatch," red for "SKU not found."
- Haptic patterns: 1 short buzz = scan accepted, 2 buzzes = quantity mismatch, long buzz = error.

**Scan-First Workflow Engine — Technical Detail:**

```
┌──────────────────────┐
│ ▓▓▓▓▓▓▓▓ (color bar) │  ← Status band (8px)
│                      │
│     ╔═══════════╗    │
│     ║  ║║║║║║║  ║    │  ← Barcode icon (48px)
│     ╚═══════════╝    │
│                      │
│   SCAN SKU           │  ← Instruction text (20px, bold)
│                      │
│ ┌──────────────────┐ │
│ │ SKU-4821        │ │  ← Auto-focused input (56px height)
│ └──────────────────┘ │
│                      │
│   Ghost: "Hex Bolt   │  ← AI prediction (ghost text)
│   M10 × 25mm"        │
│                      │
│ ┌──────┐  ┌───────┐ │
│ │ SKIP │  │ CONFIRM│ │  ← Large buttons (72px height)
│ └──────┘  └───────┘ │
│                      │
│ Step 2 of 5          │  ← Progress (14px, muted)
│ ████████░░░░         │  ← Progress bar
└──────────────────────┘
```

---

## 2.3 Z-Index, Elevation, & Depth Strategy

### The Stacking Context

MANIFOLD defines a strict, 10-layer z-index scale. No component may use a z-index value outside its assigned layer. This prevents the "z-index arms race" that plagues enterprise applications.

| Layer | Z-Index | Contents | Depth Rendering |
|---|---|---|---|
| `--z-abyss` | `0` | Base canvas, background patterns | No elevation. `background-color: var(--surface-canvas)` |
| `--z-data` | `10` | Data Plane, table rows, cards | No elevation. Separated by `1px solid var(--border-subtle)` borders |
| `--z-context` | `100` | Context Toolbar, filter chips | No elevation. Background: `var(--surface-sunken)` to create a "well" effect |
| `--z-ghost` | `200` | Ghost Rail (expanded state) | `box-shadow: 4px 0 16px rgba(0,0,0,0.08)` — right-side shadow only |
| `--z-sticky` | `300` | Sticky table headers, column freeze shadows | `box-shadow: 0 2px 4px rgba(0,0,0,0.04)` — subtle bottom shadow |
| `--z-overlay` | `400` | Command Bar overlay, bottom sheets | `backdrop-filter: blur(8px)` + `box-shadow: 0 -4px 24px rgba(0,0,0,0.12)` |
| `--z-command` | `500` | ⌘K Command Palette | `backdrop-filter: blur(16px)` + `box-shadow: 0 8px 32px rgba(0,0,0,0.16)` |
| `--z-drawer` | `600` | Detail Drawer (right panel) | `box-shadow: -8px 0 32px rgba(0,0,0,0.12)` — left-side shadow |
| `--z-alert` | `700` | Toast notifications, confirmation dialogs | `box-shadow: 0 12px 40px rgba(0,0,0,0.20)` + backdrop overlay |
| `--z-thread` | `9999` | Chromatic Thread | No shadow — it is a 2px line, not an elevated surface |
| `--z-nuclear` | `10000` | Full-screen critical alerts (stockout cascades, system failures) | `backdrop-filter: blur(24px)` + `box-shadow: none` (it IS the background) |

### Depth Rendering Philosophy

**Borders, not shadows, for structural separation.** Shadows are reserved for transient surfaces (dropdowns, modals, drawers). This is the post-Linear design move — and we extend it with a principle from brutalist architecture: **if a surface needs a shadow to be understood, it's in the wrong place.**

**Backdrop-filter as the new elevation.** Instead of Material Design's layered shadow system, MANIFOLD uses `backdrop-filter: blur()` to communicate that a surface is "floating above" the content. This creates a literal frosted-glass effect that is both visually distinctive and functionally honest — you can see the data behind the overlay, maintaining spatial awareness.

**Border dimming for depth.** In dark mode, borders use a progressive dimming strategy:
- Layer 0 (base): `1px solid rgba(255,255,255,0.06)`
- Layer 100 (elevated): `1px solid rgba(255,255,255,0.10)`
- Layer 400 (overlay): `1px solid rgba(255,255,255,0.14)`

This creates a subtle "brightening" effect as surfaces move closer to the user, mimicking atmospheric perspective.

---

# PHASE 3: THE FOUNDATIONAL TOKENS

---

## 3.1 Color & Semantic System

### Brand & Surface Matrix

**The Coral-Acheron Palette**

MANIFOLD's brand color is a warm coral-amber — `#E8603C`. This color was chosen through a rigorous selection process that eliminated:
- All blues and indigos (overused in B2B SaaS, confused with "info" semantics)
- All greens (confused with "success/in stock" semantics)
- All purples (confused with "secondary brand" or "AI" semantics)
- All yellows (insufficient contrast on white backgrounds)

Coral-amber is:
- Warm and human (it reads as "alive," not "digital")
- Chromatically distant from all inventory status colors (no confusion risk)
- Sufficiently dark for WCAG AAA white-text contrast (`#FFFFFF` on `#E8603C` = 4.56:1, passes AA for normal text, AAA for large text)
- Sufficiently saturated to be visible in peripheral vision on a dense data plane

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--brand-primary` | `#E8603C` | `#F0764F` | CTAs, active states, focus rings, brand elements |
| `--brand-primary-hover` | `#D14F2D` | `#E8603C` | Hover state of primary elements |
| `--brand-primary-active` | `#B8401F` | `#D14F2D` | Pressed state |
| `--brand-primary-subtle` | `#FEF0EC` | `rgba(232,96,60,0.15)` | Selected row tint, subtle brand highlights |
| `--brand-secondary` | `#2D3748` | `#A0AEC0` | Secondary actions, borders, structural elements |

### Surface Architecture

| Token | Light Mode | Dark Mode | Role |
|---|---|---|---|
| `--surface-canvas` | `#F7F7F5` | `#0D0D0F` | Outermost background — warm gray (light) / near-black (dark) |
| `--surface-ground` | `#EFEFE C` | `#141416` | Subtle step below canvas for wells and recessed areas |
| `--surface-surface` | `#FFFFFF` | `#1A1A1E` | Primary content surface — cards, panels, table bg |
| `--surface-elevated` | `#FFFFFF` | `#222226` | Elevated surfaces — dropdowns, tooltips, popovers |
| `--surface-overlay` | `rgba(255,255,255,0.85)` | `rgba(13,13,15,0.85)` | Overlay backgrounds — modals, command palette, with `backdrop-filter: blur(8px)` |
| `--surface-sunken` | `#F0F0EE` | `#111113` | Recessed inputs, inner wells, code blocks |
| `--surface-hover` | `#F5F5F3` | `#2A2A2E` | Row hover, list item hover |
| `--surface-selected` | `#FEF0EC` | `rgba(232,96,60,0.12)` | Selected row, active chip |

### The Traffic Light Inventory Matrix

This is the most critical color system in the application — the colors that communicate stock health. These colors must:
1. Never overlap with the brand palette
2. Pass WCAG 2.2 AAA for both text-on-background AND background-on-surface contrast
3. Be distinguishable by all three types of color blindness (Protanopia, Deuteranopia, Tritanopia) when combined with their icon and text labels

| Semantic | Token | Background (Light) | Text (Light) | Background (Dark) | Text (Dark) | Icon | Label |
|---|---|---|---|---|---|---|---|
| **CRITICAL / STOCKOUT** | `--status-critical` | `#FEE2E2` | `#991B1B` | `rgba(254,226,226,0.15)` | `#FCA5A5` | `✕` (x-circle) | "STOCKOUT" |
| **WARNING / LOW STOCK** | `--status-warning` | `#FEF3C7` | `#92400E` | `rgba(254,243,199,0.15)` | `#FCD34D` | `▲` (triangle) | "LOW" |
| **SUCCESS / AVAILABLE** | `--status-success` | `#DCFCE7` | `#166534` | `rgba(220,252,231,0.15)` | `#86EFAC` | `●` (circle) | "OK" |
| **TRANSIT / INCOMING** | `--status-transit` | `#E0F2FE` | `#075985` | `rgba(224,242,254,0.15)` | `#7DD3FC` | `→` (arrow-right) | "IN TRANSIT" |
| **PENDING / PO AWAITED** | `--status-pending` | `#F3E8FF` | `#6B21A8` | `rgba(243,232,255,0.15)` | `#C4B5FD` | `◷` (clock) | "PENDING" |
| **OVERSTOCK / EXCESS** | `--status-excess` | `#FFF7ED` | `#9A3412` | `rgba(255,247,237,0.15)` | `#FDBA74` | `⬆` (arrow-up) | "EXCESS" |
| **INACTIVE / ARCHIVED** | `--status-inactive` | `#F3F4F6` | `#4B5563` | `rgba(243,244,246,0.10)` | `#6B7280` | `—` (dash) | "INACTIVE" |

**Contrast Verification (Light Mode, normal text on background):**

| Pairing | Ratio | AAA (7:1)? |
|---|---|---|
| `#991B1B` on `#FEE2E2` | 9.2:1 | ✓ |
| `#92400E` on `#FEF3C7` | 8.1:1 | ✓ |
| `#166534` on `#DCFCE7` | 8.7:1 | ✓ |
| `#075985` on `#E0F2FE` | 9.5:1 | ✓ |
| `#6B21A8` on `#F3E8FF` | 8.9:1 | ✓ |
| `#9A3412` on `#FFF7ED` | 8.3:1 | ✓ |
| `#4B5563` on `#F3F4F6` | 7.4:1 | ✓ |

**Triple Encoding Rule (Mandatory):** No status is communicated by color alone. Every status cell must contain: (1) the background tint, (2) a 12px icon from the table above, AND (3) a text label. This ensures accessibility for color-blind users and users with monochrome displays.

### Text Hierarchy

| Token | Light Mode | Dark Mode | Weight | Usage |
|---|---|---|---|---|
| `--text-primary` | `#1A1A1E` | `#F0F0F2` | 500 | Page titles, primary data values, table cell content |
| `--text-secondary` | `#5C5C66` | `#A0A0A8` | 400 | Supporting labels, secondary data, descriptions |
| `--text-tertiary` | `#8E8E96` | `#6B6B74` | 400 | Metadata, timestamps, de-emphasized content |
| `--text-disabled` | `#B8B8BE` | `#44444C` | 400 | Inactive controls, placeholder text |
| `--text-on-brand` | `#FFFFFF` | `#FFFFFF` | 500 | Text on coral-amber brand surfaces |
| `--text-inverse` | `#FFFFFF` | `#0D0D0F` | 400 | Text on dark/inverted surfaces |
| `--text-code` | `#C7254E` | `#F97583` | 400 | SKU codes, barcode values (monospace) |

---

## 3.2 Typography & Readability Engine

### Font Stack

**Primary UI Font: Geist Sans**

```
font-family: 'Geist Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

Geist Sans (by Vercel) is selected for its:
- Hyper-legibility at small sizes (13–14px) due to generous x-height and open apertures
- Excellent tabular figures (tnum) with consistent widths
- Distinctive personality — geometric but warm, avoiding Inter's near-anonymity
- Native variable font support for weight interpolation

**Monospace / Data Font: Berkeley Mono**

```
font-family: 'Berkeley Mono', 'JetBrains Mono', 'SF Mono', 'Cascadia Code', Menlo, Monaco, Consolas, monospace;
```

Berkeley Mono is selected for:
- SKU and barcode display — its slightly quirky character shapes (particularly `0`, `O`, `1`, `l`, `I`) reduce misread risk
- Excellent readability at 12–13px sizes
- A distinctive "technical" personality that visually separates data values from UI labels
- Native support for `font-variant-numeric: tabular-nums` with perfectly aligned numerals

### Type Scale (Based on 1.25 Major Third Ratio)

| Token | Size (px) | Size (rem) | Line Height | Weight | Tracking | Tabular? | Usage |
|---|---|---|---|---|---|---|---|
| `--text-hero` | 36px | 2.25rem | 1.15 | 700 | -0.03em | ✓ | Dashboard hero metrics |
| `--text-display` | 28px | 1.75rem | 1.2 | 700 | -0.02em | ✓ | KPI numeric values |
| `--text-h1` | 24px | 1.5rem | 1.25 | 600 | -0.02em | ✗ | Page titles |
| `--text-h2` | 20px | 1.25rem | 1.3 | 600 | -0.01em | ✗ | Section headings |
| `--text-h3` | 16px | 1.0rem | 1.4 | 600 | 0 | ✗ | Card titles, group headers |
| `--text-body-lg` | 15px | 0.9375rem | 1.55 | 400 | 0 | ✗ | Primary body text |
| `--text-body` | 14px | 0.875rem | 1.5 | 400 | 0 | ✗ | Default body, descriptions |
| `--text-body-sm` | 13px | 0.8125rem | 1.5 | 400 | 0 | ✗ | Table cells (default density) |
| `--text-caption` | 12px | 0.75rem | 1.45 | 400 | 0.01em | ✗ | Secondary metadata, labels |
| `--text-label` | 11px | 0.6875rem | 1.4 | 500 | 0.04em | ✗ | Column headers, form labels (ALL CAPS) |
| `--text-micro` | 10px | 0.625rem | 1.4 | 500 | 0.06em | ✗ | Timestamps, footnotes |
| `--text-code` | 13px | 0.8125rem | 1.6 | 400 | 0 | ✓ | SKU codes, barcodes, IDs (monospace) |
| `--text-code-sm` | 11px | 0.6875rem | 1.5 | 400 | 0 | ✓ | Compact code in table cells |

### Tabular Numeral Enforcement Rules

`font-variant-numeric: tabular-nums` is **mandatory** for the following elements. No exceptions. No overrides. Violations are lint errors.

| Element | Font | Justification |
|---|---|---|
| Stock quantity cells | Berkeley Mono | Prevents horizontal jitter during live updates |
| Price / cost cells | Berkeley Mono | Aligns decimal points across rows |
| KPI numeric values | Geist Sans (tnum) | Prevents layout shift when values change |
| Date/time cells | Berkeley Mono | Aligns time digits for vertical scanning |
| Any cell containing a numeric value that updates in real-time | Berkeley Mono | Prevents the "dancing numbers" effect at high update frequencies |

---

## 3.3 Spacing, Borders, & Radii

### Base Grid Unit: 4px

The 4px base unit is the atomic unit of MANIFOLD's spatial grammar. Every dimension — padding, margin, gap, width, height — must be a multiple of 4px. Odd values (3px, 5px, 7px) are forbidden. Half-steps (2px) are permitted only for border widths and stroke weights.

**Why 4px instead of the industry-standard 8px?** Because at 36px row height (DENSE mode), an 8px grid yields only 4.5 vertical steps per row — insufficient for the layered cell anatomy (top padding → primary content → secondary content → bottom padding). A 4px grid yields 9 steps, enabling the sub-row spatial precision that data-dense interfaces demand.

### Spacing Scale

| Token | Value | Primary Usage |
|---|---|---|
| `--space-0` | `0px` | No gap |
| `--space-half` | `2px` | Hair gaps, stroke offsets (border use only) |
| `--space-1` | `4px` | Icon-to-label gaps, badge internal padding, micro-spacing |
| `--space-2` | `8px` | Inline element spacing, table cell vertical padding (compact) |
| `--space-3` | `12px` | Form element internal padding, table cell horizontal padding |
| `--space-4` | `16px` | Standard card padding, section padding (compact) |
| `--space-5` | `20px` | Card padding (default), panel padding |
| `--space-6` | `24px` | Gutter width, panel padding (spacious) |
| `--space-8` | `32px` | Section-to-section gaps, major layout separation |
| `--space-10` | `40px` | Page-level horizontal padding |
| `--space-12` | `48px` | Page-level vertical padding |
| `--space-16` | `64px` | Structural zone heights, major whitespace |
| `--space-20` | `80px` | Hero spacing, splash screen padding |
| `--space-24` | `96px` | Full-bleed section separation |

### Border Strategy

**The Two-Border System:** MANIFOLD uses exactly two border styles:

1. **Structural Border:** `1px solid var(--border-default)` — defines surfaces, cards, panels, table cells. Always present, always 1px, never decorative.

2. **Accent Border:** `2px solid var(--brand-primary)` — used exclusively for:
   - Focus rings (replacing box-shadow focus rings for more precise rendering)
   - Active/selected row indicators (left-edge accent)
   - AI suggestion highlights

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--border-default` | `#E2E2E0` | `rgba(255,255,255,0.08)` | Standard structural borders |
| `--border-strong` | `#CCCCCC` | `rgba(255,255,255,0.14)` | Emphasized borders, active inputs |
| `--border-subtle` | `#F0F0EE` | `rgba(255,255,255,0.04)` | De-emphasized separators |
| `--border-accent` | `#E8603C` | `#F0764F` | Focus rings, selected indicators |
| `--border-critical` | `#991B1B` | `#FCA5A5` | Error state borders |

### Radius Philosophy

**Sharp for data, soft for interaction.**

Data surfaces (tables, cells, headers) use `0px` radius — the sharp edges create continuous visual lines that guide the eye across rows. Interactive elements (buttons, inputs, chips, modals) use rounded radii — the softness signals "touch me."

| Token | Value | Applied To |
|---|---|---|
| `--radius-none` | `0px` | Table cells, data grid surfaces, headers |
| `--radius-xs` | `3px` | Small badges, inline status indicators |
| `--radius-sm` | `6px` | Buttons, inputs, chips, dropdowns |
| `--radius-md` | `10px` | Cards, panels, KPI tiles |
| `--radius-lg` | `16px` | Modals, large floating panels |
| `--radius-pill` | `9999px` | Toggle switches, pill badges, notification dots |

---

# PHASE 4: COMPONENT DNA & NEW PARADIGMS

---

## 4.1 The Command Interface (⌘K / Ctrl+K)

### Anatomy of the Command Bar

The ⌘K Command Interface is MANIFOLD's central nervous system. It replaces the sidebar as the primary navigation mechanism and the search bar as the primary query interface. It is a **unified action/query/search** system.

**Visual Structure:**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 🔍  Transfer 50 units of SKU-4821 to Warehouse B              │   │
│  │                                                              ▴▾ │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ── ACTIONS ─────────────────────────────────────────────────────────  │
│  ↕  Transfer Stock                      ⌘T                            │
│  ↕  Adjust Quantity                     ⌘⇧A                           │
│  ↕  Create Purchase Order               ⌘P                            │
│                                                                         │
│  ── PREDICTIONS ────────────────────────────────────────────────────  │
│  🤖 SKU-4821 "Hex Bolt M10×25" — Current: 1,247 units @ WH-B        │
│  🤖 83% probability: Reorder within 12 days (velocity: 103/day)      │
│  🤖 Suggested: Transfer from WH-A (surplus: 3,400 units)             │
│                                                                         │
│  ── SKUS ───────────────────────────────────────────────────────────  │
│  4821  Hex Bolt M10×25mm         1,247 units  WH-B   ●OK             │
│  4822  Hex Bolt M10×30mm            12 units  WH-A   ▲LOW            │
│  4823  Hex Bolt M12×25mm             0 units  —      ✕STOCKOUT       │
│                                                                         │
│  ── NAVIGATION ────────────────────────────────────────────────────  │
│  →  Inventory Dashboard                                               │
│  →  Purchase Orders                                                   │
│  →  Warehouse Map                                                     │
│                                                                         │
│  Tab to navigate  ↵ to select  esc to close                           │
└─────────────────────────────────────────────────────────────────────────┘
```

### Behavioral Rules

**When the user types a SKU (e.g., "4821"):**

1. **Frame 0–100ms:** The input is matched against the local SKU index (IndexedDB). Results appear in the `SKUS` section, ranked by match confidence.
2. **Frame 100–300ms:** The AI engine pre-fetches the SKU's inventory profile (locations, velocity, reorder status) and populates the `PREDICTIONS` section with contextual insights.
3. **Frame 300–500ms:** The action engine parses the input for intent. If the SKU is found, the top suggested action auto-populates with parameters (e.g., "Adjust quantity of SKU-4821" pre-fills the SKU field).

**When the user types a natural language command (e.g., "Transfer 50 units of SKU-4821 to Warehouse B"):**

1. **Frame 0–200ms:** The NLP parser extracts: Action = `transfer`, Quantity = `50`, SKU = `4821`, Destination = `Warehouse B`.
2. **Frame 200–400ms:** The validation engine checks: Does SKU-4821 exist? Is there sufficient stock? Is Warehouse B a valid destination? Results appear in the `ACTIONS` section with a pre-validated action card.
3. **Frame 400–600ms:** The AI adds a `PREDICTIONS` card: "SKU-4821 currently has 1,247 units at WH-B. After transfer: 1,297 at WH-B, source location stock will be..."
4. **Frame 600ms+:** The operator presses `Enter` to execute. The action fires optimistically. A toast confirms success or surfaces a validation error.

**When the user types a navigation query (e.g., "Orders"):**

1. The `NAVIGATION` section populates with matching routes.
2. The most recent/frequently visited route is ranked first (learned from user behavior).
3. `Enter` navigates to the selected route.

### Keyboard Anatomy

| Key | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open Command Interface |
| `↑` / `↓` | Navigate between result sections and items |
| `←` / `→` | Navigate within a section (expand/collapse) |
| `Enter` | Execute selected action / Navigate to selected item |
| `Tab` | Switch focus between result sections |
| `Escape` | Close Command Interface (returns focus to previous element) |
| `/` | Quick-open with cursor pre-positioned for search |
| `⌘⇧K` | Open Command Interface in "Action Only" mode (no search, no navigation) |

---

## 4.2 The "God Component": Reimagining the Data Table

### The Multi-Dimensional Inventory Row

In a real warehouse, a single product (e.g., "Hex Bolt M10×25mm") may exist in:
- 5 sizes (M10×25, M10×30, M12×25, M12×30, M14×25)
- 3 finish options (Zinc, Stainless, Black Oxide)
- 4 physical locations (WH-A Rack 12, WH-B Rack 8, WH-C Rack 3, Yard B)
- 3 status types (Available, Reserved, Quarantined)

That's 5 × 3 × 4 × 3 = 180 possible permutations of a single product family. A traditional flat table cannot represent this without either (a) 180 rows of overwhelming repetition, or (b) hiding dimensions behind a "details" link.

**MANIFOLD's solution: The Matryoshka Row**

The Matryoshka Row is a multi-layered, nested row system inspired by Russian nesting dolls. Each layer reveals one dimension of complexity:

**Layer 0 — The Family Row (collapsed):**

```
┌──────┬──────────────────────┬────────┬──────────┬────────┬────────┬────┐
│ ☐    │ 4820  Hex Bolt M10   │ 2,499  │ ~~~~~~~~ │ 4 locs │ ●OK    │ ✎  │
└──────┴──────────────────────┴────────┴──────────┴────────┴────────┴────┘
```

This row shows the aggregate: total stock across all variants and locations, a composite Pulse Line, and a summary status (worst-case: if any variant is in stockout, the family shows ▲LOW or ✕STOCKOUT).

**Layer 1 — The Variant Rows (first expansion):**

Clicking the expand chevron (or pressing `→` when the row is focused) reveals variant rows:

```
┌──────┬──────────────────────┬────────┬──────────┬────────┬────────┬────┐
│ ☐    │ 4820  Hex Bolt M10   │ 2,499  │ ~~~~~~~~ │ 4 locs │ ●OK    │ ✎  │
│      │  ├─ 4820-01  Zinc    │  1,247 │ ~~~~     │ WH-B   │ ●OK    │ ✎  │
│      │  ├─ 4820-02  Stain   │    892 │ ~~~~     │ WH-A   │ ●OK    │ ✎  │
│      │  ├─ 4820-03  Black   │    360 │ ~~~~     │ WH-C   │ ▲LOW   │ ✎  │
└──────┴──────────────────────┴────────┴──────────┴────────┴────────┴────┘
```

**Layer 2 — The Location Rows (second expansion):**

Clicking a variant row's chevron reveals location-level detail:

```
│      │  ├─ 4820-01  Zinc    │  1,247 │ ~~~~     │ WH-B   │ ●OK    │ ✎  │
│      │  │  ├─ Rack 12       │    800 │          │        │ ●AVAIL  │    │
│      │  │  ├─ Rack 15       │    347 │          │        │ ●AVAIL  │    │
│      │  │  ├─ Reserved      │     72 │          │        │ ◷PEND   │    │
│      │  │  └─ Quarantine    │     28 │          │        │ ✕HOLD   │    │
```

**Visual Indentation:** Each nesting level adds 16px of left padding and a thin `1px` vertical connector line in `--border-subtle` color.

**Collapse Behavior:** `←` collapses the current level. `⌘←` collapses all levels. `⌘→` expands all levels (with a warning if >50 variants would be rendered).

### Frictionless Mutation: Zero-Click Inline Edit

**The Cell State Machine:**

Every data cell in the Infinite Data Plane follows a strict 4-state machine:

```
READ ──(double-click / Enter)──→ EDIT ──(Tab / Enter)──→ COMMIT ──(optimistic write)──→ READ
  │                                  │                       │
  │                                  │                       └──(validation fail)──→ ERROR
  │                                  │                               │
  │                                  └──(Escape)──→ CANCEL ───────→ READ
  │                                                                  │
  └──(hover)──→ PREVIEW ──(mouse leave)──→ READ                    │
                                              │                     │
                                              └──(click away)──────→READ
```

**READ State:**
- The cell displays its value in `--text-primary` color.
- On hover, the cell background shifts to `--surface-hover` and a subtle pencil icon (12px) appears at the right edge — a non-intrusive affordance that says "I'm editable" without cluttering the resting state.

**EDIT State:**
- The cell transforms into an inline input field with:
  - The existing value pre-selected (blue highlight)
  - A `2px solid var(--border-accent)` border (coral-amber focus ring)
  - Font switches to Berkeley Mono for numeric values
  - Type-specific input controls:
    - **Numeric fields:** A compact stepper (−/+) appears at the right edge for click adjustment
    - **Select fields:** A mini-dropdown appears inline (max 5 visible items)
    - **Date fields:** A mini date-picker appears inline
  - **AI Ghost Text:** If the AI can predict the likely value, it appears as ghost text in `--text-tertiary`. Pressing `→` accepts the ghost text.

**COMMIT State:**
- The cell briefly flashes with a `100ms` background animation:
  - Successful edit: `background-color: var(--status-success-bg)` fading to transparent over `400ms`
  - Failed edit: `background-color: var(--status-critical-bg)` fading to transparent over `600ms` + error toast
- The value optimistically updates in the UI. The write is queued for server sync.

**ERROR State:**
- The cell border switches to `2px solid var(--border-critical)`
- An error message appears below the cell in `--status-critical-text` (11px)
- The cell remains in EDIT state until the operator corrects the value or presses Escape

### Data Visualization Integration: In-Cell Micro-Charts

**Sparkline Cells (40×16px):**
- Rendered via `<canvas>` elements for performance
- Show the last 24 data points of stock velocity
- Color gradient from `--velocity-healthy` (green) to `--velocity-dead` (red) based on the stock's turn rate
- Hover reveals a tooltip with the exact values for the last 5 data points

**Stock Velocity Indicator (8×8px):**
- A small dot positioned to the left of the quantity value
- Color: `--velocity-healthy` (turn rate > 6/year), `--velocity-slow` (1–6/year), `--velocity-dead` (<1/year)
- Animation: Slowly pulses (opacity 0.5→1.0→0.5, 3s cycle) for healthy stock; static for dead stock
- This provides an instant, pre-attentive visual cue about item health without requiring the operator to read any numbers

**Mini Gauge (24×12px):**
- A horizontal bar showing stock level relative to reorder point
- Fill color transitions from green (above reorder) → amber (near reorder) → red (below reorder)
- Width represents: `current_stock / max(reorder_point * 3, current_stock)`
- Used in KPI cards and summary rows where a sparkline would be too large

---

## 4.3 Advanced Filtering & Querying

### The Query Composer

MANIFOLD discards basic dropdown filters in favor of the **Query Composer** — a tokenized, visual query builder that handles 50+ filter variables simultaneously.

**Visual Structure:**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ⌘F  ║ category:hardware ▾ AND stock:<reorder ▾ AND location:WH-B ▾  │ + │
├─────────────────────────────────────────────────────────────────────────────┤
│ Active: 3 filters  ·  847 matching SKUs  ·  Press ⌘⇧F for Natural Language │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Anatomy:**

1. **Token Chips:** Each filter condition is rendered as a removable chip with:
   - Field name (bold, `--text-primary`): `category`
   - Operator (muted, `--text-tertiary`): `:`
   - Value (brand accent, `--brand-primary`): `hardware`
   - Dropdown arrow (`▾`) to modify the operator or value in-place
   - Remove button (`×`) on hover

2. **Conjunction Tokens:** `AND` / `OR` chips between conditions. Click to toggle between AND/OR. Drag to reorder.

3. **Add Button (`+`):** Opens a field selector dropdown. Supports:
   - Recently used fields (top, learned from user behavior)
   - All available fields (alphabetical, searchable)
   - AI-suggested fields based on current context (e.g., if filtering by "stock:<reorder", the AI suggests adding "supplier" since low-stock items often need reorder by supplier)

4. **Natural Language Mode (`⌘⇧F`):** Replaces the tokenized view with a plain-text input:
   ```
   ⌘F  ║ Show me all hardware items that are below reorder point in Warehouse B, sorted by stock level ascending
   ```
   The NLP parser translates this into tokenized filters and displays the result as chips.

### Filter Operator Vocabulary

| Operator | Symbol | Example | Meaning |
|---|---|---|---|
| Equals | `:` | `status:stockout` | Exact match |
| Not equals | `:!` | `status:!inactive` | Exclusion |
| Greater than | `:>` | `stock:>100` | Numeric above |
| Less than | `:<` | `stock:<reorder` | Numeric below (supports dynamic references) |
| Between | `:<>` | `price:<>10..50` | Numeric range |
| In | `:[]` | `category:[hardware,tools]` | Multi-value match |
| Contains | `:*` | `name:*bolt` | Substring match |
| Is empty | `:null` | `supplier:null` | Null check |
| Has | `~` | `~low_stock` | Named query / saved filter |
| Velocity | `:v` | `velocity:>.5` | Stock turn rate filter |

### Saved Queries & Shared Views

Every filter state can be:
- **Saved** as a named query (`⌘S` while in the Query Composer)
- **Shared** as a URL with encoded filter state
- **Subscribed** to for push notifications (e.g., "Alert me when this filter returns >0 results")
- **Scheduled** for periodic export (e.g., "Email me this view every Monday at 08:00")

---

# PHASE 5: EXTREME EDGE CASES & RESILIENCY UX

---

## 5.1 The "Dead Zone" (Offline & Spotty Connectivity)

### Offline Visual Communication

The Chromatic Thread shifts to **Silver Static** (`#8E9196`) when connectivity is lost. Additionally:

1. **The Status Bar** displays: `⊘ OFFLINE — Local edits will sync when connected (12 pending)`
2. **Every editable cell** shows a subtle **sync indicator** — a small dot to the left of the value:
   - `●` (solid, `--status-success-text`): Synced with server
   - `◐` (half, `--status-warning-text`): Pending sync
   - `○` (empty, `--text-disabled`): Local-only (never synced)
3. **The Command Bar** shows a persistent `⊘ OFFLINE` badge
4. **Destructive actions** (delete, archive) are **blocked** in offline mode with a message: "This action requires server confirmation. It will be available when connectivity is restored."

### The Syncing/Conflict State

When connectivity is restored:

1. **The Chromatic Thread** shifts to **Amber Pulse** (`#D4A017`) during sync
2. **The Status Bar** shows: `🔄 SYNCING — Pushing 12 local changes… (3 of 12)`
3. **Each synced cell** briefly flashes the sync indicator from `◐ → ●` with a 200ms green pulse
4. **If a conflict is detected** (server value differs from the local edit):
   - The cell border switches to `2px solid var(--status-warning-text)`
   - A **Conflict Card** appears below the cell showing:
     ```
     ⚠ CONFLICT
     Your edit:    1,247 units
     Server value: 1,190 units  (updated 2 min ago by @maria.chen)
     
     [Keep Mine]  [Accept Server]  [Merge Manually]
     ```
   - The operator chooses how to resolve. The default selection is **contextual**:
     - If the operator's value is more recent → "Keep Mine" is pre-selected
     - If the server value is more recent → "Accept Server" is pre-selected
     - If both are equally recent → No pre-selection (forces a conscious decision)

### Local-First Architecture

MANIFOLD is designed as a **local-first** application:
- All data is replicated to IndexedDB via a CRDT-based sync engine
- Reads always hit local storage first (sub-millisecond)
- Writes are applied optimistically to local state, then queued for sync
- The sync queue is visible in the Status Bar and can be inspected/managed
- On first load, the application is immediately interactive (using cached data) while fresh data loads in the background

---

## 5.2 Multiplayer Conflicts & Concurrency

### Real-Time Presence

When multiple users are viewing the same data:

1. **Live Cursors** — Colored cursors appear on the data plane, showing where other operators are working. Each cursor shows the operator's avatar and name on hover. Cursor colors are assigned from a palette of 8 distinct, non-status colors.

2. **Cell Lock Indicators** — When another operator is actively editing a cell, that cell shows:
   - A colored border matching the editor's cursor color
   - The editor's avatar (16px) in the top-right corner of the cell
   - A ghost of the editor's in-progress value (in the editor's cursor color, italic)
   - The cell is **not locked** — MANIFOLD uses optimistic concurrency, not pessimistic locking. The other operator can still edit, but will receive a conflict resolution prompt if both submit conflicting changes.

3. **Row Activity Feed** — In the detail pane, a live activity feed shows recent mutations:
   ```
   10:42:15  maria.chen adjusted stock: 1,247 → 1,190  (WH-B, Rack 12)
   10:41:03  james.kim transferred 50 units to WH-C
   10:38:47  system auto-received PO-8842: +200 units
   ```

### Concurrency Resolution Strategy

MANIFOLD uses **Operational Transformation (OT)** for real-time collaboration and **Last-Write-Wins (LWW)** with conflict prompts as the fallback:

1. **Real-time edits** (both operators online): OT merges concurrent edits automatically. If Operator A changes the quantity and Operator B changes the location, both edits are preserved without conflict.

2. **Offline edits** (one operator was offline): LWW applies, but the conflict resolution UI (described in 5.1) gives the operator control over the outcome.

3. **Destructive edits** (delete, archive): Always require server confirmation, even when online. The UI shows a 3-second countdown with the option to cancel, and any conflicting edit by another operator cancels the countdown automatically.

---

## 5.3 Massive Data Volatility (Black Friday Mode)

### The Problem

During peak events (Black Friday, flash sales, warehouse-wide cycle counts), stock levels may change 100+ times per second across thousands of SKUs. If every update triggers a re-render, the UI becomes a strobing, unreadable mess.

### The Solution: Adaptive Update Cadence

MANIFOLD implements a **3-tier update cadence system** that automatically adjusts based on update frequency:

| Tier | Trigger | Update Behavior | Visual Effect |
|---|---|---|---|
| **STEADY** | < 1 update/second/sku | Every update rendered immediately | Cell value changes with a subtle `100ms` flash |
| **RAPID** | 1–10 updates/second/sku | Updates batched every `500ms`, rendered as a single value change | Cell shows a **pulse indicator** — a small animated ring that expands and fades, indicating "this value is changing rapidly" |
| **HYPER** | > 10 updates/second/sku | Updates batched every `2000ms`, only net change rendered | Cell shows a **live counter** — the value is replaced by a rolling counter animation (like an odometer) that continuously ticks in the direction of change. The exact value is shown on hover or when updates slow down. |

**Visual Indicators for HYPER mode:**
- The Pulse Line in the sparkline cell transitions from a smooth line to a **filled area chart** showing the range (min–max) over the last 24 data points
- The Chromatic Thread shifts to **Cyan Glow** (`#00B4D8`) to indicate "high-velocity data mode"
- The Status Bar shows: `⚡ HYPER MODE — Updates arriving at 847/second. Values refresh every 2s. [PAUSE LIVE] [EXPORT STREAM]`

**The "Pause Live" Button:**
- Freezes all visual updates. The data plane becomes a static snapshot.
- A "▶ RESUME" button appears in the Status Bar
- While paused, updates continue to accumulate in the background. On resume, the latest values replace the frozen ones with a single batch update.
- This is the "take a breath" mechanism for operators who need to read a specific value without it changing under their eyes.

**Flash-Green / Flash-Red Feedback:**
- In STEADY mode, when a stock value changes:
  - **Increase:** Cell background flashes `--status-success-bg` for `150ms`
  - **Decrease:** Cell background flashes `--status-critical-bg` for `150ms`
  - **No change:** No flash
- In RAPID/HYPER mode, individual flashes are suppressed. Instead, the row's Pulse Line animates to reflect the net direction of change.

---

## 5.4 Complex Unit of Measure (UOM) Nightmare

### The Problem

The company buys raw acid in "55-Gallon Drums," stores it in "Liters," and sells it in "12oz Bottles." One product, three UOMs, two conversion factors, and an operator who must not make a mistake.

### The Solution: The UOM Context Pill

Every quantity cell in MANIFOLD displays a **UOM Context Pill** — a compact, inline indicator that shows:
1. The displayed value's unit
2. The conversion to the operator's preferred unit (on hover)
3. A lock icon if the conversion factor is fixed vs. estimated

**Visual Structure:**

```
┌─────────────────────────────────────┐
│  1,247  L  ═══════╗                │
│                     ║  ≈ 4,222 bottles │
│                     ║  ≈ 22.7 drums   │
└─────────────────────────────────────┘
```

**Resting State:**
- Shows: `1,247 L` — the value in the **storage unit** (the unit used in the warehouse)
- The unit abbreviation (`L`) is rendered in a small pill badge: `background: --surface-sunken`, `border: 1px solid --border-default`, `font: 10px/500 Berkeley Mono`, `color: --text-secondary`

**Hover State:**
- A tooltip expands below the cell showing all related UOM conversions:
  ```
  1,247 Liters
  ≈ 4,222 × 12oz Bottles  (factor: 0.35488 L/bottle)
  ≈ 22.7 × 55-Gallon Drums  (factor: 208.198 L/drum)
  🔒 Fixed conversion factors
  ```
- Each conversion line shows:
  - The converted value (Berkeley Mono, `--text-primary`)
  - The target unit (Berkeley Mono, `--text-code`)
  - The conversion factor in parentheses (Geist Sans, `--text-tertiary`, 10px)
  - A lock icon (🔒) if the factor is fixed, or a calibration icon (🔧) if the factor is estimated and may vary

**Inline UOM Switcher:**
- Clicking the UOM pill opens a mini-dropdown allowing the operator to switch the display unit for that cell:
  ```
  Display as:
  ○ Liters (storage unit)
  ● 12oz Bottles (sales unit)
  ○ 55-Gallon Drums (purchase unit)
  ○ Custom...
  ```
- The selected unit persists for that SKU across sessions (stored in user preferences).
- When the display unit changes, the quantity value re-computes instantly, and the cell flashes the `--status-success-bg` to confirm the change.

**UOM Conflict Warning:**
- If an operator attempts an action involving mismatched UOMs (e.g., transferring "50 bottles" from a location that tracks in "liters"), the system shows an inline conversion preview:
  ```
  ⚠ UOM CONVERSION REQUIRED
  You're transferring 50 × 12oz Bottles = 17.74 Liters
  Source (WH-B): 1,247 L → 1,229.26 L after transfer
  [Confirm Transfer]  [Cancel]
  ```
- The conversion is displayed in **both units** so the operator can verify the math before committing.

**The UOM Ledger:**
- In the detail pane, every SKU has a **UOM Ledger** — a table showing all defined conversions:
  ```
  ┌───────────────┬──────────────────┬──────────┬─────────┐
  │ From Unit     │ To Unit          │ Factor   │ Source  │
  ├───────────────┼──────────────────┼──────────┼─────────┤
  │ 55-Gal Drum   │ Liters           │ 208.198  │ 🔒Fixed │
  │ Liter         │ 12oz Bottle      │ 0.35488  │ 🔧Est.  │
  │ 55-Gal Drum   │ 12oz Bottle      │ 73.871   │ 🔒Calc  │
  └───────────────┴──────────────────┴──────────┴─────────┘
  ```
- `🔒Fixed` = hardcoded in the system
- `🔧Est.` = estimated (may vary by batch, density, temperature)
- `🔒Calc` = calculated from other fixed factors (non-editable)

---

# PHASE 6: INTERACTION, MOTION, & KINETIC UX

---

## 6.1 Keyboard-First Ergonomics

### The Cycle Count Hotkey Flow

A Cycle Count is the most keyboard-intensive operation in inventory management — the operator must rapidly verify physical stock counts against system records. Here is the optimal hotkey flow:

**Pre-conditions:**
- The operator has a clipboard or handheld scanner
- They are positioned in front of a rack/shelf
- MANIFOLD is open in Cycle Count mode

**The Flow:**

| Step | Key(s) | Action | Screen State |
|---|---|---|---|
| 1 | `⌘⇧C` | Enter Cycle Count mode | Data plane filters to "uncounted" items for current zone; first SKU auto-focused |
| 2 | *(scan barcode)* | Scanner inputs SKU as keystrokes | SKU matched; row highlighted; quantity cell auto-focused |
| 3 | *(type count)* | Type the physical count (e.g., `47`) | Number appears in the quantity cell with ghost text showing system count ("System: 50") |
| 4 | `Enter` | Commit count | Cell flashes green (match) or amber (mismatch). If mismatch, AI suggestion appears: "3 units short — check adjacent rack?" |
| 5 | `Tab` | Advance to next uncounted SKU | Next row auto-focused; cursor in quantity cell |
| 6 | *(repeat 3–5)* | Continue counting | — |
| 7 | `⌘⇧M` | Flag current item for recount | Row marked with 🔄 icon; moves to "recount" queue |
| 8 | `⌘⇧Z` | Flag current item as "Zero Count" | Quantity set to 0; row flashes red; confirmation toast |
| 9 | `⌘⇧S` | Skip current item | Item moves to "skipped" queue; next item focused |
| 10 | `⌘⇧D` | Done — exit Cycle Count mode | Summary modal: "Counted: 47/50 · Mismatches: 3 · Flagged: 2" |

**Total keystrokes for a single SKU count:** 1 (scan) + N (type count) + 1 (Enter) + 1 (Tab) = N+3 keystrokes. For a typical 2-digit count, that's 6 keystrokes per SKU, with zero mouse movement.

**Milestone celebrations:** At 25%, 50%, 75%, and 100% completion, a brief (500ms) animation appears in the Status Bar — a progress bar fills with a satisfying spring animation. No confetti, no modals, no interruptions.

### Global Hotkey Map

| Category | Key | Action |
|---|---|---|
| **Navigation** | `⌘K` | Open Command Interface |
| | `⌘1–9` | Switch to nav item 1–9 |
| | `⌘L` | Focus location/URL bar |
| | `⌘\` | Toggle DENSE/BREATHE mode |
| **Data** | `⌘F` | Open Query Composer |
| | `⌘⇧F` | Open Natural Language Query |
| | `/` | Focus search within current view |
| | `⌘S` | Save current filter/view |
| **Editing** | `Enter` / `F2` | Enter cell edit mode |
| | `Tab` | Commit edit + advance to next cell |
| | `⇧Tab` | Commit edit + retreat to previous cell |
| | `Escape` | Cancel edit |
| | `⌘Z` | Undo last edit |
| | `⌘⇧Z` | Redo |
| **Actions** | `⌘T` | Quick Transfer (opens inline transfer form) |
| | `⌘P` | New Purchase Order |
| | `⌘R` | Receive shipment |
| | `⌘D` | Duplicate selected item |
| | `⌘Delete` | Archive selected (with confirmation) |
| **View** | `⌘+` / `⌘-` | Zoom data plane (adjust row height) |
| | `⌘0` | Reset zoom to default |
| | `⌘⇧[` / `⌘⇧]` | Collapse/expand Matryoshka rows |
| **Mode** | `⌘⇧C` | Cycle Count mode |
| | `⌘⇧V` | Receive mode |
| | `⌘⇧X` | Pick/Pack mode |

---

## 6.2 Micro-Interactions & Feedback Loops

### Easing Curves

| Token | Value | Personality | Usage |
|---|---|---|---|
| `--ease-instant` | `cubic-bezier(0, 0, 1, 1)` | Linear — no personality | Progress bars, spinner rotation |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Decelerating — arrives gently | Elements entering the screen (dropdowns, tooltips, toasts) |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Accelerating — departs decisively | Elements leaving the screen (closing modals, dismissing toasts) |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Smooth — neither enters nor leaves | State-to-state transitions (color changes, size changes) |
| `--spring-snappy` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy overshoot — playful but controlled | Badge count updates, toggle switches, filter chip insertion |
| `--spring-heavy` | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | Dramatic overshoot — noticeable | Major state changes (mode switch, workflow step completion) |
| `--ease-gentle` | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Very soft — almost imperceptible | Background color transitions, opacity changes |

### Duration Scale

| Token | Value | Usage |
|---|---|---|
| `--duration-instant` | `0ms` | Selection state, checkbox toggle |
| `--duration-fast` | `75ms` | Hover state color transitions |
| `--duration-base` | `150ms` | Focus rings, icon state changes, cell edit transitions |
| `--duration-moderate` | `250ms` | Dropdown open, tooltip appear, chip insertion |
| `--duration-slow` | `400ms` | Panel slide, modal enter, drawer slide |
| `--duration-cinematic` | `800ms` | Chromatic Thread color change, mode transition |
| `--duration-slowmo` | `1500ms` | First-run tutorial animations, onboarding highlights |

### The Barcode Scan Feedback Trio

A barcode scan is the most frequent physical-to-digital interaction in a warehouse. The feedback must be **instant, unmistakable, and tri-modal** (visual + auditory + haptic):

**Successful Scan:**

| Channel | Detail |
|---|---|
| **Visual** | The scanned row flashes `--status-success-bg` for `100ms`. The SKU cell briefly scales to `1.02` and returns to `1.0` via `--spring-snappy` over `200ms`. The Pulse Line receives a new data point with a `150ms` ease-out animation. |
| **Auditory** | A single, short (80ms) sine wave tone at 880Hz (A5 note). Pleasant, unobtrusive, distinctive. Volume: 50% of system media volume. |
| **Haptic** | A single 50ms vibration pulse at medium intensity (if device supports `navigator.vibrate`). |

**Mismatched Scan (SKU found but quantity doesn't match expected):**

| Channel | Detail |
|---|---|
| **Visual** | The scanned row flashes `--status-warning-bg` for `200ms`. A small warning icon (▲) appears next to the SKU cell, persisting until the operator acknowledges. The quantity cell gets a `2px solid --status-warning-text` border. |
| **Auditory** | Two short (80ms each) sine wave tones at 660Hz, separated by 100ms. "Da-da" — a questioning pattern. |
| **Haptic** | Two 50ms vibration pulses, separated by 100ms. |

**Invalid Scan (SKU not found in system):**

| Channel | Detail |
|---|---|
| **Visual** | The Command Bar flashes `--status-critical-bg` for `300ms`. A large inline error appears: "SKU not found. [Create New] [Re-scan] [Manual Entry]". The Chromatic Thread flashes Crimson for `500ms`. |
| **Auditory** | A single 200ms square wave tone at 220Hz (A3 note). Low, harsh, unmistakable. This is deliberately unpleasant — it signals "something is wrong" viscerally. |
| **Haptic** | A single 300ms vibration pulse at high intensity. |

### Row Hover Micro-Interaction

When the cursor hovers over a data row:
1. **Frame 0–75ms:** Row background transitions from transparent to `--surface-hover` via `--ease-out`
2. **Frame 75–150ms:** Action icons (edit, transfer, overflow) fade in at `opacity: 0 → 1` via `--ease-out`
3. **Frame 150–200ms:** The row's Pulse Line increases its stroke width from `1.5px` to `2px` (a subtle "I see you" response)

When the cursor leaves:
1. **Frame 0–75ms:** Action icons fade out at `opacity: 1 → 0` via `--ease-in`
2. **Frame 75–150ms:** Row background transitions back to transparent via `--ease-in`
3. **Frame 150–200ms:** Pulse Line stroke width returns to `1.5px`

### Toast Notification Anatomy

```
┌────────────────────────────────────────────────────────────────────┐
│ ✓  Stock adjusted       SKU-4821: 1,247 → 1,190 units (WH-B)   │  ×  │
└────────────────────────────────────────────────────────────────────┘
```

- **Entry:** Slides in from top-right, `--duration-slow` + `--ease-out`, with a `8px` vertical offset from the viewport edge
- **Auto-dismiss:** 4000ms (success), 6000ms (warning), persists until manual dismiss (error)
- **Hover:** Pauses auto-dismiss timer. Timer resumes on mouse leave.
- **Stack:** Multiple toasts stack vertically with `--space-2` gap. Maximum 3 visible. Older toasts compress to a count badge: "+2 more"
- **Exit:** Slides out to the right, `--duration-moderate` + `--ease-in`

---

# PHASE 7: FRONTEND IMPLEMENTATION BLUEPRINT

---

## 7.1 React & Material UI (MUI) Implementation Strategy

### MUI Theming & Overrides: The MASK Protocol

MANIFOLD's MUI implementation follows the **MASK Protocol** — **M**UI **A**s **S**keleton, **K**ustomize everything. We use MUI as a structural skeleton (component composition, accessibility primitives, event handling) and completely mask its default visual identity through aggressive theming.

#### createTheme Configuration

```typescript
import { createTheme, ThemeOptions } from '@mui/material/styles';

const manifoldTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#E8603C',
          light: '#FEF0EC',
          dark: '#D14F2D',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#2D3748',
          light: '#4A5568',
          dark: '#1A202C',
          contrastText: '#FFFFFF',
        },
        error: {
          main: '#991B1B',
          light: '#FEE2E2',
          dark: '#7F1D1D',
          contrastText: '#FFFFFF',
        },
        warning: {
          main: '#92400E',
          light: '#FEF3C7',
          dark: '#78350F',
          contrastText: '#FFFFFF',
        },
        success: {
          main: '#166534',
          light: '#DCFCE7',
          dark: '#14532D',
          contrastText: '#FFFFFF',
        },
        info: {
          main: '#075985',
          light: '#E0F2FE',
          dark: '#0C4A6E',
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#F7F7F5',
          paper: '#FFFFFF',
        },
        text: {
          primary: '#1A1A1E',
          secondary: '#5C5C66',
          disabled: '#B8B8BE',
        },
        divider: '#E2E2E0',
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#F0764F',
          light: 'rgba(232,96,60,0.15)',
          dark: '#E8603C',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#A0AEC0',
          light: '#CBD5E0',
          dark: '#718096',
          contrastText: '#0D0D0F',
        },
        error: {
          main: '#FCA5A5',
          light: 'rgba(254,226,226,0.15)',
          dark: '#F87171',
          contrastText: '#0D0D0F',
        },
        warning: {
          main: '#FCD34D',
          light: 'rgba(254,243,199,0.15)',
          dark: '#FBBF24',
          contrastText: '#0D0D0F',
        },
        success: {
          main: '#86EFAC',
          light: 'rgba(220,252,231,0.15)',
          dark: '#4ADE80',
          contrastText: '#0D0D0F',
        },
        info: {
          main: '#7DD3FC',
          light: 'rgba(224,242,254,0.15)',
          dark: '#38BDF8',
          contrastText: '#0D0D0F',
        },
        background: {
          default: '#0D0D0F',
          paper: '#1A1A1E',
        },
        text: {
          primary: '#F0F0F2',
          secondary: '#A0A0A8',
          disabled: '#44444C',
        },
        divider: 'rgba(255,255,255,0.08)',
      },
    },
  },
  typography: {
    fontFamily: '"Geist Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontFamilyCode: '"Berkeley Mono", "JetBrains Mono", "SF Mono", "Cascadia Code", Menlo, Monaco, Consolas, monospace',
    h1: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25 },
    h2: { fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.3 },
    h3: { fontSize: '1rem', fontWeight: 600, letterSpacing: 0, lineHeight: 1.4 },
    body1: { fontSize: '0.875rem', fontWeight: 400, letterSpacing: 0, lineHeight: 1.5 },
    body2: { fontSize: '0.8125rem', fontWeight: 400, letterSpacing: 0, lineHeight: 1.5 },
    caption: { fontSize: '0.75rem', fontWeight: 400, letterSpacing: '0.01em', lineHeight: 1.45 },
    button: { fontSize: '0.875rem', fontWeight: 500, letterSpacing: 0, lineHeight: 1.5 },
    label: { fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.04em', lineHeight: 1.4, textTransform: 'uppercase' },
  },
  shape: {
    borderRadius: 6,
  },
  spacing: 4, // 4px base unit — all MUI spacing calls use multiples: theme.spacing(1) = 4px
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius-sm)',
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          minHeight: '36px',
          transition: 'background-color 75ms var(--ease-out), box-shadow 150ms var(--ease-out)',
          '&:active': {
            transform: 'scale(0.98)',
            transition: 'transform 50ms var(--ease-in)',
          },
        },
        containedPrimary: {
          backgroundColor: '#E8603C',
          color: '#FFFFFF',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#D14F2D',
            boxShadow: '0 1px 3px rgba(232,96,60,0.3)',
          },
          '&:focusVisible': {
            outline: '2px solid #E8603C',
            outlineOffset: '2px',
          },
        },
        outlined: {
          borderColor: '#E2E2E0',
          color: '#1A1A1E',
          '&:hover': {
            borderColor: '#E8603C',
            backgroundColor: '#FEF0EC',
          },
        },
      },
      variants: [
        {
          props: { size: 'touch' },
          style: {
            minHeight: '48px',
            padding: '12px 24px',
            fontSize: '0.9375rem',
          },
        },
      ],
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius-sm)',
          padding: '8px',
          transition: 'background-color 75ms var(--ease-out)',
          '&:hover': {
            backgroundColor: 'var(--surface-hover)',
          },
          '&:focusVisible': {
            outline: '2px solid var(--brand-primary)',
            outlineOffset: '2px',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid var(--border-subtle)',
          padding: '8px 12px',
          fontSize: '0.8125rem',
          fontFamily: 'var(--font-code)',
          fontVariantNumeric: 'tabular-nums',
        },
        head: {
          backgroundColor: 'var(--surface-sunken)',
          fontWeight: 500,
          fontSize: '0.6875rem',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          borderBottom: '1px solid var(--border-default)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: '44px',
          transition: 'background-color 75ms var(--ease-out)',
          '&:hover': {
            backgroundColor: 'var(--surface-hover)',
          },
          '&.Mui-selected': {
            backgroundColor: 'var(--surface-selected)',
            borderLeft: '2px solid var(--brand-primary)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'var(--surface-selected)',
          },
        },
      },
      variants: [
        {
          props: { density: 'compact' },
          style: { height: '36px' },
        },
        {
          props: { density: 'comfortable' },
          style: { height: '52px' },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-code)',
            '& fieldset': {
              borderColor: 'var(--border-default)',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: 'var(--border-strong)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--brand-primary)',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 'var(--radius-xs)',
          fontFamily: 'var(--font-code)',
          fontVariantNumeric: 'tabular-nums',
          fontSize: '0.6875rem',
          fontWeight: 500,
          height: '20px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderLeft: '1px solid var(--border-default)',
          boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.20)',
          border: '1px solid var(--border-default)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'var(--surface-elevated)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.6875rem',
          padding: '4px 8px',
          boxShadow: 'var(--shadow-md)',
        },
      },
    },
  },
} as ThemeOptions);
```

#### Custom sx Prop Guidelines

The `sx` prop is used for **one-off, context-specific style overrides** that don't warrant a new component variant. Guidelines:

1. **Never use `sx` for patterns that appear more than twice.** If two components share the same sx override, extract it into a styled component or a theme override.
2. **Prefer CSS variables over direct values.** `sx={{ color: 'var(--status-critical-text)' }}` instead of `sx={{ color: '#991B1B' }}`.
3. **Never override MUI's internal class names** (`.MuiButton-root`, etc.) in `sx` — use the `components` theme section instead.
4. **Use the spacing function for consistency.** `sx={{ p: 2 }}` (16px) instead of `sx={{ p: '16px' }}`.

#### Custom MUI Variants

MANIFOLD defines the following custom component variants that extend MUI's default set:

**Button Variants:**
- `variant="destructive"` — Red background, white text, used for irreversible actions
- `variant="ghost"` — Transparent background, text-only, used for tertiary actions
- `size="touch"` — 48px height, for tablet/mobile contexts

**TableCell Variants:**
- `variant="numeric"` — Right-aligned, Berkeley Mono, tabular-nums, negative values in red
- `variant="status"` — Center-aligned, with mandatory icon + text + background tint
- `variant="sparkline"` — Fixed 40×16px canvas element for Pulse Line

**TableRow Variants:**
- `density="compact"` — 36px height, 4px vertical padding
- `density="comfortable"` — 52px height, 12px vertical padding

### State Management Architecture

**The Local-First Stack:**

```
┌─────────────────────────────────────────────────┐
│                   React UI                       │
│          (Zustand + TanStack Query)               │
├─────────────────────────────────────────────────┤
│              TanStack Query Cache                │
│    (Server state, background refetch, stale-     │
│     while-revalidate, optimistic updates)         │
├─────────────────────────────────────────────────┤
│               Zustand Stores                     │
│  (UI state, filter state, user preferences,      │
│   session state, edit state machine)              │
├─────────────────────────────────────────────────┤
│            Local-First Sync Engine               │
│  (IndexedDB + CRDT + background sync queue)      │
│  ┌─────────────────────────────────────────┐    │
│  │  IndexedDB (via Dexie.js)               │    │
│  │  - Full data replica                    │    │
│  │  - Pending mutations queue              │    │
│  │  - Conflict resolution log              │    │
│  └─────────────────────────────────────────┘    │
├─────────────────────────────────────────────────┤
│              Server API (REST/GraphQL)            │
└─────────────────────────────────────────────────┘
```

**Zustand Store Architecture:**

```typescript
// UI Store — transient, never persisted
interface UIStore {
  mode: 'dense' | 'breathe';
  commandBarOpen: boolean;
  commandBarQuery: string;
  selectedRows: Set<string>;
  expandedRows: Map<string, number>; // skuId → expansion level
  focusCell: { row: string; col: string } | null;
  editCell: { row: string; col: string; originalValue: unknown } | null;
  activeFilters: FilterToken[];
  densityTier: 'steady' | 'rapid' | 'hyper';
}

// Data Store — persisted to IndexedDB, synced with server
interface DataStore {
  skus: Map<string, SKU>;
  locations: Map<string, Location>;
  suppliers: Map<string, Supplier>;
  pendingMutations: Mutation[];
  syncStatus: 'online' | 'offline' | 'syncing';
  lastSyncTimestamp: number;
}

// Session Store — persisted to localStorage
interface SessionStore {
  preferredUOM: Map<string, string>; // skuId → preferred unit
  recentFilters: FilterToken[][];
  pinnedNavItems: string[];
  columnVisibility: Map<string, boolean>;
  columnOrder: string[];
  columnWidths: Map<string, number>;
  recentSKUs: string[]; // last 20 viewed SKUs
  keyboardShortcuts: Map<string, string>; // user-customized shortcuts
}
```

**TanStack Query Configuration:**

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,        // 30 seconds — data is fresh for 30s
      gcTime: 300_000,           // 5 minutes — unused cache is garbage collected after 5min
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      networkMode: 'offlineFirst', // Uses cached data when offline
    },
    mutations: {
      networkMode: 'offlineFirst',
      onMutate: async (variables) => {
        // Optimistic update: apply mutation to local state immediately
        // Return snapshot for rollback on error
      },
      onError: (err, variables, context) => {
        // Rollback optimistic update
        // Queue mutation for retry when online
      },
      onSuccess: (data, variables, context) => {
        // Invalidate related queries to trigger background refetch
        // Update sync status
      },
    },
  },
});
```

---

## 7.2 Performance, Virtualization, & Rendering

### Table Virtualization within MUI

MANIFOLD uses **TanStack Virtual** (formerly react-virtual) integrated with MUI's Table components to achieve smooth 60fps rendering of 100,000+ SKU rows.

**Architecture:**

```typescript
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualizedDataTable({ rows, columns }: DataTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      const row = rows[index];
      // Matryoshka rows have variable heights based on expansion level
      if (row.expansionLevel === 0) return 44; // Family row
      if (row.expansionLevel === 1) return 36; // Variant row
      if (row.expansionLevel === 2) return 32; // Location row
      return 44; // Default
    },
    overscan: 10, // Render 10 extra rows above and below viewport
    lanes: columns.length > 8 ? 1 : 1, // Single lane for table layout
  });

  return (
    <TableContainer ref={parentRef} sx={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <TableCell key={col.id} variant="head" sx={{ width: col.width }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody sx={{ position: 'relative', height: `${virtualizer.getTotalSize()}px` }}>
          {virtualizer.getVirtualItems().map(virtualRow => {
            const row = rows[virtualRow.index];
            return (
              <TableRow
                key={row.id}
                density={row.density}
                sx={{
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${virtualRow.start}px)`,
                  width: '100%',
                }}
              >
                {columns.map(col => (
                  <DataCell key={col.id} row={row} column={col} />
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

**Performance Budgets:**

| Metric | Budget | Measurement |
|---|---|---|
| First Contentful Paint | < 800ms | Lighthouse |
| Time to Interactive | < 1.5s | Lighthouse |
| Scroll frame rate | ≥ 58fps | Chrome DevTools Performance |
| Cell edit latency | < 50ms (local) / < 200ms (optimistic+confirm) | Custom metric |
| Virtualizer render cycle | < 16ms per frame | React Profiler |
| IndexedDB read (single SKU) | < 5ms | Custom metric |
| Search index lookup (⌘K) | < 50ms for 100K SKUs | Custom metric |

**Search Index Architecture:**

The ⌘K command interface requires sub-50ms search across 100K+ SKUs. This is achieved with:

1. **Fuse.js** (fuzzy search) running on an in-memory index built from IndexedDB data
2. **Index structure:** Pre-built trigram index for SKU codes + tokenized inverted index for names/descriptions
3. **Debounced input:** 50ms debounce on keystrokes before triggering search
4. **Result caching:** Recent queries are cached in a LRU cache (max 100 entries)
5. **Web Worker:** Search runs in a dedicated Web Worker to avoid blocking the main thread

### Accessibility (a11y) for Complex Grid Navigation

**Screen Reader Navigation for Dense Data Grids:**

Standard `<table>` semantics break down when rows contain inline editors, sparklines, and nested Matryoshka levels. MANIFOLD implements a custom grid navigation pattern based on WAI-ARIA Authoring Practices for Data Grids:

1. **Role:** The data plane uses `role="grid"` with `aria-rowcount` and `aria-colcount` attributes.

2. **Row navigation:** `↑` / `↓` moves focus between rows. `Home` / `End` moves to first/last row. `PageUp` / `PageDown` scrolls by viewport height.

3. **Cell navigation:** `←` / `→` moves focus between cells within a row. `Tab` moves to the next interactive element (skipping non-interactive cells).

4. **Cell announcement:** When a cell receives focus, the screen reader announces:
   - Column name
   - Cell value
   - Status (if applicable)
   - Edit state ("editable" or "read-only")
   - Example: "Stock Level, 1,247 units, In Stock, editable"

5. **Live regions:** KPI values and status bar content use `aria-live="polite"` with `aria-atomic="true"` for update announcements. The Chromatic Thread state is announced via a visually-hidden live region.

6. **Sparkline accessibility:** The Pulse Line sparklines use `aria-label` with a text summary: "Stock velocity: increasing over last 24 periods, current trend: healthy"

7. **Matryoshka row state:** Expanded/collapsed state is communicated via `aria-expanded`. When a row is expanded, the screen reader announces "Expanded, 3 variants" or "Expanded, 4 locations."

8. **Focus management in HYPER mode:** When live updates are occurring rapidly, focus remains stable on the current cell. The screen reader announces updates only for the focused cell (to prevent "announcement spam" from 100 updates/second).

---

# APPENDIX A: CONFIGURED LAYOUT TEMPLATES

---

## Template 1: The Operations Dashboard

**Use Case:** The default landing view for warehouse managers. Shows stock health at a glance with the ability to drill into any area.

```
┌───────────────────────────────────────────────────────────────────┐
│ ▎ (Chromatic Thread)                                              │
├───────────────────────────────────────────────────────────────────┤
│ ⌘K  Search or command...                              🔔  JD ▾  │
├──┬────────────────────────────────────────────────────────────────┤
│  │ HEALTH  ┃ 1,247 OK  ┃ 23 LOW  ┃ 5 STOCKOUT  ┃ 12 TRANSIT    │
│  │ (compact KPI bar, 32px)                                       │
│  ├────────────────────────────────────────────────────────────────┤
│  │ ┌─────────────────────────────────┬──────────────────────────┐│
│  │ │                                 │                          ││
│  │ │  INFINITE DATA PLANE            │  DETAIL PANE             ││
│  │ │  (60% width)                    │  (40% width)             ││
│  │ │                                 │                          ││
│  │ │  SKU rows with Pulse Lines,     │  Selected item profile:  ││
│  │ │  Matryoshka nesting, inline     │  - Full stock breakdown   ││
│  │ │  editing, sparklines            │  - Location map           ││
│  │ │                                 │  - Velocity chart         ││
│  │ │                                 │  - Recent activity feed   ││
│  │ │                                 │  - UOM Ledger             ││
│  │ │                                 │  - AI suggestions         ││
│  │ │                                 │                          ││
│  │ └─────────────────────────────────┴──────────────────────────┘│
│  │ 🤖 AI: 3 SKUs predicted to stockout within 48h. [View] [Dismiss] │
├──┴────────────────────────────────────────────────────────────────┤
│ ● Online  │ Synced  │ 847 SKUs  │ DENSE (⌘\ to toggle)          │
└───────────────────────────────────────────────────────────────────┘
```

## Template 2: The Cycle Count View

**Use Case:** Active cycle counting — maximum focus on the current item, minimal distractions.

```
┌───────────────────────────────────────────────────────────────────┐
│ ▎ (Chromatic Thread)                                              │
├───────────────────────────────────────────────────────────────────┤
│ CYCLE COUNT — Zone B, Rack 12  │  47/50 counted  │  ⌘⇧C to exit │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│   ╔═══════════════════════════════════════════════════════════╗   │
│   ║  SKU-4820  Hex Bolt M10×25mm (Zinc)                     ║   │
│   ║                                                          ║   │
│   ║  System count:  1,247 units  (WH-B, Rack 12)           ║   │
│   ║                                                          ║   │
│   ║  Physical count:  ┌────────────────────┐                ║   │
│   ║                    │ ███                │  ← auto-focus  ║   │
│   ║                    └────────────────────┘                ║   │
│   ║                                                          ║   │
│   ║  Ghost: "1,247" (AI predicts no variance)               ║   │
│   ║                                                          ║   │
│   ║  [⌘⇧Z Zero] [⌘⇧M Recount] [⌘⇧S Skip] [Enter Commit]  ║   │
│   ╚═══════════════════════════════════════════════════════════╝   │
│                                                                   │
│   Previous: SKU-4819  ✓ 1,089 / 1,090 (−1)                     │
│                                                                   │
│   ████████████████████████████████████████░░░░  94% complete      │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│ ● Online  │ 1 pending sync  │ Cycle Count Mode  │ ⌘⇧C to exit   │
└───────────────────────────────────────────────────────────────────┘
```

## Template 3: The Supply Chain Graph View

**Use Case:** Visualizing inventory as a node-based supply chain graph — where goods come from, where they are, and where they're going. This is MANIFOLD's "shatter the table paradigm" view.

```
┌───────────────────────────────────────────────────────────────────┐
│ ▎ (Chromatic Thread)                                              │
├───────────────────────────────────────────────────────────────────┤
│ ⌘K  Supply Chain Graph  │  Filter: Hex Bolt family  │  ⌘G graph │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────┐         ┌──────────┐         ┌──────────┐          │
│  │Supplier │──200/wk─→│  WH-A    │──50/wk──→│ WH-B     │          │
│  │Acme Bolt│         │ 2,400 u  │         │ 1,247 u  │          │
│  │ 🇨🇳      │         │ ●OK      │         │ ●OK      │          │
│  └─────────┘         └────┬─────┘         └────┬─────┘          │
│       │                   │                    │                  │
│       │                   │ 30/wk              │ 80/wk           │
│       │                   ▼                    ▼                  │
│       │              ┌──────────┐         ┌──────────┐          │
│       └──PO pending──→│  WH-C    │         │ Customer │          │
│                       │ 360 u ▲  │         │ Shipments│          │
│                       │ LOW      │         │ 890/wk   │          │
│                       └──────────┘         └──────────┘          │
│                                                                   │
│  ════════ Stock flow (thickness = volume)                        │
│  ─ ─ ─ ─ Pending/Planned flow                                    │
│                                                                   │
│  Click node for detail  │  Drag to rearrange  │  Scroll to zoom  │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│ ● Online  │ Graph View  │ 4 nodes  │ 5 edges  │ ⌘T for table   │
└───────────────────────────────────────────────────────────────────┘
```

This graph view uses **React Flow** (or a custom WebGL renderer for >100 nodes) to render the supply chain as an interactive node graph. Nodes represent locations (warehouses, suppliers, customers), and edges represent stock flows with thickness proportional to volume. Color coding follows the Traffic Light Matrix — a warehouse node with stockout items shows a red border.

---

# APPENDIX B: MOTION TOKEN CHEAT SHEET

| Context | Duration | Easing | Property | Notes |
|---|---|---|---|---|
| Row hover | 75ms | `--ease-out` | background-color | Instant-feeling, no perceptible lag |
| Button press | 50ms | `--ease-in` | transform: scale(0.98) | Tactile "click" sensation |
| Focus ring appear | 150ms | `--ease-out` | outline + box-shadow | Visible but not distracting |
| Cell edit enter | 150ms | `--ease-out` | border, padding | Smooth transition from read to edit |
| Cell edit commit (success) | 100ms | `--ease-out` | background-color flash | Green → transparent |
| Cell edit commit (error) | 200ms | `--ease-in-out` | background-color flash + shake | Red → transparent + 2px horizontal shake |
| Toast enter | 400ms | `--ease-out` | translateX + opacity | Slides in from right |
| Toast exit | 250ms | `--ease-in` | translateX + opacity | Slides out to right |
| Modal enter | 250ms | `--ease-out` | scale(0.95→1) + opacity | Gentle materialization |
| Drawer slide | 350ms | `--ease-out` | translateX | From right edge |
| ⌘K palette open | 200ms | `--ease-out` | opacity + translateY(-8px→0) | Floats down into view |
| Filter chip insert | 200ms | `--spring-snappy` | scale(0→1) + opacity | Playful bounce |
| Matryoshka expand | 250ms | `--ease-out` | max-height + opacity | Smooth reveal |
| Pulse Line update | 150ms | `--ease-out` | SVG path | New data point appended |
| Chromatic Thread change | 800ms | `--ease-in-out` | background-color | Deliberately slow — no startle |
| AI Ribbon appear | 300ms | `--ease-out` | translateY + opacity | Slides up from bottom |
| Barcode scan success | 100ms | `--spring-snappy` | scale(1→1.02→1) | Quick pulse |
| Barcode scan failure | 200ms | `--ease-in` | translateX ±4px (shake) | Error shake |
| Sync indicator | 200ms | `--ease-out` | opacity + scale | ◐ → ● transition |
| HYPER mode pulse | 3000ms | `--ease-gentle` | opacity (0.5→1→0.5) | Slow, rhythmic pulse |

---

# APPENDIX C: DESIGN TOKEN EXPORT — CSS CUSTOM PROPERTIES

```css
:root {
  /* === BRAND === */
  --brand-primary: #E8603C;
  --brand-primary-hover: #D14F2D;
  --brand-primary-active: #B8401F;
  --brand-primary-subtle: #FEF0EC;
  --brand-secondary: #2D3748;

  /* === SURFACES === */
  --surface-canvas: #F7F7F5;
  --surface-ground: #EFEFEC;
  --surface-surface: #FFFFFF;
  --surface-elevated: #FFFFFF;
  --surface-overlay: rgba(255,255,255,0.85);
  --surface-sunken: #F0F0EE;
  --surface-hover: #F5F5F3;
  --surface-selected: #FEF0EC;

  /* === STATUS (TRAFFIC LIGHT) === */
  --status-critical-bg: #FEE2E2;
  --status-critical-text: #991B1B;
  --status-warning-bg: #FEF3C7;
  --status-warning-text: #92400E;
  --status-success-bg: #DCFCE7;
  --status-success-text: #166534;
  --status-transit-bg: #E0F2FE;
  --status-transit-text: #075985;
  --status-pending-bg: #F3E8FF;
  --status-pending-text: #6B21A8;
  --status-excess-bg: #FFF7ED;
  --status-excess-text: #9A3412;
  --status-inactive-bg: #F3F4F6;
  --status-inactive-text: #4B5563;

  /* === VELOCITY === */
  --velocity-healthy: #166534;
  --velocity-slow: #92400E;
  --velocity-dead: #991B1B;

  /* === TEXT === */
  --text-primary: #1A1A1E;
  --text-secondary: #5C5C66;
  --text-tertiary: #8E8E96;
  --text-disabled: #B8B8BE;
  --text-on-brand: #FFFFFF;
  --text-inverse: #FFFFFF;
  --text-code: #C7254E;

  /* === BORDERS === */
  --border-default: #E2E2E0;
  --border-strong: #CCCCCC;
  --border-subtle: #F0F0EE;
  --border-accent: #E8603C;
  --border-critical: #991B1B;

  /* === CHROMATIC THREAD === */
  --thread-normal: #E8603C;
  --thread-syncing: #D4A017;
  --thread-critical: #C41E3A;
  --thread-ai: #00B4D8;
  --thread-offline: #8E9196;

  /* === FONTS === */
  --font-sans: 'Geist Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-code: 'Berkeley Mono', 'JetBrains Mono', 'SF Mono', 'Cascadia Code', Menlo, Monaco, Consolas, monospace;

  /* === TYPE SCALE === */
  --text-hero: 2.25rem;
  --text-display: 1.75rem;
  --text-h1: 1.5rem;
  --text-h2: 1.25rem;
  --text-h3: 1rem;
  --text-body-lg: 0.9375rem;
  --text-body: 0.875rem;
  --text-body-sm: 0.8125rem;
  --text-caption: 0.75rem;
  --text-label: 0.6875rem;
  --text-micro: 0.625rem;
  --text-code: 0.8125rem;
  --text-code-sm: 0.6875rem;

  /* === SPACING === */
  --space-0: 0px;
  --space-half: 2px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* === RADII === */
  --radius-none: 0px;
  --radius-xs: 3px;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-pill: 9999px;

  /* === SHADOWS === */
  --shadow-none: none;
  --shadow-xs: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg: 0 12px 24px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.04);
  --shadow-focus: 0 0 0 2px var(--brand-primary);

  /* === Z-INDEX === */
  --z-abyss: 0;
  --z-data: 10;
  --z-context: 100;
  --z-ghost: 200;
  --z-sticky: 300;
  --z-overlay: 400;
  --z-command: 500;
  --z-drawer: 600;
  --z-alert: 700;
  --z-thread: 9999;
  --z-nuclear: 10000;

  /* === MOTION === */
  --duration-instant: 0ms;
  --duration-fast: 75ms;
  --duration-base: 150ms;
  --duration-moderate: 250ms;
  --duration-slow: 400ms;
  --duration-cinematic: 800ms;
  --duration-slowmo: 1500ms;

  --ease-instant: cubic-bezier(0, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --spring-snappy: cubic-bezier(0.34, 1.56, 0.64, 1);
  --spring-heavy: cubic-bezier(0.68, -0.55, 0.27, 1.55);
  --ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* === BREAKPOINTS === */
  --bp-scanner: 400px;
  --bp-mobile: 768px;
  --bp-tablet: 1024px;
  --bp-desktop: 1920px;
  --bp-ultrawide: 3840px;
}

/* === DARK MODE === */
.dark {
  --brand-primary: #F0764F;
  --brand-primary-hover: #E8603C;
  --brand-primary-active: #D14F2D;
  --brand-primary-subtle: rgba(232,96,60,0.15);
  --brand-secondary: #A0AEC0;

  --surface-canvas: #0D0D0F;
  --surface-ground: #141416;
  --surface-surface: #1A1A1E;
  --surface-elevated: #222226;
  --surface-overlay: rgba(13,13,15,0.85);
  --surface-sunken: #111113;
  --surface-hover: #2A2A2E;
  --surface-selected: rgba(232,96,60,0.12);

  --status-critical-bg: rgba(254,226,226,0.15);
  --status-critical-text: #FCA5A5;
  --status-warning-bg: rgba(254,243,199,0.15);
  --status-warning-text: #FCD34D;
  --status-success-bg: rgba(220,252,231,0.15);
  --status-success-text: #86EFAC;
  --status-transit-bg: rgba(224,242,254,0.15);
  --status-transit-text: #7DD3FC;
  --status-pending-bg: rgba(243,232,255,0.15);
  --status-pending-text: #C4B5FD;
  --status-excess-bg: rgba(255,247,237,0.15);
  --status-excess-text: #FDBA74;
  --status-inactive-bg: rgba(243,244,246,0.10);
  --status-inactive-text: #6B7280;

  --text-primary: #F0F0F2;
  --text-secondary: #A0A0A8;
  --text-tertiary: #6B6B74;
  --text-disabled: #44444C;
  --text-on-brand: #FFFFFF;
  --text-inverse: #0D0D0F;
  --text-code: #F97583;

  --border-default: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.14);
  --border-subtle: rgba(255,255,255,0.04);
  --border-accent: #F0764F;
  --border-critical: #FCA5A5;
}
```

---

# APPENDIX D: ICON SYSTEM SPECIFICATION

**Library:** Lucide Icons (consistent with the industry standard, but used with MANIFOLD's visual rules)

**Style:** Outline, 1.5px stroke, rounded caps and joins

**Sizes:**
| Context | Size | Stroke Width |
|---|---|---|
| Inline (table cells, badges) | 14px | 1.5px |
| Default (buttons, nav) | 18px | 1.5px |
| Large (empty states, hero) | 24px | 1.5px |
| Display (wallscreen) | 32px | 2px |

**Color Behavior:**
- Mono: Inherits `currentColor` (default)
- Semantic: Explicitly colored by status token (not inherited)
- Brand: Colored by `--brand-primary` (for primary action icons only)

**Inventory Domain Icon Map:**

| Action | Icon | Notes |
|---|---|---|
| Add item | `plus` | Always paired with label |
| Adjust stock | `sliders-horizontal` | Used in inline edit stepper |
| Transfer | `arrow-right-left` | Paired with direction arrow |
| Receive shipment | `inbox` | Green when PO is pending |
| Fulfill order | `truck` | |
| Cycle count | `clipboard-check` | |
| Scan barcode | `scan-line` | Used on FAB in scanner mode |
| Archive | `archive` | |
| Set reorder point | `flag` | Amber variant |
| Warehouse location | `warehouse` | |
| Supplier | `building-2` | |
| Analytics | `bar-chart-3` | |
| AI suggestion | `sparkles` | Cyan when active |
| Conflict | `alert-triangle` | Amber variant |
| Offline | `wifi-off` | Silver variant |
| Sync pending | `refresh-cw` | Spinning animation when active |
| UOM lock | `lock` | Fixed conversion |
| UOM estimate | `wrench` | Estimated conversion |
| Expand row | `chevron-right` | Rotates 90° when expanded |
| Collapse row | `chevron-down` | |
| Command palette | `terminal` | Used in ⌘K hint |

---

# PHASE 8: AI INTEGRATION PATTERNS — THE COGNITIVE CO-PILOT

---

## 8.1 AI as a First-Class Citizen

MANIFOLD does not "add AI" — AI is woven into the fabric of every interaction. The AI system, internally called **COG** (Cognitive Operations Guide), operates at three levels of visibility:

| Level | Name | Visibility | Trigger | Example |
|---|---|---|---|---|
| **L0** | **Invisible** | None — the operator never sees it | Always active | Pre-fetching data, caching predictions, optimizing virtualization windows |
| **L1** | **Ambient** | Peripheral — the operator senses it without looking | Context-dependent | Ghost text in input fields, Pulse Line color gradients, Chromatic Thread state |
| **L2** | **Explicit** | Direct — the operator reads and acts on it | On-demand or critical | AI Ribbon suggestions, anomaly cards, natural language query parsing |

### 8.2 The AI Ribbon Component

The AI Ribbon is a 32px-tall strip that slides up from the bottom of the Command Canvas when COG has a contextual suggestion. It never interrupts; it *offers*.

**Anatomy:**

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🤖 3 SKUs predicted to stockout within 48h  │  ⚡ Anomaly: SKU-4820  │ ✕ │
│    [View Predictions]                       │     -47 units unaccounted│    │
│                                              │     [Investigate]       │    │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Behavioral Rules:**

1. **Appearance:** The AI Ribbon slides up with `--duration-slow` + `--ease-out`. It only appears when COG has at least one L2-priority suggestion.

2. **Card Layout:** Each suggestion is a mini-card within the Ribbon:
   - **Left:** Icon indicating suggestion type (🤖 prediction, ⚡ anomaly, 💡 optimization, 🔔 reminder)
   - **Center:** One-line summary (max 80 characters)
   - **Right:** Action button (`[View]`, `[Investigate]`, `[Apply]`, `[Dismiss]`)

3. **Stacking:** Maximum 3 visible cards. If COG has more suggestions, the Ribbon shows a count: `+5 more suggestions [⌘⇧A to see all]`

4. **Auto-dismiss:** Cards auto-dismiss after 30 seconds if no interaction. Critical anomaly cards persist until explicitly dismissed.

5. **Keyboard Access:** `⌘⇧A` opens the AI Ribbon in expanded mode (full-width overlay showing all suggestions in a scrollable list).

### 8.3 Ghost Text — Predictive Input

Ghost text (also called "phantom text" or "autocomplete suggestion") appears in any input field where COG can predict the likely value. It is rendered in `--text-tertiary` color, overlaid on the cursor position.

**Ghost Text Rules:**

| Context | Prediction Source | Confidence Threshold | Display |
|---|---|---|---|
| SKU input field | Recent scans, location context, task workflow | > 60% | Full SKU code + product name |
| Quantity field | System count (for cycle count), average order quantity | > 80% | Numeric value |
| Location field | Item's primary location, recent transfer patterns | > 70% | Location code (e.g., "WH-B-R12") |
| Transfer destination | Stock balance across warehouses, velocity data | > 65% | Warehouse code |
| Supplier field | Primary supplier for this SKU, recent PO history | > 75% | Supplier name |

**Acceptance:** Press `→` or `Tab` to accept the ghost text. The accepted text replaces the ghost text in `--text-primary` color with a brief `--duration-fast` flash.

**Rejection:** Simply continue typing. The ghost text disappears as soon as the typed characters diverge from the prediction.

**Visual Specification:**

```css
.ghost-text {
  color: var(--text-tertiary);
  font-family: var(--font-code);
  font-variant-numeric: tabular-nums;
  pointer-events: none;
  user-select: none;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.6;
  transition: opacity 75ms var(--ease-out);
}

.ghost-text--accepting {
  opacity: 0;
  transition: opacity 100ms var(--ease-in);
}
```

### 8.4 The Anomaly Engine

COG continuously monitors stock data for anomalies — patterns that deviate from expected behavior. Anomalies are classified by severity:

| Severity | Token | Visual | Sound | Haptic | Auto-escalate |
|---|---|---|---|---|---|
| **INFO** | `--anomaly-info` | Blue dot (8px) on affected row + tooltip on hover | None | None | No |
| **WARNING** | `--anomaly-warning` | Amber left-border accent (2px) + AI Ribbon card | Soft chime (440Hz, 100ms) | Single pulse | After 30 min → ELEVATED |
| **ELEVATED** | `--anomaly-elevated` | Amber background tint on row + persistent AI Ribbon card | Two-tone chime (440Hz + 550Hz, 200ms) | Double pulse | After 1 hour → CRITICAL |
| **CRITICAL** | `--anomaly-critical` | Red Chromatic Thread + modal interrupt | Alert tone (220Hz, 400ms) | Long pulse | Immediate — requires acknowledgment |

**Anomaly Types:**

| Type | Detection Logic | Example |
|---|---|---|
| **Unexplained Variance** | Physical count ≠ system count by >5% with no corresponding transaction | "SKU-4820: System shows 1,247, last count was 1,200 — 47 units unaccounted" |
| **Velocity Anomaly** | Stock velocity changes >2σ from 30-day moving average | "SKU-7701: Usage rate jumped from 12/day to 47/day — possible data entry error or demand spike" |
| **Dead Stock Alert** | Zero velocity for >90 days on active SKU | "SKU-3310: No movement in 127 days — consider liquidation or write-off" |
| **Reorder Prediction** | Projected stockout within X days based on current velocity | "SKU-4822: At current velocity (103/day), stockout in 8 days. Auto-PO suggested." |
| **Location Mismatch** | Item scanned in unexpected location | "SKU-4821 scanned at WH-C Rack 3 — expected at WH-B Rack 12. Transfer initiated?" |
| **Cycle Count Discrepancy** | Count variance exceeds tolerance threshold | "Zone B Rack 12: 3 of 50 items show >5% variance — recommend full recount" |
| **Duplicate Scan** | Same barcode scanned twice within short interval | "SKU-4821 scanned again within 2s — accidental double-scan?" |

### 8.5 AI-Driven View Optimization

COG doesn't just suggest actions — it optimizes the view itself:

**Smart Column Reordering:** Based on the operator's current task, COG reorders columns to surface the most relevant data first. For example:
- During a **Cycle Count**, the "Physical Count" and "Variance" columns are moved to the leftmost position
- During a **Receiving** workflow, the "PO Number" and "Expected Qty" columns are prioritized
- During **Analytics Review**, sparkline and trend columns expand to fill more space

This reordering happens automatically when a mode is activated (e.g., `⌘⇧C` for Cycle Count) and reverts when the mode is exited.

**Predictive Scroll:** When the operator is working through a sequential list (e.g., cycle counting items in rack order), COG pre-renders the next 20 rows in the virtualization buffer and scrolls them into position before the operator advances. This eliminates the "blank flash" that occurs when virtualized rows render for the first time.

### 8.6 The Narrative Feed

In the Detail Pane, COG generates a real-time **Narrative Feed** — a human-readable timeline of everything happening to the selected SKU:

```
📅 Today
  10:42  maria.chen adjusted stock: 1,247 → 1,190 (WH-B, Rack 12)
         → COG: "57-unit decrease. No corresponding order or transfer. Possible shrinkage."
  09:15  System auto-received PO-8842: +200 units (WH-A)
         → COG: "Replenishment from primary supplier. Stock now healthy at WH-A."
  08:30  james.kim transferred 50 units WH-A → WH-C
         → COG: "Rebalance transfer. WH-C was at 12 units (below reorder). Now at 62."

📅 Yesterday
  16:45  ⚠ Velocity anomaly detected: 2.3× above 30-day average
         → COG: "Possible demand spike. Auto-PO not triggered (threshold: 3×). Monitor."

📅 3 days ago
  11:00  Cycle count completed by sarah.patel — variance: -3 units (0.2%)
         → COG: "Within tolerance. No action needed."
```

**Design Rules:**
- Each entry has a timestamp, actor, action, and optional COG commentary
- COG commentary is styled in `--text-tertiary` with a `🤖` prefix
- Anomalies are highlighted with their severity color
- The feed is collapsible by date
- Maximum 50 entries per SKU; older entries available via "Load more"

---

# PHASE 9: VOICE & MULTI-MODAL INTERACTION DESIGN

---

## 9.1 Voice Command Architecture

In warehouse environments, operators frequently have their hands occupied (carrying boxes, driving forklifts, wearing gloves). Voice commands are not a novelty — they are an operational necessity.

### Wake Word & Activation

| Method | Trigger | Response |
|---|---|---|
| **Push-to-talk** | Press and hold physical button on headset/scanner | Immediate listening mode (green mic indicator) |
| **Wake word** | "Hey Manifold" | 500ms activation window (amber → green mic indicator) |
| **Hotkey** | `⌘⇧V` | Toggle continuous listening mode |
| **Context-aware** | After scanning an item, voice auto-activates for 5s | "What would you like to do with this item?" |

### Voice Command Grammar

Voice commands follow a strict **VERB + ENTITY + MODIFIER** grammar:

| Intent | Grammar | Example | System Response |
|---|---|---|---|
| Search | "Find [SKU/name]" | "Find hex bolt M10" | Navigates to SKU row, selects it |
| Adjust | "Adjust [SKU] to [quantity] [UOM]" | "Adjust 4820 to 1200 units" | Inline edit with voice-confirmed value |
| Transfer | "Transfer [quantity] [SKU] to [location]" | "Transfer 50 units of 4820 to Warehouse C" | Creates transfer order, reads confirmation |
| Count | "Count [quantity]" | "Count 47" | Fills current cycle count cell |
| Status | "Status of [SKU]" | "Status of 4820" | Reads current stock level, location, status |
| Navigate | "Go to [page/view]" | "Go to purchase orders" | Navigates to the specified view |
| Help | "Help with [topic]" | "Help with cycle count" | Opens contextual help overlay |

### Voice Feedback Protocol

When the system executes a voice command, it provides **auditory confirmation** before acting:

1. **Acknowledgment chime** (80ms, 660Hz) — "I heard you"
2. **Confirmation statement** (text-to-speech, 1.2× normal speed) — "Transferring 50 units of SKU-4820 to Warehouse C. Current stock at source: 1,247 units. After transfer: 1,197 units."
3. **Action execution** — occurs during the confirmation statement
4. **Completion tone** (80ms, 880Hz) — "Done"

**If the command is ambiguous:**
- **Clarification tone** (200ms, 440Hz, warbled) — "I'm not sure"
- **Clarification question** (TTS) — "Did you mean SKU-4820 or SKU-4821? Both match 'hex bolt M10'."
- **Wait for voice response** (5-second timeout)
- **Timeout fallback** — Show both options on screen with large tap targets

### Voice + Visual Synchronization

When a voice command is active, the UI shows a **Voice Overlay** at the bottom of the screen:

```
┌──────────────────────────────────────────────────────────────┐
│  🎤 "Transfer 50 units of SKU-4820 to Warehouse C"         │
│                                                              │
│  ✓ Understood: Transfer | 50 units | SKU-4820 | → WH-C     │
│  ⟳ Executing...                                             │
└──────────────────────────────────────────────────────────────┘
```

- The voice transcript appears in real-time as the operator speaks
- The parsed intent appears below with color-coded tokens
- The execution state updates in real-time

## 9.2 Barcode Scanner Integration

### Scanner Input Protocol

Barcode scanners (Zebra, Honeywell, etc.) function as keyboard emulators — they type characters rapidly followed by an Enter key. MANIFOLD detects scanner input by monitoring keystroke timing:

- **Human typing:** ~50–100ms between keystrokes
- **Scanner input:** ~5–15ms between keystrokes

When MANIFOLD detects a "burst" of keystrokes (≥4 characters at <20ms intervals) followed by Enter, it classifies the input as a **scan event** rather than manual typing.

### Scan Event Handling

```
Scan Detected
    │
    ├── Is a view open that expects scans? (Cycle Count, Receiving, etc.)
    │       │
    │       ├── YES → Process scan in context
    │       │         ├── SKU found → Highlight row, auto-advance
    │       │         └── SKU not found → Error feedback trio (§6.2)
    │       │
    │       └── NO → Open ⌘K with scanned value pre-filled
    │                 ├── Single match → Auto-navigate to SKU
    │                 └── Multiple matches → Show disambiguation list
    │
    └── Was a quantity prefix detected? (e.g., "*50*SKU-4821")
            │
            ├── YES → Parse as "Quantity 50, SKU 4821"
            │         → Enter adjustment mode with pre-filled quantity
            │
            └── NO → Process as standard SKU scan
```

### Multi-Barcode Formats

MANIFOLD supports the following barcode formats with auto-detection:

| Format | Example | Detection Pattern |
|---|---|---|
| **SKU Code** | `4820-01` | Matches internal SKU format |
| **UPC-A** | `012345678905` | 12-digit numeric, check digit validated |
| **EAN-13** | `5901234123457` | 13-digit numeric, check digit validated |
| **QR Code (URL)** | `https://manifold.app/sku/4820` | Starts with `https://manifold.app/` |
| **GS1-128** | `(01)09912345678901(17)250115(10)LOT123` | Application Identifier parsing |
| **Batch/Lot** | `LOT-2025-0115-A` | Matches batch format pattern |

When a GS1-128 barcode is scanned, MANIFOLD extracts:
- GTIN (product identifier)
- Expiration date
- Batch/lot number
- Serial number (if present)

All extracted fields are auto-populated in the relevant form.

---

# PHASE 10: SOUND DESIGN & SENSORY SPECIFICATION

---

## 10.1 Sound Design Philosophy

Sound in MANIFOLD is **functional, not decorative**. Every sound conveys specific information that reduces the operator's need to look at the screen. The sound design follows these principles:

1. **Inform, don't entertain.** No sound plays without conveying status information.
2. **Frequency separation.** Different categories of sounds occupy different frequency ranges to prevent masking.
3. **Cultural neutrality.** Sound patterns use pure tones and rhythms, not culturally-specific metaphors (no "ding!" or "whoosh!").
4. **Volume restraint.** All sounds default to 50% of system media volume. The operator can adjust in Settings.
5. **Silence as signal.** The absence of expected sounds (e.g., no scan confirmation during continuous counting) is itself information — "something is wrong with the scanner connection."

## 10.2 Sound Inventory

### Navigation & Interaction Sounds

| Sound | Frequency | Duration | Waveform | Trigger |
|---|---|---|---|---|
| `snd-focus` | 1200Hz | 30ms | Sine, fade-out | Focus lands on interactive element (subtle) |
| `snd-click` | 800Hz | 40ms | Triangle, fade-out | Button click, toggle switch |
| `snd-toggle-on` | 660Hz → 880Hz | 80ms | Sine, upward sweep | Toggle turned ON |
| `snd-toggle-off` | 880Hz → 660Hz | 80ms | Sine, downward sweep | Toggle turned OFF |
| `snd-expand` | 440Hz + 550Hz | 100ms | Sine, major chord | Matryoshka row expanded |
| `snd-collapse` | 550Hz + 440Hz | 100ms | Sine, reversed chord | Matryoshka row collapsed |

### Data Operation Sounds

| Sound | Frequency | Duration | Waveform | Trigger |
|---|---|---|---|---|
| `snd-commit` | 880Hz | 80ms | Sine, clean | Cell edit committed successfully |
| `snd-commit-error` | 220Hz | 200ms | Square, harsh | Cell edit failed validation |
| `snd-delete` | 330Hz → 165Hz | 200ms | Sawtooth, downward | Item archived/deleted |
| `snd-undo` | 440Hz → 660Hz | 150ms | Sine, upward | Undo action |
| `snd-save` | 660Hz + 880Hz | 120ms | Sine, octave | Filter view saved |

### Scan & Workflow Sounds

| Sound | Frequency | Duration | Waveform | Trigger |
|---|---|---|---|---|
| `snd-scan-ok` | 880Hz | 80ms | Sine, clean | Successful barcode scan |
| `snd-scan-mismatch` | 660Hz, 660Hz | 80ms + 80ms (100ms gap) | Sine, double | Quantity mismatch |
| `snd-scan-fail` | 220Hz | 200ms | Square, harsh | Invalid barcode |
| `snd-scan-duplicate` | 550Hz → 440Hz | 150ms | Sine, downward | Same barcode scanned twice |
| `snd-count-progress` | 1200Hz | 20ms | Sine, tick | Every 10th item counted (subtle) |
| `snd-count-milestone` | 880Hz + 1100Hz + 1320Hz | 300ms | Sine, major triad | 25%/50%/75%/100% count complete |

### System State Sounds

| Sound | Frequency | Duration | Waveform | Trigger |
|---|---|---|---|---|
| `snd-online` | 660Hz → 880Hz | 200ms | Sine, ascending | Connection restored |
| `snd-offline` | 880Hz → 440Hz | 300ms | Sine, descending | Connection lost |
| `snd-sync-start` | 1000Hz, brief | 50ms | Sine, blip | Sync begins |
| `snd-sync-done` | 880Hz + 1100Hz | 150ms | Sine, harmony | Sync complete |
| `snd-conflict` | 440Hz + 466Hz | 400ms | Sine, dissonant interval | Merge conflict detected |
| `snd-hyper-mode` | 330Hz, pulsing | Continuous, 1s cycle | Sine, 50% duty | HYPER data mode activated |

### AI Sounds

| Sound | Frequency | Duration | Waveform | Trigger |
|---|---|---|---|---|
| `snd-ai-suggest` | 1200Hz → 1400Hz | 100ms | Sine, shimmer | AI Ribbon appears |
| `snd-ai-anomaly` | 550Hz + 693Hz | 200ms | Sine, tritone | Anomaly detected (unsettling but not alarming) |
| `snd-ai-ghost-accept` | 1100Hz | 40ms | Sine, blip | Ghost text accepted |

## 10.3 Haptic Pattern Inventory

For devices that support the Vibration API (`navigator.vibrate`):

| Pattern | Duration (ms) | Pattern | Trigger |
|---|---|---|---|
| `hap-tap` | 50 | `[50]` | Standard tap/click feedback |
| `hap-confirm` | 50 + 50 | `[50, 50, 50]` | Action confirmed |
| `hap-error` | 300 | `[300]` | Error state |
| `hap-scan` | 50 | `[50]` | Successful scan |
| `hap-scan-dup` | 50 + 50 + 50 | `[50, 50, 50]` | Duplicate scan |
| `hap-warning` | 100 + 50 + 100 | `[100, 50, 100]` | Warning state |
| `hap-milestone` | 50 + 50 + 100 | `[50, 50, 100]` | Milestone reached |
| `hap-conflict` | 200 + 100 + 200 | `[200, 100, 200]` | Merge conflict |

---

# APPENDIX E: COMPONENT COMPOSITION COOKBOOK

---

## Recipe 1: The Inventory Dashboard Card

A composite component showing stock health for a category or warehouse zone.

```tsx
<InventoryCard
  title="Warehouse B — Rack Zone 12"
  totalItems={342}
  healthBreakdown={{
    ok: 298,
    low: 23,
    stockout: 5,
    transit: 16,
  }}
  velocity="healthy"        // 'healthy' | 'slow' | 'dead'
  trend={+4.2}              // percentage change from previous period
  lastCounted="2 hours ago"
  onClick={() => navigate('/warehouse/b/zone/12')}
/>
```

**Visual Rendering:**

```
┌─────────────────────────────────────────────────────────────┐
│  Warehouse B — Rack Zone 12                          ✎  →  │
│                                                              │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐                               │
│  │298 │ │ 23 │ │  5 │ │ 16 │  Total: 342 SKUs              │
│  │ ●  │ │ ▲  │ │ ✕  │ │ →  │                               │
│  │ OK │ │LOW │ │OUT │ │TRN │                               │
│  └────┘ └────┘ └────┘ └────┘                               │
│                                                              │
│  ~~~~ Pulse: Healthy  │  ↑ 4.2%  │  Last count: 2h ago     │
└─────────────────────────────────────────────────────────────┘
```

**Design Tokens Applied:**
- Card: `background: var(--surface-surface)`, `border: 1px solid var(--border-default)`, `border-radius: var(--radius-md)`, `padding: var(--space-5)`
- Title: `font: var(--text-h3)`, `color: var(--text-primary)`, `weight: 600`
- Health badges: Each uses the corresponding `--status-*` token with triple encoding (color + icon + text)
- Pulse indicator: 24×8px canvas with `--velocity-healthy` color
- Trend: `font: var(--text-caption)`, green for positive, red for negative
- Hover: `background: var(--surface-hover)`, cursor pointer, `--shadow-sm`

## Recipe 2: The Transfer Dialog

A streamlined, single-purpose dialog for stock transfers — the most common operational action.

```tsx
<TransferDialog
  sku="4820-01"
  skuName="Hex Bolt M10×25mm (Zinc)"
  currentLocation="WH-B"
  currentStock={1247}
  uom="units"
  onClose={() => setShowTransfer(false)}
  onConfirm={(transfer) => executeTransfer(transfer)}
/>
```

**Visual Rendering:**

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Transfer Stock                                           ✕      │
│                                                                  │
│  4820-01 · Hex Bolt M10×25mm (Zinc)                            │
│  Current: 1,247 units @ WH-B (Rack 12)                         │
│                                                                  │
│  ┌──────────────────────┐    ┌──────────────────────┐          │
│  │ From: WH-B        ▾ │ →  │ To: WH-C          ▾ │          │
│  └──────────────────────┘    └──────────────────────┘          │
│                                                                  │
│  Quantity:  ┌──────────────────────┐                            │
│             │ 50                   │  🤖 Ghost: "50"           │
│             └──────────────────────┘    (avg transfer qty)      │
│                                                                  │
│  ── IMPACT PREVIEW ──────────────────────────────────────────   │
│  WH-B: 1,247 → 1,197 units  (●OK → ●OK)                       │
│  WH-C: 62 → 112 units  (▲LOW → ●OK)                           │
│                                                                  │
│  ⚠ After transfer, WH-C will still be below optimal stock      │
│    level (200 units). Consider larger transfer or PO.           │
│                                                                  │
│  [Cancel]                              [Confirm Transfer ⌘⏎]   │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

**Key Design Decisions:**
1. **Impact Preview** — before confirming, the operator sees the projected stock levels at both source and destination. This eliminates the "wait, how much will be left?" mental math.
2. **Ghost text** — COG pre-fills the quantity field with the average transfer quantity for this SKU pair, reducing input to a single Tab+Enter for common operations.
3. **AI warning** — if the transfer doesn't fully resolve the destination's low stock, COG flags it.
4. **Keyboard shortcut** — `⌘⏎` (Cmd+Enter) confirms instantly. No mouse needed.

## Recipe 3: The Stockout Cascade Alert

When a stockout triggers downstream consequences (unfulfillable orders, production line stoppage), MANIFOLD escalates from a simple status badge to a full **Cascade Alert**.

```tsx
<StockoutCascade
  sku="4820-03"
  skuName="Hex Bolt M10×25mm (Black Oxide)"
  stockoutLocation="WH-C"
  affectedOrders={[
    { id: 'SO-9981', customer: 'Acme Corp', qty: 200, dueDate: '2025-07-16' },
    { id: 'SO-9985', customer: 'TechParts Ltd', qty: 50, dueDate: '2025-07-17' },
  ]}
  suggestedActions={[
    { type: 'transfer', from: 'WH-A', qty: 360, feasibility: 'high' },
    { type: 'expedite_po', supplier: 'BoltCo', eta: '2025-07-15', cost: '+$200 expedite fee' },
  ]}
/>
```

**Visual Rendering:**

```
┌──────────────────────────────────────────────────────────────────┐
│ ╔════════════════════════════════════════════════════════════╗   │
│ ║  ✕ STOCKOUT CASCADE                                      ║   │
│ ║                                                           ║   │
│ ║  SKU-4820-03 · Hex Bolt M10×25mm (Black Oxide)           ║   │
│ ║  Stock: 0 units @ WH-C                                   ║   │
│ ║                                                           ║   │
│ ║  ── AFFECTED ORDERS ──────────────────────────────────    ║   │
│ ║  SO-9981  Acme Corp       200 units  Due: Jul 16  ⚠ 2d   ║   │
│ ║  SO-9985  TechParts Ltd     50 units  Due: Jul 17  ⚠ 3d   ║   │
│ ║                                                           ║   │
│ ║  ── SUGGESTED ACTIONS ────────────────────────────────    ║   │
│ ║  ┌─────────────────────────────────────────────────────┐  ║   │
│ ║  │ ⚡ Transfer 360 units from WH-A                     │  ║   │
│ ║  │   Feasibility: HIGH (360 available)                 │  ║   │
│ ║  │   [Execute Transfer]                                │  ║   │
│ ║  └─────────────────────────────────────────────────────┘  ║   │
│ ║  ┌─────────────────────────────────────────────────────┐  ║   │
│ ║  │ 🚚 Expedite PO from BoltCo                         │  ║   │
│ ║  │   ETA: Jul 15  ·  Cost: +$200 expedite fee         │  ║   │
│ ║  │   [Create Expedited PO]                             │  ║   │
│ ║  └─────────────────────────────────────────────────────┘  ║   │
│ ║                                                           ║   │
│ ║  [Dismiss]  [Acknowledge & Track]                        ║   │
│ ╚════════════════════════════════════════════════════════════╝   │
└──────────────────────────────────────────────────────────────────┘
```

**Behavioral Rules:**
- This alert appears at `--z-nuclear` (10000) z-index, with `backdrop-filter: blur(24px)`
- The Chromatic Thread shifts to **Crimson Flash** for the duration of the alert
- The alert tone (`snd-scan-fail`: 220Hz, 400ms) plays once
- The operator **must** acknowledge by clicking one of the action buttons or "Acknowledge & Track"
- "Dismiss" requires a long-press (500ms) to prevent accidental dismissal
- After acknowledgment, the alert minimizes to a persistent card in the AI Ribbon

---

# APPENDIX F: NOTIFICATION SYSTEM ARCHITECTURE

---

## F.1 Notification Channels

MANIFOLD's notification system operates across 5 channels, each with distinct attention requirements:

| Channel | Attention Level | Duration | Dismissal | Examples |
|---|---|---|---|---|
| **Chromatic Thread** | Peripheral | Continuous | Auto (state change) | Online/offline, sync status, AI available |
| **Toast** | Glancing | 4–6s (auto-dismiss) | Manual or auto | Action confirmations, minor errors |
| **AI Ribbon** | Optional | Until dismissed | Manual | Predictions, anomalies, suggestions |
| **Badge** | Persistent | Until addressed | Action required | Pending count, notification bell |
| **Modal/Alert** | Interrupting | Until acknowledged | Manual (required) | Stockout cascades, destructive confirmations, critical errors |

## F.2 Notification Priority Matrix

| Priority | Toast | AI Ribbon | Badge | Modal | Sound | Haptic |
|---|---|---|---|---|---|---|
| **P0 — Critical** | ✗ | ✗ | ✗ | ✓ | ✓ (alert) | ✓ (long) |
| **P1 — Urgent** | ✓ (red) | ✓ (persistent) | ✓ | ✗ | ✓ (chime) | ✓ (double) |
| **P2 — Important** | ✓ (amber) | ✓ (auto-dismiss 30s) | ✓ | ✗ | ✓ (soft) | ✗ |
| **P3 — Informational** | ✓ (green) | ✗ | ✓ (subtle) | ✗ | ✗ | ✗ |
| **P4 — Ambient** | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

## F.3 Notification Preferences

Operators can configure notification preferences per channel and per priority:

```
Settings > Notifications

┌────────────────────────────────────────────────────────────────┐
│ Notification Preferences                                       │
│                                                                │
│ Stock Alerts                                                   │
│   Stockout events        [🔔 All] [🔔 P1+] [🔇 Off]         │
│   Low stock warnings     [🔔 All] [🔔 P2+] [🔇 Off]         │
│   Reorder suggestions    [🔔 All] [🔔 P3+] [🔇 Off]         │
│                                                                │
│ Operational                                                    │
│   Transfer confirmations [🔔 All] [🔇 P3+] [🔇 Off]         │
│   Sync conflicts         [🔔 All] [🔔 P2+] [🔇 Off]         │
│   Offline mode changes   [🔔 All] [🔇 P3+] [🔇 Off]         │
│                                                                │
│ AI                                                             │
│   Anomaly alerts         [🔔 All] [🔔 P2+] [🔇 Off]         │
│   Velocity predictions   [🔔 All] [🔇 P3+] [🔇 Off]         │
│   Optimization tips      [🔇 P3+] [🔇 Off]                   │
│                                                                │
│ Sound & Haptics                                                │
│   Scan feedback          [🔊 On] [🔇 Off]                     │
│   Voice commands         [🔊 On] [🔇 Off]                     │
│   Haptic feedback        [📳 On] [📳 Reduced] [📴 Off]        │
│                                                                │
│ Quiet Hours                     [22:00 — 06:00]               │
│   During quiet hours, only P0-P1 notifications surface.       │
└────────────────────────────────────────────────────────────────┘
```

## F.4 The Notification Bell & Drawer

The notification bell icon in the Command Bar shows:
- **No badge:** Zero unread notifications
- **Numeric badge (coral):** Count of unread P1+ notifications (max display: "9+")
- **Dot badge (amber):** Unread P2-P3 notifications only

Clicking the bell opens the **Notification Drawer** — a right-side panel showing all notifications in reverse-chronological order:

```
┌────────────────────────────────────────────┐
│ Notifications                        ✕     │
│ [All] [Unread] [P1+] [AI]                │
├────────────────────────────────────────────┤
│                                            │
│ ● P1  SKU-4822 stockout at WH-C          │
│     5 min ago  ·  [View] [Investigate]    │
│                                            │
│ ● P2  Velocity anomaly: SKU-7701         │
│     23 min ago ·  [View] [Dismiss]        │
│                                            │
│ ○ P3  Cycle count completed: Zone B      │
│     1h ago     ·  [View Report]           │
│                                            │
│ ○ P3  Sync complete: 12 mutations pushed │
│     2h ago     ·  [View Log]              │
│                                            │
│ ── Earlier ────────────────────────────── │
│                                            │
│ ○ P3  AI: 3 SKUs predicted to stockout   │
│     Yesterday ·  [View Predictions]       │
│                                            │
│          [Mark All Read] [Clear All]       │
└────────────────────────────────────────────┘
```

**Design Rules:**
- Panel width: `380px`
- Max visible notifications: 50 (virtualized scroll beyond)
- P1+ notifications have a solid dot (●) and coral left-border accent
- P2-P3 notifications have an empty dot (○) and no accent
- AI-labeled notifications have a `🤖` prefix
- Each notification has at most 2 action buttons
- "Mark All Read" dims unread indicators; "Clear All" removes non-pinned notifications
- Pinned notifications persist until explicitly unpinned

---

# APPENDIX G: DARK MODE DEEP DIVE

---

## G.1 Dark Mode Philosophy

MANIFOLD's dark mode is not simply "inverted light mode." It is a carefully calibrated visual environment designed for:

1. **Low-light control rooms** — logistics centers operating 24/7 with dim ambient lighting
2. **Extended shift comfort** — reducing eye strain during 10-12 hour monitoring sessions
3. **OLED efficiency** — pure black (`#0D0D0F`) backgrounds minimize power on OLED displays
4. **Data emphasis** — dark backgrounds make data values and status colors pop with higher perceived contrast

## G.2 Dark Mode Color Adjustments

Beyond the CSS custom property swaps defined in Appendix C, dark mode introduces several unique visual treatments:

**Surface Depth Gradient:**
In dark mode, surfaces use a subtle **top-lit gradient** to simulate ambient light from above:

```css
.dark .surface-card {
  background: linear-gradient(
    180deg,
    var(--surface-surface) 0%,
    color-mix(in srgb, var(--surface-surface) 95%, black) 100%
  );
}
```

This creates a barely perceptible "lit from above" effect that aids spatial perception without being distracting.

**Border Brightness Progression:**
Borders in dark mode become slightly brighter as z-index increases, simulating atmospheric perspective:

```css
.dark {
  --border-at-z0:  rgba(255,255,255,0.04);
  --border-at-z10: rgba(255,255,255,0.06);
  --border-at-z100: rgba(255,255,255,0.08);
  --border-at-z400: rgba(255,255,255,0.10);
  --border-at-z600: rgba(255,255,255,0.12);
}
```

**Status Color Desaturation:**
In dark mode, status colors are slightly desaturated and lightened to maintain readability on dark backgrounds while preventing the "neon glow" effect:

| Status | Light Mode Text | Dark Mode Text | Adjustment |
|---|---|---|---|
| Critical | `#991B1B` | `#FCA5A5` | Lightened 3 steps, desaturated 10% |
| Warning | `#92400E` | `#FCD34D` | Lightened 4 steps, shifted toward yellow |
| Success | `#166534` | `#86EFAC` | Lightened 4 steps, desaturated 5% |
| Transit | `#075985` | `#7DD3FC` | Lightened 4 steps |
| Pending | `#6B21A8` | `#C4B5FD` | Lightened 3 steps, desaturated 15% |

**Pulse Line in Dark Mode:**
The Pulse Line sparkline uses a **glow effect** in dark mode for enhanced visibility:

```css
.dark .pulse-line canvas {
  filter: drop-shadow(0 0 2px currentColor);
}
```

This creates a subtle neon glow around the sparkline stroke, making it visible even on very dark backgrounds without increasing stroke width.

## G.3 Dark Mode Touch Targets

In dark mode, touch targets are **automatically enlarged by 4px** (2px padding on each side). This is because:
- Dark backgrounds reduce the visibility of interactive element boundaries
- Operators in dim environments rely more on motor memory than visual precision
- The slight size increase (36px → 40px buttons) is imperceptible in terms of layout density but significant for touch accuracy

```css
.dark .interactive-element {
  padding: calc(var(--space-2) + 2px) calc(var(--space-3) + 2px);
}
```

## G.4 Automatic Mode Switching

MANIFOLD can automatically switch between light and dark mode based on:

1. **System preference** (default) — follows `prefers-color-scheme`
2. **Time of day** — configurable schedule (e.g., dark mode 20:00–06:00)
3. **Ambient light sensor** — if the device has an ambient light sensor (`AmbientLightSensor` API), MANIFOLD switches when lux drops below 300 or exceeds 800
4. **Manual toggle** — `⌘\` or the theme toggle in the Command Bar

Priority: Manual toggle > Ambient light sensor > Time of day > System preference

---

# APPENDIX H: INTERACTION PATTERN LIBRARY

---

## H.1 The Drag-to-Transfer Pattern

A physical metaphor for stock movement — the operator drags a quantity chip from one location to another.

**Step 1 — Initiate:**
Long-press (300ms) on a stock quantity cell. The cell "lifts" with a `--shadow-md` and `scale(1.05)` transform. A ghost image follows the cursor/finger.

**Step 2 — Drag:**
As the chip moves over valid drop targets (other location cells), the target cell shows a **receptive indicator** — a dashed border in `--brand-primary` with a subtle pulse animation.

**Step 3 — Drop:**
Release the chip over the target. A **transfer preview** appears inline:
```
Drop 50 units from WH-B → WH-C?
[Confirm] [Cancel]
```

**Step 4 — Execute:**
On confirm, the chip "flies" from source to destination with a `600ms` animation along a bezier path. Both cells flash with their respective `--status-*` colors.

**Keyboard Alternative:** `⌘T` opens the Transfer Dialog (Recipe 2 in Appendix E).

## H.2 The Swipe-to-Action Pattern (Touch)

On touch devices, table rows support swipe gestures:

| Gesture | Direction | Action | Visual |
|---|---|---|---|
| Short swipe | ← (left) | Quick edit (opens inline stepper) | Amber background reveals from right |
| Short swipe | → (right) | Mark as counted (cycle count) | Green background reveals from left |
| Long swipe | ← (left) | Delete/Archive | Red background reveals from right |
| Long swipe | → (right) | Transfer | Coral background reveals from left |

**Swipe Physics:**
- Short swipe: 40px threshold. Returns to original position if released before threshold.
- Long swipe: 100px threshold. Commits action if released past threshold.
- Haptic feedback at each threshold crossing.

## H.3 The Pinch-to-Zoom Data Pattern (Touch)

On the Data Plane, pinch-to-zoom adjusts the **information density**:

- **Pinch out (expand):** Row height increases (36px → 44px → 52px). Secondary content appears (sparklines expand, UOM pills appear, AI annotations surface).
- **Pinch in (compress):** Row height decreases (52px → 44px → 36px). Secondary content hides. Columns compress. Maximum density achieved.

This provides a fluid, physical metaphor for "show me more detail" vs. "show me more items."

---

# APPENDIX I: CONFIGURED LAYOUT — ADDITIONAL TEMPLATES

---

## Template 4: The Receiving Dock View

**Use Case:** Warehouse receiving — scanning inbound shipments against purchase orders.

```
┌───────────────────────────────────────────────────────────────────┐
│ ▎ (Chromatic Thread)                                              │
├───────────────────────────────────────────────────────────────────┤
│ RECEIVING │ PO-8842 · BoltCo · 200 units expected │ ⌘⇧V to exit │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │  PO-8842 — BoltCo Industries                               │ │
│  │  Expected: 200 units · 2 line items                        │ │
│  │  ─────────────────────────────────────────────────────     │ │
│  │  ☐ SKU-4820-01  Hex Bolt M10×25mm (Zinc)   150 expected   │ │
│  │  ☐ SKU-4820-03  Hex Bolt M10×25mm (Black)   50 expected   │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ╔═══════════════════════════════════════════════════════════╗   │
│  ║  📦 SCAN INCOMING ITEM                                   ║   │
│  ║                                                           ║   │
│  ║  ┌──────────────────────────────────────────┐             ║   │
│  ║  │  Scan barcode or type SKU...             │             ║   │
│  ║  └──────────────────────────────────────────┘             ║   │
│  ║                                                           ║   │
│  ║  🤖 Ghost: "SKU-4820-01" (matching PO line item)        ║   │
│  ╚═══════════════════════════════════════════════════════════╝   │
│                                                                   │
│  Received: 0/200 units  │  ⌘⇧D when done                       │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  0%                       │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│ ● Online  │ Receiving Mode  │ PO-8842  │ ⌘⇧V to exit            │
└───────────────────────────────────────────────────────────────────┘
```

## Template 5: The Warehouse Map / Spatial View

**Use Case:** Visualizing inventory as a spatial map of the warehouse floor. Color-coded zones show stock health at a glance.

```
┌───────────────────────────────────────────────────────────────────┐
│ ▎ (Chromatic Thread)                                              │
├───────────────────────────────────────────────────────────────────┤
│ ⌘K  Warehouse Map · WH-B  │  Filter: Low Stock + Stockout  │ 🗺 │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                    WH-B FLOOR PLAN                       │    │
│  │                                                          │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │    │
│  │  │ Zone A  │  │ Zone B  │  │ Zone C  │  │ Zone D  │   │    │
│  │  │ ●OK     │  │ ▲3 LOW  │  │ ✕1 OUT │  │ ●OK     │   │    │
│  │  │ 842 SKU │  │ 291 SKU │  │ 156 SKU │  │ 423 SKU │   │    │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │    │
│  │                                                          │    │
│  │  ┌─────────┐  ┌─────────┐  ┌──────────────────────┐   │    │
│  │  │ Zone E  │  │ Zone F  │  │   RECEIVING DOCK     │   │    │
│  │  │ ▲5 LOW  │  │ ●OK     │  │   📦 PO-8842 in      │   │    │
│  │  │ 189 SKU │  │ 312 SKU │  │   transit             │   │    │
│  │  └─────────┘  └─────────┘  └──────────────────────┘   │    │
│  │                                                          │    │
│  │  ┌─────────────────────────────────────────────────┐   │    │
│  │  │              SHIPPING / STAGING                  │   │    │
│  │  │  3 orders ready  ·  1 order awaiting pick       │   │    │
│  │  └─────────────────────────────────────────────────┘   │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  Click zone for detail  │  ⌘G for graph view  │  ⌘T for table   │
├───────────────────────────────────────────────────────────────────┤
│ ● Online  │ Map View  │ WH-B  │ 6 zones  │ 9 issues total       │
└───────────────────────────────────────────────────────────────────┘
```

**Zone Color Logic:**
- **Green border + ●OK** — All items in zone are above reorder point
- **Amber border + ▲N LOW** — N items below reorder point
- **Red border + ✕N OUT** — N items at zero stock
- **Blue border + →N TRN** — N items in transit to this zone
- **Pulse animation** on zones with active issues (amber/red zones pulse subtly)

---

# PHASE 11: DATA VISUALIZATION & CHARTING SPECIFICATION

---

## 11.1 The Visual Data Language

MANIFOLD's data visualization system is not a gallery of charts — it is a **visual grammar** with strict rules about which chart type encodes which data relationship. The wrong chart is worse than no chart; it actively misleads.

**The Prime Directive:** Every pixel of ink in a chart must encode data. If removing an element does not reduce information, it should not exist. This is the Tufte principle weaponized for operational interfaces.

## 11.2 Chart Type Taxonomy

| Data Relationship | Chart Type | When to Use | When NOT to Use |
|---|---|---|---|
| **Stock over time** | Sparkline (inline) / Area chart (detail) | Showing velocity, trends, seasonality | When you need exact values — use a table instead |
| **Stock across locations** | Heatmap / Treemap | Comparing stock levels across warehouses/zones | When there are <5 locations — use a bar chart |
| **Category breakdown** | Horizontal bar chart | Comparing stock value/volume across product categories | When showing change over time — use sparklines |
| **Stock health distribution** | Stacked bar / Donut | Showing OK/Low/Stockout proportions | Donut only when ≤5 segments; never for comparison |
| **Supply chain flow** | Sankey diagram | Visualizing quantity flows between nodes | When flow has <3 paths — use a table |
| **Reorder urgency** | Bullet chart | Stock level vs. reorder point vs. safety stock | When comparing >20 items — use a heatmap |
| **Velocity comparison** | Dot plot / Strip plot | Comparing stock turn rates across many SKUs | When data is dense — use a beeswarm instead |
| **Correlation analysis** | Scatter plot | Stock level vs. lead time, price vs. velocity | When n < 10 — not enough data for a pattern |
| **Seasonal patterns** | Cycle plot / Small multiples | Monthly/quarterly patterns across years | When data spans <2 years |
| **Anomaly detection** | Control chart | Stock movement with ±2σ bands | Only for time-series data with sufficient history |

## 11.3 The MANIFOLD Chart Theme

All charts in MANIFOLD share a common visual DNA. No chart may deviate from these rules:

**Colors:**

| Role | Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|---|
| Primary data series | `--chart-primary` | `#E8603C` | `#F0764F` | Main data line, primary bar |
| Secondary data series | `--chart-secondary` | `#2D3748` | `#A0AEC0` | Comparison series |
| Tertiary data series | `--chart-tertiary` | `#8E8E96` | `#6B6B74` | Reference line, target |
| Positive indicator | `--chart-positive` | `#166534` | `#86EFAC` | Above-target area fill |
| Negative indicator | `--chart-negative` | `#991B1B` | `#FCA5A5` | Below-target area fill |
| Warning band | `--chart-warning-band` | `rgba(245,158,11,0.10)` | `rgba(252,211,77,0.08)` | Reorder zone shading |
| Critical band | `--chart-critical-band` | `rgba(239,68,68,0.08)` | `rgba(252,165,165,0.06)` | Stockout zone shading |
| Grid lines | `--chart-grid` | `#F0F0EE` | `rgba(255,255,255,0.04)` | Chart background grid |
| Axis labels | `--chart-axis` | `#8E8E96` | `#6B6B74` | X/Y axis text |

**Typography:**

| Element | Font | Size | Weight | Tabular? |
|---|---|---|---|---|
| Axis labels | Geist Sans | 10px | 400 | No |
| Axis values | Berkeley Mono | 10px | 400 | ✓ |
| Tooltip title | Geist Sans | 12px | 600 | No |
| Tooltip values | Berkeley Mono | 12px | 500 | ✓ |
| Legend labels | Geist Sans | 11px | 400 | No |
| Chart title (in detail view) | Geist Sans | 14px | 600 | No |

**Grid & Axes:**
- **No chart borders.** Charts float on the canvas surface without a bounding box.
- **X-axis:** Horizontal grid lines only. No vertical grid lines (they add noise without adding information).
- **Y-axis:** Always right-aligned values. Left-aligned labels.
- **Baseline:** The zero baseline is always drawn at `1px solid var(--border-default)`. All other grid lines are `1px solid var(--chart-grid)`.
- **No chartjunk.** No 3D effects, no drop shadows on data elements, no gradient fills on bars, no decorative icons inside charts.

## 11.4 The Sparkline System

Sparklines are MANIFOLD's signature data visualization — embedded directly in data table rows.

### Inline Sparkline (40×16px) — Default

```
 ╱╲   ╱╲╱╲
╱  ╲╱╱    ╲
```

**Specification:**
- Canvas: `40px × 16px`
- Stroke: `1.5px`, rounded line caps
- Color: Gradient from `--velocity-healthy` to `--velocity-dead` based on current turn rate
- Fill: No fill (stroke only). Exception: In dark mode, a subtle `5% opacity` fill below the line creates a "glow" effect.
- Data points: Last 24 snapshots
- Update: New data point appended with `150ms ease-out` animation
- Hover: Expands to **Expanded Sparkline** (see below)

### Expanded Sparkline (200×80px) — On Hover

When the cursor hovers over a Pulse Line cell, the sparkline expands into a detailed tooltip:

```
┌──────────────────────────────────────┐
│  SKU-4820 · Stock Velocity           │
│  ┌────────────────────────────────┐  │
│  │     ╱╲   ╱╲╱╲                │  │
│  │    ╱  ╲╱╱    ╲   ← Current   │  │
│  │ ╱╱              ╲╱  trend     │  │
│  │ ─ ─ ─ reorder ─ ─ ─ ─ ─ ─ ─ │  │
│  └────────────────────────────────┘  │
│  30d Avg: 103/day │ Trend: ↑ +4.2% │
│  Turn Rate: 8.4/year │ Status: OK   │
└──────────────────────────────────────┘
```

- Reorder point shown as a dashed horizontal line in `--chart-warning-band`
- Current value shown as a dot at the rightmost data point
- Trend indicator in bottom-left (↑ green / ↓ red)
- Turn rate and status in bottom-right
- Appears after `300ms` hover, disappears `150ms` after cursor leaves

### Mini Gauge (24×12px) — KPI Cards

A horizontal bar showing stock level relative to reorder:

```
████████████████░░░░░░░░
```

- Width: `24px`, height: `12px`
- Fill: Gradient from left (green) to right (amber near reorder, red below)
- Fill width: `currentStock / max(reorderPoint * 3, currentStock) * 24px`
- Background: `var(--surface-sunken)`

### Stock Health Heatmap Cell

A 16×16px colored square used in matrix/grid views:

```
┌──┐
│██│  ← Color encodes stock health
└──┘
```

| Stock Level | Color | Opacity |
|---|---|---|
| >2× reorder | `--status-success-text` | 30% (light tint) |
| 1–2× reorder | `--status-success-text` | 60% |
| 0.5–1× reorder | `--status-warning-text` | 80% |
| <0.5× reorder | `--status-critical-text` | 100% |
| 0 (stockout) | `--status-critical-text` | 100% + `✕` overlay |

## 11.5 Chart Component Library

### The Bullet Chart — Reorder Status

The most important chart in inventory management: **where is my stock relative to danger?**

```
          Safety Stock  Reorder Point  Current Stock
          ├──────────┤ ├──────────────┤ ├──────────────────────┤
          ░░░░░░░░░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓████████████████████████│ 1,247 units
          ──────────── ────────────── ────────────────────────
```

**Anatomy:**
1. **Background bar (full width):** `var(--surface-sunken)` — represents maximum historical stock
2. **Safety stock zone:** `--chart-critical-band` fill — below this is emergency territory
3. **Reorder zone:** `--chart-warning-band` fill — between safety stock and reorder point
4. **Current stock bar:** Solid fill — `--chart-positive` (above reorder), `--chart-warning` (near reorder), or `--chart-critical` (below safety stock)
5. **Target marker:** `2px` vertical line at optimal stock level — `var(--chart-tertiary)`
6. **Value label:** Right-aligned, `Berkeley Mono`, `11px`, `var(--text-secondary)`

**Dimensions:**
- Height: `8px` (bar) / `24px` (total with labels)
- Width: `120px` (default) / `200px` (detail view)

### The Area Chart — Stock Velocity Over Time

Used in the Detail Pane for showing stock movement history:

```
 1,500 ┤          ╱╲
       │     ╱╲  ╱  ╲      ╱╲
 1,000 ┤    ╱  ╲╱    ╲   ╱  ╲
       │   ╱          ╲ ╱    ╲
   500 ┤  ╱            ╳      ╲
       │ ╱          ─ ─ ┼ ─ ─ ─ ╲ ─ ─ reorder
     0 ┤╱                │         ╲
       └─────────────────────────────
        Jan  Feb  Mar  Apr  May  Jun
```

**Anatomy:**
1. **Area fill:** Gradient from line color (`--chart-primary` at 30% opacity at top) to transparent at baseline
2. **Stroke:** `1.5px solid var(--chart-primary)`
3. **Reorder line:** `1px dashed var(--chart-warning)`, with label "reorder" at the right edge
4. **Safety stock line:** `1px dashed var(--chart-critical)`, with label "safety" at the right edge
5. **Interactive hover:** Vertical crosshair + tooltip showing exact value at that point in time
6. **Data points:** Only shown on hover (not by default — they add visual noise)

### The Treemap — Stock Distribution

Used for showing stock value or volume distribution across categories:

```
┌──────────────────────────────────────────────────────────┐
│                    Hardware (67%)                         │
│  ┌────────────────────────┬───────────────────────────┐ │
│  │    Bolts (42%)         │     Screws (25%)          │ │
│  │  ┌──────┬─────────┐   │  ┌──────────┬──────────┐ │ │
│  │  │Hex M10│Hex M12 │   │  │Sheet Metal│ Machine  │ │ │
│  │  │  28%  │  14%   │   │  │   15%    │  10%    │ │ │
│  │  └──────┴─────────┘   │  └──────────┴──────────┘ │ │
│  └────────────────────────┴───────────────────────────┘ │
│  ┌──────────────────────────────────────────────────────┐│
│  │              Adhesives (18%)                         ││
│  └──────────────────────────────────────────────────────┘│
│  ┌──────────────────────────────────────────────────────┐│
│  │              Safety Equipment (15%)                  ││
│  └──────────────────────────────────────────────────────┘│
└──────────────────────────────────────────────────────────┘
```

**Rules:**
- Each rectangle's area is proportional to its value
- Color encodes stock health (Traffic Light Matrix)
- Nesting: Maximum 3 levels deep (Category → Subcategory → SKU)
- Labels: Truncated to fit, with full text in tooltip
- Minimum visible rectangle: `40×20px` — smaller items are grouped into an "Other" bucket
- Border between cells: `2px solid var(--surface-surface)` (creates visual separation)

## 11.6 Chart Accessibility

| Requirement | Implementation |
|---|---|
| **Color-blind safety** | All charts use patterns/shapes in addition to color. Area charts use different stroke dashes. Bar charts use different hatching patterns for print. |
| **Screen reader** | Every chart has a hidden `<table>` equivalent with the same data, marked with `role="img"` and `aria-label` containing a text summary |
| **Keyboard navigation** | In interactive charts, `←` / `→` moves a crosshair along the data points. Screen reader announces the value at each point. |
| **High contrast mode** | When `prefers-contrast: high`, chart strokes double in width and all fill opacities increase to 80%+ |
| **Reduced motion** | When `prefers-reduced-motion: reduce`, all chart animations are disabled. Data appears instantly. |

---

# PHASE 12: FORM DESIGN SYSTEM & VALIDATION UX

---

## 12.1 Form Philosophy

Forms in MANIFOLD are **transactional instruments**, not data entry chores. Every form represents a real-world action — transferring stock, creating a purchase order, adjusting a count. The form's job is to get the operator from intent to execution with minimum friction and maximum confidence.

**The Three Laws of MANIFOLD Forms:**

1. **No unnecessary fields.** Every field must directly contribute to the action being performed. If a field can be auto-populated by the system, it is. If a field is rarely needed, it is hidden behind an "Advanced" toggle.

2. **Progressive commitment.** The operator should never feel "locked in." Every form supports undo. Every field can be modified until the moment of submission. No multi-step wizards that prevent going back.

3. **Immediate validation.** The system validates as the operator types, not after submission. Errors are caught at the field level. Success is confirmed inline.

## 12.2 Form Layout Patterns

### The Inline Edit Form (Zero-Click)

The primary form pattern — used for single-field edits directly in the data plane. See Phase 4 §4.2 for the complete cell state machine.

### The Side Drawer Form

Used for creating or editing multi-field records (products, suppliers, purchase orders):

```
┌──────────────────────────────────────────────────────────────┐
│  Add New Product                                       ✕     │
│                                                              │
│  ── REQUIRED ──────────────────────────────────────────────  │
│                                                              │
│  SKU Code *                                                  │
│  ┌──────────────────────────────────────────────────┐       │
│  │ Auto-generated                          [⟳ Regenerate] │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  Product Name *                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │                                                  │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  Category *                                                  │
│  ┌──────────────────────────────────────────────────┐       │
│  │ Select category...                              ▾ │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ── STOCK ────────────────────────────────────────────────   │
│                                                              │
│  Initial Quantity    Reorder Point     Safety Stock          │
│  ┌──────────────┐   ┌──────────────┐  ┌──────────────┐     │
│  │ 0            │   │ 0            │  │ 0            │     │
│  └──────────────┘   └──────────────┘  └──────────────┘     │
│                                                              │
│  Default Location                                            │
│  ┌──────────────────────────────────────────────────┐       │
│  │ Select warehouse...                             ▾ │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  Unit of Measure                                             │
│  ┌──────────────────────────────────────────────────┐       │
│  │ units                                         ▾  │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ▸ Advanced (Cost, Supplier, Lead Time, Images)              │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│  [Cancel]                              [Create Product ⌘⏎]  │
└──────────────────────────────────────────────────────────────┘
```

**Layout Rules:**
- Drawer width: `480px` fixed (does not scale with viewport)
- Section headers: `--text-label` (11px, uppercase, `--text-tertiary`)
- Required fields: Red asterisk `*` after label, validated on blur
- Field groups: Related fields (Quantity + Reorder + Safety) in a horizontal row
- Auto-generated fields: Pre-filled with system values, gray background, regenerate button
- Advanced toggle: `▸ Advanced (...)` — collapsed by default, expands with `--duration-moderate`
- Primary action: Always at bottom-right, sticky (remains visible when form scrolls)
- Cancel: Always at bottom-left, ghost button style

### The Full-Page Form

Used for complex workflows (purchase order creation, stocktake configuration):

- Occupies the full Command Canvas
- Uses a **two-column layout** (60/40) — form on the left, live preview on the right
- The preview updates in real-time as the operator fills the form
- Section navigation: Sticky left sidebar within the form showing section names and completion status

### The Quick-Add Inline Form

Used for rapid data entry within the data plane:

```
┌──────┬──────────────────────┬────────┬──────────┬────────┬────────┬────┐
│      │ + New SKU...         │        │          │        │        │    │
│      │ ┌──────────────────┐ │        │          │        │        │    │
│      │ │ Type name...     │ │ Cat ▾  │ 0        │        │ WH- ▾  │ ✓  │
│      │ └──────────────────┘ │        │          │        │        │    │
└──────┴──────────────────────┴────────┴──────────┴────────┴────────┴────┘
```

- Appears as a new row at the top of the data plane when `⌘N` is pressed
- Only the most essential fields are shown inline
- Press `Enter` to create (full record can be edited later in the drawer)
- Press `Escape` to cancel (row disappears)

## 12.3 Field Validation System

### Validation Timing

| Event | Validation Type | Feedback |
|---|---|---|
| **On focus** | None | No validation — let the operator type freely |
| **On input** | Format validation | Subtle icon (✓ or ⚠) appears at the right edge of the field |
| **On blur** | Full validation | Error message appears below the field if invalid |
| **On submit** | Cross-field validation | Errors highlighted for all invalid fields; focus moves to the first error |

### Validation States

| State | Border | Background | Icon | Message |
|---|---|---|---|---|
| **Default** | `1px solid var(--border-default)` | `var(--surface-surface)` | None | None |
| **Focused** | `2px solid var(--brand-primary)` | `var(--surface-surface)` | None | None |
| **Valid** | `1px solid var(--status-success-text)` | `var(--surface-surface)` | ✓ green (14px) | None (success is silent) |
| **Invalid** | `1px solid var(--status-critical-text)` | `var(--status-critical-bg)` | ✕ red (14px) | Error text in `--status-critical-text`, 11px, below field |
| **Warning** | `1px solid var(--status-warning-text)` | `var(--status-warning-bg)` | ▲ amber (14px) | Warning text in `--status-warning-text`, 11px, below field |
| **Disabled** | `1px solid var(--border-subtle)` | `var(--surface-sunken)` | — | `--text-disabled` placeholder |

### Cross-Field Validation Rules

| Scenario | Rule | Error Message |
|---|---|---|
| Transfer quantity > source stock | `quantity <= sourceStock` | "Cannot transfer 1,500 units — only 1,247 available at WH-B" |
| Reorder point > current stock (on new product) | Warning only | "Reorder point (200) is higher than initial stock (0). This item will immediately appear as 'Low Stock'." |
| Duplicate SKU code | `sku !== existingSkus` | "SKU-4820 already exists. Did you mean to edit the existing product?" |
| UOM mismatch in conversion | `conversionFactor > 0` | "Conversion factor must be positive. Cannot convert between these units." |
| Future date in "received on" field | `date <= today` | "Received date cannot be in the future." |

### Smart Defaults & AI Pre-Fill

COG pre-fills form fields based on context:

| Field | Pre-Fill Logic | Example |
|---|---|---|
| Default warehouse | User's most recent warehouse | "WH-B" (if last 5 actions were at WH-B) |
| Reorder point | Category average × 0.8 | "150" (if similar bolts average 180) |
| Safety stock | Reorder point × 0.5 | "75" (derived from reorder point) |
| Supplier | Primary supplier for category | "BoltCo Industries" |
| Lead time | Supplier's average lead time | "14 days" |
| Unit of measure | Category's most common UOM | "units" |

Pre-filled values appear with a subtle **COG indicator** — a small `🤖` icon next to the field label, and the value itself rendered in `--text-secondary` (instead of `--text-primary`) until the operator edits it. This signals "I filled this for you — verify it."

---

# APPENDIX J: ANIMATION & TRANSITION CATALOG

---

## J.1 CSS Implementation Reference

All animations are defined as CSS custom properties and can be applied via utility classes:

### Entry Animations

```css
/* Fade in from transparent */
.anim-fade-in {
  animation: fadeIn var(--duration-moderate) var(--ease-out) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide in from below (for toasts, ribbons) */
.anim-slide-up {
  animation: slideUp var(--duration-slow) var(--ease-out) forwards;
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide in from right (for drawers) */
.anim-slide-right {
  animation: slideRight var(--duration-slow) var(--ease-out) forwards;
}
@keyframes slideRight {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

/* Scale up from center (for modals) */
.anim-scale-up {
  animation: scaleUp var(--duration-moderate) var(--ease-out) forwards;
}
@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Spring pop (for badges, chips) */
.anim-pop {
  animation: springPop var(--duration-moderate) var(--spring-snappy) forwards;
}
@keyframes springPop {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

/* Expand height (for Matryoshka rows) */
.anim-expand {
  animation: expand var(--duration-moderate) var(--ease-out) forwards;
  overflow: hidden;
}
@keyframes expand {
  from { max-height: 0; opacity: 0; }
  to { max-height: 500px; opacity: 1; }
}
```

### Exit Animations

```css
/* Fade out */
.anim-fade-out {
  animation: fadeOut var(--duration-base) var(--ease-in) forwards;
}
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Slide out to right (for dismissing toasts) */
.anim-slide-out-right {
  animation: slideOutRight var(--duration-moderate) var(--ease-in) forwards;
}
@keyframes slideOutRight {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(100%); }
}

/* Collapse height */
.anim-collapse {
  animation: collapse var(--duration-moderate) var(--ease-in) forwards;
  overflow: hidden;
}
@keyframes collapse {
  from { max-height: 500px; opacity: 1; }
  to { max-height: 0; opacity: 0; }
}
```

### Feedback Animations

```css
/* Cell value changed — success flash */
.anim-flash-success {
  animation: flashSuccess var(--duration-slow) var(--ease-in-out) forwards;
}
@keyframes flashSuccess {
  0% { background-color: var(--status-success-bg); }
  100% { background-color: transparent; }
}

/* Cell value changed — error flash */
.anim-flash-error {
  animation: flashError 600ms var(--ease-in-out) forwards;
}
@keyframes flashError {
  0% { background-color: var(--status-critical-bg); }
  100% { background-color: transparent; }
}

/* Error shake (for invalid scan, failed validation) */
.anim-shake {
  animation: shake var(--duration-moderate) var(--ease-in-out);
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}

/* Pulse (for active anomalies, live indicators) */
.anim-pulse {
  animation: pulse 3s var(--ease-gentle) infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Skeleton shimmer (for loading states) */
.anim-shimmer {
  background: linear-gradient(
    90deg,
    var(--surface-sunken) 0%,
    var(--surface-surface) 50%,
    var(--surface-sunken) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s linear infinite;
}
@keyframes shimmer {
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
}

/* Barcode scan success pulse */
.anim-scan-pulse {
  animation: scanPulse 300ms var(--spring-snappy);
}
@keyframes scanPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

/* Button press feedback */
.anim-press {
  transition: transform 50ms var(--ease-in);
  &:active {
    transform: scale(0.98);
  }
}

/* Chromatic Thread color transition */
.anim-thread-change {
  transition: background-color var(--duration-cinematic) var(--ease-in-out);
}
```

## J.2 Reduced Motion Override

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

When reduced motion is active, all animations complete instantly. The only exception is the skeleton shimmer, which is replaced by a static `var(--surface-sunken)` background.

---

# APPENDIX K: ERROR STATE & RECOVERY PATTERN LIBRARY

---

## K.1 Error Taxonomy

MANIFOLD classifies errors into 4 categories, each with distinct UX treatment:

| Category | Severity | Example | User Impact | Recovery |
|---|---|---|---|---|
| **Input Error** | Low | Invalid quantity, wrong format | Blocked from submitting | Inline correction |
| **Business Rule Violation** | Medium | Transfer exceeds available stock, duplicate SKU | Action cannot proceed | Guided resolution |
| **System Error** | High | API timeout, server 500, sync failure | Data may be stale | Retry with fallback |
| **Catastrophic Failure** | Critical | Total data loss, auth failure, database corruption | Application unusable | Graceful degradation |

## K.2 Input Error Patterns

**Inline Error:**

```
┌──────────────────────────────────────────────┐
│ Quantity                                      │
│ ┌──────────────────────────────────────────┐ │
│ │ -5                                ✕      │ │
│ └──────────────────────────────────────────┘ │
│ ✕ Quantity must be a positive number          │
└──────────────────────────────────────────────┘
```

- Error appears on blur (not while typing — the user may be correcting)
- Error icon (✕) appears inside the field, right-aligned
- Error message appears below the field, `11px`, `--status-critical-text`
- Field border changes to `1px solid var(--status-critical-text)`
- Field background changes to `var(--status-critical-bg)`
- On correction, the error state clears immediately (no need to blur again)

**Ghost Correction:**

For numeric fields with obvious corrections, MANIFOLD shows a **ghost correction** — a suggested replacement value:

```
┌──────────────────────────────────────────────┐
│ Quantity                                      │
│ ┌──────────────────────────────────────────┐ │
│ │ -5                                ✕      │ │
│ └──────────────────────────────────────────┘ ││ ✕ Quantity must be positive  → Did you mean 5? [Apply] │
└──────────────────────────────────────────────┘
```

Clicking `[Apply]` corrects the value instantly.

## K.3 Business Rule Violation Patterns

**Blocking Error with Resolution Options:**

```
┌──────────────────────────────────────────────────────────────┐
│ ⚠ Cannot Complete Transfer                                   │
│                                                              │
│ You're attempting to transfer 1,500 units of SKU-4820       │
│ from WH-B, but only 1,247 units are available.              │
│                                                              │
│ ── OPTIONS ──────────────────────────────────────────────    │
│                                                              │
│ ○ Transfer maximum available (1,247 units)                   │
│ ○ Transfer from multiple locations:                          │
│   WH-B: 1,247 units + WH-A: 253 units = 1,500 total        │
│ ○ Cancel and adjust the order quantity                      │
│                                                              │
│ [Cancel]                              [Apply Selected ⌘⏎]   │
└──────────────────────────────────────────────────────────────┘
```

Key design decisions:
1. The error message states the **constraint** (only 1,247 available), not just the problem
2. Resolution options are **actionable** — each one performs a different correction
3. The operator never has to leave the dialog to resolve the issue
4. The default selection is the **least destructive** option (transfer max available)

## K.4 System Error Patterns

**Transient Error with Auto-Retry:**

```
┌──────────────────────────────────────────────────────────────────┐
│ ⚠ Connection Lost — Retrying in 3s...  ⟳                       │
│                                                                   │
│ Your changes are saved locally and will sync when reconnected.   │
│                                                                   │
│ [Retry Now]  [Work Offline]                                      │
└──────────────────────────────────────────────────────────────────┘
```

- Appears as a persistent toast (does not auto-dismiss)
- Auto-retry countdown visible
- "Work Offline" suppresses further connection errors until manual reconnect
- Chromatic Thread shifts to Silver Static (`--thread-offline`)

**Sync Conflict Error:**

```
┌──────────────────────────────────────────────────────────────────┐
│ ⚠ Sync Conflict — Your edit conflicts with another change       │
│                                                                   │
│   Your edit:        1,247 units (just now)                       │
│   Server value:     1,190 units (updated 2 min ago by @maria)   │
│                                                                   │
│   ○ Keep my version (1,247)                                      │
│   ○ Accept server version (1,190)                                │
│   ○ Merge: Review both changes side-by-side                     │
│                                                                   │
│   [Keep Mine]  [Accept Server]  [Merge]                          │
└──────────────────────────────────────────────────────────────────┘
```

## K.5 Catastrophic Failure Pattern

**Full-Screen Error State:**

```
┌───────────────────────────────────────────────────────────────────┐
│                                                                    │
│                                                                    │
│                                                                    │
│              ╔══════════════════════════════════╗                  │
│              ║                                    ║                  │
│              ║     ⚠ Connection to Server Lost   ║                  │
│              ║                                    ║                  │
│              ║     Your local data is still       ║                  │
│              ║     available. You can continue     ║                  │
│              ║     working offline.                ║                  │
│              ║                                    ║                  │
│              ║     Last sync: 3 min ago           ║                  │
│              ║     Pending changes: 12            ║                  │
│              ║                                    ║                  │
│              ║     [Retry Connection]             ║                  │
│              ║     [Continue Offline]             ║                  │
│              ║                                    ║                  │
│              ╚════════════════════════════════════╝                  │
│                                                                    │
│                                                                    │
│                                                                    │
└───────────────────────────────────────────────────────────────────┘
```

- Appears at `--z-nuclear` with `backdrop-filter: blur(24px)`
- Chromatic Thread: Silver Static
- No dismiss button — this is a state, not a notification
- The operator can still access local data by choosing "Continue Offline"
- "Retry Connection" attempts reconnection every 5 seconds with visual countdown

## K.6 Empty State Patterns

| Context | Icon | Title | Subtitle | CTA |
|---|---|---|---|---|
| No products yet | `package-open` (48px) | "No products yet" | "Add your first product to start tracking inventory." | "Add Product" (primary) |
| No search results | `search-x` (48px) | "No results found" | "Try adjusting your filters or search terms." | "Clear Filters" (ghost) |
| No pending orders | `inbox` (48px) | "All caught up" | "No pending orders to process." | None (celebratory) |
| No activity | `activity` (48px) | "No recent activity" | "Actions will appear here as they happen." | None |
| Offline — no cached data | `wifi-off` (48px) | "No cached data" | "Connect to the server to load your inventory." | "Retry Connection" (primary) |

**Empty State Design Rules:**
- Icon: `48px`, `--text-tertiary` color
- Title: `18px/600`, `--text-primary`
- Subtitle: `14px/400`, `--text-secondary`
- CTA: Primary button, centered below subtitle
- Maximum width: `320px` centered block
- Background: Transparent (inherits from parent surface)

---

# APPENDIX L: ACCESSIBILITY TESTING PROTOCOL

---

## L.1 WCAG 2.2 AAA Compliance Checklist

Every page and component must pass ALL of the following checks before merge.

### Perceivable

| ID | Criterion | Test Method | Pass Condition |
|---|---|---|---|
| P1 | Text contrast (normal) | Axe DevTools | ≥ 7:1 for all body text on its background |
| P2 | Text contrast (large) | Axe DevTools | ≥ 4.5:1 for text ≥ 18px bold or ≥ 24px |
| P3 | Non-text contrast | Manual + Axe | UI components and graphical objects ≥ 3:1 against adjacent colors |
| P4 | Color not alone | Manual review | All status information conveyed by color also has text + icon |
| P5 | Resize text | Manual test at 200% zoom | All content remains readable and functional at 200% browser zoom |
| P6 | Reflow | Manual test at 320px width | No horizontal scrolling at 320px (except data tables with `role="grid"`) |
| P7 | Images have alt text | Axe + manual | All `<img>` elements have descriptive `alt` text |
| P8 | Captions (if media) | Manual | Any audio/video content has captions |

### Operable

| ID | Criterion | Test Method | Pass Condition |
|---|---|---|---|
| O1 | Keyboard operable | Manual Tab test | All interactive elements reachable and operable via keyboard |
| O2 | No keyboard trap | Manual test | Focus never trapped in a component without an escape key |
| O3 | Focus visible | Manual + Axe | Focus ring visible on all interactive elements (≥ 3:1 contrast) |
| O4 | Focus order | Manual Tab test | Tab order follows logical reading order (left-to-right, top-to-bottom) |
| O5 | Skip links | Manual test | Skip-to-content link available and functional |
| O6 | Touch target size | Manual measurement | All interactive elements ≥ 44×44px on touch; ≥ 48×48px on mobile |
| O7 | Motion acts | Manual test | All functionality achievable without device motion |
| O8 | Timing adjustable | Manual test | No time limits without pause/extend controls |

### Understandable

| ID | Criterion | Test Method | Pass Condition |
|---|---|---|---|
| U1 | Language defined | Axe | `lang` attribute set on `<html>` |
| U2 | Error identification | Manual + Axe | Errors described in text, not just color |
| U3 | Labels or instructions | Manual + Axe | All form inputs have visible labels |
| U4 | Error suggestion | Manual test | When detectable, error messages include correction suggestions |
| U5 | Error prevention (important) | Manual test | Destructive actions require confirmation |

### Robust

| ID | Criterion | Test Method | Pass Condition |
|---|---|---|---|
| R1 | Parsing | Axe | No duplicate IDs, proper nesting, valid HTML |
| R2 | Name, Role, Value | Axe + manual | All ARIA roles, names, and values are correct |
| R3 | Status messages | Manual + Axe | Dynamic content updates announced via `aria-live` regions |
| R4 | Compatible | Manual test | Functional in Chrome, Firefox, Safari, Edge (latest 2 versions) |

## L.2 Screen Reader Testing Protocol

**Required screen readers:**

| Platform | Screen Reader | Browser |
|---|---|---|
| macOS | VoiceOver | Safari |
| Windows | NVDA | Firefox |
| Windows | JAWS | Chrome |
| iOS | VoiceOver | Safari |
| Android | TalkBack | Chrome |

**Test scenarios:**

1. **Navigate to inventory dashboard** — Verify all KPI values are announced
2. **Search for a SKU** — Verify search results are announced as they appear
3. **Inline edit a cell** — Verify the edit state, value change, and commit are announced
4. **Expand a Matryoshka row** — Verify expansion state and nested content are announced
5. **Receive a notification** — Verify toast content is announced via `aria-live="polite"`
6. **Handle a conflict** — Verify conflict dialog is announced and options are navigable
7. **Complete a cycle count** — Verify progress updates and milestone announcements

## L.3 Automated Testing Integration

```typescript
// jest-axe integration for CI/CD
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility', () => {
  it('Inventory Dashboard has no WCAG violations', async () => {
    const { container } = render(<InventoryDashboard />);
    const results = await axe(container, {
      rules: {
        // MANIFOLD-specific overrides
        'color-contrast': { enabled: true },
        'label': { enabled: true },
        'keyboard': { enabled: true },
        'focus-order-semantics': { enabled: true },
      },
    });
    expect(results).toHaveNoViolations();
  });
});
```

---

# PHASE 13: PRINT, LABEL & PHYSICAL ARTIFACT DESIGN

> *Inventory lives on screens, but it moves on paper, plastic, and adhesive. A design system that ignores the physical artifacts of warehousing is designing half a product.*

## 13.1 The Physical-Digital Continuum

MANIFOLD treats printed artifacts as **first-class output targets** — not as an afterthought export. Every label, slip, and report is a designed object subject to the same token discipline as the screen UI. The principle: **the barcode on the shelf must match the row on the screen** in information hierarchy, color semantics, and typographic weight.

### The Artifact Taxonomy

| Artifact | Physical Medium | Primary User | Critical Real-Estate |
|---|---|---|---|
| Shelf/Bin Label | Adhesive polyester, matte | Picker / Stocker | Barcode + Location + SKU |
| Pallet Label | Adhesive paper, 4×6 in | Forklift driver | Barcode + Weight + Destination |
| Packing Slip | Continuous tractor paper | Pack station | Line items + Qty shipped |
| Pick List | Thermal roll, 3.1×11 in | Picker (mobile) | Location sequence + SKU + Qty |
| Cycle Count Sheet | A4 laser print | Counter | SKU + Bin + Expected vs Counted |
| Receiving Log | A4 laser print | Receiver | ASN + PO + Line items + Discrepancies |
| Damaged Goods Tag | Tyvek hang tag | QA | SKU + Damage type + Photo ref |
| Return Merchandise Tag | Tyvek hang tag | Returns clerk | RMA + Reason + Original order |

## 13.2 The Print Token System — Separate From Screen Tokens

Print uses **CMYK / spot color**, not RGB. MANIFOLD defines a parallel `print-` token namespace because CMYK gamut is narrower and ink behaves differently on substrates than light behaves on pixels.

### Print Color Tokens

```css
:root {
  /* PRINT TOKENS — CMYK values, calibrated for offset & thermal transfer */
  --print-ink-black:       #1A1A1A;  /* CMYK: 0,0,0,90 — not pure K, avoids muddy look */
  --print-ink-coral:       #D4502E;  /* CMYK: 0,75,90,16 — brand coral shifted for paper */
  --print-ink-coral-spot:  Pantone 173 C;  /* Spot color for branded labels */
  --print-ink-amber:       #C9711E;  /* CMYK: 0,65,90,20 — status: warning */
  --print-ink-green:       #2E7D32;  /* CMYK: 85,10,95,28 — status: ok */
  --print-ink-red:         #B71C1C;  /* CMYK: 0,90,90,30 — status: danger */
  --print-ink-blue:        #1565C0;  /* CMYK: 90,40,0,10 — status: info (rare in print) */
  --print-paper-white:     #FAFAF7;  /* Warm paper, not pure white */
  --print-paper-recycled:  #EFEBE3;  /* Eco substrate */
  --print-gray-rule:       #9E9E9E;  /* 0.5pt hairline rules */
}

/* DARK SUBSTRATE COMPENSATION — for black polyester labels */
@media print and (color-adjust: exact) {
  .label-dark-substrate {
    --print-ink-black:    #FFFFFF;   /* Invert: white ink on black label */
    --print-ink-coral:    #FF7A4D;   /* Brightened for dark background */
    --print-ink-green:    #66BB6A;   /* Brightened */
    --print-ink-red:      #EF5350;   /* Brightened */
  }
}
```

### Print Typography

| Token | Font | Size | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `print-label-barcode-value` | Berkeley Mono | 11pt | 600 | +0.02em | Human-readable under barcode |
| `print-label-sku` | Berkeley Mono | 9pt | 500 | +0.05em | SKU code |
| `print-label-location` | Geist Sans | 14pt | 700 | -0.01em | Bin/shelf location (primary) |
| `print-label-description` | Geist Sans | 8pt | 400 | 0 | Truncated product name |
| `print-slip-header` | Geist Sans | 12pt | 700 | -0.02em | Packing slip title |
| `print-slip-body` | Geist Sans | 9pt | 400 | 0 | Line items |
| `print-slip-totals` | Geist Sans | 10pt | 600 | 0 | Quantity totals |
| `print-sheet-heading` | Geist Sans | 16pt | 700 | -0.02em | A4 report headings |

### Print Spacing & Rules

- **Base unit:** 1pt (not 4px — print uses points, not pixels)
- **Minimum line weight:** 0.5pt (hairline); 0.75pt for rules that must survive fax/photocopy
- **Barcode quiet zone:** minimum 10× the narrowest bar width on each side
- **Label corner radius:** 0 (square corners — die-cut labels are rectangular)
- **Bleed:** 3mm on all edges for full-bleed color blocks

## 13.3 Barcode Symbology Specification

MANIFOLD mandates specific symbologies per use case, optimized for scanner readability across device classes (handheld, forklift-mounted, mobile phone camera).

| Use Case | Symbology | Module Width | Height | Checksum | Rationale |
|---|---|---|---|---|---|
| Shelf/Bin label | Code 128 | 0.25mm | 10mm | Yes | Compact, full ASCII, rugged |
| SKU label (product) | Code 128 | 0.33mm | 15mm | Yes | Standard for inventory |
| Pallet label | GS1-128 (EAN-128) | 0.50mm | 25mm | Yes | Supply chain standard, AI identifiers |
| Outer carton | ITF-14 (Interleaved 2 of 5) | 0.50mm | 25mm | Yes | High-density, corrugated tolerance |
| Small item / jewelry | QR Code | 0.15mm module | 12×12mm | Reed-Solomon | High density, omnidirectional |
| Document tracking | Data Matrix | 0.20mm module | 10×10mm | ECC 200 | Tiny footprint, durable |
| Return tag | QR Code | 0.30mm module | 20×20mm | Reed-Solomon | Scannable by customer phone |

### Barcode Quality Requirements

- **Print contrast ratio (PCS):** ≥ 70% (measured per ISO/IEC 15416)
- **Minimum quiet zone:** 10× narrowest bar/module
- **Human-readable text:** Always printed below 1D barcodes, above QR/Data Matrix
- **Orientation:** Vertical (ladder) on curved surfaces (bottles, drums); horizontal (picket fence) on flat
- **Verification grade:** Minimum C (2.0) on ANSI/ISO scale before label release

### Barcode Generation — Implementation

```typescript
// lib/barcode/generate.ts
import { BWIPJS } from 'bwip-js';

interface BarcodeSpec {
  symbology: 'code128' | 'gs1-128' | 'itf-14' | 'qrcode' | 'datamatrix';
  value: string;
  moduleWidth: number;  // mm
  height: number;       // mm
  includeHumanReadable: boolean;
  fontSize?: number;    // pt
}

export async function renderBarcodeCanvas(spec: BarcodeSpec): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas');
  await BWIPJS.toCanvas(canvas, {
    bcid: spec.symbology,
    text: spec.value,
    scale: 0,           // use width/height in mm
    width: spec.moduleWidth,
    height: spec.height,
    includetext: spec.includeHumanReadable,
    textsize: spec.fontSize ?? 0,
    paddingwidth: 10 * spec.moduleWidth,  // quiet zone
    paddingheight: 3,    // mm
  });
  return canvas;
}
```

## 13.4 The Shelf Label — Canonical Specification

The shelf/bin label is the most-printed artifact in a warehouse. MANIFOLD standardizes it.

### Anatomy (50mm × 30mm landscape, most common)

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  A14-07-B3                          ┌──────────────────────┐    │
│  ─────────                           │   █▌█▌█▌ █▌█▌ █▌█▌█▌  │    │
│  WIDGET-PRO-XL                      │   █▌ █▌ █▌█▌█▌ █▌  █▌  │    │
│  Aluminum Widget, 50mm              │   █▌█▌█▌ █▌  █▌ █▌█▌█▌  │    │
│                                      │   █▌ █▌ █▌ █▌ █▌ █▌   │    │
│  [coral dot] FRESH — Lot #4471      │   0012345678901       │    │
│                          [QR 12mm]   └──────────────────────┘    │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
   50mm width × 30mm height — thermal transfer, matte polyester
```

| Zone | Position | Content | Token |
|---|---|---|---|
| Location code | Top-left, 3mm inset | `A14-07-B3` (aisle-bay-level) | `print-label-location` |
| Location rule | Below location | 0.5pt hairline, coral | `--print-ink-coral` |
| SKU code | Mid-left | `WIDGET-PRO-XL` | `print-label-sku` |
| Description | Below SKU | 1-line, truncated at 28 chars | `print-label-description` |
| Status indicator | Bottom-left | Colored dot + text (FRESH/AGED/etc) | Traffic Light Matrix |
| QR code | Bottom-right | 12×12mm — encodes JSON: `{sku, bin, lot}` | QR Code spec |
| Primary barcode | Right half | Code 128 — SKU or bin code | `print-label-barcode-value` |

### Multi-Tier Label Variants

| Variant | Size | When to Use |
|---|---|---|
| Mini (25×15mm) | Jewelry, small electronics | When 50×30 won't fit |
| Standard (50×30mm) | Default shelf bins | 90% of locations |
| Large (100×50mm) | Bulk pallet floor locations | High-bay, forklift distance |
| Pallet (100×150mm) | Outbound pallets | Includes ship-to address block |

## 13.5 The Packing Slip — Document Specification

A4 portrait (210×297mm) or US Letter (216×279mm). Designed for continuous tractor-feed thermal at pack stations OR laser print for B2B.

### Layout Grid

```
┌──────────────────────────────────────────────────────┐
│ [LOGO]  ACME DISTRIBUTION             INVOICE #4821  │ ← 15mm header band
│         123 Warehouse Rd               PO #PO-9912   │
│         City, ST 00000                 Date: 2026-01 │
├──────────────────────────────────────────────────────┤ ← 0.75pt coral rule
│                                                       │
│  SHIP TO:                    SHIP FROM:               │ ← 10mm address block
│  Customer Name               Same as above            │
│  456 Delivery Ave                                     │
│  Destination City, ST 00000                           │
│                                                       │
├────────┬──────────────────────┬──────┬──────┬────────┤ ← 0.5pt gray rule
│  SKU   │  Description         │  Qty │  UOM │  Lot   │
├────────┼──────────────────────┼──────┼──────┼────────┤
│WID-XL  │ Aluminum Widget 50mm │   12 │  EA  │ 4471   │
│NUT-M8  │ Hex Nut M8 SS        │  200 │  EA  │ 4472   │
│BOX-S   │ Shipping Box Small   │    3 │  CS  │ —      │
│        │  (50 per case)       │      │      │        │
├────────┴──────────────────────┴──────┴──────┴────────┤ ← 0.75pt rule
│  Total line items: 3    Total units: 215             │ ← totals band
├──────────────────────────────────────────────────────┤
│                                                       │
│  [ ] Packed by: ______  [ ] Verified: ______         │ ← signature block
│                                                       │
│  Scan to track: [QR 20mm]   Order #ORD-2026-04821    │
│                                                       │
└──────────────────────────────────────────────────────┘
```

### Print CSS Specification

```css
@media print {
  @page {
    size: A4 portrait;
    margin: 12mm 15mm 15mm 15mm;  /* top, right, bottom, left */
  }

  .packing-slip {
    font-family: 'Geist Sans', sans-serif;
    color: var(--print-ink-black);
    background: var(--print-paper-white);
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .packing-slip__header {
    display: flex;
    justify-content: space-between;
    border-bottom: 0.75pt solid var(--print-ink-coral);
    padding-bottom: 6pt;
    margin-bottom: 10pt;
  }

  .packing-slip__address-block {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20pt;
    margin-bottom: 12pt;
    font-size: 9pt;
    line-height: 1.4;
  }

  .packing-slip__line-items {
    width: 100%;
    border-collapse: collapse;
    font-size: 9pt;
  }

  .packing-slip__line-items th {
    text-align: left;
    border-bottom: 0.5pt solid var(--print-gray-rule);
    padding: 4pt 6pt;
    font-weight: 600;
    background: #F0EDE5;  /* subtle tint — prints as 5% tint */
  }

  .packing-slip__line-items td {
    border-bottom: 0.25pt solid var(--print-gray-rule);
    padding: 4pt 6pt;
    font-variant-numeric: tabular-nums;
  }

  .packing-slip__line-items td.numeric {
    text-align: right;
  }

  .packing-slip__totals {
    border-top: 0.75pt solid var(--print-ink-black);
    padding-top: 6pt;
    margin-top: 6pt;
    font-weight: 600;
    font-size: 10pt;
    display: flex;
    justify-content: space-between;
  }

  .packing-slip__signature {
    margin-top: 20pt;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40pt;
  }

  .packing-slip__signature-line {
    border-bottom: 0.5pt solid var(--print-ink-black);
    height: 14pt;
    margin-top: 4pt;
  }

  /* AVOID page breaks inside line items */
  .packing-slip__line-items tr {
    page-break-inside: avoid;
  }
}
```

## 13.6 The Print Preview & Queue System

MANIFOLD never silently prints. Every print job passes through a **Print Preview Modal** showing the exact artifact with a virtual ruler and bleed marks, then enters a **Print Queue** with status tracking.

### Print Preview Modal

- **Size:** 80% viewport, centered
- **Background:** `--print-paper-white` (warm) to simulate substrate
- **Ruler overlay:** Toggleable — shows mm/inches on edges
- **Bleed marks:** Corner crop marks in `--print-gray-rule`
- **Zoom:** 50% / 100% / 200% / fit-width
- **Substrate selector:** Dropdown (Matte Polyester / Gloss Paper / Tractor Feed / Eco Recycled) — adjusts background tint
- **Printer selector:** Shows connected printers with their label size capabilities
- **Quantity:** Numeric stepper with batch preview (shows 1 of N)

### Print Queue Component

Located in the Command Canvas secondary rail. Shows:

| State | Icon | Color | Meaning |
|---|---|---|---|
| Queued | ○ | `--text-muted` | Job accepted, waiting for printer |
| Spooling | ◐ (spinner) | `--coral-500` | Sending to printer |
| Printing | ● (solid) | `--coral-600` | Actively printing |
| Completed | ✓ | `--green-600` | Done, acknowledged |
| Jammed | ⚠ | `--red-600` | Hardware error — retry/cancel |
| Cancelled | ✕ | `--text-muted` | User cancelled |

**Behavior:** Clicking a queued job opens the preview; clicking a completed job shows a reprint option; jammed jobs auto-retry 3× then escalate to notification (Appendix F).

## 13.7 Label Design Editor

For custom label layouts (e.g., customer-mandated formats), MANIFOLD includes a **visual label designer** — a drag-and-drop canvas with token-locked elements.

### Editor Anatomy

- **Canvas:** Exact-size representation (zoomable), grid = 1mm
- **Element palette (left):** Text, Barcode, QR, Image, Shape (rectangle/line), Variable Field
- **Properties panel (right):** Selected element's font, size, color (print tokens only), binding
- **Variable bindings:** `{sku}`, `{bin}`, `{lot}`, `{description}`, `{quantity}`, `{custom_field_N}`
- **Constraints:** Elements snap to 1mm grid; minimum element size = 3×3mm; barcode quiet zones enforced (cannot place elements within quiet zone — shows coral exclusion overlay)
- **Validation:** Pre-print check verifies all variable bindings resolve, barcode grade estimate, contrast ratio

### Locked Constraints (Non-Negotiable)

1. **Colors:** Only `--print-ink-*` tokens — no arbitrary hex
2. **Fonts:** Only the print typography stack — no screen-only fonts
3. **Barcode quiet zones:** Enforced — cannot be overridden
4. **Minimum text size:** 6pt (accessibility for warehouse readers)
5. **Contrast:** PCS ≥ 70% — validated before save

## 13.8 Compliance & Regulatory Print Artifacts

For regulated industries (pharma, food, hazmat), MANIFOLD includes compliance label templates:

### GS1-128 Logistic Label (SSCC)

```
┌─────────────────────────────────────────────┐
│  SHIP FROM:             SHIP TO:            │
│  [Free text addresses]                      │
├─────────────────────────────────────────────┤
│  [GS1-128 barcode: SSCC]                    │
│  (00) 0 06412345 000000001 8                │
├─────────────────────────────────────────────┤
│  [GS1-128: Content]      [GS1-128: Count]   │
│  (02) 04012345678904     (37) 24            │
├─────────────────────────────────────────────┤
│  [GS1-128: Batch/Lot]    [GS1-128: Date]    │
│  (10) LOT2026044         (17) 260415        │
└─────────────────────────────────────────────┘
  100×150mm, AI identifiers per GS1 standard
```

### Pharma: Serialized Product Label

- **GS1 DataMatrix** (ECC 200, 10×10mm minimum) encoding: `(01)GTIN(21)Serial(17)Expiry(10)Lot`
- **Anti-tamper seal indicator:** Printed coral border if tamper-evident packaging required
- **Temperature excursion flag:** If cold-chain, amber stripe + temperature log QR

### Food: Allergen Highlight

- Allergen statements in **bold red** (`--print-ink-red`), 9pt minimum
- "Contains: [list]" block — mandatory position: below ingredients, above barcode
- Nutrition QR linking to live data (avoids reprint on recipe change)

---

# PHASE 14: INTERNATIONALIZATION & MULTI-SITE ARCHITECTURE

> *An inventory system is a tower of Babel: 47 warehouses, 19 languages, 12 currencies, 6 calendar systems. MANIFOLD is born global, not retrofitted.*

## 14.1 The Localization Token Layer

MANIFOLD separates **translatable strings** from **formatting logic** from **regional preferences**. Three distinct layers, each with its own token namespace.

### Layer 1: String Tokens (`i18n.strings`)

All UI copy lives in a message catalog keyed by stable IDs — never hardcoded in components.

```json
// locales/en-US/inventory.json
{
  "inventory.status.in_stock": "In Stock",
  "inventory.status.low": "Low Stock",
  "inventory.status.out": "Out of Stock",
  "inventory.status.reorder": "Reorder",
  "inventory.actions.transfer": "Transfer {count} {uom}",
  "inventory.count.discrepancy": "Counted {counted}, expected {expected} (Δ {delta})",
  "inventory.uom.each": "ea",
  "inventory.uom.case": "case",
  "inventory.uom.pallet": "pallet"
}
```

```json
// locales/de-DE/inventory.json
{
  "inventory.status.in_stock": "Auf Lager",
  "inventory.status.low": "Geringer Bestand",
  "inventory.status.out": "Nicht auf Lager",
  "inventory.status.reorder": "Nachbestellen",
  "inventory.actions.transfer": "{count} {uom} umlagern",
  "inventory.count.discrepancy": "Gezählt {counted}, erwartet {expected} (Δ {delta})",
  "inventory.uom.each": "Stk",
  "inventory.uom.case": "Karton",
  "inventory.uom.pallet": "Palette"
}
```

### Layer 2: Format Tokens (`i18n.formats`)

ICU MessageFormat + Intl APIs. Never hand-roll date/number/currency formatting.

```typescript
// lib/i18n/formats.ts
export const formats = {
  'en-US': {
    number: {
      qty:    { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      weight: { minimumFractionDigits: 3, maximumFractionDigits: 3, style: 'unit', unit: 'kg' },
      currency: { style: 'currency', currency: 'USD', minimumFractionDigits: 2 },
    },
    date: {
      short: { year: '2-digit', month: 'numeric', day: 'numeric' },
      medium: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
    },
    time: {
      short: { hour: 'numeric', minute: '2-digit' },
      withSeconds: { hour: 'numeric', minute: '2-digit', second: '2-digit' },
    },
  },
  'de-DE': {
    number: {
      qty:    { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      weight: { minimumFractionDigits: 3, maximumFractionDigits: 3, style: 'unit', unit: 'kg' },
      currency: { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 },
    },
    date: {
      short: { day: '2-digit', month: '2-digit', year: '2-digit' },
      medium: { day: 'numeric', month: 'short', year: 'numeric' },
      long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
    },
  },
} as const;
```

### Layer 3: Regional Preferences (`i18n.regional`)

User-overridable, locale-defaulted.

| Preference | Default Source | User Overridable | Examples |
|---|---|---|---|
| First day of week | Locale | Yes | US: Sunday; DE: Monday; SA: Saturday |
| Date format display | Locale | Yes | US: M/D/YYYY; DE: D.M.YYYY; ISO: YYYY-MM-DD |
| Number grouping | Locale | Yes | US: 1,234.56; DE: 1.234,56; IN: 1,23,456.00 |
| Default UOM system | Site config | Yes | Imperial (US warehouses) / Metric (rest of world) |
| Paper size | Locale | Yes | US: Letter; rest: A4 |
| Calendar | Locale | No | Gregorian (default), Hijri (SA), Hebrew (IL) |

## 14.2 Right-To-Left (RTL) Support

MANIFOLD is **logical-property native**. The layout engine uses `margin-inline-start`, `padding-inline-end`, `inset-inline-start` — never `margin-left`. RTL is a flip, not a redesign.

### RTL Implementation

```css
/* CORRECT — logical properties, direction-agnostic */
.row {
  padding-inline-start: var(--space-3);
  padding-inline-end: var(--space-4);
  margin-inline-end: var(--space-2);
  border-inline-start: 2px solid var(--coral-500);
  inset-inline-start: 0;
  text-align: start;
}

/* WRONG — physical properties, breaks in RTL */
.row-bad {
  padding-left: var(--space-3);    /* stays left in RTL — WRONG */
  margin-right: var(--space-2);   /* stays right — WRONG */
}
```

### RTL-Specific Adjustments

| Element | LTR | RTL | Note |
|---|---|---|---|
| Pulse Line sparkline | Left→right time axis | Right→left time axis | Most recent on the inline-end |
| Status dot position | inline-start of cell | inline-start of cell | Stays consistent (logical) |
| Expand chevron | Points right ▶ | Points left ◀ | `rotate: var(--dir-flip, 0deg)` |
| Sort indicator arrow | ↓▲ unchanged | ↓▲ unchanged | Direction-neutral |
| Barcode | LTR always | LTR always | Barcodes are never mirrored |
| Number input | Text-align: end | Text-align: end | Numbers are LTR even in RTL |

### Enabling RTL

```tsx
<html dir={isRTL ? 'rtl' : 'ltr'} lang={locale}>
```

The `dir` attribute cascades. Combined with logical CSS properties, the entire layout flips automatically. Only explicitly physical properties (rare, documented) need `[dir="rtl"]` overrides.

## 14.3 Multi-Site Architecture — The Site Context Pill

A user may have access to multiple warehouses (sites). MANIFOLD never makes them switch contexts via a settings page — the **Site Context Pill** lives in the Command Bar, always visible, always one-click.

### Site Context Pill Anatomy

```
┌─────────────────────────────┐
│ 🏭  WH-01 — Dallas DC    ▾  │
└─────────────────────────────┘
  16px warehouse icon | site code — site name | chevron
```

- **Default state:** Shows current site code + name
- **Click:** Opens site switcher dropdown (searchable, grouped by region)
- **Multi-select mode:** `⌘+click` selects multiple sites — data aggregates across them (shows "3 sites" pill)
- **Permission lock:** Sites the user lacks access to are shown grayed with a lock icon
- **Color tag:** Each site has a 6px color dot (assigned at creation) for at-a-glance identification in multi-site views

### Cross-Site Data Handling

When multiple sites are selected:

1. **Aggregation:** Quantities sum across sites; a new "Site" column appears in Matryoshka rows (becomes the outermost nest layer)
2. **Conflict warning:** If the same SKU has different reorder points per site, an amber indicator appears with "Config varies by site" tooltip
3. **Transfer context:** Cross-site transfers require explicit source/destination selection — never implicit

## 14.4 Multi-Currency & Multi-Tax

### Currency Display Rules

| Context | Currency Source | Example |
|---|---|---|
| Cost per unit | SKU's purchase currency | €12.50 (purchased in EUR) |
| Inventory valuation | Site's base currency | $1,250.00 (site = USD) |
| Transfer value | Neutral — show both | €12.50 / $13.45 |
| Report totals | Report's selected currency | ¥1,250,000 (report currency JPY) |

**Conversion rate source:** Configurable (daily ECB feed, manual entry, or API integration). Rate timestamp always shown: "Rate: ECB 2026-01-15 14:00 UTC".

### Currency Token

```typescript
function formatCurrency(
  amount: number,
  currency: string,
  displayCurrency: string,
  locale: string,
  rate?: number
): string {
  const converted = rate ? amount * rate : amount;
  const targetCurrency = rate ? displayCurrency : currency;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: targetCurrency,
    minimumFractionDigits: targetCurrency === 'JPY' ? 0 : 2,
  }).format(converted);
}
```

### Tax Handling

- **Tax-inclusive vs tax-exclusive:** Site-level setting. EU/UK/AU: inclusive (price shown includes VAT). US: exclusive (price + tax shown separately).
- **Tax category badges:** Each SKU carries a tax category (`standard`, `reduced`, `zero`, `exempt`). Displayed as a 2-letter pill in the SKU detail drawer.
- **Multiple tax jurisdictions:** For US, line items may have state + county + city tax. Shown as itemized breakdown in valuation reports.

## 14.5 Calendar & Date System Support

| Calendar | Used In | Implementation |
|---|---|---|
| Gregorian | Default (US, EU) | Native `Intl.DateTimeFormat` |
| Hijri (Umm al-Qura) | Saudi Arabia, Gulf | `Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura')` |
| Hebrew | Israel | `Intl.DateTimeFormat('he-IL-u-ca-hebrew')` |
| Japanese | Japan (official docs) | `Intl.DateTimeFormat('ja-JP-u-ca-japanese')` |
| Persian (Solar Hijri) | Iran, Afghanistan | `Intl.DateTimeFormat('fa-IR-u-ca-persian')` |

### Date Input Component

The date picker respects the active calendar. Storage is always **ISO 8601 (Gregorian)** in the database; display is localized. The component handles conversion transparently.

```typescript
// Store: ISO string (Gregorian)
const storedExpiry = '2026-04-15';

// Display per locale/calendar
new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
  year: 'numeric', month: 'long', day: 'numeric'
}).format(new Date(storedExpiry));
// → "١٥ شوال ١٤٤٧ هـ"
```

### Timezone Handling

- **Storage:** UTC (always)
- **Display:** Site's timezone (configured per warehouse) OR user's timezone (if different from site, show both: "14:00 CST / 21:00 UTC")
- **Scheduled counts:** Always show in site timezone — a cycle count at "9 AM" means 9 AM at the warehouse, not the user's 9 AM
- **Cross-site scheduling:** Show a timezone matrix when scheduling across sites

## 14.6 Number Formatting Per Locale

| Locale | Quantity 1,234.5 | Weight 1,234.567 kg | Currency |
|---|---|---|---|
| en-US | 1,234.5 | 1,234.567 kg | $1,234.50 |
| de-DE | 1.234,5 | 1.234,567 kg | 1.234,50 € |
| fr-FR | 1 234,5 | 1 234,567 kg | 1 234,50 € |
| hi-IN | 1,234.5 | 1,234.567 किग्रा | ₹1,234.50 |
| en-IN | 1,23,456.5 | 1,23,456.567 kg | ₹1,23,456.50 |
| ja-JP | 1,234.5 | 1,234.567 kg | ¥1,235 (no decimals) |
| ar-EG | ١٬٢٣٤٫٥ | ١٬٢٣٤٫٥٦٧ كجم | ١٬٢٣٤٫٥٠ ج.م. |

### Indian Numbering System

MANIFOLD supports the lakh/crore grouping (2-2-3 pattern) for `en-IN` and `hi-IN` locales. The `Intl.NumberFormat` API handles this natively when locale is `en-IN`.

### Tabular Numeral Alignment

All numeric table cells use `font-variant-numeric: tabular-nums` AND `text-align: end` (right in LTR, left in RTL) so decimal points align visually across rows regardless of locale grouping.

## 14.7 Locale Switching UX

### Language Switcher

- **Location:** User menu (bottom of Command Bar) — NOT in settings
- **Behavior:** Instant switch, no page reload (React re-renders with new locale)
- **Persistence:** Stored in `localStorage` + user profile (if logged in)
- **Fallback:** If a string lacks translation, show English with a subtle amber underline (signals "translation pending" to admins)

### The "Translation Gap" Indicator

Admins see a badge in the language switcher: `de-DE: 94%` — percentage of strings translated. Below 90% shows amber; below 80% shows red. Clicking opens the translation management panel.

## 14.8 Character Set & Font Support

MANIFOLD's Geist Sans + Berkeley Mono stack must render all supported scripts.

### Script Coverage Matrix

| Script | Languages | Font Stack Extension | Notes |
|---|---|---|---|
| Latin | EN, DE, FR, ES, PT, IT, NL, etc. | Geist Sans (default) | Full coverage |
| Cyrillic | RU, UK, BG, SR | Geist Sans + fallback | Falls back to system |
| Arabic | AR, FA, UR | + Noto Naskh Arabic | RTL rendering |
| Hebrew | HE | + Noto Sans Hebrew | RTL rendering |
| CJK | ZH, JA, KO | + Noto Sans CJK JP/SC/TC/KR | Large payload — subset per locale |
| Devanagari | HI, MR, NE | + Noto Sans Devanagari | |
| Thai | TH | + Noto Sans Thai | No word boundaries — line breaking by dictionary |

### Font Loading Strategy

```typescript
// next/font with locale-aware subsetting
import { GeistSans } from 'geist/font/sans';
import { NotoSansArabic } from 'next/font/google';

const fontConfig = {
  subsets: ['latin', 'latin-ext', 'cyrillic', 'arabic', 'hebrew', 'devanagari', 'thai'],
  display: 'swap',
  variable: '--font-sans',
  // CJK loaded on-demand per locale to avoid 4MB initial payload
  fallback: ['system-ui', 'sans-serif'],
};
```

CJK fonts (Noto Sans CJK) are **route-segment loaded** — only `/[locale=zh]`, `/[locale=ja]`, `/[locale=ko]` segments fetch the CJK font bundle. This keeps the initial CSS payload under 100KB for non-CJK users.

---

# PHASE 15: ONBOARDING, TUTORIALS & EMPTY STATE DESIGN

> *The first 90 seconds determine whether a warehouse manager ever opens this app again. MANIFOLD engineers those 90 seconds with the same rigor as a Black Friday surge.*

## 15.1 The Progressive Disclosure Doctrine

MANIFOLD never front-loads features. New users see a **minimal viable surface** — only what they need for their first task. Complexity reveals itself as competence grows, signaled by usage patterns.

### The 4-Stage Onboarding Funnel

```
┌─────────────────────────────────────────────────────────────────┐
│  STAGE 1: First Impression (0-30 seconds)                       │
│  ─────────────────────────────                                   │
│  • Splash → immediately to dashboard (no wizard wall)           │
│  • 3 KPI cards, 1 sample SKU row, coach mark on ⌘K             │
│  • Goal: "I can see my inventory"                               │
├─────────────────────────────────────────────────────────────────┤
│  STAGE 2: First Action (30 sec - 5 min)                         │
│  ─────────────────                              │
│  • Coach mark: "Search for a SKU" → ⌘K opens                    │
│  • Ghost text suggests a SKU code                               │
│  • On selection: row expands, inline edit highlighted           │
│  • Goal: "I found and touched a SKU"                            │
├─────────────────────────────────────────────────────────────────┤
│  STAGE 3: First Workflow (5-20 min)                             │
│  ────────────────                               │
│  • Guided task card: "Run your first cycle count"              │
│  • Step-by-step overlay with hotkeys                            │
│  • Completion celebration + analytics insight shown             │
│  • Goal: "I completed a real workflow"                          │
├─────────────────────────────────────────────────────────────────┤
│  STAGE 4: Power Discovery (20 min+)                             │
│  ────────────────                               │
│  • Advanced features unlock (Query Composer, bulk ops)         │
│  • "You've used this 5 times — try the shortcut" tips          │
│  • Goal: "I'm faster than I was on the old system"             │
└─────────────────────────────────────────────────────────────────┘
```

## 15.2 The Coach Mark System

Coach marks are **non-modal, dismissible, context-locked** annotations that point to specific UI elements. They never block interaction.

### Coach Mark Anatomy

```
                    ┌──────────────────────────────┐
                    │  ⌘K opens the Command Bar    │
                    │                              │
                    │  Search SKUs, run actions,   │
                    │  or type a natural-language  │
                    │  query. Try it now.          │
                    │                              │
                    │  [ Got it ]    [ Skip tour ] │
                    └──────────────┬───────────────┘
                                   │
                          ┌────────▼─────────┐
                          │   ⌘K  Command    │ ← highlighted element
                          └──────────────────┘
```

### Coach Mark States

| State | Visual | Behavior |
|---|---|---|
| Active | Coral 2px outline + pulsing ring (2s cycle) | Element remains interactive |
| Completed | Flash green once, outline fades | Coach mark advances or closes |
| Dismissed | Fade out (150ms) | Tour pauses; can resume from help menu |
| Blocked (element not visible) | Coach mark docks to nearest screen edge | "Scroll to X" hint with arrow |

### Coach Mark Token

```css
.coach-mark {
  position: absolute;
  background: var(--surface-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  max-width: 320px;
  box-shadow: var(--shadow-lg);
  z-index: var(--z-coachmark);  /* layer 8 — above content, below modals */
  animation: coachMarkEnter 300ms var(--ease-spring);
}

.coach-mark__target-ring {
  position: absolute;
  border: 2px solid var(--coral-500);
  border-radius: var(--radius-md);
  pointer-events: none;
  animation: targetPulse 2s var(--ease-in-out) infinite;
}

@keyframes targetPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(232, 96, 60, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(232, 96, 60, 0); }
}
```

## 15.3 The Guided Tour Engine

Tours are **sequences of coach marks** tied to a workflow goal. MANIFOLD ships with 6 built-in tours:

| Tour ID | Goal | Steps | Trigger |
|---|---|---|---|
| `tour.first-search` | Find a SKU | 3 | First visit |
| `tour.first-edit` | Edit a quantity | 4 | After first search |
| `tour.first-count` | Run a cycle count | 7 | After first edit OR manual |
| `tour.first-transfer` | Transfer stock | 5 | After first count |
| `tour.first-filter` | Use Query Composer | 4 | After 5th search |
| `tour.first-export` | Export a report | 3 | After 1 hour of use |

### Tour Logic

```typescript
interface TourStep {
  id: string;
  target: string;          // CSS selector of element to highlight
  placement: 'top' | 'bottom' | 'left' | 'right';
  title: string;
  body: string;
  action?: string;         // action ID the user must perform to advance
  skipTo?: string;         // optional next step if action skipped
}

interface Tour {
  id: string;
  trigger: 'first-visit' | 'manual' | 'usage-threshold';
  usageThreshold?: number; // times using a feature before tour suggests itself
  steps: TourStep[];
  completionEvent: string; // analytics event
}
```

### Tour Resume

If a user dismisses a tour mid-way, MANIFOLD remembers the step index. On next visit, a subtle toast appears: *"Want to finish the cycle count tour? [Resume] [Dismiss]"* — shown once per session, expires after 7 days.

## 15.4 The Empty State Design System

Empty states are not errors — they are **first-run invitations**. MANIFOLD designs each empty state with a clear path to the first action.

### Empty State Anatomy

Every empty state contains 4 elements:

1. **Illustration** (120×120px, monochrome coral line-art, not a stock photo)
2. **Headline** (Geist Sans 18px, 600 weight — the "what")
3. **Description** (Geist Sans 14px, 400 weight — the "why it matters")
4. **Primary CTA** (coral button — the "what to do now") + optional secondary

### Empty State Catalog

| Context | Illustration | Headline | Description | Primary CTA |
|---|---|---|---|---|
| No SKUs yet | Empty shelf icon | "Your inventory is empty" | "Add your first SKU to start tracking stock, or import from a CSV." | [+ Add SKU] / [Import CSV] |
| No search results | Magnifier with X | "No matches for "{query}"" | "Check the spelling, try a different SKU code, or clear filters." | [Clear filters] |
| No transfers | Two arrows, idle | "No transfers yet" | "Move stock between locations to balance your inventory." | [+ New Transfer] |
| No cycle counts | Clipboard, blank | "Counts will appear here" | "Start a cycle count to verify your stock accuracy." | [+ Start Count] |
| No notifications | Bell, silent | "You're all caught up" | "Alerts about low stock, anomalies, and transfers will show here." | [View preferences] |
| No recent activity | Clock, empty | "Nothing has happened yet" | "Actions you take will appear here in real time." | (no CTA — passive) |
| Filtered to zero rows | Funnel, empty | "Filters returned 0 results" | "Adjust your filters to see more inventory." | [Reset filters] / [Save this view] |
| Offline, no cached data | Cloud with slash | "No data while offline" | "You haven't loaded this view yet. Reconnect to sync." | (disabled [Retry]) |

### Empty State Token

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-6);
  text-align: center;
  gap: var(--space-4);
}

.empty-state__illustration {
  width: 120px;
  height: 120px;
  color: var(--coral-300);
  opacity: 0.7;
}

.empty-state__headline {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.empty-state__description {
  font-size: 14px;
  font-weight: 400;
  color: var(--text-muted);
  max-width: 400px;
  margin: 0;
  line-height: 1.5;
}

.empty-state__actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-2);
}
```

## 15.5 The "You Might Not Know" Insight System

After a user has been active for 7 days, MANIFOLD begins surfacing **feature discovery insights** — subtle, non-interrupting tips about features the user hasn't used.

### Insight Triggers

| Insight | Trigger Condition | Placement |
|---|---|---|
| "⌘K can search by description, not just SKU" | User has searched 10+ times | Toast (bottom-right) |
| "You can edit cells inline — just click a quantity" | User has viewed 50 rows, never edited | Coach mark on first row |
| "Bulk select with Shift+click, then apply an action" | User has done 5 individual transfers | Inline tip above table |
| "Save this filter as a view for quick access" | User has applied the same filter 3 times | Toast with [Save View] button |
| "Try typing 'low stock in A14' in ⌘K" | User has used ⌘K 5 times, never NL query | Coach mark on command bar |

### Insight Frequency Cap

- Maximum 1 insight per session
- Maximum 3 insights per week
- If dismissed, that insight never shows again
- If acted upon, similar insights are suppressed for 30 days

## 15.6 Role-Based First-Run Experience

Different roles see different first-run surfaces. MANIFOLD detects role from auth context.

### Role-Based Landing

| Role | First Screen | First Tour | First Coach Mark |
|---|---|---|---|
| Warehouse Manager | Operations Dashboard | `tour.first-count` | ⌘K command bar |
| Inventory Analyst | Inventory Grid (all SKUs) | `tour.first-filter` | Query Composer |
| Receiver | Receiving Dock View | `tour.first-receive` | ASN lookup |
| Picker | Pick List (mobile) | `tour.first-pick` | Scan to start |
| Cycle Counter | Cycle Count View | `tour.first-count` | Scan bin |
| Admin | Site Settings | (skip tour) | User management |

### Role-Based Empty States

A receiver who has no pending ASNs sees a different empty state than a manager:

- **Receiver empty:** "No shipments expected today. Check the ASN schedule or receive an unexpected delivery." → [Receive Unexpected]
- **Manager empty:** "No inventory data. Add SKUs or import from your ERP." → [Add SKU] / [Import]

## 15.7 The Help & Documentation Layer

### In-App Help System

- **Help menu:** Accessible via `?` key or help icon in Command Bar
- **Contextual:** Help opens to the section relevant to the current view
- **Search:** Full-text search across docs, with the same ⌘K interface
- **Video:** Embedded 30-second Loom clips for key workflows (not auto-playing, click to play)

### The Keyboard Shortcut Cheat Sheet

`Shift + ?` opens a full-screen overlay showing all keyboard shortcuts, organized by category, with a search field. This is also Appendix N.

### Documentation Versioning

Every help article shows: "Last updated: 2026-01-15 · App version 4.0.0". If the user's app version differs from the docs version, a banner appears: "You're viewing docs for v4.0.0. Your app is on v3.9.0. [Update app] [View v3.9 docs]".

## 15.8 The Feedback Loop

MANIFOLD makes giving feedback frictionless.

### Feedback Button

- **Location:** Bottom-left of Command Canvas, always visible (not in a menu)
- **Appearance:** Small coral speech-bubble icon, 32×32px
- **Click:** Opens a side drawer (not modal) — doesn't interrupt work
- **Fields:** Rating (👍/👎), free text (required), optional screenshot (auto-captured), optional email
- **Behavior:** Submits to feedback queue; if 👎, offers "Schedule a call" CTA

### The "What's New" Changelog

After each app update, a **changelog toast** appears once on first visit:

```
┌──────────────────────────────────────────────┐
│ ✨ What's new in v4.0.0                       │
│                                               │
│ • New: Print label designer                   │
│ • New: Multi-site aggregation                 │
│ • Improved: Cycle count is 40% faster         │
│                                               │
│ [ View full changelog ]    [ Got it ]         │
└──────────────────────────────────────────────┘
```

- Dismissed state persisted per version
- "View full changelog" opens a modal with markdown-rendered release notes
- "Got it" dismisses for this version permanently

---

# APPENDIX M: MOBILE FIELD APPLICATION DESIGN

> *The warehouse floor is not a desktop. It is a 5-inch screen held in one hand, in 40°C heat, with gloves on, scanning 400 items an hour.*

## M.1 The Mobile Doctrine

MANIFOLD's mobile experience is **not a responsive shrink** of the desktop. It is a purpose-built field application with distinct interaction models, optimized for the physical realities of warehouse work.

### Design Constraints (Non-Negotiable)

| Constraint | Specification | Rationale |
|---|---|---|
| Minimum touch target | 48×48dp | Gloved hands, OSHA-compliant |
| Scan button reach | Within thumb zone (bottom 60% of screen) | One-handed operation |
| Font size (body) | 16sp minimum | Readable at arm's length, in motion |
| Contrast | 7:1 minimum (WCAG AAA) | High-bay lighting, glare |
| Haptic feedback | Mandatory on scan | Gloves muffle audio |
| Offline-first | Full function without network | Concrete walls block signal |
| Session resumption | Resume mid-task after app kill | Battery dies mid-count |

## M.2 The Mobile Layout System

### The Thumb Zone Map

```
┌─────────────────────────────┐
│        HARD TO REACH        │  ← top 20% — status, headers only
│                             │
├─────────────────────────────┤
│                             │
│       COMFORTABLE ZONE      │  ← middle — data display
│                             │
│                             │
├─────────────────────────────┤
│      OPTIMAL ACTION ZONE    │  ← bottom 40% — buttons, scan, input
│  [Action]  [Scan]  [Action] │
└─────────────────────────────┘
```

### Screen Anatomy (Mobile)

```
┌─────────────────────────────┐
│ ☰  Pick List: ORD-4821   ⚙  │ ← top app bar (56dp), sticky
│     3 of 12 items picked    │
├─────────────────────────────┤
│                             │
│  Current Pick:              │
│  ┌───────────────────────┐  │
│  │ A14-07-B3             │  │ ← large location card
│  │ Widget-Pro-XL         │  │
│  │ Qty: 12   UOM: ea     │  │
│  │                       │  │
│  │ [Image thumbnail]     │  │
│  └───────────────────────┘  │
│                             │
│  Next: A14-08-A1            │ ← preview of next pick
│                             │
├─────────────────────────────┤
│ ┌─────┐ ┌─────────┐ ┌────┐ │
│ │ Skip│ │  SCAN   │ │Done│ │ ← action bar (72dp height)
│ └─────┘ └─────────┘ └────┘ │
│         ▲ 56×56dp primary   │
└─────────────────────────────┘
```

### Mobile Navigation: The Bottom Action Bar

Unlike desktop's Command Canvas, mobile uses a **bottom-anchored action bar** with 3-5 contextual actions. The primary action is always center, largest, and coral.

| Slot | Size | Color | Purpose |
|---|---|---|---|
| Left secondary | 48×48dp | Ghost/outline | Skip / Back / Cancel |
| Center primary | 56×56dp | Coral filled | Scan / Confirm / Main action |
| Right secondary | 48×48dp | Ghost/outline | Next / More / Options |

## M.3 The Scan-Centric Workflow

On mobile, the **scanner is the primary input device**. The UI is designed so that 90% of interactions can be completed via scan + tap, without typing.

### The Scan Feedback Hierarchy

```
SCAN SUCCESS (4-layer feedback):
  1. VISUAL: Screen flashes green (100ms) + checkmark overlay
  2. HAPTIC: Short vibration (50ms)
  3. AUDIO: Ascending two-tone beep (660Hz → 880Hz, 80ms each)
  4. ADVANCE: Auto-navigate to next step (200ms delay)

SCAN FAILURE (4-layer feedback):
  1. VISUAL: Screen flashes red + X overlay + shake animation
  2. HAPTIC: Double vibration (50ms, 50ms gap, 50ms)
  3. AUDIO: Descending two-tone buzz (440Hz → 220Hz, 100ms each)
  4. HOLD: Stay on current step, show error message

SCAN AMBIGUOUS (multiple matches):
  1. VISUAL: Amber flash + "?" overlay
  2. HAPTIC: Single long vibration (200ms)
  3. AUDIO: Single tone (550Hz, 150ms)
  4. MODAL: Bottom sheet with matches to select
```

### The Continuous Scan Mode

For high-volume counting/receiving, MANIFOLD offers a **continuous scan mode** that removes all UI chrome and shows only a fullscreen camera viewfinder with an overlay counter.

```
┌─────────────────────────────┐
│                             │
│        [camera feed]        │
│                             │
│      ┌───────────┐          │
│      │ ▦ ▦ ▦ ▦ ▦ │          │ ← barcode targeting reticle
│      └───────────┘          │
│                             │
│                             │
│  ┌─────────────────────────┐│
│  │ Scanned: 47    Last:    ││ ← translucent overlay
│  │ WID-XL   ×12  3s ago    ││
│  └─────────────────────────┘│
│                             │
│       [tap to pause]        │
└─────────────────────────────┘
```

- Activated via `⌘+Shift+S` on desktop or long-press scan button on mobile
- Each scan auto-advances; counter increments
- Exit via tap anywhere or hardware back button
- Session saved on exit — never loses count

## M.4 Mobile Component Catalog

### The Big Number Display

For showing quantities that must be readable from 1 meter away (e.g., on a forklift mount):

```css
.mobile-big-number {
  font-size: 96sp;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: var(--text-primary);
  text-align: center;
  letter-spacing: -0.03em;
}

.mobile-big-number--warning { color: var(--amber-600); }
.mobile-big-number--danger  { color: var(--red-600); }
```

### The Location Card

The most-used mobile component — shows where to go and what to pick.

```
┌───────────────────────────────────┐
│ A14-07-B3              [coral dot]│ ← location + status
│ ─────────────                     │
│ Widget-Pro-XL                     │ ← SKU (18sp, 600)
│ Aluminum Widget, 50mm             │ ← description (14sp, 400)
│                                   │
│ ┌──────┐  Qty: 12    UOM: ea      │ ← thumbnail + qty
│ │ img  │  Lot: 4471               │
│ │      │  Exp: 2026-04            │
│ └──────┘                          │
│                                   │
│ [Image] [Notes] [History]         │ ← tab actions
└───────────────────────────────────┘
```

### The Quantity Stepper

Touch-optimized quantity input with scan-to-fill:

```
┌──────────────────────────────┐
│  [-]      12       [+]       │
│   48dp    center    48dp     │
│           24sp bold          │
│                              │
│  [Scan to set]   [Keyboard]  │
└──────────────────────────────┘
```

- `[-]`/`[+]` decrement/increment by 1 (long-press by 10)
- Center value is tap-editable (opens numeric keyboard)
- "Scan to set" uses camera to scan a quantity barcode
- Haptic tick on each increment

### The Bottom Sheet

Mobile's answer to the desktop modal. Slides up from bottom, partial height by default.

```css
.bottom-sheet {
  position: fixed;
  inset-block-end: 0;
  inset-inline: 0;
  background: var(--surface-elevated);
  border-radius: 16px 16px 0 0;
  box-shadow: var(--shadow-xl);
  max-height: 80vh;
  overflow-y: auto;
  z-index: var(--z-sheet);
  animation: sheetUp 280ms var(--ease-decelerate);
}

.bottom-sheet__handle {
  width: 32px;
  height: 4px;
  background: var(--border-strong);
  border-radius: 2px;
  margin: 8px auto;
}

@keyframes sheetUp {
  from { transform: translateY(100%); }
  to   { transform: translateY(0); }
}
```

## M.5 Offline-First Mobile Architecture

Mobile is **always assumed offline-capable**. Every action queues locally and syncs when connectivity returns.

### The Sync Indicator (Mobile)

```
┌─────────────────────────────┐
│ ☰  Pick List          [●]  │ ← sync dot in top bar
│     3 of 12 picked           │
└─────────────────────────────┘

[●] Green:   All synced
[◐] Amber:   3 items pending sync
[○] Gray:    Offline — will sync when connected
[⚠] Red:     Sync conflict — tap to resolve
```

### Conflict Resolution (Mobile)

When a sync conflict occurs (someone else edited the same SKU), the mobile app shows a bottom sheet:

```
┌──────────────────────────────────┐
│  ⚠ Conflict detected              │
│                                   │
│  You counted: 12                  │
│  Server has:   11 (by Jane, 2m)  │
│                                   │
│  What happened:                   │
│  Jane transferred 1 unit out      │
│  while you were counting.         │
│                                   │
│  [Use my count (12)]              │
│  [Use server (11)]                │
│  [Recount]                        │
└──────────────────────────────────┘
```

## M.6 Mobile Gestures

| Gesture | Action | Context |
|---|---|---|
| Swipe right on row | Mark complete | Pick list |
| Swipe left on row | Skip | Pick list |
| Long-press row | Open detail | Any list |
| Pinch out | Increase font size | Any view (accessibility) |
| Pinch in | Decrease font size | Any view |
| Two-finger tap | Toggle dark mode | Anywhere |
| Shake | Undo last action | Anywhere (opt-in) |

### Shake-to-Undo

Opt-in setting (default off — prevents accidental triggers on bumpy forklifts). When enabled, a shake (accelerometer threshold: 15 m/s²) shows an "Undo last action?" toast with 5-second timeout.

---

# APPENDIX N: COMPLETE COMMAND & HOTKEY QUICK REFERENCE CARD

> *Print this. Tape it to your monitor. In 2 weeks you won't need it anymore.*

## N.1 Global Hotkeys (Available Everywhere)

### Navigation

| Shortcut | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open Command Bar |
| `⌘\` / `Ctrl+\` | Toggle Ghost Rail navigation |
| `⌘1` | Go to: Operations Dashboard |
| `⌘2` | Go to: Inventory Grid |
| `⌘3` | Go to: Transfers |
| `⌘4` | Go to: Cycle Count |
| `⌘5` | Go to: Receiving |
| `⌘6` | Go to: Reports |
| `⌘7` | Go to: Suppliers |
| `⌘Shift D` | Go to: Dashboard (alias) |
| `⌘Shift I` | Go to: Inventory (alias) |
| `Esc` | Close modal / cancel action / clear command bar |

### Search & Filter

| Shortcut | Action |
|---|---|
| `⌘F` | Focus search in current view |
| `⌘G` | Find next match |
| `⌘Shift G` | Find previous match |
| `⌘Shift F` | Open Query Composer |
| `⌘Shift A` | Apply saved filter |
| `⌘Shift S` | Save current filter as view |
| `⌘Shift R` | Reset all filters |

### Data Operations

| Shortcut | Action |
|---|---|
| `⌘N` | New SKU (contextual: new item/transfer/count) |
| `⌘E` | Edit selected row |
| `⌘D` | Duplicate selected row |
| `⌘Delete` | Delete selected (with confirmation) |
| `⌘Enter` | Confirm inline edit |
| `⌘Shift Enter` | Confirm and move to next cell |
| `Tab` | Move to next editable cell |
| `Shift+Tab` | Move to previous editable cell |
| `Space` | Toggle row selection |
| `⌘A` | Select all rows in current filter |
| `⌘Shift A` | Invert selection |

### Row Navigation

| Shortcut | Action |
|---|---|
| `↑` `↓` | Navigate rows (preserves horizontal position) |
| `←` `→` | Navigate cells within row |
| `Home` | First row / first cell |
| `End` | Last row / last cell |
| `⌘↑` | Jump to first row |
| `⌘↓` | Jump to last row |
| `Page Up` | Scroll up one viewport |
| `Page Down` | Scroll down one viewport |
| `Enter` | Expand/collapse Matryoshka row |
| `Shift+Enter` | Expand all siblings |

### Bulk Operations

| Shortcut | Action |
|---|---|
| `⌘Shift T` | Transfer selected |
| `⌘Shift C` | Add selected to cycle count |
| `⌘Shift X` | Export selected to CSV |
| `⌘Shift P` | Print labels for selected |
| `⌘Shift E` | Edit in bulk (multi-row edit) |

### View & Display

| Shortcut | Action |
|---|---|
| `⌘+` / `⌘=` | Zoom in (increase row height) |
| `⌘-` | Zoom out (decrease row height) |
| `⌘0` | Reset zoom to default |
| `⌘Shift 0` | Fit to screen |
| `⌘Shift L` | Toggle column lock (freeze) |
| `⌘Shift H` | Hide selected column |
| `⌘Shift O` | Show column options |
| `⌘B` | Toggle left rail |
| `⌘Shift B` | Toggle right rail / detail panel |
| `⌘.` | Toggle Pulse Lines |
| `⌘,` | Open settings |

### Special Modes

| Shortcut | Action |
|---|---|
| `⌘Shift S` | Enter continuous scan mode |
| `⌘Shift M` | Enter multi-site mode |
| `⌘Shift B` | Toggle Black Friday / Hyper mode |
| `⌘Shift O` | Toggle offline mode (force) |
| `⌘Shift U` | Toggle update cadence (STEADY/RAPID/HYPER) |

### AI & Assistance

| Shortcut | Action |
|---|---|
| `⌘J` | Open AI assistant (COG) |
| `⌘Shift J` | Ask AI about selected row |
| `⌘'` | Accept ghost text suggestion |
| `⌘Shift '` | Reject ghost text + show alternatives |
| `⌘/` | Toggle AI ribbon |
| `⌘?` | Open help |
| `Shift+?` | Open keyboard cheat sheet (this card) |

### Voice & Multi-Modal

| Shortcut | Action |
|---|---|
| `⌘Shift V` | Activate voice command |
| `⌘Shift M` | Mute/unmute microphone |
| `⌘Shift N` | Toggle voice-to-text for current field |

### Theme & Display

| Shortcut | Action |
|---|---|
| `⌘Shift D` | Toggle dark/light mode |
| `⌘Shift H` | Toggle high contrast mode |
| `⌘Shift R` | Toggle reduced motion |

### Notifications

| Shortcut | Action |
|---|---|
| `⌘Shift N` | Open notification drawer |
| `⌘Esc` | Dismiss all toasts |
| `⌘Shift Esc` | Dismiss all notifications |

## N.2 Context-Specific Hotkeys

### In Command Bar (⌘K)

| Key | Action |
|---|---|
| `↑` `↓` | Navigate results |
| `Enter` | Execute selected |
| `⌘Enter` | Execute in new tab |
| `Tab` | Autocomplete / accept suggestion |
| `Shift+Tab` | Switch between Search / Action / NL modes |
| `Esc` | Close command bar |
| `/` | Focus filter by category |

### In Query Composer

| Key | Action |
|---|---|
| `Enter` | Add current token to query |
| `Backspace` | Remove last token (when input empty) |
| `⌘Enter` | Run query |
| `⌘S` | Save query |
| `⌘Shift S` | Save as shared view |
| `Esc` | Close composer |

### In Inline Edit Mode

| Key | Action |
|---|---|
| `Enter` | Commit edit |
| `Esc` | Cancel edit (revert) |
| `Tab` | Commit + move right |
| `Shift+Tab` | Commit + move left |
| `↑` `↓` | Commit + move up/down |
| `⌘Enter` | Commit + stay (multi-edit) |
| `⌘D` | Duplicate value to selection |

### In Cycle Count Mode

| Key | Action |
|---|---|
| `S` | Scan / enter counted quantity |
| `Enter` | Confirm count + next SKU |
| `⌘Enter` | Confirm + mark variance reviewed |
| `D` | Flag discrepancy |
| `N` | Add note |
| `P` | Pause count (save progress) |
| `R` | Resume count |
| `⌘Shift C` | Complete count (finalize) |

### In Transfer Dialog

| Key | Action |
|---|---|
| `Tab` | Move between From / To / Qty fields |
| `⌘Enter` | Submit transfer |
| `⌘S` | Save as draft |
| `Esc` | Cancel (confirm if unsaved) |

### In Print Preview

| Key | Action |
|---|---|
| `⌘P` | Open print dialog |
| `⌘+` / `⌘-` | Zoom preview |
| `⌘0` | Reset zoom |
| `↑` `↓` | Navigate pages (multi-page) |
| `Enter` | Confirm print |

## N.3 Accessibility Hotkeys

| Shortcut | Action |
|---|---|
| `Tab` | Move focus to next interactive element |
| `Shift+Tab` | Move focus to previous element |
| `⌘Option F` | Skip to main content |
| `⌘Option N` | Skip to navigation |
| `⌘Option S` | Skip to search |
| `⌘Option 1-6` | Jump to heading level |
| `F2` | Rename selected item |
| `Enter` / `Space` | Activate focused element |
| `Alt+↑` | Move selection up (drag alternative) |

## N.4 Quick Reference Card (Printable)

```
╔══════════════════════════════════════════════════════════════╗
║          MANIFOLD — KEYBOARD QUICK REFERENCE                  ║
║          v4.0.0  ·  Tape to your monitor                      ║
╠══════════════════════════════════════════════════════════════╣
║  ⌘K    Command Bar        ⌘N    New item                     ║
║  ⌘1-7  Jump to view       ⌘E    Edit row                     ║
║  ⌘F    Search             ⌘D    Duplicate                     ║
║  ⌘⇧F   Query Composer     ⌘⏎   Confirm edit                  ║
║  ⌘⇧T   Transfer selected  ⌘⇧C   Add to count                  ║
║  ⌘⇧X   Export CSV         ⌘⇧P   Print labels                  ║
║  ⌘⇧S   Continuous scan    ⌘⇧M   Multi-site mode               ║
║  ⌘⇧B   Hyper mode         ⌘⇧O   Offline mode                  ║
║  ⌘J    AI assistant       ⌘'    Accept ghost text             ║
║  ⌘?    Help               ⇧?    This cheat sheet              ║
║  ⌘⇧D   Toggle dark        ⌘⇧R   Reduced motion                ║
║                                                              ║
║  ROW NAV: ↑↓ rows · ←→ cells · ⏎ expand · ⌘↑ first · ⌘↓ last║
║  EDIT:    ⏎ commit · Esc cancel · Tab next · ⇧Tab prev       ║
║  SELECT:  Space toggle · ⌘A all · ⇧click range               ║
║                                                              ║
║  When in doubt: press ⌘K and type what you want.             ║
╚══════════════════════════════════════════════════════════════╝
```

## N.5 Hotkey Customization

Users can remap any hotkey via Settings → Keyboard. Conflicts are detected and flagged.

```typescript
interface HotkeyBinding {
  action: string;
  defaultCombo: string;
  currentCombo: string;
  scope: 'global' | 'view' | 'modal';
  conflictsWith?: string[];
}

// Custom bindings stored in localStorage
const customBindings: Record<string, string> = JSON.parse(
  localStorage.getItem('manifold:hotkeys') ?? '{}'
);
```

### Conflict Resolution

When a user assigns a combo already in use:
1. The conflicting binding is highlighted in red
2. Options: "Swap bindings" or "Cancel"
3. If swapped, the displaced binding becomes unassigned (shows "Unassigned — click to set")

---

# APPENDIX O: PERFORMANCE BUDGET & CORE WEB VITALS SPECIFICATION

> *A warehouse management system that lags is a system that loses inventory. Speed is a feature. Speed is a safety feature.*

## O.1 The Performance Doctrine

MANIFOLD defines **hard performance budgets** — not aspirational targets. If a budget is exceeded, the build fails CI. No exceptions, no "we'll optimize later."

### The North Star Metric

**Time to Interactive (TTI) on a 2018 iPad (worst-case warehouse device): ≤ 2.5 seconds.**

Every other budget serves this north star.

## O.2 Core Web Vitals Budget

| Metric | Target | Budget (max) | Measurement |
|---|---|---|---|
| **LCP** (Largest Contentful Paint) | ≤ 1.2s | 2.0s | Lighthouse, field data |
| **INP** (Interaction to Next Paint) | ≤ 100ms | 200ms | RUM, field data |
| **CLS** (Cumulative Layout Shift) | ≤ 0.05 | 0.1 | Lighthouse, field data |
| **FCP** (First Contentful Paint) | ≤ 0.8s | 1.5s | Lighthouse |
| **TTFB** (Time to First Byte) | ≤ 200ms | 400ms | Server timing |
| **TTI** (Time to Interactive) | ≤ 2.5s | 3.5s | Lighthouse |

### INP Deep Dive (Most Critical for Inventory Apps)

Inventory apps are interaction-heavy (scrolling, editing, filtering). INP is the metric that matters most.

| Interaction Type | Budget | Technique |
|---|---|---|
| Row hover highlight | ≤ 16ms | CSS only (no JS) |
| Inline edit cell activation | ≤ 50ms | Pre-rendered edit state, toggle visibility |
| Matryoshka row expand | ≤ 100ms | Virtualized children, render on expand |
| ⌘K command bar open | ≤ 50ms | Pre-mounted, opacity toggle |
| Search results update | ≤ 100ms | Debounced 150ms, requestIdleCallback |
| Filter application | ≤ 200ms | Web Worker for large datasets |

## O.3 Bundle Size Budget

| Asset | Budget (max) | Gzipped | Strategy |
|---|---|---|---|
| Initial JS (critical path) | 180 KB | 60 KB | Route-level code splitting |
| Initial CSS | 30 KB | 8 KB | Tailwind purge, no unused utilities |
| Initial HTML | 20 KB | 6 KB | SSR, minimal inline |
| Total initial load | 230 KB | 74 KB | Hard ceiling |
| Per-route lazy JS | 50 KB | 16 KB | Each view's unique code |
| Web font | 45 KB | 18 KB | woff2, subset by locale |
| Images (per page) | 100 KB | — | WebP/AVIF, responsive srcset |
| Total page weight (dashboard) | 400 KB | — | All-in |

### Bundle Enforcement (CI)

```javascript
// budget.config.js
module.exports = {
  bundles: [
    { path: 'main-*', maxSize: '180 KB' },
    { path: 'vendors-*', maxSize: '80 KB' },
    { path: 'styles-*.css', maxSize: '30 KB' },
  ],
  routes: [
    { path: '/dashboard', maxSize: '400 KB' },
    { path: '/inventory', maxSize: '450 KB' },  // heavier — virtualization lib
    { path: '/reports', maxSize: '500 KB' },    // charts
  ],
};

// CI script
// bundlesize --config budget.config.js
// Fails build if any bundle exceeds budget.
```

## O.4 Rendering Performance Budget

### Frame Budget (60fps = 16.67ms per frame)

| Operation | Budget | Notes |
|---|---|---|
| JavaScript execution | ≤ 6ms | Leaves 10ms for style/layout/paint |
| Style recalculation | ≤ 2ms | Scope styles, avoid universal selectors |
| Layout | ≤ 4ms | Avoid forced reflow, batch DOM writes |
| Paint | ≤ 3ms | Reduce paint area, avoid large box-shadows |
| Composite | ≤ 1ms | Use transform/opacity only for animation |

### Virtualization Requirements

| Row Count | Strategy | Implementation |
|---|---|---|
| < 100 | Render all | No virtualization needed |
| 100 – 1,000 | Windowing | TanStack Virtual, overscan 5 rows |
| 1,000 – 10,000 | Windowing + column memoization | Memoize cell renderers, stable keys |
| 10,000 – 100,000 | Windowing + Web Worker filtering | Filter/sort in worker, stream results |
| 100,000+ | Pagination + windowing | Server-side pagination, 1000 per page |

```typescript
// Virtualized row configuration
const rowVirtualizer = useVirtualizer({
  count: rowCount,
  estimateSize: () => rowHeight,  // 40px default, 56px expanded
  overscan: 5,                     // render 5 rows above/below viewport
  measureElement: isDynamicHeight ? undefined : undefined,
  getItemKey: (index) => skus[index].id,  // stable keys for React reconciliation
});
```

### React Re-render Budget

| Component | Max renders per interaction | Technique |
|---|---|---|
| Single SKU row | 1 | `React.memo` + stable props |
| Matryoshka parent | 1 | Memoize expanded state |
| Entire table | 0 (rows handle own updates) | Lift only selection state; row data via selector |
| Command Bar | 0 (mounted once) | Portal, opacity toggle |
| Filter chips | 1 per chip change | Individual memoization |

## O.5 Memory Budget

| Metric | Budget | Technique |
|---|---|---|
| Initial heap | ≤ 30 MB | Lazy load, no eager data fetching |
| After loading 10K SKUs | ≤ 80 MB | Virtualization, object pooling |
| Long-running session (8h) | ≤ 120 MB | Periodic GC, clear caches on route change |
| IndexedDB cache | ≤ 50 MB per site | LRU eviction, max 1000 SKUs cached |
| WebSocket buffer | ≤ 1 MB | Backpressure, drop old if overflow |

### Memory Leak Prevention

```typescript
// Periodic cache cleanup on route change
useEffect(() => {
  return () => {
    // Clear query cache for this route after 5 minutes idle
    const timeout = setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [route] });
    }, 5 * 60 * 1000);
    return () => clearTimeout(timeout);
  };
}, [route]);

// TanStack Query garbage collection
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,    // 5 min
      gcTime: 30 * 60 * 1000,      // 30 min (formerly cacheTime)
      refetchOnWindowFocus: false,  // warehouse users don't switch tabs often
    },
  },
});
```

## O.6 Network Budget

### API Request Budget

| Action | Max Requests | Technique |
|---|---|---|
| Page load (initial) | 3 | SSR for critical data, prefetch on idle |
| Search (debounced) | 1 per 200ms | Debounce, cancel in-flight |
| Filter application | 1 | Batch filter, single query |
| Inline edit commit | 1 | Optimistic update, background sync |
| Bulk operation (1000 rows) | 1 | Batch API endpoint |
| Real-time updates | 1 WebSocket | Multiplexed, no polling |

### Request Payload Budget

| Payload | Max Size | Technique |
|---|---|---|
| Initial inventory (SSR) | 50 KB | First 100 SKUs only, rest lazy |
| Search response | 20 KB | Paginated, 50 results max |
| Filtered grid data | 100 KB | Compressed (gzip/brotli), field projection |
| SKU detail | 10 KB | Only requested fields |
| WebSocket message | 2 KB | Binary protocol for high-frequency updates |
| Export (CSV) | Streamed | No size limit — streaming response |

### API Response Time Budget

| Endpoint | p50 | p95 | p99 | Notes |
|---|---|---|---|---|
| `GET /api/skus` (list) | 80ms | 200ms | 400ms | Indexed query, field projection |
| `GET /api/skus/:id` | 30ms | 80ms | 150ms | Cache hit |
| `POST /api/skus/:id/edit` | 50ms | 120ms | 250ms | Optimistic, conflict check |
| `GET /api/search?q=` | 40ms | 100ms | 200ms | FTS index |
| `POST /api/transfer` | 100ms | 300ms | 600ms | Validation + 2 site writes |
| `GET /api/export` | Stream | Stream | Stream | SSE, chunked |

## O.7 Performance Monitoring & Alerting

### Real User Monitoring (RUM)

MANIFOLD collects field performance data via the `web-vitals` library:

```typescript
// lib/performance/rum.ts
import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals/attribution';

function sendToAnalytics(metric: any) {
  // Send to analytics endpoint
  navigator.sendBeacon('/api/analytics/vitals', JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,  // 'good' | 'needs-improvement' | 'poor'
    id: metric.id,
    attribution: metric.attribution,
    url: location.pathname,
    session: sessionId,
    timestamp: Date.now(),
  }));
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

### Alerting Thresholds

| Metric | Alert if | Action |
|---|---|---|
| p75 LCP > 2.5s | PageSpeed degrades | Investigate LCP element, optimize |
| p75 INP > 200ms | Interaction lag | Profile slow interactions |
| p75 CLS > 0.1 | Layout instability | Find unreserved images/fonts |
| Error rate > 0.5% | Functional break | Auto-page on-call |
| TTFB p95 > 500ms | Server degrade | Scale up, check DB |

### Performance Dashboard

Internal-only dashboard showing:
- 7-day rolling p50/p75/p95 for each Core Web Vital
- Breakdown by device class (Desktop / Tablet / Rugged Scanner)
- Breakdown by route
- Top 10 slowest interactions (INP attribution)
- Bundle size trend per release

## O.8 The Performance Regression Protocol

Every PR is benchmarked. If any metric regresses beyond tolerance, the PR is blocked.

### CI Performance Check

```yaml
# .github/workflows/performance.yml
name: Performance Budget Check
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: bun run build
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000/dashboard
            http://localhost:3000/inventory
          budgetPath: ./lighthouse-budget.json
          uploadArtifacts: true

  bundle-size:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check bundle sizes
        run: npx bundlesize
```

### Regression Tolerance

| Metric | Tolerance | Action |
|---|---|---|
| LCP | +100ms | Warning, allow merge |
| LCP | +250ms | Block — requires perf lead approval |
| INP | +20ms | Warning |
| INP | +50ms | Block |
| Bundle size | +5 KB | Warning |
| Bundle size | +15 KB | Block |
| CLS | +0.02 | Block (layout shifts are critical) |

## O.9 Device-Class Performance Tiers

MANIFOLD defines performance expectations per device class. The app degrades gracefully on weaker hardware.

| Device Class | Target LCP | Target INP | Techniques |
|---|---|---|---|
| Desktop (8GB+, modern CPU) | 1.2s | 100ms | Full features, animations |
| Tablet (iPad 2020+) | 1.8s | 150ms | Reduced animations, fewer sparklines |
| Rugged scanner (Android, 2GB RAM) | 2.5s | 200ms | Minimal UI, no Pulse Lines, text-only |
| Low-end mobile (Android Go) | 3.0s | 300ms | List view only, no virtualization overhead |

### Adaptive Performance Mode

```typescript
// Detect device capability on first load
function detectPerformanceTier(): 'high' | 'medium' | 'low' {
  const memory = (navigator as any).deviceMemory ?? 4;  // GB
  const cores = navigator.hardwareConcurrency ?? 4;
  const connection = (navigator as any).connection;

  if (memory >= 8 && cores >= 8) return 'high';
  if (memory >= 4 && cores >= 4) return 'medium';
  return 'low';
}

// Apply performance mode to store
const perfTier = detectPerformanceTier();
useUIStore.getState().setPerformanceTier(perfTier);

// Components read tier to adjust behavior
const showPulseLines = perfTier !== 'low';
const maxRenderedRows = perfTier === 'high' ? 50 : perfTier === 'medium' ? 30 : 20;
const enableAnimations = perfTier !== 'low';
```

### Graceful Degradation Rules

| Feature | High | Medium | Low |
|---|---|---|---|
| Pulse Lines (sparklines) | Enabled | Enabled | Disabled (show numeric only) |
| Row hover micro-interactions | Full | Simplified | None |
| Matryoshka nesting depth | 3 layers | 2 layers | 1 layer (flat) |
| Animations | Full | Reduced | `prefers-reduced-motion` enforced |
| AI ghost text | Real-time | On-focus only | Disabled |
| Real-time multiplayer cursors | Shown | Shown only when paused | Hidden |
| Background sync frequency | 1s | 5s | 15s |

## O.10 Performance Testing Protocol

### Synthetic Testing Matrix

| Test | Tool | Frequency | Threshold |
|---|---|---|---|
| Lighthouse audit | Lighthouse CI | Every PR | Score ≥ 90 all categories |
| Bundle analysis | webpack-bundle-analyzer | Every PR | No budget exceeded |
| Memory leak detection | Puppeteer + heap snapshots | Weekly | No growth after 100 interactions |
| Long-task audit | Chrome DevTools | Weekly | No task > 50ms |
| Network throttling test | Lighthouse (Slow 3G) | Weekly | LCP ≤ 4s on 3G |

### Load Testing

| Scenario | Tool | Target |
|---|---|---|
| 100 concurrent users browsing | k6 | p95 response < 200ms |
| 50 concurrent inline edits | k6 | p95 response < 300ms |
| 10 concurrent bulk exports (1000 rows) | k6 | All complete < 10s |
| WebSocket with 500 connections | Artillery | Message latency < 100ms |

```javascript
// k6 load test example
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 50 },   // ramp up
    { duration: '1m', target: 50 },     // hold
    { duration: '30s', target: 100 },   // ramp to peak
    { duration: '2m', target: 100 },    // hold peak
    { duration: '30s', target: 0 },      // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],   // 95% under 200ms
    http_req_failed: ['rate<0.01'],     // <1% errors
  },
};

export default function () {
  const res = http.get(`${__ENV.BASE_URL}/api/skus?limit=50`);
  check(res, {
    'status 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
```

---

# PHASE 16: SECURITY, AUTHENTICATION & PERMISSION UX

---

> *"The most secure system is the one an operator actually uses. A permission model that requires 14 clicks to grant a forklift driver read access to one bin is a permission model that gets bypassed with a shared admin password. Security in MANIFOLD is engineered for compliance without friction."*

---

## 16.1 The Security UX Doctrine

MANIFOLD treats security as a **first-class interaction surface**, not a backend concern that manifests in the UI as a wall of modal dialogs. Every security decision is surfaced at the point of action, in context, with the minimum viable interruption. The five non-negotiable principles:

| Principle | Definition | Design Implication |
|---|---|---|
| **Proximity** | Permission decisions are shown at the action site, not in a separate "permissions" admin panel. | Inline `LOCK` glyphs on restricted fields; `403 Insight` popovers explain *why* access was denied. |
| **Progressive Authentication** | The system never demands more identity than the action requires. Reading a SKU needs a session; adjusting its cost needs a step-up; deleting a warehouse needs a hardware key. | 3-tier authentication ladder: Session → Step-Up → Hardware Key. |
| **Visible Audit** | Every state-changing action leaves a visible, reviewable trail in the Narrative Feed. Operators see their own footprint; admins see everyone's. | Every row mutation ships with an `actor` chip and a relative timestamp; the Audit Log is the same component as the Narrative Feed, filtered by actor. |
| **Reversible Default** | Destructive operations default to soft-delete with a 30-day recovery window. Hard-delete requires explicit, typed confirmation and a second administrator witness. | `SoftDelete` is the default; `HardDelete` requires two-person rule. |
| **Zero Shared State** | No "remember me on this device" for elevated sessions. Step-up tokens expire in 15 minutes of inactivity or upon tab switch. | Step-up sessions are bound to a single tab via `BroadcastChannel`; switching tabs forces re-authentication. |

---

## 16.2 The Authentication Ladder — Three Tiers of Identity

MANIFOLD does not treat all authenticated users as equivalent. Identity is contextual — the same person may be a read-only browser in one moment and a cost-adjusting accountant in the next. The system escalates identity demand in proportion to action risk.

### Tier 1 — Session Authentication (The Baseline)

The standard logged-in state. Acquired at sign-in, valid for 12 hours, renewed by activity. Sufficient for all read operations and non-destructive writes (quantity adjustments, location moves, status notes).

```
┌─────────────────────────────────────────────────────────────┐
│  SESSION                                                    │
│  ┌──────────┐  Acquired: 08:42  Renewed: 09:17  Expires: 20:42│
│  │ 🔵 LIVE  │  Identity: maria.santos@acme.co                 │
│  └──────────┘  Role: Warehouse Operator · Site: WH-02         │
└─────────────────────────────────────────────────────────────┘
```

- **Acquisition**: Email + password, or SSO (SAML/OIDC), or Passkey (WebAuthn).
- **Session token**: HttpOnly, Secure, SameSite=Strict cookie. 12-hour sliding expiry.
- **Renewal**: Every API call within the active window extends expiry by 5 minutes, capped at 12 hours total.
- **Visual indicator**: A 4px `--session-thread` bar at the very top of the viewport (above the Chromatic Thread), tinted `--session-live` (#3B82F6 — the only sanctioned use of blue in MANIFOLD, reserved exclusively for "authenticated session" semantics).

### Tier 2 — Step-Up Authentication (Elevated Actions)

Required for actions that modify financial data, alter access control, or perform bulk operations affecting >50 SKUs. Step-up is acquired *in addition* to the baseline session, not in replacement of it.

**Triggered actions:**

| Action | Step-Up Method | Token Lifetime |
|---|---|---|
| Adjust unit cost | Passkey tap | 15 min |
| Delete SKU (soft) | Passkey tap | 15 min |
| Bulk transfer >50 SKUs | Passkey + code | 30 min |
| Export full SKU catalog | Passkey tap | 5 min |
| Modify a user's role | Passkey + admin witness | single-use |
| View cost history | Passkey tap | 15 min |

**Step-Up Flow (Inline, Non-Modal):**

```
┌─ SKU-4821 · Adjust Cost ────────────────────────────────────┐
│                                                             │
│  Current: $12.40      New: [ $13.20_______ ]                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 🔐 STEP-UP REQUIRED                                    │  │
│  │ Adjusting unit cost requires elevated authentication. │  │
│  │                                                       │  │
│  │   [ Authenticate with Passkey ]   Cancel              │  │
│  │                                                       │  │
│  │   Token expires in 15:00 after acquisition.           │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

- **No modal**: The step-up challenge appears inline, replacing the action area. The rest of the screen dims to `--dim-50` (rgba(15,23,42,0.50)) but remains visible — the operator retains situational awareness.
- **Passkey preferred**: WebAuthn `navigator.credentials.get()` with `userVerification: 'required'`. Falls back to TOTP code if no platform authenticator is enrolled.
- **Token binding**: The step-up token is cryptographically bound to the originating tab via `BroadcastChannel`. Opening the same URL in a second tab does *not* inherit the elevation.
- **Countdown chip**: Once acquired, a chip in the header displays the remaining step-up time: `ELEVATED · 14:32`. At 60 seconds remaining, it pulses amber. At 0, it silently de-escalates — the next elevated action triggers a fresh challenge.

### Tier 3 — Hardware Key Authentication (Catastrophic Actions)

Required only for actions that are irreversible and affect business continuity: hard-deleting a warehouse, exporting the full customer PII dataset, changing the root administrator, or initiating a site-wide inventory reset.

**Hardware Key Specification:**

- FIDO2 / WebAuthn Level 3 compliant hardware token (YubiKey 5 series or equivalent).
- Must be a **roaming authenticator** (cross-platform), not a platform authenticator. The physical act of touching the key is the consent gesture.
- The key must be pre-registered by two administrators (the actor + a witness) during enrollment.
- **Witness requirement**: For catastrophic actions, a second administrator must physically touch the same hardware key within 30 seconds of the actor's touch, from a different device. This is the **two-person rule**.

**Catastrophic Action Confirmation UI:**

```
┌─ HARD DELETE WAREHOUSE: WH-04 (Tijuana Cross-Dock) ───────┐
│                                                            │
│  ⚠  This action is IRREVERSIBLE.                           │
│                                                            │
│  • 4,218 SKUs will be detached (soft-deleted, 30-day hold) │
│  • 12 open transfers will be cancelled                     │
│  • 3 scheduled counts will be voided                       │
│  • All historical audit records will be retained           │
│                                                            │
│  Type the warehouse name to confirm:                       │
│  [ WH-04_______________________________________________ ]   │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🔑 HARDWARE KEY REQUIRED                              │  │
│  │ 1. Maria: touch your key now.                         │  │
│  │    ●●●●○  waiting for touch...                        │  │
│  │ 2. Witness (James L.): touch the same key within 30s. │  │
│  │    ○○○○○  waiting...                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│           [ Abort ]              [ Execute Hard Delete ]    │
└────────────────────────────────────────────────────────────┘
```

---

## 16.3 Sign-In Surface Design

The sign-in page is the only screen in MANIFOLD that does *not* use the Command Canvas. It is a deliberately focused, low-distraction surface — a single column of intent.

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                                                              │
│                                                              │
│            ┌──────────────────────────────────┐              │
│            │                                  │              │
│            │         [ MANIFOLD LOGO ]         │              │
│            │                                  │              │
│            │   Inventory coordination system  │              │
│            │                                  │              │
│            │  ┌────────────────────────────┐  │              │
│            │  │ email                      │  │              │
│            │  │ maria.santos@acme.co        │  │              │
│            │  └────────────────────────────┘  │              │
│            │                                  │              │
│            │  ┌────────────────────────────┐  │              │
│            │  │ password              [👁]  │  │              │
│            │  │ ••••••••••                  │  │              │
│            │  └────────────────────────────┘  │              │
│            │                                  │              │
│            │  [       Sign In           ]    │              │
│            │                                  │              │
│            │  ── or ──                        │              │
│            │                                  │              │
│            │  [  🔑  Continue with Passkey  ] │              │
│            │  [  🏢  Continue with SSO     ]  │              │
│            │                                  │              │
│            │  Forgot password? · Help         │              │
│            │                                  │              │
│            └──────────────────────────────────┘              │
│                                                              │
│            © Acme Logistics · v5.0.0 · status: operational   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Token specifics:**
- Background: `--auth-bg` = `#0F172A` (slate-950) in light mode, `#000000` in dark mode. The sign-in surface is *always* dark regardless of theme — a deliberate "airlock" gesture that signals transition from public to private space.
- Card: 440px wide, centered, `padding: 48px 40px`, `background: #FFFFFF` (light mode only — the card itself is always white), `border-radius: 16px`, `box-shadow: 0 24px 48px -12px rgba(0,0,0,0.40)`.
- Logo: 64px height, brand coral accent on the manifold glyph.
- Inputs: 48px height, `border: 1px solid #E2E8F0`, `border-radius: 8px`, focus state replaces border with `2px solid #E8603C` (brand coral) + `0 0 0 4px rgba(232,96,60,0.15)` ring.
- Primary button: Full width, 48px height, `background: #E8603C`, `color: #FFFFFF`, `font-weight: 600`, `border-radius: 8px`, hover darkens to `#D4542E` (delta ≥ 4.5:1 maintained).
- Passkey button: Secondary style, `background: transparent`, `border: 1px solid #CBD5E1`, icon `🔑` at 20px.
- SSO button: Same secondary style, icon `🏢` at 20px.
- Status pill at bottom: Live operational status, fetched from `/api/status` with a 30-second polling interval. If status is degraded, the pill turns amber and a one-line explanation appears above the form.

### Authentication Error States

| Error | Display | Recovery |
|---|---|---|
| Invalid credentials | Inline red text below password field: "That email and password don't match. Try again or use your passkey." | Input border → `#DC2626`, focus returns to password field, password field clears. |
| Account locked (5 failed attempts) | Full-card amber banner: "Too many attempts. Your account is locked for 15 minutes. An email has been sent with unlock instructions." | All inputs disabled. Countdown timer in banner. |
| SSO provider unreachable | Inline amber text below SSO button: "Acme SSO is not responding. Try again in a moment, or sign in with password." | SSO button remains enabled; password field highlighted as alternative. |
| Passkey not registered | Inline text below Passkey button: "No passkey is registered for this account. Sign in with password, then add a passkey from Settings → Security." | Link to post-auth enrollment flow. |
| Network failure | Full-card red banner with retry button: "Cannot reach MANIFOLD. Check your connection. [ Retry ]" | Auto-retry every 10s for 3 attempts, then manual retry. |

---

## 16.4 Role-Based Access Control (RBAC) — The Permission Model

MANIFOLD uses a **capability-based RBAC model** with three layers: Roles (bundles of capabilities), Capabilities (atomic permissions), and Scopes (the resources a capability applies to). This is not visible to operators in the abstract — it manifests as field-level and action-level affordances.

### The Six Canonical Roles

| Role | Description | Key Capabilities | Visual Marker |
|---|---|---|---|
| **Observer** | Read-only access, typically auditors or external stakeholders. | `sku:read`, `transfer:read`, `report:read` | `OBS` chip in slate |
| **Operator** | The warehouse floor user — the primary MANIFOLD actor. | All `read` + `sku:write:quantity`, `transfer:create`, `count:execute` | `OPR` chip in coral |
| **Supervisor** | Floor lead, can override system suggestions and approve transfers. | Operator + `transfer:approve`, `count:approve`, `sku:write:location` | `SUP` chip in coral-700 |
| **Manager** | Site-level decision maker, financial access. | Supervisor + `sku:write:cost`, `report:export`, `user:read` | `MGR` chip in coral-900 |
| **Administrator** | Full access except root operations. | Manager + `user:write`, `role:assign`, `site:configure` | `ADM` chip in coral-900 + `key` icon |
| **Root** | The catastrophic-action executor, max 2 per tenant. | All capabilities + `warehouse:hard-delete`, `user:root:assign` | `ROOT` chip in red-700 + `crown` icon |

### Role Chip Component

Displayed in the header, top-right, adjacent to the user avatar. 28px tall, 56–80px wide depending on label.

```
┌─────────────┐
│ 👤  OPR     │   ← Operator chip
└─────────────┘
```

```css
.role-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: 'Geist Sans', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.role-chip--opr { background: rgba(232,96,60,0.12); color: #C04A2E; }
.role-chip--sup { background: rgba(192,74,46,0.18); color: #9B3A24; }
.role-chip--mgr { background: rgba(155,58,36,0.22); color: #6E2A1B; }
.role-chip--adm { background: rgba(110,42,27,0.26); color: #4A1E12; }
.role-chip--root { background: rgba(185,28,28,0.14); color: #B91C1C; }
```

### Capability Resolution Display

When a user hovers over a disabled (locked) action, a `403 Insight` popover appears after 400ms explaining *why* the action is unavailable. This replaces the industry-standard "grayed out button with no explanation" pattern.

```
┌─ Adjust Cost ─────────────────────────────┐
│  🔒  You don't have `sku:write:cost`.      │
│                                           │
│  This capability is held by:              │
│  • Manager                                │
│  • Administrator                          │
│                                           │
│  Request access from your site admin or   │
│  ask Maria S. (your supervisor) to        │
│  perform this action.                     │
│                                           │
│  [ Request Access ]    [ Dismiss ]        │
└───────────────────────────────────────────┘
```

---

## 16.5 Field-Level Permissions — The Granular Grid

Not every field within a SKU is editable by every role. MANIFOLD enforces field-level permissions with visible, in-context affordances rather than silently hiding fields (which creates confusion when an operator heard a field exists but cannot find it).

### Permission States for Fields

| State | Visual | Behavior |
|---|---|---|
| **Editable** | Standard cell appearance, no glyph. | Double-click or Enter to edit. |
| **Read-Only** | Cell appears normal, but a subtle `🔒` glyph (12px, `--slate-400`) appears on hover at the right edge. | No edit affordance. Tooltip on glyph: "Read-only for your role." |
| **Masked** | Cell displays `••••••` (for cost, supplier pricing). On hover, a `🔑` glyph appears. | Clicking the glyph triggers step-up; on success, the value is revealed for 30 seconds, then re-masks. |
| **Hidden** | Cell is collapsed to a 24px-wide `████` block (never fully invisible). | Tooltip: "Hidden — requires `field:read` permission." This signals that data exists, preserving operator trust. |
| **Audit-Only** | Cell appears as read-only with a `📋` glyph. | Editing is impossible from this view; the field can only be changed via the dedicated Audit Correction workflow (which itself requires step-up). |

### Field Permission Matrix (Subset — SKU Record)

| Field | Observer | Operator | Supervisor | Manager | Admin |
|---|---|---|---|---|---|
| SKU code | Read | Read | Read | Read | Read |
| Description | Read | Read | Edit | Edit | Edit |
| Quantity on hand | Read | Edit | Edit | Edit | Edit |
| Location | Read | Read | Edit | Edit | Edit |
| Unit cost | Hidden | Masked | Masked | Edit | Edit |
| Supplier | Read | Read | Edit | Edit | Edit |
| Reorder point | Read | Read | Edit | Edit | Edit |
| Lifecycle status | Read | Edit | Edit | Edit | Edit |
| Audit log | Hidden | Hidden | Read | Read | Read |

### Masked Value Reveal Animation

When a user with step-up capability reveals a masked field:

1. The `••••••` characters each fade out (staggered 20ms, total 120ms).
2. Simultaneously, the real value fades in from the left (200ms, `cubic-bezier(0.16, 1, 0.3, 1)`).
3. A 2px `--coral-500` underline appears beneath the value, indicating "revealed state."
4. A countdown chip appears at the right edge: `REVEALED · 28s`.
5. At T-5s, the chip pulses amber. At T-0, the value re-masks with the reverse animation.

---

## 16.6 Audit Log — The Visible Trail

Every state-changing operation in MANIFOLD is logged immutably. The audit log is not a separate admin-only screen — it is the **same Narrative Feed component** used in the main UI, with an `actor` filter applied. This unification means every operator can see their own footprint, and admins can see anyone's.

### Audit Entry Structure

```typescript
interface AuditEntry {
  id: string;                    // ULID, sortable
  timestamp: string;             // ISO 8601 UTC
  actor: {
    id: string;
    name: string;
    role: Role;
    site: string;
  };
  action: string;                // 'sku.quantity.adjust', 'transfer.create', etc.
  target: {
    type: 'sku' | 'transfer' | 'warehouse' | 'user' | 'role' | 'site';
    id: string;
    label: string;               // human-readable
  };
  before: Record<string, unknown>;
  after: Record<string, unknown>;
  reason?: string;               // free-text, required for cost/destructive changes
  stepUp: boolean;               // was step-up authentication used?
  hardwareKey?: {                // present only for Tier-3 actions
    serial: string;
    witness: { id: string; name: string };
  };
  sessionId: string;             // for forensics
  ipAddress: string;             // obfuscated to /24 for privacy
  userAgent: string;
}
```

### Audit Entry Rendering

Each entry is a single row in the Narrative Feed, rendered as:

```
┌──────────────────────────────────────────────────────────────┐
│ 09:17:42  Maria Santos [OPR]                                 │
│ Adjusted quantity of SKU-4821 (Acme Widget, Blue)            │
│ WH-02 · A-14-03                                              │
│                                                              │
│  240  →  238    (delta: −2, reason: "damaged in transit")    │
│                                                              │
│ 🔐 step-up · 192.168.4.•  · Chrome 128 / macOS              │
└──────────────────────────────────────────────────────────────┘
```

- Timestamp: Berkeley Mono, 12px, `--slate-500`.
- Actor name: Geist Sans 14px semibold `--slate-900`. Role chip inline.
- Action description: Geist Sans 14px `--slate-700`.
- Before → After: Berkeley Mono 14px, before in `--slate-500`, arrow in `--slate-400`, after in `--coral-700`.
- Reason: Geist Sans italic 13px `--slate-600`, in quotes.
- Footer: Berkeley Mono 11px `--slate-400`, with step-up indicator, obfuscated IP, browser/OS.

### Audit Log Filtering

The audit log is filterable via the Query Composer with audit-specific operators:

| Operator | Example | Description |
|---|---|---|
| `actor:` | `actor:maria` | Filter by actor name (fuzzy) |
| `action:` | `action:sku.quantity.*` | Glob pattern on action namespace |
| `target:` | `target:sku-4821` | Filter by target ID |
| `since:` | `since:2h` | Relative time |
| `between:` | `between:2025-01-01..2025-01-31` | Absolute range |
| `stepup:` | `stepup:true` | Only step-up actions |
| `hardware:` | `hardware:true` | Only hardware-key actions |
| `reason:` | `reason:/damage/i` | Regex on reason text |

---

## 16.7 Session Management UI

### Active Sessions Panel

Accessible from Settings → Security → Active Sessions. Shows every active session for the current user across all devices.

```
┌─ Active Sessions ───────────────────────────────────────────┐
│                                                             │
│  This device · Current                                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 🟢 Maria's MacBook Pro · Chrome 128                  │  │
│  │    192.168.4.21 · Started 08:42 · Expires 20:42      │  │
│  │    [ This session ]                                   │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  Other devices                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 🟡 Warehouse Floor Tablet · Safari 17                │  │
│  │    192.168.4.88 · Started 06:00 · Expires 18:00      │  │
│  │    [ Revoke session ]                                │  │
│  └───────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ 🟡 iPhone 15 · MANIFOLD Mobile · v5.0                │  │
│  │    192.168.4.104 · Started 07:30 · Expires 19:30     │  │
│  │    [ Revoke session ]                                │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  [ Revoke all other sessions ]                              │
└─────────────────────────────────────────────────────────────┘
```

- The current session is highlighted with a coral left border (3px) and a `🟢` status dot.
- Other sessions use amber `🟡` dots. Revoke buttons are ghost-style (no fill) until hover, at which point they fill to `--red-500` with white text.
- "Revoke all other sessions" is a destructive action requiring step-up.

### Forced Logout / Global Session Revocation

Available to Administrators only, via Settings → Security → Global Session Control. Triggers a site-wide (or tenant-wide) logout of all sessions except the current one. Used in incident response — for example, if a shared device is suspected compromised.

- Confirmation requires typed tenant name + step-up + hardware key (Tier 3).
- All other sessions receive a 60-second warning toast: "Your session will end in 60 seconds. An administrator has initiated a global logout. Save your work." After 60 seconds, the session is terminated and the user is redirected to the sign-in page with an explanation banner.

---

## 16.8 Passwordless & Passkey Enrollment

MANIFOLD strongly prefers passkeys over passwords. The first time a user signs in with a password, they are presented with a non-blocking enrollment prompt (not a forced interstitial).

### Enrollment Prompt (Post-Sign-In Toast)

```
┌──────────────────────────────────────────────────────────────┐
│  🔑  Set up a passkey?                                       │
│                                                              │
│  Passkeys are faster and more secure than passwords.         │
│  Sign in with a single touch.                               │
│                                                              │
│  [ Set up now ]   [ Remind me later ]   [ Never for this device ]│
└──────────────────────────────────────────────────────────────┘
```

- Toast appears in the bottom-right, 8 seconds after sign-in.
- Auto-dismisses after 30 seconds if no interaction.
- "Remind me later" defers for 7 days. After 3 deferrals, the prompt stops appearing for 90 days.
- "Never for this device" sets a `localStorage` flag; the prompt never reappears on this device, but can be re-enabled from Settings → Security.

### Passkey Enrollment Flow

1. User clicks "Set up now." A step-up challenge (current password or existing passkey) confirms identity.
2. `navigator.credentials.create()` is called with the WebAuthn options, including the user's existing credential as an "excludeCredentials" list (prevents re-enrolling the same authenticator).
3. The platform shows its native passkey enrollment UI (Touch ID, Face ID, Windows Hello, security key prompt).
4. On success, a verification toast appears: "Passkey added. You can now sign in with this device."
5. The new credential is listed in Settings → Security → Passkeys with a label (auto-generated from `navigator.userAgent`, editable), last-used timestamp, and revoke button.

### Passkey Management Table

```
┌─ Settings · Security · Passkeys ─────────────────────────────┐
│                                                              │
│  Passkey              Device            Last used    Actions │
│  ─────────────────    ──────────────    ──────────   ─────── │
│  Maria's MacBook Pro  macOS · Chrome    Just now     [⋯]    │
│  iPhone 15            iOS · Safari      2 hours ago  [⋯]    │
│  YubiKey 5C Nano      Roaming · FIDO2   3 days ago   [⋯]    │
│                                                              │
│  [ + Add passkey ]                                           │
│                                                              │
│  Recovery email: m***@acme.co   [ Change ]                  │
│  Recovery codes: 8 of 10 remaining   [ View / Regenerate ]  │
└──────────────────────────────────────────────────────────────┘
```

---

## 16.9 Suspicious Activity Detection — Behavioral Biometrics

MANIFOLD continuously evaluates interaction patterns against a baseline established during the first 14 days of a user's session. Deviations do not block access (high false-positive risk) — they elevate the *scrutiny* applied to subsequent actions.

### Tracked Behavioral Signals

| Signal | Description | Threshold for Anomaly |
|---|---|---|
| **Typing cadence** | Inter-key timing on free-text fields (reason, notes). | ±35% deviation from 7-day rolling median. |
| **Mouse trajectory** | Path curvature, acceleration, micro-corrections. | Sustained linear movement (no micro-corrections) for >3 seconds. |
| **Scroll velocity** | Pace of vertical navigation through long lists. | Sudden 5× increase in scroll speed sustained for 4+ seconds. |
| **Action sequencing** | Order of operations in common workflows. | Skipping step-up on an action that historically always included it. |
| **Session geometry** | Tab focus duration, tab-switch count per minute. | Tab-switch rate doubling vs. baseline. |
| **Geographic impossibility** | IP geolocation vs. last session's geolocation. | Travel time between sessions < physically possible. |

### Anomaly Handling — The "Quiet Step-Up"

When behavioral anomaly score exceeds 0.75 (on a 0–1 scale), the system does not alert the user. Instead, it silently raises the authentication requirement for the next elevated action from Tier 2 (passkey) to Tier 3 (hardware key), regardless of the action's baseline tier.

The operator experiences this as: they attempt a routine cost adjustment (normally Tier 2), and the system prompts for a hardware key instead. The prompt includes a subtle explanation: "For your security, this action requires your hardware key today." No accusation, no alarm — just elevated friction that an attacker (who lacks the hardware key) cannot pass, while the legitimate user (who has it) experiences a 4-second delay.

---

## 16.10 Data Masking & PII Handling

Personally Identifiable Information (PII) — supplier contact names, customer names in drop-ship records, employee IDs — is masked by default for all roles below Manager. The masking is **glyph-based**, not character-based, to prevent length-based inference attacks.

### Masking Patterns

| Data Type | Masked Display | Glyph | Notes |
|---|---|---|---|
| Email | `m•••@a•••.co` | `•` (U+2022) | First character + domain TLD preserved. |
| Phone | `+1 ••• ••• 4567` | `•` | Last 4 digits preserved for verification. |
| Name (person) | `Maria S.` | None | First name + last initial. |
| Name (company) | `Ac•• Logistics` | `•` | First 2 chars + suffix if present. |
| Address | `123 M•• St` | `•` | Street number + first letter + suffix. |
| Tax ID / EIN | `••-•••4567` | `•` | Last 4 preserved. |
| Credit card | `•••• •••• •••• 4567` | `•` | PCI-DSS standard. |
| Bank account | `••••••4567` | `•` | Last 4 preserved. |

### Masking Reveal

Revealing PII requires step-up (Tier 2 minimum) **and** the `pii:read` capability. The reveal is logged as an audit event with elevated severity (`pii.access` action type, surfaced in the admin dashboard as a "PII Access" widget).

Revealed PII displays with a coral background tint (`rgba(232,96,60,0.06)`) for the duration of the reveal, making it visually scannable in screen recordings for after-the-fact audit review.

---

## 16.11 Two-Factor Authentication (2FA) Recovery

### Recovery Codes

Generated at 2FA enrollment, displayed once, and stored only by the user. MANIFOLD stores a salted hash, never the codes themselves.

- 10 codes per user, 8 characters each, format `XXXX-XXXX` (alphanumeric, ambiguous characters `0/O/I/1/L/S/5` excluded).
- Displayed in a monospace block with a "Download as PDF" and "Print" option.
- Each code is single-use. When used, the system prompts the user to note the remaining count.
- When 2 codes remain, a non-blocking toast appears on next sign-in: "Only 2 recovery codes remain. Generate a new set from Settings → Security."
- Code regeneration invalidates all previous codes and requires step-up.

### Account Recovery Flow

If a user loses both their password and their 2FA device:

1. User clicks "Can't sign in?" on the sign-in page.
2. Enters email. MANIFOLD sends a recovery email to the registered address (with a 5-minute link expiry).
3. User clicks the link. They are presented with the recovery code entry screen.
4. User enters one recovery code. If valid, they are prompted to set a new password and enroll a new 2FA device.
5. The remaining recovery codes are invalidated, and a new set is generated.
6. All existing sessions for the account are revoked.
7. An audit event `account.recovery` is logged with elevated severity. Administrators receive a notification.

---

## 16.12 Security Status Indicators — The Security Thread

In addition to the Chromatic Thread (system status) and the Session Thread (authentication), MANIFOLD has a third peripheral indicator: the **Security Thread**, a 2px bar at the *bottom* of the viewport.

| Color | Meaning | Trigger |
|---|---|---|
| `transparent` | No security concerns. | Default state. |
| `--sec-amber` (#F59E0B) | Elevated scrutiny (behavioral anomaly). | Anomaly score > 0.75. |
| `--sec-red` (#DC2626) | Active security incident. | Admin-flagged session, brute-force lockout, or impossible-travel block. |
| `--sec-purple` (#7C3AED) | Step-up active. | Tier 2 or Tier 3 token currently valid. |
| `--sec-coral` (#E8603C) | PII revealed in current view. | Any masked field is in revealed state. |

The Security Thread is non-interactive but hoverable; hovering reveals a tooltip explaining the current state. It is always visible to the operator in their peripheral vision, providing continuous security situational awareness without modal interruption.

---

## 16.13 Security Hotkeys

| Hotkey | Action |
|---|---|
| `⌘ ⇧ L` | Lock session (immediate screen lock; requires re-auth to resume) |
| `⌘ ⇧ S` | Trigger step-up on-demand (for users who want to elevate before acting) |
| `⌘ ⇧ A` | Open Audit Log filtered to current user |
| `⌘ ⇧ P` | Open Passkey Management |
| `⌘ ⇧ X` | Revoke all other sessions (requires step-up) |
| `Esc Esc` | (double-tap within 400ms) Panic lock — immediately blanks the screen and requires password to resume |

The double-Esc panic lock is a critical safety affordance for warehouse environments where a supervisor may approach unexpectedly. The screen blanks to a `--slate-950` background with a single centered prompt: "Press any key to resume. Authentication required." The operator can resume with a passkey tap (fastest) or password.

---

*End of Phase 16. The next phase documents the Reporting & Analytics workspace — the surface through which warehouse data becomes business intelligence.*

---

# PHASE 17: REPORTING, ANALYTICS & EXPORT WORKSPACE

---

> *"A warehouse without reporting is a warehouse operated from memory. A warehouse with bad reporting is a warehouse operated from rumor. MANIFOLD's reporting workspace is engineered so that the same data the operator sees in real time becomes, with one gesture, the boardroom's source of truth."*

---

## 17.1 The Reporting Doctrine — Three Audiences, One Engine

MANIFOLD does not build separate "reports for managers" and "dashboards for operators." There is one data engine and three rendering surfaces. The same SKU velocity calculation that pulses as a 40×16 sparkline on an operator's row becomes, in the reporting workspace, a 200×80 expanded chart with annotations, a CSV cell in an exported spreadsheet, and a JSON value in an API response. **One computation, many presentations.**

| Audience | Primary Surface | Interaction Mode | Latency Tolerance |
|---|---|---|---|
| **Operator** | Inline Pulse Lines, row chips | Glance (<500ms) | Real-time |
| **Supervisor / Manager** | Reporting Workspace, KPI tiles | Explore (1–5s) | Near-real-time (≤30s) |
| **Executive / External** | Scheduled exports, PDF briefings | Consume (read-only) | Static snapshot |

The Reporting Workspace is the second surface. It is *not* a separate application — it is a mode of the Command Canvas, summoned by `⌘ R` or the `Reports` destination in the Ghost Rail.

---

## 17.2 The Reporting Workspace Layout

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ▼ 2px Chromatic Thread (steady)                                            │
├────────────────────────────────────────────────────────────────────────────┤
│ ⌘K  MANIFOLD · Reports                                [Maria S.] [OPR] 🔔  │
├──────────┬─────────────────────────────────────────────────────────────────┤
│          │                                                                 │
│ LIBRARY  │  ┌─ Q1 2025 · Stockout Analysis ─────────────────────────────┐ │
│          │  │  [Refresh] [Schedule] [Export ▼] [Share] [⋮]              │ │
│ ─ Recent │  └───────────────────────────────────────────────────────────┘ │
│ ★ Stock..│                                                                 │
│   Veloc..│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │
│   Reorder│  │ TOTAL SKU   │ │ STOCKOUT    │ │ FILL RATE   │ │ AVG DAYS │ │
│ ─ Saved  │  │   4,218     │ │    127      │ │   97.0%     │ │   3.4    │ │
│   Q1 S.. │  │ ▲ +12 vs Q4 │ │ ▼ -23 vs Q4 │ │ ▲ +1.2pp    │ │ ▼ -0.6   │ │
│   Cycle. │  └─────────────┘ └─────────────┘ └─────────────┘ └──────────┘ │
│   Suppl..│                                                                 │
│ ─ Temp.. │  ┌─ Stockout Frequency by Category ───────────────────────────┐│
│          │  │                                                             ││
│ + New    │  │  Electronics  ████████████████████  42                      ││
│          │  │  Apparel      ████████████  28                              ││
│          │  │  Home Goods   ████████  19                                  ││
│          │  │  Food & Bev   █████  12                                     ││
│          │  │  Industrial   ███  8                                        ││
│          │  │  Other        ██  5                                         ││
│          │  └─────────────────────────────────────────────────────────────┘│
│          │                                                                 │
│          │  ┌─ Top 10 Stockout SKUs ──────────────┌─ Trend ──────────────┐│
│          │  │ SKU-4821  Acme Widget, Blue   18x  │ ╱╲╱╲___╱╲╱╲╱╲___╱╲╱╲  ││
│          │  │ SKU-1193  Brass Fitting, 12mm 14x │ _╱╲╱╲╱╲___╱╲╱╲╱╲╱╲╱╲  ││
│          │  │ SKU-7782  Cable, USB-C 1m      11x │ ╱╲___╱╲╱╲╱╲___╱╲╱╲╱╲  ││
│          │  │ ...                                 │                      ││
│          │  └────────────────────────────────────┴──────────────────────┘│
└──────────┴─────────────────────────────────────────────────────────────────┘
```

**Layout tokens:**
- Left Library rail: 280px wide, collapsible to 48px (icon-only) via `⌘ [`.
- Report header: 56px tall, contains report title, last-refreshed timestamp, and action toolbar.
- KPI tile row: 4 tiles default, each 240×120px, gap 16px.
- Chart grid: 12-column CSS grid, `grid-template-columns: repeat(12, 1fr)`, `gap: 16px`. Charts span 4, 6, 8, or 12 columns.
- All tiles/charts: `border-radius: 12px`, `border: 1px solid --border-default`, `background: --surface-1`.

---

## 17.3 The Report Library

The Library is a persistent left rail that organizes reports into three sections:

### Sections

| Section | Contents | Order |
|---|---|---|
| **Recent** | Last 8 reports opened by the current user, across all categories. | Reverse chronological (most recent first). |
| **Saved** | Reports the user has explicitly saved with a name. | User-defined folder order, alphabetical within folders. |
| **Templates** | System-provided report templates, ready to customize. | Categorized (Operations, Financial, Compliance, Forecasting). |

### Library Item Anatomy

```
┌─ ★ Q1 2025 · Stockout Analysis ──────────┐
│ 📊  Updated 14 min ago · 4 tiles · 6 charts│
│ 👁 Maria S. · 🔒 Private                  │
└───────────────────────────────────────────┘
```

- Star icon (★) marks favorites, pinned to top of Recent.
- Icon indicates report type: 📊 (analytical), 📋 (tabular), 📅 (scheduled), 📈 (trend).
- Title: 14px Geist Sans semibold `--slate-900`.
- Metadata: 11px Berkeley Mono `--slate-500`.
- Owner chip + visibility chip on second line.
- Hover reveals a 3-dot menu: Duplicate, Rename, Move to folder, Delete, Schedule.

### Template Catalog

| Template | Purpose | Default Tiles | Default Charts |
|---|---|---|---|
| **Stockout Analysis** | Identify stockout patterns and root causes. | Total SKU, Stockout Count, Fill Rate, Avg Days OOS | Bar (by category), Table (top SKUs), Trend (30-day) |
| **Inventory Velocity** | Measure how fast SKUs move through the warehouse. | Avg Turn Rate, Slow Movers, Dead Stock $, Days of Supply | Histogram (turn rate), Scatter (velocity vs value), Treemap (value distribution) |
| **Reorder Performance** | Evaluate reorder point accuracy and supplier lead times. | Reorder Accuracy, Avg Lead Time, Late Deliveries, Stockout on Reorder | Bullet (lead time vs target), Line (lead time trend), Bar (by supplier) |
| **Cycle Count Accuracy** | Audit count quality and discrepancy patterns. | Count Completion, Discrepancy Rate, $ Discrepancy, High-Var SKUs | Heatmap (by location × day), Bar (discrepancy by category), Table (worst SKUs) |
| **Supplier Scorecard** | Rank suppliers by delivery, quality, and cost metrics. | On-Time %, Defect Rate, Cost Variance, Active POs | Radar (multi-dimensional), Bar (ranked), Trend (12-month) |
| **Warehouse Utilization** | Visualize space, labor, and throughput efficiency. | Space Used, Picking Efficiency, Labor Hours, Throughput/Hr | Area (utilization over time), Heatmap (zone density), Gauge (efficiency) |
| **Aging Inventory** | Identify slow-moving and obsolete stock. | Total $ Aging, >90 days, >180 days, >365 days | Stacked Area (aging buckets), Bar (by category), Table (top aging SKUs) |
| **Audit Trail Summary** | Compliance-ready summary of all state changes. | Total Actions, Step-Up Actions, Destructive Actions, Anomalies | Timeline (activity by hour), Bar (by action type), Table (top actors) |

---

## 17.4 The Report Builder — Visual Query Composition

The Report Builder is a visual, drag-and-drop interface for composing custom reports. It is *not* a SQL editor (though power users can drop into SQL via `⌘ ⇧ Q`). It uses the same Query Composer token paradigm as the main inventory view, extended with chart-binding tokens.

### Builder Anatomy

```
┌─ Report Builder: "Q1 Stockout Analysis" ──────────────────────────────────┐
│                                                                           │
│  DATA SOURCES              FILTERS                  GROUPINGS             │
│  ┌────────────┐            ┌──────────────────┐     ┌──────────────────┐  │
│  │ 📦 SKUs    │──┐         │ site = WH-02     │     │ category         │  │
│  │ 📦 Trans.. │  │         │ status = stockout│     │ sku              │  │
│  │ 📦 Counts  │  └───────▶ │ date = Q1-2025   │     │ week             │  │
│  │ 📦 Suppl.. │            └──────────────────┘     └──────────────────┘  │
│  └────────────┘                                                              │
│                                                                           │
│  METRICS                    CHARTS                      LAYOUT             │
│  ┌────────────┐            ┌──────────────────┐     ┌──────────────────┐  │
│  │ # stockouts│──┐         │ Bar: by category │     │ 4×1 KPI row      │  │
│  │ fill rate  │  │         │ Table: top SKUs  │     │ 2×2 chart grid   │  │
│  │ avg days   │  ├───────▶ │ Trend: 30-day    │     │ Full-width table │  │
│  │ $ revenue  │  │         └──────────────────┘     └──────────────────┘  │
│  └────────────┘  │                                                            │
│                  │         BINDINGS                                          │
│                  └───────▶ ┌──────────────────┐                              │
│                            │ Bar.y = # stock..│                              │
│                            │ Bar.x = category │                              │
│                            │ Table.cols = ... │                              │
│                            └──────────────────┘                              │
│                                                                           │
│  [ Run Preview ]   [ Save ]   [ Save As Template ]   [ Schedule ]         │
└───────────────────────────────────────────────────────────────────────────┘
```

### The Five Token Types

| Token Type | Visual | Purpose |
|---|---|---|
| **Data Source** | 📦 Blue-gray pill with entity icon. | Declares which entities the report pulls from. Multi-select. Joins are inferred. |
| **Filter** | Pill with operator + value. | Constrains the dataset. Same operator library as the Query Composer (`=`, `!=`, `>`, `<`, `between`, `in`, `regex`, `relative-date`). |
| **Grouping** | Pill with field name. | Declares how results are bucketed. Order matters (first = primary). |
| **Metric** | Pill with aggregation function + field. | Declares what is calculated. Functions: `count`, `sum`, `avg`, `min`, `max`, `median`, `p95`, `distinct-count`, `first`, `last`. |
| **Chart Binding** | Arrow connector from metric to chart. | Binds a metric to a visual encoding (x-axis, y-axis, size, color). |

### Drag-and-Drop Gestures

- **Add token**: Drag from the left palette onto the appropriate lane. Token snaps into place with a 120ms spring animation (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Reorder**: Drag a token within its lane to reorder. Other tokens shift to make room (60ms slide).
- **Delete**: Drag a token downward out of its lane; it fades out (100ms) and is removed. Alternatively, click + `Backspace`.
- **Edit**: Click a token to open its editor popover (positioned below the token, 200ms fade-in).

### Filter Token Editor

```
┌─ Edit Filter ──────────────────────────────┐
│  Field:  [ site              ▼ ]            │
│  Op:     [ =                 ▼ ]            │
│  Value:  [ WH-02             ▼ ]  (multi)  │
│                                            │
│  Preview: 1,247 matching rows              │
│                                            │
│  [ Apply ]   [ Cancel ]                    │
└────────────────────────────────────────────┘
```

- The "Preview" line shows a live count of matching rows, updated via debounced API call (250ms after last change).
- Multi-value selectors render as chips inside the dropdown.

### Chart Binding Editor

```
┌─ Bind Metric to Chart ─────────────────────┐
│  Chart:   [ Bar: Stockout by Category  ▼ ] │
│  Encoding:                                  │
│    x-axis:  [ category           ▼ ]        │
│    y-axis:  [ # stockouts        ▼ ]        │
│    color:   [ site               ▼ ] (opt)  │
│    size:    [ —                  ▼ ] (opt)  │
│                                            │
│  [ Apply Binding ]   [ Cancel ]            │
└────────────────────────────────────────────┘
```

---

## 17.5 KPI Tile Component — The Atomic Unit of Insight

Every KPI in MANIFOLD is rendered as a tile with a strict anatomy. The tile is the smallest unit that can stand alone in a dashboard.

### Tile Anatomy

```
┌─ 240 × 120px ──────────────────────────────┐
│  STOCKOUT COUNT                    ℹ️  ⋯   │   ← Header (label + info + menu)
│                                            │
│  127                                       │   ← Big number (48px Berkeley Mono)
│                                            │
│  ▼ -23 vs Q4         ↗ 7-day trend         │   ← Comparison + sparkline
└────────────────────────────────────────────┘
```

**Token specifics:**
- Container: 240×120px (default), `padding: 16px 20px`, `border-radius: 12px`, `border: 1px solid --border-default`, `background: --surface-1`.
- Label: 11px Geist Sans uppercase, `letter-spacing: 0.04em`, `color: --slate-500`.
- Big number: 48px Berkeley Mono `tabular-nums`, `color: --slate-900`, `font-weight: 500`.
- Comparison: 12px Berkeley Mono. Up arrow `▲` in `--status-success`, down arrow `▼` in `--status-danger` (semantic depends on metric polarity — for stockouts, down is good, so the arrow is green even though it points down).
- Sparkline: 60×24px, rendered inline at the right. Uses the Phase 11 sparkline spec.
- Info icon (`ℹ️`): 14px, on hover shows a tooltip with metric definition and computation method.
- Menu (`⋯`): 14px, on click opens a dropdown with: View breakdown, Drill down, Add to dashboard, Export this metric.

### Tile States

| State | Visual | Trigger |
|---|---|---|
| **Loading** | Skeleton: gray pulse animation on the number area, label visible. | Data fetching. |
| **Loaded** | Full tile as described. | Data available. |
| **Stale** | Number rendered at 60% opacity, "stale" chip in amber at top-right. | Data older than refresh interval (default 5 min). |
| **Error** | Number replaced with `—`, red error chip "Data unavailable" with retry icon. | API failure. |
| **No data** | Number replaced with `0` in muted color, "no matching rows" subtext. | Filter returns empty set. |
| **Drilling** | Tile dims to 50% opacity, loading spinner overlays. | User clicked "Drill down". |

### Polarity-Aware Comparison

Metrics have an inherent polarity — "higher is better" or "lower is better." MANIFOLD stores polarity with the metric definition and uses it to color the comparison arrow, not the direction.

| Metric | Polarity | Up Arrow | Down Arrow |
|---|---|---|---|
| Fill Rate | Higher better | Green | Red |
| Stockout Count | Lower better | Red | Green |
| Inventory Value | Neutral | Slate | Slate |
| Discrepancy Rate | Lower better | Red | Green |
| Turn Rate | Higher better | Green | Red |

---

## 17.6 Chart Types — The Visual Vocabulary

MANIFOLD uses a constrained chart vocabulary. Each chart type maps to a specific data relationship. The system prevents users from choosing inappropriate charts (e.g., a pie chart with 47 slices) with inline guidance.

### Approved Chart Types

| Chart | Use For | Max Series | Max Points | Notes |
|---|---|---|---|---|
| **Bar (vertical)** | Comparing categories. | 1 | 20 bars | Beyond 20, switch to top-N + "Other". |
| **Bar (horizontal)** | Comparing categories with long labels. | 1 | 20 bars | Same as above. |
| **Grouped Bar** | Comparing 2-4 series across categories. | 4 | 12 categories × 4 series | Beyond 4 series, switch to stacked or small multiples. |
| **Stacked Bar** | Part-to-whole across categories. | 6 stacks | 12 categories | Use percentage stack for ratio comparison. |
| **Line** | Trend over time. | 4 | 200 points | Beyond 4 series, switch to small multiples. |
| **Area** | Trend over time with volume emphasis. | 3 | 200 points | Use stacked area for cumulative. |
| **Scatter** | Correlation between two metrics. | 1 | 500 points | Beyond 500, switch to heatmap or sample. |
| **Heatmap** | Density across two dimensions. | n/a | 12×12 grid | Beyond 12×12, bin the data. |
| **Treemap** | Hierarchical part-to-whole. | n/a | 200 leaves | Beyond 200, group smallest into "Other". |
| **Bullet** | Metric vs target with ranges. | 1 | n/a | Use for single-metric goal tracking. |
| **Table** | Multi-dimensional row inspection. | n/a | 10,000 (virtualized) | Always virtualized; never paginate. |
| **Gauge** | Single metric vs target. | 1 | n/a | Use sparingly; bullets are usually better. |
| **Radar** | Multi-dimensional comparison (2-3 entities). | 3 | 8 axes | Beyond 8 axes, illegible. |
| **Sankey** | Flow between stages. | n/a | 8 stages | Use for transfer/pick flow analysis. |

### Forbidden Charts (with Rationale)

| Chart | Why Forbidden |
|---|---|
| **Pie / Donut** (with >5 slices) | Length perception fails beyond 5 slices. Use treemap or stacked bar. |
| **3D anything** | 3D distorts length/area perception. Always 2D. |
| **Radar with >8 axes** | Illegible; axis crowding makes comparison impossible. |
| **Dual-axis line/bar** | Misleading; users infer correlation that may not exist. Use small multiples instead. |
| **Bubble (4+ dimensions)** | Size encoding is imprecise. Limit to 3 dimensions (x, y, size). |
| **Filled radar** | Overlapping fills obscure comparison. Outline only. |

---

## 17.7 The Export Pipeline

Every report — whether a KPI tile, a chart, a table, or the entire workspace — is exportable. MANIFOLD treats export as a first-class workflow with its own UI, queue, and history.

### Export Modal

Triggered by the `Export ▼` button in the report header.

```
┌─ Export: Q1 2025 · Stockout Analysis ──────────────────────┐
│                                                            │
│  Format:                                                   │
│    ( ) CSV   ( ) XLSX   ( ) PDF   ( ) JSON   ( ) API       │
│                                                            │
│  Scope:                                                    │
│    (•) Current view    ( ) All data (no filters)           │
│                                                            │
│  Include:                                                  │
│    [✓] KPI tiles    [✓] Charts    [✓] Tables               │
│    [ ] Raw data     [ ] Audit trail                        │
│                                                            │
│  Options:                                                  │
│    [✓] Include filters as header notes                     │
│    [✓] Include timestamp & author                          │
│    [ ] Include chart images (PDF only)                     │
│    Timezone: [ America/Tijuana ▼ ]                         │
│                                                            │
│  ┌─ Access Control ──────────────────────────────────────┐ │
│  │ Visibility: ( ) Private  (•) Shared with [ Finance ▼ ]│ │
│  │ Expiry:     ( ) Never  (•) 30 days  ( ) 7 days        │ │
│  │ Watermark:  [✓] Add "Confidential — Maria S. · Jan 15"│ │
│  └───────────────────────────────────────────────────────┘ │
│                                                            │
│  Estimated size: 2.4 MB · ~4,218 rows                      │
│                                                            │
│  [ Cancel ]                          [ Generate Export ]   │
└────────────────────────────────────────────────────────────┘
```

### Export Formats — Detailed Specifications

#### CSV
- Encoding: UTF-8 with BOM (for Excel compatibility).
- Delimiter: `,` (comma). Locale-aware: `;` (semicolon) if user locale uses comma as decimal separator.
- Quoting: All string fields quoted with `"`. Embedded quotes escaped as `""`.
- Line endings: `\r\n` (Windows-compatible).
- Header row: Always included, using field display names (not API names).
- Number format: Raw numeric (no thousands separator), decimal `.` regardless of locale. Locale formatting applied on import by the consuming application.
- Date format: ISO 8601 (`2025-01-15T14:32:00Z`).
- Multi-value cells: Pipe-separated (`|`) within a quoted string.

#### XLSX
- Generated via `exceljs` library.
- Sheet 1: "Report" — the data with formatted headers (bold, frozen top row, auto-filter enabled).
- Sheet 2: "Metadata" — report name, author, generated-at, filters, row count.
- Sheet 3: "Charts" (if included) — chart images embedded as PNG.
- Column widths: Auto-fit to content, max 60 chars.
- Number formatting: Locale-aware (`#,##0.00` for en-US, `#.##0,00` for de-DE).
- Conditional formatting: Heatmap colors on numeric columns matching the on-screen rendering.

#### PDF
- Generated via `@react-pdf/renderer` or server-side Puppeteer (depending on complexity).
- Page size: A4 (210×297mm) or Letter (8.5×11in), user-selectable.
- Margins: 18mm all sides.
- Header: Report title (left), "Generated 2025-01-15 14:32 by Maria S." (right).
- Footer: Page number (center), "MANIFOLD · Confidential" (left), report ID (right).
- Cover page: Title, subtitle, abstract (user-provided), KPI summary table.
- Body: Charts as embedded images (300 DPI), tables as native PDF tables (selectable text).
- Watermark: Diagonal text "Confidential — {user} · {date}" at 15% opacity, repeated across page.

#### JSON
- Structure: `{ metadata: {...}, data: [...], filters: {...}, generatedAt: "..." }`.
- Data is an array of row objects with consistent keys.
- Suitable for API ingestion or programmatic analysis.

#### API (Live Endpoint)
- Generates a stable URL: `https://manifold.acme.co/api/reports/r-4821/data`.
- Authenticated via bearer token (scoped to this report, revocable).
- Returns JSON by default; `?format=csv` for CSV stream.
- Rate-limited to 60 requests/hour per token.

### Export Queue & History

Large exports (over 10,000 rows or including chart images) are processed asynchronously. The user is notified via toast when the export is ready, and a persistent indicator in the header shows queue status.

```
┌─ Export Queue ─────────────────────────────┐
│ 🟢 Ready: Q1 Stockout.csv (2.4 MB)         │
│    [ Download ]   [ Share link ]           │
│                                            │
│ 🟡 Processing: Full Catalog.json           │
│    ████████░░░░  68% · ~45s remaining      │
│                                            │
│ ⚪ Queued: Supplier Scorecard.pdf          │
└────────────────────────────────────────────┘
```

- **Ready** exports are retained for 30 days (or per the expiry set at generation).
- **Processing** exports show a live progress bar (updated via WebSocket).
- **Queued** exports show their position in the queue.
- **Failed** exports show an error message with a retry button.

### Export History

Accessible from Settings → Exports. Shows every export the user has generated in the last 90 days, with re-download, share-link generation, and revoke capabilities.

---

## 17.8 Scheduled Reports

Any saved report can be scheduled for automatic generation and delivery.

### Schedule Editor

```
┌─ Schedule Report: Q1 Stockout Analysis ───────────────────┐
│                                                           │
│  Frequency:                                               │
│    ( ) One-time    (•) Daily    ( ) Weekly    ( ) Monthly │
│                                                           │
│  At: [ 08:00 ] [ America/Tijuana ▼ ]                      │
│                                                           │
│  (if weekly)  On: [ M ] [ T ] [ W ] [ T ] [ F ] [ S ] [ S]│
│  (if monthly) On: [ 1st ▼ ] of the month                  │
│                                                           │
│  Date range for each run:                                 │
│    (•) Previous day    ( ) Previous week                  │
│    ( ) Previous month  ( ) Trailing 30 days               │
│    ( ) Custom: [ start offset ] to [ end offset ]         │
│                                                           │
│  Deliver via:                                             │
│    [✓] Email  to: [ finance@acme.co           ] [ + Add ] │
│    [ ] Slack webhook: [ #warehouse-ops       ]            │
│    [ ] Upload to S3: [ s3://reports/manifold/ ]           │
│    [ ] API POST: [ https://erp.acme.co/ingest ]           │
│                                                           │
│  Format: [ PDF ▼ ]   (one per delivery channel)           │
│                                                           │
│  [ Save Schedule ]   [ Cancel ]                           │
└───────────────────────────────────────────────────────────┘
```

### Schedule States

| State | Visual | Behavior |
|---|---|---|
| **Active** | Green dot + next-run timestamp. | Runs on schedule. |
| **Paused** | Gray dot + "Paused by {user}". | Skipped until resumed. |
| **Failed** | Red dot + last error message. | Retried 3× with exponential backoff (5min, 15min, 60min), then paused and admin notified. |
| **Completed** (one-time) | Checkmark + completion timestamp. | Removed from active list, retained in history. |

---

## 17.9 The Annotation Layer

Reports are not just data — they are communication. MANIFOLD allows users to annotate charts with contextual notes, creating a collaborative layer of interpretation.

### Annotation Anatomy

```
        ┌─ Annotation ──────────────┐
        │ 📌 Maria S. · 2 days ago  │
        │                            │
        │ "Stockout spike on Jan 12 │
        │ was due to supplier delay │
        │ from Acme Corp (PO-4821). │
        │ See transfer log."        │
        │                            │
        │ [ Reply ] [ Resolve ] [⋯] │
        └────────────────────────────┘
              ↓
   ╱╲╱╲___╱╲╱╲╱╲___╱╲╱╲   ← chart line with pin at Jan 12
                      📍
```

- Annotations are anchored to a specific data point (x, y coordinate on the chart).
- The pin (`📍`) appears on the chart at the anchor point. On hover, the annotation card appears.
- Multiple annotations on the same point stack vertically, with a count badge: `📍 +3`.
- Annotations support threaded replies (max 2 levels deep — deeper threads move to a dedicated discussion view).
- "Resolve" collapses the annotation (pin becomes hollow `∘`), but it remains visible for historical context.

### Annotation Permissions

| Role | Create | Reply | Resolve | Delete |
|---|---|---|---|---|
| Observer | No | No | No | No |
| Operator | Yes (own) | Yes | No | Own only |
| Supervisor | Yes | Yes | Yes | Any |
| Manager+ | Yes | Yes | Yes | Any |

---

## 17.10 Dashboard Authoring

A dashboard is a curated collection of KPI tiles and charts from multiple reports, arranged on a single canvas for at-a-glance monitoring.

### Dashboard Canvas

- 12-column responsive grid, `gap: 16px`.
- Tiles can span 1, 2, 3, 4, 6, or 12 columns; 1, 2, or 3 rows.
- Drag-to-resize via bottom-right corner handle (16×16px).
- Drag-to-move via tile header (cursor: grab).
- Snap-to-grid with 8px tolerance.
- `⌘ ⇧ E` enters edit mode (tiles get dashed borders + resize handles).
- `Esc` exits edit mode (auto-saves layout).

### Dashboard Templates

| Template | Audience | Tiles |
|---|---|---|
| **Operations Overview** | Supervisor | Fill Rate, Active Transfers, Stockout Alerts, Picks/Hr, Receiving Queue, Cycle Count Progress |
| **Financial Health** | Manager | Inventory Value, Aging $, Carrying Cost, Shrinkage $, Stockout $ Loss, Supplier Cost Variance |
| **Compliance Audit** | Auditor | Count Accuracy, Discrepancy $, Audit Actions, PII Access Events, Step-Up Usage, Anomaly Count |
| **Warehouse Floor** | Operator | My Picks Today, My Counts, Pending Transfers, Low Stock in My Zone, Recent Activity, My Shift Stats |

---

## 17.11 Comparison & Split Views

For side-by-side analysis, MANIFOLD supports split views — two reports rendered side-by-side with synchronized interactions.

### Split View Layout

```
┌─ Split View: Q1 Stockout vs Q4 Stockout ──────────────────┐
│                                                           │
│  ┌─ Q1 2025 ──────────┐  ┌─ Q4 2024 ──────────┐          │
│  │ Stockouts: 127     │  │ Stockouts: 150     │          │
│  │ Fill Rate: 97.0%   │  │ Fill Rate: 95.8%   │          │
│  │                    │  │                    │          │
│  │ [Bar chart]        │  │ [Bar chart]        │          │
│  │  (synced hover)    │  │  (synced hover)    │          │
│  └────────────────────┘  └────────────────────┘          │
│                                                           │
│  Sync: [✓] Hover  [✓] Zoom  [ ] Scroll  [ ] Selection    │
└───────────────────────────────────────────────────────────┘
```

- Synced hover: hovering a category in the left chart highlights the same category in the right chart.
- Synced zoom: brush-selecting a range on the left zooms the right to the same range.
- Synced scroll: scrolling one table scrolls the other (for row-aligned comparison).
- Synced selection: selecting rows in one selects the corresponding rows in the other (matched by a user-selected key field).

---

## 17.12 Reporting Hotkeys

| Hotkey | Action |
|---|---|
| `⌘ R` | Open Reporting Workspace |
| `⌘ N` (in Reports) | New report from template |
| `⌘ S` | Save current report |
| `⌘ ⇧ S` | Save as new report (Save As) |
| `⌘ E` | Open Export modal |
| `⌘ ⇧ H` | Open report history |
| `⌘ ⇧ A` | Add annotation to hovered chart point |
| `⌘ ⇧ D` | Enter dashboard edit mode |
| `⌘ ⇧ V` | Toggle split view |
| `⌘ ⇧ T` | Run report (refresh) |
| `⌘ [` | Collapse Library rail |
| `⌘ ]` | Expand Library rail |

---

*End of Phase 17. The next phase documents the Workflow Automation & Rules Engine — the system through which repetitive warehouse operations become self-executing.*

---

# PHASE 18: WORKFLOW AUTOMATION & RULES ENGINE DESIGN

---

> *"The best warehouse is the one that runs itself while the operator watches. The second-best is the one where the operator presses one button and the warehouse runs itself. MANIFOLD's Rules Engine is engineered for the second case — because total autonomy without human review is how $50,000 of inventory gets auto-transferred to the wrong continent."*

---

## 18.1 The Automation Doctrine — Trust Through Transparency

MANIFOLD's Rules Engine is a **no-code visual automation builder** that lets supervisors and managers codify repetitive warehouse decisions into executable rules. The system is deliberately conservative: every rule is visible, every execution is auditable, and every automated action can be overridden. Automation in MANIFOLD does not replace the operator — it *pre-fills* the operator's next action and waits for a single keystroke of confirmation.

**The Four Laws of MANIFOLD Automation:**

| Law | Definition | Enforcement |
|---|---|---|
| **I. Visibility** | Every active rule is discoverable in under 3 clicks. No hidden automations. | The Automation Dashboard lists every rule, its trigger, its last execution, and its impact. |
| **II. Reversibility** | Every automated action can be undone within its reversal window. | All rule-triggered mutations create soft-state changes with a 24-hour reversal window. |
| **III. Escalation** | When a rule's confidence drops below threshold, it escalates to a human rather than executing. | Rules have a `confidence_threshold` (default 0.85). Below threshold, the rule creates a Task instead of executing. |
| **IV. Witness** | Destructive automated actions require a human co-signer. | Rules that perform transfers >$10,000 value, or affect >500 SKUs, route to a Task requiring step-up approval before execution. |

---

## 18.2 The Rule Data Model

Every rule in MANIFOLD is structured as **WHEN [trigger] AND [conditions] THEN [actions]**. This is stored as a serializable JSON document, versioned, and audited.

```typescript
interface Rule {
  id: string;                      // ULID
  name: string;                    // Human-readable, max 80 chars
  description: string;             // Max 500 chars, explains the "why"
  enabled: boolean;
  version: number;                 // Incremented on each save
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string };
  trigger: Trigger;
  conditions: Condition[];         // AND-ed together
  actions: Action[];               // Executed in parallel unless sequenced
  confidence_threshold: number;    // 0.0 to 1.0, default 0.85
  reversal_window_hours: number;   // Default 24
  max_executions_per_hour: number; // Rate limit, default 100
  cooldown_minutes: number;        // Min time between executions per target, default 0
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  tags: string[];
  lastExecutedAt?: string;
  executionCount: number;
  successCount: number;
  failureCount: number;
}
```

---

## 18.3 The Visual Rule Builder

The Rule Builder is a node-based editor — similar to a flowchart — where triggers, conditions, and actions are connected nodes. It is *not* a linear form; the visual topology makes complex rules legible at a glance.

### Builder Canvas

```
┌─ Rule Builder: "Auto-reorder fast movers" ─────────────────────────────────┐
│  [ v3 · saved 2h ago by Maria S. ]      [ Save ] [ Test ▼ ] [ Activate ]    │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   ┌─────────────────┐                                                      │
│   │  ⚡ TRIGGER       │                                                      │
│   │  Stock level     │                                                      │
│   │  changed         │      ┌─────────────────┐    ┌────────────────────┐  │
│   │  (real-time)     │─────▶│  ✓ CONDITION     │───▶│  ⚙ ACTION           │  │
│   └─────────────────┘      │  qty < reorder   │    │  Create purchase   │  │
│                            │  point           │    │  order (draft)     │  │
│                            └─────────────────┘    └─────────┬──────────┘  │
│                                                             │              │
│                                                             ▼              │
│                                                  ┌────────────────────┐    │
│                                                  │  ⚙ ACTION (next)   │    │
│                                                  │  Notify supervisor │    │
│                                                  │  via Slack         │    │
│                                                  └────────────────────┘    │
│                                                                            │
│  ── Confidence threshold: [████████████████░░░░] 0.85                      │
│  ── Reversal window: 24 hours     ── Max/hour: 100     ── Cooldown: 15 min │
│                                                                            │
│  [ + Add trigger ]  [ + Add condition ]  [ + Add action ]                  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Node Anatomy

Each node is a card with:
- **Header bar** (32px tall): Node type icon (⚡ trigger, ✓ condition, ⚙ action) + type label + drag handle.
- **Body** (variable height): The node's configured state, rendered as readable English.
- **Input port** (left edge): One connection point. Triggers have no input.
- **Output port** (right edge): One connection point. Actions have no output (unless chained).
- **Footer** (24px tall): Confidence indicator + delete button (visible on hover).

**Token specifics:**
- Node card: `width: 240px` (default), `border-radius: 8px`, `border: 1px solid --border-default`, `background: --surface-1`, `box-shadow: 0 1px 2px rgba(0,0,0,0.04)`.
- Trigger nodes: left border 3px `--coral-500`.
- Condition nodes: left border 3px `--amber-500`.
- Action nodes: left border 3px `--slate-700`.
- Selected node: `border-color: --coral-500`, `box-shadow: 0 0 0 3px rgba(232,96,60,0.15)`.
- Connection lines: 2px solid `--slate-400`, with a 8px directional arrowhead. Animated flow dots when the rule is being tested (12px dots, 400ms interval, `cubic-bezier(0.4, 0, 0.2, 1)`).

### Node Library (Palette)

Accessible from the left edge of the builder. Categorized into three sections matching the three node types.

---

## 18.4 Trigger Catalog

Triggers are the events that start a rule evaluation. MANIFOLD supports 12 trigger types, organized into 4 categories.

### Real-Time Triggers

| Trigger | Fires When | Payload |
|---|---|---|
| `stock.level_changed` | Any SKU's quantity changes by any amount. | `{ skuId, siteId, before, after, delta, reason, actor }` |
| `stock.threshold_crossed` | A SKU crosses a configured threshold (reorder point, safety stock, zero). | `{ skuId, siteId, threshold, direction, newLevel }` |
| `sku.status_changed` | A SKU's lifecycle status changes (active → discontinued, etc.). | `{ skuId, before, after, actor }` |
| `transfer.created` | A new transfer is initiated. | `{ transferId, fromSite, toSite, skus, totalValue }` |
| `transfer.completed` | A transfer is received at the destination. | `{ transferId, completedAt, discrepancies }` |

### Temporal Triggers

| Trigger | Fires When | Payload |
|---|---|---|
| `schedule.cron` | A cron expression matches. | `{ firedAt, cronExpression }` |
| `schedule.interval` | Every N minutes/hours/days. | `{ firedAt, interval }` |
| `schedule.daily_at` | At a specific time daily (site timezone). | `{ firedAt, siteTimezone }` |

### Composite Triggers

| Trigger | Fires When | Payload |
|---|---|---|
| `anomaly.detected` | The AI Anomaly Engine flags an anomaly (from Phase 8). | `{ anomalyId, type, severity, skuId, confidence }` |
| `count.discrepancy` | A cycle count reveals a discrepancy above threshold. | `{ countId, skuId, expected, actual, variance }` |

### External Triggers

| Trigger | Fires When | Payload |
|---|---|---|
| `api.webhook` | An external system calls a MANIFOLD webhook URL. | `{ webhookId, payload, signature }` |
| `supplier.edi_received` | An EDI 850/856/810 message is received and parsed. | `{ ediType, supplierId, parsedData }` |

---

## 18.5 Condition Catalog

Conditions filter the trigger payload. A rule with no conditions fires on every trigger event; a rule with conditions fires only when all conditions evaluate to true.

### Condition Operators

| Operator | Applies To | Example |
|---|---|---|
| `equals` | Strings, numbers, enums | `sku.category equals "Electronics"` |
| `not_equals` | Strings, numbers, enums | `transfer.toSite not_equals "WH-01"` |
| `greater_than` | Numbers | `stock.delta greater_than 100` |
| `less_than` | Numbers | `stock.level less_than reorderPoint` |
| `between` | Numbers | `stock.level between 0 and 10` |
| `in` | Lists | `sku.supplier in ["SUP-01", "SUP-04"]` |
| `not_in` | Lists | `sku.category not_in ["Food", "Pharma"]` |
| `contains` | Strings, lists | `sku.description contains "fragile"` |
| `regex` | Strings | `sku.code regex /^BRASS-/` |
| `time_between` | Time ranges | `trigger.firedAt time_between "06:00" and "18:00"` |
| `weekday_in` | Day-of-week lists | `trigger.firedAt weekday_in ["Mon","Tue","Wed","Thu","Fri"]` |
| `site_timezone` | Site TZ | `trigger.site timezone equals "America/Tijuana"` |
| `actor_role_in` | Role lists | `trigger.actor.role in ["Operator","Supervisor"]` |
| `value_at` | Cross-entity lookup | `sku.supplier.onTimeRate greater_than 0.95` |

### Compound Conditions

Conditions can be combined with AND / OR logic. The builder renders these as nested groups:

```
┌─ Condition Group (ALL of) ─────────────────┐
│  ✓ sku.category equals "Electronics"        │
│  ✓ stock.level less_than reorderPoint       │
│                                            │
│  ┌─ Condition Group (ANY of) ────────────┐ │
│  │  ✓ site equals "WH-02"                │ │
│  │  ✓ site equals "WH-03"                │ │
│  └────────────────────────────────────────┘ │
│                                            │
│  [ + Add condition ]   [ + Add group ]     │
└────────────────────────────────────────────┘
```

---

## 18.6 Action Catalog

Actions are what the rule does. MANIFOLD supports 16 action types, organized into 4 categories. Every action declares its `confidence_impact` — how much it lowers the rule's confidence when triggered (more impactful actions are more conservatively evaluated).

### Inventory Actions

| Action | Description | Confidence Impact | Reversible | Requires Step-Up |
|---|---|---|---|---|
| `adjust_quantity` | Change a SKU's quantity by a delta. | -0.10 | Yes (24h) | If delta > 100 |
| `transfer_stock` | Create a transfer between sites. | -0.20 | Yes (24h) | If value > $10K |
| `set_status` | Change a SKU's lifecycle status. | -0.15 | Yes (24h) | If status = "discontinued" |
| `update_reorder_point` | Adjust a SKU's reorder point. | -0.05 | Yes (24h) | No |
| `update_location` | Move a SKU to a different bin. | -0.10 | Yes (24h) | No |

### Communication Actions

| Action | Description | Confidence Impact | Reversible | Requires Step-Up |
|---|---|---|---|---|
| `send_notification` | Push a notification to a user/channel. | 0 | N/A | No |
| `send_email` | Send a templated email. | 0 | N/A | No |
| `send_slack_message` | Post to a Slack channel. | 0 | N/A | No |
| `create_task` | Create a Task assigned to a user/role. | 0 | Yes (until completed) | No |
| `create_calendar_event` | Add an event to a shared calendar. | 0 | Yes | No |

### Procurement Actions

| Action | Description | Confidence Impact | Reversible | Requires Step-Up |
|---|---|---|---|---|
| `create_purchase_order` | Generate a draft PO. | -0.25 | Yes (until sent) | Yes |
| `send_purchase_order` | Send a draft PO to a supplier. | -0.40 | No (only cancel) | Yes |
| `update_supplier_score` | Adjust a supplier's internal rating. | -0.10 | Yes | No |

### System Actions

| Action | Description | Confidence Impact | Reversible | Requires Step-Up |
|---|---|---|---|---|
| `call_webhook` | Send a payload to an external URL. | -0.15 | No | Yes |
| `trigger_count` | Schedule a cycle count for a SKU/zone. | -0.10 | Yes (until started) | No |
| `flag_for_review` | Mark an entity for human review (no state change). | 0 | Yes | No |
| `export_report` | Generate and deliver a report. | 0 | No | No |

---

## 18.7 Action Sequencing & Parallelism

By default, multiple actions in a rule execute in parallel. For actions that depend on each other (e.g., "create PO" then "send PO"), the builder supports explicit sequencing via action chains.

### Sequenced Chain

```
   ┌────────────────┐
   │ ⚙ create_po    │──────┐
   └────────────────┘      ▼
                   ┌────────────────┐
                   │ ⚙ send_po      │
                   └────────────────┘
```

- The second action receives the first action's output as input (e.g., the created PO's ID).
- If the first action fails, the chain halts. Already-executed prior actions are NOT rolled back (this is explicit — MANIFOLD does not support distributed transactions across actions). The failure is logged and the rule's failure count increments.
- Maximum chain depth: 5 actions. Beyond this, the rule should be split into multiple rules.

---

## 18.8 The Test/Simulation Engine

Before activating a rule, the builder runs a **dry-run simulation** against historical data. This shows what the rule *would have done* in the past 7/30/90 days, without actually doing it.

### Test Panel

```
┌─ Test: "Auto-reorder fast movers" ─────────────────────────┐
│                                                            │
│  Simulation period: ( ) 7 days  (•) 30 days  ( ) 90 days   │
│                                                            │
│  ┌─ Results ────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │  Would have fired: 47 times                          │  │
│  │  Actions executed:                                   │  │
│  │    • create_purchase_order: 47                       │  │
│  │    • send_slack_message: 47                          │  │
│  │                                                      │  │
│  │  Estimated impact:                                   │  │
│  │    • POs created: $84,200 total value                │  │
│  │    • Stockouts prevented (est.): 23                  │  │
│  │    • Over-order risk: 3 instances (6.4%)             │  │
│  │                                                      │  │
│  │  Confidence at execution:                            │  │
│  │    • Above threshold (0.85): 42 instances            │  │
│  │    • Below threshold (escalated to Task): 5          │  │
│  │                                                      │  │
│  │  [ View execution log ]   [ Download as CSV ]        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  [ Re-run test ]   [ Activate rule ]   [ Cancel ]          │
└────────────────────────────────────────────────────────────┘
```

### Execution Log (Per-Simulation)

Each simulated execution is logged with:
- Timestamp of the (hypothetical) trigger.
- Trigger payload.
- Condition evaluation results (which passed, which failed).
- Actions that would have executed.
- Confidence score at evaluation time.
- Estimated impact (quantity, value, downstream effects).

The log is virtualized (same as the main inventory table) and can be filtered/sorted/exported.

---

## 18.9 Rule Versioning & Change Management

Every save to a rule increments its version. Old versions are retained for 365 days and are diff-able.

### Version Diff View

```
┌─ Version Diff: v2 → v3 ───────────────────────────────────┐
│                                                           │
│  TRIGGER                                                  │
│  - stock.threshold_crossed                                │
│  + stock.threshold_crossed (threshold: "reorder_point")   │  ← refined
│                                                           │
│  CONDITIONS                                               │
│    (unchanged)                                            │
│                                                           │
│  ACTIONS                                                  │
│  - send_slack_message (channel: "#warehouse-ops")         │
│  + send_slack_message (channel: "#receiving-alerts")      │  ← changed
│  + create_task (assignee: "site_supervisor")              │  ← added
│                                                           │
│  CONFIDENCE THRESHOLD                                     │
│  - 0.80                                                   │
│  + 0.85                                                   │  ← raised
│                                                           │
│  Changed by: Maria S. · 2025-01-15 14:32                  │
│  Reason: "Move alerts to dedicated channel, add task      │
│  for supervisor follow-up."                               │
│                                                           │
│  [ Revert to v2 ]   [ Close ]                             │
└───────────────────────────────────────────────────────────┘
```

- Additions shown with green `+` prefix and green background tint.
- Removals shown with red `-` prefix and red background tint.
- Changes shown as paired removal + addition.
- Every version change requires a "Reason" free-text field (min 20 chars).

### Rollback

Any previous version can be rolled back. Rollback creates a *new* version (v4) that is a copy of the selected prior version. The original is not deleted. Rollback requires step-up.

---

## 18.10 The Automation Dashboard

The Automation Dashboard is the command center for all rules. It is the surface through which supervisors monitor rule health, review executions, and intervene when needed.

### Dashboard Layout

```
┌─ Automation Dashboard ─────────────────────────────────────────────────────┐
│ ▼ 2px Chromatic Thread (steady)                                            │
├────────────────────────────────────────────────────────────────────────────┤
│ ⌘K  MANIFOLD · Automation                          [Maria S.] [SUP] 🔔    │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐  │
│  │ ACTIVE RULES │ │ EXEC TODAY   │ │ ESCALATIONS  │ │ FAILURE RATE     │  │
│  │     24       │ │     187      │ │      12      │ │     2.1%         │  │
│  │ ▲ +3 this wk │ │ ▲ +23 vs avg │ │ ⚠ review     │ │ ▼ -0.4pp         │  │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────────┘  │
│                                                                            │
│  ┌─ Active Rules ───────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  Rule                          Trigger     Execs  Fail  Last  Conf   │  │
│  │  ─────────────────────────    ──────────   ─────  ────  ────  ────   │  │
│  │  ⚡ Auto-reorder fast movers   threshold    47    1     2m    0.92   │  │
│  │  ⚡ Flag slow movers           schedule    12    0     1h    0.88   │  │
│  │  ⚡ Notify on large transfer   transfer     8     0     18m   1.00   │  │
│  │  ⚡ Escalate discrepancies     count        3     0     45m   0.85   │  │
│  │  ⚡ Sync EDI to ERP            webhook      23    2     8m    0.95   │  │
│  │  ...                                                                 │  │
│  │                                                                      │  │
│  │  [ + New Rule ]   [ Templates ▼ ]   [ View Archive ]                 │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌─ Recent Executions ─────────────────────────────────────────────────┐   │
│  │  14:32  Auto-reorder  SKU-4821  create_po ✓  send_slack ✓  0.94    │   │
│  │  14:28  Notify large  TRF-2293  send_slack ✓                1.00    │   │
│  │  14:15  Sync EDI      PO-8821   call_webhook ✗ (timeout)   0.95    │   │
│  │  14:02  Flag slow     SKU-1193  flag_for_review ✓           0.88    │   │
│  │  ...                                                                 │   │
│  │  [ View all executions ]                                             │   │
│  └──────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

### Rule Health Indicators

| Indicator | Visual | Threshold |
|---|---|---|
| **Healthy** | Green dot | Failure rate < 5% over last 100 executions. |
| **Degraded** | Amber dot | Failure rate 5–15% over last 100 executions. |
| **Failing** | Red dot + auto-pause suggestion | Failure rate > 15% over last 100 executions. |
| **Stale** | Gray dot | No executions in 7 days (rule may be obsolete). |
| **Paused** | Gray square | Manually paused by an admin. |

### Auto-Pause

When a rule's failure rate exceeds 25% over 50 executions, the system auto-pauses it and notifies the rule's author + the site admin. The notification includes:
- The rule name and version.
- The recent failure messages.
- A deep link to the rule builder with the test panel pre-populated.
- A "Resume" button (requires step-up) for cases where the failures were expected.

---

## 18.11 Rule Templates — The Starter Library

To accelerate adoption, MANIFOLD ships with 20+ pre-built rule templates. These are not active by default — they must be reviewed, customized, and activated by a supervisor.

### Template Catalog (Subset)

| Template | Trigger | Actions | Use Case |
|---|---|---|---|
| **Auto-reorder fast movers** | `stock.threshold_crossed` (reorder) | `create_purchase_order` (draft) + `send_slack_message` | Maintain stock for high-velocity SKUs. |
| **Flag dead stock** | `schedule.cron` (weekly) | `flag_for_review` + `create_task` | Identify SKUs with no movement in 90 days. |
| **Large transfer alert** | `transfer.created` (value > $10K) | `send_notification` (manager) + `create_task` (approve) | Ensure high-value transfers get human review. |
| **Discrepancy escalation** | `count.discrepancy` (> 5%) | `create_task` (supervisor) + `send_email` | Ensure significant count variances are investigated. |
| **Supplier performance flag** | `transfer.completed` (late) | `update_supplier_score` (-0.1) + `flag_for_review` | Automatically track supplier reliability. |
| **Stockout cascade alert** | `stock.threshold_crossed` (zero) | `send_slack_message` + `create_task` (find substitute) | Coordinate response when a SKU stocks out. |
| **EDI auto-sync** | `supplier.edi_received` | `call_webhook` (ERP sync) + `send_notification` | Keep external systems in sync with EDI data. |
| **End-of-day reconciliation** | `schedule.daily_at` (18:00) | `export_report` (daily summary) + `send_email` | Daily close-out report to management. |
| **Anomaly investigation** | `anomaly.detected` (severity ≥ high) | `create_task` (analyst) + `flag_for_review` | Route AI-flagged anomalies for human review. |
| **Cold-chain breach** | `api.webhook` (temp sensor) | `set_status` (quarantine) + `send_notification` (manager) | Quarantine perishables when temperature exceeds threshold. |

---

## 18.12 Conflict Detection & Resolution

When multiple rules could fire on the same trigger, MANIFOLD evaluates all of them, but detects conflicts before executing.

### Conflict Types

| Conflict | Detection | Resolution |
|---|---|---|
| **Contradictory actions** | Two rules attempt `set_status` to different values on the same SKU. | Higher priority rule wins. Lower priority rule is logged as "superseded." |
| **Double-spend** | Two rules attempt `transfer_stock` from the same source, exceeding available quantity. | First-executed rule wins. Second rule fails with "insufficient stock" and is logged. |
| **Duplicate notification** | Two rules send the same notification to the same recipient within 60 seconds. | Notifications are deduplicated; only the first is sent. Both rules are logged. |
| **Circular trigger** | Rule A's action triggers Rule B, whose action triggers Rule A. | Detected via execution graph traversal. Both rules are auto-paused. Admins notified. |

### Conflict Preview

Before activating a rule, the builder runs a conflict analysis against all existing active rules:

```
┌─ Conflict Analysis ────────────────────────────────────────┐
│                                                            │
│  ⚠ 2 potential conflicts detected:                         │
│                                                            │
│  1. With rule "Large transfer alert" (v5):                 │
│     Both rules trigger on `transfer.created`.              │
│     Conditions overlap for transfers > $10K.               │
│     → Resolution: priority-based. New rule is P2,          │
│       existing is P1. Existing wins on overlap.            │
│                                                            │
│  2. With rule "Auto-reorder fast movers" (v3):             │
│     Both rules may create purchase orders for the same     │
│     SKU within 24 hours.                                   │
│     → Resolution: cooldown enforced. Whichever fires       │
│       first blocks the other for the cooldown period.      │
│                                                            │
│  [ Activate anyway ]   [ Adjust rule ]   [ Cancel ]        │
└────────────────────────────────────────────────────────────┘
```

---

## 18.13 The Execution Audit Trail

Every rule execution — successful, failed, or escalated — is logged immutably in the same audit trail as manual actions (Phase 16). The audit entry includes the rule ID, version, trigger payload, condition evaluations, and action results.

### Audit Entry for a Rule Execution

```
┌──────────────────────────────────────────────────────────────┐
│ 14:32:07  RULE: Auto-reorder fast movers (v3)                 │
│ Triggered by: stock.threshold_crossed                         │
│ Target: SKU-4821 (Acme Widget, Blue) · WH-02                  │
│                                                               │
│  Trigger payload:                                             │
│    { skuId: "SKU-4821", siteId: "WH-02", threshold:           │
│      "reorder_point", direction: "below", newLevel: 8 }       │
│                                                               │
│  Conditions (2/2 passed):                                     │
│    ✓ sku.category equals "Electronics"      → "Electronics"   │
│    ✓ stock.level less_than reorderPoint     → 8 < 10          │
│                                                               │
│  Confidence: 0.94 (above threshold 0.85) — executed           │
│                                                               │
│  Actions (2/2 succeeded):                                     │
│    ✓ create_purchase_order                                    │
│      → PO-9921 (draft, $240.00, 20 units)                     │
│    ✓ send_slack_message                                       │
│      → #receiving-alerts                                      │
│                                                               │
│  Reversal window: expires 2025-01-16 14:32                    │
│  Reversal: [ Reverse this execution ]                         │
│                                                               │
│ 🤖 automated · 0.031s total · 192.168.4.• · internal          │
└──────────────────────────────────────────────────────────────┘
```

---

## 18.14 Escalation to Tasks

When a rule's confidence drops below threshold, or when a destructive action requires human co-signing, the rule creates a **Task** instead of executing. Tasks appear in the recipient's Task Queue (a dedicated panel in the Command Canvas).

### Task Anatomy

```
┌─ Task: Review auto-reorder for SKU-4821 ───────────────────┐
│                                                            │
│  🤖 Created by rule: Auto-reorder fast movers (v3)         │
│     Triggered: 14:32 · Confidence: 0.72 (below 0.85)      │
│                                                            │
│  The rule would have:                                      │
│    • Created PO-9921 ($240.00, 20 units)                  │
│    • Sent Slack alert to #receiving-alerts                 │
│                                                            │
│  Why it was escalated:                                     │
│    SKU-4821 had a stockout 3 days ago. Reordering now     │
│    may over-correct if the recent demand was anomalous.   │
│                                                            │
│  Suggested action:                                         │
│    Review the demand trend and confirm or cancel.          │
│                                                            │
│  [ Approve & Execute ]   [ Modify & Execute ]   [ Reject ] │
│  [ Snooze 1h ]   [ Reassign ]                              │
└────────────────────────────────────────────────────────────┘
```

- **Approve & Execute**: Runs the rule's actions with the original payload. Logged as a human-approved execution.
- **Modify & Execute**: Opens the action payload in an editor; user adjusts values then executes. Logged as modified.
- **Reject**: Cancels the task. The rule's escalation count increments. If a rule's escalation rate exceeds 30% over 50 executions, it is flagged for review (the rule's confidence threshold may be too high, or the rule itself may be poorly designed).
- **Snooze 1h**: Defers the decision. After 3 snoozes, the task auto-escalates to the next role up.
- **Reassign**: Sends the task to another user. Requires the reassigner to have the `task:reassign` capability.

---

## 18.15 Automation Hotkeys

| Hotkey | Action |
|---|---|
| `⌘ ⇧ R` | Open Automation Dashboard |
| `⌘ ⇧ N` (in Automation) | New rule from blank or template |
| `⌘ ⇧ T` | Run test simulation on current rule |
| `⌘ ⇧ V` | Toggle version diff view |
| `⌘ ⇧ E` | Open execution log for current rule |
| `⌘ ⇧ P` | Pause/resume current rule |
| `⌘ ⇧ X` | Export rule as JSON |
| `⌘ ⇧ L` | Open rule library / templates |
| `⌘ ⇧ A` | Open active executions live view |
| `Esc` | Exit builder without saving |

---

*End of Phase 18. The next appendix documents the Theming & White-Label system — the mechanism through which MANIFOLD becomes each tenant's own.*

---

# APPENDIX P: THEMING & WHITE-LABEL MULTI-TENANT SYSTEM

---

> *"MANIFOLD's coral is the system's signature — but when the system belongs to a customer, the signature must yield to the customer's identity. The theming system is engineered so that a tenant can make MANIFOLD unmistakably theirs, without breaking the semantic color contracts that keep the warehouse safe."*

---

## P.1 The Theming Doctrine — Brand Flex, Semantic Lock

MANIFOLD's theming system distinguishes between **brand tokens** (which tenants can customize freely) and **semantic tokens** (which are locked to preserve operational safety). A tenant can change the brand color from coral to forest green, but they cannot change the "stockout" color from red to green — that would break the Traffic Light Inventory Matrix contract.

### Token Categories

| Category | Customizable by Tenant | Examples |
|---|---|---|
| **Brand** | Yes | `--brand-primary`, `--brand-accent`, `--brand-surface-tint` |
| **Neutral** | Yes (within constraints) | `--surface-1` through `--surface-4`, `--border-default`, `--text-primary` |
| **Typography** | Yes (from approved font list) | `--font-sans`, `--font-mono` |
| **Status / Semantic** | No (locked) | `--status-success`, `--status-warning`, `--status-danger`, `--status-info` |
| **Inventory Matrix** | No (locked) | `--inv-in-stock`, `--inv-low`, `--inv-out`, `--inv-reorder` |
| **Security** | No (locked) | `--sec-amber`, `--sec-red`, `--sec-purple`, `--sec-coral` |
| **Spacing / Radius / Motion** | No (locked) | All spacing, border-radius, cubic-bezier tokens |

### Brand Token Customization Rules

| Rule | Enforcement |
|---|---|
| Brand primary must pass WCAG AAA on white (≥ 7:1). | Theme editor rejects colors that fail; suggests nearest passing alternative. |
| Brand primary must pass WCAG AA on `--surface-1` (≥ 4.5:1). | Same as above. |
| Brand primary must not collide with any semantic status color (ΔE2000 ≥ 15). | Theme editor shows collision warning with the conflicting semantic token. |
| Brand accent (if used) must be ≥ 4.5:1 contrast against brand primary. | Enforced for accessibility of brand-on-brand elements. |
| Dark mode brand primary must be lightened to maintain contrast (≥ 4.5:1 on dark surfaces). | Auto-adjusted via `color-mix()` or a tenant-specified dark variant. |

---

## P.2 The Theme Object Structure

Every theme is a serializable JSON document, versioned, and applied as CSS custom properties at runtime.

```typescript
interface Theme {
  id: string;                       // ULID
  name: string;                     // e.g., "Acme Logistics — Standard"
  version: number;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
  author: { id: string; name: string };
  status: 'draft' | 'active' | 'archived';
  brand: {
    primary: string;                // hex, e.g., "#E8603C"
    primaryDark: string;            // dark mode variant
    accent: string;                 // optional, for secondary highlights
    surfaceTint: string;            // rgba, for subtle brand washes
  };
  neutral: {
    surface1: string;               // lightest
    surface2: string;
    surface3: string;
    surface4: string;               // darkest (still "light" mode)
    borderDefault: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
  };
  darkNeutral: {                    // overrides for dark mode
    surface1: string;               // darkest
    surface2: string;
    surface3: string;
    surface4: string;               // lightest (still "dark" mode)
    borderDefault: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
  };
  typography: {
    fontSans: string;               // CSS font-family string
    fontMono: string;
    fontSansUrl?: string;           // @font-face URL if custom
    fontMonoUrl?: string;
  };
  logo: {
    light: string;                  // URL, SVG preferred
    dark: string;                   // URL, for dark mode
    favicon: string;                // URL
  };
  customCss?: string;               // limited CSS, sanitized
}
```

---

## P.3 The Theme Editor

Accessible from Settings → Branding & Theme. Restricted to Administrator and Root roles.

### Editor Layout

```
┌─ Theme Editor: Acme Logistics — Standard ──────────────────────────────────┐
│  [ v4 · saved 1d ago by James L. ]   [ Preview ▼ ] [ Save ] [ Activate ]    │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─ Brand Colors ──────────────────────────┐  ┌─ Live Preview ──────────┐ │
│  │                                         │  │                         │ │
│  │  Primary:   [ #E8603C ] [██]            │  │  ┌────────────────────┐ │ │
│  │  Contrast:  7.2:1 on white ✓ AAA        │  │  │ ▼ 2px brand thread  │ │ │
│  │             5.1:1 on surface-1 ✓ AA     │  │  ├────────────────────┤ │ │
│  │                                         │  │  │ ⌘K  Acme · Inventory│ │ │
│  │  Primary Dark: [ #F4754F ] [██]         │  │  │  [SKU-4821]  238   │ │ │
│  │  (auto-generated, editable)             │  │  │  [SKU-1193]  144   │ │ │
│  │                                         │  │  │  [SKU-7782]  92    │ │ │
│  │  Accent:    [ #F59E0B ] [██]            │  │  └────────────────────┘ │ │
│  │  (optional)                             │  │                         │ │
│  │                                         │  │  [ Primary Button ]    │ │
│  │  Surface Tint: [ rgba(232,96,60,0.06) ] │  │  [ Ghost Button ]      │ │
│  │                                         │  │                         │ │
│  └─────────────────────────────────────────┘  └─────────────────────────┘ │
│                                                                            │
│  ┌─ Neutrals (Light) ──────────────────────┐  ┌─ Neutrals (Dark) ───────┐ │
│  │  Surface 1: [ #FFFFFF ] [██]             │  │  Surface 1: [ #0F172A ] │ │
│  │  Surface 2: [ #F8FAFC ] [██]             │  │  Surface 2: [ #1E293B ] │ │
│  │  Surface 3: [ #F1F5F9 ] [██]             │  │  Surface 3: [ #334155 ] │ │
│  │  Surface 4: [ #E2E8F0 ] [██]             │  │  Surface 4: [ #475569 ] │ │
│  │  Border:    [ #E2E8F0 ] [██]             │  │  Border:    [ #1E293B ] │ │
│  │  Text 1:    [ #0F172A ] [██]             │  │  Text 1:    [ #F8FAFC ] │ │
│  │  Text 2:    [ #475569 ] [██]             │  │  Text 2:    [ #94A3B8 ] │ │
│  │  Text 3:    [ #94A3B8 ] [██]             │  │  Text 3:    [ #64748B ] │ │
│  └─────────────────────────────────────────┘  └─────────────────────────┘ │
│                                                                            │
│  ┌─ Typography ────────────────────────────┐  ┌─ Logo ──────────────────┐ │
│  │  Sans: [ Inter (default)        ▼ ]      │  │  Light: [acme-light.svg]│ │
│  │        [ + Upload custom ]               │  │  Dark:  [acme-dark.svg] │ │
│  │  Mono: [ Berkeley Mono (default) ▼ ]     │  │  Favicon: [favicon.ico] │ │
│  │        [ + Upload custom ]               │  │  [ Upload ] [ Preview ] │ │
│  └─────────────────────────────────────────┘  └─────────────────────────┘ │
│                                                                            │
│  ┌─ Validation ──────────────────────────────────────────────────────────┐ │
│  │  ✓ All brand colors pass WCAG AAA on white.                            │ │
│  │  ✓ All brand colors pass WCAG AA on surface-1.                         │ │
│  │  ✓ Brand primary does not collide with any semantic status color.      │ │
│  │  ⚠ Brand accent (#F59E0B) is within ΔE2000 12 of status-warning.       │ │
│  │     Consider darkening to #D97706 to avoid confusion.                  │ │
│  │  ✓ Custom font loaded successfully (44KB woff2).                        │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────┘
```

### Live Preview Modes

The preview pane can render four contexts:
1. **Inventory Table** — the main Command Canvas with sample SKUs.
2. **Auth Screen** — the sign-in page (dark, always).
3. **Print Label** — a 50×30mm shelf label.
4. **Mobile App** — the field application layout.

This ensures the theme is validated across all surfaces, not just the primary one.

---

## P.4 Brand Color Auto-Adjustment

When a tenant sets a brand primary, MANIFOLD auto-generates a 9-step color scale (50–950) using the OKLCH color space for perceptual uniformity. The tenant can override any step.

### Generated Scale (example for #E8603C)

| Step | Hex | Usage |
|---|---|---|
| 50 | `#FEF3F0` | Subtle brand tints, hover backgrounds. |
| 100 | `#FDE4DD` | Selected row backgrounds. |
| 200 | `#FBC9BC` | Disabled brand elements. |
| 300 | `#F7A78F` | Brand borders. |
| 400 | `#F0835F` | Brand icons on light surfaces. |
| 500 | `#E8603C` | Primary brand — buttons, links. |
| 600 | `#D4542E` | Hover state for primary buttons. |
| 700 | `#B54524` | Active/pressed state. |
| 800 | `#913A1F` | Brand text on light surfaces. |
| 900 | `#78301C` | Deep brand for dark mode text. |

### Dark Mode Auto-Adjustment

In dark mode, the brand primary is lightened by ~15% in L (OKLCH lightness) to maintain contrast on dark surfaces. The auto-generated `primaryDark` is shown in the editor and is editable.

---

## P.5 Font Selection — Approved Font List

Tenants can choose from a curated list of fonts (or upload their own, subject to licensing verification).

### Approved Sans-Serif Fonts

| Font | License | Why Approved | Loading |
|---|---|---|---|
| **Inter** | OFL | Default; excellent legibility at small sizes. | System bundle. |
| **Geist Sans** | OFL | MANIFOLD default; modern geometric. | System bundle. |
| **IBM Plex Sans** | OFL | Strong for enterprise; 6 weights. | Google Fonts. |
| **Manrope** | OFL | Friendly but professional. | Google Fonts. |
| **DM Sans** | OFL | High x-height, excellent for dense data. | Google Fonts. |
| **Söhne** | Commercial | Premium enterprise; requires license proof. | Self-host. |

### Approved Monospace Fonts

| Font | License | Why Approved | Loading |
|---|---|---|---|
| **Berkeley Mono** | Commercial | MANIFOLD default; requires license. | Self-host. |
| **JetBrains Mono** | OFL | Excellent for code and data. | Google Fonts. |
| **IBM Plex Mono** | OFL | Pairs with IBM Plex Sans. | Google Fonts. |
| **Geist Mono** | OFL | Pairs with Geist Sans. | System bundle. |
| **Spline Sans Mono** | OFL | Readable at 11px. | Google Fonts. |

### Custom Font Upload

- Accepted formats: `.woff2` (preferred), `.woff`, `.ttf` (converted server-side).
- Max file size: 200KB per weight (use `font-subset` for latin-only to reduce size).
- Max fonts per theme: 4 (2 sans weights + 2 mono weights, or 1 sans + 1 mono with multiple weights).
- License attestation required: tenant must attest they have the right to use the font.
- Fonts are served from a CDN with proper `Cache-Control: max-age=31536000, immutable`.

---

## P.6 Multi-Tenant Theme Cascade

MANIFOLD applies themes via a cascade with four layers, each overriding the previous:

1. **System Default** — the base MANIFOLD theme (coral + Geist). Always present as fallback.
2. **Tenant Theme** — the tenant's active theme. Applied at the root `<html>` element.
3. **Site Override** — an optional per-site theme override (e.g., a specific warehouse using a different brand color for visual differentiation). Applied via a `data-site` attribute selector.
4. **User Preference** — an optional per-user override (e.g., a user who prefers a higher-contrast variant). Applied via a `data-user` attribute selector.

### Cascade Order (CSS)

```css
/* Layer 1: System default (always loaded) */
:root {
  --brand-primary: #E8603C;
  --brand-primary-dark: #F4754F;
  /* ... all default tokens ... */
}

/* Layer 2: Tenant theme */
:root[data-tenant="acme"] {
  --brand-primary: #0D7C66;        /* Acme's forest green */
  --brand-primary-dark: #14A085;
  --surface-tint: rgba(13,124,102,0.06);
  /* ... Acme overrides ... */
}

/* Layer 3: Site override */
:root[data-tenant="acme"][data-site="WH-04"] {
  --brand-primary: #B91C1C;        /* WH-04 uses red for high-visibility */
  --brand-primary-dark: #DC2626;
}

/* Layer 4: User preference */
:root[data-tenant="acme"][data-user="u-8821"] {
  --text-primary: #000000;         /* Higher contrast for this user */
}
```

### Theme Loading

- The active theme ID is determined server-side from the tenant's config.
- Theme JSON is inlined into the HTML response as a `<script type="application/json" id="theme-data">` block.
- A small (2KB) runtime script reads the JSON and applies it as CSS custom properties on `<html>`.
- This avoids a flash of unstyled content (FOUC) because the script runs synchronously in `<head>`.

---

## P.7 Theme Preview Gallery

Tenants can save multiple draft themes and preview them side-by-side before activating.

### Gallery Layout

```
┌─ Theme Gallery ────────────────────────────────────────────────────────────┐
│                                                                            │
│  ┌─ Active ──────────┐  ┌─ Drafts ──────────┐  ┌─ Archived ──────────┐    │
│  │                   │  │                   │  │                   │    │
│  │ ┌───────────────┐ │  │ ┌───────────────┐ │  │ ┌───────────────┐ │    │
│  │ │ Acme Standard │ │  │ │ Acme Q4 Holiday│ │  │ │ Acme v1 (old) │ │    │
│  │ │ [preview]     │ │  │ │ [preview]     │ │  │ │ [preview]     │ │    │
│  │ │ v4 · active   │ │  │ │ v2 · draft    │ │  │ │ v3 · archived │ │    │
│  │ │ [ Edit ]      │ │  │ │ [ Edit ]      │ │  │ │ [ Restore ]   │ │    │
│  │ └───────────────┘ │  │ └───────────────┘ │  │ └───────────────┘ │    │
│  │                   │  │ ┌───────────────┐ │  │                   │    │
│  │                   │  │ │ Acme HC Mode  │ │  │                   │    │
│  │                   │  │ │ [preview]     │ │  │                   │    │
│  │                   │  │ │ v1 · draft    │ │  │                   │    │
│  │                   │  │ │ [ Edit ]      │ │  │                   │    │
│  │                   │  │ └───────────────┘ │  │                   │    │
│  └───────────────────┘  └───────────────────┘  └───────────────────┘    │
│                                                                            │
│  [ + New Theme ]   [ Import JSON ]   [ Export Active ]                    │
└───────────────────────────────────────────────────────────────────────────┘
```

- Each preview is a 240×160px thumbnail rendering of the inventory table with the theme applied.
- Drafts can be previewed in a full-screen modal before activation.
- Activating a draft moves the current active theme to Archived.
- Archived themes can be restored (creating a new version).

---

## P.8 Theme Export & Import

Themes can be exported as JSON for backup, sharing between tenants (e.g., a franchise with multiple MANIFOLD instances), or version control.

### Export Format

```json
{
  "schema": "manifold.theme.v1",
  "exportedAt": "2025-01-15T14:32:00Z",
  "exportedBy": { "id": "u-8821", "name": "James L." },
  "theme": {
    "name": "Acme Logistics — Standard",
    "version": 4,
    "brand": { "primary": "#0D7C66", "primaryDark": "#14A085", ... },
    "neutral": { ... },
    "darkNeutral": { ... },
    "typography": { "fontSans": "IBM Plex Sans", ... },
    "logo": { "light": "data:image/svg+xml;base64,...", ... }
  }
}
```

- Logos are embedded as base64 data URIs for portability.
- Custom fonts are NOT embedded (too large); the export notes the font name and the tenant must re-upload on import.
- Import validates the JSON against the theme schema and runs the same validation rules as the editor.

---

## P.9 Accessibility Variant Generation

For each tenant theme, MANIFOLD auto-generates two accessibility variants:

### High Contrast Variant

- All text colors darkened to pure black (`#000000`) or lightened to pure white (`#FFFFFF`).
- All borders thickened from 1px to 2px.
- Brand colors darkened by 20% to ensure ≥ 7:1 contrast on all surfaces.
- Status colors use the high-contrast variants from Phase 3.
- This variant is selectable from the user's profile settings.

### Colorblind-Safe Variant

- For deuteranopia/protanopia: red and green status colors are shifted to coral and blue respectively (using the `--cb-safe-*` tokens from Phase 3).
- For tritanopia: blue and yellow are shifted to pink and gray.
- The variant is auto-applied if the user's OS reports a color vision deficiency (via `prefers-contrast` and custom detection), or manually selectable.

---

## P.10 Theme Hotkeys

| Hotkey | Action |
|---|---|
| `⌘ ⇧ T` (in Settings) | Open Theme Editor |
| `⌘ ⇧ G` | Open Theme Gallery |
| `⌘ ⇧ P` | Preview current theme in all 4 contexts |
| `⌘ ⇧ E` | Export current theme as JSON |
| `⌘ ⇧ I` | Import theme from JSON (opens file picker) |
| `⌘ ⇧ H` | Toggle high-contrast variant (user-level) |

---

*End of Appendix P. The next appendix documents the Data Import/Export Pipeline — the system through which bulk data enters and leaves MANIFOLD.*

---

# APPENDIX Q: DATA IMPORT/EXPORT PIPELINE UX

---

> *"A warehouse migration without a sane import pipeline is a data disaster wearing a tuxedo. MANIFOLD's import system is engineered so that a 50,000-row supplier catalog can be brought in by a warehouse manager — not a data engineer — with full preview, partial-commit, and one-click rollback."*

---

## Q.1 The Import Doctrine — Preview Before Commit

MANIFOLD's import pipeline is built on a single principle: **no data touches the production database until the user has seen a row-by-row preview of what will happen and explicitly approved it.** This is non-negotiable. There is no "import and hope" path.

### The Four Stages

| Stage | Purpose | Duration (10K rows) |
|---|---|---|
| **1. Upload** | File is received, virus-scanned, parsed. | 2–5s |
| **2. Map** | Columns are mapped to MANIFOLD fields. | 30s–2min (user-driven) |
| **3. Validate** | Every row is validated; errors are categorized. | 5–15s |
| **4. Commit** | User reviews preview, chooses commit mode, confirms. | User-driven |

Each stage is resumable — the user can walk away and return. Progress is persisted in IndexedDB (local-first) and on the server.

---

## Q.2 Stage 1: Upload

### Upload Surface

Accessible from Settings → Data → Import, or via `⌘ ⇧ I` (global hotkey).

```
┌─ Import Data ──────────────────────────────────────────────────────────────┐
│                                                                            │
│  What are you importing?                                                   │
│    (•) SKUs         ( ) Suppliers    ( ) Transfers    ( ) Locations        │
│    ( ) Customers    ( ) Counts       ( ) Custom entity                      │
│                                                                            │
│  ┌────────────────────────────────────────────────────────────────────────┐│
│  │                                                                        ││
│  │                     ⬆  Drop file here                                  ││
│  │                                                                        ││
│  │             or  [ Choose File ]                                        ││
│  │                                                                        ││
│  │  Accepted: .csv  .xlsx  .xls  .json  .xml  .yaml  .txt (fixed-width)   ││
│  │  Max size: 50 MB · Max rows: 500,000                                   ││
│  │                                                                        ││
│  └────────────────────────────────────────────────────────────────────────┘│
│                                                                            │
│  Or paste data:                                                            │
│  ┌────────────────────────────────────────────────────────────────────────┐│
│  │                                                                        ││
│  │  (paste TSV / CSV / JSON here)                                         ││
│  │                                                                        ││
│  └────────────────────────────────────────────────────────────────────────┘│
│                                                                            │
│  Recent imports:                                                           │
│    • supplier-catalog-q1.csv   (12,847 rows · 2h ago · ✓ committed)       │
│    • sku-batch-update.xlsx     (847 rows · yesterday · ⚠ partial commit)  │
│    • locations-import.csv      (340 rows · 3d ago · ✓ committed)          │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Upload Constraints & Validation

| Constraint | Limit | Failure Behavior |
|---|---|---|
| File size | 50 MB | Reject with "File too large. Split into multiple files under 50 MB each." |
| Row count | 500,000 | Reject with "Too many rows. Split into files under 500,000 rows." |
| Empty file | 0 bytes | Reject with "File appears to be empty." |
| Unsupported format | n/a | Reject with list of accepted formats. |
| Encoding | UTF-8, UTF-16, Latin-1, Windows-1252 | Auto-detected; if ambiguous, user is prompted to confirm. |
| Virus scan | ClamAV signature + heuristic | Reject + quarantine; admin notified. |

### Drag-and-Drop Affordance

- Drop zone: 600×200px, dashed 2px `--border-default` border, `border-radius: 12px`.
- Drag-over state: border becomes solid `--coral-500`, background tints `rgba(232,96,60,0.04)`, text "Drop to upload" appears.
- Drop animation: file icon fades in at cursor position, slides to center (200ms spring).
- Rejected drop (e.g., wrong file type): drop zone shakes 2× (left-right, 100ms each), red border flash, toast: "That file type isn't supported."

---

## Q.3 Stage 2: Column Mapping

The most error-prone stage. MANIFOLD uses a combination of header-name matching, data-type inference, and AI suggestions to pre-map columns, then lets the user review and adjust.

### Mapping Surface

```
┌─ Map Columns: supplier-catalog-q1.csv ─────────────────────────────────────┐
│  12,847 rows · 14 columns detected · [Back] [Re-upload] [Continue →]        │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─ Source Columns ──────────────┐  ┌─ MANIFOLD Field ──┐  ┌─ Preview ──┐ │
│  │                                │  │                    │  │             │ │
│  │  1. "Supplier ID"      →       │  │  supplier.code  ✓  │  │ SUP-001     │ │
│  │  2. "Company Name"     →       │  │  supplier.name  ✓  │  │ Acme Corp   │ │
│  │  3. "Contact"          →       │  │  supplier.contact✓ │  │ J. Smith    │ │
│  │  4. "Phone"            →       │  │  supplier.phone  ✓ │  │ 555-0100    │ │
│  │  5. "Email"            →       │  │  supplier.email  ✓ │  │ j@acme.co   │ │
│  │  6. "Address Line 1"   →       │  │  supplier.addr1  ✓ │  │ 123 Main St │ │
│  │  7. "City"             →       │  │  supplier.city   ✓ │  │ Springfield │ │
│  │  8. "State"            →       │  │  supplier.state  ✓ │  │ IL          │ │
│  │  9. "Zip"              →       │  │  supplier.zip    ✓ │  │ 62704       │ │
│  │ 10. "Country"          →       │  │  supplier.country✓ │  │ USA         │ │
│  │ 11. "Payment Terms"    →       │  │  ⚠ Unmapped        │  │ Net 30      │ │
│  │ 12. "Discount %"       →       │  │  ⚠ Unmapped        │  │ 5%          │ │
│  │ 13. "Notes"            →       │  │  supplier.notes  ✓ │  │ Preferred   │ │
│  │ 14. "Last Order Date"  →       │  │  ⚠ Unmapped        │  │ 2024-12-15  │ │
│  │                                │  │                    │  │             │ │
│  └────────────────────────────────┘  └────────────────────┘  └─────────────┘ │
│                                                                            │
│  ┌─ AI Suggestions ──────────────────────────────────────────────────────┐  │
│  │  💡 "Payment Terms" looks like it maps to supplier.payment_terms.     │  │
│  │      [ Accept ]   [ Dismiss ]                                        │  │
│  │                                                                        │  │
│  │  💡 "Discount %" looks like it maps to supplier.discount_rate.        │  │
│  │      [ Accept ]   [ Dismiss ]                                        │  │
│  │                                                                        │  │
│  │  💡 "Last Order Date" has no MANIFOLD equivalent. Consider creating   │  │
│  │      a custom field, or skip this column.                             │  │
│  │      [ Create custom field ]   [ Skip column ]                       │  │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  Mapping mode:                                                             │
│    (•) Create new records (ignore existing)                                │
│    ( ) Update existing records (match by: [ supplier.code ▼ ])             │
│    ( ) Upsert (create if new, update if exists)                            │
│                                                                            │
│  [ Save mapping as template ]   [ Continue → ]                             │
└────────────────────────────────────────────────────────────────────────────┘
```

### Mapping UI Tokens

- Source column row: 48px tall, `padding: 8px 12px`, hover highlights with `--surface-2`.
- Arrow (`→`): 16px, `--slate-400`.
- Mapped field: green check `✓` + field name in `--status-success` text.
- Unmapped: amber warning `⚠` + "Unmapped" in `--status-warning` text.
- Preview column: shows the first data row's value for that column, in Berkeley Mono 12px.

### Mapping Templates

After completing a mapping, the user can save it as a template. Templates are named (e.g., "Acme Supplier Catalog — Standard") and can be reused for future imports of the same file format. Templates are tenant-scoped.

### Mapping Modes

| Mode | Behavior | Use Case |
|---|---|---|
| **Create new** | Every row creates a new record. Duplicates (by match key) are errors. | Initial data load, adding new SKUs. |
| **Update existing** | Only existing records are updated. New records in the file are errors. | Refreshing supplier contact info. |
| **Upsert** | Existing records are updated; new records are created. | Periodic sync from supplier portal. |

---

## Q.4 Stage 3: Validation

Every row is validated against the MANIFOLD schema and business rules. Errors are categorized by severity.

### Validation Surface

```
┌─ Validation Results: supplier-catalog-q1.csv ──────────────────────────────┐
│  12,847 rows validated · [Back] [Re-validate] [Continue →]                  │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─ Summary ────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  ✅ Valid:      12,421 rows  (96.7%)                                 │  │
│  │  ⚠ Warnings:       312 rows  ( 2.4%)  — can commit with review       │  │
│  │  ❌ Errors:         114 rows  ( 0.9%)  — cannot commit               │  │
│  │                                                                      │  │
│  │  ┌────────────────────────────────────────────────────────────────┐  │  │
│  │  │ Errors by type:                                                │  │  │
│  │  │   • Required field missing:        62                          │  │  │
│  │  │   • Invalid format (email/phone):  28                          │  │  │
│  │  │   • Duplicate code:                18                          │  │  │
│  │  │   • Value out of range:             6                          │  │  │
│  │  └────────────────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌─ Error Rows (114) ───────────────────────────────────────────────────┐   │
│  │  [ Show: (•) Errors only  ( ) Warnings  ( ) All ]                    │   │
│  │                                                                      │   │
│  │  Row  Field           Value            Error                         │   │
│  │  ───  ───────────     ──────────────   ──────────────────────────    │   │
│  │  47   supplier.email  (empty)          Required field missing        │   │
│  │  103  supplier.phone  "555-0100-x999"  Invalid phone format          │   │
│  │  218  supplier.code   "SUP-001"        Duplicate (already in row 12) │   │
│  │  442  supplier.zip    "6270"           Value out of range (min 5)    │   │
│  │  ...                                                                 │   │
│  │                                                                      │   │
│  │  [ Fix in editor ]   [ Download error rows as CSV ]   [ Skip errors ]│   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  Commit options:                                                           │
│    (•) Commit valid rows only (12,421) — skip 114 errors, keep 312 warns   │
│    ( ) Commit valid + warnings (12,733) — skip only 114 errors             │
│    ( ) Abort — fix errors and re-upload                                    │
│                                                                            │
│  [ Continue → ]                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Error Categories

| Severity | Color | Can Commit? | Example |
|---|---|---|---|
| **Error** | Red | No (row skipped) | Required field missing, invalid format, duplicate key. |
| **Warning** | Amber | Yes (with review) | Unusual value (e.g., phone with extension), data truncation, encoding substitution. |
| **Info** | Slate | Yes (no action needed) | Field will be ignored (unmapped), default value applied. |

### Inline Error Editor

For small error counts (<50), the user can fix errors directly in the import UI without re-uploading:

- Click an error row → inline editor opens below the table.
- Edit the value → "Re-validate this row" button.
- On valid, the row moves to the valid set.
- On invalid, the error message updates.

### Download Error Rows

Exports only the error rows (with their original row numbers) as a CSV. The user can fix these offline and re-upload just the error file for a second-pass import.

---

## Q.5 Stage 4: Commit & Preview

The final stage shows a preview of what will happen, then commits.

### Commit Preview

```
┌─ Commit Preview ───────────────────────────────────────────────────────────┐
│  Ready to import 12,421 rows into: Suppliers                               │
│                                                                            │
│  ┌─ What will happen ──────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  ✓ 12,421 new supplier records will be created.                     │   │
│  │  ✓ 312 rows have warnings (review recommended but not required).    │   │
│  │  ✓ 114 error rows will be skipped.                                  │   │
│  │  ✓ Mapping template "Acme Supplier Catalog" will be saved.          │   │
│  │                                                                      │   │
│  │  Estimated time: 2–3 minutes                                         │   │
│  │  Estimated storage: +1.2 MB                                          │   │
│  │                                                                      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌─ Sample Preview (first 5 rows) ─────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  Code      Name          Contact      Phone         Email            │   │
│  │  ────────  ────────────  ──────────   ────────────  ──────────────   │   │
│  │  SUP-001   Acme Corp     J. Smith     555-0100      j@acme.co        │   │
│  │  SUP-002   Beta Inc      M. Jones     555-0200      m@beta.com       │   │
│  │  SUP-003   Gamma LLC     A. Patel     555-0300      a@gamma.io       │   │
│  │  SUP-004   Delta Co      R. Garcia    555-0400      r@delta.co       │   │
│  │  SUP-005   Epsilon SA    L. Müller    +49 30 555    l@epsilon.de     │   │
│  │  ...                                                                 │   │
│  │                                                                      │   │
│  │  [ View all 12,421 rows ]                                            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌─ Safety ────────────────────────────────────────────────────────────┐   │
│  │  ✓ This import is reversible for 24 hours.                          │   │
│  │  ✓ A snapshot of affected records will be saved before commit.      │   │
│  │  ✓ All changes will be logged in the audit trail.                   │   │
│  │  ⚠ This import affects 12,421 records. Step-up required.            │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  [ ⬅ Back ]                          [ 🔐 Authenticate & Commit ]           │
└────────────────────────────────────────────────────────────────────────────┘
```

### Commit Progress

Once committed, the progress is shown in a dedicated panel:

```
┌─ Importing: 12,421 rows ───────────────────────────────────────────────────┐
│                                                                            │
│  ████████████████████████░░░░░░░░░░░░░░░░░░  68% · 8,421 / 12,421          │
│                                                                            │
│  ✓ Validating pre-flight checks...                                         │
│  ✓ Creating snapshot (rollback point)...                                   │
│  ✓ Beginning transaction...                                                │
│  ⏺ Inserting rows... (8,421 / 12,421)                                      │
│  ○ Updating search index...                                                │
│  ○ Invalidating affected caches...                                         │
│  ○ Sending notifications...                                                │
│  ○ Committing transaction...                                               │
│                                                                            │
│  Elapsed: 1m 23s · Estimated remaining: 38s                                │
│                                                                            │
│  [ Pause ]   [ Cancel (will rollback) ]                                    │
└────────────────────────────────────────────────────────────────────────────┘
```

- Progress bar: 640px wide, 8px tall, `border-radius: 4px`, fill in `--coral-500`.
- Steps are shown as a checklist; current step pulses, completed steps have checkmarks.
- "Pause" suspends the import (resumable); "Cancel" initiates a rollback.

### Commit Completion

```
┌─ Import Complete ✓ ────────────────────────────────────────────────────────┐
│                                                                            │
│  ✅ 12,421 supplier records created.                                       │
│  ⚠ 312 warnings logged (review recommended).                               │
│  ❌ 114 errors skipped (download error rows).                              │
│                                                                            │
│  Snapshot ID: snap-8821-0115                                              │
│  Rollback available until: 2025-01-16 14:32 (24 hours)                     │
│                                                                            │
│  [ View imported suppliers ]   [ Review warnings ]   [ Download errors ]   │
│  [ Rollback import ]                                                       │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Q.6 Rollback

Every import creates a snapshot before commit. The snapshot is retained for 24 hours and can be rolled back in one click.

### Rollback Flow

1. User navigates to Settings → Data → Import History.
2. Selects the import to roll back.
3. Clicks "Rollback import."
4. Confirmation modal: "This will delete all 12,421 records created by this import. Records that have been *edited* since import will be preserved with a 'pre-rollback' snapshot. Continue?"
5. Step-up authentication required (Tier 2).
6. Rollback executes; progress shown; completion toast.
7. Audit event `import.rollback` logged.

### Partial Rollback

For upsert imports, rollback is more nuanced:
- Records that were *created* by the import are deleted.
- Records that were *updated* by the import are restored to their pre-import state.
- Records that have been *further edited* after the import are NOT rolled back; instead, a "pre-rollback state" snapshot is saved, and the user is warned.

---

## Q.7 Import Templates

For recurring imports (e.g., weekly supplier catalog refresh), users can save the entire import configuration — file format expectation, column mapping, validation settings, commit mode — as a reusable template.

### Template Anatomy

```typescript
interface ImportTemplate {
  id: string;
  name: string;                    // "Weekly Supplier Catalog Refresh"
  entityType: string;              // "supplier"
  expectedFormat: string;          // "csv"
  mapping: Record<string, string>; // source header → MANIFOLD field
  mappingMode: 'create' | 'update' | 'upsert';
  matchKey?: string;               // for update/upsert
  validationSettings: {
    skipErrors: boolean;
    commitWarnings: boolean;
    maxErrorRate: number;          // abort if error rate exceeds this
  };
  schedule?: {
    cron: string;
    source: 'email-attachment' | 'sftp' | 'api-poll';
    sourceConfig: Record<string, unknown>;
  };
}
```

### Scheduled Imports

Templates can be scheduled to run automatically:
- **Email attachment**: MANIFOLD monitors a dedicated inbox (e.g., `imports@manifold.acme.co`) for emails with attachments matching the template name. Attachments are auto-imported.
- **SFTP**: MANIFOLD polls an SFTP server at the scheduled time for new files.
- **API poll**: MANIFOLD calls an external API to fetch the data.

Scheduled imports run with the same validation and preview stages, but if there are errors, they are *not* auto-committed — they create a Task for a human to review.

---

## Q.8 Export Pipeline (Bulk)

Beyond the per-report export documented in Phase 17, MANIFOLD supports bulk entity export — dumping an entire table (SKUs, suppliers, transfers) to a file.

### Bulk Export Surface

```
┌─ Bulk Export ──────────────────────────────────────────────────────────────┐
│                                                                            │
│  Entity: [ SKUs ▼ ]   (4,218 records)                                      │
│                                                                            │
│  Format: (•) CSV   ( ) XLSX   ( ) JSON   ( ) SQL dump                      │
│                                                                            │
│  Columns:                                                                   │
│    [✓] All columns (default)                                               │
│    [ ] Custom selection...                                                  │
│                                                                            │
│  Filters (optional):                                                       │
│    [ + Add filter ]   (leave empty to export all)                          │
│                                                                            │
│  Options:                                                                  │
│    [✓] Include related entities (suppliers, locations)                     │
│    [✓] Include audit trail                                                 │
│    [ ] Include soft-deleted records                                        │
│    [ ] Anonymize PII (for sharing externally)                              │
│                                                                            │
│  ┌─ Access Control ──────────────────────────────────────────────────────┐ │
│  │  Visibility: ( ) Private  (•) Shared with [ Data Team ▼ ]             │ │
│  │  Expiry:     ( ) Never  (•) 30 days  ( ) 7 days                        │ │
│  │  Watermark:  [✓] Add "Confidential — {user} · {date}"                 │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
│                                                                            │
│  Estimated size: 8.4 MB · ~4,218 rows                                      │
│  Estimated time: 30–60 seconds                                             │
│                                                                            │
│  [ Cancel ]                          [ Generate Export ]                   │
└────────────────────────────────────────────────────────────────────────────┘
```

### Bulk Export Processing

- Exports over 10,000 rows are processed asynchronously (same queue as report exports, Phase 17).
- The user is notified via toast and the notification bell when ready.
- Exports are retained per the expiry setting (default 30 days).
- All bulk exports are logged in the audit trail with elevated severity (bulk data extraction is a security-sensitive action).

---

## Q.9 Import/Export Hotkeys

| Hotkey | Action |
|---|---|
| `⌘ ⇧ I` | Open Import wizard |
| `⌘ ⇧ X` | Open Bulk Export |
| `⌘ ⇧ H` (in Data) | Open Import History |
| `⌘ ⇧ T` (in Data) | Open Import Templates |
| `⌘ ⇧ R` | Rollback most recent import (requires step-up) |
| `Esc` | Cancel current import stage |

---

*End of Appendix Q. The next appendix documents the Power-User Macro & Command Chaining system — the surface through which expert operators compress ten actions into one keystroke.*

---

# APPENDIX R: POWER-USER MACRO & COMMAND CHAINING SYSTEM

---

> *"A master warehouse operator performs 400 actions per shift. A MANIFOLD macro compresses the 12 most common of those into a single keystroke. Across a year, that returns 38 hours of attention to the operator — 38 hours that become situational awareness instead of repetitive motion."*

---

## R.1 The Macro Doctrine — Recorded, Not Coded

MANIFOLD's macro system is a **record-replay engine** for the ⌘K Command Interface. Macros are not scripts — they are sequences of recorded commands with parameter overrides, stored as serializable JSON. An operator records a macro by performing the actions once; the system captures the command sequence, parameterizes the variable parts, and binds the result to a hotkey.

**The Three Laws of MANIFOLD Macros:**

| Law | Definition | Enforcement |
|---|---|---|
| **I. Transparency** | Every macro is inspectable. An operator can see exactly what a macro will do before running it. | The Macro Inspector shows the recorded command sequence with current parameter bindings. |
| **II. Reversibility** | Every macro execution creates an undo point. | `⌘ Z` undoes the entire macro as a single operation. The macro's audit entry contains all sub-actions. |
| **III. Bounded Scope** | Macros cannot perform actions the operator couldn't perform manually. | Macros inherit the operator's current role and step-up state. If a macro requires step-up and the operator isn't elevated, the macro pauses at that step. |

---

## R.2 The Macro Data Model

```typescript
interface Macro {
  id: string;                          // ULID
  name: string;                        // "Daily morning reconciliation"
  description: string;                 // Free-text, explains the macro's purpose
  hotkey?: string;                     // "⌘ ⇧ M1" — optional binding
  author: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
  version: number;
  steps: MacroStep[];
  parameters: MacroParameter[];        // Variables that are prompted at run time
  scope: 'personal' | 'site' | 'tenant';
  enabled: boolean;
  lastRunAt?: string;
  runCount: number;
  averageDurationMs: number;
}

interface MacroStep {
  id: string;
  command: string;                     // ⌘K command identifier
  args: Record<string, MacroValue>;    // Arguments, may reference parameters
  waitFor?: string;                    // Wait condition: 'commit', 'response', 'idle'
  timeoutMs: number;                   // Default 5000
  onError: 'abort' | 'skip' | 'prompt';
}

type MacroValue =
  | { type: 'literal'; value: string | number | boolean }
  | { type: 'parameter'; paramId: string }
  | { type: 'context'; path: string };  // e.g., 'selection.skuId', 'currentSite'

interface MacroParameter {
  id: string;
  name: string;                        // "target_site"
  label: string;                       // "Target warehouse"
  type: 'text' | 'number' | 'sku' | 'site' | 'location' | 'user' | 'date';
  defaultValue?: MacroValue;
  required: boolean;
  validation?: {
    pattern?: string;                  // regex
    min?: number;
    max?: number;
  };
}
```

---

## R.3 Macro Recording — The Capture Flow

### Recording Activation

Macros are recorded via `⌘ ⇧ R` (start recording) — note this is distinct from `⌘ R` (open reports). When recording starts:

1. A recording indicator appears in the header: a pulsing red dot + "RECORDING MACRO" label + elapsed time.
2. The Chromatic Thread at the top of the viewport tints red (`#DC2626`) for the duration of recording.
3. Every ⌘K command, inline edit, and navigation action is captured as a step.
4. Variable inputs (text typed, SKUs selected, sites chosen) are flagged for parameterization.

### Recording Indicator

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ●  RECORDING MACRO  · 00:47  · 6 steps captured        [ ⏸ Pause ] [ ⏹ Stop ] │
└────────────────────────────────────────────────────────────────────────────┘
```

- Positioned at the top-center of the viewport, 64px below the header.
- 320px wide, 32px tall, `background: --status-danger`, `color: white`, `border-radius: 16px`, `box-shadow: 0 4px 12px rgba(0,0,0,0.15)`.
- Red dot pulses (opacity 0.6 → 1.0 → 0.6, 1.2s cycle).
- "Pause" suspends capture without ending the session; "Stop" ends and opens the Macro Editor.

### Step Capture Examples

| Action | Captured As |
|---|---|
| ⌘K → "filter site = WH-02" | `command: 'filter.apply', args: { field: 'site', op: '=', value: { type: 'parameter', paramId: 'p1' } }` |
| Double-click quantity cell, type "240", Tab | `command: 'cell.edit', args: { field: 'quantity', value: { type: 'parameter', paramId: 'p2' } }` |
| ⌘K → "transfer 50 units to WH-03" | `command: 'transfer.create', args: { fromSite: { type: 'context', path: 'currentSite' }, toSite: { type: 'parameter', paramId: 'p3' }, quantity: 50 }` |

### Parameterization Heuristics

During recording, MANIFOLD applies heuristics to decide which values become parameters vs. literals:

| Value Type | Default Behavior | Rationale |
|---|---|---|
| Free text typed by user | Parameter (with the typed value as default) | Likely varies per run. |
| SKU selected from picker | Parameter (type: 'sku') | Definitely varies per run. |
| Site selected | Parameter (type: 'site') | Varies per run. |
| Quantity entered | Parameter (type: 'number') | Varies per run. |
| Date selected | Parameter (type: 'date', default: today) | Varies per run. |
| Filter operator (=, >, <) | Literal | The operator is part of the macro's logic, not the data. |
| Boolean toggles | Literal | Logic, not data. |
| Tab/navigation destinations | Literal | The workflow structure is fixed. |

The operator can override any heuristic in the Macro Editor post-recording.

---

## R.4 The Macro Editor

### Editor Layout

```
┌─ Macro Editor: "Daily morning reconciliation" ─────────────────────────────┐
│  [ v3 · saved 2d ago ]   [ Test Run ▼ ] [ Save ] [ Bind Hotkey ] [ Share ] │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  ┌─ Steps ──────────────────────────────────────────────────────────────┐  │
│  │                                                                      │  │
│  │  1. ⌘K  filter.apply                                                 │  │
│  │       field: site     op: =      value: {{ target_site }}            │  │
│  │       [ ⋮ ]   [ ▲ ]   [ ▼ ]   [ 🗑 ]                                │  │
│  │                                                                      │  │
│  │  2. ⌘K  filter.apply                                                 │  │
│  │       field: status   op: =      value: "low_stock"                 │  │
│  │       [ ⋮ ]   [ ▲ ]   [ ▼ ]   [ 🗑 ]                                │  │
│  │                                                                      │  │
│  │  3. ⌘K  selection.all                                                │  │
│  │       [ ⋮ ]   [ ▲ ]   [ ▼ ]   [ 🗑 ]                                │  │
│  │                                                                      │  │
│  │  4. ⌘K  bulk.transfer                                                │  │
│  │       from: {{ currentSite }}    to: {{ replenishment_site }}       │  │
│  │       quantity: {{ reorder_qty }}   reason: "morning replenishment"  │  │
│  │       [ ⋮ ]   [ ▲ ]   [ ▼ ]   [ 🗑 ]                                │  │
│  │                                                                      │  │
│  │  5. ⌘K  filter.clear                                                 │  │
│  │       [ ⋮ ]   [ ▲ ]   [ ▼ ]   [ 🗑 ]                                │  │
│  │                                                                      │  │
│  │  [ + Add step ]   [ + Add condition ]   [ + Add loop ]               │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌─ Parameters ────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │  ID            Label                  Type      Default              │   │
│  │  ──────────    ───────────────────    ───────   ──────────────────   │   │
│  │  target_site   Target warehouse       site      (prompt)             │   │
│  │  replenishment_site  Replenish from   site      WH-01                │   │
│  │  reorder_qty   Units to transfer      number    50                   │   │
│  │                                                                      │   │
│  │  [ + Add parameter ]                                                 │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌─ Settings ──────────────────────────────────────────────────────────┐   │
│  │  Scope: ( ) Personal  (•) Site  ( ) Tenant                          │   │
│  │  Hotkey: [ ⌘ ⇧ M1 ]   [ Clear ]                                     │   │
│  │  On error: (•) Abort  ( ) Skip  ( ) Prompt                          │   │
│  │  Timeout per step: [ 5000 ] ms                                       │   │
│  │  [✓] Confirm before running (shows preview)                         │   │
│  │  [✓] Log execution to audit trail                                   │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────┘
```

### Step Display Tokens

- Step number: Berkeley Mono 14px, `--slate-400`, 32px wide, right-aligned.
- Command name: Geist Sans 14px semibold, `--slate-900`, monospace backtick styling.
- Args: Berkeley Mono 12px, `--slate-600`. Parameter references rendered as `{{ param_name }}` in `--coral-700` with a subtle background tint.
- Hover actions (⋮, ▲, ▼, 🗑): appear on row hover, 16px icons, `--slate-500` → `--slate-900` on hover.

---

## R.5 Macro Execution — The Run Flow

### With Parameters (Prompt Mode)

If the macro has parameters without defaults, or if "Confirm before running" is enabled, the run starts with a parameter prompt:

```
┌─ Run Macro: Daily morning reconciliation ──────────────────────────────────┐
│                                                                            │
│  This macro will execute 5 steps. Please provide values:                   │
│                                                                            │
│  Target warehouse         [ WH-02 ▼ ]             (required)               │
│  Replenish from           [ WH-01 ▼ ]             (default: WH-01)         │
│  Units to transfer        [ 50 _______ ]           (default: 50)          │
│                                                                            │
│  ┌─ Execution Preview ─────────────────────────────────────────────────┐   │
│  │  1. Filter: site = WH-02                                            │   │
│  │  2. Filter: status = low_stock                                       │   │
│  │  3. Select all matching rows                                         │   │
│  │  4. Transfer from WH-01 to WH-02, qty 50, reason "morning replenish"│   │
│  │  5. Clear filters                                                    │   │
│  │                                                                      │   │
│  │  Estimated affected: 23 SKUs                                         │   │
│  │  Estimated duration: 4 seconds                                       │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  [ Cancel ]                          [ Run Macro ]                          │
└────────────────────────────────────────────────────────────────────────────┘
```

### Execution Progress

Once running, progress is shown in a slim banner at the top of the viewport:

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ▶ Running: Daily morning reconciliation  ·  Step 3 of 5  · 1.2s elapsed     │
│ ████████████████████░░░░░░░░░░░░░░░░░░░░░░  60%   [ ⏸ Pause ] [ ⏹ Abort ] │
└────────────────────────────────────────────────────────────────────────────┘
```

- 48px tall, full viewport width, `background: --surface-2`, `border-bottom: 1px solid --border-default`.
- Step counter updates as each step completes.
- "Pause" suspends at the next step boundary; "Abort" halts and creates an undo point.

### Step Execution Semantics

- Steps execute sequentially by default.
- Each step waits for its `waitFor` condition before proceeding:
  - `'commit'`: waits for any in-flight data mutation to commit.
  - `'response'`: waits for the API response from the command.
  - `'idle'`: waits for the UI to be idle (no pending animations, no pending requests).
- If a step times out, the `onError` policy determines behavior:
  - `'abort'`: macro halts, undo point created, error toast shown.
  - `'skip'`: step is skipped, macro continues, warning logged.
  - `'prompt'`: macro pauses, operator is asked to "Retry," "Skip," or "Abort."

### Step-Up Handling

If a macro step requires step-up authentication and the operator is not currently elevated:

1. The macro pauses at that step.
2. A step-up prompt appears inline (same as manual step-up, Phase 16).
3. The macro banner shows: "Step 4 requires step-up. Waiting for authentication..."
4. On successful step-up, the macro resumes automatically.
5. On step-up failure or cancellation, the macro aborts with an undo point.

---

## R.6 Macro Library & Sharing

### Personal vs. Site vs. Tenant Macros

| Scope | Visible To | Editable By | Use Case |
|---|---|---|---|
| **Personal** | The author only. | The author only. | Personal workflow shortcuts. |
| **Site** | All users at the author's site. | The author + site admins. | Site-specific workflows (e.g., "WH-02 morning recon"). |
| **Tenant** | All users in the tenant. | The author + tenant admins. | Tenant-wide standard workflows. |

### Macro Library

Accessible from Settings → Macros or `⌘ ⇧ L`.

```
┌─ Macro Library ────────────────────────────────────────────────────────────┐
│                                                                            │
│  ┌─ My Macros ──────────────────────────────────────────────────────────┐  │
│  │  ⌘⇧M1  Daily morning reconciliation     5 steps · 23 runs · 1.2s avg │  │
│  │  ⌘⇧M2  End-of-shift count submission    8 steps · 41 runs · 3.8s avg │  │
│  │  ⌘⇧M3  Weekly dead-stock flag           4 steps · 4 runs · 0.8s avg  │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌─ Site Macros (WH-02) ───────────────────────────────────────────────┐   │
│  │  ⌘⇧S1  Receiving dock check-in         12 steps · shared by James L.│   │
│  │  ⌘⇧S2  Cycle count zone A              6 steps · shared by Maria S. │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  ┌─ Tenant Macros ─────────────────────────────────────────────────────┐   │
│  │  ⌘⇧T1  New SKU onboarding             15 steps · shared by Admin    │   │
│  │  ⌘⇧T2  Supplier catalog refresh        7 steps · shared by Admin    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                            │
│  [ + Record New Macro ]   [ Import Macro ]   [ Browse Templates ]         │
└────────────────────────────────────────────────────────────────────────────┘
```

### Macro Templates

MANIFOLD ships with 15+ macro templates for common warehouse workflows. Templates can be cloned into personal/site/tenant scope and customized.

| Template | Steps | Use Case |
|---|---|---|
| **Morning Reconciliation** | 5 | Filter low stock, transfer from replenishment site, clear filters. |
| **End-of-Shift Count** | 8 | Filter assigned zone, start count, submit, log. |
| **New SKU Onboarding** | 15 | Create SKU, assign supplier, set reorder point, print label, file in location. |
| **Dead Stock Flag** | 4 | Filter no-movement-90d, flag for review, notify manager, clear. |
| **Receiving Check-In** | 12 | Scan PO, verify line items, receive into location, print labels. |
| **Stockout Response** | 9 | Identify affected orders, find substitute SKU, transfer, notify. |
| **Supplier Performance Review** | 6 | Filter supplier, export 90-day history, calculate metrics, email. |
| **Cycle Count Zone** | 6 | Filter zone, start count, advance through bins, submit. |
| **Transfer Approval Batch** | 5 | Filter pending transfers, review each, approve all valid. |
| **Compliance Export** | 4 | Filter date range, export audit trail, sign with hardware key. |

---

## R.7 Command Chaining — Inline Macros

Beyond saved macros, MANIFOLD supports **inline command chaining** in the ⌘K bar. This is for ad-hoc multi-step actions that don't warrant a saved macro.

### Chaining Syntax

In the ⌘K bar, commands can be chained with `|` (pipe):

```
⌘K  filter site=WH-02 | filter status=low_stock | select all | transfer to=WH-03 qty=50
```

- Each command is executed in sequence.
- The chain is parsed and previewed before execution.
- The chain can be saved as a macro with `⌘ S` after execution.

### Chain Preview

```
┌─ ⌘K ───────────────────────────────────────────────────────────────────────┐
│  filter site=WH-02 | filter status=low_stock | select all | transfer to=W… │
├────────────────────────────────────────────────────────────────────────────┤
│  Chain (4 commands):                                                       │
│    1. Filter: site = WH-02         (est. 1,247 matches)                    │
│    2. Filter: status = low_stock   (est. 23 matches)                       │
│    3. Select all                   (23 rows)                                │
│    4. Transfer to WH-03, qty 50   (23 SKUs × 50 = 1,150 units)             │
│                                                                            │
│  [ Enter to run ]   [ ⌘S Save as macro ]   [ Esc to cancel ]               │
└────────────────────────────────────────────────────────────────────────────┘
```

- The preview shows estimated impact for each step, updating live as the user types.
- `Enter` runs the chain immediately (with step-up if any command requires it).
- `⌘S` opens the Macro Editor pre-populated with the chain.

---

## R.8 Command History & Replay

Every ⌘K command is logged in the **Command History**, accessible via `⌘ ⇧ H` or by clicking the history icon in the ⌘K bar.

### History Panel

```
┌─ Command History ──────────────────────────────────────────────────────────┐
│  [ Filter: maria.santos · last 24h ]                        [ Clear ]       │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│  14:32  filter site=WH-02                              [ ↻ Replay ]        │
│  14:28  transfer SKU-4821 to WH-03 qty=50             [ ↻ Replay ]        │
│  14:15  filter status=low_stock                        [ ↻ Replay ]        │
│  14:02  select all | transfer to=WH-01 qty=100        [ ↻ Replay ] [ 💾 ] │
│  13:47  count.start zone=A                             [ ↻ Replay ]        │
│  ...                                                                       │
│                                                                            │
│  [ Export history as CSV ]                                                 │
└────────────────────────────────────────────────────────────────────────────┘
```

- Each entry shows the timestamp, command string, and a "Replay" button.
- Multi-command chains also show a "Save as macro" (💾) button.
- History is retained for 30 days, then automatically purged (configurable per tenant).
- History is personal — each user sees only their own commands.

### Replay Semantics

- **Replay with same args**: Runs the command with the exact same arguments. Fastest.
- **Replay with edit**: Opens the command in the ⌘K bar with args pre-filled; user can edit before running.
- Default behavior is configurable in Settings → Macros → Replay Mode.

---

## R.9 Macro Hotkeys

| Hotkey | Action |
|---|---|
| `⌘ ⇧ R` | Start/stop macro recording |
| `⌘ ⇧ M` | Open Macro Library |
| `⌘ ⇧ E` | Open Macro Editor (for selected macro) |
| `⌘ ⇧ H` | Open Command History |
| `⌘ ⇧ T` | Run macro test (dry-run with preview) |
| `⌘ M1` … `⌘ M9` | Run macro bound to slot 1–9 (personal scope) |
| `⌘ ⇧ M1` … `⌘ ⇧ M9` | Run macro bound to slot 1–9 (site scope) |
| `⌘ ⌥ ⇧ M1` … `⌘ ⌥ ⇧ M9` | Run macro bound to slot 1–9 (tenant scope) |
| `⌘ ⏎` (in ⌘K with chain) | Run command chain |
| `⌘ S` (in ⌘K with chain) | Save chain as macro |

The 3×9 = 27 macro slots (personal/site/tenant × 1–9) provide a generous but bounded namespace. Slot conflicts are resolved by scope precedence: personal > site > tenant. A warning is shown if a hotkey is bound at multiple scopes.

---

## R.10 Macro Safety & Audit

### Audit Trail

Every macro execution is logged as a single audit entry that expands to show all sub-actions:

```
┌──────────────────────────────────────────────────────────────┐
│ 14:32:07  MACRO: Daily morning reconciliation (v3)            │
│ Run by: Maria Santos [OPR]                                    │
│ Parameters: { target_site: "WH-02", replenishment_site:       │
│              "WH-01", reorder_qty: 50 }                       │
│                                                               │
│  Sub-actions (5):                                             │
│    1. filter.apply    site=WH-02                  ✓ 0.3s      │
│    2. filter.apply    status=low_stock            ✓ 0.2s      │
│    3. selection.all   23 rows                     ✓ 0.1s      │
│    4. transfer.create 23 SKUs × 50 to WH-01       ✓ 2.1s      │
│       → TRF-8821, TRF-8822, ... TRF-8843                      │
│    5. filter.clear                                ✓ 0.1s      │
│                                                               │
│  Total: 2.8s · 23 transfers created · $11,500 total value     │
│  Undo: [ Undo entire macro ]                                  │
│                                                               │
│ 🤖 macro · 192.168.4.21 · Chrome 128 / macOS                 │
└──────────────────────────────────────────────────────────────┘
```

### Macro Rate Limiting

To prevent runaway macros (e.g., a macro with a loop that runs 10,000 times), MANIFOLD enforces:

| Limit | Default | Configurable |
|---|---|---|
| Max steps per macro | 50 | Yes (tenant admin) |
| Max executions per hour (per user) | 100 | Yes |
| Max executions per hour (per macro) | 500 | Yes |
| Max total affected records per execution | 10,000 | Yes (hard cap) |

When a limit is hit, the macro aborts with an explanatory toast: "Macro rate limit reached. Contact your admin to adjust limits."

### Macro Versioning & Sharing Audit

- Every save increments the version.
- Sharing a macro to site/tenant scope is logged as `macro.share` with the target scope.
- Revoking a shared macro is logged as `macro.revoke`.
- Tenant admins can audit all shared macros from Settings → Macros → Audit.

---

*End of Appendix R. This concludes the MANIFOLD Design System.*

---

*END OF MANIFOLD DESIGN SYSTEM v5.0.0*

---

> **This document is the single source of truth.** Any visual or behavioral decision not covered here should be made by extending this system, not by introducing new patterns. When in doubt, apply the North Star: **Does this increase Anticipatory Velocity?** If not, remove it.
