import { useState } from 'react'

const ProductGallery = ({ images, productTitle }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const handleImageClick = (index) => {
    setSelectedImageIndex(index)
    setIsZoomOpen(true)
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
        <ul className="o-product__gallery-imgs o-product__gallery-imgs--even" data-behavior="oZoomGallery">
          {images.map((image, index) => (
            <li key={index} itemScope itemType="https://schema.org/ImageObject" className="o-product__gallery-item">
              <button
                data-ozoomgallery-item=""
                className="o-product__gallery-img a-ratio-box"
                onClick={() => handleImageClick(index)}
                aria-label={`View image ${index + 1} of ${images.length}`}
              >
                <img
                  src={image}
                  alt={`${productTitle} - ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className="d-block img-fluid"
                  itemProp="image"
                />
                <meta itemProp="name" content={`${productTitle} - ${index + 1} | LIVDON`} />
              </button>
            </li>
          ))}
        </ul>
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
