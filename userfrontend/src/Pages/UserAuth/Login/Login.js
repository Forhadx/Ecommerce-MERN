import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router";

const Login = (props) => {
    const history = useHistory();
    const [isLogin, setIsLogin] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const { token, authRedirectPath } = props;

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "! Password at least 6 character"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if (isLogin) {
            if (token) {
                setIsLogin(false);
                setIsWrong(false);
                reset();
                if (authRedirectPath === "/shipping") {
                    history.push("/shipping");
                } else {
                    history.push("/");
                }
            } else {
                setIsWrong(true);
            }
        }
    }, [token, isLogin, history, isWrong, reset, authRedirectPath]);

    const loginHandler = (data) => {
        props.onUserLogin(data);
        setIsLogin(true);
    };

    return (
        <div className="user__auth">
            <h1>Please Login</h1>
            <form
                className="user__auth--form"
                onSubmit={handleSubmit(loginHandler)}
            >
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
                <button type="submit">login</button>
            </form>
            {isWrong && <h3>wrong password</h3>}
            <h2>
                <span>New to Gro-mart</span>
            </h2>
            <Link to="signup" className="user__auth--create">
                Create account
            </Link>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserLogin: (userData) => dispatch(actions.userLogin(userData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
