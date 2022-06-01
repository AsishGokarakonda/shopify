import React from 'react'

const ReviewCard = (props) => {
    const item = props.review
    return (
        <div className="card col-md-3" >
            <div class="card-body">
                <h5 class="card-title">{item.username}</h5>
                <p class="card-text">{item.review}</p>
            </div>
        </div>
    )
}

export default ReviewCard