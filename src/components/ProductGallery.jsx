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

        {/* Thumbnail Grid - 2 columns, 2 rows (4 images max) */}
        {images.length > 1 && (
          <div className="o-product__gallery-thumbnails">
            <div className="o-product__gallery-thumbnails-grid">
              {images.slice(1, 5).map((image, index) => (
                <button
                  key={index + 1}
                  className={`o-product__gallery-thumbnail ${index + 1 === selectedImageIndex ? 's-selected' : ''}`}
                  onClick={() => handleThumbnailClick(index + 1)}
                  aria-label={`Select image ${index + 2}`}
                >
                  <img
                    src={image}
                    alt={`${productTitle} thumbnail ${index + 2}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
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
