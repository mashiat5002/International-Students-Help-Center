import {jwtVerify, SignJWT} from 'jose';
const key="secret";
const secret_key= new TextEncoder().encode(key);
export const encrypt= (payload:{Email:string,expires:Date,full_name:string})=>{
    return new SignJWT(payload)
    .setProtectedHeader({alg:"HS256"})
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret_key);

}


export async function decrypt(input:string){
    const  {payload} = await jwtVerify(input, secret_key, {
        algorithms:['HS256']
    })

    return payload;
}