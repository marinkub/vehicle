import { db } from "../utilities/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Service from "./Service";

class VehicleMakeService {
    constructor() {
        this.Service = new Service();
    }
    
    fetchData = async(order, data) => {
        const make = await this.Service.fetch("VehicleMake", order, data);
        return make;
    }

    fetchallData = async() => {
        const make = [];
        const q = query(collection(db, "VehicleMake"), orderBy("name", "asc"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            make.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv});
        })
        return make;
    }

    nextPage = async(data, order) => {
        const make = await this.Service.next("VehicleMake", data, order);
        if(make.length === 0)
        {
            return this.fetchData(order)
        }
        else
        {
            return make;
        }
    }

    previousPage = async(data, order) => {
        const make = await this.Service.previous("VehicleMake", data, order);
        if(make.length === 0)
        {
            return this.fetchData(order)
        }
        else
        {
            return make;
        }
    }

    onDelete = async(id) => {
       await this.Service.delete("VehicleMake", id);
    }

    addNew = async(id, name, abrv) => {
        await this.Service.addNew(id, name, abrv);
    }

    edit = async(id, make, name, abrv) => {
        await this.Service.edit(id, make, name, abrv);
    }
}

export default VehicleMakeService;