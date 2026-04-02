import { useState, useEffect } from 'react'

import logo from '../assets/world.png'
import test from '../assets/signInImg.jpg'

import './Hotels.css'

import { useNavigate, useParams } from 'react-router-dom'
import { getCityDetails } from '../user'

export default function Hotels() {

    const navigate = useNavigate()

    const[hotels, setHotels] = useState([])
    const[cityName,setCityName] = useState('')
    const[isLoading, setIsLoading ] = useState(true)
    const[error, setError] = useState(null)

    const {id} = useParams()

    useEffect(()=> {
        if(!id){
            setError("City ID is missing.")
            setIsLoading(fasle)
            return
        }

        getCityDetails(id).then(data=>{
            setCityName(data.name)
            setHotels(data.hotels)
            setIsLoading(false)
        })
        .catch(err=> {
            setError(err.message)
            setIsLoading(false)
        })

    }, [id])

    if(isLoading){
        return <div>Loading hotels...</div>
    }
    if(error){
        return <div>Error: {error}</div>
    }

    return (
        <div className='hotelPage'>
            <div className="nav">
                <div className="selectorLogo">
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                    <li><p>Wanderio</p></li>
                </div>
            </div>

            <h3>Hotels in {cityName}</h3>

            <div className="attractions">

                {hotels.length >0 ? hotels.map(hotel=> (
                        <div key={hotel.hotelID} className="card" style={{ width: '50%' }}>
                    <img style={{
                        borderRadius: '1.5rem',
                        borderEndStartRadius: '0',
                        borderBottomRightRadius: '0'
                    }} src={hotel.images && hotel.images.length > 0 ? hotel.images[0] : test} className="card-img-top" alt={hotel.name} />
                    <div className="card-body">
                        <p style={{fontWeight: 'bold'}} className="card-text">{hotel.name}</p>
                        <p style={{ margin: '1rem 0' }}>{hotel.details}</p>
                        <p className='grayP'>ROOMS</p>
                        <p className='boldP'>2 rooms</p>
                        <p className='grayP'>BEDS</p>
                        <p className='boldP'>1 King</p>
                        <p className='grayP'>GUEST</p>
                        <p className='boldP'>2 Adults</p>
                        <button className='grayLine'></button>
                        <div className="book">
                            <p style={{ marginBottom: '0' }}><strong>$28/night</strong></p>
                            <button onClick={()=> navigate(`/hotelBook/${hotel.hotelID}`)}>Book</button>
                        </div>
                    </div>

                </div>

                )) : <p>No hotels found for this city.</p>}

                
                <button className='grayLine' style={{
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '1rem auto'
                }}></button>
            </div>
            <button className='back' onClick={() => navigate(-1)}>← Back</button>
        </div>
    )
}