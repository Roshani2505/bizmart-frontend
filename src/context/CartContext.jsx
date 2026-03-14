import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

const [items, setItems] = useState([]);

const isLoggedIn = () => {
const user = localStorage.getItem("user");
return !!user;
};

useEffect(() => {

if (!isLoggedIn()) {
setItems([]);
return;
}

const saved = localStorage.getItem("cart");

if (saved) {
setItems(JSON.parse(saved));
}

}, []);

useEffect(() => {

if (isLoggedIn()) {
localStorage.setItem("cart", JSON.stringify(items));
}

}, [items]);

const addToCart = (product, quantity = 1) => {

if (!isLoggedIn()) {
alert("Please login first to add items to cart");
window.location.href = "/login";
return;
}

setItems(prev => {

const existing = prev.find(i => i.productId === product.id);

if (existing) {

return prev.map(i =>
i.productId === product.id
? { ...i, quantity: i.quantity + quantity }
: i
);

}

return [
...prev,
{
productId: product.id,
quantity,
product
}
];

});

};

const removeFromCart = (productId) => {
setItems(prev => prev.filter(i => i.productId !== productId));
};

const updateQuantity = (productId, quantity) => {

if (quantity < 1) return;

setItems(prev =>
prev.map(i =>
i.productId === productId
? { ...i, quantity }
: i
)
);

};

const clearCart = () => {
setItems([]);
localStorage.removeItem("cart");
};

const totalItems = items.reduce(
(sum, item) => sum + item.quantity,
0
);

const totalPrice = items.reduce(
(sum, item) => sum + item.product.price * item.quantity,
0
);

return (
<CartContext.Provider
value={{
items,
addToCart,
removeFromCart,
updateQuantity,
clearCart,
totalItems,
totalPrice
}}
>
{children}
</CartContext.Provider>
);

}

export function useCart() {
return useContext(CartContext);
}