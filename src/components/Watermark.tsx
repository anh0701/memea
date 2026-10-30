import { ShieldCheck } from "lucide-react";

export default function Watermark() {
  return (
    <div className="watermark" aria-label="Fictional content, made for memes">
      <ShieldCheck size={13} strokeWidth={2.4} />
      <span>fake meme</span>
    </div>
  );
}
