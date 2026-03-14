
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import PromoSection from "../components/PromoSection";
import ProductCollections from "../components/ProductCollection";
import DealsOfDay from "../components/DealsOfDay";
import Testimonials from "../components/Testimonials";

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
images:["https://th.bing.com/th/id/OIP.1wB7ee9NjhSbYj4EOWllXgHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"]
},

{
id:2,
name:"Pink Casual Top",
description:"Lightweight stylish top designed for everyday comfort.",
price:899,
rating:4.6,
category:"latest",
images:["https://i5.walmartimages.com/seo/Blmnix-Casual-Tops-for-Women-2024-3-4-Sleeve-Pink-Button-Crew-Neck-Puff-Sleeve-Solid-T-Shirts-Fashion-Blouses_3d93c9e9-e800-4228-9430-dea4907cc35e.f7f5a64d618d32d21963066aab225c91.jpeg"]
},

{
id:3,
name:"Minimal Grey T-Shirt",
description:"Minimal streetwear t-shirt made with breathable cotton.",
price:599,
rating:3.9,
category:"latest",
images:["https://tse1.mm.bing.net/th/id/OIP.tOpZ56ELMWSt8vaqFYYu6AHaHE?w=513&h=490&rs=1&pid=ImgDetMain&o=7&rm=3"]
},

{
id:4,
name:"Noise Pro 5 Smart Watch",
description:"Fitness smartwatch with heart rate and activity tracking.",
price:2499,
rating:4.8,
category:"latest",
images:["https://m.media-amazon.com/images/I/61VOsDscc2L._SL1500_.jpg"]
},

{
id:5,
name:"Accent Chairs For Living Room",
description:"Minimal aesthetic chair ideal for living rooms.",
price:3499,
rating:4.3,
category:"latest",
images:["https://m.media-amazon.com/images/I/817iXMQ7kpL._AC_SL1500_.jpg"]
},

{
id:6,
name:"JBL T450 Wireless Bluettoth",
description:"Noise cancelling headphones with immersive audio.",
price:1999,
rating:4.7,
category:"latest",
images:["https://i5.walmartimages.com/asr/43b4d325-d149-432d-8af2-a0d4adf6e5e1_1.7d4b30a4a0bc8a4e656e55e2abccc219.png"]
},

{
id:7,
name:"Women's Cherry Red Heels",
description:"Elegant floral heels perfect for parties and events.",
price:2899,
rating:3.7,
category:"latest",
images:["https://tse1.mm.bing.net/th/id/OIP.JDfO68ZvZnitzaqTeUVCdAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"]
},

{
id:8,
name:"Motorola 70 edge smartphone 5g",
description:"High performance smartphone with AMOLED display.",
price:15999,
rating:4.9,
category:"latest",
images:["https://www.mobiledokan.com/media/motorola-edge-70-pantone-blue-official-image.webp"]
},

/* ---------- BEST SELLERS ---------- */

{
id:9,
name:"Stanley Quencher Tumbler",
description:"Insulated tumbler trending across social media.",
price:2499,
rating:4.9,
category:"best",
images:["https://ik.imagekit.io/2xkwa8s1i/img/npl_raw_images/Tumbler+Revised+Images_01/WBTLSS12SHPK/WBTLSS12SHPK_LS_1.jpg?tr=w-640"]
},

{
id:10,
name:"Mighty Patch Pimple Patches",
description:"Fast acting acne patches loved by skincare users.",
price:599,
rating:4.4,
category:"best",
images:["https://static.chemistwarehouse.com.au/ams/media/pi/131246/ADD10_800.jpg"]
},

{
id:11,
name:"Oversized Hoodie",
description:"Comfortable oversized hoodie trending in streetwear.",
price:1499,
rating:4.5,
category:"best",
images:["https://i5.walmartimages.com/seo/Womens-Oversized-Hoodies-Fleece-Sweatshirts-Long-Sleeve-Sweaters-Pullover-Fall-Outfits-with-Pocket_f7e46bfd-ffd7-4468-92d4-77505d811915.f8c37ec4a3a4c124107ac2eb5ddebaa2.jpeg"]
},

{
id:12,
name:"Dot & Key Pomegrante Moisturizer SPF 30",
description:"Natural moisturizer trending in skincare routines.",
price:999,
rating:4.0,
category:"best",
images:["https://media6.ppl-media.com/tr:h-750,w-750,c-at_max,dpr-2/static/img/product/343127/dot-and-key-pomegranate-miracle-vitamin-e-revitalizing-moisturizer-spf-30-60-ml_8_display_1682340993_7db6e50a.jpg"]
},

{
id:13,
name:"Electric Mountain Bike",
description:"Eco-friendly electric bicycle for commuting.",
price:45000,
rating:4.7,
category:"best",
images:[""]
},

{
id:14,
name:"Wireless Charging Desk Mat",
description:"Desk mat with integrated wireless charging.",
price:1899,
rating:4.1,
category:"best",
images:["https://tse3.mm.bing.net/th/id/OIP.S4OdsDEpiW12brHYr52CGwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"]
},

{
id:15,
name:"Digital Air Fryer",
description:"Healthy cooking appliance for oil-free frying.",
price:5999,
rating:4.6,
category:"best",
images:["https://m.media-amazon.com/images/I/710pkJyfVsL._AC_.jpg"]
},

{
id:16,
name:"Wrist Band For Gym",
description:"Muscle recovery and protection band used in gym.",
price:3499,
rating:4.3,
category:"best",
images:["https://m.media-amazon.com/images/I/81CAN11UvLL._AC_.jpg"]
},

/* ---------- FEATURED PRODUCTS ---------- */

{
id:17,
name:"Minimalist Glycolic Acid",
description:"8% exfoliating liquid for glowing skin.",
price:699,
rating:4.5,
category:"featured",
images:["https://cdn.fcglcdn.com/brainbees/images/products/583x720/18253777a.webp"]
},

{
id:18,
name:"8X Shampoo",
description:"Anti hair fall shampoo for stronger hair.",
price:299,
rating:3.9,
category:"featured",
images:["https://images.apollo247.in/pub/media/catalog/product/8/x/8xs0004_1-march24_1_.jpg?tr=q-80"]
},

{
id:19,
name:"MARS Makeup Kit",
description:"Professional makeup kit with multiple shades.",
price:1299,
rating:4.2,
category:"featured",
images:["https://rukminim2.flixcart.com/image/850/1000/kyeqjrk0/makeup-kit/b/4/u/9-eyeshadow-highlighter-blusher-and-bronzer-all-i-need-makeup-original-imagan5wf7gghpsp.jpeg?q=90&crop=false"]
},

{
id:20,
name:"wellcore monohydrate creatine",
description:"High-quality creatine supplement designed to enhance strength.",
price:1999,
rating:4.7,
category:"featured",
images:["https://m.media-amazon.com/images/I/61-DwDZHAfL._SL1500_.jpg"]
},

{
id:21,
name:"FixDerma Underarm Roll-On",
description:"Long lasting anti-perspirant roll-on.",
price:399,
rating:4.1,
category:"featured",
images:["https://cdn.fcglcdn.com/brainbees/images/products/583x720/20449796a.webp"]
},

{
id:22,
name:"Travel Adapter",
description:"Universal travel adapter for international use.",
price:699,
rating:4.0,
category:"featured",
images:["https://twomonkeystravelgroup.com/wp-content/uploads/2019/12/10-Travel-Adapter-that-will-make-Your-Life-Easier-5.jpg"]
},

{
id:23,
name:"Hand Gripper",
description:"Grip strength trainer for workouts.",
price:499,
rating:3.8,
category:"featured",
images:["https://m.media-amazon.com/images/I/71GeNRhsL2L._SL1500_.jpg"]
},

{
id:24,
name:"DermaTouch Hyaluronic Sunscreen SPF50",
description:"Lightweight sunscreen protecting from UV damage.",
price:799,
rating:4.4,
category:"featured",
images:["https://cdn.fcglcdn.com/brainbees/images/products/583x720/22070422a.webp"]
}

];

return (

<div className="pt-20 pb-24">

{/* HERO */}

<section
className="relative w-full h-[600px] flex items-center justify-center text-center bg-cover bg-center"
style={{ backgroundImage: "url('/hero-bg.jpeg')" }}
>

<div className="absolute inset-0 bg-black/65"></div>

<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="relative z-10 max-w-3xl px-6"
>

<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm mb-6 text-white">
🛍 Best Online Collection Store
</div>

<h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
Elevate Your Style With
<span className="block text-[#f0b3b3]">
Bold Fashion
</span>
</h1>

<p className="mt-6 text-gray-200 max-w-xl mx-auto">
Discover curated collections and trending products in BizMart marketplace.
</p>

<div className="flex gap-4 mt-8 justify-center">

<Link
to="/products"
className="flex items-center gap-2 bg-[#d98b8b] text-white px-6 py-3 rounded-full hover:bg-[#c97979]"
>
Shop Now <ArrowRight size={18}/>
</Link>

<Link
to="/signup?role=vendor"
className="border border-white px-6 py-3 rounded-full text-white hover:bg-white hover:text-black transition"
>
Become a Vendor
</Link>

</div>

</motion.div>

</section>


{/* PROMO */}

<div className="mt-20">
<PromoSection/>
</div>


{/* PRODUCT COLLECTION */}

<div className="mt-24">
<ProductCollections products={products}/>
</div>


{/* DEALS */}

<div className="mt-24">
<DealsOfDay/>
</div>


{/* TESTIMONIALS */}

<div className="mt-24">
<Testimonials/>
</div>

</div>

);
}