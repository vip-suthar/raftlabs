type ServerConfig = {
    PORT: number
}

const configObj: ServerConfig = {
    PORT: parseInt(process.env.SERVER_PORT || "") || 8000
}

export default configObj;