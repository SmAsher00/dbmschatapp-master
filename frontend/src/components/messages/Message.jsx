import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { getAvatar } from "../../utils/getAvatar";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	
	// Get profile pic with fallback
	const profilePicRaw = fromMe ? authUser?.profilePic : selectedConversation?.profilePic;
	const fullName = fromMe ? authUser?.fullName : selectedConversation?.fullName;
	const profilePic = getAvatar(profilePicRaw, fullName);
	
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	const shakeClass = message.shouldShake ? "shake" : "";
	const messageBody = message.text ?? message.message ?? "";

	const handleImageError = (e) => {
		// Fallback to default avatar if image fails to load
		e.target.src = getAvatar("", fullName);
	};

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img 
						alt={`${fullName || "User"} avatar`} 
						src={profilePic}
						onError={handleImageError}
					/>
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{messageBody}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};
export default Message;
