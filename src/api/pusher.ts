import Echo from "laravel-echo";
import Pusher from 'pusher-js';
import api from "../api/api";

declare global {
  interface Window {
    Pusher: Pusher;
    Echo: Echo;
  }
}

window.Pusher = Pusher;

export function createSocketConnection(token: string) {
  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      wsHost: import.meta.env.VITE_PUSHER_HOST,
      wsPort: 6001,
      wssPort: 6001,
      disableStats: true,
      enabledTransports: ['ws'],
      cluster: 'mt1',
      forcedTLS: false,
      authorizer: (channel: any) => {
        return {
            authorize: (socketId: string, callback: (result: boolean, payload: string) => void) => {
                api.post('/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                }, {
                    headers: {
                      Authorization: token,
                  }
                })
                .then(response => {
                    callback(false, response.data);
                })
                .catch(error => {
                    callback(true, error);
                });
            }
        };
    },
    });
  }
}