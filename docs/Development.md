# Development

React + Vite, styled with [Glow UI](../vendor/) (frosted glass, neon
edges, a Swiss 12-column grid).

```sh
npm install
npm run dev      # http://localhost:5173 (or: vp dev)
npm run build    # typecheck + vite build -> dist/
```

## Layout

- `index.html`: page shell, fonts (Inter, Inter Tight), GoatCounter
- `src/App.tsx`: page sections: masthead, hero/index, games, infrastructure, about, footer
- `src/projects.ts`: game names, links, descriptions, accent hue
- `src/site.css`: page-level layout on top of `glow-ui/styles.css`
- `public/screens/`: game screenshots, 1200×750 JPEG (16:10)

## Design rules

- Everything sits on the 12-column grid: section labels in columns 1–2,
  content from column 3. Press **G** to show the grid.
- Glow means attention: accents only on index numbers, rules and hover/focus.
- Each game retints its row with its own `--glow-h` (set in `projects.ts`).

## Updating Glow UI

Glow UI is installed from a vendored tarball, so CI needs no access to the
library repo:

```sh
cd ../experiments/frameworks/react/glow-ui && npm run pack   # writes glow-ui-<version>.tgz
cd ~/Code/Homepage
git rm vendor/glow-ui-*.tgz                                  # keep exactly one tarball
cp ../experiments/frameworks/react/glow-ui/glow-ui-<version>.tgz vendor/
npm install ./vendor/glow-ui-<version>.tgz                   # updates package.json and the lockfile
```

Each release has its own file name, so `npm install` always refreshes the
lockfile checksum and `npm ci` in CI stays green. Read the library's
`CHANGELOG.md` for what changed.

## Screenshots

Capture at 1440×900 and save as 1200×750 JPEG in `public/screens/<slug>.jpg`.
