import { EnvironmentType, Prediction } from ".";
import { getHosts } from "./config";

// Conditionally import the 'ws' package only in a Node.js environment
let WebSocketImplementation: any;
if (typeof window === 'undefined') {
  // Node.js environment
  WebSocketImplementation = require('ws');
} else {
  // Browser environment
  WebSocketImplementation = WebSocket;
}

export async function createSocket({
  accessToken,
  wsRoot,
  environment = "prod",
  version = "v1",
  host,
	onMessage,
}: {
  accessToken: string;
  wsRoot?: string;
  environment?: EnvironmentType;
  version?: string;
  host?: string;
	onMessage: (data: Prediction) => void;
}) {
	if (!wsRoot) {
    const result = getHosts({
      environment,
      version,
      host,
    });
    wsRoot = result.wsRoot;
  }
  const websocket = new WebSocketImplementation(wsRoot) as WebSocket;

  websocket.onopen = () => {
    // Order is important
    websocket.send(JSON.stringify({ type: "auth", token: accessToken }));
    // websocket.send(JSON.stringify({ type: 'auth', api_key: "" }));
    websocket.send(JSON.stringify({ type: "subscribe", topic: "predictions" }));
  };

  websocket.onmessage = (event) => {
    try {
      const decoded = JSON.parse(event.data);
      if (decoded.type === "message" && decoded.topic === "predictions") {
        onMessage(decoded.data);
      } else if (decoded.type === "auth") {
        // ignore
        // console.log(decoded);
      }
    } catch (e) {
      console.error("Error parsing message", e);
    }
  };

  websocket.onerror = (event) => {
    console.error("WebSocket error:", event);
  };

  websocket.onclose = (event) => {
    console.log("WebSocket connection closed:", event);
  };
}
