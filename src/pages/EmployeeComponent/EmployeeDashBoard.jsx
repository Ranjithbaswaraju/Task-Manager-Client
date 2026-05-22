import { ClipboardList, Clock, CheckCircle, TrendingUp } from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import DashboardCard from "../../components/DashboardCard";
// import DashboardCard from "../../Components/DashboardCard";
const EmployeeDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [myTasks, setMyTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://task-manager-server-1-lei1.onrender.com/api/employeeTasks",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMyTasks(response.data.tasks);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= USE EFFECT =================

  useEffect(() => {
    fetchTasks();
  }, []);

  // ================= FILTER TASKS =================

  const pendingTasks = myTasks.filter((task) => task.status === "Pending");

  const inProgressTasks = myTasks.filter(
    (task) => task.status === "In Progress",
  );

  const completedTasks = myTasks.filter((task) => task.status === "Completed");
  const completionRate =
    myTasks.length > 0
      ? Math.round((completedTasks.length / myTasks.length) * 100)
      : 0;

  // React Tasks

  const recentTasks = myTasks.slice(-5).reverse();
  return (
    <div className="min-h-screen bg-[#0F172A] p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Employee Dashboard 🎉</h1>

        <h3 className="text-gray-400 mt-2">Welcome back, {user?.name} 👋</h3>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Tasks"
          value={myTasks.length}
          icon={ClipboardList}
          color="primary"
        />

        <DashboardCard
          title="Pending"
          value={pendingTasks.length}
          icon={Clock}
          color="warning"
        />

        <DashboardCard
          title="In Progress"
          value={inProgressTasks.length}
          icon={TrendingUp}
          color="secondary"
        />

        <DashboardCard
          title="Completed"
          value={completedTasks.length}
          icon={CheckCircle}
          color="success"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Tasks */}
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-5">Recent Tasks</h2>

          <div className="space-y-4">
            {recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex items-start gap-3 border-b border-white/10 pb-4"
                >
                  {/* Status Dot */}
                  <div
                    className={`

                        w-3 h-3 rounded-full mt-2

                        ${
                          task.status === "Completed"
                            ? "bg-green-500"
                            : task.status === "In Progress"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                        }

                      `}
                  ></div>

                  {/* Task Info */}
                  <div>
                    <h3 className="text-white font-medium">{task.title}</h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {task.status} • {task.priority} Priority
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center py-10">
                No Tasks Assigned Yet
              </p>
            )}
          </div>
        </div>

        {/* Productivity */}
        <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-5">
            Productivity Overview
          </h2>

          {/* here is the Progress Bar */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-400 text-sm">Completion Rate</p>

              <p className="text-white font-semibold">{completionRate}%</p>
            </div>

            <div className="w-full bg-[#0F172A] h-3 rounded-full">
              <div
                className="bg-gradient-to-r from-green-500 to-green-700 h-3 rounded-full"
                style={{
                  width: `${completionRate}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Task Counts */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-300">
                {pendingTasks.length}
              </h1>

              <p className="text-sm text-gray-500 mt-1">Pending</p>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-yellow-400">
                {inProgressTasks.length}
              </h1>

              <p className="text-sm text-gray-500 mt-1">In Progress</p>
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-green-400">
                {completedTasks.length}
              </h1>

              <p className="text-sm text-gray-500 mt-1">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

