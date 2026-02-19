# ✅ Multi-Subject Setup Checklist

## Phase 1: File Organization (Copy Existing Files)

### Create Shared Folder
```bash
mkdir -p shared/js shared/css
```
- [ ] Folder created

### Copy Shared JavaScript
```bash
cp js/shared.js shared/js/
```
- [ ] `shared/js/shared.js` created

### Copy Shared CSS
```bash
cp css/styles.css shared/css/
cp css/index.css shared/css/
```
- [ ] `shared/css/styles.css` created
- [ ] `shared/css/index.css` created

### Copy SO JavaScript
```bash
cp js/hovedstader.js SO/js/
cp js/instudering.js SO/js/
```
- [ ] `SO/js/hovedstader.js` created
- [ ] `SO/js/instudering.js` created

### Copy SO CSS
```bash
cp css/hovedstader.css SO/css/
cp css/instudering.css SO/css/
```
- [ ] `SO/css/hovedstader.css` created
- [ ] `SO/css/instudering.css` created

---

## Phase 2: Create Placeholder Files

### NO Subject
Create `NO/js/index.js`:
- [ ] Copy content from `SO/js/index.js`
- [ ] Paste into `NO/js/index.js`

Create `NO/css/styles.css`:
- [ ] Create empty file or simple placeholder
- [ ] Add comment: `/* NO (Naturkunskap) specific styles */`

### Engelska Subject
Create `Engelska/js/index.js`:
- [ ] Copy content from `SO/js/index.js`
- [ ] Paste into `Engelska/js/index.js`

Create `Engelska/css/styles.css`:
- [ ] Create empty file or simple placeholder
- [ ] Add comment: `/* Engelska specific styles */`

### Franska Subject
Create `Franska/js/index.js`:
- [ ] Copy content from `SO/js/index.js`
- [ ] Paste into `Franska/js/index.js`

Create `Franska/css/styles.css`:
- [ ] Create empty file or simple placeholder
- [ ] Add comment: `/* Franska specific styles */`

---

## Phase 3: Verify File Structure

Check that these files exist:

### Shared Folder
```
shared/
├── js/
│   └── shared.js ✓
└── css/
    ├── styles.css ✓
    └── index.css ✓
```
- [ ] All 3 files present

### SO Folder
```
SO/
├── index.html ✓
├── js/
│   ├── index.js ✓
│   ├── hovedstader.js ✓
│   └── instudering.js ✓
├── css/
│   ├── styles.css ✓
│   ├── huvudstader.css ✓
│   └── instudering.css ✓
├── hovedstader/
│   └── index.html ✓
└── instudering/
    └── index.html ✓
```
- [ ] All 9 files present

### NO Folder
```
NO/
├── index.html ✓
├── js/
│   └── index.js ✓
└── css/
    └── styles.css ✓
```
- [ ] All 3 files present

### Engelska Folder
```
Engelska/
├── index.html ✓
├── js/
│   └── index.js ✓
└── css/
    └── styles.css ✓
```
- [ ] All 3 files present

### Franska Folder
```
Franska/
├── index.html ✓
├── js/
│   └── index.js ✓
└── css/
    └── styles.css ✓
```
- [ ] All 3 files present

---

## Phase 4: Test Navigation

### Main Page Test
- [ ] Open `index.html` in browser
- [ ] See 4 subject buttons (SO, NO, Engelska, Franska)
- [ ] Buttons are clickable

### SO Subject Test
- [ ] Click "Samhällskunskap" button
- [ ] Page loads `SO/index.html`
- [ ] See 2 module buttons
- [ ] Back button visible and works

### SO Module Tests
- [ ] Click "Huvudstäder" button
- [ ] Page loads `SO/huvudstader/index.html`
- [ ] Quiz interface appears
- [ ] Can see 42 countries
- [ ] Back button works
- [ ] Click "Instuderingsfrågor" button
- [ ] Page loads `SO/instudering/index.html`
- [ ] Quiz interface appears
- [ ] Can see questions
- [ ] Back button works

### Other Subjects Test
- [ ] Click "Naturkunskap" button → Shows "Coming soon" message
- [ ] Click "Engelska" button → Shows "Coming soon" message
- [ ] Click "Franska" button → Shows "Coming soon" message
- [ ] All back buttons work

---

## Phase 5: Test Functionality

### User Selection
- [ ] User dropdown visible in SO pages
- [ ] Can select user (Elsa, Ingrid, Elektra)
- [ ] Selection persists on page reload

### Quiz Scoring (SO/Hovedstäder)
- [ ] Can type answers in input fields
- [ ] Rätta button grades answers
- [ ] Scores displayed correctly
- [ ] Mistake view shows errors
- [ ] Highscores saved

### Quiz Scoring (SO/Instudering)
- [ ] Questions load correctly
- [ ] Can navigate with back/forward
- [ ] Can answer questions
- [ ] Rätta button works
- [ ] Results show correctly
- [ ] Highscores saved

---

## Phase 6: Browser Testing

### Desktop Browsers
- [ ] Chrome - All features work
- [ ] Firefox - All features work
- [ ] Safari - All features work
- [ ] Edge - All features work

### Mobile Testing
- [ ] Responsive design works
- [ ] Touch buttons work
- [ ] Layout looks good on small screens
- [ ] Navigation works on mobile

---

## Phase 7: Optional Cleanup

### Optional: Delete Legacy Files
```bash
# Only if you're sure SO is working!
rm hovedstader.html
rm instudering.html
rm js/main.js
```
- [ ] Backed up files first
- [ ] Tested SO still works
- [ ] Deleted legacy files

### Optional: Update Root index.html
- [ ] Removed "Seterra" link
- [ ] Updated subtitle to "Välj ämne"
- [ ] Verified all buttons point to subject pages

---

## Final Verification

- [ ] All files copied
- [ ] All placeholders created
- [ ] All tests passed
- [ ] Documentation reviewed
- [ ] Ready to add content

---

## Summary

| Phase | Status | Time |
|-------|--------|------|
| File Organization | ⏳ | 5 min |
| Create Placeholders | ⏳ | 5 min |
| Verify Structure | ⏳ | 2 min |
| Test Navigation | ⏳ | 3 min |
| Test Functionality | ⏳ | 5 min |
| Browser Testing | ⏳ | 5 min |
| **Total** | ⏳ | **25 min** |

---

## Next: Add Content to New Subjects

Once this checklist is complete:

1. **NO Subject** - Add Norwegian capitals and content
2. **Engelska Subject** - Add English vocabulary and content
3. **Franska Subject** - Add French vocabulary and content

Each subject can be added by following the SO pattern!

---

## Notes

- SO subject is fully functional after Phase 1
- Phases 2-4 add structure for other subjects
- Phases 5-7 verify everything works
- You're done once this entire checklist is checked!

---

**Good luck! You've got this!** 🎉

