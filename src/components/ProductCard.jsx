import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

const { addToCart } = useCart();
const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

const [liked,setLiked] = useState(isInWishlist(product.id));

const toggleWishlist=(e)=>{
e.stopPropagation();
e.preventDefault();

if(liked){
removeFromWishlist(product.id);
}else{
addToWishlist(product);
}

setLiked(!liked);
};

const handleCart=(e)=>{
e.stopPropagation();
e.preventDefault();
addToCart(product);
};

return(

<div className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden group">

<Link to={`/product/${product.id}`}>

<div className="relative h-52 overflow-hidden">

<img
src={product.images?.[0] || `https://source.unsplash.com/400x400/?product`}
className="w-full h-full object-cover group-hover:scale-105 transition"
/>

<button
onClick={toggleWishlist}
className={`absolute top-2 right-2 p-2 rounded-full
${liked ? "bg-red-500 text-white":"bg-white"}`}
>
<Heart size={16}/>
</button>

</div>

</Link>

<div className="p-4">

<h3 className="text-sm font-semibold mb-2">
{product.name}
</h3>

<p className="text-yellow-500 text-sm mb-1">
⭐ {product.rating}
</p>

<div className="flex items-center justify-between">

<p className="font-bold">
₹{product.price}
</p>

<button
onClick={handleCart}
className="p-2 bg-gray-100 rounded hover:bg-green-600 hover:text-white"
>
<ShoppingCart size={16}/>
</button>

</div>

</div>

</div>

);
}