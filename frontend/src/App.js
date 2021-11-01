import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import NotFound from './components/NotFound';
import Shop from './components/pages/shop/Shop';
import SingleProduct from './components/single-product/SingleProduct';
import CartPage from './components/pages/cart-page/CartPage';
import About from './components/pages/about/About';
import Checkout from './components/checkout/Checkout';
import Success from './components/checkout/stripe-checkout/Success';
import Cancelled from './components/checkout/stripe-checkout/Cancelled';
import './App.scss';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={Shop} />
        <Route path='/product/:id' component={SingleProduct} />
        <Route path='/cart' component={CartPage} />
        <Route path='/about' component={About} />
        <Route path='/checkout' component={Checkout} />
        <Route path='/success' component={Success} />
        <Route path='/cancelled' component={Cancelled} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
