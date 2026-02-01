import { useState, useEffect } from 'react'
import { FiShoppingBag } from 'react-icons/fi'
import ProductGallery from './ProductGallery'
import ProductSelectors from './ProductSelectors'
import ProductInfoSection from './ProductInfoSection'
import RelatedProduct from './RelatedProduct'
import Footer from './Footer'
import MobileMenu from './MobileMenu'

const ProductDetailPage = ({ productId, onBack, onNavigateToContact }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartItemCount, setCartItemCount] = useState(0)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartY, setDragStartY] = useState(0)
  const [dragCurrentY, setDragCurrentY] = useState(0)
  const [isGalleryVisible, setIsGalleryVisible] = useState(true)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Check if gallery is still visible in viewport
      const gallery = document.querySelector('.o-product__gallery')
      const productHeader = document.querySelector('[data-oproductscroll-header]')
      
      if (gallery && productHeader) {
        const galleryRect = gallery.getBoundingClientRect()
        const headerRect = productHeader.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        
        // Gallery is visible if any part of it is in the viewport and header hasn't reached top
        const galleryInView = galleryRect.bottom > 0 && galleryRect.top < viewportHeight
        const headerReachedTop = headerRect.top <= 0
        
        setIsGalleryVisible(galleryInView && !headerReachedTop)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
    
    // Also check on resize
    window.addEventListener('resize', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
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

  // Scroll to product header function
  const scrollToProductHeader = () => {
    const productHeader = document.querySelector('[data-oproductscroll-header]')
    if (productHeader) {
      productHeader.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Drag handlers for puller
  const handlePullerTouchStart = (e) => {
    setIsDragging(true)
    setDragStartY(e.touches[0].clientY)
    setDragCurrentY(e.touches[0].clientY)
  }

  const handlePullerTouchMove = (e) => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    setDragCurrentY(currentY)
  }

  const handlePullerTouchEnd = () => {
    if (!isDragging) return
    
    const dragDistance = dragStartY - dragCurrentY
    const dragThreshold = 30 // Minimum pixels to trigger scroll
    
    if (dragDistance > dragThreshold) {
      // User dragged upward, scroll to product header
      scrollToProductHeader()
    }
    
    setIsDragging(false)
    setDragStartY(0)
    setDragCurrentY(0)
  }

  const handlePullerMouseDown = (e) => {
    setIsDragging(true)
    setDragStartY(e.clientY)
    setDragCurrentY(e.clientY)
  }

  // Add global mouse event listeners for drag
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e) => {
      setDragCurrentY(e.clientY)
    }

    const handleGlobalMouseUp = () => {
      const dragDistance = dragStartY - dragCurrentY
      const dragThreshold = 30 // Minimum pixels to trigger scroll
      
      if (dragDistance > dragThreshold) {
        // User dragged upward, scroll to product header
        scrollToProductHeader()
      }
      
      setIsDragging(false)
      setDragStartY(0)
      setDragCurrentY(0)
    }
    
    document.addEventListener('mousemove', handleGlobalMouseMove)
    document.addEventListener('mouseup', handleGlobalMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, dragStartY, dragCurrentY])

  return (
    <div className="min-h-screen bg-white" style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
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
            {/* Product Section */}
            <section className="o-product product-detail" data-pid={product.id}>
              <div className="o-product__product">
                {/* Product Gallery */}
                <ProductGallery images={product.images} productTitle={product.title} />

                {/* Product Header - Moved after gallery */}
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

                {/* Product Content - Selectors and additional info */}
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

                  {/* Estimated Delivery Date */}
                  <div className="o-product__delivery-info">
                    <p className="f-body--em">
                      ESTIMATED DELIVERY DATE: STARTING FROM TUESDAY FEBRUARY 3
                    </p>
                  </div>

                  {/* Expandable Sections */}
                  <div className="o-product__info-sections">
                    {/* Details Section */}
                    <ProductInfoSection
                      title="DETAILS"
                      content="Product details and specifications will appear here when expanded."
                    />

                    {/* Care and Maintenance Section */}
                    <ProductInfoSection
                      title="CARE AND MAINTENANCE"
                      content="Care instructions and maintenance guidelines will appear here when expanded."
                    />
                  </div>

                  {/* Information Links */}
                  <div className="o-product__info-links">
                    <a href="#check-availability" className="o-product__info-link">
                      CHECK AVAILABILITY IN STORE &gt;
                    </a>
                    <a href="#shipping" className="o-product__info-link">
                      SHIPPING &gt;
                    </a>
                    <a href="#returns" className="o-product__info-link">
                      RETURNS AND EXCHANGES (WITHIN 14 DAYS) &gt;
                    </a>
                  </div>

                  {/* You May Also Like Section */}
                  <div className="o-product__related">
                    <h3 className="o-product__related-title f-body--em">YOU MAY ALSO LIKE</h3>
                    <div className="o-product__related-products">
                      <RelatedProduct
                        image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEwMDAiIGZpbGw9IiMxMzE4MjMiLz48L3N2Zz4="
                        title="NAVY BLAZER"
                        onNavigateToProductDetail={() => {}}
                      />
                      <RelatedProduct
                        image="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgaGVpZ2h0PSIxMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjEwMDAiIGZpbGw9IiMyRDNGMkMiLz48L3N2Zz4="
                        title="GREEN BLAZER"
                        onNavigateToProductDetail={() => {}}
                      />
                    </div>
                  </div>

                  {/* CTA Actions - Side by side buttons (moved after related products) */}
                  <div className="o-product__cta-actions" data-oproductscroll-actions="">
                    <div className="o-product__cta-actions-inner">
                      {/* Puller Signal */}
                      <div 
                        className={`o-product__cta-puller ${isDragging ? 'o-product__cta-puller--dragging' : ''} ${isGalleryVisible ? 'o-product__cta-puller--fade' : ''}`}
                        onTouchStart={handlePullerTouchStart}
                        onTouchMove={handlePullerTouchMove}
                        onTouchEnd={handlePullerTouchEnd}
                        onMouseDown={handlePullerMouseDown}
                      >
                        <div className="o-product__cta-puller-handle"></div>
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
                      
                      <div className="a11y" aria-live="polite" id="add-to-cart-live" role="status"></div>
                      
                      <div className="prices-add-to-cart-actions o-product__action-ctas">
                        {/* Apple Pay Button */}
                        <button
                          className="apple-pay-button a-btn"
                          type="button"
                          onClick={handleBuyNow}
                          aria-label="Pay with Apple Pay"
                        >
                          <svg className="apple-pay-icon" width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 1.5c-.8-1.3-2.1-2.3-3.5-2.3-1.4 0-2.7 1-3.5 2.3-.8 1.3-1 2.9-.4 4.1.6 1.2 1.5 2.2 2.4 3.1.9.9 2 1.9 3.1 2.4 1.2.5 2.8.3 4.1-.4 1.3-.8 2.3-2.1 2.3-3.5 0-1.4-1-2.7-2.3-3.5-.5-.3-1.1-.5-1.6-.7zm-1.6 1.3c.5.1 1.1.4 1.6.7 1.3.8 2.3 2.1 2.3 3.5 0 1.4-1 2.7-2.3 3.5-1.3.8-2.9 1-4.1.4-1.2-.5-2.2-1.4-3.1-2.4-.9-.9-1.9-2-2.4-3.1-.6-1.2-.4-2.8.4-4.1.8-1.3 2.1-2.3 3.5-2.3 1.4 0 2.7 1 3.5 2.3z"/>
                            <path d="M9 5c-.2 0-.4.2-.4.4v7.2c0 .2.2.4.4.4s.4-.2.4-.4V5.4c0-.2-.2-.4-.4-.4z"/>
                            <path d="M6.5 7.5c-.2 0-.4.2-.4.4v2.2c0 .2.2.4.4.4s.4-.2.4-.4V7.9c0-.2-.2-.4-.4-.4zm5 0c-.2 0-.4.2-.4.4v2.2c0 .2.2.4.4.4s.4-.2.4-.4V7.9c0-.2-.2-.4-.4-.4z"/>
                          </svg>
                          <span>Pay</span>
                        </button>

                        {/* Add to Bag Button */}
                        <button
                          className="add-to-cart a-btn"
                          type="button"
                          onClick={handleAddToBag}
                          data-default-text="ADD TO BAG"
                          data-result-text="ADDED"
                        >
                          ADD TO BAG
                        </button>
                      </div>

                      {/* Terms of Service */}
                      <p className="f-body a-text a-text--secondary a-text--apple-pay-notice">
                        BY PLACING YOUR ORDER YOU AGREE TO THE{' '}
                        <a href="/terms-of-service" className="policy-link link--on-gray-bg" target="_blank" rel="noopener noreferrer">
                          TERMS OF SERVICE
                        </a>
                      </p>
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
