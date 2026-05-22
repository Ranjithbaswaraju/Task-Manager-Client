import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import {

  ClipboardList,

} from "lucide-react";
import { toast } from "react-toastify";

const CreateTask = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignedEmployee: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    assignedEmployee: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
         "https://task-manager-server-1-lei1.onrender.com/api/my-employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEmployees(response.data.employees);
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();

  }, []);

  const validate = () => {
    let newErrors = {

      title: "",

      description: "",

      assignedEmployee: "",

    };




    let isValid = true;




    // Title
    if (!formData.title) {

      newErrors.title = "Task Title is Required";

      isValid = false;

    }




    // Description
    if (!formData.description) {

      newErrors.description =

        "Description is Required";

      isValid = false;

    }




    // Employee
    if (!formData.assignedEmployee) {

      newErrors.assignedEmployee =

        "Please Select Employee";

      isValid = false;

    }




    setErrors(newErrors);

    return isValid;

  };






  const handleSubmit = async (e) => {

    e.preventDefault();




    // Validate
    if (!validate()) return;




    try {

      setIsLoading(true);




      // ================= API CALL =================

      const response = await axios.post(

        "https://task-manager-server-1-lei1.onrender.com/api/tasks",

        {

          title: formData.title,

          description: formData.description,

          priority: formData.priority,

          assignedEmployee:

            formData.assignedEmployee,

        },

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );




      // Success
      toast.success(response.data.message);




      // Reset Form
      setFormData({

        title: "",

        description: "",

        priority: "Medium",

        assignedEmployee: "",

      });




      // Navigate
      navigate("/tl-dashboard");

    }

    catch (err) {

      console.log(err);




      toast.error(

        err.response?.data?.message ||

        "Unable to Create Task"

      );

    }

    finally {

      setIsLoading(false);

    }

  };




  return (

    <div className="max-w-3xl mx-auto">

      <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-6 lg:p-8">

        {/* ================= HEADER ================= */}

        <div className="flex items-center gap-3 mb-8">

          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">

            <ClipboardList

              className="text-white"

              size={24}

            />

          </div>




          <div>

            <h1 className="text-3xl font-bold text-white">

              Create Task

            </h1>

            <p className="text-gray-400 mt-1">

              Assign a new task to employee

            </p>

          </div>

        </div>




        {/* ================= FORM ================= */}

        <form

          onSubmit={handleSubmit}

          className="space-y-5"

        >

          {/* Task Title */}
          <div>

            <label className="block text-white mb-2">

              Task Title

            </label>

            <input

              type="text"

              placeholder="Enter task title"

              value={formData.title}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  title: e.target.value,

                })

              }

              className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 rounded-xl outline-none"

            />




            <p className="text-red-400 text-sm mt-1">

              {errors.title}

            </p>

          </div>




          {/* Description */}
          <div>

            <label className="block text-white mb-2">

              Description

            </label>

            <textarea

              rows={5}

              placeholder="Enter task description"

              value={formData.description}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  description: e.target.value,

                })

              }

              className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 rounded-xl outline-none resize-none"

            ></textarea>




            <p className="text-red-400 text-sm mt-1">

              {errors.description}

            </p>

          </div>




          {/* Priority */}
          <div>

            <label className="block text-white mb-2">

              Priority

            </label>

            <select

              value={formData.priority}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  priority: e.target.value,

                })

              }

              className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 rounded-xl outline-none"

            >

              <option value="Low">

                Low Priority

              </option>

              <option value="Medium">

                Medium Priority

              </option>

              <option value="High">

                High Priority

              </option>

            </select>

          </div>




          {/* Assign Employee */}
          <div>

            <label className="block text-white mb-2">

              Assign Employee

            </label>

            <select

              value={formData.assignedEmployee}

              onChange={(e) =>

                setFormData({

                  ...formData,

                  assignedEmployee: e.target.value,

                })

              }

              className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 rounded-xl outline-none"

            >

              <option value="">

                Select Employee

              </option>




              {

                employees.map((employee) => (

                  <option

                    key={employee._id}

                    value={employee._id}

                  >

                    {employee.name} -

                    {" "}

                    {employee.designation}

                  </option>

                ))

              }

            </select>




            <p className="text-red-400 text-sm mt-1">

              {errors.assignedEmployee}

            </p>

          </div>




          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            {/* Submit */}
            <button

              type="submit"

              disabled={isLoading}

              className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300"

            >

              {

                isLoading

                ? "Creating..."

                : "Create Task"

              }

            </button>




            {/* Cancel */}
            <button

              type="button"

              onClick={() =>

                navigate("/tl-dashboard")

              }

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

export default CreateTask;
