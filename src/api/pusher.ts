import Echo from "laravel-echo";
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Pusher: Pusher;
    Echo: Echo;
  }
}

window.Pusher = Pusher;

export function createSocketConnection(token: string) {
  console.log('blablou');

  if (!window.Echo) {
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      wsHost: import.meta.env.VITE_PUSHER_HOST,
      wsPort: 6001,
      disableStats: true,
      cluster: 'mt1',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    });
  }
}