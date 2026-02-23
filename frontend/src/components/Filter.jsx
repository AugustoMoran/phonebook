import React from 'react'

const Filter = ({ searchValue, onSearchChange }) => {
    return (
        <div>
            search: <input value={searchValue} onChange={onSearchChange} />
        </div>
    )
}

export default Filter