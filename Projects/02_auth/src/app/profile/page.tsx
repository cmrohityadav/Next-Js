"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
interface UserInfo {
  username: string;
  email:String
  
}
const Profile: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState("Fetch User Data");
  const [userInfo, setUserInfo] = useState<UserInfo>({ username: "NA",email:"NA" });

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data.data._id);
      setData(res.data.data._id);
      setUserInfo(res.data.data);
      console.log(res.data.data);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>unique id: {data}</Link>
        )}
      </h2>
      <hr />
      <p>Username : {userInfo.username}</p>
      <p>Email  : {userInfo.email}</p>
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="bg-green-500 mt-4 hover:bg-green-300 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        GET USER DATA
      </button>
    </div>
  );
};

export default Profile;
