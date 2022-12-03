// selectors
export const getAllTables = (state) => state.tables;
export const getTableById = (state, id) => state.tables.filter(table => table.id === id ? true : false)

// actions names
const UPDATE_TABLE = `app/tables/UPDATE_TABLE`;
const EDIT_TABLE = `app/tables/EDIT_TABLE`;

// actions
export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });
export const fetchTables = () => {
    return (dispatch) => {
        fetch(`http://localhost:3131/tables`)
            .then(res => res.json())
            .then(tables => {
                dispatch(updateTable(tables))
            })
    }
}

const tableReducer = (state = [], action) => {
    switch (action.type) {
        case EDIT_TABLE:
            // tutaj edi musi byc odpowieniego elementu ani tylko zwykły spred
            return [...state, ...action.payload]
        case UPDATE_TABLE:
            return [...action.payload]
        default:
            return state
    }
}

export default tableReducer