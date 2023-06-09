import { Stack, Avatar, Tooltip, Whisper } from "rsuite";
import Username from "../User/Username";

export default function ConnectedUsers({ users }) {
        console.log("sssa",users)
    return <Stack wrap spacing={1}>
        {/* {users.map((u, idx) => <div key={idx}>{u}</div>)} */}
        {users.map((user, id) => (
            <Username avatarOnly={true} key={id} username={user.username} firstName={user.firstName} lastName={user.lastName}  />
        ))}
    </Stack>
} 