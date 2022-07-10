import React from 'react'

const Pagination = ({ currentPage, lastPage, handlePageChange }) => {
    const goPrev = () => {
        handlePageChange(currentPage - 1);
    }
    
    const goNext = () => {
        handlePageChange(currentPage + 1);
    }

    return (
        <div className="pagination">
            <button className="btn" onClick={goPrev} disabled={currentPage === 1}>Prev</button>
            <button className="btn" onClick={goNext} disabled={currentPage === lastPage}>Next</button>
        </div>
    )
}

export default Pagination;
