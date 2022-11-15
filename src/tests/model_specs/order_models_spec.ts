import { userModel } from '../../models/user_model';
import { productModel } from '../../models/products_model';
import { orderRe } from "../../types/order_type";
import { orderModel } from "../../models/order_models";
import { create_orderRe } from '../../types/create_order_type';
import { order_productRe } from '../../types/order_product_type';

const ord = new orderModel();
const USER = new userModel();
const product = new productModel();
const orderId = 2;
const userId = 3;
const productId = 3;

describe('Order Model', () => {
    beforeAll(async () => {
        await USER.create({
            firstname: 'Bassam',
            lastname: 'Allam',
            password: 'IhaveToGo3384#'
        });
        await product.create({
            name: 'iPhone',
            price: '2000',
            category: 'phone'
        });
    });

    afterAll(async () => {
        await USER.delete(userId);
        await product.delete(productId);
    });
    it('should have a getAll method', () => {
        expect(ord.getAll).toBeDefined();
    });
    it('should have a getById method', () => {
        expect(ord.getByUserId).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(ord.delete).toBeDefined();
    });
    it('should have a create method', () => {
        expect(ord.create).toBeDefined();
    });

    it('should have a getCompleteByUserId method', () => {
        expect(ord.getCompleteByUserId).toBeDefined();
    });

    it('should have a updateStatus method', () => {
        expect(ord.updateStatus).toBeDefined();
    });

    it('should have a addProduct method', () => {
            expect(ord.addProduct).toBeDefined();
    });
    
    it('should create order using create method', async () => {
        const result: create_orderRe = await ord.create({
            user_id: userId,
            status:'active',
            products_ids: [productId],
            quantities: [5]
        });
        expect(result).toEqual({
            user_id: userId,
            order_id: orderId,
            status: 'active',
            products_ids: [productId],
            quantities: [5]
        });
    });

    it('should add product to order using addProudct method', async () => {
        const result: order_productRe = await ord.addProduct({
            order_id: orderId,
            product_id:productId,
            quantity:2
        });
        expect(result).toEqual({
            id:4,
            order_id: orderId,
            product_id:productId,
            quantity:2
        });
    });

    it('should return all orders of user using getAll method', async () => {
        const result: orderRe[] = await ord.getAll();
        expect(result).toEqual([
            {
                id: orderId,
                user_id: userId,
                status:'active'
            }
        ]);
    });

    it('should get the correct orders', async () => {
        const result: orderRe[] = await ord.getByUserId(userId);
        expect(result).toEqual([{
            id: orderId,
            user_id: userId,
            status:'active'
        }]);
    });

    it('should update the order status', async () => {
        const result: orderRe = await ord.updateStatus(orderId,'complete');
        expect(result).toEqual({
            id: orderId,
            user_id: userId,
            status:'complete'
        });
    });

    it('should get the correct complete orders', async () => {
        const result: orderRe[] = await ord.getCompleteByUserId(userId);
        expect(result).toEqual([{
            id: orderId,
            user_id: userId,
            status:'complete'
        }]);
    });

    it('should delete the correct order', async () => {
        const result: orderRe = await ord.delete(orderId);
        expect(result).toEqual({
            id: orderId,
            user_id: userId,
            status:'complete'
        });
    });
});