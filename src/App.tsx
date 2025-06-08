import "./App.css";
import Footer from "./Footer/Footer";
import HomePage from "./HomePage/HomePage";
import NavigationBar from "./NavigationBar/NavigationBar";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen" data-theme="light">
        <main className="flex-grow">
          <NavigationBar />
          <HomePage />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
