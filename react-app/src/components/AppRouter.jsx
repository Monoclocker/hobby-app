import Login from '../pages/auth/Login.jsx';
import Registration from '../pages/auth/Registration.jsx';
import RootMain from '../pages/main/RootMain.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GroupList from '../pages/main/GroupList.jsx';
import Navbar from './Navbar.jsx';

const AppRouter = () => {
    const routes = [
<<<<<<< HEAD
        { path: '/login', component: <Login />, exact: true },
        { path: '/register', component: <Registration />, exact: true },
        { path: '/*', component: <RootMain />, exact: true },
    ];
=======
        {path: '/login', component: <Login/>, exact: true},
        {path: '/register', component: <Registration/>, exact: true},
        {path: '/*', component: <RootMain/>, exact: true},
    ]
>>>>>>> 5afd8c7cda7c06de0f2c7bac1c602ad8f3b5e15b

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => (
                    <Route element={route.component} path={route.path} />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
