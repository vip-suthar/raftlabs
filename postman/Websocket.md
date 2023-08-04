# Websocket

## URL

```http://localhost:8000```

**Client version:** V3

**Handshake path:** /socket.io

## Events

### joinRoom

Someone Joined Room

> **Joining a room**

    {
        "username": "USERNAME",
        "room": "ROOM"
    }

### chatMessage

Chat Message appeared in room

> **Sending Chat Message**

    {
        "message": "MESSAGE"
    }

### roomUsers

list of users in room

### disconnect

user disconnected from room
