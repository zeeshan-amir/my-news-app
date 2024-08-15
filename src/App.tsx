import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Preferences from './pages/Preferences';
import Header from './components/Header';
import Footer from './components/Footer';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import spinnerSvc from './utils/loader-service';
import LoaderSpinner from './components/Loader/Loader';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscription = spinnerSvc.requestInProgress.subscribe(data => {
      setLoading(data);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <>
      <ToastContainer />

      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/preferences" element={<Preferences />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>

      {loading && <LoaderSpinner />}
    </>
  );
};

export default App;
