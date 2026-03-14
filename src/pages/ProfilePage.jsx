import React from "react";
import { Pencil } from "lucide-react";

export default function ProfilePage() {

const user = JSON.parse(localStorage.getItem("user"));

return (

<div className="min-h-screen pt-32 pb-24 bg-[#fafafa]">

<div className="max-w-6xl mx-auto px-6">

<div className="bg-white border border-[#ead7cf] rounded-xl p-8 shadow-sm">

{/* HEADER */}

<div className="flex justify-between items-start mb-8">

<h1 className="text-2xl font-bold">
Profile Details
</h1>

<button className="p-2 border border-[#ead7cf] rounded-lg hover:bg-[#fff7f4]">
<Pencil size={18}/>
</button>

</div>


<div className="flex gap-10 items-center">

{/* AVATAR */}

<div className="w-32 h-32 rounded-full border-2 border-[#ead7cf] flex items-center justify-center bg-[#fff7f4] text-4xl font-bold text-[#c97979]">

{user?.email?.charAt(0).toUpperCase()}

</div>


{/* USER INFO */}

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">

<div>
<p className="text-sm text-gray-400">
Name
</p>
<p className="font-semibold text-lg">
{user?.name || "Not Provided"}
</p>
</div>

<div>
<p className="text-sm text-gray-400">
Email
</p>
<p className="font-semibold text-lg">
{user?.email}
</p>
</div>

<div>
<p className="text-sm text-gray-400">
Phone
</p>
<p className="font-semibold text-lg">
{user?.phone || "Not Provided"}
</p>
</div>

<div>
<p className="text-sm text-gray-400">
Address
</p>
<p className="font-semibold text-lg">
{user?.address || "Not Provided"}
</p>
</div>

<div>
<p className="text-sm text-gray-400">
Role
</p>
<p className="font-semibold text-lg capitalize">
{user?.role || "Customer"}
</p>
</div>

</div>

</div>

</div>

</div>

</div>

);

}