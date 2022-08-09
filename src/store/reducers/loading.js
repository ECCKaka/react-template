import * as actionTypes from '../action-types';

let initialState = {
    show: false
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SHOW_LOADING:
            return {
                show:action.payload 
            }
        case actionTypes.HIDE_LOADING:
            return {
                show:action.payload 
            };
        default:
            return state;
    }
}
export default reducer;