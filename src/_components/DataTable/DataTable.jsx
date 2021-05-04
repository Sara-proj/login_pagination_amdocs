import React, { Component } from 'react';
import './DataTable.scss';
class DataTable extends Component {
    
    render() {
        const { items, columns,onRowSelected } = this.props;
        return (
                <div>
                    <div className="table-responsive-lg scroll pagination-centered float-left">
                        <table className="table table-hover table-bordered-secondary ">
                            <thead className="thead-dark">
                                <tr>
                                    {columns.map(column => (<th key={column} scope="col">{column}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (<tr key={item.id} onClick={()=>onRowSelected(item)} className={item.completed ? "completed" : "task"}>
                                    <th scope="row">{item.userId}</th>
                                    <td>{item.title}</td>
                                    <td><b>{item.completed ? "completed 🙂" : "TODO"}</b></td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                </div>
        );
    }
}

export default DataTable;