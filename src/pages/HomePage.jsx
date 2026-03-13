import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import PromoSection from "../components/PromoSection";
import ProductCollections from "../components/ProductCollection";

export default function HomePage() {

const products = [

/* ---------- LATEST PRODUCTS ---------- */

{
id:1,
name:"Classic Straw Hat",
description:"Premium summer straw hat perfect for casual outings.",
price:499,
rating:4.1,
category:"latest",
images:[""]
},

{
id:2,
name:"Pink Casual Top",
description:"Lightweight stylish top designed for everyday comfort.",
price:899,
rating:4.6,
category:"latest",
images:[""]
},

{
id:3,
name:"Minimal Grey T-Shirt",
description:"Minimal streetwear t-shirt made with breathable cotton.",
price:599,
rating:3.9,
category:"latest",
images:[""]
},

{
id:4,
name:"Smart Watch Series",
description:"Fitness smartwatch with heart rate and activity tracking.",
price:2499,
rating:4.8,
category:"latest",
images:[""]
},

{
id:5,
name:"Modern Pink Chair",
description:"Minimal aesthetic chair ideal for living rooms.",
price:3499,
rating:4.3,
category:"latest",
images:[""]
},

{
id:6,
name:"Wireless Headphones",
description:"Noise cancelling headphones with immersive audio.",
price:1999,
rating:4.7,
category:"latest",
images:[""]
},

{
id:7,
name:"Floral Designer Heels",
description:"Elegant floral heels perfect for parties and events.",
price:2899,
rating:3.7,
category:"latest",
images:[""]
},

{
id:8,
name:"Smartphone X",
description:"High performance smartphone with AMOLED display.",
price:15999,
rating:4.9,
category:"latest",
images:[""]
},

/* ---------- BEST SELLERS ---------- */

{
id:9,
name:"Stanley Quencher Tumbler",
description:"Insulated tumbler trending across social media.",
price:2499,
rating:4.9,
category:"best"
},

{
id:10,
name:"Mighty Patch Pimple Patches",
description:"Fast acting acne patches loved by skincare users.",
price:599,
rating:4.4,
category:"best"
},

{
id:11,
name:"Oversized Hoodie",
description:"Comfortable oversized hoodie trending in streetwear.",
price:1499,
rating:4.5,
category:"best"
},

{
id:12,
name:"Beef Tallow Moisturizer",
description:"Natural moisturizer trending in skincare routines.",
price:999,
rating:4.0,
category:"best"
},

{
id:13,
name:"Electric Mountain Bike",
description:"Eco-friendly electric bicycle for commuting.",
price:45000,
rating:4.7,
category:"best"
},

{
id:14,
name:"Wireless Charging Desk Mat",
description:"Desk mat with integrated wireless charging.",
price:1899,
rating:4.1,
category:"best"
},

{
id:15,
name:"Digital Air Fryer",
description:"Healthy cooking appliance for oil-free frying.",
price:5999,
rating:4.6,
category:"best"
},

{
id:16,
name:"Massage Gun",
description:"Muscle recovery massage gun used by athletes.",
price:3499,
rating:4.3,
category:"best"
},

/* ---------- FEATURED PRODUCTS ---------- */

{
id:17,
name:"Minimalist Glycolic Acid",
description:"8% exfoliating liquid for glowing skin.",
price:699,
rating:4.5,
category:"featured"
},

{
id:18,
name:"8X Shampoo",
description:"Anti hair fall shampoo for stronger hair.",
price:299,
rating:3.9,
category:"featured"
},

{
id:19,
name:"MARS Makeup Kit",
description:"Professional makeup kit with multiple shades.",
price:1299,
rating:4.2,
category:"featured"
},

{
id:20,
name:"Vegan Protein Powder",
description:"Plant-based protein powder for muscle recovery.",
price:1999,
rating:4.7,
category:"featured"
},

{
id:21,
name:"Underarm Roll-On",
description:"Long lasting anti-perspirant roll-on.",
price:399,
rating:4.1,
category:"featured"
},

{
id:22,
name:"Travel Adapter",
description:"Universal travel adapter for international use.",
price:699,
rating:4.0,
category:"featured"
},

{
id:23,
name:"Hand Gripper",
description:"Grip strength trainer for workouts.",
price:499,
rating:3.8,
category:"featured"
},

{
id:24,
name:"Hyaluronic Sunscreen SPF50",
description:"Hydrating sunscreen protecting from UV damage.",
price:799,
rating:4.4,
category:"featured"
}

];

return (
<div className="space-y-16 pb-12 pt-20">

<section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}
>

<div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm mb-6">
🛍 Best Online Collection Store
</div>

<h1 className="text-4xl lg:text-6xl font-bold leading-tight">
Explore Trending Products
<span className="text-green-600"> From Independent Vendors</span>
</h1>

<p className="mt-6 text-gray-600 max-w-lg">
Discover curated collections and trending products in BizMart marketplace.
</p>

<div className="flex gap-4 mt-8">

<Link
to="/products"
className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full"
>
Shop Now <ArrowRight size={18}/>
</Link>

<Link
to="/signup?role=vendor"
className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100"
>
Become a Vendor
</Link>

</div>

</motion.div>

<div className="flex justify-center">
<img src="/rocket-shop.jpeg" className="w-[380px] md:w-[450px]" />
</div>

</section>

<PromoSection/>

<ProductCollections products={products}/>

</div>
);
}