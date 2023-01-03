import React from "react";

interface IMessage {
  _id?: string;
  senderId?: string;
  senderName?: string;
  recieverId?: string;
  recieverName?: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface IConversation {
  _id: string;
  messages: IMessage[];
  recipients: string[];
  book: {
    bookId: string;
    bookName: string;
    borrowed: boolean;
  };
  createdAt: string;
  updatedAt: string;
  readAt: string;
}

interface IStartConv {
  senderId: string;
  senderName: string;
  recieverId: string;
  recieverName: string;
  message: string;
  bookId: string;
  bookName: string;
}

export interface MessageState {
  conversations: IConversation[];
  chat: IConversation;
  newMessage: IMessage;
  selectedConversation: boolean;
  isMessageSent: boolean;
  chatEnd: React.MutableRefObject<null | HTMLDivElement>;
  openConversation: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  scrollToBottom: () => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void | undefined;
}
