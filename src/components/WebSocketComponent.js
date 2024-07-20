import { useEffect } from 'react';

const WebSocketComponent = () => {
  useEffect(() => {
    const socket = new WebSocket(`${process.env.REACT_APP_WS_URL}`);

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      console.log('Message from server ', event.data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket connection closed: ', event);
    };

    // Cleanup function to close the WebSocket connection
    return () => {
      if (socket.readyState === WebSocket.OPEN) { // WebSocket.OPEN equals 1
        socket.close();
        console.log('WebSocket connection closed due to component unmount');
      }
    };
  }, []);

  return null 
};

export default WebSocketComponent;
