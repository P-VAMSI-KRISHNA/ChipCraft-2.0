import { io } from "socket.io-client";
import { API_BASE } from "@/lib/api";

export const socket = io(API_BASE);
