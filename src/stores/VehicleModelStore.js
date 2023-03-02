import { makeObservable, observable, action, runInAction, computed } from "mobx";
import VehicleModelService from "../services/VehicleModelService";
import VehicleMakeService from "../services/VehicleMakeService";

class VehicleModelStore {
    data = []
    makeList = []
    cursor = null
    fistVisible = null
    search = ''
    lastVisible = null
    order = 'asc'
    constructor() {
        this.modelService = new VehicleModelService();
        this.makeService = new VehicleMakeService();
        makeObservable(this, {
            data: observable,
            cursor: observable,
            fistVisible: observable,
            search: observable,
            makeList: observable,
            order: observable,
            handleSort: action,
            filtered: action,
            nextPage: action,
            DataList: computed
        })
    }

    getMakesAsync = async() => {
        const data = await this.modelService.fetchData(this.order, this.search);
        const make = await this.makeService.fetchallData();

        runInAction(() => {
            this.data = data;
            this.makeList = make;
        })
    }

    addNew = async(makeid, name) => {
        const abrv = name.toLowerCase();
        this.modelService.addNew(makeid, name, abrv);
        const data = await this.modelService.fetchData(this.order, this.search);
        runInAction(() => {
            this.data = data;
        })
    }

    editModel = async(id, makeid, name) => {
        const abrv = name.toLowerCase();
        await this.modelService.edit(id, makeid, name, abrv);
        const data = await this.modelService.fetchData(this.order, this.search);
        runInAction(() => {
            this.data = data;
        })
    }

    onDelete = async(id) => {
        await this.modelService.onDelete(id);
        const data = await this.modelService.fetchData(this.order, this.search);
        runInAction(() => {
            this.data = data;
        })
    }

    handleSort= async(values) => {
       if (values === "asc")
        {
            this.order = values
            const data = await this.modelService.fetchData(this.order, this.search);
            runInAction(() => {
                this.data = data;
            })
        }
        if (values === "desc")
        {
            this.order = values
            const data = await this.modelService.fetchData(this.order, this.search);
            runInAction(() => {
                this.data = data;
            })
        }
    }

    filtered = async(values) =>{
        const data = await this.modelService.fetchData(this.order, values)
        runInAction(() => {
            this.data = data;
        })
    }

    get MakeList() {
        return this.makeList;
    }

    get DataList() {
        const list = [];
        if(this.data.length > 0)
        {
            this.data.map(model => {  
                this.makeList.map(make => {
                    if(model.makeid === make.id)
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
        
    }

    nextPage = async() => {
        const lastVisible = this.data.length - 1;
        this.cursor = this.data[lastVisible].name;
        const data = await this.modelService.nextPage(this.cursor, this.order);
        runInAction(() => {
            this.data = data;
        })
    }

    previousPage = async() => {
        this.fistVisible = this.data[0].name;
        const data = await this.modelService.previousPage(this.fistVisible, this.order);
        runInAction(() => {
            this.data = data;
        })
    }

}

export default new VehicleModelStore();