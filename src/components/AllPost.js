import React, { useEffect, useState } from "react";
import { deleteUser, getUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import Model from "./Model";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function AllPost() {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);
  const [id, setId] = useState();
  const [showPop, setShowPop] = useState(false);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {showPop && <Model id={id} showPop={showPop} setShowPop={setShowPop} />}
      <div className="allPost">
        <div className="head ">
          <h1 className="text-center tracking-in-expand-fwd">All users</h1>
          <input
            type="text"
            placeholder="Search here..."
            className="search"
            onChange={(e) => setSearchData(e.target.value)}
          />
          <Link to="/add">
            <div className="btn addUser btn-success ">Add user</div>
          </Link>
        </div>
        <div
          className="row "
          style={{ display: "flex", flexWrap: "wrap", marginLeft: "-2.5rem" }}
        >
          {users.length > 0 ? (
            users
              .filter((val) => val.name.toLowerCase().includes(searchData))
              .map((u) => (
                <>
                  <div className="col-sm-4 col-md-4 colCard" key={u.id}>
                    <div
                      className="card mainCard m-5"
                      style={{ width: "25vw" }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">
                          Name:{" "}
                          {u.name.charAt(0).toUpperCase() + u.name.slice(1)}
                        </h5>
                        <p className="card-text">Email: {u.email}</p>
                        <p className="card-text">Age: {u.age}</p>
                        <p className="card-text">Gender: {u.gender}</p>
                        <div className="btn icon">
                          <button
                            className="btn btn-danger "
                            onClick={() => (
                              dispatch(deleteUser(u.id)),
                              toast.success("User deleted successfully")
                            )}
                          >
                            {" "}
                            Delete
                          </button>
                          <button
                            onClick={() => (setId(u.id), setShowPop(true))}
                            className="btn btn-primary"
                          >
                            {" "}
                            Edit
                          </button>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
          ) : (
            <h3 className="text-center mt-5">No data found</h3>
          )}
        </div>
      </div>
    </>
  );
}

export default AllPost;
