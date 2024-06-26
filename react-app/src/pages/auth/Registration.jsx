import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import RequestService from '../../api/RequestService';
import { useFetching } from '../../hooks/useFetching.js';
import { MultiSelect } from 'react-multi-select-component';

const Registration = () => {
    const navigate = useNavigate();

    const options = [
        { label: 'Активный отдых', value: 'Активный отдых' },
        { label: 'Вечеринки', value: 'Вечеринки' },
        { label: 'Алкоголь', value: 'Алкоголь' },
        { label: 'Cпорт', value: 'Спорт' },
        { label: 'Кофе', value: 'Кофе' },
        { label: 'Настольные игры', value: 'Настольные игры' },
        { label: 'Квесты', value: 'Квесты' },
        { label: 'Кино', value: 'Кино' },
        { label: 'Книги', value: 'Книги' },
    ];

    const [selected, setSelected] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [cityName, setCityName] = useState('');
    const [isRegister, setRegister] = useState(0); // Проверка успешно ли пользователь прошёл регистрацию

    const [register, isLoading, eventError] = useFetching(async () => {
        const interests = selected.map((item) => item.value);
        const user = {
            username: username,
            email: email,
            password: password,
            age: age,
            cityName: cityName,
            interests: interests,
        };
        try {
            const response = await RequestService.registration(user);
            setRegister(response.status);
            if (response.status === 200) {
                console.log('Пользователь успешно зарегистрирован!', response.status);
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 700);
            }
        } catch (e) {
            setRegister(400);
            setTimeout(() => {
                setRegister(0);
            }, 2000);
        }
    });

    const registration = (e) => {
        e.preventDefault();
        register();
    };

    return (
        <div
            className="bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-400 bg-cover bg-center h-screen flex flex-col justify-center">
            <img style={{display: "block", margin: "auto", marginTop: 10}} src="public/main_logo.svg" alt="logo"/>
            <div className="flex flex-col justify-center px-6 py-12 lg:px-8">

                <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" method="POST" onSubmit={registration}>
                        {isRegister === 200 && (
                            <Alert severity="success">
                                <strong>Успешно!</strong>
                            </Alert>
                        )}
                        {isRegister === 400 && (
                            <Alert severity="error">
                                <strong>Придумайте другой логин!</strong>
                            </Alert>
                        )}

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Имя пользователя
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Garena"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                                Возраст
                            </label>
                            <div className="mt-2">
                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    required
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                                Город
                            </label>
                            <div className="mt-2">
                                <input
                                    id="cityName"
                                    name="cityName"
                                    type="text"
                                    value={cityName}
                                    onChange={(e) => setCityName(e.target.value)}
                                    required
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                                Выберите интересы:
                            </label>
                            <div className="mt-2">
                                <MultiSelect
                                    disableSearch
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Почта
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="example@mail.ru"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Пароль
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    minLength="8"
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
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>
                    <p className="text-center mt-3">
                        <a
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                            onClick={() => navigate('/login')}
                        >
                            Авторизация
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
