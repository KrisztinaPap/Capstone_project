import React from 'react';

const Profile = () => {
  return (
    <>
      <h1>Edit Profile</h1>

      <form>
        <label htmlFor="password">Current Password:</label>
        <input
          type="text"
          id="password"
        />

        <label htmlFor="name">New Name:</label>
        <input
          type="text"
          id="name"
        />

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="text"
          id="NewPassword"
        />

        <label htmlFor="newPassword2">Re-enter New Password:</label>
        <input
          type="text"
          id="newPassword2"
        />

        <input type="submit" value="Update" />
      </form>

    </>
  );
}

export default Profile;
