// selectors
export const getAllTables = (state) => state;
export const getTableById = (state, id) =>
    state.table.filter(table => table.id === id ? true : false)


// actions names
const UPDATE_TABLE = `app/tables/UPDATE_TABLE`;
const EDIT_TABLE = `app/tables/EDIT_TABLE`;

// actions
export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });

export const fetchTables = () => {
    return (dispatch) => {
        fetch(`http://localhost:3131/tables`)
            .then(res => res.json())
            .then(tables => {
                dispatch(updateTable(tables))
            })
    }
}
export const updateAllData = (editedTable) => {

    return (dispatch) => {

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editedTable.id,
                status: editedTable.status,
                peopleAmount: editedTable.peopleAmount,
                maxPeopleAmount: editedTable.maxPeopleAmount,
                bill: editedTable.bill
            }),
        };

        fetch(`http://localhost:3131/tables/${editedTable.id}`, options)
            .then(() => {
                dispatch(editTable({
                    id: editedTable.id,
                    status: editedTable.status,
                    peopleAmount: editedTable.peopleAmount,
                    maxPeopleAmount: editedTable.maxPeopleAmount,
                    bill: editedTable.bill
                }))
            })
    }


}


const tableReducer = (state = [], action) => {
    switch (action.type) {
        case EDIT_TABLE:
            return state.map(table => table.id === action.payload.id ? ({
                id: action.payload.id,
                status: action.payload.status,
                peopleAmount: action.payload.peopleAmount,
                maxPeopleAmount: action.payload.maxPeopleAmount,
                bill: action.payload.bill
            }) : table)
        case UPDATE_TABLE:
            return [...action.payload]
        default:
            return state
    }
}

export default tableReducer