import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";

export const metadata = {
  title: "PathlyX - V1.0",
  description: "Orders management system.",
};

const HeroSection = lazy(() => import("./components/HeroSection"));

export default function Home() {
  return (
    <div>
      <Navbar />

      <Suspense
        fallback={
          <div className="text-center text-purple-500 mt-24">
            Loading...
          </div>
        }
      >
        <HeroSection />
      </Suspense>

      <ScrollToTop />
    </div>
  );
}