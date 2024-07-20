import { useEffect, useRef, useCallback } from 'react';

const WebSocketComponent = () => {
    const socketRef = useRef(null);

    const connectWebSocket = useCallback(() => {
        socketRef.current = new WebSocket('wss://backend-webstore.onrender.com/ws');

        socketRef.current.onopen = () => {
            console.log('WebSocket connection established');
        };

        socketRef.current.onmessage = (event) => {
            console.log('Message from server ', event.data);
        };

        socketRef.current.onerror = (error) => {
            console.error('WebSocket error: ', error);
        };

        socketRef.current.onclose = (event) => {
            console.log('WebSocket connection closed: ', event);
            // Retry connection logic
            if (!event.wasClean) {
                console.log('Connection closed unexpectedly. Retrying...');
                setTimeout(() => {
                    // Recursively try to reconnect
                    connectWebSocket();
                }, 1000); // retry after 1 second
            }
        };
    }, []); // Empty dependency array ensures this is created once

    useEffect(() => {
        connectWebSocket();

        // Clean up on component unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [connectWebSocket]); // Add connectWebSocket to the dependency array

    return null; // No need to render anything
};

export default WebSocketComponent;
