import bcrypt from 'bcrypt';

export function hash(password:string):string{
    const pepper: string = process.env.BCRYPT_PASSWORD as string;
    const salt:number = parseInt(process.env.SALT_ROUNDS as string);
    return bcrypt.hashSync(
        `${password}${pepper}`,
        salt
    );
}


export function compareToHash(password:string,hashPassword:string):boolean{
    const pepper: string = process.env.BCRYPT_PASSWORD as string;
    const salt:number = parseInt(process.env.SALT_ROUNDS as string);
    return bcrypt.compareSync(
        `${password}${pepper}`,
        hashPassword
    );
}