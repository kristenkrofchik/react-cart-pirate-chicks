import { Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import NotFound from './components/NotFound';
import Shop from './components/pages/shop/Shop';
import SingleProduct from './components/single-product/SingleProduct';
import './App.scss';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/shop' component={Shop} />
        <Route path='/product/:id' component={SingleProduct} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
