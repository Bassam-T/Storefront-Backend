import client from "../../dbClient";
import { user,userRe,UserCRType } from "../types/user_type";
import {hash,compareToHash} from "../functions/hash";
import generateToken from "../functions/token";

export class userModel{
    table = 'users';
    async getAll():Promise<userRe[]>{
        try{
            const sql = `SELECT * FROM ${this.table}`;
            const conn = await client.connect();
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }catch(err){
            throw new Error(`can not get ${this.table}: ${err}`);
        }
    }

    async getById(id:number):Promise<userRe>{
        try{
            const sql = `SELECT * FROM ${this.table} WHERE id = $1`;
            const conn = await client.connect();
            const res = await conn.query(sql,[id]);
            conn.release();
            return res.rows[0];
        }catch(err){
            throw new Error(`can not get ${this.table} ${id} : ${err}`);
        }
    }

    async create(userI:user):Promise<UserCRType>{
        try{
            const { firstname, lastname, password } = userI;
            const sql = `INSERT INTO ${this.table} (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *`;
            const conn = await client.connect();
            const res = await conn.query(sql,[
                firstname,
                lastname,
                hash(password)
            ]);

            conn.release();
            
            const id: number = res.rows[0].id;
            const token: string = generateToken(id);
            return {auth:true,token};
        }catch(err){
            throw new Error(`can not create ${this.table}: ${err}`);
        }
    }

    async delete(id:number):Promise<userRe>{
        try{
            const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
            const conn = await client.connect();
            const res = await conn.query(sql,[id]);
            conn.release();
            return res.rows[0];
        }catch(err){
            throw new Error(`can not delete ${this.table} : ${err}`);
        }
    }

    async authuntication(user_id:number,password:string):Promise<userRe|null>{
        try{
            const sql = `SELECT password FROM ${this.table} WHERE id = $1`;
            const conn = await client.connect();
            const res = await conn.query(sql,[user_id]);
            if(res.rows.length){ // is user exist?
                if(compareToHash(password,res.rows[0].password)){
                    conn.release();
                    return this.getById(user_id);
                }
            }
            conn.release();
            return null;
        }catch(err){
            throw new Error(`can not authunticate: ${err}`);
        }
    }
}