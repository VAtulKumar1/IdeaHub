import dotenv from 'dotenv'

dotenv.config();

interface properties{
    mongo_uri:string,
    port:string,
    tokenKey:string,
    refereshTokenKey:string,
    refreshTokenExpiresIn:string
}

const getConfig = ()=>{
    const properties:properties = {
        mongo_uri:process.env.MONGO_URI as string,
        port:process.env.PORT as string,
        tokenKey:process.env.TOKEN_SECRET_KEY as string,
        refereshTokenKey:process.env.REFERESH_TOKEN_SECRET_KEY as string,
        refreshTokenExpiresIn:process.env.REFERESH_TOKEN_EXPIRES_IN as string

    }
    return properties;
}

const configurations = getConfig();

export default configurations;

