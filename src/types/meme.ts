export type MemeType = "chat" | "notification" | "post" | "image" | "threads";

export interface ChatMessage {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

export interface MemeDraft {
  type: MemeType;
  title: string;
  background: string;
  accent: string;

  chatName: string;
  chatFriend: string;
  messages: ChatMessage[];

  notificationApp: string;
  notificationTitle: string;
  notificationBody: string;

  postName: string;
  postHandle: string;

  postContentType: "text" | "image";
  postImageUrl: string;

  postText: string;
  likes: string;
  comments: string;

  imageUrl: string;
  imageTopText: string;
  imageBottomText: string;

  threadsPost: ThreadsPost;
  threadsReplies: ThreadsReply[];
}

export interface ThreadsReply {
  id: string;
  name: string;
  username: string;
  text: string;
  time: string;
  likes: string;
}

export interface ThreadsPost {
  name: string;
  username: string;
  text: string;
  time: string;
  likes: string;
}

export interface ThreadsDraft {
  threadsPost: ThreadsPost;
  threadsReplies: ThreadsReply[];
}
