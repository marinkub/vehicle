import * as React from 'react';
import { observer, inject } from 'mobx-react';
import ModalAddMake from '../component/ModalAddMake';
import ModalEditMake from '../component/ModalEditMake';

class VehileViewMakes extends React.Component{
    constructor(){
        super()

        this.state = {
            loading: true,
            showadd: false,
            showedit: false,
        }
    }

    async componentDidMount() {
        await this.props.VehicleMakeStore.getMakesAsync();
        this.setState({loading: false});
    }

    expendModal = () => {
        this.setState({showadd: true});
    }

    expendModalEdit = (id) => {
        this.setState({showedit: true});
        this.props.VehicleMakeStore.currentId(id)
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
                    <h1>Vehile Make List</h1>
                    <button className='buttonNew' onClick={() => this.expendModal()}>Add New</button>
                    <select
                        className='MakeSort'
                        onChange={(e) => {
                            this.props.VehicleMakeStore.handleSort(e.target.value);
                        }}
                    >
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                    <input 
                        type="search"
                        onChange={(e) => {
                            this.props.VehicleMakeStore.filtered(e.target.value)
                        }}
                        className="input"
                        placeholder="Filter"
                    />
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>abrv</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.VehicleMakeStore.DataList.map((make) => (
                                <tr key={make.id}>
                                    <td>{make.name}</td>
                                    <td>{make.abrv}</td>
                                    <td><button onClick={() =>{this.props.VehicleMakeStore.onDelte(make.id)}}>Delete</button></td>
                                    <td><button  onClick={() => this.expendModalEdit(make.id)}>Edit</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className='buttonNext' onClick={() => {this.props.VehicleMakeStore.previousPage()}}>previous</button>
                    <button className='buttonPrev' onClick={() => {this.props.VehicleMakeStore.nextPage()}}>next</button>
                    <ModalAddMake store={this.props.VehicleMakeStore} title={"Add new make"} onClose={() => this.closeModal()} show={this.state.showadd}></ModalAddMake>
                    <ModalEditMake store={this.props.VehicleMakeStore} title={"Edit make"} onClose={() => this.closeModal()} show={this.state.showedit}></ModalEditMake>
                </div>
            )
        }
    }
}

export default inject("VehicleMakeStore")(observer(VehileViewMakes));