import { Heart, MessageCircle, Send, UserRound } from "lucide-react";

import type { MemeDraft } from "../../../types/meme";

interface Props {
  draft: MemeDraft;
}

export default function PostPreview({ draft }: Props) {
  return (
    <section className="post-meme">
      <header className="post-header">
        <div className="avatar avatar-orange">
          <UserRound size={20} />
        </div>

        <div className="post-user">
          <strong>{draft.postName}</strong>
          <span>{draft.postHandle} · 2 giờ trước</span>
        </div>

        <span className="post-dots">•••</span>
      </header>

      {draft.postContentType === "text" ? (
        <div className="post-art">
          <div className="post-art-caption">{draft.postText}</div>
        </div>
      ) : (
        <>
          <div className="post-image-wrapper">
            {draft.postImageUrl ? (
              <img src={draft.postImageUrl} className="post-image" alt="" />
            ) : (
              <div className="post-image-placeholder">Chưa có ảnh</div>
            )}

            <div className="post-overlay">{draft.postText}</div>
          </div>

          <p className="post-copy">{draft.postText}</p>
        </>
      )}

      <div className="post-stats">
        <span>{draft.likes} lượt thích</span>
        <span>{draft.comments} bình luận</span>
      </div>

      <div className="post-actions">
        <span>
          <Heart size={17} /> Thích
        </span>

        <span>
          <MessageCircle size={17} /> Bình luận
        </span>

        <span>
          <Send size={17} /> Chia sẻ
        </span>
      </div>
    </section>
  );
}
