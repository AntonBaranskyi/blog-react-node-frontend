import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRegister,
  selectIsRegister,
} from "../../redux/slices/registerSlice";
import { Navigate } from "react-router-dom";

export const Registration = () => {
  const dispatch = useDispatch();
  const isRegister = useSelector(selectIsRegister);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(values);
    dispatch(fetchRegister(values));
  };

  if (isRegister) {
    return <Navigate to="/" />;
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          {...register("fullName", { required: true })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          type="email"
          {...register("email", { required: true })}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          type="password"
          {...register("password", { required: true })}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
