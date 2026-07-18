import Hero from "../components/Hero";
import AISearch from "../components/AISearch";
import Categories from "../components/Categories";
import TrendingProducts from "../components/TrendingProducts";
import RecentlyViewed from "../components/RecentlyViewed";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <>
      <Hero />
      <AISearch />
      <Categories />
      <TrendingProducts />
      <RecentlyViewed />
      <FeaturedProducts />
    </>
  );
}

export default Home;