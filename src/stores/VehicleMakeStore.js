import {  makeObservable, observable, action } from "mobx";
import VehicleMakeService from "../services/VehicleMakeService";

class VehicleMakeStore {
    data = []
    allData = []
    values = {
		name: '',
	};
    Newvalues = {
		name: '',
	};
    id= null
    search = ''
    cursor = null
    fistVisible = null
    constructor() {
        this.makeService = new VehicleMakeService();
        makeObservable(this, {
            data: observable,
            values: observable,
            Newvalues: observable,
            id: observable,
            search: observable,
            cursor: observable,
            fistVisible: observable,
            handleSort: action,
            filtered: action,
            nextPage: action,
            setValues: action,
            setValuesNew: action,
            currentId: action,
            setName: action
        })
    }

    getMakesAsync = async() => {
        await this.makeService.fetchData();
        await this.makeService.fetchallData()
    }

    setValues(values) {
		this.values = values;
	}

    setValuesNew(values) {
		this.Newvalues = values;
	}

    setName =() => {
        this.values.name = "";
    }

    onChangeInput = (e) => {
		const { name, value } = e.target;
		this.setValues({ ...this.values, [name]: value });
	};

    onChangeInputNew = (e) => {
		const { name, value } = e.target;
		this.setValuesNew({ ...this.Newvalues, [name]: value });
	};

    addNew = () => {
        const ascMake = this.allData.slice().sort((a, b) => (a.id > b.id ? 1 : -1));
        const lastIndex = ascMake.length - 1;
        const id = ascMake[lastIndex].id + 1;
        const abrv = this.Newvalues.name.toLowerCase()
        this.makeService.addNew(id, this.Newvalues.name, abrv)
        this.Newvalues.name = "";
    }

    editMake = async() => {
        const abrv = this.values.name.toLowerCase();
        await this.makeService.editMake(this.id, this.values.name, abrv);
    }

    currentId = (id) => {
        this.id = id;
        this.data.map(a => {
            if(a.id === this.id)
            {
                console.log(a.name);
                this.values.name = a.name;
            }
        })
    }

    onDelte = async(id) => {
        await this.makeService.onDelete(id);
    }

    handleSort(values) {
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

    get DataList() {
        const items = this.data.filter((item) => {
            return item.name.toLowerCase().includes(this.search.toLowerCase())
        });
        if (items.length) return items;
        return this.data;
    }

    nextPage= async() => {
        await this.makeService.nextPage(this.cursor);
    }

    previousPage = async() => {
        await this.makeService.previousPage(this.fistVisible);
    }
}

export default new VehicleMakeStore();