import { useState } from 'react'

const ProductGallery = ({ images, productTitle }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const handleMainImageClick = () => {
    setIsZoomOpen(true)
  }

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index)
  }

  const closeZoom = () => {
    setIsZoomOpen(false)
  }

  const goToNext = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToPrevious = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <>
      <div className="o-product__gallery" data-oproductscroll-gallery="">
        {/* Main Image */}
        <div className="o-product__gallery-main" itemScope itemType="https://schema.org/ImageObject">
          <button
            className="o-product__gallery-main-img"
            onClick={handleMainImageClick}
            aria-label={`View image ${selectedImageIndex + 1} of ${images.length}`}
          >
            <img
              src={images[selectedImageIndex]}
              alt={`${productTitle} - ${selectedImageIndex + 1}`}
              loading="eager"
              className="d-block img-fluid"
              itemProp="image"
            />
            <meta itemProp="name" content={`${productTitle} - ${selectedImageIndex + 1} | LIVDON`} />
          </button>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="o-product__gallery-thumbnails">
            <div className="o-product__gallery-thumbnails-inner">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`o-product__gallery-thumbnail ${index === selectedImageIndex ? 's-selected' : ''}`}
                  onClick={() => handleThumbnailClick(index)}
                  aria-label={`Select image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`${productTitle} thumbnail ${index + 1}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pagination Indicators */}
        {images.length > 1 && (
          <div className="o-product__gallery-pagination">
            {images.map((_, index) => (
              <div
                key={index}
                className={`o-product__gallery-pagination-dot ${index === selectedImageIndex ? 's-active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div className="o-product__zoom-modal" onClick={closeZoom}>
          <button className="o-product__zoom-close" onClick={closeZoom} aria-label="Close zoom">
            ×
          </button>
          <button className="o-product__zoom-prev" onClick={goToPrevious} aria-label="Previous image">
            ‹
          </button>
          <button className="o-product__zoom-next" onClick={goToNext} aria-label="Next image">
            ›
          </button>
          <div className="o-product__zoom-image" onClick={(e) => e.stopPropagation()}>
            <img src={images[selectedImageIndex]} alt={`${productTitle} - zoomed`} />
          </div>
        </div>
      )}
    </>
  )
}

export default ProductGallery
