import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import ProductListingPage from './components/ProductListingPage'
import ProductDetailPage from './components/ProductDetailPage'
import ContactPage from './components/ContactPage'
import LockPage from './components/LockPage'

function App() {
  const [isLocked, setIsLocked] = useState(true)
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedProductId, setSelectedProductId] = useState(null)

  // Check if site is unlocked on mount
  useEffect(() => {
    const unlocked = localStorage.getItem('siteUnlocked')
    if (unlocked === 'true') {
      setIsLocked(false)
    }
  }, [])

  const handleUnlock = () => {
    setIsLocked(false)
  }

  const navigateToProducts = () => {
    setCurrentPage('products')
  }

  const navigateToLanding = () => {
    setCurrentPage('landing')
  }

  const navigateToContact = () => {
    setCurrentPage('contact')
  }

  const navigateToProductDetail = (productId) => {
    setSelectedProductId(productId)
    setCurrentPage('product-detail')
  }

  // Show lock page if site is locked
  if (isLocked) {
    return <LockPage onUnlock={handleUnlock} />
  }

  if (currentPage === 'products') {
    return <ProductListingPage onBack={navigateToLanding} onNavigateToContact={navigateToContact} onNavigateToProductDetail={navigateToProductDetail} />
  }

  if (currentPage === 'product-detail') {
    return <ProductDetailPage productId={selectedProductId} onBack={navigateToProducts} onNavigateToContact={navigateToContact} />
  }

  if (currentPage === 'contact') {
    return <ContactPage onBack={navigateToLanding} />
  }

  return <LandingPage onNavigateToProducts={navigateToProducts} onNavigateToContact={navigateToContact} />
}

export default App
