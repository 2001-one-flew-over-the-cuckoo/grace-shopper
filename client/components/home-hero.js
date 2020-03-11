import React from 'react'
import {Link} from 'react-router-dom'

const HomeHero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-copy">
          <h1 className="hero-title">HERO TITLE</h1>
          <h2 className="hero-subtitle">
            Ennui flannel street art affogato +1 vegan cliche single-origin
            coffee food truck freegan. Green juice pinterest succulents,
            waistcoat ramps aesthetic tilde shabby chic kogi next level
            activated charcoal prism.{' '}
          </h2>
          <Link to="/products">
            <button type="button" className="hero-button">
              View products
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeHero
