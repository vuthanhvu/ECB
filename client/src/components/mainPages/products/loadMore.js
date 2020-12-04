import React, {useContext} from 'react'
import {GlobalState} from '../../../globalState'

function LoadMore() {
    const state = useContext(GlobalState);
    const [page, setPage] = state.productsAPI.page;
    const [result] = state.productsAPI.result;

    return (
        <div className="load_more">
            {
                result < page * 9 ? ""
                : <button onClick={() => setPage(page+1)}>Loading more</button>
            }
        </div>
    )
}

export default LoadMore
