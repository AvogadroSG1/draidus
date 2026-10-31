# Draidus

Draidus is an Obsidian plugin described as “Turn notes into actions on external services.”

## Installation

When Draidus is available in Obsidian’s community plugins, install it from **Settings → Community plugins → Browse**, then enable it.

To install a release manually, download `main.js` and `manifest.json` from the release and copy them into your vault’s `.obsidian/plugins/draidus/` directory. Restart or reload Obsidian, then enable Draidus under **Settings → Community plugins**.

## Current usage

Draidus is currently an empty starter plugin. It does not add any commands or settings.

## Development

Install the dependencies with:

```sh
npm install
```

Use the following scripts from the repository root:

- `npm run dev` starts the development build in watch mode and writes the bundled plugin to `main.js`.
- `npm run build` performs a production build.
- `npm run lint` checks the project with ESLint.
- `npm run verify` runs linting followed by the production build.
- `npm install` activates the repository's `.beads/hooks` directory for this Git worktree when run from the repository root. The setup uses Git only and does not require the Beads CLI; it no-ops outside a Git worktree.

Both pre-commit and pre-push hooks run `npm run verify` and block the operation if linting or the production build fails. The plugin is an empty starter with no automated test suite, so no app tests are currently available to run.

After building, reload Obsidian to load the updated plugin.

## Releasing

1. Update the plugin version in `manifest.json`, `package.json`, and `versions.json`, keeping the versions in sync.
2. Commit the version update.
3. Create and push a bare semantic-version tag, without a `v` prefix:

   ```sh
   git tag 1.0.1
   git push origin 1.0.1
   ```

4. The tag-triggered reusable release workflow builds the plugin and creates a draft GitHub release for the matching version. Review the draft before publishing it.
