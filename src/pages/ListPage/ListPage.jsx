import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listActions } from '../../_actions';
import DataTable from '../../_components/DataTable/DataTable';
import Pagination from '../../_components/pagination/pagination';
import Map from "../../_components/map/map";


const settings = {
    min: 5,
    max: 20,
    step: 5
}

function ListPage() {
    const list = useSelector(state => state.list);
    const [currentItems, setCurrentItems] = useState([]);
    const [selectedPositions, setSelectedPositions] = useState(null);
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

    function onRowSelected(item) {
        const mapPositions = [
            {
                key: item.id,
                lat: item.positions[0].lat,
                lng: item.positions[0].lng,
                title: `userId ${item.userId}`,
                description: item.title,
            }, {
                key: item.id + 1,
                lat: item.positions[1].lat,
                lng: item.positions[1].lng,
                title: `userId ${item.userId}`,
                description: item.title,
            }
        ];
        setSelectedPositions(mapPositions);
    }

    return (
        <>
            <div className="row">
                <div className="col-10">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 col-md-8">
                            {list.loading && <em>Loading items...</em>}
                            {list.error && <span className="text-danger">ERROR: {list.error}</span>}
                            {currentItems &&
                                <>
                                    <DataTable items={currentItems} columns={["userId", "title", "completed?"]} onRowSelected={onRowSelected} />
                                </>
                            }
                            <Pagination items={list.items} onChangePage={onChangePage} settings={settings} />
                        </div>
                    </div>
                </div>
                <div className="col-2 col-md-1 col-sm-12">
                    {selectedPositions && <Map positions={selectedPositions} />}
                </div>

            </div>
        </>
    );
}

export { ListPage };