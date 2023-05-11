import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Footer from "../Pages/Shared/Footer/Footer";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Navbar></Navbar>
      <div className="drawer drawer-mobile mb-12">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content bg-slate-300">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side  mr-6 ">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            <li className="p-2">
              <NavLink to="/dashboard">All Users</NavLink>
            </li>
            {isAdmin && (
              <>
                <li className="p-2">
                  <NavLink to="/dashboard/allEmployee">All employee</NavLink>
                </li>
                <li className="p-2">
                  <NavLink to="/dashboard/addEmployee">Add Employee</NavLink>
                </li>
                <li className="p-2">
                  <NavLink to="/dashboard/updateSalary">Update Salary</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
