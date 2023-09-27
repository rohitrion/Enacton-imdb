import { Layout } from "../Layout";
import Home from "../pages/Home";
import Watchlist from "../pages/Watchlist";
import Signup from "../Firebase/Signup";
import Error from "../pages/Error";
import Singlemovie from "../pages/Singlemovie";
import Login from "../Firebase/Login";
import Footer from "../Component/Footer";
import Movielist from "../Component/Movielist";
import Toprated from "../Component/Toprated";
import Carousal from "../Component/Carousal";

const routes = [
  {
    path: "/",
    element: (
      <Layout isShow={true}>
        {/* <Carousal />
        <Movielist />
        <Toprated /> */}
        <Home/>
      </Layout>
    ),
    isLogin: false,
  },
  {
    path: "/watchlist",

    element: (
      <Layout isShow={true}>
        <Watchlist />
      </Layout>
    ),
    isLogin: true,
  },
  {
    path: "/login",
    element: (
      <Layout isShow={true}>
        <Login />
      </Layout>
    ),
    isLogin: false,
  },
  {
    path: "/signup",
    element: (
      <Layout isShow={true}>
        <Signup />
      </Layout>
    ),
    isLogin: false,
  },
  {
    path: "/*",
    element: (
      <Layout isShow={true}>
        <Error />
      </Layout>
    ),
    isLogin: false,
  },

  {
    path: "/movie/:id",
    element: (
      <Layout isShow={false}>
        <Singlemovie />
      </Layout>
    ),
    isLogin: false,
  },
];

export { routes, Footer };
