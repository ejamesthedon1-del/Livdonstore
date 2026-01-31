import { useState, useEffect } from 'react'
import { FiMenu, FiSearch, FiShoppingBag } from 'react-icons/fi'
import Footer from './Footer'

const ContactPage = ({ onBack }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
            <a href="/" className="a-logo" title="LIVDON | HOMEPAGE" onClick={(e) => { e.preventDefault(); onBack && onBack() }}>
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
            <div className="o-contact-page">
              {/* Client Service Hours */}
              <div className="m-contact-info">
                <p className="m-contact-info__hours f-body">
                  THE LIVDON CLIENT SERVICE IS OPEN FROM MONDAY TO FRIDAY, 10 AM TO 7 PM (EASTERN TIME), EXCLUDING HOLIDAYS.
                </p>
              </div>

              {/* Contact Details */}
              <div className="m-contact-details">
                <div className="m-contact-details__item">
                  <h3 className="m-contact-details__label f-body--em">PHONE</h3>
                  <p className="m-contact-details__value f-body">
                    <a href="tel:+18338474860" className="m-contact-details__link">+1 833 847 4860</a>
                  </p>
                </div>

                <div className="m-contact-details__item">
                  <h3 className="m-contact-details__label f-body--em">CUSTOMER SERVICE</h3>
                  <p className="m-contact-details__value f-body">
                    <a href="mailto:clientservice.us@livdon.com" className="m-contact-details__link">CLIENTSERVICE.US@LIVDON.COM</a>
                  </p>
                </div>

                <div className="m-contact-details__item">
                  <h3 className="m-contact-details__label f-body--em">CONTACT FORM</h3>
                  <p className="m-contact-details__value f-body">
                    <a href="#contact-form" className="m-contact-details__link m-contact-details__link--action">SEND INQUIRY</a>
                  </p>
                </div>

                <div className="m-contact-details__item">
                  <h3 className="m-contact-details__label f-body--em">REQUEST AN APPOINTMENT</h3>
                  <p className="m-contact-details__value f-body">
                    <a href="#appointment" className="m-contact-details__link m-contact-details__link--action">SELECT A STORE</a>
                  </p>
                </div>
              </div>

              {/* Store Image */}
              <div className="m-contact-image">
                <div className="a-ratio-box a-ratio-box--4:5">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEyNTAiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4="
                    alt="LIVDON Store Interior"
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage
