# Lyyli Project Structure

## 🏗️ Project Organization

This document defines the correct project structure and prevents confusion between different project directories.

## 📁 Current Project Structure (CORRECT)

```
lyyli-clone-fresh/           # ← MAIN PROJECT DIRECTORY (use this)
├── src/                     # Source code
├── public/                  # Static assets
├── rules/                   # Brand and development rules
├── content/                 # Content files
├── messages/                # Internationalization
├── package.json            # Dependencies
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🚫 WRONG Directory (DO NOT USE)

```
lyyli-clone-fresh/lyyli-clone/  # ← OLD/DUPLICATE (archived)
```

## 📦 Archive Structure

```
archive/
├── old-project-structure/   # Complete duplicate project (lyyli-clone/)
├── documentation/           # Old README files and documentation
└── old-config/             # Old git and development configurations
```

## 🚀 Development Commands

**ALWAYS run from the main directory:**
```bash
cd /Users/mikko.oksanen/Desktop/Content\ AI\ Oy/Cursor/lyyli-clone-fresh
npm run dev
```

**NEVER run from subdirectories:**
```bash
# ❌ WRONG - Don't do this
cd lyyli-clone-fresh/lyyli-clone
npm run dev
```

## 🔍 How to Verify You're in the Right Place

1. **Check current directory**: `pwd`
2. **Should show**: `/Users/mikko.oksanen/Desktop/Content AI Oy/Cursor/lyyli-clone-fresh`
3. **Should NOT show**: `/Users/mikko.oksanen/Desktop/Content AI Oy/Cursor/lyyli-clone-fresh/lyyli-clone`

## 📝 File Locations

- **Source code**: `src/`
- **Configuration**: Root directory (next.config.ts, package.json, etc.)
- **Static assets**: `public/`
- **Brand rules**: `rules/`
- **Content**: `content/` and `messages/`

## 🧹 Cleanup Notes

- The `lyyli-clone/` subdirectory has been archived
- Old documentation files moved to `archive/documentation/`
- Old git configurations moved to `archive/old-config/`
- All active development should happen in the root directory

## ⚠️ Important Reminders

1. **Always start development from the root directory**
2. **Never create new subdirectories with duplicate project files**
3. **Use `npm run dev` from the main project directory**
4. **Check `pwd` if you're unsure about your location**
5. **All source files are in `src/`, not in subdirectories**

## 🔗 Quick Navigation

```bash
# Go to main project directory
cd /Users/mikko.oksanen/Desktop/Content\ AI\ Oy/Cursor/lyyli-clone-fresh

# Start development server
npm run dev

# Check project status
git status

# View project structure
ls -la
```

