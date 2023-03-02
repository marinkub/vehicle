function Pagination(props) {
    return(
        <div>
            <button className='buttonNext' onClick={props.previous}>previous</button>
            <button className='buttonPrev' onClick={props.next}>next</button>
        </div>
    )
}

export default Pagination