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

/* PRODUCT DATABASE */

const productDatabase = {

Mobiles:[
{ name:"iPhone 15", price:79999, image:"https://images.unsplash.com/photo-1695048133142-1a20484d2569" },
{ name:"Samsung Galaxy S23", price:74999, image:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf" },
{ name:"Google Pixel 8", price:75999, image:"https://images.unsplash.com/photo-1695476520923-52a4da41d079" },
{ name:"OnePlus 12", price:64999, image:"https://images.unsplash.com/photo-1598327105666-5b89351aff97" }
],

Laptops:[
{ name:"MacBook Air M2", price:119999, image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8" },
{ name:"Dell XPS 13", price:109999, image:"https://images.unsplash.com/photo-1519389950473-47ba0277781c" },
{ name:"HP Spectre x360", price:99999, image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853" }
],

Topwear:[
{ name:"Cotton Casual Shirt", price:1299, image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab" },
{ name:"Streetwear Graphic Tee", price:899, image:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c" },
{ name:"Minimal Hoodie", price:1799, image:"https://images.unsplash.com/photo-1520975922215-230c3b3d7d3a" }
],

Bottomwear:[
{ name:"Slim Fit Jeans", price:1999, image:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a" },
{ name:"Casual Chinos", price:1799, image:"https://images.unsplash.com/photo-1542272604-787c3835535d" },
{ name:"Jogger Pants", price:1499, image:"https://images.unsplash.com/photo-1514996937319-344454492b37" }
],

Watches:[
{ name:"Rolex Submariner", price:450000, image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
{ name:"Apple Watch Series 9", price:39999, image:"https://images.unsplash.com/photo-1510017803434-a899398421b3" },
{ name:"Casio G Shock", price:7999, image:"https://images.unsplash.com/photo-1518546305927-5a555bb7020d" }
]

};


/* GET PRODUCTS */

const getProducts = (subcategory) => {

const items = productDatabase[subcategory];

if(items){
return items.map((item,i)=>({
id:`${subcategory}-${i}`,
name:item.name,
price:item.price,
rating:(Math.random()*2+3).toFixed(1),
images:[item.image]
}));
}

/* fallback demo products */

return Array.from({length:5}).map((_,i)=>({

id:`demo-${i}`,

name:`Premium ${subcategory}`,

price:Math.floor(Math.random()*2000)+500,

rating:(Math.random()*2+3).toFixed(1),

images:[`https://picsum.photos/400/400?random=${subcategory+i}`]

}));

};


/* UI */

return(

<div className="pt-24 flex max-w-[1400px] mx-auto">

{/* SIDEBAR */}

<div className="w-64 border-r fixed left-0 top-24 h-[calc(100vh-100px)] overflow-y-auto bg-white">

{categories.map(cat=>(

<div
key={cat.slug}
onClick={()=>navigate(`/category/${cat.slug}`)}
className={`cursor-pointer text-center py-6 border-b
${cat.slug===slug ? "bg-green-600 text-white":""}`}
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


{/* MAIN */}

<div className="ml-64 flex-1 px-10 pb-20">

<h1 className="text-5xl font-bold mb-16 text-center">
{category.name}
</h1>

{category.sections.map((section,index)=>(

<div key={index} className="mb-20">

<h2 className="text-3xl font-semibold mb-6">
{section.name}
</h2>

<hr className="mb-10"/>

{section.sub.map((subcategory,i)=>{

const products = getProducts(subcategory);

return(

<div key={i} className="mb-16">

<h3 className="text-2xl font-semibold mb-6">
{subcategory}
</h3>

<div className="flex gap-6 overflow-x-auto pb-4">

{products.map(product=>(

<div key={product.id} className="min-w-[220px]">
<ProductCard product={product}/>
</div>

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