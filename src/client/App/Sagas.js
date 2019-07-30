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
    console.log('the payload///////////////////// ',action.payload)

    const uris = action.payload.images;
    console.log('the images ',uris.get(0))
    var allImagesData = [];

            image2base64(uris.get(0)) // you can also to use url
                .then(
                    (response) => {
                        allImagesData.push("data:image/png;base64, " +response);

                        var newPayload = action.payload;
                        newPayload['imageData'] = allImagesData;

                        action.payload.images = allImagesData;

                        console.log('THE NEW PAYLOAD ',newPayload);


                        const res =  request('http://localhost:8000/add_rev', {

                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(newPayload)


                        });
                    }
                )
                .catch(
                    (error) => {
                        console.log(error); //Exepection error....
                    }
                )




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

    const res =yield   call(fetch,'http://localhost:8000/get_all_users',{

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



