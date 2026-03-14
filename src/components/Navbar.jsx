import React,{useState,useRef,useEffect} from "react";
import {Link,useNavigate} from "react-router-dom";
import {Search,Heart,ShoppingCart,User} from "lucide-react";
import {useCart} from "../context/CartContext";

export default function Navbar(){

const [showSearch,setShowSearch]=useState(false);
const [query,setQuery]=useState("");
const [showMenu,setShowMenu]=useState(false);

const navigate=useNavigate();
const {totalItems}=useCart();

const user=JSON.parse(localStorage.getItem("user"));
const menuRef=useRef();

const handleSearch=()=>{
if(!query.trim()) return;

navigate(`/products?search=${query}`);
setShowSearch(false);
setQuery("");
};

const handleCartClick=()=>{
if(!user){
alert("Please login first");
navigate("/login");
return;
}
navigate("/cart");
};

const handleLogout=()=>{
localStorage.removeItem("user");
localStorage.removeItem("cart");
navigate("/");
window.location.reload();
};

useEffect(()=>{

const handleClick=e=>{
if(menuRef.current && !menuRef.current.contains(e.target)){
setShowMenu(false);
}
};

document.addEventListener("mousedown",handleClick);
return()=>document.removeEventListener("mousedown",handleClick);

},[]);

return(

<header className="fixed top-0 left-0 w-full z-50 bg-[#fff7f4] border-b border-[#ead7cf]">

<div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

<Link to="/" className="flex items-center gap-3">
<img src="/bizmart.jpeg" className="w-10 h-10"/>
<span className="font-semibold text-lg">BizMart</span>
</Link>

<nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">

<Link to="/" className="hover:text-[#c97979]">
Home
</Link>

<Link to="/products" className="hover:text-[#c97979]">
Shop
</Link>

<Link to="/categories" className="hover:text-[#c97979]">
Categories
</Link>

<Link to="/about" className="hover:text-[#c97979]">
About Us
</Link>

<Link to="/contact" className="hover:text-[#c97979]">
Contact Us
</Link>

</nav>

<div className="flex items-center gap-5">

<button onClick={()=>setShowSearch(!showSearch)}>
<Search size={20}/>
</button>

<Link to="/wishlist">
<Heart size={20}/>
</Link>

<div className="relative">

<button onClick={handleCartClick}>
<ShoppingCart size={20}/>
</button>

{user && totalItems>0 && (

<span className="absolute -top-2 -right-2 bg-[#c97979] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
{totalItems}
</span>

)}

</div>

<div className="relative" ref={menuRef}>

<button onClick={()=>setShowMenu(!showMenu)}>
<User size={20}/>
</button>

{showMenu && (

<div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg py-2">

{!user && (

<button
onClick={()=>navigate("/login")}
className="block w-full text-left px-4 py-2 hover:bg-gray-100"
>
Login
</button>

)}

{user && (

<>

<button
onClick={()=>navigate("/profile")}
className="block w-full text-left px-4 py-2 hover:bg-gray-100"
>
Profile
</button>

<button
onClick={()=>navigate("/orders")}
className="block w-full text-left px-4 py-2 hover:bg-gray-100"
>
Orders
</button>

{user.role==="vendor" && (

<button
onClick={()=>navigate("/vendor/dashboard")}
className="block w-full text-left px-4 py-2 hover:bg-gray-100"
>
Vendor Dashboard
</button>

)}

{user.role==="admin" && (

<button
onClick={()=>navigate("/admin")}
className="block w-full text-left px-4 py-2 hover:bg-gray-100"
>
Admin Panel
</button>

)}

<button
onClick={handleLogout}
className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
>
Logout
</button>

</>

)}

</div>

)}

</div>

</div>

</div>

{showSearch && (

<div className="border-t bg-white p-4">

<div className="max-w-4xl mx-auto flex gap-3">

<input
type="text"
placeholder="Search products..."
value={query}
onChange={(e)=>setQuery(e.target.value)}
className="flex-1 border rounded-lg px-4 py-2"
/>

<button
onClick={handleSearch}
className="bg-[#d98b8b] text-white px-5 py-2 rounded-lg"
>
Search
</button>

</div>

</div>

)}

</header>

);

}