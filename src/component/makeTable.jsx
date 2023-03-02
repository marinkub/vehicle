function MakeTable(props) {
    return (
        <div>
            <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>abrv</th>
                </tr>
            </thead>
            <tbody>
                {props.list
                    ? props.list.map((make) => (
                        <tr key={make.id}>
                            <td>{make.name}</td>
                            <td>{make.abrv}</td>
                            <td><button onClick={() =>{props.store.MakeStore.onDelte(make.id)}}>Delete</button></td>
                            <td><button  onClick={() => props.store.openMakeModal(make.id)}>Edit</button></td>
                        </tr>
                    ))
                    : <tr><td>No results</td></tr>
                }
            </tbody>
        </table>
        </div>
    )
}

export default MakeTable;