import Service from "./Service";


class VehicleModelService {
    constructor() {
        this.Service = new Service();
    }

    fetchData = async(order, data) => {
        const model = await this.Service.fetch("VehicleModel", order, data);
        return model;
    }

    nextPage = async(data, order) => {
        const model = await this.Service.next("VehicleModel", data, order);
        if(model.length === 0)
        {
            return this.fetchData(order);
        }
        else
        {
            return model;
        }
    }

    previousPage = async(data, order) => {
        const model = await this.Service.previous("VehicleModel", data, order);
        if(model.length === 0)
        {
            return this.fetchData(order);
        }
        else
        {
            return model;
        }
    }

    onDelete = async(id) => {
        await this.Service.delete("VehicleModel", id);
    }

    addNew = async(id, name, abrv) => {
        await this.Service.addNew(id, name, abrv);
    }

    edit = async(id, make, name, abrv) => {
        await this.Service.edit(id, make, name, abrv);
    }
}

export default VehicleModelService