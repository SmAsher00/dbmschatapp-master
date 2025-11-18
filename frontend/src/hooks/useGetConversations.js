import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { buildApiUrl } from "../utils/api";

const useGetConversations = () => {
	const [loading, setLoading] = useState(true);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch(buildApiUrl("/api/message/users"), {
					credentials: "include",
				});
				
				const data = await res.json().catch(() => null);
				if (!res.ok) {
					throw new Error(data?.message || data?.error || `Failed to load users: ${res.status}`);
				}
				
				// Ensure data is an array
				if (Array.isArray(data)) {
					setConversations(data);
				} else {
					console.error("Expected array but got:", data);
					setConversations([]);
					toast.error("Invalid data format received");
				}
			} catch (error) {
				console.error("Error fetching conversations:", error);
				toast.error(error.message);
				setConversations([]);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;
