import { Users } from "lucide-react";



import axios from "axios";

import { useEffect, useState } from "react";
import DashboardCard from "../EmployeeComponent/DashboardCard";
import { API_BASE } from "../../config/api";
// import DashboardCard from "../../components/DashboardCard";

const TLDashboard = () => {

  const user = JSON.parse(

    localStorage.getItem("user")

  );
  const token = localStorage.getItem("token");
  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/employee`,
        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      setEmployees(response.data.Employees);

    }

    catch (err) {

      console.log(err);

    }

  };
  useEffect(() => {

    fetchEmployees();

  }, []);
  return (

    <div className="space-y-6">

      {/* Header */}
      <div>

        <h1 className="text-2xl sm:text-3xl font-bold text-white">

          TEAMLEAD Dashboard 🎉

        </h1>

        <h4 className="text-gray-400 mt-2">

          Welcome back, {user?.name} 👋

        </h4>

      </div>
      {/* Stats — mobile/tablet grid; laptop: fixed-width card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:flex lg:flex-row lg:flex-wrap lg:gap-6">
        <div className="w-full md:max-w-none lg:w-[300px] lg:shrink-0">
          <DashboardCard
            title="Employees"
            value={employees.length}
            icon={Users}
            color="primary"
          />
        </div>
      </div>

      {/* Recent Employees */}
      <div className="bg-[#1E293B] rounded-2xl p-4 sm:p-6 border border-white/10 text-left">
        <h2 className="text-xl font-bold text-white mb-5 text-left">
          Recent Employees
        </h2>

        {employees.length > 0 ? (
          <div className="flex flex-row flex-wrap justify-center gap-6">
            {employees.map((employee) => (
              <div
                key={employee._id}
                className="w-[300px] shrink-0 grow-0 text-left rounded-xl border border-white/10 p-4 flex flex-col gap-2"
              >
                <div>
                  <h3 className="text-white font-medium">{employee.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {employee.designation}
                  </p>
                </div>
                <p className="text-[#8B5CF6] text-sm mt-auto">Active</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-left">No Employees Found</p>
        )}
      </div>

    </div>

  );

};

export default TLDashboard;
