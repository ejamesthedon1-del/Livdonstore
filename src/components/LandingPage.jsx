import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiSearch, FiShoppingBag } from 'react-icons/fi'
import HeroSection from './HeroSection'
import ImageSlider from './ImageSlider'
import Footer from './Footer'
import MobileMenu from './MobileMenu'

const LandingPage = ({ onNavigateToProducts, onNavigateToContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0) // Cart items count

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
              <img src="/Asset_1.png.webp" alt="LIVDON" className="a-logo__img" />
            </a>
          </h1>
          
          {/* Desktop Header Controls */}
          <div className="g-header-desktop">
            <button type="button" className="a-search a-search--desktop" aria-label="SEARCH">
              <FiSearch className="w-5 h-5" />
            </button>
            {cartItemCount > 0 && (
              <div className="minicart">
                <a className="a-btn a-btn--as-link minicart-link a-cart" href="#cart">
                  <FiShoppingBag className="w-5 h-5" />
                  <span className="a-cart__infos">
                    SHOPPING BAG (<span className="minicart-quantity a-cart__quantity">{cartItemCount}</span>)
                  </span>
                </a>
              </div>
            )}
          </div>
          
          {/* Mobile Header Controls */}
          <div className="g-header-mobile">
            {cartItemCount > 0 && (
              <div className="minicart">
                <a className="a-btn a-btn--as-link minicart-link a-cart" href="#cart">
                  <FiShoppingBag className="w-5 h-5" />
                  <span className="a-cart__infos a-cart__infos--mobile">
                    (<span className="minicart-quantity a-cart__quantity">{cartItemCount}</span>)
                  </span>
                </a>
              </div>
            )}
            
            {/* Search Icon - Show when scrolled */}
            {isScrolled && (
              <button type="button" className="a-search a-search--mobile-scrolled" aria-label="SEARCH">
                <FiSearch className="w-5 h-5" />
              </button>
            )}
            
            {/* Hamburger Menu - Mobile Only, Right Side */}
            <button
              type="button"
              className="a-ham a-ham--mobile-only"
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
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          cartItemCount={cartItemCount}
          onNavigateToContact={onNavigateToContact}
        />
        <div className="a17-grid__right">
          <div className="home-main homepage">
            <HeroSection onNavigateToProducts={onNavigateToProducts} />
            <ImageSlider />
          </div>
        </div>
      </main>

      <Footer onNavigateToContact={onNavigateToContact} />
    </div>
  )
}

export default LandingPage
