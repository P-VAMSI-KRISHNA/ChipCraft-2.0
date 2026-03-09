import { io } from "socket.io-client";

// Local development backend URL
export const socket = io("http://localhost:3001");
