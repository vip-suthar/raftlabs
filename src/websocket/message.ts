class Message {
    
    private user: string = "";
    private time: Date = new Date();
    private chatMessage: string = "";
    private type: string = "";

    static BOT: string = "BOT";

    constructor(username: string, chatMessage: string, type: string = Message.BOT) {
        this.user = username;
        this.time = new Date(Date.now());
        this.chatMessage = chatMessage;
        this.type = type;
    }
}

export default Message;