import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { MOCK_PRODUCTS, CATEGORIES } from "../constants";

export default function ProductListingPage() {

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [categories, setCategories] = useState([]);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");

  // ✅ LOAD PRODUCTS
  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
  }, []);

  // ✅ URL SEARCH SYNC
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    setSearch(urlSearch);
  }, [searchParams]);

  // ✅ CATEGORY FROM URL (🔥 FINAL FIX)
  useEffect(() => {
    const urlCategory = searchParams.get("category");

    if (urlCategory) {
      const decoded = decodeURIComponent(urlCategory).toLowerCase().trim();
      setCategories([decoded]);
    }
  }, [searchParams]);

  // ✅ DEBOUNCE
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ SEARCH LOGIC
  const aiMatch = (product, query) => {
    const q = query.toLowerCase();

    if (q.includes("cheap") && product.price < 2000) return true;
    if (q.includes("expensive") && product.price > 20000) return true;

    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
    );
  };

  // ✅ FILTER LOGIC (🔥 FINAL FIX)
  useEffect(() => {

    let temp = [...products];

    if (debouncedSearch) {
      temp = temp.filter(p => aiMatch(p, debouncedSearch));
    }

    if (categories.length > 0) {
      temp = temp.filter(p =>
        categories.some(cat =>
          p.category.toLowerCase().includes(cat)
        )
      );
    }

    temp = temp.filter(p => p.rating >= rating);

    if (sort === "low") temp.sort((a, b) => a.price - b.price);
    if (sort === "high") temp.sort((a, b) => b.price - a.price);

    setFiltered(temp);

  }, [products, debouncedSearch, categories, rating, sort]);

  // ✅ CATEGORY TOGGLE
  const toggleCategory = (cat) => {

    const normalized = cat.toLowerCase();

    let updated;

    if (categories.includes(normalized)) {
      updated = [];
    } else {
      updated = [normalized];
    }

    setCategories(updated);

    setSearchParams({
      category: updated[0] || "",
      search
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search (e.g. cheap headphones)"
        className="input-field mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTERS */}
      <div className="flex flex-wrap gap-6 mb-6">

        <div>
          <p className="font-semibold mb-2">Category</p>

          {CATEGORIES.map(cat => (
            <label key={cat} className="block">
              <input
                type="checkbox"
                checked={categories.includes(cat.toLowerCase())}
                onChange={() => toggleCategory(cat)}
              /> {cat}
            </label>
          ))}
        </div>

        <div>
          <p className="font-semibold mb-2">Rating</p>
          <select onChange={(e) => setRating(Number(e.target.value))}>
            <option value={0}>All</option>
            <option value={4}>4★+</option>
            <option value={3}>3★+</option>
          </select>
        </div>

        <div>
          <p className="font-semibold mb-2">Sort</p>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>

      </div>

      <p className="mb-4 text-sm text-gray-500">
        Showing {filtered.length} products
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No products found 😢
        </div>
      )}

    </div>
  );
}