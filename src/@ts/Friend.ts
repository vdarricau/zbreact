export default interface Friend {
    id: string;
    username: string;
    name: string;
    conversationId?: string;
    avatar: string | null;
}
