# North

North’s official marketing website: a free productivity ecosystem for desktop, mobile, web, and browser extensions.

## Development

Requires Node.js 22.12+.

    npm ci
    npm run dev

## Checks

    npm run build
    npm test -- --pool=threads --maxWorkers=1

Pushing to main builds and deploys the site to GitHub Pages using GitHub Actions. Download buttons remain marked coming soon until official release links are available.
