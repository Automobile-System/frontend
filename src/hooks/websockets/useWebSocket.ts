'use client';
import { useEffect, useRef, useState } from 'react';

export function useWebSocket<T = any>(url: string) {
  const socketRef = useRef<WebSocket | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => setConnected(true);
    socket.onmessage = (event) => setData(JSON.parse(event.data));
    socket.onclose = () => setConnected(false);
    socket.onerror = (err) => console.error("WebSocket Error:", err);

    return () => socket.close();
  }, [url]);

  return { data, connected };
}
