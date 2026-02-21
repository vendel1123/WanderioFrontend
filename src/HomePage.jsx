import { useEffect, useState } from 'react';
import './HomePage.css'

import slide1 from '../public/colosseum.jpg';
import slide2 from '../public/Lausanne.jpg';
import slide3 from '../public/eiffelTower.jpg';

import logo from './assets/world.png'

const slides = [
  {
    image: slide1,
    text1: "Explore Rome, the Eternal City, is a timeless blend of ancient history and vibrant modern life.",
    text2: "Travel is proof that the unknown can be beautiful."
  },
  {
    image: slide2,
     text1: "Lausanne is a Swiss city on Lake Geneva, known for its Olympic spirit, historic old town, lively lakeside, and stunning Alpine views.",
     text2: "Travel is proof that the unknown can be beautiful."
  },
  {
    image: slide3,
     text1: "Paris, the capital of France, is famed for its art, fashion, cuisine, and landmarks",
     text2: "Travel is proof that the unknown can be beautiful."
  }
];
export default function HomePage() {

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hero-slider">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide ${i === index ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="hero-overlay">

            <div className="dropdown">
              
              <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Menu
              </a>

              <div className='dropdown'>
                <img src={logo} alt="WanderioLogo" title='WanderioLogo' />
                <p>Wanderio</p>
              </div>
                
              <ul className="dropdown-menu p-0">
                <li><a className="dropdown-item" href="#">Roma</a></li>
                <li><a className="dropdown-item" href="#">Eiffel Tower</a></li>
                <li><a className="dropdown-item" href="#">Lausanne</a></li>
              </ul>
            </div>

            <div className="slide-text2">
              <p>{slide.text2}</p>
            </div>
          </div>
          <div className="slide-text1">
              <p>{slide.text1}</p>
            </div>
        </div>
      ))}
    </div>
  )
}