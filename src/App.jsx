import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import UserDashboard, { UserHome } from "./Dashboards/User/User";
import Subcategory from "./components/User/Subcategories";
import Products from "./components/User/Products";
import Item from "./components/User/Item";
import AboutUs from "./components/User/AboutUs/AboutUs";
import Contact from "./components/User/Contact/contact";
import SearchResults from "./components/User/SearchResults";
import Login from "./components/Admin/Login";
import AdminDashboard from "./Dashboards/Admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserDashboard />}>
          <Route index element={<UserHome />} />

          <Route
            path="subcategory/:categoryName"
            element={<Subcategory />}
          />

          <Route
            path="products/:SubcategoryName"
            element={<Products />}
          />

          <Route
            path="products/:SubcategoryName/:itemName"
            element={<Item />}
          />

          <Route path="search" element={<SearchResults />} />

          <Route path="about" element={<AboutUs />} />

          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;