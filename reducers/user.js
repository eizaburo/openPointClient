import {
    SIGNIN,
    SIGNUP,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
    UPDATE_CONFIRM,
    UPDATE_TEL,
    UPDATE_POINT
} from '../actions/user';

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
                    createdAt: action.payload.createdAt,
                }
            }
        case SIGNUP:
            return {
                user: {
                    email: state.user.email,
                    uid: action.payload.uid,
                    point: action.payload.point,
                    createdAt: action.payload.createdAt,
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
        case UPDATE_POINT:
            let pointState = { ...state };
            pointState.user.point = action.payload;
            return pointState;
        default:
            return state;
    }
}

export default user;