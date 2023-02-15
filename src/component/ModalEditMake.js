import React from "react";
import './Modal.css';
import { observer } from "mobx-react";

const ModalEditMake = props => {
    if (!props.show) {
        return null
    }
    const store = props.store;
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                </div>
                <div className="modal-body">
                <label>Name: </label>
                    <input
						id="name"
						type="text"
						name="name"
						value={store.values.name}
						placeholder="Name"
						onChange={store.onChangeInput}
						className="form-control"
						required
					/>
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={()=>{store.editMake()}}>Edit</button>
                    <button className="modal-button" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default observer(ModalEditMake);