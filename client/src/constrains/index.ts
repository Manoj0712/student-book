import type { WidgetType } from "../types/book";


export const WIDGET_BUTTONS: { type: WidgetType; label: string; icon: string }[] = [
  { type: "Text", label: "Text", icon: "T" },
  { type: "Image", label: "Image", icon: "▧" },
  { type: "Video", label: "Video", icon: "▶" },
  { type: "Audio", label: "Audio", icon: "♪" },
  { type: "3DObject", label: "3D Object", icon: "◧" },
  { type: "LiveData", label: "Live Data", icon: "◔" },
];

export const ZOOM_LEVELS = [50, 75, 100] as const;