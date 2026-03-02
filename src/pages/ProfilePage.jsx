import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Pencil } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    shopName: user?.shopName || "",
    avatar: user?.avatar || ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setForm(prev => ({ ...prev, avatar: imageUrl }));
    }
  };

  const handleSave = () => {
    localStorage.setItem("user_profile", JSON.stringify(form));
    setEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col md:flex-row gap-8">

        {/* 🔥 LEFT SIDE (PROFILE IMAGE) */}
        <div className="flex flex-col items-center gap-4">

          <div className="relative">
            <img
              src={form.avatar || "https://via.placeholder.com/150"}
              className="w-32 h-32 rounded-full object-cover border"
            />

            {editing && (
              <label className="absolute bottom-0 right-0 bg-black text-white text-xs px-2 py-1 rounded cursor-pointer">
                Edit
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <h3 className="font-semibold text-lg">{form.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
        </div>

        {/* 🔥 RIGHT SIDE (DETAILS) */}
        <div className="flex-1 space-y-4">

          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Profile Details</h2>

            <button onClick={() => setEditing(!editing)}>
              <Pencil />
            </button>
          </div>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editing}
            className="input-field"
            placeholder="Name"
          />

          <input
            name="email"
            value={form.email}
            disabled
            className="input-field bg-gray-100"
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!editing}
            className="input-field"
            placeholder="Phone"
          />

          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            disabled={!editing}
            className="input-field"
            placeholder="Address"
          />

          {/* 🔥 VENDOR EXTRA */}
          {user?.role === "vendor" && (
            <input
              name="shopName"
              value={form.shopName}
              onChange={handleChange}
              disabled={!editing}
              className="input-field"
              placeholder="Shop Name"
            />
          )}

          {/* SAVE BUTTON */}
          {editing && (
            <button
              onClick={handleSave}
              className="btn-primary w-full mt-4"
            >
              Save Changes
            </button>
          )}

        </div>
      </div>

    </div>
  );
}