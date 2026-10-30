import { Plus, Trash2 } from "lucide-react";

import type { ChatMessage } from "../../../types/meme";
import type { EditorProps } from "../editor.utils";
import { fieldLabel } from "../editor.utils";

export default function ChatEditor({ draft, onChange }: EditorProps) {
  const updateMessage = (id: string, updates: Partial<ChatMessage>) => {
    onChange({
      messages: draft.messages.map((message) =>
        message.id === id ? { ...message, ...updates } : message,
      ),
    });
  };

  const addMessage = () => {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      sender: draft.messages.length % 2 === 0 ? "them" : "me",
      text: "",
      time: "22:44",
    };

    onChange({
      messages: [...draft.messages, message],
    });
  };

  const deleteMessage = (id: string) => {
    onChange({
      messages: draft.messages.filter((message) => message.id !== id),
    });
  };

  return (
    <section className="editor-section">
      <h3>Cuộc hội thoại</h3>

      {fieldLabel(
        "Tên người kia",
        <input
          value={draft.chatFriend}
          onChange={(event) => onChange({ chatFriend: event.target.value })}
          placeholder="Đứa bạn thân"
        />,
      )}

      <div className="message-editor-list">
        {draft.messages.map((message, index) => (
          <div className="message-editor" key={message.id}>
            <div className="message-editor-top">
              <select
                aria-label={`Người gửi tin nhắn ${index + 1}`}
                value={message.sender}
                onChange={(event) =>
                  updateMessage(message.id, {
                    sender: event.target.value as ChatMessage["sender"],
                  })
                }
              >
                <option value="them">{draft.chatFriend || "Người kia"}</option>
                <option value="me">Tôi</option>
              </select>

              <input
                className="time-input"
                aria-label="Thời gian"
                value={message.time}
                onChange={(event) =>
                  updateMessage(message.id, {
                    time: event.target.value,
                  })
                }
              />

              <button
                className="icon-button danger"
                aria-label="Xóa tin nhắn"
                type="button"
                onClick={() => deleteMessage(message.id)}
              >
                <Trash2 size={15} />
              </button>
            </div>

            <textarea
              rows={2}
              value={message.text}
              onChange={(event) =>
                updateMessage(message.id, {
                  text: event.target.value,
                })
              }
              placeholder="Nhập tin nhắn..."
            />
          </div>
        ))}
      </div>

      <button className="secondary-button" onClick={addMessage} type="button">
        <Plus size={16} />
        Thêm tin nhắn
      </button>
    </section>
  );
}
