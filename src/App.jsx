// import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Login from "./userAuth/login";
// // import Register from "./userAuth/register";
// import EmployeeDashboard from "./pages/EmployeeComponent/EmployeeDashBoard";
// import "./App.css";
// import MyTasks from "./pages/EmployeeComponent/MyTasks";
// import EmployeeLayout from "./pages/EmployeeComponent/EmployeeLayOut";

// import OneTask from "./pages/tlComponent/TLtask";
// import { ToastContainer } from "react-toastify";
// import MyTeam from "./pages/tlComponent/MyTeam";
// import CreateTask from "./pages/tlComponent/createTask";
// import CreateEmployee from "./pages/tlComponent/createEmployee";
// import Login from "./userAuth/login";
// import Register from "./userAuth/register";
// import TLDashboard from "./pages/tlComponent/TLdashboard.jsx";
// import TLLayout from "./pages/tlComponent/TLlayout.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import EmployeeDashboard from "./pages/EmployeeComponent/EmployeeDashBoard";
import EmployeeLayout from "./pages/EmployeeComponent/EmployeeLayOut";
import MyTasks from "./pages/EmployeeComponent/MyTasks";

import OneTask from "./pages/tlComponent/TLtask";
import MyTeam from "./pages/tlComponent/MyTeam";
import CreateTask from "./pages/tlComponent/createTask";
import CreateEmployee from "./pages/tlComponent/createEmployee";

import TLDashboard from "./pages/tlComponent/TLdashboard";
import TLLayout from "./pages/tlComponent/TLlayout";

import Login from "./userAuth/login";
import Register from "./userAuth/register";

import { ToastContainer } from "react-toastify";
import "./App.css";

// Pages

function App() {
  return (
    <>
    <ToastContainer/>
     <BrowserRouter>
      <Routes>
        {/* Login */}

        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Employee Dashboard */}
        <Route element={<EmployeeLayout />}>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />

          <Route path="/my-tasks" element={<MyTasks />} />
        </Route>

        <Route element={<TLLayout />}>
          <Route path="/tl-dashboard" element={<TLDashboard />} />
          <Route path="/my-team" element={<MyTeam/>} />

          <Route path="/create-task" element={<CreateTask />} />

          <Route path="/tasks" element={<OneTask />} />

          <Route path="/create-employee" element={<CreateEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
   
  );
}

export default App;
