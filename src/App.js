import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/AllCourses";
import Profile from "./pages/Profile";
import AddNewCourse from "./pages/AddNewCourse";
import CurrentUserCourse from "./pages/CurrentUserCourse";
import ProductInfo from "./pages/ProductInfo";
import Cart from "./pages/Cart";
import CourseDetail from "./pages/CourseDetail";
import LoadingOverlay from "./components/LoadingOverlay";
import { useState, useEffect } from "react";
import AuthService from "./services/auth.service";
import "./styles/style.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import OrderService from "./services/order.service";

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (loadingState) => {
    setIsLoading(loadingState);
  };

  useEffect(() => {
    if (currentUser && currentUser.foundUser) {
      handleLoading(true);
      OrderService.findCurrentUserCart()
        .then((response) => {
          const count = response.data?.courses?.length || 0;
          setCartItemCount(count);
        })
        .catch(() => {
          setCartItemCount(0);
        })
        .finally(() => {
          handleLoading(false);
        });
    } else {
      setCartItemCount(0);
    }
  }, [currentUser]);

  return (
    <BrowserRouter>
      <LoadingOverlay isLoading={isLoading} />
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              cartItemCount={cartItemCount}
            />
          }
        >
          <Route
            index
            element={
              <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
            }
          />
          <Route path="Register" element={<Register />} />
          <Route
            path="Login"
            element={
              <Login
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                handleLoading={handleLoading}
              />
            }
          />
          <Route
            path="Courses"
            element={
              <Courses
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                handleLoading={handleLoading}
              />
            }
          />
          <Route
            path="Profile"
            element={
              <Profile
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                handleLoading={handleLoading}
              />
            }
          />
          <Route
            path="AddNewCourse"
            element={
              <AddNewCourse
                currentUser={currentUser}
                handleLoading={handleLoading}
              />
            }
          />
          <Route
            path="CurrentUserCourse"
            element={
              <CurrentUserCourse
                currentUser={currentUser}
                handleLoading={handleLoading}
              />
            }
          />
          <Route
            path="ProductInfo"
            element={
              <ProductInfo
                currentUser={currentUser}
                cartItemCount={cartItemCount}
                setCartItemCount={setCartItemCount}
              />
            }
          />
          <Route
            path="Cart"
            element={
              <Cart
                currentUser={currentUser}
                cartItemCount={cartItemCount}
                setCartItemCount={setCartItemCount}
                handleLoading={handleLoading}
              />
            }
          />
          <Route
            path="CourseDetail"
            element={
              <CourseDetail
                currentUser={currentUser}
                handleLoading={handleLoading}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
