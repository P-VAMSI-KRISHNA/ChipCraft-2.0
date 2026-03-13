import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoundsInfo from "@/components/RoundsInfo";
import HowItWorks from "@/components/HowItWorks";
import Rubrics from "@/components/Rubrics";
import Guidelines from "@/components/Guidelines";
import TeamSearch from "@/components/TeamSearch";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <RoundsInfo />
        <HowItWorks />
        <Rubrics />
        <Guidelines />
        <TeamSearch />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

