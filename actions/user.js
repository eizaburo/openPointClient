import Firebase, { db } from '../config/Firebase';
import firebase from 'firebase';

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const UPDATE_CONFIRM = 'UPDATE_CONFIRM';
export const UPDATE_TEL = 'UPDATE_TEL';
export const UPDATE_POINT = 'UPDATE_POINT';

export const SIGNIN = 'SIGNIN';
export const SIGNUP = 'SIGNUP';

export const CLEAR_ALL = 'CLEAR_ALL';

export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        payload: email,
    }
}

export const updatePassword = password => {
    return {
        type: UPDATE_PASSWORD,
        payload: password,
    }
}

export const updateConfirm = confirm => {
    return {
        type: UPDATE_CONFIRM,
        payload: confirm,
    }
}

export const updateTel = tel => {
    return {
        type: UPDATE_TEL,
        payload: tel,
    }
}

export const updatePoint = point => {
    return {
        type: UPDATE_POINT,
        payload: point,
    }
}

export const clearAll = () => {
    return {
        type: CLEAR_ALL,
        payload: null,
    }
}

export const signIn = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password } = getState().userData.user;
            const response = await Firebase.auth().signInWithEmailAndPassword(email, password);
            dispatch(getUser(response.user.uid));
        } catch (e) {
            alert(e);
        }
    }
}

export const getUser = uid => {
    return async (dispatch, getState) => {
        try {
            const user = await db.collection('users').doc(uid).get();
            dispatch({
                type: SIGNIN,
                payload: user.data(),
            });
        } catch (e) {
            alert(e);
        }
    }
}

export const signUp = () => {
    return async (dispatch, getState) => {
        try {
            const { email, password, tel } = getState().userData.user;
            const response = await Firebase.auth().createUserWithEmailAndPassword(email, password);
            if (response.user.uid) {

                const user = {
                    uid: response.user.uid,
                    email: email,
                    point: 0,
                    tel: tel,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                }

                db.collection('users').doc(response.user.uid).set(user);

                dispatch({
                    type: SIGNUP,
                    payload: user,
                });

            }
        } catch (e) {
            alert(e);
        }
    }
}