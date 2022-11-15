export type create_order = {
    user_id: number;
    status:string;
    products_ids: number[];
    quantities: number[];
}

export type create_orderRe = {
    user_id: number;
    order_id:number;
    status:string;
    products_ids: number[];
    quantities: number[];
}