import { observer } from "mobx-react";
import { useEffect } from "react";
import ModelEditModal from "../component/ModelEditModal";



function ModelsPage(props) { 

    useEffect(()=> {
        props.store.ModelStore.getMakesAsync();
    }, []);

    return (
        <div>
        <h1>Vehile Model List</h1>
        <button className='buttonNew' onClick={() => props.store.openModelsModal()}>Add New</button>
        <select
            className='MakeSort'
            onChange={(e) => {
                props.store.ModelStore.handleSort(e.target.value);
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
        <button className='buttonNew' onClick={() => props.store.filterFunction("model")}>Search</button>
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>abrv</th>
                    <th>Make</th>
                </tr>
            </thead>
            <tbody>
            {props.store.ModelStore.DataList.map((make) => (
                    <tr key={make.id}>
                        <td>{make.name}</td>
                        <td>{make.abrv}</td>
                        <td>{make.makename}</td>
                        <td><button onClick={() =>{props.store.ModelStore.onDelete(make.id)}}>Delete</button></td>
                        <td><button  onClick={() => props.store.openModelsModal(make.id)}>Edit</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button className='buttonNext' onClick={() => {props.store.ModelStore.previousPage()}}>previous</button>
        <button className='buttonPrev' onClick={() => {props.store.ModelStore.nextPage()}}>next</button>
        <ModelEditModal store={props.store} title={props.store.ModleTitle} show={props.store.MakeModalShow} buttonTitle={props.store.buttonTitle} onClose={() => props.store.closeModelsModal()}></ModelEditModal>
    </div>
    )
}

export default observer(ModelsPage);