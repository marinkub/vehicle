import { db } from "../utilities/firebase";
import { collection, getDocs, limit, orderBy, query, startAfter, deleteDoc, doc, where, addDoc, updateDoc, endBefore, limitToLast } from "firebase/firestore";


class VehicleMakeService {
    
    fetchData = async(order, data) => {
        const make = [];
        var q = null;
        if(data !== "")
        {
            q = query(collection(db, "VehicleMake"), where("name", '==', data), limit(2));
        }
        else
        {
            q = query(collection(db, "VehicleMake"), orderBy("name", order), limit(2));
        }
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            make.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv});
        })
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
        const make = [];
        const q = query(collection(db, "VehicleMake"), orderBy("name", order), startAfter(data) ,limit(2));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            make.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv});
        })
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
        const make = [];
        const q = query(collection(db, "VehicleMake"), orderBy("name", order), endBefore(data) ,limitToLast(2));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            make.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv});
        })
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
        await deleteDoc(doc(db, "VehicleMake", id));
    }

    
}

export default VehicleMakeService;