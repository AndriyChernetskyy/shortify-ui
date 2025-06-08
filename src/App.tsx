import "./App.css";
import HomePage from "./HomePage/HomePage";
import NavigationBar from "./NavigationBar/NavigationBar";

function App() {
  return (
    <>
      <div data-theme="light">
        <NavigationBar />
        <HomePage />
      </div>
    </>
  );
}

export default App;
