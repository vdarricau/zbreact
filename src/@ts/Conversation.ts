import Friend from "./Friend";
import Message from "./Message";

export default interface Conversation {
    id: string;
    friend: Friend;
    messages: Message[];
    countUnreadMessages: number;
    updatedAt: string;
}
