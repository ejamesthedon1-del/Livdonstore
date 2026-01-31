import { FiX } from 'react-icons/fi'

const MobileMenu = ({ isOpen, onClose, cartItemCount, onNavigateToContact }) => {
  return (
    <div className={`a17-grid__left o-sidebar-nav ${isOpen ? 'o-sidebar-nav--open' : ''}`}>
      <nav className="o-sidebar-nav__nav" aria-labelledby="sidebar-nav-label">
        <p className="sr-only" id="sidebar-nav-label">SIDEBAR NAVIGATION</p>
        
        {/* Mobile Menu Header */}
        <div className="o-sidebar-nav__header">
          <h1>
            <a href="/" className="a-logo" title="LIVDON | HOMEPAGE">
              <img src="/Asset_1.png.webp" alt="LIVDON" className="a-logo__img" />
            </a>
          </h1>
          <button
            type="button"
            className="o-sidebar-nav__close"
            onClick={onClose}
            aria-label="CLOSE MENU"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <ul className="o-sidebar-nav__list">
          {/* General Links */}
          <li>
            <a
              href="#gifts"
              className="a-btn a-btn--as-link o-sidebar-nav__link"
              onClick={onClose}
            >
              LIVDON GIFTS
            </a>
          </li>
          <li>
            <a
              href="#new"
              className="a-btn a-btn--as-link o-sidebar-nav__link"
              onClick={onClose}
            >
              LIVDON NEW
            </a>
          </li>
          <li>
            <a
              href="#shows"
              className="a-btn a-btn--as-link o-sidebar-nav__link"
              onClick={onClose}
            >
              LIVDON SHOWS
            </a>
          </li>

          {/* Shop Categories */}
          <li>
            <a
              href="#shop-women"
              className="a-btn a-btn--as-link o-sidebar-nav__link"
              onClick={onClose}
            >
              LIVDON SHOP WOMEN
            </a>
          </li>
          <li>
            <a
              href="#shop-men"
              className="a-btn a-btn--as-link o-sidebar-nav__link"
              onClick={onClose}
            >
              LIVDON SHOP MEN
            </a>
          </li>
          <li>
            <a
              href="#parfumerie"
              className="a-btn a-btn--as-link o-sidebar-nav__link"
              onClick={onClose}
            >
              LIVDON HAUTE PARFUMERIE
            </a>
          </li>
          <li>
            <a
              href="#beaute"
              className="a-btn a-btn--as-link o-sidebar-nav__link"
              onClick={onClose}
            >
              LIVDON BEAUTÉ
            </a>
          </li>
          <li>
            <a
              href="#maison"
              className="a-btn a-btn--as-link o-sidebar-nav__link"
              onClick={onClose}
            >
              LIVDON MAISON
            </a>
          </li>

          {/* Collection */}
          <li>
            <a
              href="#maison-de-couture"
              className="a-btn a-btn--as-link o-sidebar-nav__link"
              onClick={onClose}
            >
              LIVDON MAISON DE COUTURE
            </a>
          </li>
        </ul>

        {/* Utility Links */}
        <div className="o-sidebar-nav__utilities">
          <a
            href="#store-locator"
            className="a-btn a-btn--as-link o-sidebar-nav__utility-link"
            onClick={onClose}
          >
            STORE LOCATOR
          </a>
          <a
            href="#sign-in"
            className="a-btn a-btn--as-link o-sidebar-nav__utility-link"
            onClick={onClose}
          >
            SIGN IN / REGISTER
          </a>
          {cartItemCount > 0 && (
            <a
              href="#cart"
              className="a-btn a-btn--as-link o-sidebar-nav__utility-link"
              onClick={onClose}
            >
              SHOPPING BAG ({cartItemCount})
            </a>
          )}
          <a
            href="#contact"
            className="a-btn a-btn--as-link o-sidebar-nav__utility-link"
            onClick={() => {
              onClose()
              if (onNavigateToContact) {
                onNavigateToContact()
              }
            }}
          >
            CONTACT US
          </a>
        </div>

        {/* Region/Language */}
        <div className="o-sidebar-nav__region">
          <button
            type="button"
            className="a-btn a-btn--as-link o-sidebar-nav__region-link"
          >
            UNITED STATES | EN
          </button>
        </div>
      </nav>
    </div>
  )
}

export default MobileMenu
