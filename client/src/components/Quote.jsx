import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../static/Quote.css'

const Quote = () => {
    const [quote, setQuote] = useState({})
    const [image, setImage] = useState()

    useEffect(() => {
        axios.get(`https://type.fit/api/quotes`)
            .then(res => {
                let random = Math.floor(Math.random() * res.data.length)
                setQuote(res.data[random])
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`https://picsum.photos/580/350/`)
            .then(res => setImage(res.request.responseURL))
            .catch(err => console.log(err))
    }, [])

    
    return (
        <div className='quote' style={{backgroundImage : `url(${image})`}} >
            {quote&&
            <div className='quoteDetails'>
                <h3 id='quote'>"{quote.text}"</h3>
                <h2 id='author'>-{quote.author === null? "Anonymous": quote.author}</h2>
            </div>}
        </div>
    )
}

export default Quote