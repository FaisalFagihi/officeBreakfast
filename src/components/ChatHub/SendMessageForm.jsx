import { Form, Button, Input, InputGroup } from 'rsuite';
import { useState } from 'react';

export default function SendMessageForm ({ sendMessage }) {
    const [message, setMessage] = useState("");

    return <Form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
        <InputGroup>
            <Input placeholder="message..."
                onChange={e => setMessage(e.target.value)} value={message} />
                <Button type="submit" disabled={!message}>Send</Button>
        </InputGroup>
    </Form>
}