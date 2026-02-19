# Europa Project - Restructured Architecture

## Overview
This project has been restructured to have a modular, organized architecture with separate HTML, CSS, and JavaScript files for each page.

## Directory Structure

### HTML Files
- **index.html** - Main landing page with user selection
- **huvudstader.html** - Capitals quiz page
- **instudering.html** - Study questions page

### CSS Files (css/)
- **index.css** - Styles for index page
- **huvudstader.css** - Styles for huvudstader page
- **instudering.css** - Styles for instudering page
- **styles.css** - Common/shared styles used by multiple pages

### JavaScript Files (js/)
- **shared.js** - Shared utilities and helper functions used across all pages
  - Constants: STORAGE_KEY, USER_KEY
  - Storage functions: loadStore(), saveStore()
  - String utilities: norm(), tokenize(), escapeHtml(), escapeAttr()
  - Scoring functions: levenshtein(), keywordScore(), scoreFromAllowList()
  - Array utilities: shuffle(), clamp()
  - Helper: formatPercent()

- **index.js** - Index page functionality
  - User selection dropdown logic
  - User icon display management

- **huvudstader.js** - Capitals quiz logic
  - Country data and constants
  - Quiz rendering and grading
  - User management and highscore tracking
  - Modal management

- **instudering.js** - Study questions page logic
  - Question bank and presets
  - Quiz initialization and rendering
  - Grading logic with keyword scoring
  - Highscore management

- **main.js** (deprecated) - Old monolithic file containing all logic. Use specific page files instead.

## Dependencies

### Each page depends on:
- **index.html** → shared.js → index.js
- **huvudstader.html** → shared.js → huvudstader.js
- **instudering.html** → styles.css, instudering.css → shared.js → instudering.js

## Key Features

### Shared Storage
All pages use localStorage with these keys:
- `capquiz_current_user_v3` - Currently selected user
- `capquiz_highscores_v3_` - Prefix for highscores (e.g., `capquiz_highscores_v3_Elsa`)

### Users
Three users available:
- Elsa (🎀)
- Ingrid (🌼)
- Elektra (🌟)

### Pages

#### Index Page
- User selection dropdown
- Navigation to other modules
- Display of selected user with emoji icon

#### huvudstader Page
- Quiz with 42 European countries and capitals
- Real-time answer checking with scoring:
  - Exact match: 1 point
  - 1-2 character differences: 0.5 points
  - Wrong: 0 points
- Results view with mistakes highlighted
- Highscore tracking per user

#### Instudering Page
- Multiple question types:
  - Multiple choice (MCQ)
  - List text (multiple answers)
  - Multi-text (specific prompts)
  - Free keywords (fuzzy matching)
  - Single text (exact or fuzzy)
- Progressive quiz interface
- Full results page with breakdown
- Keyword-based scoring for open-ended questions

## Development Notes

- All shared utilities are in `shared.js` to avoid duplication
- Each page has its own JavaScript file for page-specific logic
- CSS is split per page for easier maintenance, with `styles.css` containing common styles
- User preferences and scores are persisted to localStorage
- No external dependencies - pure vanilla JavaScript

## Migration from Main.js

The old `main.js` has been split:
- Shared utilities → `js/shared.js`
- Instudering logic → `js/instudering.js`
- Huvudstader logic → `js/huvudstader.js` (was already separate)
- Index logic → `js/index.js` (was inline in HTML)

All functionality remains the same, but is now better organized.

