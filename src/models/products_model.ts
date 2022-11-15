import client from "../../dbClient";
import { product,productRe } from "../types/product_type";


export class productModel{
    table = 'products';
    async getAll():Promise<productRe[]>{
        try{
            const sql = `SELECT * FROM ${this.table}`;
            const conn = await client.connect();
            const res = await conn.query(sql);
            conn.release();
            console.log(res.rows);
            return res.rows;
        }catch(err){
            throw new Error(`can not get ${this.table}: ${err}`);
        }
    }

    async getById(id:number):Promise<productRe>{
        try{
            const sql = `SELECT * FROM ${this.table} WHERE id = $1`;
            const conn = await client.connect();
            const res = await conn.query(sql,[id]);
            conn.release();
            console.log(res.rows);
            return res.rows[0];
        }catch(err){
            throw new Error(`can not get ${this.table} ${id} : ${err}`);
        }
    }

    async create(productI:product):Promise<productRe>{
        try{
            const { name, price, category } = productI;
            const sql = `INSERT INTO ${this.table} (name, price, category) VALUES($1, $2, $3) RETURNING *`;
            const conn = await client.connect();
            const res = await conn.query(sql,[
                name,
                price,
                category
            ]);

            conn.release();
            return res.rows[0];
        }catch(err){
            throw new Error(`can not create ${this.table}: ${err}`);
        }
    }

    async delete(id:number):Promise<productRe>{
        try{
            const sql = `DELETE FROM ${this.table} WHERE id=$1 RETURNING *`;
            const conn = await client.connect();
            const res = await conn.query(sql,[id]);
            conn.release();
            console.log(res.rows);
            return res.rows[0];
        }catch(err){
            throw new Error(`can not delete ${this.table} : ${err}`);
        }
    }
}