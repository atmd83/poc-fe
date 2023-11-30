"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Toast from "../toast";

const API_URL = "https://api.tixtix.net/v1/user";
// const API_URL = "http://localhost:3001/v1/user";

const User = () => {
  const [user, setUser] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const getUser = async () => {
    try {
      const user = await axios.get(`${API_URL}/`, { withCredentials: true });
      setUser(user.data);
    } catch (error) {
      console.error("user is not logged in");
    }
  };

  const updateUserDetails = async () => {
    try {
      const user = await axios.put(
        `${API_URL}/`,
        {
          email: email !== "" ? email : undefined,
          username: username !== "" ? username : undefined,
          bio: bio !== "" ? bio : undefined,
        },
        { withCredentials: true }
      );
      setUser(user.data);
      setShowSuccess(true);
    } catch (error) {
      console.log("user is not logged in");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your username"
              onChange={(evt: any) => setUsername(evt.target.value)}
              required
              defaultValue={(user as any).username}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your email"
              defaultValue={(user as any).email}
              required
              onChange={(evt: any) => setEmail(evt.target.value)}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Bio
            </label>
            <textarea
              id="bio"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your bio"
              required
              defaultValue={(user as any).bio}
              onChange={(evt: any) => setBio(evt.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Address
            </label>
            <input
              value={`${(user as any).address.slice(0, 6)} ..... ${(
                user as any
              ).address.substr((user as any).address.length - 5)}`}
              type="text"
              id="last_name"
              readOnly
              disabled
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <button
          onClick={updateUserDetails}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        {showSuccess && (
          <Toast
            hide={() => setShowSuccess(false)}
            text="Your details have been saved."
          />
        )}
      </form>
    </>
  );
};

export default User;
