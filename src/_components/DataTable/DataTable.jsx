import React, { Component } from 'react';
import './DataTable.scss';
class DataTable extends Component {
    
    render() {
        const { items, columns } = this.props;
        return (
                <div className="center">
                    <div className="table-responsive-lg scroll pagination-centered">
                        <table className="table table-hover table-bordered-secondary ">
                            <thead className="thead-dark">
                                <tr>
                                    {columns.map(column => (<th scope="col">{column}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (<tr key={item.id} className={item.completed ? "completed" : "task"}>
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