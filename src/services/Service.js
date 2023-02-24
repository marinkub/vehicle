import { db } from "../utilities/firebase";
import { collection, getDocs, limit, orderBy, query, startAfter, endBefore, deleteDoc, doc, where, addDoc, updateDoc } from "firebase/firestore";


class Service {

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

}

export default Service;