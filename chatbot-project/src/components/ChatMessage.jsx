import dayjs from 'dayjs';
import './ChatMessage.css'
import UserProfileImage from '../assets/profile-1.jpg'
import RobotProfileImage from '../assets/robot.png'

function ChatMessage({ message, sender, time }) {
    console.log(UserProfileImage);

    return (
        <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
            {sender === 'robot' && (
                <img src={RobotProfileImage} alt="" className="chat-message-profile" />
            )}
            <div className="chat-message-container">
                <p className="chat-message-text">{message}</p>
                {time && <p className="chat-message-time">{dayjs(time).format('HH:mm')}</p>}
            </div>
            
            {sender === 'user' && (
                <img src={UserProfileImage} alt="" className="chat-message-profile" />
            )}
        </div>
    );
}

export default ChatMessage