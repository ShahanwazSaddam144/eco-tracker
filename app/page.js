import CausesAndEffect from "./components/CausesAndEffect";
import Hero from "./components/Hero";
import LiveStatsSection from "./components/LiveStats";
import Navbar from "./components/Navbar";
import Tracker from "./components/Tracker";
import Badges from "./components/badges";


export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <CausesAndEffect />
    <Tracker />
    <LiveStatsSection />
    <Badges />
    </>
  );
}
