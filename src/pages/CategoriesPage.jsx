import React from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categoriesData";

export default function CategoriesPage(){

const navigate = useNavigate();

return(

<div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">

<div className="text-center mb-14">

<h1 className="text-4xl font-bold mb-4">
Browse Categories
</h1>

<p className="text-gray-500 max-w-xl mx-auto">
Delivering <span className="text-green-600 font-semibold">
20+ trusted product categories
</span>. Explore now and discover everything.
</p>

</div>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-12">

{categories.map(cat=>(

<button
key={cat.slug}
onClick={()=>navigate(`/category/${cat.slug}`)}
className="group bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center transition duration-300 hover:shadow-xl hover:scale-105"
>

<div className="flex justify-center mb-4">

<img
src={cat.image}
className="w-36 h-36 object-cover rounded-lg group-hover:scale-110 transition"
/>

</div>

<p className="text-base font-semibold">
{cat.name}
</p>

</button>

))}

</div>

</div>

);
}