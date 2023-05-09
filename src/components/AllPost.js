import React, { useEffect, useState } from "react";
import { deleteUser, getUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import Model from "./Model";
import { toast } from "react-toastify";
function AllPost() {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.user);
  const [id, setId] = useState();
  const [showPop, setShowPop] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      {showPop && <Model id={id} showPop={showPop} setShowPop={setShowPop} />}
      <div
        class="row "
        style={{ display: "flex", flexWrap: "wrap", marginLeft: "-2.5rem" }}
      >
        {users.map((u) => (
          <>
            <div class="col-sm-6 col-md-3 colCard">
              <div class="card  m-5" style={{ width: "20vw" }}>
                <div class="card-body">
                  <h5 class="card-title">Name: {u.name}</h5>
                  <p class="card-text">Email: {u.email}</p>
                  <p class="card-text">Age: {u.age}</p>
                  <p class="card-text">Gender: {u.gender}</p>
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
        ))}
      </div>
    </>
  );
}

export default AllPost;
