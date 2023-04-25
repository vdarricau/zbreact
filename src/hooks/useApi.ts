import { useAuthHeader } from "react-auth-kit";
import Friend from "../@ts/Friend";
import FriendRequest from "../@ts/FriendRequest";
import api from "../api/api";

export default function useApi() {
    const authHeader = useAuthHeader();

    const loginApi = (email: string, password: string) => {
        return api.post("/login", {
            email: email,
            password: password,
        });
    };

    const registerApi = (
        email: string,
        password: string,
        name: string,
        username: string
    ) => {
        return api.post("/register", {
            email,
            password,
            name,
            username,
        });
    };

    const getFriendsApi = (search: string | null = null) => {
        let query = "?";

        if (search) {
            query += `search=${search}&`;
        }

        return api.get(`/friends${query}`, {
            headers: {
                Authorization: authHeader(),
            },
        });
    };

    const getFriendRequestsApi = () => {
        return api.get("/friend-requests", {
            headers: {
                Authorization: authHeader(),
            },
        });
    };

    const acceptFriendRequestApi = (friendRequest: FriendRequest) => {
        return api.post(
            `/friend-requests/${friendRequest.id}/accept`,
            {},
            {
                headers: {
                    Authorization: authHeader(),
                },
            }
        );
    };

    const cancelFriendRequestApi = (friendRequest: FriendRequest) => {
        return api.post(
            `/friend-requests/${friendRequest.id}/cancel`,
            {},
            {
                headers: {
                    Authorization: authHeader(),
                },
            }
        );
    };

    const sendMessageApi = (friendId: string, message: string) => {
        return api.post(
            "/messages",
            { friendId, message },
            {
                headers: {
                    Authorization: authHeader(),
                },
            }
        );
    };

    const getFeedsApi = () => {
        return api.get("/feeds", {
            headers: {
                Authorization: authHeader(),
            },
        });
    };

    const getFriendApi = (friendId: string) => {
        return api.get(`/friends/${friendId}`, {
            headers: {
                Authorization: authHeader(),
            },
        });
    };

    const getExchangedMessagesApi = (friendId: string) => {
        return api.get(`/friends/${friendId}/messages`, {
            headers: {
                Authorization: authHeader(),
            },
        });
    };

    const findUsersApi = (search: string) => {
        return api.get(`/users?search=${search}`, {
            headers: {
                Authorization: authHeader(),
            },
        });
    };

    const sendFriendRequestApi = (friend: Friend) => {
        return api.post(
            `users/${friend.id}/friend-requests`,
            {},
            {
                headers: {
                    Authorization: authHeader(),
                },
            }
        );
    };

    const getFriendRequestsNotificationsApi = () => {
        return api.get("/notifications/friend-requests", {
            headers: {
                Authorization: authHeader(),
            },
        });
    };

    return {
        loginApi,
        registerApi,
        findUsersApi,
        getFriendApi,
        getFriendsApi,
        sendFriendRequestApi,
        getFriendRequestsApi,
        acceptFriendRequestApi,
        cancelFriendRequestApi,
        sendMessageApi,
        getFeedsApi,
        getExchangedMessagesApi,
        getFriendRequestsNotificationsApi,
    };
}
