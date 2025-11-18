import Image from "next/image";
import { HomePage } from "./pages/home/page";
import AboutPage from "./pages/about/page";

export default function Home() {
  return (
    <div
    className="h-auto"
    >
        <HomePage />
    </div>
  );
}
