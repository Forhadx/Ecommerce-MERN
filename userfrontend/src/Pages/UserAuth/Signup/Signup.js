import React from "react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./signup.scss";

const Signup = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("! Name is required")
      .min(3, "! too small name, minimum 3 character"),
    email: Yup.string()
      .required("! Email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .required("! password is required")
      .min(6, "! Password at least 6 character"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "! Confirm password doesn't match"
    ),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const signupHandler = (data) => {
    console.log(data);
    reset();
  };

  return (
    <div className="user__auth">
      <h1>Create Your Account</h1>
      <form className="user__auth--form" onSubmit={handleSubmit(signupHandler)}>
        <label>Your name</label>
        <input
          type="text"
          placeholder="enter your name"
          {...register("name", {
            required: "",
            minLength: { value: 3, message: "! too small name" },
          })}
        />
        <p>{errors.name?.message}</p>
        <label>E-mail</label>
        <input
          type="text"
          placeholder="enter your email"
          {...register("email")}
        />
        <p>{errors.email?.message}</p>
        <label>Password</label>
        <input
          type="password"
          placeholder="At least 6 character"
          {...register("password")}
        />
        <p>{errors.password?.message}</p>
        <label>Re-enter password</label>
        <input
          type="password"
          placeholder="enter your password"
          {...register("confirmPassword")}
        />
        <p>{errors.confirmPassword?.message}</p>
        <button type="submit">Create</button>
      </form>
      <div className="user__auth--text">
        Already have an account?<Link to="login"> login</Link>
      </div>
    </div>
  );
};

export default Signup;
