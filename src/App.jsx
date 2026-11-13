
import React, { useState } from "react";
import "./App.css";

function App() {
  const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Keyboard", price: 1000 }
  ];

  const [cart, setCart] = useState([]);

  // Add product
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Change quantity
  const changeQuantity = (id, amount) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + amount }
        : item
    ).filter(item => item.quantity > 0));
  };

  // Remove product
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calculate total
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  return (
    <div className="container">
      <h1>Shopping Cart</h1>

      <h2>Products</h2>

      {products.map(product => (
        <div className="product" key={product.id}>
          <span>{product.name} - ₹{product.price}</span>
          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>
      ))}

      <h2>My Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map(item => (
          <div className="cart-item" key={item.id}>
            <span>
              {item.name} - ₹{item.price}
            </span>

            <div>
              <button onClick={() => changeQuantity(item.id, -1)}>
                -
              </button>

              <span className="quantity">{item.quantity}</span>

              <button onClick={() => changeQuantity(item.id, 1)}>
                +
              </button>

              <button onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <div className="total">
        <h3>Subtotal: ₹{subtotal.toFixed(2)}</h3>
        <h3>GST (18%): ₹{gst.toFixed(2)}</h3>
        <h2>Grand Total: ₹{grandTotal.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default App;
