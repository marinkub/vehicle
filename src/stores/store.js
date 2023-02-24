import { action, makeObservable, observable } from "mobx";
import VehicleMakeStore from "./VehicleMakeStore";
import VehicleModelStore from "./VehicleModelStore";

class Store {
    values = {
        name:'',
        makeid: ''
    }
    title = ""
    ModleTitle = ""
    buttonTitle = ""
    MakeModalShow = false
    MakeId = null
    filter = ""
    constructor() {
        this.MakeStore = VehicleMakeStore;
        this.ModelStore = VehicleModelStore;
        makeObservable(this, {
            values: observable,
            title: observable,
            buttonTitle: observable,
            MakeModalShow: observable,
            MakeId: observable,
            ModleTitle: observable,
            filter: observable,
            setValues: action,
            currentId: action,
            openMakeModal: action,
            closeMakeModal: action,
            selectedModel: action,
            openModelsModal: action,
            closeModelsModal: action,
            onChangeInputMakeid: action,
            onChangeFilter: action
        })
    }

    setValues(values) {
        this.values = values;
    }

    onChangeInput = (e) => {
        const { name, value } = e.target;
        this.setValues({ ...this.values, [name]: value})
    }

    onChangeInputMakeid = (e) => {
        this.values.makeid = e;
    }

    onChangeFilter = (e) => {
        this.filter = e;
    }

    currentId = (id) => {
        if(!id)
        {
            this.values.name = "";
            this.title = "Add new make";
            this.buttonTitle = "Add";
        }
        else
        {
            this.MakeStore.data.map(a => {
                if(a.id === id)
                {
                    this.values.name = a.name;
                    this.title = "Edit make";
                    this.buttonTitle = "Edit";
                    this.MakeId = a.id;
                }
            })
        }
    }

    filterFunction = (service) => {
        if(service === "model")
        {
            this.ModelStore.filtered(this.filter);
        }
        else
        {
            this.MakeStore.filtered(this.filter);
        }
    }

    selectedModel = (id) => {
        if(!id)
        {
            this.values.name = "";
            this.values.makeid = "";
            this.ModleTitle = "Add new model";
            this.buttonTitle = "Add";
        }
        else
        {
            this.ModelStore.data.map(a => {
                if(a.id === id)
                {
                    this.values.name = a.name;
                    this.values.makeid = a.makeid;
                    this.ModleTitle = "Edit model";
                    this.buttonTitle = "Edit";
                    this.MakeId = a.id;
                }
            })
        }
    }

    openMakeModal = (id) => {
        this.MakeModalShow = true;
        this.currentId(id);
    }

    closeMakeModal = () => {
        this.MakeModalShow = false;
    }

    openModelsModal = (id) => {
        this.MakeModalShow = true;
        this.selectedModel(id);
    }

    closeModelsModal = () => {
        this.MakeModalShow = false;
    }

    MakeModalAction = () => {
        if(this.values.name !== "")
        {
            if(!this.MakeId)
            {
                this.MakeStore.addNew(this.MakeId, this.values.name);
                this.closeMakeModal();
            }
            else
            {
                this.MakeStore.editMake(this.MakeId, this.values.makeid, this.values.name);
                this.closeMakeModal();
                this.MakeId = null;
            }
        }
        else 
        {
            alert("Name input can't be empty!");
        }
    }

    ModelsModalAction = () => {
        if(this.values.name !== "" && this.values.makeid !== "")
        {
            if(!this.MakeId)
            {
                this.ModelStore.addNew(this.values.makeid, this.values.name);
                this.closeModelsModal();
            }
            else
            {
                this.ModelStore.editModel(this.MakeId, this.values.makeid, this.values.name);
                this.closeModelsModal();
                this.MakeId = null;
            }
        }
        else 
        {
            alert("Inputs can't be empty!");
        }
    }
}

export default new Store();