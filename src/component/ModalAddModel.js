import React from "react";
import './Modal.css';
import { observer } from "mobx-react";

const ModalAddModel = props => {
    if (!props.show) {
        return null
    }
    const store = props.store;
    store.unsetSelected();
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">
                <select 
                    className="modelidAdd"
                    value={store.newvalues.makeid}
                    onChange={(e) => {
                        store.onChangeInputMakeidNew(e.target.value);
                    }}
                >
                    <option value="">Select Make</option>
                    {store.MakeList.map(make => (
                        <option key={make.id} value={make.id}>{make.name}</option>
                    ))}
                </select>
                <label>Name: </label>
                    <input
						id="name"
						type="text"
						name="name"
						value={store.newvalues.name}
						placeholder="Name"
						onChange={store.onChangeInputNew}
						className="form-control"
						required
					/>
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={()=>{store.addNew()}}>Add</button>
                    <button className="modal-button" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default observer(ModalAddModel);