import { useState } from 'react'

const ProductTile = ({ product, onNavigateToProductDetail }) => {
  const handleClick = (e) => {
    e.preventDefault()
    if (onNavigateToProductDetail) {
      onNavigateToProductDetail(product.id)
    }
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = product.images || [product.image]

  const goToPrevious = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <li className="o-listing-grid__item">
      <div className="m-tile-slider" data-behavior="mTileSlider">
        <div className="m-tile-slider__visual">
          <div className="m-tile-slider__controls">
            {images.length > 1 && (
              <>
                <div 
                  className="m-tile-slider__indicator" 
                  style={{ '--i-width': `${100 / images.length}%` }}
                >
                  <span style={{ left: `${(currentImageIndex / images.length) * 100}%` }}></span>
                </div>
                <button 
                  className="m-tile-slider__prev" 
                  onClick={goToPrevious}
                  disabled={images.length <= 1}
                  aria-label="PREVIOUS IMAGES"
                >
                  <span className="a11y">PREVIOUS IMAGES</span>
                </button>
                <button 
                  className="m-tile-slider__next" 
                  onClick={goToNext}
                  disabled={images.length <= 1}
                  aria-label="NEXT IMAGES"
                >
                  <span className="a11y">NEXT IMAGES</span>
                </button>
              </>
            )}
          </div>

          <div className="m-tile-slider__wrapper" role="group">
            {images.map((img, index) => (
              <a
                key={index}
                className={`m-tile-slider__slide ${index === currentImageIndex ? 'm-tile-slider__slide--active' : ''}`}
                data-i={index + 1}
                aria-roledescription="slide"
                aria-label={`${index + 1} OF ${images.length}`}
                href={product.link || '#'}
                onClick={handleClick}
              >
                <img
                  src={img}
                  alt={product.title}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  sizes="(min-width: 1680px) 15vw, (min-width: 1024px) 20vw, (min-width: 768px) 33.33vw, 50vw"
                />
              </a>
            ))}
          </div>
        </div>

        <a href={product.link || '#'} className="m-product-listing__meta" onClick={handleClick}>
          <h2 className="m-product-listing__meta-title f-body">
            {product.title}
            {product.color && <span className="a11y">; {product.color}</span>}
          </h2>

          {product.price && (
            <p className="m-product-listing__meta-price f-body--em">
              <span className="prices">
                <strong data-description="value" className="f-body--em">
                  {product.price} USD
                </strong>
              </span>
            </p>
          )}
        </a>
      </div>
    </li>
  )
}

export default ProductTile
