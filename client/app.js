import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import SingleProduct from './components/SingleProduct'
import AllProducts from './components/AllProducts'
import ManageProducts from './components/admin-components/manage-products'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <Route exact path="/products" component={AllProducts} />
      <Route exact path="/products/:productId" component={SingleProduct} />
      <Route
        exact
        path="/products/:productId/edit"
        component={ManageProducts}
      />
    </div>
  )
}

export default App
