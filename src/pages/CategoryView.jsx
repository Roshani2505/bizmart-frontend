import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categories } from "../data/categoriesData";
import { PRODUCTS } from "../data/productData";
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

/* GET ALL SUBCATEGORIES */
const subcategories = category.sections.flatMap(section => section.sub);

/* FILTER PRODUCTS */
const categoryProducts = PRODUCTS.filter(p =>
subcategories.includes(p.category)
);

return(

<div className="pt-24 flex max-w-[1400px] mx-auto">

{/* LEFT SIDEBAR */}

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

{/* MAIN AREA */}

<div className="ml-64 flex-1 px-10 pb-20">

<h1 className="text-5xl font-bold mb-16 text-center">
{category.name}
</h1>

{/* SECTIONS */}

{category.sections.map(section => (

<div key={section.name} className="mb-14">

<h2 className="text-2xl font-bold mb-6">
{section.name}
</h2>

{section.sub.map(sub => {

const subProducts = PRODUCTS.filter(p => p.category === sub);

if(subProducts.length === 0) return null;

return(

<div key={sub} className="mb-10">

<h3 className="text-lg font-semibold mb-4 text-[#c97979]">
{sub}
</h3>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{subProducts.map(product => (
<ProductCard key={product.id} product={product}/>
))}

</div>

</div>

);

})}

</div>

))}

</div>

</div>

);
}