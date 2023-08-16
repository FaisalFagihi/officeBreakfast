import { Form, Button, Input, InputGroup } from 'rsuite';
import { useState } from 'react';

export default function SendMessageForm ({ sendMessage }) {
    const [message, setMessage] = useState("");

    return <Form
        onSubmit={e => {
            sendMessage(message);
            setMessage('');
        }}>
        <InputGroup>
            <Input placeholder="message..."
                onChange={e => setMessage(e)} value={message} />
                <Button type="submit" disabled={!message}>Send</Button>
        </InputGroup>
    </Form>
}