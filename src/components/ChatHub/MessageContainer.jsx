import { useEffect, useRef } from 'react';

export default function MessageContainer({ messages }) {
    const messageRef = useRef();

    useEffect(() => {
        if (messageRef && messageRef.current) {
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({ left: 0, top: scrollHeight - clientHeight, behavior: 'smooth' });
        }
    }, [messages]);

    return <div ref={messageRef} className="ChatBox">
        {messages.map((m, index) =>
            <div key={index} style={{ width: "100%", display: "inline-block" }}>
                <div className={'Message' + m.type}>
                    <div hidden={m.type === "Alter" || m.type === "Sender"} className="MessageUser">{m.user}</div>
                    <div className="MessageContent">
                        <div className='Message'>{m.message}</div>
                        <div className="MessageTime">{m.time}</div>
                    </div>
                </div>
            </div>
        )}
    </div>
}