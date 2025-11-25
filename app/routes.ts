import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("./routes/home.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("chat", "./chat/chat.tsx"),
    route("login", "./auth/login.tsx")

] satisfies RouteConfig;
