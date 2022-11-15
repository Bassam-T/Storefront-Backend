CREATE TABLE orders_products(
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    order_id INTEGER,
    quantity INTEGER DEFAULT 1,

    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE ON UPDATE CASCADE 
);