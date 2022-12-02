// selectors
export const getAllTables = (state) => state.tables;
export const getTableById = (state, id) => state.tables.filter(table => table.id === id ? true : false)

// actions
const EDIT_POST = `app/tables/EDIT_POST`;

// funkcja do edytowania
const tableReducer = (state = [], action) => {
    switch (action.type) {
        case EDIT_POST:
            return [...action.payload]
        default:
            return state
    }
}

export default tableReducer