import type {
  Widget,
  TextProps,
  ImageProps,
  VideoProps,
  AudioProps,
  ThreeDProps,
  LiveDataProps
} from "../../types/book";
import EmptyState from "./EmptyState";
import LiveDataPanel from "./LiveDataPanel";
import PlaceholderPanel from "./PlaceholderPanel";

interface Props {
  widget: Widget;
}

export default function WidgetRenderer({ widget }: Props) {
  switch (widget.type) {
    case "Text": {
      const p = widget.props as TextProps;
      const Tag = (p?.tag || "p") as "p" | "h1" | "h2" | "h3";
      return (
        <Tag
          // Scrollable within its own box, not clipped and not left to
          // overflow into whatever's below it: overflow-hidden silently
          // ate text past the bottom edge, and overflow-visible fixed that
          // but let long text spill downward and overlap neighboring
          // widgets. overflow-y-auto keeps every character reachable
          // (scroll to read the rest) while staying inside its own bounds.
          className="w-full h-full overflow-y-auto overflow-x-hidden break-words thin-scroll"
          style={{
            fontSize: `${p?.fontSize}px`,
            color: p?.color,
            fontWeight: p?.fontWeight === "bold" ? 700 : 400,
            textAlign: p?.align || "left",
            margin: 0,
            // Preserve line breaks the user typed (\n from the textarea) and
            // still wrap long lines — without this, the browser's default
            // white-space:normal collapses every newline into a single space,
            // so "1) good\n2) bad" renders as one run-on line.
            whiteSpace: "pre-wrap",
          }}
        >
          {p?.text}
        </Tag>
      );
    }
    case "Image": {
      const p = widget.props as ImageProps;
      return p?.url ? (
        <img src={p.url} alt={p?.alt || ""} className="w-full h-full object-cover rounded-sm" draggable={false} />
      ) : (
        <EmptyState label="Image" hint="No URL set" />
      );
    }
    case "Video": {
      const p = widget.props as VideoProps;
      if (!p.url) {
        return <EmptyState label="Video" hint="No URL set" />;
      }
      const isYouTube =
        p.url.includes("youtube.com") ||
        p.url.includes("youtu.be");

      if (isYouTube) {
        const getYouTubeId = (url: string) => {
          try {
            const parsedUrl = new URL(url);

            if (parsedUrl.hostname.includes("youtu.be")) {
              return parsedUrl.pathname.slice(1);
            }
            return parsedUrl.searchParams.get("v");
          } catch {
            return null;
          }
        };
        const videoId = getYouTubeId(p.url);
        if (!videoId) {
          return <EmptyState label="Video" hint="Invalid YouTube URL" />;
        }
        return (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={"YouTube video"}
            className="w-full h-full rounded-sm"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        );
      }

      return (
        <video
          src={p.url}
          controls
          className="w-full h-full rounded-sm bg-black"
        />
      );
    }
    case "Audio": {
      const p = widget.props as AudioProps;
      return p.url ? (
        <div className="w-full h-full flex items-center bg-ink/5 rounded-sm px-2">
          <audio src={p.url} controls className="w-full" />
        </div>
      ) : (
        <EmptyState label="Audio" hint="No URL set" />
      );
    }
    case "3DObject": {
      const p = widget.props as ThreeDProps;
      return <PlaceholderPanel icon="cube" label={p.label || "3D Object"} sub="Placeholder — 3D rendering not implemented" />;
    }
    case "LiveData": {
      const p = widget.props as LiveDataProps;
      return <LiveDataPanel label={p.label || "Live Data"} source={p.source} />;
    }
    default:
      return null;
  }
}