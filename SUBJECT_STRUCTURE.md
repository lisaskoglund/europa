# Europa Project - Multi-Subject Organization

## New Directory Structure

```
europa/
│
├── 📄 index.html                 ← Main landing page (subject selector)
│
├── 📚 Subject Directories
│   │
│   ├── SO/                       ← Social Studies (Samhällskunskap)
│   │   ├── index.html            ← Subject landing page
│   │   ├── hovedstader/          ← Capitals quiz
│   │   │   └── index.html
│   │   ├── instudering/          ← Study questions
│   │   │   └── index.html
│   │   ├── js/
│   │   │   ├── huvudstader.js
│   │   │   └── instudering.js
│   │   └── css/
│   │       ├── hoofdstader.css
│   │       ├── instudering.css
│   │       └── styles.css
│   │
│   ├── NO/                       ← Science (Naturkunskap)
│   │   ├── index.html
│   │   ├── hovedstader/
│   │   ├── instudering/
│   │   ├── js/
│   │   └── css/
│   │
│   ├── Engelska/                 ← English
│   │   ├── index.html
│   │   ├── huvudstader/
│   │   ├── instudering/
│   │   ├── js/
│   │   └── css/
│   │
│   └── Franska/                  ← French
│       ├── index.html
│       ├── huvudstader/
│       ├── instudering/
│       ├── js/
│       └── css/
│
├── 📦 shared/                    ← Shared across all subjects
│   ├── js/
│   │   └── shared.js             ← Common utility functions
│   └── css/
│       ├── styles.css            ← Base styles
│       └── [other common CSS]
│
├── 🖼️ images/                     ← Global images
│
├── 📝 Root CSS/JS (legacy - can keep for now)
│   ├── css/
│   ├── js/
│   │
│   └── (Gradually moved to shared/)
│
└── 📚 Documentation
    ├── README.md
    ├── ARCHITECTURE.md
    └── [other docs...]
```

---

## File Organization Strategy

### 1. Shared Resources
All common utilities and styles go in `shared/`:
- `shared/js/shared.js` - Utility functions used by all subjects
- `shared/css/styles.css` - Base styling
- `shared/css/*.css` - Common component styles

### 2. Subject Structure (SO example)
```
SO/
├── index.html            ← Lists available modules (Huvudstäder, Instudering)
├── js/
│   ├── hovedstader.js    ← 42 capitals quiz (SO-specific if needed)
│   └── instudering.js    ← 43 study questions (SO-specific if needed)
├── css/
│   ├── styles.css        ← SO-specific base styles
│   ├── hovedstader.css   ← Capitals quiz styling
│   └── instudering.css   ← Study questions styling
│
├── hovedstader/
│   └── index.html        ← Capitals quiz page for SO
│
└── instudering/
    └── index.html        ← Study questions page for SO
```

### 3. Page Structure
Each quiz page (e.g., `SO/hoofdstader/index.html`) will:
1. Link to shared.js first: `../../shared/js/shared.js`
2. Link to shared CSS: `../../shared/css/styles.css`
3. Link to subject CSS: `../css/styles.css`, `../css/hovedstader.css`
4. Link to subject JS: `../js/hovedstader.js`

---

## Migration Steps

### Step 1: Create Directory Structure
```bash
# Run the setup script
bash setup-structure.sh
```

### Step 2: Copy Files to Shared
```bash
# Copy shared utilities
cp js/shared.js shared/js/

# Copy common styles
cp css/styles.css shared/css/
cp css/index.css shared/css/
```

### Step 3: Copy Subject-Specific Files
```bash
# Copy SO files
cp css/hovedstader.css SO/css/
cp css/instudering.css SO/css/
cp js/hovedstader.js SO/js/
cp js/instudering.js SO/js/

# Repeat for other subjects (NO, Engelska, Franska)
```

### Step 4: Create Subject Index Pages
Create `SO/index.html`, `NO/index.html`, etc. with:
- Subject title
- Navigation to Huvudstäder module
- Navigation to Instudering module
- Back button to main index

### Step 5: Create Module Pages
Copy HTML files to subject folders:
- `SO/huvudstader/index.html` (from `huvudstader.html`)
- `SO/instudering/index.html` (from `instudering.html`)
- Update paths for CSS/JS links

### Step 6: Update Links
Update all relative paths in HTML files to point to correct locations.

---

## Shared Path Examples

### From SO/huvudstader/index.html:
```html
<!-- Shared utilities -->
<script src="../../shared/js/shared.js"></script>

<!-- Shared styles -->
<link rel="stylesheet" href="../../shared/css/styles.css">

<!-- Subject-specific styles -->
<link rel="stylesheet" href="../css/styles.css">
<link rel="stylesheet" href="../css/hovedstader.css">

<!-- Subject-specific script -->
<script src="../js/hovedstader.js"></script>
```

### From NO/instudering/index.html:
```html
<!-- Same pattern as above, just different subject folder -->
<script src="../../shared/js/shared.js"></script>
<link rel="stylesheet" href="../../shared/css/styles.css">
<link rel="stylesheet" href="../css/styles.css">
<link rel="stylesheet" href="../css/instudering.css">
<script src="../js/instudering.js"></script>
```

---

## LocalStorage Keys

The application currently uses:
- `capquiz_current_user_v3` - Current user
- `capquiz_highscores_v3_{USER}` - User highscores

These should be updated to be subject-aware:
- `capquiz_current_user_v3`
- `capquiz_highscores_v3_{SUBJECT}_{USER}` - e.g., `capquiz_highscores_v3_SO_Elsa`

This allows users to have separate progress per subject.

---

## Navigation Flow

### Main Landing Page (index.html)
```
Europa – Välj ämne
├── Samhällskunskap (SO)
├── Naturkunskap (NO)
├── Engelska
└── Franska
```

### Subject Page (SO/index.html)
```
Samhällskunskap – Välj modul
├── 🏛️ Huvudstäder
├── 📚 Instuderingsfrågor
└── ← Tillbaka
```

### Quiz Pages
```
SO/hoofdstader/index.html
  ↓ (Quiz interface)
  
SO/instudering/index.html
  ↓ (Quiz interface)
```

---

## Future Content

Once structure is in place, you can add:

### For NO (Naturkunskap)
- Norwegian capitals quiz
- Norwegian study questions
- Norwegian vocabulary

### For Engelska
- English vocabulary
- English grammar
- English comprehension

### For Franska
- French vocabulary
- French grammar
- French comprehension

---

## Advantages of This Structure

✅ **Scalability** - Easy to add new subjects
✅ **Organization** - Content clearly separated by subject
✅ **Reusability** - Shared utilities used across subjects
✅ **Maintainability** - Each subject has its own CSS/JS
✅ **User Progress** - Can track progress per subject
✅ **Consistency** - All subjects follow same pattern

---

## Notes

1. **Shared utilities** - Keep `shared/js/shared.js` for common functions
2. **LocalStorage** - Consider prefixing highscores by subject
3. **CSS** - Common base styles in `shared/css/`
4. **Images** - Keep global images in root `images/` folder
5. **Navigation** - Subject pages link back to main index

---

## Implementation Checklist

- [ ] Run setup script to create directories
- [ ] Copy shared files to `shared/` folder
- [ ] Copy subject-specific files to each subject folder
- [ ] Create subject index pages
- [ ] Create module pages (copy HTML files)
- [ ] Update all HTML file paths
- [ ] Update localStorage keys to be subject-aware
- [ ] Test navigation flow
- [ ] Update main index.html with subject links
- [ ] Document subject-specific data structures

---

This structure provides a solid foundation for expanding the Europa project to multiple subjects while maintaining clean organization and code reuse.

