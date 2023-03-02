import { observer } from "mobx-react";
import { useEffect } from "react";
import MakeEditModal from "../component/MakeEditModal";
import Pagination from "../component/Pagination";
import MakeTable from "../component/makeTable";
import Heading from "../component/Heading";

function MakePage(props) { 

    useEffect(()=> {
       props.store.MakeStore.getMakesAsync(); 
    }, []);

    return (
        <div>
        <h1>Vehile Make List</h1>
        <Heading store={props.store} service={"make"}/>
        <MakeTable store={props.store} list={props.store.MakeStore.DataList}></MakeTable>
        <Pagination previous={() =>props.store.MakeStore.previousPage()} next={() => props.store.MakeStore.nextPage()}/>
        <MakeEditModal store={props.store} title={props.store.title} buttonTitle={props.store.buttonTitle} show={props.store.MakeModalShow} onClose={() => props.store.closeMakeModal()}></MakeEditModal>
    </div>
    )
}

export default observer(MakePage);