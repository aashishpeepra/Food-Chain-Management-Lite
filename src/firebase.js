import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAgC5jdB2IX_Ph1CoVRDqQ2YacTGGI-j1s",
    authDomain: "foodchainmanage.firebaseapp.com",
    databaseURL: "https://foodchainmanage.firebaseio.com",
    projectId: "foodchainmanage",
    storageBucket: "foodchainmanage.appspot.com",
    messagingSenderId: "647677258163",
    appId: "1:647677258163:web:0dc19614794571a7a303c6"
};
// Initialize Firebase
 firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Login CODE To be Written
function loginUser(email, password, cb) {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(email, password)
        .then(res => {
            cb();
            console.log("Logged -> ", res);
            console.log(cb)

        })
        .catch(err => {
            alert('Check your email/ Password');
            console.log(err.message);
        })
}

// logout
function logout() {
    firebase.auth().signOut().then(res => {

    })
}

// State Change Management

firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {


    }
    else {

    }
})


export { loginUser };
export { logout };
export {db};