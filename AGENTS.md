# AGENTS.md

## Project Overview

This is an open-source, real-time collaborative
whiteboard application.

The application allows multiple users to collaborate
on a shared canvas using real-time communication.

## Before Making Changes

1. Read README.md.
2. Read CONTRIBUTING.md.
3. Read docs/ARCHITECTURE.md.
4. Read docs/REALTIME.md before modifying socket logic.
5. Read docs/CANVAS.md before modifying canvas logic.
6. Inspect the existing implementation before proposing changes.

## Development Rules

- Follow existing project architecture.
- Reuse existing components and utilities.
- Avoid unnecessary dependencies.
- Do not introduce breaking API changes without discussion.
- Keep changes focused and minimal.
- Preserve existing functionality.

## Real-time Collaboration

- Do not introduce duplicate socket listeners.
- Clean up listeners when components unmount.
- Preserve room isolation.
- Validate incoming socket payloads.
- Consider concurrent users and network failures.
- Do not assume that local state is authoritative.

## Testing

Before submitting changes:

1. Run linting.
2. Run relevant tests.
3. Run the production build.
4. Test collaborative behaviour with multiple clients.

## Pull Requests

- Explain the problem being solved.
- Describe implementation details.
- Include tests.
- Document breaking changes.
- Never claim tests passed unless they were executed.
- Never commit secrets or environment files.
