import { useState, useEffect } from 'react'

const LockPage = ({ onUnlock }) => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Calculate target date (12 days from now)
  const getTargetDate = () => {
    const target = new Date()
    target.setDate(target.getDate() + 12)
    target.setHours(0, 0, 0, 0) // Set to midnight
    return target
  }

  const [targetDate] = useState(getTargetDate())

  // Update countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        return { days, hours, minutes, seconds }
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    // Update immediately
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      return
    }

    // Store email in localStorage
    const storedEmails = JSON.parse(localStorage.getItem('lockPageEmails') || '[]')
    storedEmails.push({
      email,
      timestamp: new Date().toISOString()
    })
    localStorage.setItem('lockPageEmails', JSON.stringify(storedEmails))

    setIsSubmitted(true)
    
    // Unlock site after a short delay
    setTimeout(() => {
      localStorage.setItem('siteUnlocked', 'true')
      if (onUnlock) {
        onUnlock()
      }
    }, 1500)
  }

  const formatTime = (value) => {
    return value.toString().padStart(2, '0')
  }

  const handleSkipToHome = () => {
    localStorage.setItem('siteUnlocked', 'true')
    if (onUnlock) {
      onUnlock()
    }
  }

  return (
    <div className="lock-page">
      <button 
        className="lock-page__skip-button f-body"
        onClick={handleSkipToHome}
        aria-label="Skip to homepage"
      >
        ENTER SITE
      </button>
      <div className="lock-page__container">
        <div className="lock-page__logo">
          <img src="/Asset_1.png.webp" alt="LIVDON" className="lock-page__logo-img" />
        </div>

        <div className="lock-page__timer">
          <div className="lock-page__timer-item">
            <span className="lock-page__timer-value f-body--em">{formatTime(timeLeft.days)}</span>
            <span className="lock-page__timer-label f-body">DAYS</span>
          </div>
          <div className="lock-page__timer-separator">:</div>
          <div className="lock-page__timer-item">
            <span className="lock-page__timer-value f-body--em">{formatTime(timeLeft.hours)}</span>
            <span className="lock-page__timer-label f-body">HOURS</span>
          </div>
          <div className="lock-page__timer-separator">:</div>
          <div className="lock-page__timer-item">
            <span className="lock-page__timer-value f-body--em">{formatTime(timeLeft.minutes)}</span>
            <span className="lock-page__timer-label f-body">MINUTES</span>
          </div>
          <div className="lock-page__timer-separator">:</div>
          <div className="lock-page__timer-item">
            <span className="lock-page__timer-value f-body--em">{formatTime(timeLeft.seconds)}</span>
            <span className="lock-page__timer-label f-body">SECONDS</span>
          </div>
        </div>

        {!isSubmitted ? (
          <form className="lock-page__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="lock-page__input f-body"
              placeholder="ENTER YOUR EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="lock-page__button a-btn f-body--em">
              NOTIFY ME
            </button>
          </form>
        ) : (
          <div className="lock-page__success f-body--em">
            THANK YOU! WE'LL NOTIFY YOU SOON.
          </div>
        )}
      </div>
    </div>
  )
}

export default LockPage
