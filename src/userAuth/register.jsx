import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { Eye, EyeOff } from "lucide-react";

import { API_BASE } from "../config/api";

const Register = () => {
  // ================= NAVIGATE =================
  const navigate = useNavigate();

  // ================= FORM STATE =================
  const [formData, setFormData] = useState({
    name: "",

    email: "",

    password: "",

    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  // ================= SHOW / HIDE PASSWORD =================
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};

    // Name Validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is Required";
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is Required";
    }

    // Password Validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is Required";
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not Match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate Form
    if (!validate()) return;

    try {
      setLoading(true);

      // API CALL
      const response = await axios.post(
        `${API_BASE}/api/auth/register`,
        {
          name: formData.name,

          email: formData.email,

          password: formData.password,

          role: "TL",
        }
      );

      // Success Message
      toast.success(response.data.message);

      console.log(response.data);

      // Reset Form
      setFormData({
        name: "",

        email: "",

        password: "",

        confirmPassword: "",
      });

      // Navigate Login Page
      navigate("/login");
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to Register User"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page min-h-screen bg-[#050816] flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* ================= Bg color================= */}

      <div className="hidden sm:block absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-[#4F46E5]/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="hidden sm:block absolute bottom-[-250px] right-[-250px] w-[500px] h-[500px] bg-[#8B5CF6]/20 blur-[120px] rounded-full pointer-events-none"></div>

      {/* ================= REGISTER CONTAINER ================= */}

      <div className="w-full max-w-md relative z-10">
        {/* ================= LOGO ================= */}

        <div className="text-center mb-10">
          <h1 className="auth-logo text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Task<span className="text-[#8B5CF6]">Pro</span>
          </h1>

          <p className="auth-subtitle text-gray-400 mt-3 text-sm md:text-base">
            Enterprise-grade workflow management
          </p>
        </div>

        {/* ================= CARD ================= */}

        <div className="auth-card bg-[#131E32]/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-[#8B5CF6]/10 p-6 sm:p-8 md:p-10">
          {/* ================= HEADING ================= */}

          <div className="mb-8">
            <h2 className="auth-heading text-2xl sm:text-3xl font-bold text-white">
              Create Account
            </h2>

            <p className="text-gray-400 mt-2">
              Register to continue
            </p>
          </div>

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* ================= NAME ================= */}

            <div>
              <label className="block text-sm text-gray-300 mb-3 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#091224] border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-all duration-300"
              />

              <p className="text-red-400 text-sm mt-2">
                {errors.name}
              </p>
            </div>

            {/* ================= EMAIL ================= */}

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

              <p className="text-red-400 text-sm mt-2">
                {errors.email}
              </p>
            </div>

            {/* ================= PASSWORD ================= */}

            <div>
              <label className="block text-sm text-gray-300 mb-3 font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-[#091224] border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-all duration-300"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <p className="text-red-400 text-sm mt-2">
                {errors.password}
              </p>
            </div>

            {/* ================= CONFIRM PASSWORD ================= */}

            <div>
              <label className="block text-sm text-gray-300 mb-3 font-medium">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-[#091224] border border-white/10 rounded-xl px-4 py-4 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8B5CF6] transition-all duration-300"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <p className="text-red-400 text-sm mt-2">
                {errors.confirmPassword}
              </p>
            </div>

            {/* ================= SUBMIT BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#7C3AED] to-[#6366F1] py-4 rounded-xl font-semibold text-lg hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-[#8B5CF6]/20 disabled:opacity-50 text-white"
            >
              {loading
                ? "Creating Account..."
                : "Create Account →"}
            </button>
          </form>

          {/* ================= LOGIN LINK ================= */}

          <div className="text-center pt-8">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#A78BFA] hover:text-[#8B5CF6] font-semibold transition-all duration-300"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;