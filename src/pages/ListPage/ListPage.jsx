import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listActions } from '../../_actions';
import DataTable from '../../_components/DataTable/DataTable';
import Pagination from '../../_components/pagination/pagination';

const settings={
    min:5,
    max:20,
    step:5
}

function ListPage() {
    const list = useSelector(state => state.list);
    const [currentItems, setCurrentItems] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listActions.getAll());
    }, []);

    function handleDeleteItem(id) {
        dispatch(listActions.delete(id));
    }

    function onChangePage(pager) {
        console.log("pager", pager);
        setCurrentItems(pager.items);
    }

    return (
        <>
            <div className="row">
                {list.loading && <em>Loading items...</em>}
                {list.error && <span className="text-danger">ERROR: {list.error}</span>}
                {currentItems &&
                    <>
                        <DataTable items={currentItems} columns={["userId","title","completed?"]} />
                    </>
                }
            </div>
            <Pagination items={list.items} onChangePage={onChangePage} settings={settings}/>
        </>
    );
}

export { ListPage };