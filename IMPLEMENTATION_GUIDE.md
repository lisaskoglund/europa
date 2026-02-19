# Europa Project - Multi-Subject Implementation Guide

## ✅ What's Been Done

### New Files Created:
1. ✅ `index.html` - Updated to show subject selector
2. ✅ `SO/index.html` - SO (Samhällskunskap) modules page
3. ✅ `SO/js/index.js` - User selection logic for SO
4. ✅ `SO/css/styles.css` - SO-specific styles
5. ✅ `SO/huvudstader/index.html` - Capitals quiz page
6. ✅ `SO/instudering/index.html` - Study questions page
7. ✅ `NO/index.html` - Norwegian placeholder
8. ✅ `Engelska/index.html` - English placeholder
9. ✅ `Franska/index.html` - French placeholder
10. ✅ `SUBJECT_STRUCTURE.md` - Detailed structure documentation
11. ✅ `MULTI_SUBJECT_SETUP.md` - Setup guide
12. ✅ `setup-structure.sh` - Bash setup script

---

## ⚙️ What Still Needs to Be Done

### Files to Copy/Create:

1. **Shared Folder** (copy shared utilities)
   ```bash
   mkdir -p shared/js shared/css
   cp js/shared.js shared/js/
   cp css/styles.css shared/css/
   cp css/index.css shared/css/
   ```

2. **SO Folder** (copy subject-specific files)
   ```bash
   mkdir -p SO/js SO/css
   cp js/hovedstader.js SO/js/
   cp js/instudering.js SO/js/
   cp css/hovedstader.css SO/css/
   cp css/instudering.css SO/css/
   ```

3. **Create placeholder files for other subjects:**
   - `NO/js/index.js` (copy from `SO/js/index.js`)
   - `NO/css/styles.css` (empty placeholder)
   - `Engelska/js/index.js`
   - `Engelska/css/styles.css`
   - `Franska/js/index.js`
   - `Franska/css/styles.css`

---

## 📁 Project Structure Preview

After setup, your project will look like:

```
europa/
│
├── 📄 index.html (Main landing - subject selector)
│
├── 📚 Subjects
│   ├── SO/
│   │   ├── index.html (SO modules selector)
│   │   ├── hovedstader/
│   │   │   └── index.html
│   │   ├── instudering/
│   │   │   └── index.html
│   │   ├── js/
│   │   │   ├── index.js
│   │   │   ├── hovedstader.js
│   │   │   └── instudering.js
│   │   └── css/
│   │       ├── styles.css
│   │       ├── hovedstader.css
│   │       └── instudering.css
│   │
│   ├── NO/ (Coming soon)
│   ├── Engelska/ (Coming soon)
│   └── Franska/ (Coming soon)
│
├── 📦 shared/ (Shared across all subjects)
│   ├── js/
│   │   └── shared.js
│   └── css/
│       ├── styles.css
│       └── index.css
│
└── 📚 Other files (legacy)
    ├── css/
    ├── js/
    ├── images/
    └── documentation files
```

---

## 🔄 Navigation Structure

### Main Page
```
index.html
  ↓ Shows: Samhällskunskap |  Naturkunskap | Engelska |  Franska
```

### Subject Page (SO)
```
SO/index.html
  ↓ Shows: 🏛️ Huvudstäder | 📝 Instuderingsfrågor
  ↓ Back button to index.html
```

### Module Pages
```
SO/hovedstader/index.html
  ↓ Quiz interface
  ↓ Back button to SO/index.html

SO/instudering/index.html
  ↓ Quiz interface
  ↓ Back button to SO/index.html
```

---

## 🎯 Adding Content to New Subjects

### Example: Adding Content to NO (Norwegian)

#### Step 1: Create Module Directories
```bash
mkdir -p NO/hovedstader
mkdir -p NO/instudering
```

#### Step 2: Create Module Pages
Copy and adapt from SO:
- `NO/hovedstader/index.html`
- `NO/instudering/index.html`

Update paths to reference `../../shared/` instead of `../../shared/`

#### Step 3: Create Module Files
- `NO/js/hovedstader.js` - Norwegian version of capitals quiz
- `NO/js/instudering.js` - Norwegian version of study questions
- `NO/css/hovedstader.css`
- `NO/css/instudering.css`

#### Step 4: Update Content
- Change countries/capitals to Norwegian content
- Update question text to Norwegian
- Update styling if needed

#### Step 5: Update NO/index.html
Keep the same structure, just enable links when content is ready.

---

## 📊 LocalStorage Management

### Current Keys:
```javascript
capquiz_current_user_v3                    // Current user
capquiz_highscores_v3_Elsa                // Highscores for Elsa
capquiz_highscores_v3_Ingrid              // Highscores for Ingrid
capquiz_highscores_v3_Elektra             // Highscores for Elektra
```

### Optional: Subject-Specific Keys
If you want separate progress per subject:
```javascript
capquiz_current_user_v3                          // Still global
capquiz_highscores_v3_SO_Elsa                   // SO Elsa scores
capquiz_highscores_v3_SO_Ingrid                 // SO Ingrid scores
capquiz_highscores_v3_NO_Elsa                   // NO Elsa scores
// etc.
```

To implement: Update `shared/js/shared.js` to include subject parameter.

---

## 🚀 Quick Start Steps

### 1. Copy Files (One-Time Setup)
```bash
cd /Users/lisa.noren/develop/europa

# Create directories
mkdir -p shared/js shared/css
mkdir -p NO/js NO/css
mkdir -p Engelska/js Engelska/css
mkdir -p Franska/js Franska/css

# Copy shared files
cp js/shared.js shared/js/
cp css/styles.css shared/css/
cp css/index.css shared/css/

# Copy SO files
cp js/hovedstader.js SO/js/
cp js/instudering.js SO/js/
cp css/hovedstader.css SO/css/
cp css/instudering.css SO/css/
```

### 2. Test Navigation
- Open `index.html` → see subject buttons
- Click "Samhällskunskap" → see SO modules
- Click "Huvudstäder" → see quiz interface

### 3. Add Placeholder Files
Create empty `index.js` and `styles.css` for NO, Engelska, Franska to match SO structure.

### 4. Start Adding Content!
Once structure is verified, start adding content to each subject.

---

## 📝 Files Reference

| File | Purpose |
|------|---------|
| `index.html` | Main subject selector |
| `SO/index.html` | SO modules selector |
| `SO/hovedstader/index.html` | Capitals quiz (SO) |
| `SO/instudering/index.html` | Study questions (SO) |
| `SO/js/index.js` | User selection for SO |
| `SO/js/hovedstader.js` | Capitals quiz logic |
| `SO/js/instudering.js` | Study questions logic |
| `shared/js/shared.js` | Common utilities |
| `shared/css/styles.css` | Base styles |

---

## 🧪 Testing the Setup

### Test 1: Main Navigation
```
Open index.html
  ✓ Should see 4 subject buttons
  ✓ Clicking "Samhällskunskap" goes to SO/index.html
```

### Test 2: SO Navigation
```
Open SO/index.html
  ✓ Should see 2 module buttons
  ✓ "Huvudstäder" goes to SO/huvudstader/index.html
  ✓ "Instuderingsfrågor" goes to SO/instudering/index.html
  ✓ Back button goes to index.html
```

### Test 3: Quiz Functionality
```
Open SO/huvudstader/index.html
  ✓ Quiz loads 42 countries
  ✓ Scoring works
  ✓ Highscores save
  ✓ Back button works
```

### Test 4: Placeholder Pages
```
Open NO/index.html
  ✓ Shows "Coming soon" message
  ✓ Back button works
```

---

## 💡 Tips for Adding New Content

1. **Start with structure** - Create directories and placeholder pages first
2. **Copy and adapt** - Use SO as template for other subjects
3. **Update paths** - Make sure relative paths are correct
4. **Test thoroughly** - Check all navigation links work
5. **Commit to git** - Save progress regularly

---

## 🎓 Content Ideas

### SO (Samhällskunskap)
- ✅ Capitals quiz
- ✅ Study questions
- Geography quiz
- Culture/history questions

### NO (Science)
- Norwegian capitals
- Norwegian vocabulary
- Norwegian grammar
- Listening comprehension

### Engelska
- English vocabulary
- English grammar
- Reading comprehension
- Conversation practice

### Franska
- French vocabulary
- French grammar
- Pronunciation guide
- Cultural content

---

## ✨ Key Features

✅ **Modular Design** - Each subject independent
✅ **Code Reuse** - Shared utilities in `shared/`
✅ **Easy to Expand** - Same pattern for new subjects
✅ **User Tracking** - Can track progress per subject
✅ **Responsive Design** - Works on all devices
✅ **Beautiful UI** - Consistent styling across subjects

---

## 📚 Documentation Files

- `README.md` - Main project overview
- `ARCHITECTURE.md` - Technical architecture
- `SUBJECT_STRUCTURE.md` - Detailed structure documentation
- `MULTI_SUBJECT_SETUP.md` - Setup instructions
- This file - Implementation guide

---

## 🎉 Next Steps

1. ✅ Review this guide
2. ✅ Run the setup commands to copy files
3. ✅ Test navigation in browser
4. ✅ Create content for other subjects
5. ✅ Customize styling as needed

Your project is ready for multi-subject expansion!


