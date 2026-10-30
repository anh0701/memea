import type { EditorProps } from "../editor.utils";
import { fieldLabel } from "../editor.utils";

export default function NotificationEditor({ draft, onChange }: EditorProps) {
  return (
    <section className="editor-section">
      <h3>Nội dung thông báo</h3>

      {fieldLabel(
        "Tên ứng dụng",
        <input
          value={draft.notificationApp}
          onChange={(event) =>
            onChange({ notificationApp: event.target.value })
          }
        />,
      )}

      {fieldLabel(
        "Tiêu đề",
        <input
          value={draft.notificationTitle}
          onChange={(event) =>
            onChange({ notificationTitle: event.target.value })
          }
        />,
      )}

      {fieldLabel(
        "Nội dung",
        <textarea
          rows={4}
          value={draft.notificationBody}
          onChange={(event) =>
            onChange({ notificationBody: event.target.value })
          }
        />,
      )}
    </section>
  );
}
