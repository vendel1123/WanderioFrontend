

import logo from '../assets/world.png'
import test from '../assets/signInImg.jpg'

import './Hotels.css'

import { useNavigate } from 'react-router-dom'

export default function Hotels() {


    const navigate = useNavigate()

    return (
        <div className='hotelPage'>
            <div className="nav">
                <div className="selectorLogo">
                    <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                    <li><p>Wanderio</p></li>
                </div>
            </div>

            <h3>Hotels in Paris</h3>

            <div className="attractions">
                <div className="card" style={{ width: '50%' }}>
                    <img style={{
                        borderRadius: '1.5rem',
                        borderEndStartRadius: '0',
                        borderBottomRightRadius: '0'
                    }} src={test} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p style={{
                            fontWeight: 'bold',

                        }} className="card-text">Louvre Museum - Exclusive Guided Tour (Reserved Entry Included)</p>
                        <p style={{ margin: '1rem 0' }}>Skip the line access to the Eiffel tower with timed entry during golden hour sunset viewing.</p>
                        <p className='grayP'>ROOMS</p>
                        <p className='boldP'>2 rooms</p>
                        <p className='grayP'>BEDS</p>
                        <p className='boldP'>1 King</p>
                        <p className='grayP'>GUEST</p>
                        <p className='boldP'>2 Adults</p>
                        <button className='grayLine'></button>
                        <div className="book">
                            <p style={{ marginBottom: '0' }}><strong>$28/night</strong></p>
                            <button onClick={()=> navigate('/hotelBook')}>Book</button>
                        </div>
                    </div>

                </div>

                <div className="card" style={{ width: '50%' }}>
                    <img style={{
                        borderRadius: '1.5rem',
                        borderEndStartRadius: '0',
                        borderBottomRightRadius: '0'
                    }} src={test} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p style={{
                            fontWeight: 'bold',

                        }} className="card-text">Louvre Museum - Exclusive Guided Tour (Reserved Entry Included)</p>
                        <p style={{ margin: '1rem 0' }}>Skip the line access to the Eiffel tower with timed entry during golden hour sunset viewing.</p>
                        <p className='grayP'>ROOMS</p>
                        <p className='boldP'>2 rooms</p>
                        <p className='grayP'>BEDS</p>
                        <p className='boldP'>1 King</p>
                        <p className='grayP'>GUEST</p>
                        <p className='boldP'>2 Adults</p>
                        <button className='grayLine'></button>
                        <div className="book">
                            <p style={{ marginBottom: '0' }}><strong>$28/night</strong></p>
                            <button onClick={()=> navigate('/hotelBook')}>Book</button>
                        </div>
                    </div>

                </div>

                <div className="card" style={{ width: '50%' }}>
                    <img style={{
                        borderRadius: '1.5rem',
                        borderEndStartRadius: '0',
                        borderBottomRightRadius: '0'
                    }} src={test} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p style={{
                            fontWeight: 'bold',

                        }} className="card-text">Louvre Museum - Exclusive Guided Tour (Reserved Entry Included)</p>
                        <p style={{ margin: '1rem 0' }}>Skip the line access to the Eiffel tower with timed entry during golden hour sunset viewing.</p>
                        <p className='grayP'>ROOMS</p>
                        <p className='boldP'>2 rooms</p>
                        <p className='grayP'>BEDS</p>
                        <p className='boldP'>1 King</p>
                        <p className='grayP'>GUEST</p>
                        <p className='boldP'>2 Adults</p>
                        <button className='grayLine'></button>
                        <div className="book">
                            <p style={{ marginBottom: '0' }}><strong>$28/night</strong></p>
                            <button onClick={()=> navigate('/hotelBook')}>Book</button>
                        </div>
                    </div>

                </div>
                <button className='grayLine' style={{
                    width: '80%',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '1rem auto'
                }}></button>
            </div>
            <button className='back' onClick={() => navigate('/booking')}>← Back</button>
        </div>
    )
}