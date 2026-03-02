import React, { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function OrderHistoryPage() {

  const [orders, setOrders] = useState([]);

  // ✅ LOCAL STORAGE ORDERS
  useEffect(() => {
    const saved = localStorage.getItem("orders");
    setOrders(saved ? JSON.parse(saved) : []);
  }, []);

  const getStatusIcon = (status) => {
    if (status === "processing") return <Clock className="text-yellow-500" />;
    if (status === "shipped") return <Truck className="text-blue-500" />;
    if (status === "delivered") return <CheckCircle2 className="text-green-500" />;
    return <Package />;
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No Orders Yet 😔</h2>
        <p className="text-gray-500">Start shopping to see your orders here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-8">📦 My Orders</h1>

      <div className="space-y-6">

        {orders.map((order) => (
          <div key={order.id} className="border rounded-xl overflow-hidden">

            {/* HEADER */}
            <div className="p-4 bg-gray-50 flex justify-between items-center">
              <div className="flex gap-6 text-sm">
                <div>
                  <p className="text-gray-400">Order ID</p>
                  <p className="font-bold">{order.id}</p>
                </div>

                <div>
                  <p className="text-gray-400">Date</p>
                  <p className="font-bold">{order.date}</p>
                </div>

                <div>
                  <p className="text-gray-400">Total</p>
                  <p className="font-bold">₹{order.total}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
            </div>

            {/* ITEMS */}
            <div className="p-4 space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <img
                    src={item.product.images?.[0]}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="font-bold">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}