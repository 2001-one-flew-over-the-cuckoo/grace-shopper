import React from 'react'

const Hero = () => {
  return (
    // <div className="hero-container">
    //   <div className="hero-img"></div>
    //   <div className="hero-text">HERO TEXT</div>
    // </div>

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
          <button type="button" className="hero-button">
            Click Here
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
