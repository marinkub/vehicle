import { db } from "../utilities/firebase";
import { collection, getDocs, limit, orderBy, query, startAfter, deleteDoc, doc, where, addDoc, updateDoc, onSnapshot, endBefore } from "firebase/firestore";
import VehicleMakeStore from "../stores/VehicleMakeStore";
import { runInAction } from "mobx";

class VehicleMakeService {
    
    fetchData = async() => {
        const q = query(collection(db, "VehicleMake"), orderBy("name", "asc"), limit(3));
        await onSnapshot(q, (querySnapshot) => {
            const makes = [];
            const fistVisible = querySnapshot.docs[0];
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length -1];
            querySnapshot.forEach((doc) => {
                makes.push(doc.data());
            });
            runInAction(() => {
                VehicleMakeStore.data = makes;
                VehicleMakeStore.fistVisible = fistVisible;
                VehicleMakeStore.cursor = lastVisible;
            })
        });
    }

    fetchallData = async() => {
        const q = query(collection(db, "VehicleMake"), orderBy("name", "asc"));
        await onSnapshot(q, (querySnapshot) => {
            const makes = [];
            querySnapshot.forEach((doc) => {
                makes.push(doc.data());
            });
            runInAction(() => {
                VehicleMakeStore.allData = makes;
            })
        });
    }

    nextPage = async(data) => {
        const q = query(collection(db, "VehicleMake"), orderBy("name", "asc"), startAfter(data) ,limit(3));
        await onSnapshot(q, (querySnapshot) => {
            const makes = [];
            const fistVisible = querySnapshot.docs[0];
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length -1];
            querySnapshot.forEach((doc) => {
                makes.push(doc.data());
            });
            runInAction(() => {
                VehicleMakeStore.data = makes;
                VehicleMakeStore.fistVisible = fistVisible;
                VehicleMakeStore.cursor = lastVisible;
            })
          });
    }

    previousPage = async(data) => {
        const q = query(collection(db, "VehicleMake"), orderBy("name", "asc"), endBefore(data) ,limit(3));
        await onSnapshot(q, (querySnapshot) => {
            const makes = [];
            const fistVisible = querySnapshot.docs[0];
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length -1];
            querySnapshot.forEach((doc) => {
                makes.push(doc.data());
            });
            runInAction(() => {
                VehicleMakeStore.data = makes;
                VehicleMakeStore.fistVisible = fistVisible;
                VehicleMakeStore.cursor = lastVisible;
            })
          });
    }

    addNew = async(id, name, abrv) => {
        await addDoc(collection(db, "VehicleMake"), {
            name: name,
            id: id,
            abrv: abrv
          });
        alert("Vehilce make added");
    }

    editMake = async(id, name, abrv) => {
        const q = query(collection(db, "VehicleMake"), where("id", "==", id));
        const DataSnapshot = await getDocs(q);
        DataSnapshot.docs.map(docs => {console.log(docs.id, '=>', docs.data());
            updateDoc(doc(db, "VehicleMake", docs.id), {
                name: name,
                abrv: abrv
            });
        });
    }

    onDelete = async(id) => {
        const q = query(collection(db, "VehicleMake"), where("id", "==", id));
        const DataSnapshot = await getDocs(q);
        DataSnapshot.docs.map(docs => {console.log(docs.id, '=>', docs.data());
            deleteDoc(doc(db, "VehicleMake", docs.id));
        });
    }

    
}

export default VehicleMakeService;