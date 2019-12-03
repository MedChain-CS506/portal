/*eslint-disable */
import React, { useState } from 'react'
import MaterialTable from 'material-table';

const NewPrescriptionsTable = () => {
    const [state, setState] = useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Dosage', field: 'dosage' },
            { title: 'Quantity', field: 'quantity' },
            { title: 'Date', field: 'date', type: 'numeric' },
            { title: 'Status', field: 'status', lookup: { 1: 'Pending', 2: 'Complete' } },
        ],

        data: [
            { name: 'Vicodin', dosage: '300 mg', quantity: '30 pills', date: 1987, status: 1 },
            { name: 'Simvastatin', dosage: '250 mg', quantity: '30 capsules', date: 2017, status: 2 },
        ],
    });
    
    return (
        <MaterialTable
            title="Prescriptions"
            columns={state.columns}
            data={state.data}
            editable={{

            onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        setState(prevState => {
                            const data = [...prevState.data];
                            data.push(newData);
                            return { ...prevState, data };
                        });
                    }, 600);
                }),

            onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        if (oldData) {
                            setState(prevState => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                            });
                        }
                    }, 600);
                }),

            onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                        resolve();
                        setState(prevState => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                            });
                    }, 600);
                }),
            }}
        />
    );
}

export default NewPrescriptionsTable