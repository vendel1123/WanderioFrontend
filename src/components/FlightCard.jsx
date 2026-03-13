export default function FlightCard({ flight }) {

    return (

        <div className="flightCard">
            <div className="airline">
                <strong>Ryanair</strong>
            </div>

            <div className="flightRow">

                <div>
                    <strong>16:30 Bud</strong> {/* flightFrom */}
                    <br />
                    <p>sep10</p>
                    {/* flightDepartureDate */}
                </div>

                <div className="durationWrapper">
                    <div className="duration">
                        <p>02h:30min</p>
                    </div>
                    <button className="durationBtn"></button>
                </div>
                <div>
                    <strong>19:00 par</strong> {/* flightTo */}
                    <br />
                    <p>sep10</p>
                    {/* flightArriveDate*/}
                </div>


            </div>

            <div className="flightRow">

                <div>
                    <strong>16:30 Bud</strong> {/* flightFrom */}
                    <br />
                    <p>sep10</p>
                    {/* flightDepartureDate */}
                </div>

                <div className="durationWrapper">
                    <div className="duration">
                        <p>02h:30min</p>
                    </div>
                    <button className="durationBtn"></button>
                </div>
                <div>
                    <strong>19:00 par</strong> {/* flightTo */}
                    <br />
                    <p>sep10</p>
                    {/* flightArriveDate*/}
                </div>


            </div>

            <div className="priceSection">
                <span>{/*flightPcire*/}17 USD</span>
                <button>Choose</button>
            </div>

        </div>

    )

}