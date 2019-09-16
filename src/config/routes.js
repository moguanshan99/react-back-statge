import Home from "@comps/home";
import Login from "@conts/login";

const routes=[
    {
        path:"/",
        exact:true,
        component:Home
},
    {
        path:"/login",
        exact:true,
        component:Login
    }
];

export default routes;