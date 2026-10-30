import type { MemeDraft } from "../../../types/meme";

interface Props {
  draft: MemeDraft;
}

export default function ImageMemePreview({ draft }: Props) {
  return (
    <section className="image-meme">
      <div className="image-meme-text top-text">
        {draft.imageTopText || "CHỮ Ở PHÍA TRÊN"}
      </div>

      {draft.imageUrl ? (
        <img
          className="uploaded-meme-image"
          src={draft.imageUrl}
          alt="Ảnh meme do người dùng chọn"
        />
      ) : (
        <div className="image-placeholder">
          <div className="placeholder-face">ಠ_ಠ</div>
          <strong>Ảnh meme của bạn sẽ ở đây</strong>
          <span>Tải ảnh lên từ bảng chỉnh sửa</span>
        </div>
      )}

      <div className="image-meme-text bottom-text">
        {draft.imageBottomText || "CHỮ Ở PHÍA DƯỚI"}
      </div>
    </section>
  );
}
