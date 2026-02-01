import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ProductListingPage from './components/ProductListingPage'
import ProductDetailPage from './components/ProductDetailPage'
import ContactPage from './components/ContactPage'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [selectedProductId, setSelectedProductId] = useState(null)

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
