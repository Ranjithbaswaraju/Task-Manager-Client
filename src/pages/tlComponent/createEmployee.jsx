import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import { API_BASE } from "../../config/api";

const CreateEmployee = () => {
 

  const navigate = useNavigate();

  
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    password: "",

    designation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
  });
  const validate = () => {
    let newErrors = {
      name: "",
      email: "",
      password: "",
      designation: "",
    };
    let isValid = true;
    // Name
    if (!formData.name) {
      newErrors.name = "Name is Required";
      isValid = false;
    }
    // Email
    if (!formData.email) {
      newErrors.email = "Email is Required";

      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid Email";

      isValid = false;
    }

    // Password
    if (!formData.password) {
      newErrors.password = "Password is Required";

      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";

      isValid = false;
    }

    // Designation
    if (!formData.designation) {
      newErrors.designation = "Designation is Required";

      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!validate()) return;

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${API_BASE}/api/employee`,

        {
          name: formData.name,

          email: formData.email,

          password: formData.password,

          designation: formData.designation,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ================= SUCCESS =================

      toast.success(response.data.message);

      // ================= RESET FORM =================

      setFormData({
        name: "",

        email: "",

        password: "",

        designation: "",
      });

      

      navigate("/tl-dashboard");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Unable to Create Employee");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-[#1E293B] rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/10">
        

        <div className="flex items-center gap-3 flex-wrap mb-6 sm:mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
            <UserPlus className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">Create Employee</h1>

            <p className="text-gray-400 text-sm mt-1">Add a new team member</p>
          </div>
        </div>

        

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-white mb-2">Full Name</label>

            <input
              type="text"
              placeholder="Enter employee name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,

                  name: e.target.value,
                })
              }
              className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 rounded-xl outline-none"
            />

            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-white mb-2">Email Address</label>

            <input
              type="email"
              placeholder="Enter employee email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,

                  email: e.target.value,
                })
              }
              className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 rounded-xl outline-none"
            />

            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-white mb-2">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,

                  password: e.target.value,
                })
              }
              className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 rounded-xl outline-none"
            />

            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          </div>

          

          {/* Designation */}
          <div>
            <label className="block text-white mb-2">Designation</label>

            <input
              type="text"
              placeholder="Frontend Developer"
              value={formData.designation}
              onChange={(e) =>
                setFormData({
                  ...formData,

                  designation: e.target.value,
                })
              }
              className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 rounded-xl outline-none"
            />

            <p className="text-red-400 text-sm mt-1">{errors.designation}</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300"
            >
              {isLoading ? "Creating..." : "Create Employee"}
            </button>

            {/* Cancel */}
            <button
              type="button"
              onClick={() => navigate("/tl-dashboard")}
              className="w-full bg-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
