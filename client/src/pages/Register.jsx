import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setTokenInLC } = useAuth();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("User created successfully", { theme: "colored" });
        setTokenInLC(res_data.token);
        setUser({ username: "", phone: "", email: "", password: "" });
        navigate("/");
      } else {
        toast.error(res_data.message, {
          theme: "colored",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="register-container flex justify-center items-center h-[600px] space-x-24">
        <div className="image">
          <img
            src="/images/register.jpeg"
            alt="Male developer working on laptop Animated Illustration"
            className=" w-[400px]"
          />
        </div>
        <div className="register-form py-12 px-24 rounded-lg">
          <h1 className="text-2xl font-bold my-4">Registration Form</h1>

          <form onSubmit={submitHandler} className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label htmlFor="username" className="">
                Username
              </label>
              <input
                type="text"
                placeholder="username"
                name="username"
                id="username"
                required
                value={user.username}
                onChange={inputHandler}
                autoComplete="false"
                className=" border border-black rounded-sm py-1 px-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="">
                phone
              </label>
              <input
                type="number"
                placeholder="phone"
                name="phone"
                id="phone"
                required
                value={user.phone}
                onChange={inputHandler}
                autoComplete="false"
                className=" border border-black rounded-sm py-1 px-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="">
                email
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                id="email"
                required
                value={user.email}
                onChange={inputHandler}
                autoComplete="false"
                className=" border border-black rounded-sm py-1 px-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="">
                password
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                autoComplete="false"
                required
                value={user.password}
                onChange={inputHandler}
                className=" border border-black rounded-sm py-1 px-2"
              />
            </div>

            <button
              type="submit"
              className=" bg-orange-400 p-2 rounded-md hover:bg-orange-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
