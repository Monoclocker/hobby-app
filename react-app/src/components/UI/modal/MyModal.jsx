import React, { useEffect, useState } from 'react';
import cl from './MyModal.module.css';
import { MultiSelect } from 'react-multi-select-component';
import RequestService from '../../../api/RequestService.js';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const MyModal = ({ children, firstVisible, setFirstVisible }) => {
    console.log(children, 228);
    const navigate = useNavigate();

    const [data, setData] = useState(children);
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState('');

    const options = [
        { label: 'Активный отдых', value: 'Активный отдых' },
        { label: 'Вечеринки', value: 'Вечеринки' },
        { label: 'Алкоголь', value: 'Алкоголь' },
        { label: 'Спорт', value: 'Спорт' },
        { label: 'Кофе', value: 'Кофе' },
        { label: 'Настольные игры', value: 'Настольные игры' },
        { label: 'Квесты', value: 'Квесты' },
        { label: 'Книги', value: 'Книги' },
        { label: 'Кино', value: 'Кино' },
    ];
    // , Вечеринки, Алкоголь, Спорт, Кофе, Настольные игры, Квесты, Кино, Книги
    const [selected, setSelected] = useState([]);
    const rootClassesFirst = [cl.myModal];

    const handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0]);
        let image_as_files = e.target.files[0];
        setPhoto({
            image_preview: image_as_base64,
            image_file: image_as_files,
        });
    };

    const getData = (e) => {
        e.preventDefault();
        selected.map((item) => {
            data.interests.push(item.value);
        });
        if (photo) {
            data.photo = photo.image_preview;
        }
        data.links = data.links.split(' ');
        try {
            const response = RequestService.updateProfile(data);
            response.then((val) => {
                if (val.status === 200) {
                    setMessage('Ваш профиль успешно отредактирован');
                    window.location.reload();
                }
            });
        } catch (e) {
            if (e.response.status === 401) {
                const refresh = async () => {
                    await RequestService.refreshToken();
                };
                console.log(refresh());
            } else {
                console.log(e);
                alert('Сервис временно недоступен :(');
                navigate('/login');
            }
        }
    };

    if (firstVisible) {
        rootClassesFirst.push(cl.active);
    }

    return (
        <div onClick={() => setFirstVisible(false)} className={rootClassesFirst.join(' ')}>
            <form onSubmit={getData}>
                <div onClick={(e) => e.stopPropagation()} className={cl.myModalContent}>
                    <div className="border-b border-gray-900/10 pb-6">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Редактирование профиля 💫</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Эта информация будет доступна всем, так что будьте осторожны :).
                        </p>
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full border-b border-gray-900/10">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Обо мне
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        value={data.about}
                                        id="about"
                                        name="about"
                                        rows="3"
                                        onChange={(e) => setData({ ...data, about: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    ></textarea>
                                </div>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Расскажите о себе 🙃</p>
                            </div>

                            <div className="col-span-full">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium leading-1 text-gray-900"
                                >
                                    Фото 📸
                                </label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-7 py-5">
                                    <div className="text-center">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        <div className="mt-1 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Загрузите файл</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    onChange={(e) => handleImagePreview(e)}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">или перетащите</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF до 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-6">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Личная информация</h2>
                        <div className="mt-1 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Возраст
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={data.age}
                                        id="email"
                                        name="email"
                                        type="number"
                                        autoComplete="email"
                                        onChange={(e) => setData({ ...data, age: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="mt-1 sm:col-span-4 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Город
                                </label>
                                <div className="mt-100">
                                    <input
                                        value={data.cityName}
                                        type="text"
                                        name="city"
                                        id="city"
                                        autoComplete="address-level2"
                                        onChange={(e) => setData({ ...data, cityName: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="mt-3 sm:col-span-4">
                                <label htmlFor="sm" className="block text-sm font-medium leading-6 text-gray-900">
                                    Ссылки на соц. сети (введите через пробел)
                                </label>
                                <div>
                                    <input
                                        value={data.links}
                                        id="sm"
                                        name="sm"
                                        type="url"
                                        autoComplete="username webauthn"
                                        onChange={(e) => setData({ ...data, links: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Интересы</h2>
                        <div className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                            <div className="sm:col-span-4 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                    Выберите то, чем любите заниматься 🔥
                                </label>
                                <div className="mt-100">
                                    <div className="container mx-auto mt-1">
                                        <MultiSelect
                                            disableSearch
                                            options={options}
                                            value={selected}
                                            onChange={setSelected}
                                            labelledBy="Select"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Отмена
                    </button>
                    <button
                        onClick={(e) => {
                            getData(e);
                        }}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Далее
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyModal;
