import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";


const Search = ({ history }) => {
    const [keyword, setKeyword] = useState('');
    const [t, i18n] = useTranslation('common');
    const rt1 = ( i18n.language === 'pk' ? 'text-right' : '' )
    const searchHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }
    return (
        <div className="main-search pull-right">
            <div className="search-overlay">
                <Link to={window.location.pathname} className="search-overlay-close" />
                <div className="container">
                    <form onSubmit={searchHandler}>
                        <input onChange={(e) => setKeyword(e.target.value)} id="search_field" style={{paddingRight:(i18n.language  === 'pk' ? '50px' : '')}} className={`${rt1}`} placeholder={t('search.search')} type="text" />
                        <button type="submit" />
                    </form>
                </div>
            </div>
            <div className="header-search"> <a id="search-overlay-btn" /> </div>
        </div>

    )
}

export default Search
