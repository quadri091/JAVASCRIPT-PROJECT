let first = document.getElementById("first-div");
let second = document.getElementById("second-div");
let firstSet = document.querySelector(".first-set");
let secondSet = document.querySelector(".second-set");
let thirdSet = document.querySelector(".third-set");
let span1 = document.getElementById("first-span");
let span2 = document.getElementById("second-span");
let span3 = document.getElementById("third-span");
let span4 = document.getElementById("fourth-span");
let span5 = document.getElementById("fifth-span");
let span6 = document.getElementById("sixth-span");
let firstInp = document.getElementById('first-name')
let secondInp = document.getElementById('second-name')
let thirdInp = document.getElementById('email')
let fourthInp = document.getElementById('password')
let fifthInp = document.getElementById('confirm')
let logEmail = document.getElementById('logemail')
let logPass = document.getElementById('logpass')
let label1 = document.getElementById("label1");
let label2 = document.getElementById("label2");
let label3 = document.getElementById("label3");
let label4 = document.getElementById("label4");
let label5 = document.getElementById("label5");
let label6 = document.getElementById("label6");
let label7 = document.getElementById("label7");
let profile = document.getElementById("profile");
let firstImg = document.getElementById('first-image');
let secondImg = document.getElementById('second-image');
let thirdImg = document.getElementById('third-image');
let fourthImg = document.getElementById('fourth-image');
let fifthImg = document.getElementById('fifth-image');
let sixthImg = document.getElementById('sixth-image');
let seventhImg = document.getElementById('seventh-image');
let eightImg = document.getElementById('eight-image');
let hide = document.getElementById('hide')
let view = document.getElementById('view')
let hide1 = document.getElementById('hide1')
let show1 = document.getElementById('show1')
let hide2 = document.getElementById('hide2')
let show2 = document.getElementById('show2')
const address = "https://i.pinimg.com/1200x/d0/c8/63/d0c863ca3081eec650fb4d01d640ff9a.jpg"
const former = "https://i.pinimg.com/1200x/ab/a0/a9/aba0a97b0c75efcc326f1ee8130eb640.jpg"



const firebaseConfig = {
    apiKey: "AIzaSyBnOkhuCkr1pdpFCSB93vsy74LacXTlHVQ",
    authDomain: "javascript-project-9437b.firebaseapp.com",
    databaseURL: "https://javascript-project-9437b-default-rtdb.firebaseio.com",
    projectId: "javascript-project-9437b",
    storageBucket: "javascript-project-9437b.firebasestorage.app",
    messagingSenderId: "636674855074",
    appId: "1:636674855074:web:0129cc17861d57c1fa87fb",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function float1() {
    label1.style.color = "#2e73b8";
    label1.style.transform = "scale(0.65)";
    label1.style.top = "-10px";
    label1.style.left = "0";
    label1.style.padding = "2px 10px";
}

function flow1(params) {
    if (!params.value.trim()) {
        label1.style.color = "black";
        label1.style.transform = "scale(1)";
        label1.style.top = "5px";
        label1.style.left = "5px";
        firstImg.src = former
        label1.style.padding = "4px 10px";
        span1.style.backgroundColor = "lightgray";
        return;
    }
    label1.style.color = "#2e73b8";
    label1.style.transform = "scale(0.65)";
    label1.style.top = "-10px";
    label1.style.left = "0";
    label1.style.padding = "2px 10px";
    firstImg.src = address
    span1.style.backgroundColor = "#2e73b8";
}

function float2() {
    label2.style.color = "#2e73b8";
    label2.style.transform = "scale(0.65)";
    label2.style.top = "-10px";
    label2.style.left = "0";
    label2.style.padding = "2px 10px";
}

function flow2(params) {
    if (!params.value.trim()) {
        label2.style.color = "black";
        label2.style.transform = "scale(1)";
        label2.style.top = "5px";
        label2.style.left = "5px";
        secondImg.src = former
        label2.style.padding = "4px 10px";
        span2.style.backgroundColor = "lightgray";
        return;
    }
    label2.style.color = "#2e73b8";
    label2.style.transform = "scale(0.65)";
    label2.style.top = "-10px";
    label2.style.left = "0";
    secondImg.src = address
    span2.style.backgroundColor = "#2e73b8";
    label2.style.padding = "2px 10px";
}

function float3() {
    label3.style.color = "#2e73b8";
    label3.style.transform = "scale(0.65)";
    label3.style.top = "-10px";
    label3.style.padding = "2px 10px";
}

function flow3(params) {
    if (!params.value.trim()) {
        label3.style.color = "black";
        label3.style.transform = "scale(1)";
        label3.style.top = "5px";
        thirdImg.src = former
        label3.style.padding = "4px 10px";
        span3.style.backgroundColor = "lightgray";
        return;
    }
    label3.style.color = "#2e73b8";
    label3.style.transform = "scale(0.65)";
    label3.style.top = "-10px";
    label3.style.padding = "2px 10px";
    thirdImg.src = address
    span3.style.backgroundColor = "#2e73b8";
}

function float4() {
    label4.style.color = "#2e73b8";
    label4.style.transform = "scale(0.65)";
    label4.style.top = "-10px";
    label4.style.left = "-3px";
    label4.style.padding = "2px 10px";
}

function flow4(params) {
    if (!params.value.trim()) {
        label4.style.color = "black";
        label4.style.transform = "scale(1)";
        label4.style.top = "5px";
        label4.style.left = "5px";
        fourthImg.src = former
        label4.style.padding = "4px 10px";
        span4.style.backgroundColor = "lightgray";
        return;
    }
    label4.style.color = "#2e73b8";
    label4.style.transform = "scale(0.65)";
    label4.style.top = "-10px";
    label4.style.padding = "2px 10px";
    label4.style.left = "-3px";
    fourthImg.src = address
    span4.style.backgroundColor = "#2e73b8";
}

function float5() {
    label5.style.color = "#2e73b8";
    label5.style.transform = "scale(0.65)";
    label5.style.top = "-10px";
    label5.style.padding = "2px 10px";
    label5.style.left = "-12px";
}

function flow5(params) {
    if (!params.value.trim()) {
        label5.style.color = "black";
        label5.style.transform = "scale(1)";
        label5.style.top = "5px";
        label5.style.left = "5px";
        fifthImg.src = former
        label5.style.padding = "4px 10px";
        return;
    }
    label5.style.color = "#2e73b8";
    label5.style.transform = "scale(0.65)";
    label5.style.top = "-10px";
    fifthImg.src = address
    label5.style.padding = "2px 10px";
    label5.style.left = "-12px";
}

function float6() {
    label6.style.color = "#2e73b8";
    label6.style.transform = "scale(0.65)";
    label6.style.top = "-10px";
    label6.style.padding = "2px 10px";
}

function flow6(params) {
    if (!params.value.trim()) {
        label6.style.color = "black";
        label6.style.transform = "scale(1)";
        label6.style.top = "5px";
        sixthImg.src = former
        seventhImg.src = former
        span5.style.backgroundColor = "lightgray";
        label6.style.padding = "4px 10px";
        return;
    }
    label6.style.color = "#2e73b8";
    label6.style.transform = "scale(0.65)";
    label6.style.top = "-10px";
    sixthImg.src = address
    seventhImg.src = address
    span5.style.backgroundColor = "#2e73b8";
    label6.style.padding = "2px 10px";
}


function float7() {
    label7.style.color = "#2e73b8";
    label7.style.transform = "scale(0.65)";
    label7.style.top = "-10px";
    label7.style.left = "-3px";
    label7.style.padding = "2px 10px";
}

function flow7(params) {
    if (!params.value.trim()) {
        label7.style.color = "black";
        label7.style.transform = "scale(1)";
        label7.style.top = "5px";
        label7.style.padding = "4px 10px";
        label7.style.left = "5px";
        eightImg.src = former
        span6.style.backgroundColor = "lightgray";
        return;
    }
    label7.style.color = "#2e73b8";
    label7.style.transform = "scale(0.65)";
    label7.style.top = "-10px";
    label7.style.padding = "2px 10px";
    label7.style.left = "-3px";
    eightImg.src = address
    span6.style.backgroundColor = "#2e73b8";

}



function move1() {
    first.style.left = "calc(100% - 45%)";
    first.style.borderRadius = "100px 0 0 100px";
    firstSet.style.display = "none";
    secondSet.style.display = "flex";
    first.style.opacity = 0
    setTimeout(() => {
        first.style.opacity = 1
    }, 350);
    first.innerHTML = `<h1>Access Your Dashboard</h1>
    <div class="first-parent">
       <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M292-120q-38 0-65-27.5T200-213v-371l-73-176H40v-80h141l66 160h591q23 0 35 19t1 39L760-399q51 8 85.5 47t34.5 92q0 58-40.5 99T741-120q-59 0-99.5-41T601-260q0-20 5-37t14-33l-131-12-120 180q-13 20-33.5 31T292-120Zm382-285 99-195H280l50 120q8 20 25.5 33.5T396-431l278 26ZM293-201q2 0 9-5l97-144q-49-5-77-23.5T280-412v200q0 5 4 8t9 3Zm447 1q26 0 43-17.5t17-42.5q0-26-17-43t-43-17q-25 0-42.5 17T680-260q0 25 17.5 42.5T740-200Zm-66-205-278-26 278 26Z"/></svg>

          </span>
          <h4>Pick up where you left</h4>
        </div>

        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm40-40h400L400-680H200v400Zm320-320h240v-80H520v80ZM160-240v-480 480Z"/></svg>

          </span>
          <h4>Keep tabs on expenses</h4>
        </div>

        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"/></svg>

          </span>
          <h4>Manage operations on the go</h4>
        </div>

        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M420-360h120l-23-129q20-10 31.5-29t11.5-42q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 23 11.5 42t31.5 29l-23 129Zm60 280q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>

          </span>
          <h4>Enjoy secure and fast access</h4>
        </div>
      </div>`

    if (window.innerWidth <= 700) {
        second.style.right = 0;
    } else {
        second.style.right = "calc(100% - 53%)";
    }

}

function move2() {
    first.style.left = "0";
    first.style.borderRadius = "0 100px 100px 0";
    second.style.right = "0";
    first.style.opacity = 0
    setTimeout(() => {
        first.style.opacity = 1
    }, 350);
    first.innerHTML = `<h1>Start You Journery Today</h1>
       
      <div class="first-parent">
        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M292-120q-38 0-65-27.5T200-213v-371l-73-176H40v-80h141l66 160h591q23 0 35 19t1 39L760-399q51 8 85.5 47t34.5 92q0 58-40.5 99T741-120q-59 0-99.5-41T601-260q0-20 5-37t14-33l-131-12-120 180q-13 20-33.5 31T292-120Zm382-285 99-195H280l50 120q8 20 25.5 33.5T396-431l278 26ZM293-201q2 0 9-5l97-144q-49-5-77-23.5T280-412v200q0 5 4 8t9 3Zm447 1q26 0 43-17.5t17-42.5q0-26-17-43t-43-17q-25 0-42.5 17T680-260q0 25 17.5 42.5T740-200Zm-66-205-278-26 278 26Z"/></svg>

          </span>
          <h4>Customizable Storefronts</h4>
        </div>

        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm40-40h400L400-680H200v400Zm320-320h240v-80H520v80ZM160-240v-480 480Z"/></svg>

          </span>
          <h4>Secure Payment Processing</h4>
        </div>

        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"/></svg>

          </span>
          <h4>Real-time sales tracking</h4>
        </div>

        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M420-360h120l-23-129q20-10 31.5-29t11.5-42q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 23 11.5 42t31.5 29l-23 129Zm60 280q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>

          </span>
          <h4>Secure access to all tools</h4>
        </div>
      </div>`
    firstSet.style.display = "flex";
    secondSet.style.display = "none";

}










function create(params) {

    if (!firstInp.value.trim() || !secondInp.value.trim() || !thirdInp.value.trim() || !fourthInp.value.trim() || !fifthInp.value.trim()) {
        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML =
            "All fields are mandatory";
        document.getElementById("audio").play();
        setTimeout(() => {
            document.getElementById("audio").pause();
            document.getElementById('audio').currentTime = 0
        }, 2000);
        setTimeout(() => {
            document.querySelector(".alert").style.top = "-150px";
            read.style.width = "100%";
            read.style.transition = "none"
        }, 3100);
        return
    }
    if (fourthInp.value.trim().length < 8) {
        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML =
            "Password is less than 8";
        document.getElementById("audio").play();
        setTimeout(() => {
            document.getElementById("audio").pause();
            document.getElementById('audio').currentTime = 0
        }, 2000);
        setTimeout(() => {
            document.querySelector(".alert").style.top = "-150px";
            read.style.width = "100%";
            read.style.transition = "none"
        }, 3100);
        return
    }
    if (fourthInp.value.trim() !== fifthInp.value.trim()) {
        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML =
            "Password does not match";
        document.getElementById("audio").play();
        setTimeout(() => {
            document.getElementById("audio").pause();
            document.getElementById('audio').currentTime = 0
        }, 2000);
        setTimeout(() => {
            document.querySelector(".alert").style.top = "-150px";
            read.style.width = "100%";
            read.style.transition = "none"
        }, 3100);
        return
    }
    if (!thirdInp.value.trim().endsWith('.com') || !thirdInp.value.trim().includes("@")) {
        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML =
            "Invalid email address";
        document.getElementById("audio").play();
        setTimeout(() => {
            document.getElementById("audio").pause();
            document.getElementById('audio').currentTime = 0
        }, 2000);
        setTimeout(() => {
            document.querySelector(".alert").style.top = "-150px";
            read.style.width = "100%";
            read.style.transition = "none"
        }, 3100);
        return
    }
    params.innerHTML = `<span class="roller"></span>`
    setTimeout(() => {

        let store = secondInp.value.trim()

        auth.createUserWithEmailAndPassword(thirdInp.value.trim(), fourthInp.value.trim())
            .then((userCredential) => {
                var user = userCredential.user;

                user.updateProfile({
                    displayName: store
                }).then(() => {




                    var starCountRef = firebase.database().ref("users");
                    starCountRef.once("value", (snapshot) => {
                        const data = snapshot.val() || {};
                        read.style.width = 0;
                        read.style.transition = "all 3s linear"
                        document.querySelector(".alert").style.top = "10px";
                        document.querySelector(".small").innerHTML =
                            "Account created successfully";
                        document.getElementById("audio").play();
                        setTimeout(() => {
                            document.getElementById("audio").pause();
                            document.getElementById('audio').currentTime = 0
                        }, 2000);
                        setTimeout(() => {
                            document.querySelector(".alert").style.top = "-150px";
                            read.style.width = "100%";
                            read.style.transition = "none"
                        }, 3100);

                        const state = Object.values(data);
                        const search = state.find(member => {
                            return member.email === user.email && member.name === user.displayName
                        })

                        if (!search && thirdInp.value.trim() !== "adebayoq123456@gmail.com") {
                            firebase.database().ref(`users/` + user.uid).set({
                                name: user.displayName,
                                email: user.email,
                            });
                        }
                    })







                    first.innerHTML = `<h1>Access Your Dashboard</h1>
    <div class="first-parent">
       <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M292-120q-38 0-65-27.5T200-213v-371l-73-176H40v-80h141l66 160h591q23 0 35 19t1 39L760-399q51 8 85.5 47t34.5 92q0 58-40.5 99T741-120q-59 0-99.5-41T601-260q0-20 5-37t14-33l-131-12-120 180q-13 20-33.5 31T292-120Zm382-285 99-195H280l50 120q8 20 25.5 33.5T396-431l278 26ZM293-201q2 0 9-5l97-144q-49-5-77-23.5T280-412v200q0 5 4 8t9 3Zm447 1q26 0 43-17.5t17-42.5q0-26-17-43t-43-17q-25 0-42.5 17T680-260q0 25 17.5 42.5T740-200Zm-66-205-278-26 278 26Z"/></svg>

          </span>
          <h4>Pick up where you left</h4>
        </div>

        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm40-40h400L400-680H200v400Zm320-320h240v-80H520v80ZM160-240v-480 480Z"/></svg>

          </span>
          <h4>Keep tabs on expenses</h4>
        </div>

        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"/></svg>

          </span>
          <h4>Manage operations on the go</h4>
        </div>

        <div class="parent-each">
          <span>
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M420-360h120l-23-129q20-10 31.5-29t11.5-42q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 23 11.5 42t31.5 29l-23 129Zm60 280q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/></svg>

          </span>
          <h4>Enjoy secure and fast access</h4>
        </div>
      </div>`


                    first.style.opacity = 0
                    setTimeout(() => {
                        first.style.opacity = 1
                    }, 350);
                    first.style.left = "calc(100% - 45%)";
                    if (window.innerWidth <= 700) {
                        second.style.right = "0";
                        first.style.display = "none"
                        second.style.width = "100%"
                    } else {
                        second.style.right = "calc(100% - 53%)";
                    }
                    first.style.borderRadius = "100px 0 0 100px";

                    firstSet.style.display = "none";
                    secondSet.style.display = "flex";




                }).catch((error) => {
                    alert("Account created without updating profile");
                });

            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });

        firstInp.value = ''
        secondInp.value = ''
        thirdInp.value = ''

        fourthInp.value = ''
        fifthInp.value = ''
        params.innerHTML = "Create An Account"
    }, 2500);
}


function login(params) {
    if (!logEmail.value.trim() || !logPass.value.trim()) {
        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML =
            "All fields are mandatory";
        document.getElementById("audio").play();
        setTimeout(() => {
            document.getElementById("audio").pause();
            document.getElementById('audio').currentTime = 0
        }, 2000);
        setTimeout(() => {
            document.querySelector(".alert").style.top = "-150px";
            read.style.width = "100%";
            read.style.transition = "none"
        }, 3100);
        return
    }

    params.innerHTML = `<span class="roller"></span>`

    setTimeout(() => {
        auth.signInWithEmailAndPassword(logEmail.value.trim(), logPass.value.trim())
            .then((userCredential) => {
                location.href = "dashboard.html"
            })
            .catch((error) => {
                read.style.width = 0;
                read.style.transition = "all 3s linear"
                document.querySelector(".alert").style.top = "10px";
                document.querySelector(".small").innerHTML =
                    "Information does not match";
                document.getElementById("audio").play();
                setTimeout(() => {
                    document.getElementById("audio").pause();
                    document.getElementById('audio').currentTime = 0
                }, 2000);
                setTimeout(() => {
                    document.querySelector(".alert").style.top = "-150px";
                    read.style.width = "100%";
                    read.style.transition = "none"
                }, 3100);
            });
        logPass.value = ""
        logEmail.value = ""
        params.innerHTML = "Sign In"
    }, 2500);

}



function view1() {
    if (fourthInp.type === 'password') {
        fourthInp.type = 'text'
        hide.style.display = 'none'
        view.style.display = 'block'
        return
    }
    fourthInp.type = 'password'
    hide.style.display = 'block'
    view.style.display = 'none'
}

function view2() {
    if (fifthInp.type === 'password') {
        fifthInp.type = 'text'
        hide1.style.display = 'none'
        show1.style.display = 'block'
        return
    }
    fifthInp.type = 'password'
    hide1.style.display = 'block'
    show1.style.display = 'none'
}

function view3() {
    if (logPass.type === 'password') {
        logPass.type = 'text'
        hide2.style.display = 'none'
        show2.style.display = 'block'
        return
    }
    logPass.type = 'password'
    hide2.style.display = 'block'
    show2.style.display = 'none'
}


var provider = new firebase.auth.GoogleAuthProvider();





function google(params) {
    params.innerHTML = `<span class="roller"></span>`


    setTimeout(() => {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;

                // Only add users who are NOT the admin
                if (
                    user.email === 'adebayoq123456@gmail.com' &&
                    user.displayName === 'Adebayo Quadri' &&
                    user.emailVerified === true &&
                    user.isAnonymous === false &&
                    user.tenantId == null
                ) {

                    location.href = "admin.html";


                } else {


                    var starCountRef = firebase.database().ref("users");
                    starCountRef.once("value", (snapshot) => {
                        const data = snapshot.val() || {};

                        const state = Object.values(data);
                        const search = state.find(member => {
                            return member.email === user.email && member.name === user.displayName
                        })

                        if (!search && user.email !== "adebayoq123456@gmail.com") {
                            firebase.database().ref(`users/` + user.uid).set({
                                name: user.displayName,
                                email: user.email,
                            });
                        }
                    }).then(() => {

                        location.href = "dashboard.html";
                    }).catch((error) => {
                        alert(error.message);
                    });
                }

            }).catch((error) => {
                alert(error.message);
            });
        params.innerHTML = "Sign In With Google"
    }, 2500);
}




function forget() {
    let pro = prompt('Input your email here', logEmail.value.trim())
    if (!pro) {
        return
    }
    if (pro.trim()) {
        auth
            .sendPasswordResetEmail(pro.trim())
            .then(() => {
                read.style.width = 0;
                read.style.transition = "all 3s linear"
                document.querySelector(".alert").style.top = "10px";
                document.querySelector(".small").innerHTML =
                    "Verification link sent to email";
                document.getElementById("audio").play();
                setTimeout(() => {
                    document.getElementById("audio").pause();
                    document.getElementById('audio').currentTime = 0
                }, 2000);
                setTimeout(() => {
                    document.querySelector(".alert").style.top = "-150px";
                    read.style.width = "100%";
                    read.style.transition = "none"
                }, 3100);
            })
            .catch((error) => {
                read.style.width = 0;
                read.style.transition = "all 3s linear"
                document.querySelector(".alert").style.top = "10px";
                document.querySelector(".small").innerHTML =
                    "Errror sending request";
                document.getElementById("audio").play();
                setTimeout(() => {
                    document.getElementById("audio").pause();
                    document.getElementById('audio').currentTime = 0
                }, 2000);
                setTimeout(() => {
                    document.querySelector(".alert").style.top = "-150px";
                    read.style.width = "100%";
                    read.style.transition = "none"
                }, 3100);
            });
    }
}