import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "FullStack Example" }
  ];
}

export default function Home() {
  return <h1>Koti</h1>;
}
