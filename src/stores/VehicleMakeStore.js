import {  makeObservable, observable, action, runInAction } from "mobx";
import VehicleMakeService from "../services/VehicleMakeService";
import Service from "../services/Service";

class VehicleMakeStore {
    data = []
    search = ''
    cursor = null
    fistVisible = null
    order = 'asc'
    search = ''
    constructor() {
        this.makeService = new VehicleMakeService();
        this.Service = new Service();
        makeObservable(this, {
            data: observable,
            search: observable,
            cursor: observable,
            fistVisible: observable,
            order: observable,
            search: observable,
            handleSort: action,
            filtered: action,
            nextPage: action
        })
    }

    getMakesAsync = async() => {
        const data = await this.makeService.fetchData(this.order, this.search);

        runInAction(() => {
            this.data = data;
        })
    }

    addNew = async(id, name) => {
        const abrv = name.toLowerCase()
        this.Service.addNew(id, name, abrv)
        const data = await this.makeService.fetchData(this.order, this.search);
        runInAction(() => {
            this.data = data;
        })
    }

    editMake = async(id, make, name) => {
        const abrv = name.toLowerCase();
        await this.Service.edit(id, make, name, abrv);
        const data = await this.makeService.fetchData(this.order, this.search);
            runInAction(() => {
                this.data = data;
            })
    }


    onDelte = async(id) => {
        await this.makeService.onDelete(id);
        const data = await this.makeService.fetchData(this.order, this.search);
            runInAction(() => {
                this.data = data;
            })
    }

    async handleSort(values) {
        if (values === "asc")
        {
            this.order = values
            const data = await this.makeService.fetchData(this.order, this.search);
            runInAction(() => {
                this.data = data;
            })
        }
        if (values === "desc")
        {
            this.order = values
            const data = await this.makeService.fetchData(this.order, this.search);
            runInAction(() => {
                this.data = data;
            })
        }
    }

    filtered = async(values) => {
        const data = await this.makeService.fetchData(this.order, values);
        runInAction(() => {
            this.data = data;
        })
    }

    get DataList() {
        return this.data;
    }

    nextPage= async() => {
        const lastVisible = this.data.length - 1;
        this.cursor = this.data[lastVisible].name;
        const data = await this.makeService.nextPage(this.cursor, this.order);
        runInAction(() => {
            this.data = data;
        })
    }

    previousPage = async() => {
        this.fistVisible = this.data[0].name;
        const data = await this.makeService.previousPage(this.fistVisible, this.order);
        runInAction(() => {
            this.data = data;
        })
    }
}

export default new VehicleMakeStore();