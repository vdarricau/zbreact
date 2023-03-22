import Friend from "./Friend";

export default interface FriendRequest {
    id: string;
    requester: Friend;
}