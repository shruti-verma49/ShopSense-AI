import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Temporary placeholder content so we can test sticky scroll behavior */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <p className="text-gray-400 text-sm">
          (Hero section and other content will go here in later checkpoints — scroll down to test the sticky navbar.)
        </p>
        <div className="h-[1500px]"></div>
      </div>
    </div>
  );
}

export default App;