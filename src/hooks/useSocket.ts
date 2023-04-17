import { useEffect } from 'react';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import Friend from '../@ts/Friend';
import User from '../@ts/User';
import { createSocketConnection } from '../api/pusher';

function listen(callBack: (payload: any) => void, channel: string, event: string) {
  window.Echo.private(channel).listen(event, (payload: any) => {
    callBack(payload);
  });
  
  return function cleanUp() {
    window.Echo.leaveChannel(`private-${channel}`);
  };
}

const listenEvent = (channel: string, event: string, callBack: (payload: any) => void) => {
  const authHeader = useAuthHeader();
  
  useEffect(() => {
    createSocketConnection(authHeader());
    
    return listen(callBack, channel, event);
  });
};

export default function useSocket() {
  const user = useAuthUser()() as User|null;

  const listenZbraConversation = (friendId: string, callBack: (payload: any) => void) => {
    listenEvent(`zbras/${friendId}/${user?.id}`, 'ZbraSentEvent', callBack);
  }
  
  return {
    listenZbraConversation,
  };
}

