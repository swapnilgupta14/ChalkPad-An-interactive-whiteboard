# Contributing

Thank you for considering a contribution. This guide describes the expected workflow. Update commands and conventions to match the repository before publishing.

## Before you start

1. Search existing issues and pull requests to avoid duplicate work.
2. For a substantial change, open an issue or discussion first to agree on scope.
3. Do not include credentials, private data, generated build output, or unrelated formatting changes.

## Development setup

1. Fork the repository on GitHub.
2. Clone your fork:

   ```bash
   git clone https://github.com/<YOUR_USERNAME>/<REPOSITORY>.git
   cd <REPOSITORY>
   ```

3. Install the package manager version and dependencies specified by the repository.
4. Copy `.env.example` to `.env` and configure local values.
5. Start the application using the commands in `docs/DEVELOPMENT.md`.

## Branch naming

Use descriptive names:

- `feat/<short-description>`
- `fix/<short-description>`
- `docs/<short-description>`
- `test/<short-description>`
- `refactor/<short-description>`

## Commit messages

Use Conventional Commit-style messages:

```text
feat: add rectangle drawing tool
fix: prevent duplicate socket listeners
docs: explain room synchronization
test: cover canvas serialization
refactor: isolate drawing event handlers
```

## Pull request process

1. Create a focused branch from the default branch.
2. Make the smallest coherent change.
3. Add or update tests where practical.
4. Update documentation when behaviour, configuration, or public interfaces change.
5. Run linting, tests, and production build locally.
6. Push your branch and open a pull request against the default branch.
7. Complete the pull request template and link related issues.

## Review expectations

A pull request should:

- Explain the problem and the proposed solution.
- Include reproduction steps for bug fixes.
- Include screenshots or recordings for visible UI changes.
- Describe protocol or data-shape changes.
- Identify breaking changes and migration steps.
- Pass required CI checks.
- Avoid introducing unrelated dependencies or broad refactors.

## Code style

Follow the conventions already present in the codebase. Keep components and modules focused, handle socket listener cleanup, avoid mutating shared state, and validate data received from network events.

## Reporting bugs

Use the Bug report issue template. Include the browser, operating system, reproduction steps, expected result, actual result, and relevant logs with secrets removed.

## Proposing features

Use the Feature request issue template. Explain the use case, expected behaviour, and alternatives considered.

## Security issues

Do not report vulnerabilities in public issues. Follow `SECURITY.md`.

## Licence

By submitting a contribution, you agree that your contribution is licensed under the project's MIT License. Do not submit code or assets that you do not have the right to contribute.
