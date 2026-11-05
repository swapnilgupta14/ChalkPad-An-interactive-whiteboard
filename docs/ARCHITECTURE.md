# Architecture

This document is a template. Replace placeholders with details verified from the current codebase.

## System overview

Describe the deployed and local system:

```text
[Browser / React application]
          |
          | HTTP API and Socket.IO
          v
[Backend / Socket.IO server]
          |
          v
[Persistence layer, if implemented]
```

Do not imply that data is persisted unless the implementation actually stores it.

## Frontend

Document:

- Application entry point.
- Routing and page structure.
- Canvas rendering layer.
- State management and ownership.
- How drawing elements are represented.
- How local changes are applied before or after server acknowledgement.

## Backend

Document:

- Server entry point and framework.
- Socket.IO initialization and CORS policy.
- Room creation and membership rules.
- Authentication and authorization model.
- Validation of incoming events.
- Persistence and recovery behaviour, if present.

## Data flow

Describe the lifecycle of a drawing operation:

1. A participant performs an action.
2. The client updates local state according to the implementation's consistency model.
3. The client emits the relevant event.
4. The server validates and routes the event.
5. Other room participants apply the update.
6. State is persisted or discarded according to the documented design.

Replace this generic flow with actual event names and code references.

## Failure handling

Document behaviour for:

- Network disconnects and reconnects.
- Duplicate or out-of-order events.
- A participant leaving a room.
- Server restart.
- Invalid payloads.
- Conflicting edits.

## Security boundaries

Document authentication, room authorization, origin restrictions, input validation, rate limits, and any limitations. Never publish secrets or private production endpoints.
