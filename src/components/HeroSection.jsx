const HeroSection = ({ onNavigateToProducts }) => {
  const heroImage = {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    link: '#new-collection',
  }

  const handleButtonClick = (e) => {
    e.preventDefault()
    if (onNavigateToProducts) {
      onNavigateToProducts()
    }
  }

  return (
    <div className="o-blocks o-blocks--40">
      <div className="o-tetris o-tetris--o small-mt">
        <div className="m-media m-media--has-media">
          <div className="m-media__media a-ratio-box a-ratio-box--1:1" data-row-number="1" data-picture-number="1">
            <a href={heroImage.link} className="m-media__media-cta">
              <img
                src={heroImage.image}
                alt=""
                title=""
                data-sizes="auto"
                className=""
              />
            </a>
          </div>
        </div>
        <div className="m-media m-media--has-media o-tetris__second-image">
          <div className="m-media__media a-ratio-box a-ratio-box--1:1" data-row-number="1" data-picture-number="2">
            <a href={heroImage.link} className="m-media__media-cta">
              <img
                src={heroImage.image}
                alt=""
                title=""
                data-sizes="auto"
                className=""
              />
            </a>
          </div>
        </div>
      </div>
      
      <div className="a-rich-text a-rich-text--main title-and-link-and-desc">
        <h1 className="f-display--02 f-display--bold">
          NEW COLLECTION "PRINTEMPS 2026"
        </h1>
        <div className="a-rich-text__button">
          <a href={heroImage.link} className="a-btn a-btn--outline" onClick={handleButtonClick}>
            DISCOVER OUR NEW COLLECTION
          </a>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
