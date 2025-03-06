import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Contact from "./Components/Content";
import Site from "./Components/Site";


function App() {
  const router = createBrowserRouter([
    { path: "/", element: <><Navbar/><Site /></> },
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