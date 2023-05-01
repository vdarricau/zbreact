import Friend from "./Friend";
import Zbra from "./Zbra";

export default interface Message {
    id: string;
    message: string;
    sender: Friend;
    zbra?: Zbra;
    createdAt: string;
}
