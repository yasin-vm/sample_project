import "./Profile.css";
import { useState } from "react";

function Profile() {

  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    dob: "",
    email: "",
    username: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-top">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            className="profile-img"
          />

          <h1>My Profile</h1>

          <p className="subtitle">
            Welcome to your profile page
          </p>
        </div>

        <div className="profile-details">

          <div className="detail-box">
            <label>Name</label>

            {
              editing
              ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              )
              : (
                <p>{user.name}</p>
              )
            }
          </div>

          <div className="detail-box">
            <label>Date of Birth</label>

            {
              editing
              ? (
                <input
                  type="date"
                  name="dob"
                  value={user.dob}
                  onChange={handleChange}
                />
              )
              : (
                <p>{user.dob}</p>
              )
            }
          </div>

          <div className="detail-box">
            <label>Email</label>

            {
              editing
              ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              )
              : (
                <p>{user.email}</p>
              )
            }
          </div>

          <div className="detail-box">
            <label>Username</label>

            {
              editing
              ? (
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                />
              )
              : (
                <p>{user.username}</p>
              )
            }
          </div>

        </div>

        {
          editing
          ? (
            <button
              className="edit-btn"
              onClick={() => setEditing(false)}
            >
              Save Profile
            </button>
          )
          : (
            <button
              className="edit-btn"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          )
        }

      </div>

    </div>
  );
}

export default Profile;