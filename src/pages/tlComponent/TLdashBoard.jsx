import { Users } from "lucide-react";



import axios from "axios";

import { useEffect, useState } from "react";
import DashboardCard from "../EmployeeComponent/DashboardCard";
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
        "https://task-manager-server-1-lei1.onrender.com/api/employee",
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

    <div className="min-h-screen bg-[#0F172A] p-6">

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">

          TEAMLEAD Dashboard 🎉

        </h1>

        <h4 className="text-gray-400 mt-2">

          Welcome back, {user?.name} 👋

        </h4>

      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard

          title="Employees"

          value={employees.length}

          icon={Users}

          color="primary"
        />

      </div>
      {/* Employee List */}
      <div className="bg-[#1E293B] rounded-2xl p-6 border border-white/10 mt-8">
        <h2 className="text-xl font-bold text-white mb-5">
          Recent Employees
        </h2>
        <div className="space-y-4">
          {
            employees.length > 0

            ? (
              employees.map((employee) => (
                <div
                  key={employee._id}

                  className="flex items-center justify-between border-b border-white/10 pb-4"

                >

                  <div>

                    <h3 className="text-white font-medium">

                      {employee.name}

                    </h3>
                    <p className="text-gray-400 text-sm mt-1">

                      {employee.designation}

                    </p>

                  </div>
                  <p className="text-[#8B5CF6] text-sm">

                    Active

                  </p>

                </div>

              ))

            )

            : (

              <p className="text-gray-400">

                No Employees Found

              </p>

            )

          }

        </div>

      </div>

    </div>

  );

};

export default TLDashboard;
