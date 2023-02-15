import * as React from 'react';
import { observer, inject } from 'mobx-react';
import ModalAddModel from '../component/ModalAddModel';
import ModalEditModel from '../component/ModalEditModel';

class VehileViewModels extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: true,
            showadd: false,
            showedit: false,
        }
    }

    async componentDidMount() {
        await this.props.VehicleModelStore.getMakesAsync();
        this.setState({loading: false});
    }

    expendModal = () => {
        this.setState({showadd: true});
    }

    expendModalEdit = (id) => {
        this.setState({showedit: true});
        this.props.VehicleModelStore.setSelected(id);
    }

    closeModal = () => {
        this.setState({showadd: false});
        this.setState({showedit: false});
    }

    render() {
        if(this.state.loading === true)
        {
            return null
        }
        else 
        {
            return (
                <div>
                    <h1>Vehile Model List</h1>
                    <button className='buttonNew' onClick={() => this.expendModal()}>Add New</button>
                    <select
                        className='MakeSort'
                        onChange={(e) => {
                            this.props.VehicleModelStore.handleSort(e.target.value);
                        }}
                    >
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <input 
                        type="search"
                        onChange={(e) => {
                            this.props.VehicleModelStore.filtered(e.target.value)
                        }}
                        className="input"
                        placeholder="Filter"
                    />
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Abrv</th>
                                <th>Make</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.VehicleModelStore.DataList.map(model => (
                                <tr key={model.id}>
                                    <td>{model.name}</td>
                                    <td>{model.abrv}</td>
                                    <td>{model.makename}</td>
                                    <td><button onClick={() =>{this.props.VehicleModelStore.onDelete(model.id)}}>Delete</button></td>
                                    <td><button onClick={() => this.expendModalEdit(model.id)}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='buttonNext' onClick={() => {this.props.VehicleModelStore.previousPage()}}>previous</button>
                    <button className='buttonPrev' onClick={() => {this.props.VehicleModelStore.nextPage()}}>next</button>
                    <ModalAddModel store={this.props.VehicleModelStore} title={"Add new model"} onClose={() => {this.closeModal()}} show={this.state.showadd}></ModalAddModel>
                    <ModalEditModel store={this.props.VehicleModelStore} title={"Add new model"} onClose={() => {this.closeModal()}} show={this.state.showedit}></ModalEditModel>
                </div>
            )
        }
    }
}

export default inject("VehicleModelStore")(observer(VehileViewModels));