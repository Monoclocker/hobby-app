import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RequestService from "../../api/RequestService.js";
import Alert from "@mui/material/Alert";
import {useFetching} from "../../hooks/useFetching.js";

const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [messageAuth, setMessageAuth] = useState("");

    const userData = { username: username, password: password };

    const [logIn, isLoading, eventError] = useFetching(async () => {
        try {
            const response = await RequestService.authorization(userData);
            localStorage.setItem('accessToken', response.data['accessToken']);
            console.log(response.data['accessToken'])
            localStorage.setItem('refreshToken', response.data['refreshToken']);
            navigate("/groups");
            window.location.reload();
        } catch(e) {
            console.log(e)
            setMessageAuth("Неправильно введён логин или пароль!");
            setTimeout(() => {
              setMessageAuth("");
            }, 2000);
        }
    });

    const login = (e) => {
        e.preventDefault();
        logIn();
    }


  return (
    <div className="bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-400 bg-cover bg-center h-screen flex flex-col justify-center">
        <img style={{display: "block", margin: "auto"}} src="public/main_logo.svg" alt="logo"/>
    <div style={{marginBottom: "12%"}} className="flex flex-col justify-center px-6 py-12 lg:px-8">


      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={login}>
          {messageAuth !== "" && (
            <Alert severity="error">
              <strong>{messageAuth}</strong>
            </Alert>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Имя пользователя
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Пароль
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Войти
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Зарегистрируешься?
          <a
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            {" "}
            Регистрация
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
