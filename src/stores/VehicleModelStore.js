import { makeObservable, observable, action } from "mobx";
import VehicleModelService from "../services/VehicleModelService";
import VehicleMakeStore from "./VehicleMakeStore";

class VehicleModelStore {
    data = []
    allData = []
    cursor = null
    fistVisible = null
    id = null
    values = {
		name: '',
        makeid: ''
	};
    newvalues = {
        name: '',
        makeid: ''
    }
    search = ''
    lastVisible = null
    constructor() {
        this.modelService = new VehicleModelService();
        this.makeStore =  VehicleMakeStore;
        makeObservable(this, {
            data: observable,
            id: observable,
            values: observable,
            allData: observable,
            cursor: observable,
            fistVisible: observable,
            search: observable,
            newvalues: observable,
            handleSort: action,
            filtered: action,
            nextPage: action,
            setValues: action,
            setSelected: action,
            unsetSelected: action,
            setValuesNew: action,
            
        })
    }

    getMakesAsync = async() => {
        await this.modelService.fetchData();
        await this.modelService.fetchallData();
        await this.makeStore.getMakesAsync();
    }

    setValues(values) {
        this.values = values;
    }

    setValuesNew(values) {
        this.newvalues = values;
    }

    onChangeInputName = (e) => {
        const { name, value } = e.target;
        this.setValues({...this.values, [name]: value});
    }

    onChangeInputNew = (e) => {
		const { name, value } = e.target;
		this.setValuesNew({ ...this.newvalues, [name]: value });
	};

    setSelected = (id) => {
        this.id = id;
        this.data.map(a => {
            if(a.id === id)
            {
                this.values.name = a.name;
                this.values.makeid = a.makeid;
            }
        })
    }

    unsetSelected() {
        this.values.makeid = "";
        this.values.name = "";
        this.id = "";
    }

    onChangeInputMakeid = (e) => {
        this.values.makeid = e
        console.log(this.values.makeid);
    }

    onChangeInputMakeidNew = (e) => {
        this.newvalues.makeid = e
        console.log(this.newvalues.makeid);
    }

    addNew = () => {
        
        const ascModel = this.allData.slice().sort((a, b) => (a.id > b.id ? 1 : -1));
        const lastIndex = ascModel.length - 1;
        const id = ascModel[lastIndex].id + 1;
        const abrv = this.newvalues.name.toLowerCase();
        const makeid = this.newvalues.makeid;
        console.log(id, this.newvalues.name, makeid);
        this.modelService.addNew(id, makeid, this.newvalues.name, abrv);
        this.newvalues.name = "";
        this.newvalues.makeid = "";
    }

    editModel = async() => {
        const abrv = this.values.name.toLowerCase();
        await this.modelService.editModel(this.id, this.values.makeid, this.values.name, abrv)
    }

    onDelete = async(id) => {
        await this.modelService.onDelete(id);
    }

    handleSort= (values) => {
        if (values === "asc")
        {
            const ascMake = this.data.slice().sort((a, b) => (a.name > b.name ? 1 : -1));
            this.data = ascMake;
            
        }
        if (values === "desc")
        {
            const decsMake = this.data.slice().sort((a, b) => (a.name < b.name ? 1 : -1));
            this.data = decsMake;
            
        }
    }

    filtered(values) {
        this.search = values;
    }

    get MakeList() {
        return this.makeStore.allData;
    }


    get DataList() {
        const cars = this.data.filter((car) => {
            return car.name.toLowerCase().includes(this.search.toLowerCase());
        })
        if (cars.length)
        {
            const list = [];
            cars.map(model => {
                this.makeStore.allData.map(make => {
                    if(model.makeid == make.id)
                    {
                        list.push({
                            name: model.name,
                            makeid: model.makeid,
                            makename: make.name,
                            abrv: model.abrv,
                            id: model.id
                        })
                    }
                    
                })
            })
            return list;
        } 
        else
        {
            const list = [];
            this.data.map(model => {
                this.makeStore.allData.map(make => {
                    console.log(make.name)
                    if(model.makeid == make.id)
                    {
                        list.push({
                            name: model.name,
                            makeid: model.makeid,
                            makename: make.name,
                            abrv: model.abrv,
                            id: model.id
                        })
                    }
                    
                })
            })
            return list
        } 
    }

    nextPage = async() => {
       await this.modelService.nextPage(this.cursor);
    }

    previousPage = async() => {
        await this.modelService.previousPage(this.fistVisible);
    }

}

export default new VehicleModelStore();