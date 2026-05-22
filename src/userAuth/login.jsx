import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is Required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is Required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/auth/login",

        formData,
      );

      const data = response.data;

      // Store Token & User
      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",

        JSON.stringify(data.User),
      );

      toast.success(data.message);

      // Role Based Navigation
      if (data.User.role === "TL") {
        navigate("/tl-dashboard");
      } else {
        navigate("/employee-dashboard");
      }
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Unable to Login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#4F46E5]/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-250px] right-[-250px] w-[500px] h-[500px] bg-[#8B5CF6]/20 blur-[120px] rounded-full"></div>

      {/* Login Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Task<span className="text-[#8B5CF6]">Pro</span>
          </h1>

          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Enterprise-grade workflow management
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#131E32]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-[#8B5CF6]/10 p-8 md:p-10">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>

            <p className="text-gray-400 mt-2">Sign in to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-300 mb-3 font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="name@organization.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#091224] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-all duration-300"
              />

              <p className="text-red-400 text-sm mt-2">{errors.email}</p>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm text-gray-300 font-medium">
                  Password
                </label>
              </div>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#091224] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-all duration-300"
              />

              <p className="text-red-400 text-sm mt-2">{errors.password}</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] py-4 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-[#8B5CF6]/20 disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 py-6">
            <div className="flex-1 h-[1px] bg-white/10"></div>

            <span className="text-gray-500 text-sm">OR</span>

            <div className="flex-1 h-[1px] bg-white/10"></div>
          </div>

          {/* Register */}
          <div className="text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#A78BFA] hover:text-[#8B5CF6] font-semibold transition-all duration-300"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
