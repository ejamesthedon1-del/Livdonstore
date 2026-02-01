const RelatedProduct = ({ image, title, onNavigateToProductDetail }) => {
  return (
    <div className="o-product__related-item">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault()
          if (onNavigateToProductDetail) {
            onNavigateToProductDetail(1) // Use product ID
          }
        }}
        className="o-product__related-link"
      >
        <div className="o-product__related-image">
          <div className="a-ratio-box a-ratio-box--1:1">
            <img src={image} alt={title} loading="lazy" />
          </div>
        </div>
        <h4 className="o-product__related-title f-body">{title}</h4>
      </a>
    </div>
  )
}

export default RelatedProduct
