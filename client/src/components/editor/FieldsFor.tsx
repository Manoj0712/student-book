import type {
  AudioProps,
  FieldsForProps,
  ImageProps,
  LiveDataProps,
  TextProps,
  ThreeDProps,
  VideoProps,
  Widget
} from "../../types/book";
import Field from "./Field";

function FieldsFor({ widget, onChangeProps }: FieldsForProps) {
  const set = (patch: Partial<Widget["props"]>) => onChangeProps(widget.id, { ...widget.props, ...patch } as Widget["props"]);

  switch (widget.type) {
    case "Text": {
      const p = widget.props as TextProps;
      return (
        <>
          <Field label="Text content">
            <textarea
              value={p.text}
              onChange={(e) => set({ text: e.target.value })}
              rows={6}
              className="input"
            />
          </Field>
          <Field label="Tag">
            <select value={p.tag || "p"} onChange={(e) => set({ tag: e.target.value as TextProps["tag"] })} className="input">
              <option value="p">Paragraph</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Font size">
              <input
                type="number"
                value={p.fontSize}
                onChange={(e) => set({ fontSize: Number(e.target.value) })}
                className="input"
                min={8}
                max={96}
              />
            </Field>
            <Field label="Color">
              <input type="color" value={p.color} onChange={(e) => set({ color: e.target.value })} className="input h-9 p-1" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Weight">
              <select
                value={p.fontWeight || "normal"}
                onChange={(e) => set({ fontWeight: e.target.value as TextProps["fontWeight"] })}
                className="input"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </select>
            </Field>
            <Field label="Align">
              <select
                value={p.align || "left"}
                onChange={(e) => set({ align: e.target.value as TextProps["align"] })}
                className="input"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </Field>
          </div>
        </>
      );
    }

    case "Image": {
      const p = widget.props as ImageProps;
      return (
        <>
          <Field label="Image URL">
            <input value={p.url} onChange={(e) => set({ url: e.target.value })} className="input" placeholder="https://…" />
          </Field>
          <Field label="Alt text">
            <input value={p.alt || ""} onChange={(e) => set({ alt: e.target.value })} className="input" />
          </Field>
        </>
      );
    }

    case "Video": {
      const p = widget.props as VideoProps;
      return (
        <Field label="Video URL (mp4)">
          <input value={p.url} onChange={(e) => set({ url: e.target.value })} className="input" placeholder="https://…mp4" />
        </Field>
      );
    }

    case "Audio": {
      const p = widget.props as AudioProps;
      return (
        <Field label="Audio URL (mp3)">
          <input value={p.url} onChange={(e) => set({ url: e.target.value })} className="input" placeholder="https://…mp3" />
        </Field>
      );
    }

    case "3DObject": {
      const p = widget.props as ThreeDProps;
      return (
        <>
          <Field label="Label">
            <input value={p.label || ""} onChange={(e) => set({ label: e.target.value })} className="input" />
          </Field>
          <Field label="Model URL (optional)">
            <input value={p.modelUrl || ""} onChange={(e) => set({ modelUrl: e.target.value })} className="input" placeholder="https://…glb" />
          </Field>
        </>
      );
    }

    case "LiveData": {
      const p = widget.props as LiveDataProps;
      return (
        <>
          <Field label="Label">
            <input value={p.label || ""} onChange={(e) => set({ label: e.target.value })} className="input" />
          </Field>
          <Field label="Data source (optional)">
            <input value={p.source || ""} onChange={(e) => set({ source: e.target.value })} className="input" placeholder="e.g. sensor/temperature" />
          </Field>
        </>
      );
    }

    default:
      return null;
  }
}

export default FieldsFor;