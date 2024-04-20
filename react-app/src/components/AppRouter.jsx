import Login from '../pages/auth/Login.jsx';
import Registration from '../pages/auth/Registration.jsx';
import RootMain from '../pages/main/RootMain.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    const routes = [
        { path: '/login', component: <Login />, exact: true },
        { path: '/register', component: <Registration />, exact: true },
        { path: '/*', component: <RootMain />, exact: true },
    ];

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
