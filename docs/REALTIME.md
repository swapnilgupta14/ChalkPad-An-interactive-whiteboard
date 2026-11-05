# Real-time Collaboration Protocol

This document must reflect the actual Socket.IO protocol. Do not treat the example names below as implemented events.

## Connection lifecycle

Document:

- Socket connection URL and namespace.
- Authentication handshake and token handling.
- Room join and leave behaviour.
- Presence updates.
- Disconnect and reconnect behaviour.

## Event catalogue

Replace this table with the exact event names and payload schemas used by the application.

| Direction | Event | Payload | Purpose |
| --- | --- | --- | --- |
| Client → server | `[JOIN_EVENT]` | `[SCHEMA]` | Join a board |
| Server → client | `[JOINED_EVENT]` | `[SCHEMA]` | Confirm membership / initial state |
| Client → server | `[DRAW_EVENT]` | `[SCHEMA]` | Submit a drawing operation |
| Server → room | `[DRAW_EVENT]` | `[SCHEMA]` | Broadcast an operation |
| Client → server | `[LEAVE_EVENT]` | `[SCHEMA]` | Leave a board |

## Payload requirements

For every event, document:

- Required and optional fields.
- Field types and size limits.
- Validation rules.
- Sender identity and authorization rules.
- Whether the sender receives its own broadcast.
- Error and acknowledgement behaviour.
- Versioning and backward compatibility.

## Ordering and consistency

Explain how the system handles event ordering, duplicate delivery, retries, concurrent operations, and reconnect recovery. If the implementation does not guarantee ordering or durable recovery, state that limitation explicitly.

## Operational considerations

Document CORS, allowed origins, heartbeat settings, connection limits, rate limits, payload limits, and logging practices. Never log access tokens or sensitive board content.
