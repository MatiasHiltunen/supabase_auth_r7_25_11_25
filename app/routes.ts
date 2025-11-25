import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("chat", "./chat/chat.tsx"),
    layout("auth/layout.tsx", [

        route("login", "./auth/login.tsx"),
        route("logout", "./auth/logout.tsx"),
        route("register", "./auth/register.tsx"),
        
    ])
] satisfies RouteConfig;
