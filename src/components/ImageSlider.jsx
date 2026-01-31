const ImageSlider = () => {
  // Featured collections - replace with your actual product images
  const collections = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      title: 'GIFTS FOR HER',
      link: '#gifts-her',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'GIFTS FOR HIM',
      link: '#gifts-him',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'HAUTE PARFUMERIE',
      link: '#parfumerie',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'BELTS',
      link: '#belts',
    },
  ]

  return (
    <div className="o-project-grid" data-behavior="oProjectGrid">
      <h3 className="f-body--em">Explore the gifts selection</h3>
      <ul className="o-project-grid__inner">
        {collections.map((item) => (
          <li key={item.id} className="o-project-grid__item">
            <a href={item.link}>
              <div className="o-project-grid__img-wrapper">
                <figure>
                  <div className="a-ratio-box a-ratio-box--1:1">
                    <img
                      src={item.image}
                      data-sizes="auto"
                      className=""
                      alt={item.title}
                      title={item.title}
                    />
                  </div>
                  <figcaption className="f-body--em">{item.title}</figcaption>
                </figure>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ImageSlider
