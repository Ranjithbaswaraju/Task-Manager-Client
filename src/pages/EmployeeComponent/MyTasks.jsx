import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE } from "../../config/api";

const MyTasks = () => {
  const token = localStorage.getItem("token");
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/employeeTasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(response.data.tasks);
    }
    catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const filteredTasks = statusFilter
    ? tasks.filter(
        (task) =>
          task.status === statusFilter
      )
    : tasks;
  const handleStatusChange = async (
    taskId,
    status
  ) => {
    try {
      await axios.put(
        `${API_BASE}/api/employeetasks/${taskId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      fetchTasks();
      toast.success("Status updated successfully");
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Unable to update status"
      );
    }
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            My Tasks
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your assigned tasks
          </p>
        </div>
        {/* Filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="w-full sm:w-auto bg-[#1E293B] border border-white/10 text-white px-5 py-3 rounded-xl outline-none"
        >
          <option value="">
            All Tasks
          </option>
          <option value="Pending">
            Pending
          </option>
          <option value="In Progress">
            In Progress
          </option>
          <option value="Completed">
            Completed
          </option>
        </select>
      </div>

      {

        filteredTasks.length > 0

        ? (

          <div className="flex flex-row flex-wrap justify-center gap-6">

            {

              filteredTasks.map((task) => (

                <div

                  key={task._id}

                  className="w-[300px] shrink-0 grow-0 min-h-[320px] bg-[#1E293B] border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-[#8B5CF6] transition-all duration-300"

                >

                  {/* Top */}
                  <div className="flex items-center justify-between mb-5">

                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-xl font-bold uppercase">

                      {

                        task.title.charAt(0)

                      }

                    </div>




                    {/* Priority */}
                    <p

                      className={`

                        text-sm px-3 py-1 rounded-full font-medium

                        ${

                          task.priority === "High"

                          ? "text-red-400 bg-red-400/10"

                          : task.priority === "Medium"

                          ? "text-yellow-400 bg-yellow-400/10"

                          : "text-green-400 bg-green-400/10"

                        }

                      `}

                    >

                      {task.priority}

                    </p>

                  </div>




                  {/* Title */}
                  <h2 className="text-2xl font-bold text-white">

                    {task.title}

                  </h2>




                  {/* Description */}
                  <p className="text-gray-400 text-sm mt-4 leading-7">

                    {task.description}

                  </p>




                  {/* Status */}
                  <div className="mt-5">

                    <p className="text-sm text-gray-500 mb-2">

                      Current Status

                    </p>
                    <div className="inline-block px-4 py-2 rounded-full bg-[#0F172A] text-white text-sm border border-white/10">
                      {task.status}
                    </div>
                  </div>
                  {/* Update Status */}
                  <div className="mt-6">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(
                          task._id,
                          e.target.value
                        )
                      }
                      className="w-full bg-[#0F172A] border border-white/10 text-white px-4 py-3 rounded-xl outline-none focus:border-[#8B5CF6]"

                    >

                      <option value="Pending">

                        Pending

                      </option>

                      <option value="In Progress">

                        In Progress

                      </option>

                      <option value="Completed">

                        Completed

                      </option>

                    </select>

                  </div>




                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">

                    <p className="text-xs text-gray-500">

                      Task ID

                    </p>




                    <p className="text-xs text-[#8B5CF6]">

                      {task._id.slice(0, 8)}

                    </p>

                  </div>

                </div>

              ))

            }

          </div>

        )

        : (

          <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-10 text-center">

            <h2 className="text-2xl font-semibold text-white">

              No Tasks Found

            </h2>




            <p className="text-gray-400 mt-2">

              No tasks available

            </p>

          </div>

        )

      }

    </div>

  );

};

export default MyTasks;
