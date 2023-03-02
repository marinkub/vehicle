import { db } from "../utilities/firebase";
import { collection, getDocs, limit, orderBy, query, startAfter, endBefore, deleteDoc, doc, where, addDoc, updateDoc, limitToLast } from "firebase/firestore";


class Service {

    fetch = async(service, order, data) => {
        const list = [];
        var q = null;
        if(data !== "")
        {
            q = query(collection(db, service), where("name", '==', data), limit(2));
        }
        else
        {
            q = query(collection(db, service), orderBy("name", order), limit(2));
        }
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(service === "VehicleMake")
            {
                list.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv});
            }
            else
            {
                list.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv, makeid: doc.data().makeid});
            }
        })
        return list;
    }

    addNew = async(makeid, name, abrv) => {
        if(!makeid)
        {
            await addDoc(collection(db, "VehicleMake"), {
                name: name,
                abrv: abrv
            })
        }
        else 
        {
            await addDoc(collection(db, "VehicleModel"), {
                makeid: makeid,
                name: name,
                abrv: abrv
            })
        }
    }

    edit = async(id, makeid, name, abrv) => {
        if(!makeid)
        {
            await updateDoc(doc(db, "VehicleMake", id), {
                name: name,
                abrv: abrv
            })
        }
        else
        {
            await updateDoc(doc(db, "VehicleModel", id), {
                makeid: makeid,
                name: name,
                abrv: abrv
            })
        }
    }

    delete = async(service, id) => {
        await deleteDoc(doc(db, service, id));
    }

    next = async(service, data, order) => {
        const list = [];
        const q = query(collection(db, service), orderBy("name", order), startAfter(data) ,limit(2));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(service === "VehicleMake")
            {
                list.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv});
            }
            else
            {
                list.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv, makeid: doc.data().makeid});
            }
        })
        return list;
    }

    previous = async(service, data, order) => {
        const list = [];
        const q = query(collection(db, service), orderBy("name", order), endBefore(data) ,limitToLast(2));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if(service === "VehicleMake")
            {
                list.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv});
            }
            else
            {
                list.push({id: doc.id, name: doc.data().name, abrv: doc.data().abrv, makeid: doc.data().makeid});
            }
        })
        return list;
    }

}

export default Service;