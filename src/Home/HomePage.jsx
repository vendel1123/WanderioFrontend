import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'

import slide1 from '../assets/rome1.jpg';
import slide2 from '../assets/budapestAttraction3.jpg';
import slide3 from '../assets/paris2.jpg';
import slide4 from '../assets/tokyo1.jpg';
import slide5 from '../assets/berlin3.jpg';

import logo from '../assets/world.png'

import { logout } from '../user'

const slides = [
  {
    image: slide1,
    text1: "Explore Rome, the Eternal City, is a timeless blend of ancient history and vibrant modern life.",
    text2: "Travel is proof that the unknown can be beautiful."
  },
  {
    image: slide2,
    text1: "Budapest, the capital of Hungary, is known for its stunning architecture, thermal baths, historic bridges, and picturesque setting along the Danube River.",
    text2: "Travel is proof that the unknown can be beautiful."
  },
  {
    image: slide3,
    text1: "Paris, the capital of France, is famed for its art, fashion, cuisine, and landmarks",
    text2: "Travel is proof that the unknown can be beautiful."
  },
  {
    image: slide4,
    text1: "Tokyo, the capital of Japan, is renowned for its cutting-edge technology, bustling city life, traditional culture, and world-class cuisine.",
    text2: "Travel is proof that the unknown can be beautiful."
  },
  {
    image: slide5,
    text1: "Berlin, the capital of Germany, is famed for its rich history, vibrant cultural scene, diverse art communities, and iconic landmarks such as the Brandenburg Gate and remnants of the Berlin Wall.",
    text2: "Travel is proof that the unknown can be beautiful."
  },

];
export default function HomePage() {

  const [user, setUser] = useState(null)
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Selector");
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  async function onLogout() {
    const data = await logout()

    if (data.error) {
      return setUserError(data.error)
    }
    setUser(null)
    navigate('/')
  }

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

              <a className="btn btn-secondary dropdown-toggle bg-dark" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Menu
              </a>

              <div className='dropdown'>
                <img src={logo} alt="WanderioLogo" title='WanderioLogo' />
                <p>Wanderio</p>
              </div>

              <ul className="dropdown-menu p-0">
                <li><a className="dropdown-item" onClick={handleClick}>Next Page</a></li>
                <li><a className="dropdown-item" onClick={() => navigate('/profile')} href="#">Profile</a></li>
                <li><a className="dropdown-item" onClick={onLogout} href="#">Log out</a></li>
              </ul>
            </div>

            <div className="slide-text2">
              <p style={{ marginTop: '90%' }}>{slide.text2}</p>
            </div>
          </div>
          <div className="slide-text1">
            <p >{slide.text1}</p>
          </div>
        </div>
      ))}
    </div>
  )
}