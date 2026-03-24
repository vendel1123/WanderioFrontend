

import logo from '../assets/world.png'

import test from '../assets/signInImg.jpg'

import './Hotels.css'

export default function Hotels() {

    return (
        <div className='hotelPage'>
            <div className="selectorLogo">
                <li><img src={logo} alt="WanderioLogo" title='WanderioLogo' /></li>
                <li><p>Wanderio</p></li>
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
                        <p style={{ fontWeight: 'bold' }} className="card-text">Louvre Museum - Exclusive Guided Tour (Reserved Entry Included)</p>
                        <p>Skip the line access to the Eiffel tower with timed entry during golden hour sunset viewing.</p>
                        <button className='grayLine'></button>
                        <p style={{ marginBottom: '0' }}><strong>$28</strong></p>
                        <p style={{ color: 'gray' }}>per person</p>
                    </div>


                </div>

                <div className="card" style={{ width: '50%' }}>
                    <img style={{
                        borderRadius: '1.5rem',
                        borderEndStartRadius: '0',
                        borderBottomRightRadius: '0'
                    }} src={test} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <p style={{ fontWeight: 'bold' }} className="card-text">Louvre Museum - Exclusive Guided Tour (Reserved Entry Included)</p>
                        <p>Skip the line access to the Eiffel tower with timed entry during golden hour sunset viewing.</p>
                        <p style={{color:'lightgray'}}>ROOMS</p>
                        <p>2 rooms</p>
                        <p  style={{color:'lightgray'}}>BEDS</p>
                        <p>1 King</p>
                        <p  style={{color:'lightgray'}}>GUEST</p>
                        <p>2 Adults</p>
                        <button className='grayLine'></button>
                       <div className="book">
                       <p style={{ marginBottom: '0' }}><strong>$28/night</strong></p>
                       <button>Book</button>
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
                        <p style={{ fontWeight: 'bold' }} className="card-text">Louvre Museum - Exclusive Guided Tour (Reserved Entry Included)</p>
                        <p>Skip the line access to the Eiffel tower with timed entry during golden hour sunset viewing.</p>
                        <button className='grayLine'></button>
                        <p style={{ marginBottom: '0' }}><strong>$28</strong></p>
                        <p style={{ color: 'gray' }}>per person</p>
                    </div>


                </div>
            </div>
        </div>
    )
}