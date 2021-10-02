import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/home";
import { Footer } from "./components/Footer";
import { AboutUs } from "./pages/about.js";
import { Product } from "./pages/product.js";
import { Services } from "./pages/services";
import { Details } from "./pages/details.js";
import { Companies } from "./pages/companies";
import { Contact } from "./pages/contact";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={AboutUs} />
      {/* <Route path="/products" exact component={Product}/> */}
      <Route path="/services" exact component={Services} />
      <Route path="/products" exact component={Companies} />
      <Route path="/services/:type/:name" exact component={Details} />
      <Route path="/products/:type/:name" exact component={Details} />
      <Route path="/contact" exact component={Contact} />
      {/* <Footer/>  */}
    </BrowserRouter>
  );
}

export default App;
