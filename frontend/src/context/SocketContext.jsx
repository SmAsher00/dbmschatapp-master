import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import { getSocketUrl } from "../utils/api";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		const socketBaseUrl = getSocketUrl();
		if (authUser) {
			const socketInstance = io(socketBaseUrl, {
				withCredentials: true,
				query: {
					userId: authUser._id,
				},
			});

			setSocket(socketInstance);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socketInstance.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => socketInstance.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
