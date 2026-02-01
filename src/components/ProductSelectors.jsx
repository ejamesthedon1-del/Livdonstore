import { useState } from 'react'

const ProductSelectors = ({ colors, sizes, selectedColor, selectedSize, onColorChange, onSizeChange }) => {
  return (
    <div className="o-product__selectors">
      {/* Color Selector */}
      {colors && colors.length > 0 && (
        <div className="m-selector m-selector--grid m-selector--color" data-behavior="mSelector">
          <p className="m-selector__title">{selectedColor || colors[0].name}</p>
          <div className="m-selector__content" id="selector-content" data-mselector-content="">
            <ul className="m-selector__list">
              {colors.map((color, index) => (
                <li
                  key={index}
                  data-mselector-listitem=""
                  aria-selected={selectedColor === color.name}
                  aria-current={selectedColor === color.name ? 'page' : undefined}
                >
                  <a
                    href={color.url || '#'}
                    className={`m-selector__item ${selectedColor === color.name ? 's-selected' : ''} ${color.disabled ? 's-disabled' : ''}`}
                    data-mselector-link=""
                    style={{ background: `linear-gradient(135deg, ${color.hex} 50%, ${color.hex} 50%)` }}
                    onClick={(e) => {
                      if (!color.disabled) {
                        e.preventDefault()
                        onColorChange(color.name)
                      }
                    }}
                    aria-label={`Select color ${color.name}`}
                  >
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Size Selector */}
      {sizes && sizes.length > 0 && (
        <div className="m-selector m-selector--grid m-selector--size" data-behavior="mSelector">
          <div className="m-selector__content" id="selector-content" data-mselector-content="">
            <p className="m-selector__error-msg" aria-hidden={selectedSize !== null} data-mselector-errormsg="">
              Please select a size
            </p>
            <ul className="m-selector__list">
              {sizes.map((size, index) => (
                <li
                  key={index}
                  data-mselector-listitem=""
                  aria-selected={selectedSize === size.value}
                >
                  <input
                    name="selector-size"
                    type="radio"
                    id={`selector-size-${index}`}
                    value={size.value}
                    checked={selectedSize === size.value}
                    onChange={() => onSizeChange(size.value)}
                    disabled={size.disabled}
                    className={size.disabled ? 's-disabled' : ''}
                  />
                  <label
                    className={`m-selector__item ${selectedSize === size.value ? 's-selected' : ''} ${size.disabled ? 's-disabled' : ''}`}
                    htmlFor={`selector-size-${index}`}
                    role="button"
                    tabIndex={0}
                    data-mselector-label=""
                  >
                    {size.value}
                  </label>
                </li>
              ))}
            </ul>
            {/* Size Guide Link */}
            <a href="#size-guide" className="m-selector__size-guide-link">
              SIZE GUIDE &gt;
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductSelectors
