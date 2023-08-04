type SocketUser = {
    id: string,
    username: string,
    room: string
}

const online_users: Array<SocketUser> = [];

export function addUser(id: string, username: string, room: string) {
    const user = { id, username, room };
    online_users.push(user);
}

export function getCurrentUser(id: string) {
    return online_users.find((user) => user.id === id);
}

export function removeUser(id: string) {
    const index = online_users.findIndex((user) => user.id === id);

    if (index != -1) {
        online_users.splice(index, 1);
    }
}

export function getRoomUsers(room: string) {
    return online_users.filter((user) => user.room === room);
}