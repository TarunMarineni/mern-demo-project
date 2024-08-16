import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../store/auth";

export const Contact = () => {
  const [contact, setContact] = useState({
    username: "",
    email: "",
    message: "",
  });

  const [userData, setUserData] = useState(true);

  const { user } = useAuth();

  if (user && userData) {
    setContact({
      username: user.username,
      email: user.email,
      message: "",
    });

    setUserData(false);
  }

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setContact({
      ...contact,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact({ username: "", email: "", message: "" });
        toast.success("Message sent successfully", {
          theme: "colored",
        });
      } else {
        toast.error("There is an issue to sent contact form!", {
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
                value={contact.username}
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
                value={contact.email}
                onChange={inputHandler}
                autoComplete="false"
                className=" border border-black rounded-sm py-1 px-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="">
                message
              </label>
              <textarea
                placeholder="message"
                name="message"
                id="message"
                autoComplete="false"
                required
                rows="5"
                value={contact.message}
                onChange={inputHandler}
                className=" border border-black rounded-sm py-1 px-2"
              ></textarea>
            </div>

            <button
              type="submit"
              className=" bg-orange-400 p-2 rounded-md hover:bg-orange-500"
            >
              Contact Us
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
