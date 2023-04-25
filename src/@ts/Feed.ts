import Friend from "./Friend";
import Message from "./Message";

export default interface Feed {
    id: string;
    friend: Friend;
    message: Message | null;
    countUnreadMessages: number;
    updatedAt: string;
}
