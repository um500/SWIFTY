import HeroBanner from "@/components/Home/HeroBanner";
import StudentBanner from "@/components/Home/StudentBanner";
import DestinationScroller from "@/components/Home/DestinationScroller";
import FeaturedTour from "@/components/Home/FeaturedTour";
import TravellingNow from "@/components/Home/TravellingNow";
import FeatureCards from "@/components/Home/FeatureCards";
import ContinuePlan from "@/components/Home/ContinuePlan";
import CountryPromo from "@/components/Home/CountryPromo";
import PopularTours from "@/components/Home/PopularTours";
import Reviews from"@/components/Home/review";
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
      <CountryPromo />
      <PopularTours />
      <Reviews />
      <WhyChooseUs />
    </div>
  );
};

export default Index;