export default (state, action) =>{
    let {type, payload } = action

    switch(type){
        case 'GET_DATA':
            return {
                ...state,
                datas:payload,
                loading:false
            }
        case 'SINGLE_DATA':
            return {
                ...state,
                singleData:payload,
                loading:false
            }
        case 'POST_DATA':
        case 'EDIT_DATA':
            return {
                ...state,
                datas:[payload,...state.datas],
                loading:false
            }
        case 'DEL_DATA':
            return{
                ...state,
                datas: state.datas.filter(data => data.id !== payload),
                loading:false
            }
        case 'DATA_ERROR':
            return {
                ...state,
                error:payload,
                loading:false
            }
            case 'SET_ALERT':
                return{
                    ...state,
                    alert:[...state.alert,payload],
                    loading:false
                }
            case 'REMOVE_ALERT':
                return {
                  ...state,
                  alert:state.alert.filter(alert=> alert.id !== payload),
                  loading:false 
                }                
            default:
            return state 
    }

}