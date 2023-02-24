import { observer } from "mobx-react";
import { useEffect } from "react";
import MakeEditModal from "../component/MakeEditModal";

function MakePage(props) { 

    useEffect(()=> {
        props.store.MakeStore.getMakesAsync(); 
    }, []);

    return (
        <div>
        <h1>Vehile Make List</h1>
        <button className='buttonNew' onClick={() => props.store.openMakeModal()}>Add New</button>
        <select
            className='MakeSort'
            onChange={(e) => {
                props.store.MakeStore.handleSort(e.target.value);
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
        <button className='buttonNew' onClick={() => props.store.filterFunction("make")}>Search</button>
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>abrv</th>
                </tr>
            </thead>
            <tbody>
                {props.store.MakeStore.DataList.map((make) => (
                    <tr key={make.id}>
                        <td>{make.name}</td>
                        <td>{make.abrv}</td>
                        <td><button onClick={() =>{props.store.MakeStore.onDelte(make.id)}}>Delete</button></td>
                        <td><button  onClick={() => props.store.openMakeModal(make.id)}>Edit</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button className='buttonNext' onClick={() => {props.store.MakeStore.previousPage()}}>previous</button>
        <button className='buttonPrev' onClick={() => {props.store.MakeStore.nextPage()}}>next</button>
        <MakeEditModal store={props.store} title={props.store.title} buttonTitle={props.store.buttonTitle} show={props.store.MakeModalShow} onClose={() => props.store.closeMakeModal()}></MakeEditModal>
    </div>
    )
}

export default observer(MakePage);