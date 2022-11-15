/* eslint-disable no-undef */
import { product, productRe } from '../../types/product_type';
import { productModel } from '../../models/products_model';

const product = new productModel();
const id = 4;

describe('Product Model', () => {
  it('should have a create  method', () => {
    expect(product.create).toBeDefined();
  });

  it('should have a getById method', () => {
    expect(product.getById).toBeDefined();
  });

  it('should have a getAll method', () => {
    expect(product.getAll).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(product.delete).toBeDefined();
  });


  it('should create a product using create method', async () => {
    const result: productRe = await product.create({
      name: 'iPhone',
      price: '2000',
      category: 'phone'
    });
    expect(result).toEqual({
      id: id,
      name: 'iPhone',
      price: '2000',
      category: 'phone'
    });
  });
  it('should return a list of products using getAll', async () => {
    const result: productRe[] = await product.getAll();
    expect(result).toEqual([
      {
        id: id,
        name: 'iPhone',
        price: '2000',
        category: 'phone'
      }
    ]);
  });

  it('should return the correct product using getProductById', async () => {
    const result: productRe = await product.getById(id);
    expect(result).toEqual({
      id: id,
      name: 'iPhone',
      price: '2000',
      category: 'phone'
    });
  });
  
  it('should delete the correct product using delete', async () => {
    const result: productRe = await product.delete(id);
    expect(result).toEqual({
      id: id,
      name: 'iPhone',
      price: '2000',
      category: 'phone'
    });
  });
});