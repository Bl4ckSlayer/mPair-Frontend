import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute/AdminRoute";
import AddEmployee from "../Pages/Dashboard/AddEmployee/AddEmployee";
import AllEmployee from "../Pages/Dashboard/AllEmployee/AllEmployee";
import UpdateSalary from "../Pages/Dashboard/UpdateSalary/UpdateSalary";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addEmployee",
        element: (
          <AdminRoute>
            <AddEmployee></AddEmployee>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allEmployee",
        element: (
          <AdminRoute>
            <AllEmployee></AllEmployee>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateSalary",
        element: (
          <AdminRoute>
            <UpdateSalary></UpdateSalary>
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;
