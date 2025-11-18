import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(true);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("/api/message/users", {
					credentials: "include",
				});
				
				if (!res.ok) {
					const errorData = await res.json().catch(() => ({}));
					throw new Error(errorData?.message || errorData?.error || `Failed to load users: ${res.status}`);
				}
				
				const data = await res.json();
				
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
