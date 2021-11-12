import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Records } from "./pages/home";
import { Archives } from "./pages/archives";
// import { Footer } from "./components/Footer";
// import { Time } from "./pages/timeSeries";
import Signin from "./auth/signin";
import Signup from "./auth/signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./auth/private_route";
import AdminRoute from "./auth/adminroute";
import Users from "./pages/users.";
import { History } from "./pages/history";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <PrivateRoute path="/" exact component={Records} />
        <AdminRoute path="/users" exact component={Users} />
        {/* <Route path="/products" exact component={Product}/> */}
        {/* <PrivateRoute path="/time" exact component={Time} /> */}
        <PrivateRoute path="/archives" exact component={Archives} />
        <PrivateRoute path="/history" exact component={History} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        {/* <Footer/>  */}
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
