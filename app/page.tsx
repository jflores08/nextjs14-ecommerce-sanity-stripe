// Import Next Components
import Image from "next/image";

// Import local components
import Hero from "./components/Hero";
import Newest from "./components/Newest";

export default function Home() {
  return (
    <main>
      <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
        <Hero />
        <Newest />
      </div>
    </main>
  );
}
