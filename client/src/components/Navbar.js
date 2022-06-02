import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        if (res.data.role === "teacher") setIsTeacherLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logout = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/users/logout", {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-between flex-wrap border-gray-400 p-3">
      {isTeacherLoggedIn ? (
        <Link to="/teachers/home">
          <img src={require("../imgs/studioLogo1.png")} alt="logo" className="justify-start w-36" />
        </Link>
      ) : (
        <Link to={`/students/${user._id}`}>
          <img src={require("../imgs/studioLogo1.png")} alt="logo" className="justify-start w-36" />
        </Link>
      )}
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div className="HAMBURGER-ICON space-y-2" onClick={() => setIsNavOpen((prev) => !prev)}>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div className="absolute top-0 right-0 px-8 py-8" onClick={() => setIsNavOpen(false)}>
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              {isTeacherLoggedIn && (
                <>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <a href="/teachers/home">Students</a>
                  </li>
                  <li className="border-b border-gray-400 my-8 uppercase">
                    <a href="/notes/addNote">Add Lesson Note</a>
                  </li>
                </>
              )}

              <li>
                <button
                  onClick={logout}
                  to={""}
                  className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-white-500 hover:bg-gray-500 mt-4 lg:mt-0"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex w-full flex-grow lg:items-center lg:w-auto">
          {isTeacherLoggedIn && (
            <>
              <li>
                <a
                  href="/teachers/home"
                  className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-gray-500 mr-4"
                >
                  Students
                </a>
              </li>
              <li>
                <a
                  href="/notes/addNote"
                  className="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-gray-500 mr-4"
                >
                  Add Lesson Note
                </a>
              </li>
            </>
          )}

          <li>
            <button
              onClick={logout}
              to={""}
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent  hover:bg-gray-500 lg:mt-0"
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
};

export default Navbar;
