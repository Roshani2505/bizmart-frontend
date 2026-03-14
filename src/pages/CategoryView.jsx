import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "../data/categoriesData";
import ProductCard from "../components/ProductCard";

export default function CategoryView(){

const { slug } = useParams();
const navigate = useNavigate();

const category = categories.find(c => c.slug === slug);

if(!category){
return(
<div className="pt-40 text-center text-3xl font-bold">
Category not found
</div>
);
}

return(

<div className="pt-24 flex max-w-[1400px] mx-auto">

<div className="w-64 border-r fixed left-0 top-24 h-[calc(100vh-100px)] overflow-y-auto bg-[#fff7f4]">

{categories.map(cat=>(

<div
key={cat.slug}
onClick={()=>navigate(`/category/${cat.slug}`)}
className={`cursor-pointer text-center py-6 border-b ${
cat.slug===slug ? "bg-[#c97979] text-white":""}`}
>

<img
src={cat.image}
className="w-14 h-14 mx-auto mb-2 object-cover rounded"
/>

<p className="text-sm font-semibold">
{cat.name}
</p>

</div>

))}

</div>

<div className="ml-64 flex-1 px-10 pb-20">

<h1 className="text-5xl font-bold mb-16 text-center">
{category.name}
</h1>

</div>

</div>

);
}