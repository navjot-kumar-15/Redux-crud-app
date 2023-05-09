import React, { useEffect, useState } from "react";
import { deleteUser, getUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import Model from "./Model";
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
      <div className="allPostCont">
        {users.map((u) => (
          <>
            <div className="containerAll" key={u.id}>
              <h1>Name: {u.name}</h1>
              <p>Email: {u.email}</p>
              <p>Age: {u.age}</p>
              <p>Gender: {u.gender} </p>
              <div className="btn icon">
                <button
                  className="btn btn-danger "
                  onClick={() => dispatch(deleteUser(u.id))}
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
          </>
        ))}
      </div>
    </>
  );
}

export default AllPost;
