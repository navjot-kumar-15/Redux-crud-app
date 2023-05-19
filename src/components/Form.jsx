import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../features/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Form() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const { name, email, age, gender } = user;
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !age || !gender) {
      return toast.error("Please fill all the fields");
    }
    dispatch(createUser(user));
    navigate("/");
    toast.success("User added successfully");
  };
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div className="mainForm">
        <Link to="/" className="btn btn-success postBtn">
          All Posts
        </Link>
        <div className="container">
          <h2 className="text-center mb-3">Add User</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                value={name}
              />
              <label htmlFor="floatingInput">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                onChange={handleChange}
                value={email}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter your age"
                name="age"
                onChange={handleChange}
                value={age}
              />
              <label htmlFor="age">Age</label>
            </div>
            <div className="radio  mt-3  ">
              <div className="form-check ">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Male"
                  name="gender"
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Female"
                  name="gender"
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
            <button
              className="btn  w-100 mt-2"
              style={{
                background: "#00906D",
                color: "white",
                fontSize: "1.1rem",
              }}
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
