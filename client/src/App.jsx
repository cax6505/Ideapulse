import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const isLandingPage = location.pathname === "/" && !isLoggedIn;

  return (
    <Provider store={store}>
      {isLandingPage ? (
        <div className="w-full flex flex-col min-h-screen bg-[#f7f4ea]">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer isLanding={true} />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto px-2 flex flex-col min-h-screen">
          <Navbar />
          <main className="mt-8 flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
    </Provider>
  );
}

export default App;
