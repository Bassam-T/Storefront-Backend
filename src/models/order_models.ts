import client from "../../dbClient";
import { orderRe } from "../types/order_type";
import { create_order,create_orderRe } from "../types/create_order_type";
import { order_product,order_productRe } from "../types/order_product_type";

export class orderModel{
    table = 'orders';
    async updateStatus(order_id:number,status:string):Promise<orderRe>{
        try{
            const sql = `UPDATE ${this.table} SET status=$1 WHERE id=$2 RETURNING *`;
            const conn = await client.connect();
            const res = await conn.query(sql,[
                status,
                order_id
            ]);
            conn.release();
            return res.rows[0];
        }catch(err){
            throw new Error(`can not get ${this.table}: ${err}`);
        }
    }

    async getAll():Promise<orderRe[]>{
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

    async getByUserId(user_id:number):Promise<orderRe[]>{
        try{
            const sql = `SELECT * FROM ${this.table} WHERE user_id=$1`;
            const conn = await client.connect();
            const res = await conn.query(sql,[user_id]);
            conn.release();
            return res.rows;
        }catch(err){
            throw new Error(`can not get ${this.table} bu user ${user_id} : ${err}`);
        }
    }

    async getCompleteByUserId(user_id:number):Promise<orderRe[]>{
        try{
            const sql = `SELECT * FROM ${this.table} WHERE status='complete' AND user_id=$1`;
            const conn = await client.connect();
            const res = await conn.query(sql,[user_id]);
            conn.release();
            return res.rows;
        }catch(err){
            throw new Error(`can not get ${this.table} bu user ${user_id} : ${err}`);
        }
    }

    async create(orderI:create_order):Promise<create_orderRe>{
        try{
            const { products_ids, quantities, user_id, status } = orderI;

            let sql =`INSERT INTO ${this.table} (user_id,status) VALUES($1, $2) RETURNING *`;
            
            const conn = await client.connect();
            let res = await conn.query(sql,[
                user_id,
                status
            ]);

            const order_id = res.rows[0].id;
            for (let i=0;i<products_ids.length;i++) {
                sql = `INSERT INTO orders_products (product_id, order_id, quantity) VALUES($1, $2, $3)`;
                res = await conn.query(sql,[
                    products_ids[i],
                    order_id,
                    quantities[i]
                ]);
            }
            conn.release();

            return {
                user_id,
                order_id,
                status,
                products_ids,
                quantities,
            };
        }catch(err){
            throw new Error(`can not create ${this.table}: ${err}`);
        }
    }
    async addProduct(anOrder:order_product):Promise<order_productRe>{
        try{
            const {order_id,product_id,quantity} = anOrder;
            const sql = `INSERT INTO orders_products(order_id,product_id,quantity) VALUES($1, $2, $3)RETURNING *`;
            const conn = await client.connect();
            const res = await conn.query(sql,[
                order_id,
                product_id,
                quantity
            ]);
            conn.release();
            const id = res.rows[0].id;
            return {
                id,
                product_id,
                order_id,
                quantity
            };
        }catch(err){
            throw new Error(`can not addProduct ${this.table} : ${err}`);
        }
    }

    async delete(id:number):Promise<orderRe>{
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
}