# Canvas Implementation

Replace this template with the actual canvas model and rendering behaviour.

## Rendering

Document the rendering library, coordinate system, viewport transform, device-pixel-ratio handling, and redraw strategy.

## Element model

List supported element types and their serialized representation.

Example only:

```ts
type Point = {
  x: number;
  y: number;
};

type CanvasElement = {
  id: string;
  type: string;
  // Add the actual type-specific fields.
};
```

Do not adopt this example schema unless it matches the codebase.

## Drawing lifecycle

Describe:

1. Pointer down and tool selection.
2. Pointer move and preview rendering.
3. Pointer up and element finalization.
4. Local state update.
5. Real-time event emission.
6. Remote event application.

## Coordinate conversion

Explain conversion between screen coordinates and world/canvas coordinates, including zoom and pan.

## Serialization and compatibility

Document how elements are saved, transmitted, loaded, validated, and migrated between schema versions.

## Performance

Record known limits and optimization strategies, such as batching pointer events, avoiding unnecessary full-canvas redraws, and limiting expensive object creation.
