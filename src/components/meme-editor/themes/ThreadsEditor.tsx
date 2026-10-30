import { Plus, Trash2 } from "lucide-react";

import type { ThreadsPost, ThreadsReply } from "../../../types/meme";
import type { EditorProps } from "../editor.utils";
import { fieldLabel } from "../editor.utils";

export default function ThreadsEditor({ draft, onChange }: EditorProps) {
  const updatePost = (updates: Partial<ThreadsPost>) => {
    onChange({
      threadsPost: {
        ...draft.threadsPost,
        ...updates,
      },
    });
  };

  const updateReply = (id: string, updates: Partial<ThreadsReply>) => {
    onChange({
      threadsReplies: draft.threadsReplies.map((reply) =>
        reply.id === id ? { ...reply, ...updates } : reply,
      ),
    });
  };

  const addReply = () => {
    const reply: ThreadsReply = {
      id: crypto.randomUUID(),
      name: "Người dùng",
      username: "@username",
      text: "",
      time: "Vừa xong",
      likes: "0",
    };

    onChange({
      threadsReplies: [...draft.threadsReplies, reply],
    });
  };

  const deleteReply = (id: string) => {
    onChange({
      threadsReplies: draft.threadsReplies.filter((reply) => reply.id !== id),
    });
  };

  return (
    <>
      <section className="editor-section">
        <h3>Bài đăng chính</h3>

        {fieldLabel(
          "Tên hiển thị",
          <input
            value={draft.threadsPost.name}
            onChange={(event) => updatePost({ name: event.target.value })}
          />,
        )}

        {fieldLabel(
          "Tên tài khoản",
          <input
            value={draft.threadsPost.username}
            onChange={(event) => updatePost({ username: event.target.value })}
          />,
        )}

        {fieldLabel(
          "Nội dung bài đăng",
          <textarea
            rows={4}
            value={draft.threadsPost.text}
            onChange={(event) => updatePost({ text: event.target.value })}
          />,
        )}

        <div className="two-fields">
          {fieldLabel(
            "Thời gian",
            <input
              value={draft.threadsPost.time}
              onChange={(event) => updatePost({ time: event.target.value })}
            />,
          )}

          {fieldLabel(
            "Lượt thích",
            <input
              value={draft.threadsPost.likes}
              onChange={(event) => updatePost({ likes: event.target.value })}
            />,
          )}
        </div>
      </section>

      <section className="editor-section">
        <h3>Phản hồi ({draft.threadsReplies.length})</h3>

        <div className="message-editor-list">
          {draft.threadsReplies.map((reply, index) => (
            <div className="message-editor" key={reply.id}>
              <div className="message-editor-top">
                <strong>Phản hồi {index + 1}</strong>

                <button
                  className="icon-button danger"
                  aria-label={`Xóa phản hồi ${index + 1}`}
                  type="button"
                  onClick={() => deleteReply(reply.id)}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {fieldLabel(
                "Tên hiển thị",
                <input
                  value={reply.name}
                  onChange={(event) =>
                    updateReply(reply.id, {
                      name: event.target.value,
                    })
                  }
                />,
              )}

              {fieldLabel(
                "Tên tài khoản",
                <input
                  value={reply.username}
                  onChange={(event) =>
                    updateReply(reply.id, {
                      username: event.target.value,
                    })
                  }
                />,
              )}

              {fieldLabel(
                "Nội dung phản hồi",
                <textarea
                  rows={3}
                  value={reply.text}
                  onChange={(event) =>
                    updateReply(reply.id, {
                      text: event.target.value,
                    })
                  }
                />,
              )}

              <div className="two-fields">
                {fieldLabel(
                  "Thời gian",
                  <input
                    value={reply.time}
                    onChange={(event) =>
                      updateReply(reply.id, {
                        time: event.target.value,
                      })
                    }
                  />,
                )}

                {fieldLabel(
                  "Lượt thích",
                  <input
                    value={reply.likes}
                    onChange={(event) =>
                      updateReply(reply.id, {
                        likes: event.target.value,
                      })
                    }
                  />,
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="secondary-button" onClick={addReply} type="button">
          <Plus size={16} />
          Thêm phản hồi
        </button>
      </section>
    </>
  );
}
