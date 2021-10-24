import React, { useState,useEffect} from 'react';
import axios from "axios"
import TickerCard from './TickerCard';
import "./styles/Reviver.css"
import {FaLightbulb} from "react-icons/fa";


export default function Reciver() {
    const [ws,setWs] = useState(new WebSocket('wss://api-pub.bitfinex.com/ws/v2/'))
    const [wsCoins,setWsCoins] = useState("tBTCUSD")
    const [coins,setCoins] = useState([])
    const [fullDeatils , setFullDetails] = useState([])
    const [connectionCase,setConnectionCase] = useState(true)
    const [totalCoinsLoad,setTotalCoinsLoaded] = useState(20)
    //websocket useeffect hook
    useEffect(()=>{
        ws.onopen = function open() {
            setConnectionCase(true)
            console.log('connected');
            ws.send(JSON.stringify({
                event: 'subscribe', 
                channel: 'ticker', 
                symbol: wsCoins
            }));
        };

        ws.onerror = function(event) {
            console.error("WebSocket error observed:", event);
            setConnectionCase(false)
            
        };
        
        ws.onclose = function close() {
            console.log('disconnected');
            
        };
        
        ws.onmessage = function incoming(message) {
            const a = JSON.parse(message.data)
            if (a.length > 5){
                setFullDetails(a)
            }
            console.log(a)
        };
        
    },[ws])
    // axios useeffect hoook
    useEffect(()=>{
        const proxyUrl = "https://myown-cors-anywhere.herokuapp.com/"
        const baseUrl = "https://api-pub.bitfinex.com/v2/"
        const pathParams = "tickers" 
        const queryParams = "symbols=ALL" 
        const stonks = async () => {
        const response = await axios.get(`${proxyUrl}${baseUrl}/${pathParams}?${queryParams}`)
        return response
        }
        
        stonks().then((mess)=>{
            setCoins(mess.data)
        })
        
    },[])
    
    const socketConnEnd = () =>{
        ws.close()
        setConnectionCase(false)
    }

    const socketConnreopen = () => {
        setWs(new WebSocket('wss://api-pub.bitfinex.com/ws/v2/'))
    }

    const selectedCoin = (coinName) => {
        if (wsCoins !== coinName[0]){
            ws.close()
            setFullDetails(coinName)
            setWsCoins(coinName[0])
            setWs(new WebSocket('wss://api-pub.bitfinex.com/ws/v2/'))
            
        }
    }

    const increaseCoinCount = () =>{
        if (totalCoinsLoad < (coins.length - 5)){
            setTotalCoinsLoaded(totalCoinsLoad+5)
        }
    }
    const decreaseCoinCount = () =>{
        if (totalCoinsLoad > 10){
            setTotalCoinsLoaded(totalCoinsLoad-5)
        }
    }

    const nameHelper = (tickernamecountry) => {
        const coin = tickernamecountry[1]+tickernamecountry[2]+tickernamecountry[3]
        const contry = tickernamecountry[4]+tickernamecountry[5]+tickernamecountry[6]
        return (`${coin}/${contry}`)
    }

    return (
        <div className="main-div-reciver">
            <div className="reciver-connect-disconnect-btn" >
                <button className="button2" onClick={socketConnreopen} disabled={connectionCase?true:false}>reopen connection</button>
                <button className="button2" onClick={socketConnEnd} disabled={connectionCase?false:true} >close connection</button>
            </div>
            <div className="reciver-connect-disconnect-light">
                <FaLightbulb size="2rem" className={connectionCase?"reciver-lightgreen":"reciver-lightred"}/>
            </div>
            <div className="ticker-card" >
                <TickerCard coinName={wsCoins} fullDetails={fullDeatils} />
            </div>
            <div className="increment-decrement-button">
                <h2>total coins available = {totalCoinsLoad}</h2>
                <div className="reciver-connect-disconnect-btn">
                    <button className="button2 button3" onClick={increaseCoinCount}>increase by 5</button>
                    <button className="button2 button3" onClick={decreaseCoinCount}>decrease by 5</button>
                </div>
            </div>
            <div className="main-coin-collection-pool">
                {coins.length > 10 && coins.map((individual,idx)=> idx < totalCoinsLoad ?(<button className="reciver-main-indi-btn" onClick={()=>selectedCoin(individual)} key={individual+idx}> {nameHelper(individual[0])}</button>):"")}
            </div> 
        </div> 
    )
}


