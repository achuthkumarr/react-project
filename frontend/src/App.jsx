import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import About from "./Components/About";
import Site from "./Components/Site";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import TopSection from "./Components/TopSection";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Profile from "./Components/Profile";
import Register from "./Components/Register";


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
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "profile", element: <Profile /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "logout", element:<Logout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;