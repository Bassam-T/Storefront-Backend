export type user = {
    firstname: string;
    lastname: string;
    password: string;
}

export type userRe = {
    id:number,
    firstname: string;
    lastname: string;
    password: string;
}

export type UserCRType = {
    auth: boolean;
    token: string;
}