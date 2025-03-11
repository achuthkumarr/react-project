import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Site from "./Components/Site";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import TopSection from "./Components/TopSection";
import Login from "./Components/Login";


function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopSection />
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* This will render the current route component */}
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Site /> },
      { path: "About", element: <About /> },
      { path: "Contact", element: <Contact /> },
      { path: "Login", element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;