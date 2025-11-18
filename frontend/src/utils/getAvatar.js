/**
 * Get avatar URL with fallback to default avatar
 * @param {string} profilePic - User's profile picture URL
 * @param {string} fullName - User's full name (for generating initials avatar)
 * @returns {string} Avatar URL
 */
export const getAvatar = (profilePic, fullName = "") => {
	// If profilePic exists and is not empty, use it
	if (profilePic && profilePic.trim() !== "") {
		return profilePic;
	}

	// Generate a default avatar using UI Avatars service with initials
	if (fullName) {
		const initials = fullName
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
		return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&color=fff&size=128&bold=true`;
	}

	// Ultimate fallback - generic avatar
	return "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=128&bold=true";
};

