import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth";

export const Login = () => {
  const [user, setUser] = useState({
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        setTokenInLC(res_data.token);
        setUser({ email: "", password: "" });
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
            src="/images/login.jpeg"
            alt="Girl Working On Laptop Animation - Free Download People Animations"
            className=" w-[400px]"
          />
        </div>
        <div className="register-form py-12 px-24 rounded-lg">
          <h1 className="text-2xl font-bold my-4">Login Form</h1>

          <form onSubmit={submitHandler} className="flex flex-col space-y-4">
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
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
