import {call, put, takeEvery} from 'redux-saga/effects'
import AppConstants from "./Constants/AppConstants";
let fs = require('fs');
let request = require('request');
const image2base64 = require('image-to-base64');

var UsersCounter = 0;
var ReviewsCounter = 0;

function SetUsersCounter(num){
    UsersCounter = num;
}

function SetReviewsCounter(num){
    ReviewsCounter = num;
}


function GetUsersCounter(){
    UsersCounter += 1;
    return UsersCounter;
}

function GetReviewsCounter(){
    ReviewsCounter += 1;
    return ReviewsCounter;
}

function* addUser(action) {
    console.log('Adding user///////////////////')
    let currentUserCounter = GetUsersCounter();
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
                            lat:action.payload.coor['lat'],
                            lng:action.payload.coor['lng'],
                            imagePath: "data:image/png;base64, " + response,
                            id: currentUserCounter
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
    var newPayload = action.payload;
    console.log('USERS COUNTER BEFORE INC//////////////////////',UsersCounter)
    newPayload['userID'] = currentUserCounter;
    console.log('USERS COUNTER AFTER INC//////////////////////',UsersCounter)
    yield put({type:AppConstants.ADD_USER ,payload:newPayload});



}

function* addRev(action){
    let allImagesPromises = action.payload.images.map(x => image2base64(x));
    let newPayload = action.payload;
    yield Promise.all(allImagesPromises).then((values) => {
        values = values.map(x => "data:image/png;base64, " + x);
        newPayload['imageData'] = values;
        action.payload.images = values;
        let currentReviewsCounter = GetReviewsCounter();
        newPayload['id'] = currentReviewsCounter;
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
    console.log('THE NEW PAYLOAD OF REVIEW ',newPayload);

    yield put({type: AppConstants.ADD_RESTAURANT, payload: newPayload})

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

    console.log('ALL USERS DATA ////////////',json);

    let UsersId=0;
    let ReviewsId = 0;
    for (let i=0;i<json.length;i++) {
        console.log('CURRENT USER ID////////////////',json[i]['id']);
        if(json[i]['id']>UsersId)
            UsersId = json[i]['id'];
    }
    for (let i=0;i<json.length;i++) {
        for(let j=0;j<json[i]['reviews'].length;j++) {
         //   console.log('CURRENT REVIEW ID////////////////',json[i]['reviews'])
            if (json[i]['reviews'][j]['id'] > ReviewsId)
                ReviewsId = json[i]['reviews'][j]['id'];
        }
    }
    console.log('GLOBAL USER ID : ',UsersId);
    console.log('GLOBAL REVIEW ID : ',ReviewsId);
    SetReviewsCounter(ReviewsId+1);
    SetUsersCounter(UsersId+1);
    yield put({type:AppConstants.GET_ALL_USERS ,payload:json});
    console.log('---------------------------------------------')
}

function* deleteRev(action){

    console.log('THE NEW PAYLOAD ',action.payload);

    const res =  yield call(fetch,'http://localhost:8000/delete_rev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    })
    yield put({type: AppConstants.DELETE_REVIEW, payload: action.payload})

}
function* editRev(action) {

    console.log('THE NEW PAYLOAD ',action.payload);

    const res =  yield call(fetch,'http://localhost:8000/edit_rev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    })
    yield put({type: AppConstants.EDIT_REVIEW, payload: action.payload})

}

function* changeUsername(action){
    console.log('THE NEW PAYLOAD ',action.payload);

    const res =  yield call(fetch,'http://localhost:8000/change_username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    })
    yield put({type: AppConstants.CHANGE_USERNAME_APP, payload: action.payload})

}

function* changeLocation(action){

    console.log('THE NEW PAYLOAD ',action.payload);

    const res =  yield call(fetch,'http://localhost:8000/change_location', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
    })
    yield put({type: AppConstants.CHANGE_LOCATION_APP, payload: action.payload})

}


export function* watchDataPass() {
    yield takeEvery(AppConstants.GET_ALL_USERS_SAGA, getAllUsers);
    yield takeEvery(AppConstants.ADD_USER_SAGA, addUser);
    yield takeEvery(AppConstants.ADD_RESTAURANT_SAGA, addRev);
    yield takeEvery(AppConstants.DELETE_REVIEW_SAGA, deleteRev);
    yield takeEvery(AppConstants.EDIT_REVIEW_SAGA, editRev);
    yield takeEvery(AppConstants.CHANGE_USERNAME_APP_SAGA, changeUsername);
    yield takeEvery(AppConstants.CHANGE_LOCATION_APP_SAGA, changeLocation);

}



