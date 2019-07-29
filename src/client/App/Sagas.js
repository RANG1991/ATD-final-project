import {call, put, takeEvery} from 'redux-saga/effects'
import AppConstants from "./Constants/AppConstants";
import {CurrentUserConstants} from "./Constants/CurrentUserConstants";
let fs = require('fs');
let request = require('request');
const image2base64 = require('image-to-base64');

function* addUser(action) {

    image2base64('/home/ameer/Pictures/image.jpg')
        .then(
            (response) => {
                const res =   request({

                    url:'http://localhost:8000/add_user',
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: {
                            name: action.payload.username,
                            location:action.payload.location,
                            image:response
                        }
                    })


                });
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )




    //console.log('the result is:------------')
    yield put({type:AppConstants.ADD_USER ,payload:action.payload});
}

function* getAllUsers(action){

    const res =yield   call(fetch,'http://localhost:8000/get_all_users',{

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({action: "getUsers"})


    });

    const json = yield call([res,'json']);
    yield put({type:AppConstants.GET_ALL_USERS ,payload:json});
    console.log('---------------------------------------------')
}

export function* watchDataPass() {
    yield takeEvery(AppConstants.GET_ALL_USERS_SAGA, getAllUsers);
    yield takeEvery(AppConstants.ADD_USER_SAGA, addUser);
}



