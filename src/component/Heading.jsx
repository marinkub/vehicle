function Heading(props) {

    return (
        <div>
            <button className='buttonNew' onClick={() => props.store.openMakeModal()}>Add New</button>
        <select
            className='MakeSort'
            onChange={(e) => {
                if(props.service === "make")
                {
                    props.store.MakeStore.handleSort(e.target.value);
                }
                if(props.service === "model")
                {
                    props.store.ModelStore.handleSort(e.target.value);
                }
            }}
        >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
        </select>
        <input 
            type="search"
            onChange={(e) => {
                props.store.onChangeFilter(e.target.value)
            }}
            className="input"
            placeholder="Filter"
        />
        <button className='buttonNew' onClick={() => props.store.filterFunction(props.service)}>Search</button>
        </div>
    )
}

export default Heading;