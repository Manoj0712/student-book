import { type Layout } from "react-grid-layout";
export type WidgetType = "Text" | "Image" | "Video" | "Audio" | "3DObject" | "LiveData";


export interface WidgetLayout {
  page: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TextProps {
  text: string;
  fontSize: number;
  color: string;
  fontWeight?: "normal" | "bold";
  align?: "left" | "center" | "right";
  tag?: "p" | "h1" | "h2" | "h3";
}

export interface ImageProps {
  url: string;
  alt?: string;
}

export interface VideoProps {
  url: string;
}

export interface AudioProps {
  url: string;
}

export interface ThreeDProps {
  modelUrl?: string;
  label?: string;
}

export interface LiveDataProps {
  source?: string;
  label?: string;
}

export type WidgetProps = TextProps | ImageProps | VideoProps | AudioProps | ThreeDProps | LiveDataProps;

export interface Widget {
  id: string;
  type: WidgetType;
  props: WidgetProps;
  layout: WidgetLayout;
}

export type Orientation = "portrait" | "landscape";

export interface BookPage {
  _id?: string;
  pageTitle: string;
  page_size_X: string;
  page_size_Y: string;
  orientation: Orientation;
  widgets: Widget[];
  createdAt?: string;
  updatedAt?: string;
}

export interface BookSummary {
  _id: string;
  pageTitle: string;
  orientation: Orientation;
  createdAt?: string;
  updatedAt?: string;
}


export interface ToolbarProps {
  pageTitle: string;
  orientation: Orientation;
  isPreview: boolean;
  isSaving: boolean;
  isEditingExisting: boolean;
  bookList: BookSummary[];
  statusMessage: string | null;
  onTitleChange: (title: string) => void;
  onOrientationChange: (o: Orientation) => void;
  onAddWidget: (type: WidgetType) => void;
  onTogglePreview: () => void;
  onSave: () => void;
  onNew: () => void;
  onOpenBook: (id: string) => void;
}

export interface CanvasProps {
  widgets: Widget[];
  pageCountOverride?: number;
  selectedId: string | null;
  isPreview: boolean;
  onSelect: (id: string | null) => void;
  onLayoutChange: (page: number, layout: Layout[]) => void;
  onDelete: (id: string) => void;
  onAddPage: () => void;
}

export interface PageCanvasProps {
  pageIndex: number;
  pageCount: number;
  widgets: Widget[];
  zoom: number;
  editable: boolean;
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onLayoutChange: (layout: Layout[]) => void;
  onDelete: (id: string) => void;
}

export interface WidgetShellProps {
  widget: Widget;
  selected: boolean;
  editable: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export interface PropertiesPanelProps {
  widget: Widget | null;
  onChangeProps: (id: string, props: Widget["props"]) => void;
  onDelete: (id: string) => void;
  onReorder: (id: string, direction: "front" | "back") => void;
  onClose: () => void;
}

export interface FieldsForProps {
  widget: Widget;
  onChangeProps: PropertiesPanelProps["onChangeProps"];
}