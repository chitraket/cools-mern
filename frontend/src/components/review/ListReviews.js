import React from 'react'
import { useTranslation } from "react-i18next";

function ListReviews({ reviews }) {
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    return (
        <div className="reviews w-75">
            <label className={`mt_20 ${rt1}`}>{t('reviews.reviews_other')} :</label>
            <hr />
            {reviews && reviews.map(review => (
                <div key={review._id} className="review-card my-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                    </div>
                    <p className="review_user">by {review.name}</p>
                    <p className="review_comment">{review.comment}</p>
                    <hr />
                </div>
            ))}

        </div>
    )
}

export default ListReviews
