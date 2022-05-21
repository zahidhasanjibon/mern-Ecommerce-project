import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import './Search.css';

function Search() {
    const history = useNavigate();
    const [keyword, setKeyword] = useState();
    const seachSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history(`/products/${keyword}`);
        }
    };

    return (
        <>
            <MetaData title="Serach A Product -- ECOMMERCE" />
            <div>
                <form className="searchBox" onSubmit={seachSubmitHandler}>
                    <input
                        type="text"
                        placeholder="Search a product ..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <input type="submit" value="search" />
                </form>
            </div>
        </>
    );
}

export default Search;
