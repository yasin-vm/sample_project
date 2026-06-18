import "./Layout.css";
import { Link, Outlet } from "react-router";

function Layout() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const avatarLetter =
    user?.name?.charAt(0).toUpperCase();

  return (
    <div className="layout">

      <div id="navbar">

        <h2 className="logo">
          💰 Budget Tracker
        </h2>

        <div className="nav-links">

          <Link to="/app/dashbord">
            Dashboard
          </Link>

          <Link to="/app/profile">
            Profile
          </Link>

          <div className="user-info">

            <div className="user-avatar">
              {avatarLetter}
            </div>

            <span className="user-name">
              {user?.name}
            </span>

          </div>

          <Link to="/">
            Logout
          </Link>

        </div>

      </div>

      <div className="content">
        <Outlet />
      </div>

    </div>
  );
}

export default Layout;