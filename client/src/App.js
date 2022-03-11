import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState'
import Header from './components/headers/Header';
import MainPages from './components/mainpages/Pages'
import Footer from "./components/Footer/Footer";




function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">

          <Header />

          <MainPages />

          <Footer />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
