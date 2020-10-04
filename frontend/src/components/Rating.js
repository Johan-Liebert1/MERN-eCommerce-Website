import React from 'react'


const Rating = ({value, text, color}) => {
    let arr = [1,2,3,4,5]
    return (
        <div className='rating'>
            {
                arr.map(i => (
                    <span key = {i} >
                        <i 
                        style = {{color : color}}
                        className = {
                            value >= i ? 'fas fa-star' : 
                            value >= i - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'
                        }> </i>
                    </span>
                ))
            }
            <span className='ml-2'>{text && text}</span>
        </div>
    )
}

// Setting the default color of the starts to be yellowish

Rating.defaultProps = {
    color: '#f8e825'
}

export default Rating
