import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Orders = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "length should be minimum 3")
      .max(6, "length should be maximum 6"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const userHandler = (data) => {
    console.log("data: ", data);
    reset();
  };

  return (
    <div>
      <div>ooo</div>
      <form className="form__input" onSubmit={handleSubmit(userHandler)}>
        <div>
          <label>NAME</label>
          <input
            type="text"
            placeholder="length should be between 3 to 6"
            {...register("name")}
          />
          <p>{errors.name?.message}</p>
        </div>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default Orders;
