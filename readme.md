# Monoplayground

This project is meant to be a showcase of technologies that i use as a developer and how i like to separate concerns inside my apps.

## Project Structure

`.vscode`   - VSCode configuration files.
`apps`      - Applications that will be deployed in a subdomain.
`packages`  - Libraries that will be used by multiple apps.
`prisma`    - Database definitions and migrations.

## The following internal packages can be used inside the monorepo.

To install: `pnpm add @monoplayground/package --workspace`

| Package Name | Folder | Description |
|----------|--------|----------------|
| `@monoplayground` | `.` | Project Wide Packages. |
| `@monoplayground/db` | `./prisma` | Prisma Database Definitions, exports the client for the Models. |
| `@monoplayground/excalidraw-nuxt` | `./packages/excalidraw`| Nuxt layer that exports the Excalidraw component |
| `@monoplayground/tools` | `./packages/tools` | Nuxt layer that exports a set of tools for Nuxt. |
| `@monoplayground/ui` | `./packages/ui`   | UI Library. |
