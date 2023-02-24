import { db } from "../utilities/firebase";
import { collection, getDocs, limit, orderBy, query, startAfter, endBefore, deleteDoc, doc, where, addDoc, updateDoc, limitToLast } from "firebase/firestore";



class VehicleModelService {
    fetchData = async(order, data) => {
        const model = [];
        var q = null;
        if(data !== "")
        {
           q = query(collection(db, "VehicleModel"), where('name', '==', data), limit(3));
        }
        else
        {
            q = query(collection(db, "VehicleModel"), orderBy("name", order), limit(3));
        }
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            model.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv, makeid: doc.data().makeid});
        })
        return model;
    }

    nextPage = async(data, order) => {
        const model = [];
        const q = query(collection(db, "VehicleModel"), orderBy("name", order), startAfter(data), limit(3));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            model.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv, makeid: doc.data().makeid});
        })
        if(model.length === 0)
        {
            return this.fetchData(order);
        }
        return model;
    }

    previousPage = async(data, order) => {
        const model = [];
        const q = query(collection(db, "VehicleModel"), orderBy("name", order), endBefore(data), limitToLast(3));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            model.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv, makeid: doc.data().makeid});
        })
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
        await deleteDoc(doc(db, "VehicleModel", id))
    }
}

export default VehicleModelService