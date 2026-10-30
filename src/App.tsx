import { useState } from "react";
import {
  ArrowDownRight,
  Asterisk,
  Check,
  CheckCircle2,
  CircleHelp,
  Download,
  Laugh,
  PencilLine,
  Sparkles,
  WandSparkles,
  Wrench,
} from "lucide-react";

import EditorPanel from "./components/EditorPanel";
import MemePreview from "./components/MemePreview";
import ExportButtons from "./components/ExportButtons";
import { defaultMeme } from "./data/meme/defaultMeme";
import type { MemeDraft } from "./types/meme";

export default function App() {
  const [draft, setDraft] = useState<MemeDraft>(defaultMeme);

  const updateDraft = (updates: Partial<MemeDraft>) => {
    setDraft((current) => ({
      ...current,
      ...updates,
    }));
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="MemeForge trang chủ">
          <span className="brand-mark">
            <Laugh size={23} strokeWidth={2.7} />
          </span>

          <span>
            Meme<span className="brand-highlight">A</span>
            <small>MAKE IT A MEME</small>
          </span>
        </a>

        <div className="topbar-right">
          <span className="beta-pill">
            <span /> v1.0.0-beta
          </span>

          <a className="about-link" href="#how-it-works">
            <CircleHelp size={16} />
            Cách hoạt động
          </a>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-kicker">
            <Sparkles size={15} />
            YOUR IDEA, YOUR MEME
          </div>

          <h1>
            Ý tưởng hơi <span>khùng.</span>
            <br />
            Meme thì <span>đỉnh.</span>
          </h1>

          <p>
            Tạo chat giả lập, thông báo drama hay meme ảnh chỉ trong vài cú
            click. Không cần designer, chỉ cần khiếu hài hước.
          </p>

          <div className="hero-points">
            <span>
              <Check size={15} /> Miễn phí, chạy trên trình duyệt
            </span>
            <span>
              <Check size={15} /> Watermark minh bạch
            </span>
          </div>
        </div>

        <div className="hero-doodle" aria-hidden="true">
          <div className="doodle-star">
            <Asterisk size={60} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <div className="doodle-bubble">
            LOL
            <br />
            <Laugh size={24} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <div className="doodle-spark">
            <Sparkles size={24} strokeWidth={1.8} aria-hidden="true" />
          </div>
          <div className="doodle-note">
            100% made-up
            <br />
            100% for fun
          </div>
          <ArrowDownRight className="doodle-arrow" size={42} />
        </div>
      </section>

      <section className="studio-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE MEME WORKSHOP</span>
            <h2>
              Vào xưởng thôi{" "}
              <Wrench size={22} strokeWidth={1.8} aria-hidden="true" />
            </h2>
          </div>

          <span className="live-pill">LIVE PREVIEW</span>
        </div>

        <div className="studio-grid">
          <EditorPanel draft={draft} onChange={updateDraft} />

          <section className="preview-panel">
            <div className="preview-heading">
              <div>
                <span className="eyebrow">BẢN XEM TRƯỚC</span>
                <h3>Thành phẩm của bạn</h3>
              </div>

              <span className="preview-status">
                <span /> Đang cập nhật
              </span>
            </div>

            <div className="preview-stage">
              <div className="stage-decoration stage-decoration-one">
                <Asterisk size={28} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <div className="stage-decoration stage-decoration-two">
                <Sparkles size={28} strokeWidth={1.8} aria-hidden="true" />
              </div>

              <MemePreview draft={draft} />
            </div>

            <ExportButtons draft={draft} filename={`chelab-${draft.type}`} />

            <div className="preview-disclaimer">
              <span className="disclaimer-shield">
                <CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" />
              </span>
              <span>
                Đây là nội dung giả lập, không phải ảnh chụp cuộc trò chuyện hay
                bài đăng có thật.
              </span>
            </div>
          </section>
        </div>
      </section>

      <section className="how-section" id="how-it-works">
        <div>
          <span className="eyebrow">NHANH GỌN LẸ</span>
          <h2>Ba bước, một chiếc meme.</h2>
        </div>

        <div className="how-grid">
          <article>
            <span className="how-number">01</span>
            <WandSparkles size={23} />
            <h3>Chọn format</h3>
            <p>Chat, thông báo, bài đăng hoặc ảnh meme.</p>
          </article>

          <article>
            <span className="how-number">02</span>
            <span className="how-emoji">
              <PencilLine size={24} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <h3>Thêm gia vị</h3>
            <p>Sửa nội dung, đổi màu, biến ý tưởng thành trò cười.</p>
          </article>

          <article>
            <span className="how-number">03</span>
            <Download size={23} />
            <h3>Xuất & chia sẻ</h3>
            <p>Tải PNG/JPG với nhãn nội dung giả lập được gắn sẵn.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">
            <Laugh size={19} />
          </span>
          <span>
            Meme<span className="brand-highlight">A</span>
          </span>
        </a>

        <p>
          Hư cấu có trách nhiệm. Cười vui có watermark.{" "}
          <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
        </p>
      </footer>
    </main>
  );
}
