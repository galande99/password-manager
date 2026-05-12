import { useState } from "react";
import Navbar from "./componets/navbar";
import "./App.css";
import Manager from "./componets/Manager";
import Footer from "./componets/Footer";
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
         
        />

      <div className="min-h-[87vh]">
        <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
