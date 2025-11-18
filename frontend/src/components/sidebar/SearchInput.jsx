import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations, loading } = useGetConversations();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!search || !search.trim()) return;
		
		// Check if conversations are still loading
		if (loading) {
			return toast.error("Please wait, users are still loading...");
		}

		// Check if conversations array is empty
		if (!conversations || conversations.length === 0) {
			return toast.error("No users available to search");
		}

		const searchTerm = search.toLowerCase().trim();
		
		// Smart search with relevance scoring
		// Scores: higher = better match
		const scoredMatches = conversations
			.map((c) => {
				const fullName = (c.fullName || "").toLowerCase();
				const email = (c.email || "").toLowerCase();
				let score = 0;
				let matched = false;

				// Check fullName matches
				if (fullName === searchTerm) {
					// Exact match - highest priority
					score = 1000;
					matched = true;
				} else if (fullName.startsWith(searchTerm)) {
					// Starts with search term - high priority
					score = 500;
					matched = true;
				} else {
					// Check if any word in the name starts with search term
					const words = fullName.split(/\s+/);
					const wordMatch = words.find((word) => word.startsWith(searchTerm));
					if (wordMatch) {
						// Word starts with search term - medium-high priority
						score = 300;
						matched = true;
					} else if (fullName.includes(searchTerm)) {
						// Contains search term anywhere - lower priority
						score = 100;
						matched = true;
					}
				}

				// Check email matches (lower priority than name)
				if (!matched) {
					if (email === searchTerm) {
						score = 400;
						matched = true;
					} else if (email.startsWith(searchTerm)) {
						score = 200;
						matched = true;
					} else if (email.includes(searchTerm)) {
						score = 50;
						matched = true;
					}
				} else {
					// If name matched, boost score if email also matches
					if (email.includes(searchTerm)) {
						score += 10;
					}
				}

				// Bonus: shorter names get slight boost for very short searches
				if (matched && searchTerm.length <= 2) {
					score += Math.max(0, 20 - fullName.length);
				}

				return { conversation: c, score, matched };
			})
			.filter((item) => item.matched)
			.sort((a, b) => b.score - a.score); // Sort by score descending

		if (scoredMatches.length > 0) {
			const bestMatch = scoredMatches[0].conversation;
			setSelectedConversation(bestMatch);
			setSearch("");
			toast.success(`Found: ${bestMatch.fullName || bestMatch.email}`);
		} else {
			toast.error("No user found matching your search!");
		}
	};
	
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input
				type='text'
				placeholder='Search by name or email…'
				className='input input-bordered rounded-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				disabled={loading}
			/>
			<button 
				type='submit' 
				className='btn btn-circle bg-sky-500 text-white'
				disabled={loading || !search.trim()}
			>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;

// STARTER CODE SNIPPET
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
// 	return (
// 		<form className='flex items-center gap-2'>
// 			<input type='text' placeholder='Search…' className='input input-bordered rounded-full' />
// 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
// 				<IoSearchSharp className='w-6 h-6 outline-none' />
// 			</button>
// 		</form>
// 	);
// };
// export default SearchInput;
