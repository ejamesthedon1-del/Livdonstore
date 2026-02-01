import { useState } from 'react'

const ProductInfoSection = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="o-product__info-section">
      <button
        className="o-product__info-section-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span className="o-product__info-section-title">{title}</span>
        <span className="o-product__info-section-icon">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div
          id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="o-product__info-section-content"
        >
          <p className="f-body">{content}</p>
        </div>
      )}
    </div>
  )
}

export default ProductInfoSection
