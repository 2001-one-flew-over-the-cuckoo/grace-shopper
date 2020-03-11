import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <section className="footer">
      <div className="one-col">
        <div className="footer-col">
          <div className="col-header">ABOUT</div>
          <div className="col-text">
            You probably haven't heard of them keytar pok pok, blog tacos
            chambray microdosing art party deep v blue bottle bitters
            distillery. You probably haven't heard of them keytar pok pok, blog
            tacos chambray microdosing art party deep v blue bottle bitters
            distillery.
          </div>
        </div>
      </div>

      <div className="two-cols">
        <div className="footer-col built-by-col">
          <div className="col-header">BUILT BY</div>
          <div className="col-text">
            <div className="team-member">
              <FontAwesomeIcon icon={faHeart} /> Caitlin Floyd
            </div>
            <div className="team-member">
              <FontAwesomeIcon icon={faHeart} /> Hilary Ly
            </div>
            <div className="team-member">
              <FontAwesomeIcon icon={faHeart} /> Nikki Morris
            </div>
            <div className="team-member">
              <FontAwesomeIcon icon={faHeart} /> Katherine Santiago
            </div>
          </div>
        </div>
        <div className="footer-col">
          <div className="col-header">LINKS</div>
          <div className="col-text">
            <Link to="/">FAQ</Link>
          </div>
          <div className="col-text">
            <Link to="/">Blog</Link>
          </div>
          <div className="col-text">
            <Link to="/">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
