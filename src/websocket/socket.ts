import { Server } from "socket.io";

import {
    addUser,
    getCurrentUser,
    removeUser,
    getRoomUsers,
} from "./users";
import { SOCKET_EVENTS } from "./constants";
import Message from "./message";

const configureSocket = (io: Server) => {

    io.on("connection", (socket) => {

        const {
            CHAT_MESSAGE,
            JOIN_ROOM,
            ROOM_USERS,
            DISCONNECT,
        } = SOCKET_EVENTS;

        // joining room
        socket.on(JOIN_ROOM, ({ username, room }) => {
            socket.join(room);

            // add user to users list
            addUser(socket.id, username, room);

            // sent to single client connected client
            socket.emit(
                CHAT_MESSAGE,
                new Message(
                    "CHAT_BOT",
                    `Welcome to ${room}, ${username}!`,
                    Message.BOT
                )
            );

            // Broasdcast to all user except client when a user is joined
            socket.broadcast
                .to(room)
                .emit(
                    CHAT_MESSAGE,
                    new Message(
                        "CHAT_BOT",
                        `${username} has joined the room`,
                        Message.BOT
                    )
                );

            // send room users info
            io.to(room).emit(ROOM_USERS, {
                room: room,
                users: getRoomUsers(room),
            });
        });

        socket.on(CHAT_MESSAGE, (message: Message) => {
            var cur_user = getCurrentUser(socket.id);
            if (cur_user) {
                const { room } = cur_user;

                // emit this message to everyone
                io.to(room).emit(CHAT_MESSAGE, message);
            }
        });

        // Broadcast
        socket.on(DISCONNECT, () => {
            var cur_user = getCurrentUser(socket.id);

            if (cur_user) {
                const { id, username, room } = cur_user;
                // sent to all
                io.to(room).emit(
                    CHAT_MESSAGE,
                    // formatMessage(CHAT_BOT, `${username} has left the room`)
                    new Message(
                        "CHAT_BOT",
                        `${username} has left the room`,
                        Message.BOT
                    )
                );
                // remove user from list of current online users
                removeUser(id);

                // send room users info
                io.to(room).emit(ROOM_USERS, {
                    room: room,
                    users: getRoomUsers(room),
                });
            }
        });
    });
};

export default configureSocket;