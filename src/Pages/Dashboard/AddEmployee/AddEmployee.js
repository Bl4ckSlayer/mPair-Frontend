import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
const AddEmployee = () => {
  const jobTitle = [
    "UI/UX Designer",
    "Back-endDeveloper",
    "Front-endDeveloper",
  ];
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const department = ["Designers", "Developers"];
  const [startDate, setStartDate] = useState(new Date());
  const join_date = format(startDate, "MM/dd/yyyy");
  const handleForm = (data) => {
    const job_Title = data.slot;
    const department = data.slot2;
    const first_Name = data.fName;
    const last_Name = data.lName;
    const email = data.email;
    const phone_Number = data.phone;
    const age = data.age;
    const salary = data.salary;
    const allData = {
      first_Name,
      last_Name,
      age,
      email,
      phone_Number,
      job_Title,
      join_date,
      salary,
      department,
    };
    fetch("http://localhost:5000/addEmployee", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(allData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Employee data inserted successfully");
        } else {
          toast.error(data.message);
        }
      });
    reset();
  };
  return (
    <div className="mt-12">
      <h1 className="text-center mb-6 font-extrabold text-3xl">
        Employee Details
      </h1>
      <form
        onSubmit={handleSubmit(handleForm)}
        className="grid mx-auto justify-center "
      >
        <div className="grid grid-cols-6 gap-6  ">
          {" "}
          <div className="col-span-6 sm:col-span-3">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              {...register("fName", {
                required: "This field is required",
              })}
              type="text"
              placeholder="First Name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              {...register("lName", {
                required: "This field is required",
              })}
              type="text"
              placeholder="Last Name"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              {...register("age", {
                required: "This field is required",
              })}
              type="number"
              placeholder="Age"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", {
                required: "This field is required",
              })}
              type="email"
              placeholder="Email Address"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              {...register("[phone]", {
                required: "This field is required",
              })}
              type="text"
              placeholder="Phone Number"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">
              <span className="label-text">Job Title</span>
            </label>
            <select
              id="slot"
              name="slot"
              {...register("slot", { required: true })}
              className="select select-bordered max-w-xs rounded-xl input   w-full border-primary bg-white border   text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {jobTitle.map((slot, i) => (
                <option value={slot} key={i}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">
              <span className="label-text">Join Date</span>
            </label>
            <DatePicker
              className="text-black select select-bordered w-full max-w-xs "
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label className="label">
              <span className="label-text">Salary</span>
            </label>
            <input
              {...register("[salary]", {
                required: "This field is required",
              })}
              type="text"
              placeholder="Salary"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="w-full col-span-6 text-center mx-auto">
            <label className="label">
              <span className="label-text my-auto mx-auto">Department</span>
            </label>
            <select
              name="slot2"
              id="slot2"
              {...register("slot2", { required: true })}
              className="select select-bordered w-full max-w-xs"
            >
              {department.map((slot, i) => (
                <option value={slot} key={i}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <br />
          <input
            className="btn btn-accent w-full col-span-6 sm:col-span-4"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
