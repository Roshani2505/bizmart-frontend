import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetailsPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomStyle, setZoomStyle] = useState({});

  // ⭐ rating hover fix
  const [hoverRating, setHoverRating] = useState(0);

  // ✅ FRONTEND MODE
  useEffect(() => {
    const fixed = MOCK_PRODUCTS.map(p => ({
      ...p,
      images: p.images?.length
        ? p.images
        : [`https://source.unsplash.com/400x400/?${p.name}`]
    }));

    const found = fixed.find(p => p.id === id) || fixed[0];

    setProduct(found);
    setAllProducts(fixed);
  }, [id]);

  useEffect(() => {
    setSelectedImage(0);
  }, [product]);

  // 🔥 REVIEWS
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem(`reviews_${id}`);
    return saved ? JSON.parse(saved) : [];
  });

  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(5);

  useEffect(() => {
    localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  const handleAddReview = () => {
    if (!newReview.trim()) return;

    const review = {
      name: "You",
      rating: newRating,
      comment: newReview,
    };

    setReviews(prev => [review, ...prev]);
    setNewReview("");
  };

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    return (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  // 🔥 ZOOM
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.8)"
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ transform: "scale(1)", transformOrigin: "center" });
  };

  // 🔐 ADD TO CART PROTECTION
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/product/' + id);
      return;
    }

    addToCart(product, quantity);
  };

  // 🔥 RECOMMEND
  const recommendations = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [allProducts, product]);

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* LEFT */}
        <div>

          <div
            className="overflow-hidden rounded-xl border bg-white"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={product.images[selectedImage]}
              style={zoomStyle}
              className="w-full transition duration-200"
            />
          </div>

          <div className="flex gap-2 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                  i === selectedImage ? "border-black" : "opacity-60"
                }`}
              />
            ))}
          </div>

          {/* ⭐ REVIEWS */}
          <div className="mt-10">
            <h3 className="font-bold text-lg mb-4">⭐ Reviews</h3>

            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full border p-3 rounded mb-2"
              placeholder="Write your review..."
            />

            {/* ⭐ INTERACTIVE STARS */}
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map(star => (
                <span
                  key={star}
                  onClick={() => setNewRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className={`cursor-pointer text-2xl transition ${
                    star <= (hoverRating || newRating)
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            <button onClick={handleAddReview} className="btn-primary mb-4">
              Submit Review
            </button>

            {reviews.map((r, i) => (
              <div key={i} className="border p-3 rounded mb-2 text-sm">
                <div className="flex justify-between">
                  <span>{r.name}</span>
                  <span>{"★".repeat(r.rating)}</span>
                </div>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-bold text-primary">₹{product.price}</p>

          <p className="text-yellow-500">
            ⭐ {avgRating} ({reviews.length} reviews)
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-600 leading-relaxed">
            This {product.name} is built with premium materials ensuring durability,
            modern style, and long-lasting performance. Perfect for everyday usage.
          </p>

          {/* DETAILS */}
          <div className="border rounded-lg p-4 bg-gray-50 text-sm space-y-2">
            <h3 className="font-semibold text-lg mb-2">Product Details</h3>

            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Material:</strong> Premium Quality</p>
            <p><strong>Waterproof:</strong> Yes</p>
            <p><strong>Capacity:</strong> 20L</p>
          </div>

          {/* COLORS */}
          <div className="flex gap-2">
            {["red","blue","black","green"].map(c => (
              <div
                key={c}
                className="w-6 h-6 rounded-full border cursor-pointer hover:scale-110"
                style={{ background: c }}
              />
            ))}
          </div>

          {/* QUANTITY + CART */}
          <div className="flex items-center gap-4">

            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-2 bg-gray-200"
              >
                -
              </button>

              <span className="px-4">{quantity}</span>

              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-2 bg-gray-200"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn-primary flex items-center gap-2 px-6 py-2"
            >
              <ShoppingCart className="w-4 h-4"/>
              Add to Cart
            </button>

          </div>

        </div>
      </div>

      {/* SIMILAR */}
      <section>
        <h2 className="text-xl font-bold mb-4">🔥 Similar Products</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
}