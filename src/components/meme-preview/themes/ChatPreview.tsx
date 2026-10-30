import { Send, UserRound } from "lucide-react";

import type { MemeDraft } from "../../../types/meme";

interface Props {
  draft: MemeDraft;
}

export default function ChatPreview({ draft }: Props) {
  return (
    <section className="chat-meme">
      <header className="chat-header">
        <div className="avatar avatar-purple">
          <UserRound size={20} />
        </div>

        <div className="chat-contact">
          <strong>{draft.chatFriend || "Đứa bạn thân"}</strong>
          <span>đang hoạt động</span>
        </div>

        <span className="online-dot" />
      </header>

      <div className="chat-messages">
        {draft.messages.map((message) => (
          <div
            className={`message-row ${message.sender === "me" ? "mine" : ""}`}
            key={message.id}
          >
            <div className="message-bubble">
              <p>{message.text || "..."}</p>
              <time>{message.time}</time>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input-fake">
        Nhập tin nhắn...
        <Send size={15} />
      </div>
    </section>
  );
}
