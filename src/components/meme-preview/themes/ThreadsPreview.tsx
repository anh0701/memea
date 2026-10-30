import {
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  MoreHorizontal,
} from "lucide-react";

import type { MemeDraft } from "../../../types/meme";

interface Props {
  draft: MemeDraft;
}

export default function ThreadsPreview({ draft }: Props) {
  const post = draft.threadsPost;

  return (
    <section className="threads-meme">
      <header className="threads-header">
        <strong>threads</strong>
        <MoreHorizontal size={20} />
      </header>
      {draft.showMainPost && (
        <div className="threads-post">
          <div className="threads-avatar">
            {post.name.charAt(0).toUpperCase()}
          </div>

          <div className="threads-content">
            <div className="threads-user">
              <strong>{post.username}</strong>
              <span>{post.time}</span>
              <MoreHorizontal size={16} />
            </div>

            <div className="threads-name">{post.name}</div>

            <p className="threads-text">{post.text}</p>

            <div className="threads-actions">
              <span>
                <Heart size={17} /> {post.likes}
              </span>
              <span>
                <MessageCircle size={17} /> {draft.threadsReplies.length}
              </span>
              <span>
                <Repeat2 size={17} />
              </span>
              <span>
                <Send size={17} />
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        className={`threads-replies ${
          draft.showMainPost ? "" : "threads-replies--standalone"
        }`}
      >
        {draft.threadsReplies.map((reply) => (
          <div className="threads-reply" key={reply.id}>
            <div className="threads-avatar">
              {reply.name.charAt(0).toUpperCase()}
            </div>

            <div className="threads-content">
              <div className="threads-user">
                <strong>{reply.username}</strong>
                <span>{reply.time}</span>
                <MoreHorizontal size={16} />
              </div>

              <div className="threads-name">{reply.name}</div>

              <p className="threads-text">{reply.text}</p>

              <div className="threads-actions">
                <span>
                  <Heart size={17} /> {reply.likes}
                </span>
                <span>
                  <MessageCircle size={17} />
                </span>
                <span>
                  <Repeat2 size={17} />
                </span>
                <span>
                  <Send size={17} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
