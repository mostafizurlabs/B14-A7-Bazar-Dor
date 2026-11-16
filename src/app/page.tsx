
import AllProductsSection from "@/components/AllProductsSection";
import HeroSection from "@/components/Hero";
import TopFallers from "@/components/TopFaller";
import TopRisers from "@/components/TopRisers";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TopRisers />
      <TopFallers />
      <AllProductsSection />
    </div>
  );
};

export default Home;