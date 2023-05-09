import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const { users } = useSelector((state) => state.user);
  const [query, setQuery] = useState("");
  const keys = ["name", "age", "email", "gender"];
  const search = () => {
    return users.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand">Crud Redux</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/add">
                  Add user
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  All Post ({users.length})
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={() =>
                  search(() => {
                    const keys = ["name", "age", "email", "gender"];
                    return users.filter((item) =>
                      keys.some((key) =>
                        item[key].toLowerCase().includes(query)
                      )
                    );
                  })
                }
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
