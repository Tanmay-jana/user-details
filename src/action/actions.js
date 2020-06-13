

export const allValue = (allValue) => dispatch => {
    dispatch({
        type: "ALL_VALUE",
        payload: allValue
    })
}

export const addList = (list, id) => dispatch => {
    dispatch({
        type: "ADD_LIST",
        payload: {
            obj: list,
            id: id
        }
    })
}

export const updateList = (list, id) => dispatch => {
    dispatch({
        type: "UPDATE_LIST",
        payload: {
            obj: list,
            id: id
        }
    })
}

export const deleteValue = (uid) => dispatch => {
    dispatch({
        type: "DELETE_VALUE",
        payload: uid
    })
}

export const isClose = (value) => dispatch => {
    dispatch({
        type: "IS_CLOSED",
        payload: value
    })
}

export const buttonValue = (value) => dispatch => {
    dispatch({
        type: "BUTTON_VALUE",
        payload: value
    })
}

export const isLoading = (value) => dispatch => {
    dispatch ({
        type: "IS_LOADING",
        payload: value
    })
}