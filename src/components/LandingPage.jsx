import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiSearch, FiShoppingBag } from 'react-icons/fi'
import HeroSection from './HeroSection'
import ImageSlider from './ImageSlider'
import Footer from './Footer'

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle scroll detection for mobile search
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className="min-h-screen bg-white">
      {/* CELINE-style Header */}
      <header id="header">
        <div className="g-header-logo">
          <h1>
            <a href="/" className="a-logo" title="LIVDON | HOMEPAGE">
              LIVDON
            </a>
          </h1>
          
          {/* Desktop Header Controls */}
          <div className="g-header-desktop">
            <button type="button" className="a-search a-search--desktop" aria-label="SEARCH">
              <FiSearch className="w-5 h-5" />
            </button>
            <div className="minicart minicart--s-empty">
              <a className="a-btn a-btn--as-link minicart-link a-cart a-cart--s-empty" href="#cart">
                <FiShoppingBag className="w-5 h-5" />
                <span className="a-cart__infos">
                  SHOPPING BAG (<span className="minicart-quantity a-cart__quantity">0</span>)
                </span>
              </a>
            </div>
          </div>
          
          {/* Mobile Header Controls */}
          <div className="g-header-mobile">
            <div className="minicart minicart--s-empty">
              <a className="a-btn a-btn--as-link minicart-link a-cart a-cart--s-empty" href="#cart">
                <FiShoppingBag className="w-5 h-5" />
                <span className="a-cart__infos a-cart__infos--mobile">
                  (<span className="minicart-quantity a-cart__quantity">0</span>)
                </span>
              </a>
            </div>
            
            {/* Search Icon - Show when scrolled */}
            {isScrolled && (
              <button type="button" className="a-search a-search--mobile-scrolled" aria-label="SEARCH">
                <FiSearch className="w-5 h-5" />
              </button>
            )}
            
            {/* Hamburger Menu - Mobile Only, Right Side */}
            <button
              type="button"
              className="a-ham a-ham--mobile-only a-ham--right"
              aria-pressed={isMenuOpen}
              onClick={toggleMenu}
              aria-label="NAVIGATION"
            >
              <span className={`a-ham__menu ${isMenuOpen ? 'a-ham__menu--close' : ''}`}></span>
              <span className={`a-ham__menu ${isMenuOpen ? 'a-ham__menu--close' : ''}`}></span>
              <span className={`a-ham__menu ${isMenuOpen ? 'a-ham__menu--close' : ''}`}></span>
            </button>
          </div>
        </div>
        
        {/* Mobile Search Input - Below Header */}
        <div className={`g-header-search-mobile ${isScrolled ? 'g-header-search-mobile--hidden' : ''}`}>
          <input
            type="text"
            placeholder="SEARCH"
            className="g-header-search-input"
            aria-label="Search"
          />
        </div>
      </header>

      {/* Mobile Backdrop Mask */}
      {isMenuOpen && (
        <div
          className="o-sidebar-nav__mask"
          onClick={() => setIsMenuOpen(false)}
          aria-label="CLOSE"
        ></div>
      )}

      {/* Main Content with CELINE Grid System */}
      <main id="content" className={`a17-grid ${isScrolled ? 'main--scrolled' : ''}`}>
        {/* Left Sidebar Navigation */}
        <div className={`a17-grid__left o-sidebar-nav ${isMenuOpen ? 'o-sidebar-nav--open' : ''}`}>
          <nav className="o-sidebar-nav__nav" aria-labelledby="sidebar-nav-label">
            <p className="sr-only" id="sidebar-nav-label">SIDEBAR NAVIGATION</p>
            <ul className="o-sidebar-nav__list">
              <li>
                <a
                  href="#shop"
                  className="a-btn a-btn--as-link o-sidebar-nav__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SHOP
                </a>
              </li>
              <li>
                <a
                  href="#collections"
                  className="a-btn a-btn--as-link o-sidebar-nav__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  COLLECTIONS
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="a-btn a-btn--as-link o-sidebar-nav__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="a-btn a-btn--as-link o-sidebar-nav__link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="a17-grid__right">
          <div className="home-main homepage">
            <HeroSection />
            <ImageSlider />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default LandingPage
