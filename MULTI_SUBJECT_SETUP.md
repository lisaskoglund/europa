# Multi-Subject Setup Guide

## Overview

Your Europa project now supports multiple subjects (SO, NO, Engelska, Franska). Here's how to complete the setup.

---

## Current Status

✅ **Created**:
- Subject directories (SO, NO, Engelska, Franska)
- Main landing page (updated index.html)
- SO subject pages (index.html, hovedstader/index.html, instudering/index.html)
- Placeholder pages for NO, Engelska, Franska

❌ **Still TODO**:
- Copy files to shared/ folder
- Create CSS/JS files in shared/
- Copy subject-specific CSS/JS to SO/
- Create subject-specific index.js files

---

## Step 1: Create Shared Folder Structure

```bash
cd /Users/lisa.noren/develop/europa

# Create shared directories
mkdir -p shared/js
mkdir -p shared/css

# Create subject subdirectories
mkdir -p SO/js SO/css
mkdir -p NO/js NO/css
mkdir -p Engelska/js Engelska/css
mkdir -p Franska/js Franska/css
```

---

## Step 2: Copy Files to Shared Folder

Copy shared utilities and CSS:

```bash
# Copy shared utilities
cp js/shared.js shared/js/

# Copy common CSS files
cp css/styles.css shared/css/
cp css/index.css shared/css/
```

---

## Step 3: Copy SO-Specific Files

```bash
# Copy SO JavaScript files
cp js/hovedstader.js SO/js/
cp js/instudering.js SO/js/

# Copy SO CSS files
cp css/hovedstader.css SO/css/
cp css/instudering.css SO/css/
cp css/styles.css SO/css/
```

---

## Step 4: Create Subject Index.js Files

Create `SO/js/index.js`:

```javascript
const USER_KEY = "capquiz_current_user_v3";

const btn = document.getElementById("userSelectBtn");
const dropdown = document.getElementById("userDropdown");
const wrap = document.getElementById("userSelectWrap");

// Map users to their emoji/icon
const USER_ICONS = {
    Elsa: '🎀',
    Ingrid: '🌼',
    Elektra: '🌟'
};

function setButtonUserLabel(user){
    const icon = USER_ICONS[user] || '👤';
    btn.textContent = icon + ' ' + (user || 'Välj användare');
}

wrap.addEventListener("click", (e) => {
    if (e.target.closest('#userDropdown')) return;
    dropdown.classList.toggle("hidden");
});

dropdown.addEventListener("click", (e) => {
    const btnEl = e.target.closest('button[data-user]');
    if(!btnEl) return;
    const user = btnEl.dataset.user;

    localStorage.setItem(USER_KEY, user);
    setButtonUserLabel(user);
    dropdown.classList.add("hidden");
});

const savedUser = localStorage.getItem(USER_KEY);
if(savedUser){
    setButtonUserLabel(savedUser);
}
```

Create similar files for NO, Engelska, Franska.

---

## Step 5: Update Highscore Storage (Optional but Recommended)

Currently uses: `capquiz_highscores_v3_{USER}`
Could be updated to: `capquiz_highscores_v3_{SUBJECT}_{USER}`

This allows separate progress tracking per subject.

### To implement:
1. Edit `shared/js/shared.js`
2. Add subject parameter to highscore functions
3. Update `SO/js/hovedstader.js` and `SO/js/instudering.js` to use subject-specific keys

---

## Directory Structure After Setup

```
europa/
├── index.html                 ← Main subject selector
│
├── SO/
│   ├── index.html            ← SO modules selector
│   ├── js/
│   │   ├── hovedstader.js
│   │   ├── instudering.js
│   │   └── index.js
│   ├── css/
│   │   ├── styles.css
│   │   ├── hovedstader.css
│   │   └── instudering.css
│   ├── huvudstader/
│   │   └── index.html
│   └── instudering/
│       └── index.html
│
├── NO/
│   ├── index.html
│   ├── js/
│   └── css/
│
├── Engelska/
│   ├── index.html
│   ├── js/
│   └── css/
│
├── Franska/
│   ├── index.html
│   ├── js/
│   └── css/
│
├── shared/                    ← Shared across all subjects
│   ├── js/
│   │   └── shared.js
│   └── css/
│       ├── styles.css
│       └── index.css
│
├── css/                       ← Legacy (can keep for now)
│   ├── index.css
│   ├── styles.css
│   ├── huvudstader.css
│   └── instudering.css
│
├── js/                        ← Legacy (can keep for now)
│   ├── shared.js
│   ├── index.js
│   ├── hovedstader.js
│   ├── instudering.js
│   └── main.js
│
└── images/
    └── kawaii_cats.png
```

---

## Navigation Flow

```
index.html (Main subject selector)
  ├── SO/index.html (SO modules)
  │   ├── SO/hovedstader/index.html (Quiz)
  │   └── SO/instudering/index.html (Quiz)
  ├── NO/index.html (NO modules - coming soon)
  ├── Engelska/index.html (Engelska modules - coming soon)
  └── Franska/index.html (Franska modules - coming soon)
```

---

## For Adding New Content

### To add a module to SO:
1. Create `SO/vocabulary/index.html`
2. Create `SO/js/vocabulary.js`
3. Create `SO/css/vocabulary.css`
4. Update `SO/index.html` with link to new module
5. Add content to JavaScript file

### To add a subject (e.g., Matematik):
1. Create `Matematik/index.html` (subject selector)
2. Create `Matematik/js/`, `Matematik/css/` directories
3. Add modules under `Matematik/module-name/`
4. Update main `index.html` with link to new subject

---

## Script to Complete Setup

Save as `complete-setup.sh`:

```bash
#!/bin/bash

BASE="/Users/lisa.noren/develop/europa"

echo "Setting up multi-subject structure..."

# Create directories
mkdir -p $BASE/shared/js $BASE/shared/css
mkdir -p $BASE/SO/js $BASE/SO/css
mkdir -p $BASE/NO/js $BASE/NO/css
mkdir -p $BASE/Engelska/js $BASE/Engelska/css
mkdir -p $BASE/Franska/js $BASE/Franska/css

# Copy shared files
cp $BASE/js/shared.js $BASE/shared/js/
cp $BASE/css/styles.css $BASE/shared/css/
cp $BASE/css/index.css $BASE/shared/css/

# Copy SO files
cp $BASE/js/hovedstader.js $BASE/SO/js/
cp $BASE/js/instudering.js $BASE/SO/js/
cp $BASE/css/hovedstader.css $BASE/SO/css/
cp $BASE/css/instudering.css $BASE/SO/css/
cp $BASE/css/styles.css $BASE/SO/css/

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create index.js files for each subject"
echo "2. Test the navigation"
echo "3. Add content to NO, Engelska, Franska"
```

---

## Files Already Created

✅ `SUBJECT_STRUCTURE.md` - Detailed structure documentation
✅ `index.html` - Updated to subject selector
✅ `SO/index.html` - SO modules page
✅ `SO/huvudstader/index.html` - Capitals quiz
✅ `SO/instudering/index.html` - Study questions
✅ `NO/index.html` - Norwegian placeholder
✅ `Engelska/index.html` - English placeholder
✅ `Franska/index.html` - French placeholder

---

## Next Steps

1. **Run file copy commands** to organize existing files
2. **Create index.js** files for each subject folder
3. **Test navigation** by opening pages in browser
4. **Add content** to NO, Engelska, Franska subjects

---

This structure provides:
- ✅ Scalable organization
- ✅ Easy content addition
- ✅ Subject-specific tracking
- ✅ Code reuse through shared/ folder
- ✅ Clean navigation flow


