import {
    SIGNIN,
    SIGNUP,
    UPDATE_EMAIL,
    UPDATE_PASSWORD,
    UPDATE_CONFIRM,
    UPDATE_TEL,
    UPDATE_POINT
} from '../actions/user';
import lodash from 'lodash';

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
    // console.log(state);
    console.log(state);
    switch (action.type) {
        case SIGNIN:
            //state.userにfirebaseのuserをマージ(state自体が更新される)
            lodash.merge(state.user, action.payload);
            return state;
        case SIGNUP:
            //state.userにfirebaseのuserをマージ(state自体が更新される)
            lodash.merge(state.user, action.payload);
            return state;
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