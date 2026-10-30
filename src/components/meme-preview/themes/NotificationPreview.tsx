import { Bell } from "lucide-react";

import type { MemeDraft } from "../../../types/meme";

interface Props {
  draft: MemeDraft;
}

export default function NotificationPreview({ draft }: Props) {
  return (
    <section className="notification-meme">
      <div className="phone-time">9:41</div>
      <div className="phone-date">THỨ HAI, MỘT NGÀY ĐẸP TRỜI</div>

      <div className="notification-card">
        <div className="notification-icon">
          <Bell size={20} />
        </div>

        <div className="notification-content">
          <div className="notification-app">
            {draft.notificationApp || "Ứng dụng"}
            <span>vừa xong</span>
          </div>

          <strong>{draft.notificationTitle || "Tiêu đề thông báo"}</strong>

          <p>{draft.notificationBody || "Nội dung thông báo..."}</p>
        </div>
      </div>

      <div className="phone-hint">Nội dung hôm nay: tìm lý do để ngủ tiếp.</div>
    </section>
  );
}
