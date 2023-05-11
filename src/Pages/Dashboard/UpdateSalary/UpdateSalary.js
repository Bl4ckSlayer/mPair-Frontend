import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const UpdateSalary = () => {
  const [employees, setEmployees] = useState([]);
  const [newData, setNewData] = useState(null);
  const [title, setTitle] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
    fetch(
      `https://mpairbackend.onrender.com/allemployees?title=${e.target.value}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setEmployees(data);
      });

    console.log(e.target.value);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const handleData = (e) => {
    const newSalary = parseInt(e.salary);
    console.log(newSalary);
    const oldSalary = parseFloat(newData.salary);
    let salary;
    const updatedSalary = {};
    if (newSalary === 0) {
      toast.error(`please input salary greater then 0`);
      return;
    } else if (newSalary > 0) {
      updatedSalary.salary = newSalary;
    } else {
      salary = parseFloat(oldSalary + oldSalary * 0.12).toFixed(2);
      updatedSalary.salary = salary;
    }

    fetch(`https://mpairbackend.onrender.com/updateSalary?id=${newData._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedSalary),
    })
      .then((res) => res.json())
      .then((data) => {
        fetch(`https://mpairbackend.onrender.com/allemployees?title=${title}`)
          .then((res) => res.json())
          .then((data) => setEmployees(data));
        toast.success(`Hi ${newData.first_Name}, your salary has been updated`);
      });
    console.log(salary);
    setNewData(null);
    reset();
  };

  return (
    <div className=" ">
      <h1 className="text-center mb-6 font-extrabold text-3xl mt-4">
        Update salary by job title
      </h1>
      <div className="w-full">
        <div className="w-1/4 mx-auto">
          <label className="label">
            <span className="label-text">Job Title</span>
          </label>
          <select
            onChange={handleForm}
            className="select select-bordered w-full mb-6"
          >
            <option disabled selected>
              Select Job Title
            </option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Back-endDeveloper">Back-endDeveloper</option>
            <option value="Front-endDeveloper">Front-endDeveloper</option>
          </select>
        </div>

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employees?.map((employee, i) => (
              <tr className="hover">
                <th className="text-lg font-bold ">{i + 1}</th>
                <td className="text-lg font-semibold">
                  {employee?.first_Name}
                </td>
                <td className="text-lg font-semibold">{employee?.last_Name}</td>
                <td className="text-lg font-semibold">{employee?.age}</td>
                <td className="text-md font-semibold text-blue-900">
                  {employee?.email}
                </td>
                <td className="text-md font-bold">{employee?.phone_Number}</td>

                <td className="text-md font-semibold ">
                  {employee?.job_Title}
                </td>

                <td className="text-md font-semibold ">
                  {employee?.join_date}
                </td>
                <td className="text-md font-semibold ">{employee?.salary}</td>
                <td className="text-md font-semibold">
                  {employee?.department}
                </td>
                <td className="text-md font-semibold">
                  <label
                    // disabled={slots.length === 0}
                    htmlFor="booking-modal"
                    className="btn btn-primary text-white"
                    onClick={() => setNewData(employee)}
                  >
                    Update Salary
                  </label>
                </td>
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
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      {newData && (
        <div>
          <input type="checkbox" id="booking-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="booking-modal"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold text-red-500  justify-center flex mt-12">
                Click Update Button to update salary by 12%{" "}
              </h3>
              <form
                onSubmit={handleSubmit(handleData)}
                className="grid grid-cols-1 gap-3   "
              >
                <h3 className="text-lg font-bold text-red-500  justify-center flex ">
                  or
                </h3>
                <label className="label mx-auto">
                  <span className="label-text text-green-700">
                    Update Salary manually
                  </span>
                </label>
                <input
                  {...register("[salary]", {})}
                  type="number"
                  placeholder="Input Salary Manually"
                  className="input  mx-auto input-bordered input-primary w-full max-w-xs"
                />
                <label className="label mx-auto">
                  <span className="label-text">Current Salary</span>
                </label>
                <input
                  type="number"
                  value={newData.salary}
                  disabled
                  className="input mx-auto input-bordered input-primary w-full max-w-xs"
                />
                <br />

                <input
                  className="btn btn-accent mx-auto w-1/2"
                  type="submit"
                  value="Update"
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateSalary;
