# Quick Reference Guide

## File Locations & Purposes

### 🏠 Index Page
- **HTML**: `index.html`
- **CSS**: `css/index.css`
- **JS**: `js/shared.js` + `js/index.js`
- **Purpose**: User selection & navigation hub

### 🏛️ Capitals Quiz
- **HTML**: `huvudstader.html`
- **CSS**: `css/huvudstader.css`
- **JS**: `js/shared.js` + `js/huvudstader.js`
- **Purpose**: Quiz on 42 European capitals

### 📚 Study Questions
- **HTML**: `instudering.html`
- **CSS**: `css/styles.css` + `css/instudering.css`
- **JS**: `js/shared.js` + `js/instudering.js`
- **Purpose**: 43 study questions with keyword scoring

## Adding New Features

### Add a CSS style for a new element
→ Edit the relevant CSS file (e.g., `css/instudering.css`)

### Add a shared utility function
→ Add to `js/shared.js` and use in other files

### Add page-specific logic
→ Add to the page's JS file (e.g., `js/index.js`)

### Add a new page
1. Create `new-page.html`
2. Create `css/new-page.css` (optional)
3. Create `js/new-page.js`
4. Link: `<script src="js/shared.js"></script>` then `<script src="js/new-page.js"></script>`

## LocalStorage Keys

```javascript
// Current user selection
localStorage.getItem("capquiz_current_user_v3")

// User highscores (stored as JSON array)
localStorage.getItem("capquiz_highscores_v3_Elsa")
localStorage.getItem("capquiz_highscores_v3_Ingrid")
localStorage.getItem("capquiz_highscores_v3_Elektra")
```

## Key Shared Functions

### Storage Functions
```javascript
loadStore()      // Load from localStorage
saveStore(store) // Save to localStorage
```

### Text Processing
```javascript
norm(s)          // Normalize: lowercase, trim, spaces
escapeHtml(str)  // XSS protection
```

### Scoring
```javascript
levenshtein(a,b)         // Edit distance
keywordScore(answer, kw) // Fuzzy keyword matching (0, 0.5, 1)
```

### Arrays
```javascript
shuffle(arr)     // Randomize array
clamp(n, min, max) // Constrain number
```

## Testing Checklist

- [ ] Index page loads and user selection works
- [ ] Selected user persists across page navigation
- [ ] Capitals quiz loads 42 countries
- [ ] Answers are graded correctly
- [ ] Highscores save per user
- [ ] Study questions load all 43 questions
- [ ] Keyword scoring works on open-ended questions
- [ ] Results page shows correct breakdown
- [ ] No console errors

## Common Tasks

### View current user
```javascript
localStorage.getItem("capquiz_current_user_v3")
```

### Clear all data
```javascript
localStorage.clear()
```

### Check user's highscores
```javascript
const key = "capquiz_highscores_v3_Elsa";
const scores = JSON.parse(localStorage.getItem(key) || "[]");
console.log(scores);
```

### Add a new question (in instudering.js)
```javascript
{ 
  id:"qXX", 
  type:"mcq", 
  topic:"Topic", 
  text:"Question text?",
  options:["A","B","C","D"],
  correct:"A"
}
```

---

**Happy developing!** 🚀

