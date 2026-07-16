import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AISearch from "./components/AISearch";
import Categories from "./components/Categories";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <AISearch />
      <Categories />
    </div>
  );
}

export default App;