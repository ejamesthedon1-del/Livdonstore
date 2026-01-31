import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiSearch, FiShoppingBag } from 'react-icons/fi'
import ProductTile from './ProductTile'
import Footer from './Footer'

const ProductListingPage = ({ onBack }) => {
  const [showInStockOnly, setShowInStockOnly] = useState(false)
  const [sortBy, setSortBy] = useState('SUGGESTED')
  const [showFilters, setShowFilters] = useState(false)
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

  // Sample product data
  const products = [
    {
      id: 1,
      title: 'SOFT SHOPPER BAG IN Triomphe Canvas and Calfskin',
      color: 'TAN',
      price: '1,950',
      link: '#product-1',
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      ],
      inStock: true,
    },
    {
      id: 2,
      title: 'CLASSIC TRIOMPHE BAG IN Calfskin',
      color: 'BLACK',
      price: '2,100',
      link: '#product-2',
      images: [
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      ],
      inStock: true,
    },
    {
      id: 3,
      title: 'TRIOMPHE CANVAS SHOULDER BAG',
      color: 'BEIGE',
      price: '1,800',
      link: '#product-3',
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      ],
      inStock: true,
    },
    {
      id: 4,
      title: 'SOFT 16 BAG IN Calfskin',
      color: 'BROWN',
      price: '2,300',
      link: '#product-4',
      images: [
        'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      ],
      inStock: true,
    },
    {
      id: 5,
      title: 'TRIOMPHE CANVAS CROSSBODY BAG',
      color: 'NAVY',
      price: '1,650',
      link: '#product-5',
      images: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      ],
      inStock: true,
    },
    {
      id: 6,
      title: 'CLASSIC BOX BAG IN Calfskin',
      color: 'RED',
      price: '2,500',
      link: '#product-6',
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      ],
      inStock: false,
    },
    {
      id: 7,
      title: 'SOFT TRIOMPHE BAG IN Calfskin',
      color: 'WHITE',
      price: '1,900',
      link: '#product-7',
      images: [
        'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      ],
      inStock: true,
    },
    {
      id: 8,
      title: 'TRIOMPHE CANVAS TOTE BAG',
      color: 'GREEN',
      price: '1,750',
      link: '#product-8',
      images: [
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      ],
      inStock: true,
    },
  ]

  // Filter and sort products
  let filteredProducts = showInStockOnly
    ? products.filter((p) => p.inStock)
    : products

  if (sortBy === 'PRICE LOW TO HIGH') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/,/g, ''))
      const priceB = parseInt(b.price.replace(/,/g, ''))
      return priceA - priceB
    })
  } else if (sortBy === 'PRICE HIGH TO LOW') {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/,/g, ''))
      const priceB = parseInt(b.price.replace(/,/g, ''))
      return priceB - priceA
    })
  }

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
            <div className="o-search" data-behavior="oSearch">
              {/* Breadcrumb */}
              <div className="m-breadcrumb m-breadcrumb--inline" data-behavior="mBreadcrumb">
                <div className="m-breadcrumb__items">
                  <div className="m-breadcrumb__item f-body--em">
                    <h1>NEW COLLECTION WOMEN</h1>
                  </div>
                </div>
              </div>

              {/* Filters Header */}
              <div className="m-filters" data-behavior="mFilterSticky">
                <div className="m-filters__header">
                  <ul className="m-filters__header-ctas f-body">
                    <li>
                      <div className="m-field m-field--checkbox m-field--availableOnline" data-behavior="mField">
                        <input
                          type="checkbox"
                          id="availableOnline"
                          name="availableOnline"
                          checked={showInStockOnly}
                          onChange={(e) => setShowInStockOnly(e.target.checked)}
                          className="m-field__input"
                        />
                        <label className="m-field__label m-field__label--checkbox" htmlFor="availableOnline">
                          IN STOCK ONLINE
                        </label>
                      </div>
                    </li>

                    <li className="g-selectors" data-behavior="oSorting">
                      <p className="a-btn a-btn--as-link g-selectors--open" id="sorting-btn" data-label="Sort By">
                        Sort By
                      </p>
                      <select
                        className="g-selectors--menu"
                        aria-labelledby="sorting-btn"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="SUGGESTED">SUGGESTED</option>
                        <option value="PRICE LOW TO HIGH">PRICE LOW TO HIGH</option>
                        <option value="PRICE HIGH TO LOW">PRICE HIGH TO LOW</option>
                      </select>
                    </li>

                    <li>
                      <button
                        type="button"
                        className="a-btn a-btn--as-link"
                        onClick={() => setShowFilters(!showFilters)}
                        aria-controls="filtersPanel"
                      >
                        FILTERS
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Product Grid */}
              <ul className="o-listing-grid" data-behavior="oListingGrid">
                {filteredProducts.map((product) => (
                  <ProductTile key={product.id} product={product} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ProductListingPage
