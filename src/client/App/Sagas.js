import {call, put, takeEvery} from 'redux-saga/effects'
import AppConstants from "./Constants/AppConstants";
let fs = require('fs');
let request = require('request');
const image2base64 = require('image-to-base64');

function* addUser(action) {
    console.log('Adding user///////////////////')
    yield image2base64(action.payload.imagePath) // you can also to use url
        .then(
            (response) => {
                console.log('inside then////////////////////////')
                const res =  request('http://localhost:8000/add_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user: {
                            name: action.payload.username,
                            location: action.payload.location,
                            imagePath: "data:image/png;base64, " + response
                        }
                    })
                });
                console.log('add user////////////////////////////// ',action.payload)
                //console.log('the result is:------------')

            }
        )
        .catch(
            (error) => {
                console.log(error); //Exepection error....
            }
        )

    yield put({type:AppConstants.ADD_USER ,payload:action.payload});



}

function* addRev(action){
    let allImagesPromises = action.payload.images.map(x => image2base64(x));
    Promise.all(allImagesPromises).then((values) => {
        values = values.map(x => "data:image/png;base64, " + x);
        let newPayload = action.payload;
        newPayload['imageData'] = values;
        action.payload.images = values;
        console.log('THE NEW PAYLOAD ',newPayload);
        const res =  request('http://localhost:8000/add_rev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPayload)
                        });
                    })
                .catch(
                    (error) => {
                        console.log(error);
                    });
/*
    const res =yield   call(fetch,'http://localhost:8000/add_rev',{

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({payload:action.payload})


    });

*/
    yield put({type: AppConstants.ADD_RESTAURANT, payload: action.payload})

}
function* getAllUsers(action){

    const res =yield  call(fetch,'http://localhost:8000/get_all_users',{

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({review:action.payload })


    });

    const json = yield call([res,'json']);
    yield put({type:AppConstants.GET_ALL_USERS ,payload:json});
    console.log('---------------------------------------------')
}

export function* watchDataPass() {
    yield takeEvery(AppConstants.GET_ALL_USERS_SAGA, getAllUsers);
    yield takeEvery(AppConstants.ADD_USER_SAGA, addUser);
    yield takeEvery(AppConstants.ADD_RESTAURANT_SAGA, addRev);
}



