const addState = {
    close: true,
    button: "",
    loading: false,
    allID: [],
    allData: {}
};

const reducer = (state = addState, action) => {
    if(action.type === "ALL_VALUE") {
        return {
            ...state,
            allData: action.payload,
            allID: Object.keys(action.payload)
        }
    }

    if(action.type === "ADD_LIST") {
        let oldObj = state.allData
        let newObj = {
            ...oldObj,
            [action.payload.id]: action.payload.obj
        }
        let allId = state.allID
        allId.push(action.payload.id)
        return {
            ...state,
            allID: allId,
            allData: newObj,
            close:true
        }
    }

    if(action.type === "UPDATE_LIST") {
        let oldObj = state.allData
        let newObj = {
            ...oldObj,
            [action.payload.id]: action.payload.obj
        }
        return {
            ...state,
            allData: newObj,
            close:true
        }
    }

    if(action.type === "DELETE_VALUE") {
        var Obj = state.allData
        var id = `${action.payload}`
        delete Obj[`${id}`]
        var newIds = state.allID.filter(element => {return element !== action.payload})
        return {
            ...state,
            allData: Obj,
            allID: newIds,
            loading:false
        }
    }

    if(action.type === "IS_CLOSED") {
        return {
            ...state,
            close: action.payload
        }
    }

    if(action.type === "BUTTON_VALUE") {
        return {
            ...state,
            button: action.payload
        }
    }

    if(action.type === "IS_LOADING") {
        return {
            ...state,
            loading: action.payload
        }
    }
    
    return state;
}

export default reducer;