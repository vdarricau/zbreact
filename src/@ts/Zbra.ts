import Friend from "./Friend";

export default interface Zbra {
    id: string;
    message: string;
    sender: Friend;
    receiver: Friend;
    createdAt: string;
}