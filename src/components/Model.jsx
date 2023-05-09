import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/userSlice";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

function Model({ id, showPop, setShowPop }) {
  const { users, isLoading } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  // Submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userData));
    setShowPop(false);
    toast.success("User updated successfully");
  };

  // Onchange function
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  // useEffect
  useEffect(() => {
    if (id) {
      // To get the single user
      const singleUser = users.filter((ele) => ele.id === id);
      setUserData(singleUser[0]);
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="model slide-in-elliptic-bottom-fwd  ">
        <div className="modelCont">
          <h4 className="text-center mb-2">Update</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Enter your name"
                name="name"
                onChange={(e) => handleChange(e)}
                value={userData?.name}
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
                onChange={(e) => handleChange(e)}
                value={userData?.email}
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
                onChange={(e) => handleChange(e)}
                value={userData?.age}
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
                  checked={userData?.gender === "Male"}
                  onChange={(e) => handleChange(e)}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Female"
                  name="gender"
                  onChange={(e) => handleChange(e)}
                  checked={userData?.gender === "Female"}
                />
                <label className="form-check-label">Female</label>
              </div>
            </div>
            <button className="btn btn-primary w-100 mt-2" type="submit">
              Update
            </button>
            <button
              onClick={() => setShowPop(false)}
              className="w-100 btn-danger btn mt-1"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Model;
