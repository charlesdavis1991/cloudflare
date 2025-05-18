import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div >
      <ToastContainer />
      <div className="flex flex-row jusitfy-content">
      <Navigation />
      <main className="flex justify-center py-3 ml-56 w-[80%]">
        <Outlet />
      </main>
      </div>
    </div>
  );
};

export default App;
