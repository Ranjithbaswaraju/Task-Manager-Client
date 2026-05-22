import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Mail,
  Briefcase,
  Search,
} from "lucide-react";
const MyTeam = () => {
const token = localStorage.getItem("token");
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const fetchMyTeam = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/my-employees",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setEmployees(response.data.employees);
    }
    catch (err) {
      console.log(err);
    }

  };

  const handleSearch = async (value) => {

    setSearch(value);
    if (value.trim() === "") {

      fetchMyTeam();

      return;

    }

    try {

      const response = await axios.get(

        `http://localhost:3000/api/employee/search/${value}`,

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
      setEmployees([]);

    }
  };
  useEffect(() => {

    fetchMyTeam();

  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] p-6">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">

          <Users className="text-white" size={24} />

        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">
            My Team
          </h1>
          <p className="text-gray-400 mt-1">
            Employees created by you
          </p>
        </div>
      </div>
      <div className="mb-8 relative w-full md:w-[350px]">
        <Search
          className="absolute left-4 top-3.5 text-gray-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-[#1E293B] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white outline-none focus:border-[#8B5CF6]"
        />

      </div>

      {

        employees.length > 0

        ? (

          <div className="flex flex-row flex-wrap gap-6">

            {

              employees.map((employee) => (

                <div

                  key={employee._id}

                  className="w-[320px] min-h-[260px] bg-[#1E293B] border border-white/10 rounded-2xl p-6 hover:border-[#8B5CF6] transition-all duration-300"

                >

                  {/* Top */}
                  <div className="flex items-center justify-between mb-5">

                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-xl font-bold uppercase">

                      {

                        employee.name.charAt(0)

                      }

                    </div>




                    {/* Status */}
                    <p className="text-sm text-green-400 bg-green-400/10 px-3 py-1 rounded-full">

                      Active

                    </p>

                  </div>




                  {/* Name */}
                  <h2 className="text-2xl font-bold text-white">

                    {employee.name}

                  </h2>




                  {/* Email */}
                  <div className="flex items-center gap-2 mt-4 text-gray-400">

                    <Mail size={18} />




                    <p className="text-sm">

                      {employee.email}

                    </p>

                  </div>




                  {/* Designation */}
                  <div className="flex items-center gap-2 mt-3 text-gray-400">

                    <Briefcase size={18} />




                    <p className="text-sm">

                      {employee.designation}

                    </p>

                  </div>




                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">

                    <p className="text-xs text-gray-500">

                      Employee ID

                    </p>




                    <p className="text-xs text-[#8B5CF6]">

                      {employee._id.slice(0, 8)}

                    </p>

                  </div>

                </div>

              ))

            }

          </div>

        )

        : (

          <div className="bg-[#1E293B] border border-white/10 rounded-2xl p-10 text-center">

            <Users

              className="mx-auto text-gray-500 mb-4"

              size={50}

            />




            <h2 className="text-2xl text-white font-semibold">

              No Employees Found

            </h2>




            <p className="text-gray-400 mt-2">

              You haven't created any employees yet

            </p>

          </div>

        )

      }

    </div>

  );

};

export default MyTeam;
