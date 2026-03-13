import React, { useState, useEffect } from "react";

export default function ManageProducts() {

const [products, setProducts] = useState([]);

useEffect(() => {

const stored =
  JSON.parse(localStorage.getItem("vendorProducts")) || [];

setProducts(stored);

}, []);

const deleteProduct = id => {

const updated = products.filter(p => p.id !== id);

setProducts(updated);

localStorage.setItem(
  "vendorProducts",
  JSON.stringify(updated)
);

};

return (

<div className="max-w-6xl mx-auto pt-28 px-6">

  <h1 className="text-3xl font-bold mb-6">
    Manage Products
  </h1>

  <div className="space-y-6">

    {products.map(product => (

      <div
        key={product.id}
        className="flex items-center justify-between border p-4 rounded-lg"
      >

        <div className="flex items-center gap-4">

          <img
            src={product.images[0]}
            className="w-16 h-16 object-cover rounded"
          />

          <div>
            <h3 className="font-semibold">
              {product.name}
            </h3>
            <p>₹{product.price}</p>
          </div>

        </div>

        <button
          onClick={() => deleteProduct(product.id)}
          className="text-red-500"
        >
          Delete
        </button>

      </div>

    ))}

  </div>

</div>

);
}