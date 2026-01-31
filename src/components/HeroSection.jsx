const HeroSection = () => {
  const heroImages = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      link: '#new-collection',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      link: '#featured',
    },
  ]

  return (
    <div className="o-blocks o-blocks--40">
      <div className="o-tetris o-tetris--o small-mt">
        {heroImages.map((item) => (
          <div key={item.id} className="m-media m-media--has-media">
            <div className="m-media__media a-ratio-box a-ratio-box--1:1" data-row-number="1" data-picture-number={item.id}>
              <a href={item.link} className="m-media__media-cta">
                <img
                  src={item.image}
                  alt=""
                  title=""
                  data-sizes="auto"
                  className=""
                />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="a-rich-text a-rich-text--main title-and-link-and-desc">
        <h1 className="f-display--02">
          NEW COLLECTION "PRINTEMPS 2026"
        </h1>
        <div className="a-rich-text__inner">
          <div className="m-media m-media--has-text">
            <div className="m-media__text">
              <p className="f-body">
                Discover the new arrivals for Spring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
