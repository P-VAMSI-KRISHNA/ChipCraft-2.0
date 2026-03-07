import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoundsInfo from "@/components/RoundsInfo";
import HowItWorks from "@/components/HowItWorks";
import TeamSearch from "@/components/TeamSearch";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <RoundsInfo />
        <HowItWorks />
        <TeamSearch />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
