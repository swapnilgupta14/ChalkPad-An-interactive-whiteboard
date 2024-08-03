import actionSlice from "@/components/Redux/reducers/actionSlice";

import canvasSlice from "@/components/Redux/reducers/canvasSlice";
import elementSlice from "@/components/Redux/reducers/elementSlice";
import hoverSlice from "@/components/Redux/reducers/hoverSlice";
import oldSelectedElementSlice from "@/components/Redux/reducers/oldSelectedElementSlice";

import resizeSlice from "@/components/Redux/reducers/resizeSlice";
import selectedElementSlice from "@/components/Redux/reducers/selectedElementSlice";
import toolSlice from "@/components/Redux/reducers/toolSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "canvas/setCanvas",
          "selectedElement/setOldSelectedElement",
        ],
        ignoredPaths: ["canvas.value", "selectedElement.oldSelectedElement"],
      },
    }),

  reducer: {
    tool: toolSlice,
    elements: elementSlice,
    canvas: canvasSlice,
    action: actionSlice,
    hover: hoverSlice,
    selectedElement: selectedElementSlice,
    resizeDirection: resizeSlice,
    oldElement: oldSelectedElementSlice,
  },
});

export default store;
