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

<h1 className="text-3xl font-bold mb-6 text-[#2d2d2d]">
Manage Products
</h1>

<div className="space-y-6">

{products.map(product => (

<div
key={product.id}
className="flex items-center justify-between bg-[#fff7f4] border border-[#ead7cf] p-4 rounded-xl"
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
<p className="text-[#7a6a64]">
₹{product.price}
</p>
</div>

</div>

<button
onClick={() => deleteProduct(product.id)}
className="text-[#c97979] font-semibold"
>
Delete
</button>

</div>

))}

</div>

</div>

);
}