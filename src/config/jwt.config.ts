type JwtConfig = {
    SECRET: string,
    DEFAULT_TOKEN_LIFE: number
}

const configObj: JwtConfig = {
    SECRET: process.env.JWT_SECRET || "MyJWTSecret",
    DEFAULT_TOKEN_LIFE: 24 * 60 * 60 // 24 Hours
}

export default configObj;