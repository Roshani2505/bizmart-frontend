import React, { useState } from "react";

export default function AddProduct() {

const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [image, setImage] = useState("");

const handleAdd = () => {

const newProduct = {
id: Date.now(),
name,
price: Number(price),
images: [image]
};

const existing =
JSON.parse(localStorage.getItem("vendorProducts")) || [];

localStorage.setItem(
"vendorProducts",
JSON.stringify([...existing, newProduct])
);

alert("Product Added");

setName("");
setPrice("");
setImage("");

};

return (

<div className="max-w-4xl mx-auto pt-28 px-6">

<h1 className="text-3xl font-bold mb-6 text-[#2d2d2d]">
Add Product
</h1>

<div className="space-y-4 bg-[#fff7f4] border border-[#ead7cf] p-6 rounded-xl">

<input
placeholder="Product Name"
value={name}
onChange={e => setName(e.target.value)}
className="w-full border border-[#ead7cf] bg-[#fdf6f2] px-4 py-3 rounded-lg"
/>

<input
placeholder="Price"
value={price}
onChange={e => setPrice(e.target.value)}
className="w-full border border-[#ead7cf] bg-[#fdf6f2] px-4 py-3 rounded-lg"
/>

<input
placeholder="Image URL"
value={image}
onChange={e => setImage(e.target.value)}
className="w-full border border-[#ead7cf] bg-[#fdf6f2] px-4 py-3 rounded-lg"
/>

<button
onClick={handleAdd}
className="bg-[#d98b8b] hover:bg-[#c97979] text-white px-6 py-3 rounded-lg transition"
>
Add Product
</button>

</div>

</div>

);
}