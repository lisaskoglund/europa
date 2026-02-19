# Europa Project - Visual Structure Guide

## Navigation Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      index.html                             │
│            (Main Subject Selector Page)                     │
│                                                              │
│   Welcome! Choose a subject to study:                       │
│   [📚 SO] [🇳🇴 NO] [🇬🇧 Engelska] [🇫🇷 Franska]          │
└────┬────────────────┬──────────────┬──────────────┬────────┘
     │                │              │              │
     │                │              │              │
     v                v              v              v
┌─────────────┐  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐
│  SO/index   │  │  NO/index    │  │  Engelska/  │  │  Franska/    │
│  (Ready!)   │  │ (Coming Soon)│  │  (Coming S.)│  │ (Coming Soon)│
│             │  │              │  │             │  │              │
│  Modules:   │  │ [Coming Soon]│  │[Coming Soon]│  │[Coming Soon] │
│ [Huvudstäder]  └──────────────┘  └─────────────┘  └──────────────┘
│ [Instudering]
└─────┬────────────────────┐
      │                    │
      v                    v
┌──────────────────┐  ┌─────────────────────┐
│ SO/huvudstader/  │  │ SO/instudering/     │
│   index.html     │  │   index.html        │
│                  │  │                     │
│ Capitals Quiz    │  │ Study Questions     │
│ (42 countries)   │  │ (43 questions)      │
└──────────────────┘  └─────────────────────┘
```

---

## Folder Structure Tree

```
europa/
│
├── index.html                    ← Main entry point
│
├── SO/                           ← Subject folder
│   ├── index.html               ← Subject page
│   │
│   ├── hovedstader/             ← Module folder
│   │   └── index.html           ← Module page
│   │
│   ├── instudering/             ← Module folder
│   │   └── index.html           ← Module page
│   │
│   ├── js/                       ← Subject JavaScript
│   │   ├── index.js            ✅ READY
│   │   ├── hovedstader.js       📋 TODO: Copy
│   │   └── instudering.js       📋 TODO: Copy
│   │
│   └── css/                      ← Subject CSS
│       ├── styles.css           ✅ READY
│       ├── huvudstader.css      📋 TODO: Copy
│       └── instudering.css      📋 TODO: Copy
│
├── NO/                           ← Subject folder (placeholder)
│   └── index.html               ✅ READY
│
├── Engelska/                     ← Subject folder (placeholder)
│   └── index.html               ✅ READY
│
├── Franska/                      ← Subject folder (placeholder)
│   └── index.html               ✅ READY
│
├── shared/                       ← Shared across all subjects
│   ├── js/
│   │   └── shared.js            📋 TODO: Copy
│   │
│   └── css/
│       ├── styles.css           📋 TODO: Copy
│       └── index.css            📋 TODO: Copy
│
└── [Docs + Legacy files]
```

---

## File Dependency Diagram

### index.html Dependencies
```
index.html
├── css/index.css        (root)
├── js/shared.js         (root)
└── js/index.js          (root)
```

### SO/index.html Dependencies
```
SO/index.html
├── ../../shared/css/styles.css    (shared)
├── css/styles.css                 (SO-specific)
├── ../../shared/js/shared.js      (shared)
└── js/index.js                    (SO-specific)
```

### SO/hovedstader/index.html Dependencies
```
SO/hovedstader/index.html
├── ../../shared/css/styles.css    (shared)
├── ../css/styles.css              (SO-specific)
├── ../css/hovedstader.css         (SO-specific)
├── ../../shared/js/shared.js      (shared)
└── ../js/hovedstader.js           (SO-specific)
```

---

## Module Types Diagram

Each subject can have multiple module types:

```
Subject (e.g., SO)
│
├── Module Type 1: Huvudstäder (Capitals)
│   └── Quiz Interface
│       ├── Questions
│       ├── Scoring
│       ├── Highscores
│       └── Results
│
├── Module Type 2: Instudering (Study Questions)
│   └── Quiz Interface
│       ├── Multiple choice
│       ├── Text answers
│       ├── Keyword matching
│       ├── Scoring
│       └── Results
│
└── Module Type N: [Your Content Here]
    └── Quiz Interface
```

---

## File Copy Flow Diagram

```
Current Files (Root)          Target Locations
════════════════════          ════════════════

js/shared.js          ────►  shared/js/shared.js
css/styles.css        ────►  shared/css/styles.css
css/index.css         ────►  shared/css/index.css

js/hoofdstader.js     ────►  SO/js/hoofdstader.js
js/instudering.js     ────►  SO/js/instudering.js
css/hovedstader.css   ────►  SO/css/hovedstader.css
css/instudering.css   ────►  SO/css/instudering.css
```

---

## User Journey Diagram

```
User opens europa/index.html
        ↓
        │ "Samhällskunskap"
        ↓
SO/index.html (Module selector)
        ↓
        ├─► "Huvudstäder" ──► SO/hovedstader/index.html ──► Quiz
        │
        └─► "Instudering" ──► SO/instudering/index.html ──► Quiz
                                    ↓
                            Answers questions
                                    ↓
                            Rätta (grade)
                                    ↓
                            View results
                                    ↓
                            Highscores saved
```

---

## Content Expansion Diagram

```
Current State              Future State

SO ✅                      SO ✅
├── Huvudstäder          ├── Huvudstäder
└── Instudering          ├── Instudering
                         └── [New modules]

NO 📋                     NO ✅
                         ├── Module 1
                         ├── Module 2
                         └── Module 3

Engelska 📋               Engelska ✅
                         ├── Module 1
                         ├── Module 2
                         └── Module 3

Franska 📋                Franska ✅
                         ├── Module 1
                         ├── Module 2
                         └── Module 3

[Future subjects]         [Future subjects]
                         ├── Matematik
                         ├── Historia
                         ├── Biologi
                         └── [More...]
```

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser                                  │
│  (localStorage for user & highscores)                      │
└────────────┬──────────────────────────────────────┬────────┘
             │                                      │
        Reads/Writes                           Reads/Writes
             │                                      │
             v                                      v
    ┌──────────────────┐                  ┌──────────────────┐
    │  Current User    │                  │  Highscores      │
    │  capquiz_...     │                  │  capquiz_hs_...  │
    └──────────────────┘                  └──────────────────┘
             │                                      │
        Passed to all pages              Used for leaderboards
        in quiz modules                  & results display
```

---

## Responsive Design Diagram

```
Desktop (1000px+)          Tablet (600-1000px)    Mobile (<600px)
──────────────────         ───────────────────    ──────────────

[Header            ]       [Header         ]      [Hdr]
[Large Buttons    ]        [Buttons Side  ]       [Btn]
[Content Area     ]        [Content Area  ]       [Ctnt]
[Footer           ]        [Footer        ]       [Ftr]

All layouts responsive via CSS Grid/Flexbox
```

---

## Color & Style Hierarchy

```
Root CSS (shared/)
    ↓
Subject CSS (SO/css/)
    ↓
Module CSS (SO/css/hoofdstader.css)
    ↓
Inline Styles (minimal)

Result: Consistent look across all pages
        Easy to customize per subject if needed
```

---

## Build Progress Diagram

```
Phase 1: Structure      ✅ COMPLETE
├── Directories        ✅
├── HTML pages         ✅
├── Basic JS/CSS       ✅
└── Documentation      ✅

Phase 2: Integration   📋 IN PROGRESS (Copy files)
├── Copy shared        📋
├── Copy SO            📋
├── Create placeholders 📋
└── Test navigation    📋

Phase 3: Content       ⏳ READY TO START
├── Add NO content     ⏳
├── Add Engelska       ⏳
├── Add Franska        ⏳
└── Optimize           ⏳
```

---

## Size & Complexity

```
Project Size:
├── HTML Files: 7        (Growing with content)
├── CSS Files: 8         (Each ~1KB)
├── JS Files: 4          (Each ~1-30KB)
├── Images: 1            (Shared mascot)
└── Docs: 15             (Comprehensive guides)

Total: ~15 files ready, ~100+ files potential
Complexity: Low (easy to understand)
Maintainability: High (well organized)
Scalability: Excellent (pattern proven)
```

---

## Legend

```
✅ CREATED        - File already created
📋 TODO           - File needs to be created/copied
⏳ READY TO START - Infrastructure ready, waiting for content
━━ Path           - Directory separator
→  Flows to       - Navigation direction
```

---

This visual guide helps you understand:
- 📁 Where files are located
- 🔀 How data flows
- 🚀 How users navigate
- 📈 How to expand
- 🎨 How styling works


