import { useState, useEffect } from 'react'
import { FiMenu, FiSearch, FiShoppingBag } from 'react-icons/fi'
import ProductGallery from './ProductGallery'
import ProductSelectors from './ProductSelectors'
import Footer from './Footer'
import MobileMenu from './MobileMenu'

const ProductDetailPage = ({ productId, onBack, onNavigateToContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)

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

  // Sample product data - in a real app, this would come from an API based on productId
  const greyPlaceholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEwMDAiIGZpbGw9IiNlNWU1ZTUiLz48L3N2Zz4='
  
  const product = {
    id: productId || 1,
    title: 'COLONNE JACKET IN DIAGONAL WOOL',
    price: '3,450',
    images: [
      greyPlaceholder,
      greyPlaceholder,
      greyPlaceholder,
      greyPlaceholder,
      greyPlaceholder,
      greyPlaceholder,
      greyPlaceholder,
      greyPlaceholder,
      greyPlaceholder,
      greyPlaceholder,
    ],
    colors: [
      { name: 'CARAMEL', hex: '#985F39', url: '#', disabled: false },
      { name: 'BLACK', hex: '#000000', url: '#', disabled: false },
      { name: 'VERT BOUTEILLE', hex: '#2D3F2C', url: '#', disabled: false },
      { name: 'NAVY', hex: '#131823', url: '#', disabled: false },
    ],
    sizes: [
      { value: '34', disabled: false },
      { value: '36', disabled: false },
      { value: '38', disabled: false },
      { value: '40', disabled: false },
      { value: '42', disabled: false },
      { value: '44', disabled: false },
    ],
  }

  // Set default selected color
  useEffect(() => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0].name)
    }
  }, [product.colors, selectedColor])

  const handleAddToBag = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    // Add to cart logic here
    setCartItemCount((prev) => prev + 1)
    alert(`Added to bag: ${product.title} - ${selectedColor} - Size ${selectedSize}`)
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    // Buy now logic here
    alert(`Buy Now: ${product.title} - ${selectedColor} - Size ${selectedSize}`)
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
            
            {isScrolled && (
              <button type="button" className="a-search a-search--mobile-scrolled" aria-label="SEARCH">
                <FiSearch className="w-5 h-5" />
              </button>
            )}
            
            <button
              type="button"
              className="a-ham"
              onClick={toggleMenu}
              aria-pressed={isMenuOpen}
              aria-controls="main-navigation"
              aria-label="NAVIGATION"
            >
              <span className="a-ham__menu"></span>
              <span className="a-ham__close"></span>
              <span className="sr-only">NAVIGATION</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {!isScrolled && (
          <div className="g-header-search-mobile">
            <input
              type="text"
              placeholder="SEARCH"
              className="g-header-search-input"
              aria-label="Search"
            />
          </div>
        )}
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
            {/* Breadcrumb */}
            <div className="m-breadcrumb m-breadcrumb--inline" data-behavior="mBreadcrumb">
              <div className="m-breadcrumb__items">
                <div className="m-breadcrumb__item f-body--em">
                  <a href="#" onClick={(e) => { e.preventDefault(); onBack && onBack() }}>NEW COLLECTION WOMEN</a>
                </div>
              </div>
            </div>

            {/* Product Section */}
            <section className="o-product product-detail" data-pid={product.id}>
              <div className="o-product__product">
                {/* Product Gallery */}
                <ProductGallery images={product.images} productTitle={product.title} />

                {/* Product Meta */}
                <div className="o-product__meta" data-oproductscroll-meta="">
                  {/* Product Header */}
                  <div className="o-product__header" data-oproductscroll-header="">
                    <div className="o-product__header-meta">
                      <div className="o-product__header-titles">
                        <h1 className="o-product__title f-body">
                          <span className="o-product__title-truncate f-body">{product.title}</span>
                        </h1>
                        <p className="f-body--em">
                          <span className="prices">
                            <strong data-description="value" className="f-body--em" content={product.price.replace(/,/g, '')}>
                              {product.price} USD
                            </strong>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="o-product__content" data-oproductscroll-content="">
                    <form className="o-form o-form--selectors s-appears-complete" id="form-product">
                      <ProductSelectors
                        colors={product.colors}
                        sizes={product.sizes}
                        selectedColor={selectedColor}
                        selectedSize={selectedSize}
                        onColorChange={setSelectedColor}
                        onSizeChange={setSelectedSize}
                      />
                    </form>
                  </div>

                  {/* CTA Actions */}
                  <div className="o-product__cta-actions" data-oproductscroll-actions="">
                    <div className="o-product__cta-actions-inner">
                      <div className="a11y" aria-live="polite" id="add-to-cart-live" role="status"></div>
                      
                      <div className="prices-add-to-cart-actions o-product__action-ctas buy-now--secondary">
                        <button
                          className="add-to-cart a-btn"
                          type="button"
                          onClick={handleAddToBag}
                          data-default-text="ADD TO BAG"
                          data-result-text="ADDED"
                        >
                          ADD TO BAG
                        </button>
                        
                        <button
                          className="a-btn add-to-cart-buy-now"
                          type="button"
                          onClick={handleBuyNow}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer onNavigateToContact={onNavigateToContact} />
    </div>
  )
}

export default ProductDetailPage
