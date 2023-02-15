import { db } from "../utilities/firebase";
import { collection, onSnapshot, getDocs, limit, orderBy, query, startAfter, endBefore, deleteDoc, doc, where, addDoc, updateDoc } from "firebase/firestore";
import VehicleModelStore from "../stores/VehicleModelStore";
import { runInAction } from "mobx";


class VehicleModelService {
    fetchData = async() => {
        const q = query(collection(db, "VehicleModel"), orderBy("name", "asc"), limit(4));
        await onSnapshot(q, (querySnapshot) => {
            const makes = [];
            const fistVisible = querySnapshot.docs[0];
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length -1];
            querySnapshot.forEach((doc) => {
                makes.push(doc.data());
            });
            runInAction(() => {
                VehicleModelStore.data = makes;
                VehicleModelStore.fistVisible = fistVisible;
                VehicleModelStore.cursor = lastVisible;
            })
        });
    }

    fetchallData = async() => {
        const q = query(collection(db, "VehicleModel"), orderBy("name", "asc"));
        await onSnapshot(q, (querySnapshot) => {
            const makes = [];
            querySnapshot.forEach((doc) => {
                makes.push(doc.data());
            });
            runInAction(() => {
                VehicleModelStore.allData = makes;
            })
        });
    }

    nextPage = async(data) => {
        const q = query(collection(db, "VehicleModel"), orderBy("name", "asc"), startAfter(data) ,limit(4));
        await onSnapshot(q, (querySnapshot) => {
            const makes = [];
            const fistVisible = querySnapshot.docs[0];
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length -1];
            querySnapshot.forEach((doc) => {
                makes.push(doc.data());
            });
            runInAction(() => {
                VehicleModelStore.data = makes;
                VehicleModelStore.fistVisible = fistVisible;
                VehicleModelStore.cursor = lastVisible;
            })
          });
    }

    previousPage = async(data) => {
        const q = query(collection(db, "VehicleModel"), orderBy("name", "asc"), endBefore(data) ,limit(4));
        await onSnapshot(q, (querySnapshot) => {
            const makes = [];
            const fistVisible = querySnapshot.docs[0];
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length -1];
            querySnapshot.forEach((doc) => {
                makes.push(doc.data());
            });
            runInAction(() => {
                VehicleModelStore.data = makes;
                VehicleModelStore.fistVisible = fistVisible;
                VehicleModelStore.cursor = lastVisible;
            })
          });
    }

    addNew = async(id, makeid, name, abrv) => {
        await addDoc(collection(db, "VehicleModel"), {
            id: id,
            makeid: makeid,
            name: name,
            abrv: abrv
        });
        alert("Vehicle model added");
    }

    editModel = async(id, makeid, name, abrv) => {
        const q = query(collection(db, "VehicleModel"), where("id", "==", id));
        const DataSnapshot = await getDocs(q);
        DataSnapshot.docs.map(docs => {console.log(docs.id, '=>', docs.data());
            updateDoc(doc(db, "VehicleModel", docs.id), {
                makeid: makeid,
                name: name,
                abrv: abrv
            });
        });
    }

    onDelete = async(id) => {
        const q = query(collection(db, "VehicleModel"), where("id", "==", id));
        const DataSnapshot = await getDocs(q);
        DataSnapshot.docs.map(docs => {console.log(docs.id, '=>', docs.data());
        deleteDoc(doc(db, "VehicleModel", docs.id))
        })
    }
}

export default VehicleModelService