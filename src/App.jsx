import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ProductListingPage from './components/ProductListingPage'
import ContactPage from './components/ContactPage'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const navigateToProducts = () => {
    setCurrentPage('products')
  }

  const navigateToLanding = () => {
    setCurrentPage('landing')
  }

  const navigateToContact = () => {
    setCurrentPage('contact')
  }

  if (currentPage === 'products') {
    return <ProductListingPage onBack={navigateToLanding} onNavigateToContact={navigateToContact} />
  }

  if (currentPage === 'contact') {
    return <ContactPage onBack={navigateToLanding} />
  }

  return <LandingPage onNavigateToProducts={navigateToProducts} onNavigateToContact={navigateToContact} />
}

export default App
