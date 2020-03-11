import React from 'react'
import {Navbar} from './components'
import Footer from './components/footer'
import Routes from './routes'
import SingleProduct from './components/SingleProduct'
import AllProducts from './components/AllProducts'
import ManageProducts from './components/admin-components/manage-products'
import {BrowserRouter as Router, Route} from 'react-router-dom'

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
