import Friend from "./Friend";

export default interface Message {
    id: string;
    message: string;
    sender: Friend;
    receiver: Friend;
    createdAt: string;
}