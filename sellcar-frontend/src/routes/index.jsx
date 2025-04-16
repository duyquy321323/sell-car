import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import ChatCar from "../components/ChatCar";
import Layout from "../layout";
import DetailCar from "../pages/DetailCar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import CreateNews from "../pages/CreateNews";
import News from "../pages/News";

const Routers = () => {
    const userData = useSelector(state => state.accountReducer);
    // const userData = true;
    const routes = useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: userData? <Navigate to="/home" replace /> : <Navigate to={"/login"}/>
                },
                {
                    path: '/detail/:id',
                    element: <DetailCar/>
                },
                {
                    path: '/chat-car',
                    element: <ChatCar/>
                },
                {
                    path: '/login',
                    element: <Login/>
                },
                {
                    path: '/home',
                    element: <Home/>
                },
                {
                    path: '/register',
                    element: <Register/>
                },
                {
                    path: '/add-news',
                    element: <CreateNews/>
                },
                {
                    path: '/news',
                    element: <News/>
                },
                {
                    path: '*',
                    element: <NotFound/>
                }
            ]
        },
    ])
    return routes;
}

export default Routers;