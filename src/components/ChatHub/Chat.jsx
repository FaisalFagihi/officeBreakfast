import SendMessageForm from './SendMessageForm';
import MessageContainer from './MessageContainer';

export default function Chat({ sendMessage, messages }) {
    return (
        <>
            <MessageContainer messages={messages} />
            <SendMessageForm sendMessage={sendMessage} />
        </>
    )
}
