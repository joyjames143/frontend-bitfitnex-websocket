import React from 'react'
import "./styles/TickerCard.css"
import { FaArrowAltCircleDown,FaArrowAltCircleUp } from "react-icons/fa";

export default function TickerCard({coinName,fullDetails}) {

    const arrowDirection = parseFloat(fullDetails[6]) > 0 ? true : false
    const colorfinder = parseFloat(fullDetails[6]) > 0 ? "pricegreen" : "pricered"
    const coin = coinName[1]+coinName[2]+coinName[3]
    const contry = coinName[4]+coinName[5]+coinName[6]

    return (
        <div>
            <br></br>
            <br></br> 
            <div className="main-ticker-div">
                <div className="two-pairs-in-ticckers">
                    <h4 className="ticker-individual-coin-name">{coin}/{contry}</h4>
                    <h4 className="ticker-individual-coin-numbers">{parseFloat(fullDetails[7]).toLocaleString(undefined, {minimumFractionDigits: 0,})}</h4>
                </div>
                <div className="two-pairs-in-ticckers">
                    <h4 className="ticker-individual-coin-numbers">VOL: {parseFloat(fullDetails[8]*fullDetails[7]).toLocaleString(undefined, {minimumFractionDigits: 0,maximumFractionDigits: 2})} <u>{contry}</u></h4>
                    <h4 className={`ticker-individual-coin-numbers  ${colorfinder}`}>{parseFloat(fullDetails[5]).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2})} {arrowDirection ===true ? <FaArrowAltCircleUp/>: <FaArrowAltCircleDown/>} {parseFloat(fullDetails[6]*100).toFixed(2)}%</h4>
                </div>
                <div className="two-pairs-in-ticckers">
                    <h4 className="ticker-individual-coin-numbers">LOW: {parseFloat(fullDetails[10]).toLocaleString()}</h4>
                    <h4 className="ticker-individual-coin-numbers">HIGH: {parseFloat(fullDetails[9]).toLocaleString()}</h4>
                </div>
            </div>
            <br></br>
            <br></br> 
        </div>
    )
}
