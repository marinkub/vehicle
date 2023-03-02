function ModelTable(props) {
    return (
        <div>
            <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>abrv</th>
                    <th>Make</th>
                </tr>
            </thead>
            <tbody>
            {props.list
                ? props.list.map((make) => (
                        <tr key={make.id}>
                            <td>{make.name}</td>
                            <td>{make.abrv}</td>
                            <td>{make.makename}</td>
                            <td><button onClick={() =>{props.store.ModelStore.onDelete(make.id)}}>Delete</button></td>
                            <td><button  onClick={() => props.store.openModelsModal(make.id)}>Edit</button></td>
                        </tr>
                    ))
                :<tr><td>No results</td></tr>
                }
            </tbody>
            </table>
        </div>
    )
}

export default ModelTable;