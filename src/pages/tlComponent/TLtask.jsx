import { useEffect, useState } from "react";

import axios from "axios";

import { ClipboardList, User, Flag } from "lucide-react";
import { API_BASE } from "../../config/api";

const Tasks = () => {

  const token = localStorage.getItem("token");


  const [tasks, setTasks] = useState([]);
  
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/alltasks`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      setTasks(response.data.Tasks);
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    fetchTasks();
  }, []);

  const priorityColors = {
    Low: "text-green-400 bg-green-400/10",

    Medium: "text-yellow-400 bg-yellow-400/10",

    High: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}

      <div className="flex items-center gap-3 flex-wrap">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
          <ClipboardList className="text-white" size={24} />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">My Tasks</h1>

          <p className="text-gray-400 mt-1">
            Tasks created by you ({tasks.length})
          </p>
        </div>
      </div>

      {/* ================= TASK CARDS ================= */}

      {tasks.length > 0 ? (
        <div className="flex flex-row flex-wrap justify-center gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="w-[300px] shrink-0 grow-0 min-h-[280px] bg-[#1E293B] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-[#8B5CF6] transition-all duration-300"
            >
              {/* Title */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <h2 className="text-xl sm:text-2xl font-bold text-white break-words min-w-0 flex-1">
                  {task.title}
                </h2>

                {/* Priority */}
                <div
                  className={`shrink-0 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${priorityColors[task.priority]}`}
                >
                  {task.priority}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 leading-7">{task.description}</p>

              {/* Assigned Employee */}
              <div className="flex items-center gap-2 mt-5 text-gray-300">
                <User size={18} />

                <p>{task.assignedEmployee?.name || "Employee"}</p>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Flag className="text-[#8B5CF6]" size={18} />

                  <p className="text-gray-300">{task.status || "Pending"}</p>
                </div>

                <p className="text-[#8B5CF6] text-sm">Active</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-10 text-center">
          <ClipboardList className="mx-auto text-gray-500 mb-4" size={50} />

          <h2 className="text-2xl font-semibold text-white">No Tasks Found</h2>

          <p className="text-gray-400 mt-2">
            You haven't created any tasks yet
          </p>
        </div>
      )}
    </div>
  );
};

export default Tasks;

