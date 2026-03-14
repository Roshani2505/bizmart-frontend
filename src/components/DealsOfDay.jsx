import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DealsOfDay() {

const deals = [

{
id:1,
name:"Smooth Foundation",
price:20,
oldPrice:40,
discount:"50%",
rating:5,
category:"Makeup",
image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348"
},

{
id:2,
name:"Smooth Body Cream",
price:30,
oldPrice:60,
discount:"50%",
rating:5,
category:"Body Care",
image:"https://images.unsplash.com/photo-1601049676869-702ea24cfd58"
}

];

/* TIMER */

const targetTime = new Date();
targetTime.setHours(targetTime.getHours() + 24);

const [timeLeft,setTimeLeft] = useState(getRemaining());

function getRemaining(){

const total = targetTime - new Date();

const seconds = Math.floor((total/1000)%60);
const minutes = Math.floor((total/1000/60)%60);
const hours = Math.floor((total/(1000*60*60))%24);

return {hours,minutes,seconds};

}

useEffect(()=>{

const timer = setInterval(()=>{

setTimeLeft(getRemaining());

},1000);

return ()=>clearInterval(timer);

},[]);

return (

<section className="max-w-7xl mx-auto px-4 py-0">

<div className="bg-[#fff1f1] border border-[#f3d3d3] rounded-2xl p-10">

<p className="text-center text-[#9c8b84]">
Today's Offers
</p>

<h2 className="text-center text-4xl font-bold mt-2">
Deals of the <span className="text-[#c97979]">Day</span>
</h2>

{/* TIMER */}

<div className="flex justify-center gap-8 mt-6 text-center">

<div>
<p className="text-2xl font-bold">{timeLeft.hours}</p>
<span className="text-xs text-gray-500">Hours</span>
</div>

<div>
<p className="text-2xl font-bold">{timeLeft.minutes}</p>
<span className="text-xs text-gray-500">Minutes</span>
</div>

<div>
<p className="text-2xl font-bold">{timeLeft.seconds}</p>
<span className="text-xs text-gray-500">Seconds</span>
</div>

</div>

{/* DEAL CARDS */}

<div className="grid md:grid-cols-2 gap-10 mt-12">

{deals.map((deal)=>(

<div
key={deal.id}
className="bg-white rounded-xl p-6 flex gap-6 items-center shadow-sm border border-[#ead7cf]"
>

<div className="relative w-[120px] h-[120px] rounded-lg overflow-hidden">

<span className="absolute top-2 left-2 bg-[#c97979] text-white text-xs px-2 py-1 rounded">
{deal.discount} OFF
</span>

<img
src={deal.image}
alt={deal.name}
className="w-full h-full object-cover"
/>

</div>

<div className="flex-1">

<p className="text-sm text-[#9c8b84]">
{deal.category}
</p>

<h3 className="font-semibold text-lg">
{deal.name}
</h3>

<p className="text-sm text-gray-500 mt-1">
⭐ {deal.rating}
</p>

<div className="flex gap-2 items-center mt-2">

<span className="text-lg font-bold">
${deal.price}
</span>

<span className="text-gray-400 line-through text-sm">
${deal.oldPrice}
</span>

</div>

<Link
to="/products"
className="inline-block mt-3 text-[#c97979] font-medium hover:underline"
>
Shop Now →
</Link>

</div>

</div>

))}

</div>

</div>

</section>

);

}