import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Store, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
  const location = useLocation();
  const isSignup = location.pathname === '/signup';

  const [role, setRole] = useState('customer');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [shopName, setShopName] = useState('');
  const [address, setAddress] = useState('');

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  // 🔥 NEW (IMPORTANT)
  const boxRef = useRef();

  const handleOutsideClick = (e) => {
    if (boxRef.current && !boxRef.current.contains(e.target)) {
      navigate(-1); // 🔥 previous page pe wapas
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isSignup) {
        await signup({
          name,
          email,
          password,
          role,
          phone,
          shopName,
          address
        });

        navigate('/login');
      } else {
        await login(email, password);

        if (role === 'vendor') {
          navigate('/vendor/dashboard');
        } else {
          navigate(redirect);
        }
      }
    } catch (err) {
      setError("Invalid email or password ❌");
    }

    setIsLoading(false);
  };

  return (
    <div 
      onClick={handleOutsideClick}
      className="min-h-[90vh] flex items-center justify-center px-4 py-12 
      bg-black/40 backdrop-blur-sm"
    >

      <motion.div 
        ref={boxRef}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-6 p-8 rounded-2xl border shadow-2xl 
        bg-white dark:bg-[#1e1e1e]"
      >

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">
            {isSignup ? 'Create Account 🚀' : 'Welcome Back 👋'}
          </h2>

          <p className="text-sm text-gray-500">
            {role === 'vendor'
              ? "Login as Vendor Dashboard"
              : "Login as Customer"}
          </p>
        </div>

        {/* ROLE SWITCH */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              role === 'customer'
                ? 'bg-white dark:bg-black shadow'
                : ''
            }`}
          >
            👤 Customer
          </button>

          <button
            onClick={() => setRole('vendor')}
            className={`flex-1 py-2 rounded-md text-sm font-medium ${
              role === 'vendor'
                ? 'bg-white dark:bg-black shadow'
                : ''
            }`}
          >
            🏪 Vendor
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {isSignup && (
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <User size={16} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                className="w-full outline-none bg-transparent"
              />
            </div>
          )}

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Mail size={16} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full outline-none bg-transparent"
            />
          </div>

          {isSignup && (
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Phone size={16} />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full outline-none bg-transparent"
              />
            </div>
          )}

          {isSignup && role === 'vendor' && (
            <>
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <Store size={16} />
                <input
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="Shop Name"
                  className="w-full outline-none bg-transparent"
                />
              </div>

              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <MapPin size={16} />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Shop Address"
                  className="w-full outline-none bg-transparent"
                />
              </div>
            </>
          )}

          <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
            <Lock size={16} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full outline-none bg-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3"
          >
            {isLoading
              ? "Processing..."
              : isSignup
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-medium">
                Login
              </Link>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary font-medium">
                Signup
              </Link>
            </>
          )}
        </p>

      </motion.div>
    </div>
  );
}