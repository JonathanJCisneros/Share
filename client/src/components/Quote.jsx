import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../static/Quote.css'

const Quote = () => {
    const [quote, setQuote] = useState({})

    useEffect(() => {
        axios.get(`https://type.fit/api/quotes`)
            .then(res => {
                let random = Math.floor(Math.random() * res.data.length)
                setQuote(res.data[random])
            })
            .catch(err => console.log(err))
    }, [])

    
    return (
        <div className='quote' style={{backgroundImage : "url(https://picsum.photos/580/350/)"}} >
            {quote&&
            <div style={{marginTop : "10px"}}>
                <h3 id='quote'>"{quote.text}"</h3>
                <h2 id='author'>-{quote.author === null? "Anonymous": quote.author}</h2>
            </div>}
        </div>
    )
}

export default Quote