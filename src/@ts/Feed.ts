import Friend from "./Friend";
import Zbra from "./Zbra";

export default interface Feed {
    id: string;
    friend: Friend;
    zbra: Zbra;
    updatedAt: string;
}