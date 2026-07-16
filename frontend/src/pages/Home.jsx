import Hero from "../components/Hero";
import AISearch from "../components/AISearch";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";

function Home() {
  return (
    <>
      <Hero />
      <AISearch />
      <Categories />
      <FeaturedProducts />
    </>
  );
}

export default Home;