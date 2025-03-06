import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/home";
import About from "./Components/About";
import Contact from "./Components/Content";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <><Navbar/><Home /></> },
    { path: "/About", element: <><Navbar/><About /></> },
    { path: "/Contact", element: <><Navbar/><Contact /></> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
