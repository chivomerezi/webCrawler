import React from 'react'

const Page = props => {
    return (
        <div className="py-3">
            <button onClick={props.previousPage} type="button" className="btn btn-info mr-1">&larr; Anterior</button>
            <button onClick={props.nextPage} type="button" className="btn btn-info">Siguiente &rarr;</button>
        </div>
    )
}

export default Page;

