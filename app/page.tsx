import HeroBanner from "@/components/Home/HeroBanner";
import StudentBanner from "@/components/Home/StudentBanner";
import DestinationScroller from "@/components/Home/DestinationScroller";
import FeaturedTour from "@/components/Home/FeaturedTour";
import TravellingNow from "@/components/Home/TravellingNow";
import FeatureCards from "@/components/Home/FeatureCards";
import KashmirPromo from "@/components/Home/KashmirPromo";
import ContinuePlan from "@/components/Home/ContinuePlan";
import EuropePromo from "@/components/Home/EuropePromo";
import PopularTours from "@/components/Home/PopularTours";
import WhyChooseUs from "@/components/Home/WhyChooseUs";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />
      <StudentBanner />
      <DestinationScroller />
      <ContinuePlan />
      <FeaturedTour />
      <TravellingNow />
      <FeatureCards />
      <KashmirPromo />
      <PopularTours />
      <EuropePromo />
      <WhyChooseUs />
    </div>
  );
};

export default Index;