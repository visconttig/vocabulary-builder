import HomePage from "../src/components/homePage/HomePage.component.jsx";

console.log(`*** WORKING MODE ***\n ${process.env.REACT_APP_ENVIROMENT} ***`);

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
