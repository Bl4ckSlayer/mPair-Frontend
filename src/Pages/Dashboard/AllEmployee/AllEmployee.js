import React from "react";
import { useQuery } from "react-query";

const AllEmployee = () => {
  const { data: employees = [], refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch("https://mpairbackend.onrender.com/allemployees");
      const data = await res.json();
      console.log(data);
      return data;
    },
  });
  return (
    <div>
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title</th>
            <th> Join Date</th>
            <th>Salary</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((employee, i) => (
            <tr className="hover">
              <th className="text-lg font-bold ">{i + 1}</th>
              <td className="text-lg font-semibold">{employee?.first_Name}</td>
              <td className="text-lg font-semibold">{employee?.last_Name}</td>
              <td className="text-lg font-semibold">{employee?.age}</td>
              <td className="text-md font-semibold text-blue-900">
                {employee?.email}
              </td>
              <td className="text-md font-bold">{employee?.phone_Number}</td>

              <td className="text-md font-semibold ">{employee?.job_Title}</td>

              <td className="text-md font-semibold ">{employee?.join_date}</td>
              <td className="text-md font-semibold ">{employee?.salary}</td>
              <td className="text-md font-semibold">{employee?.department}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title</th>
            <th> Join Date</th>
            <th>Salary</th>
            <th>Department</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AllEmployee;
