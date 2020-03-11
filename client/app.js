import React from 'react'
import {Navbar} from './components'
import Footer from './components/footer'
import Routes from './routes'

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
