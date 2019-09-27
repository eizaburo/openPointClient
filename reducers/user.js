import { SIGNIN, SIGNUP, UPDATE_EMAIL, UPDATE_PASSWORD, UPDATE_CONFIRM, UPDATE_TEL } from '../actions/user';

const initialState = {
    user: {
        // uid: '',
        // point: 0,
        // email: '',
        // password: '',
        // confirm: '',
        // tel: ''
    }
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN:
            return {
                user: {
                    email: action.payload.email,
                    point: action.payload.point,
                    uid: action.payload.uid,
                }
            }
        case SIGNUP:
            return {
                user: {
                    email: state.user.email,
                    uid: action.payload.uid,
                    point: action.payload.point,
                }
            };
        case UPDATE_EMAIL:
            let mailState = { ...state };
            mailState.user.email = action.payload;
            return mailState;
        case UPDATE_PASSWORD:
            let passwordState = { ...state };
            passwordState.user.password = action.payload;
            return passwordState;
        case UPDATE_CONFIRM:
            let confirmState = { ...state };
            confirmState.user.confirm = action.payload;
            return confirmState;
        case UPDATE_TEL:
            let telState = { ...state };
            telState.user.tel = action.payload;
            return telState;
        default:
            return state;
    }
}

export default user;