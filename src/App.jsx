import { useState } from 'react'
import LandingPage from './components/LandingPage'
import ProductListingPage from './components/ProductListingPage'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')

  const navigateToProducts = () => {
    setCurrentPage('products')
  }

  const navigateToLanding = () => {
    setCurrentPage('landing')
  }

  if (currentPage === 'products') {
    return <ProductListingPage onBack={navigateToLanding} />
  }

  return <LandingPage onNavigateToProducts={navigateToProducts} />
}

export default App
