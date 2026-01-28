const firebaseConfig = {
  apiKey: "AIzaSyBnOkhuCkr1pdpFCSB93vsy74LacXTlHVQ",
  authDomain: "javascript-project-9437b.firebaseapp.com",
  databaseURL: "https://javascript-project-9437b-default-rtdb.firebaseio.com",
  projectId: "javascript-project-9437b",
  storageBucket: "javascript-project-9437b.firebasestorage.app",
  messagingSenderId: "636674855074",
  appId: "1:636674855074:web:0129cc17861d57c1fa87fb",
};
let indexDisc;
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
let cartIndex;
let userName;
let UID;

function checkUserAuth() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      UID = user.uid;

      if (user.email == "adebayoq123456@gmail.com") {
        location.href = "admin.html";
        return;
      }

      dispDiscount();
      product();
      dispCart();
      dispMessage();
      dispOrder();
      dispPurchased();
      animation();
      high();
      viewOnDelivery();
      viewDelivered();
      var orderRef = firebase.database().ref(`checkDisc/${UID}/0`);

      orderRef.once("value").then((snapshot) => {
        const data = snapshot.val();
        if (data && data.state === true) {
          document.getElementById("checker").style.display = "none";
        }
      });

      const userFlow = user.displayName.slice(0, 1).toUpperCase + user.displayName.slice(1).toLowerCase()

      userName = userFlow;
      var starCountRef = firebase.database().ref(`money/${UID}`);
      starCountRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let state = data ? data.payed : 0;

        moneys.innerHTML = `₦ ${state.toLocaleString()}`;
      });

      document.getElementById("nav-name").innerHTML = userFlow;
      document.getElementById("topName").innerHTML = user.displayName;
      document.getElementById("setName").value = user.displayName;
      document.getElementById("setEmail").value = user.email;
      navPic.innerHTML = userFlow.slice(0, 1);
    } else {
      location.href = "form.html";
    }
  });
}
checkUserAuth();




async function viewDelivered() {
  let flow = 0;
  let float = 0;

  await firebase.database().ref(`order`).on("value", (snap) => {
    const data = snap.val() || {};
    const userCart = data[UID] || [];
    flow = userCart.length;

    orderNum.innerHTML = flow + float;
  });

  await firebase.database().ref(`discount`).on("value", (snapshot) => {
    const data = snapshot.val() || {};
    const orArr = data[UID] || [];

    const gold = orArr.filter((member) => {
      return member.type === "Ordered";
    });

    float = gold.length;

    orderNum.innerHTML = flow + float;
  });
}


function viewOnDelivery() {
  var starCountRef = firebase.database().ref(`ifOnDelivery`);
  starCountRef.on("value", (snapshot) => {
    const data = snapshot.val();
    movingNum.innerHTML = data ? +data[UID].on : 0;
  });
}

document.getElementById("send").addEventListener("click", () => {
  document.getElementById("send").innerHTML = `<div class="roller"></div>`;
  document.getElementById("send").disabled = true;
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const number = document.getElementById("number").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!firstName || !lastName || !email || !message) {
    document.getElementById("send").innerHTML = `Send Message`;
    document.getElementById("send").disabled = false;
    read.style.width = 0;
    read.style.transition = "all 3s linear"
    document.querySelector(".alert").style.top = "10px";
    document.querySelector(".small").innerHTML = "All fields are mandatory";
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
    return;
  }

  emailjs
    .send("service_k5kwq4p", "template_ohhhsqs", {
      firstName,
      lastName,
      number,
      email,
      message,
    })
    .then(() => {
      read.style.width = 0;
      read.style.transition = "all 3s linear"
      document.querySelector(".alert").style.top = "10px";
      document.querySelector(".small").innerHTML = "Message Sent Successfully";
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
      // Clear fields
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("email").value = "";
      document.getElementById("number").value = "";
      document.getElementById("message").value = "";
      document.getElementById("send").innerHTML = `Send Message`;
      document.getElementById("send").disabled = false;
    })
    .catch((error) => {
      alert("Failed to send message: " + error.text);
      document.getElementById("send").innerHTML = `Send Message`;
      document.getElementById("send").disabled = false;
    });
});

let productHome = document.querySelector(".products");
let main = document.getElementById("main");

function product() {
  var starCountRef = database.ref("goods/");
  starCountRef.on("value", (snapshot) => {
    const data = snapshot.val() ? snapshot.val() : [];

    productHome.innerHTML = "";
    data.forEach((member, index) => {
      if (!member) return;
      if (member.stock > 0) {
        productHome.innerHTML += `<div class="each-products">
        <div class="image-part">
          <img src="${member.image}" alt="">
        </div>
        <div class="text-part">
            <b>Name: ${member.name}</b>
            <b>Category: ${member.category}</b>

            <b>Price: ₦${member.price.toLocaleString()}</b>


        </div>
        <button onclick="det(${index})">Full Details / Purchase</button>
      </div>`;
      }
    });
    animation();
  });
}

function det(params) {
  main.style.left = "0";

  var starCountRef = database.ref("goods/");
  starCountRef.on("value", (snapshot) => {
    const data = snapshot.val()[params];

    main.innerHTML = `<div id="preview">
        <span onclick="back()" style="display: flex; width: 35px; height: 35px; border-radius: 50%; align-items: center; justify-content: center;" class="winners">
            <svg 
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="white"
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
        </span>
        <div class="choice-head">
            <h1>Product Details</h1>
        </div>
        <div class="top-prev">
            <div class="left-prev">
                <img src="${data.image}" alt="">
            </div>
            <div class="right-prev">
                <div class="detail-pre">
                    <b>Name: ${data.name}</b>
                </div>
                <div class="detail-pre">
                    <b>Category: ${data.category}</b>
                </div>
                <div class="detail-pre">
                    <b>Price: ₦${data.price.toLocaleString()}</b>
                </div>
                <div class="detail-pre">
                    <b>Description: ${data.description}</b>
                </div>
                <div class="detail-pre">
                    <b>Stock: ${data.stock}</b>
                </div>
                <div class="detail-pre">
                    <b>Ratings: ${data.rating}</b>
                </div>
                <div class="detail-pre">
                    <b>Unit: ${data.unit}</b>
                </div>
            </div>
        </div>
        <div class="bottom-prev">
            <button onclick="preOrder(event, ${params}, ${data.price}, '${data.name
      }', ${1}, '${data.image}', ${data.stock}, this)">Order</button>
            <button onclick="pay(event, '${data.name}', ${data.price
      }, ${params}, '${data.image}', ${data.stock}, this)">Buy</button>
            <button onclick="toCart('${data.image}', '${data.name}', ${data.price
      }, ${data.stock}, ${params}, this)">Add To Cart</button>
        </div>
    </div>`;
  });
}

function back() {
  main.style.left = "100%";
}

function showCart() {
  hist.style.right = 0;
}
function backCart() {
  hist.style.right = "100%";
}

function showSet() {
  settings.style.left = 0;
}
function backSet() {
  settings.style.left = "100%";
}
function backGame() {
  games.style.left = "100%";
  document.querySelector(".start-game").style.transform = "scale(0)";
}
function goGame() {
  games.style.left = 0;
  document.querySelector(
    ".start-game"
  ).innerHTML = `<h2>Use The Arrow Keys To Move The Car</h2>
          <button onclick="startGame()">Start Game</button>`;
  document.querySelector(".start-game").style.transform = "scale(1)";
}

function numAdd(index) {
  var starCountRef = firebase.database().ref(`carts/${UID}/${index}`);
  starCountRef.once("value").then((snapshot) => {
    const data = snapshot.val() || [];

    if (data.bought === data.stock) {
      data.bought = data.stock;
      read.style.width = 0;
      read.style.transition = "all 3s linear"
      document.querySelector(".alert").style.top = "10px";
      document.querySelector(".small").innerHTML =
        "Maximum item quantity reached";
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
    } else {
      let newBought = data.bought + 1;
      firebase
        .database()
        .ref(`carts/${UID}/${index}`)
        .update({
          bought: newBought,
        })
        .then(() => {
          dispCart();
        });
    }
  });
}

const toped = document.querySelectorAll(".hero-box");

toped.forEach((member) => {
  const flast = new IntersectionObserver(
    (entry) => {
      if (entry[0].isIntersecting) {
        entry[0].target.style.opacity = 1;
        entry[0].target.style.transform = "translateY(0)";
      } else {
        entry[0].target.style.opacity = 0;
        entry[0].target.style.transform = "translateY(30px)";
      }
    },
    {
      threshold: 0.7,
    }
  );

  flast.observe(member);
});

function numMin(index) {
  var starCountRef = firebase.database().ref(`carts/${UID}/${index}`);
  starCountRef.once("value").then((snapshot) => {
    const data = snapshot.val() || [];
    let newBought = data.bought;
    if (newBought === 1) {
      newBought = 1;
      read.style.width = 0;
      read.style.transition = "all 3s linear"
      document.querySelector(".alert").style.top = "10px";
      document.querySelector(".small").innerHTML = "Minimum item quantity is 1";
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
    } else {
      newBought = data.bought - 1;
    }
    firebase
      .database()
      .ref(`carts/${UID}/${index}`)
      .update({
        bought: newBought,
      })
      .then(() => {
        dispCart();
      });
  });
}

let cartResult = document.querySelector(".cart-result");

function toCart(first, second, third, four, params, data) {
  data.innerHTML = `<div class="roller"></div>`;
  data.disabled = true;
  setTimeout(() => {
    data.disabled = false;
    data.innerHTML = "Add To Cart";
    let time = new Date().toLocaleTimeString("en-us", {
      minute: "2-digit",
      hour: "2-digit",
    });

    firebase
      .database()
      .ref(`carts/`)
      .once("value")
      .then((snapshot) => {
        const data = snapshot.val() || {};
        const userCart = data[UID] || [];

        const itemIndex = userCart.findIndex((item) => {
          if (item) {
            return (
              item.third === third &&
              item.second === second &&
              item.first === first
            );
          }
        });

        if (itemIndex !== -1) {
          let newQuantity;
          if (userCart[itemIndex].bought === four) {
            newQuantity = userCart[itemIndex].bought || 1;
            read.style.width = 0;
            read.style.transition = "all 3s linear"
            document.querySelector(".alert").style.top = "10px";
            document.querySelector(".small").innerHTML =
              "Maximum item quantity reached";
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
          } else {
            newQuantity = (userCart[itemIndex].bought || 1) + 1;
            read.style.width = 0;
            read.style.transition = "all 3s linear"
            document.querySelector(".alert").style.top = "10px";
            document.querySelector(
              ".small"
            ).innerHTML = `Another ${second} was added to cart`;
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
          }
          firebase
            .database()
            .ref(`carts/${UID}/${itemIndex}`)
            .update({
              bought: newQuantity,
              date: time,
            })
            .then(() => {
              dispCart();
            });
        } else {
          const newIndex = userCart.length;

          firebase
            .database()
            .ref(`carts/${UID}/${newIndex}`)
            .set({
              first,
              second,
              third,
              time,
              bought: 1,
              stock: four,
              goodIndex: params,
            })
            .then(() => {
              read.style.width = 0;
              read.style.transition = "all 3s linear"
              document.querySelector(".alert").style.top = "10px";
              document.querySelector(
                ".small"
              ).innerHTML = `${second} was added to cart`;
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
              dispCart();
            });
        }
      });
  }, 2500);
}

function dispPurchased() {
  let disPurch = document.querySelector(".purchased-result");
  var starCountRef = firebase.database().ref(`purchased`);
  starCountRef.on("value", (snapshot) => {
    const data = snapshot.val() || {};
    const userCart = data[UID] || [];

    if (userCart.length === 0) {
      disPurch.innerHTML = "<h3 class='empty-cart'>No Good Purchased.</h3>";
      return;
    }
    disPurch.innerHTML = "";
    for (let index = userCart.length - 1; index >= 0; index--) {
      if (!userCart[index]) continue;

      disPurch.innerHTML += `<div class="pur-element">
                <div class="cart-top">
                    <img src="${userCart[index].image}" alt="" />
                    <b>${userCart[index].name}</b>
                    <b>₦ ${userCart[index].price.toLocaleString()}</b>
                    <b>${userCart[index].quantity}</b>
                </div>
                <div class="cart-top">
                    <b>${userCart[index].time}</b>
                    <b>${userCart[index].userName}</b>
                    <b>${userCart[index].date}</b>
                </div>
            </div>`;
    }
  });
}

function dispCart() {
  var starCountRef = firebase.database().ref(`carts/`);
  starCountRef.on("value", (snapshot) => {
    const data = snapshot.val() || {};
    const userCart = data[UID] || [];
    cartIndex = userCart.length;

    if (cartIndex === 0) {
      cartResult.innerHTML = "<p class='empty-cart'>No Goods In Cart</p>";
      return;
    }

    cartResult.innerHTML = "";
    for (let index = cartIndex - 1; index >= 0; index--) {
      const member = data[UID][index];

      if (!member) continue;

      if (member.bought <= 0) {
        firebase.database().ref(`carts/${UID}/${index}`).remove();
        continue;
      }

      cartResult.innerHTML += `<div class="cart-each">
        <div class="cart-top">
            <img src="${member.first}" alt="" />
            <b id="cart-name">${member.second}</b>
            <b id="cart-price">₦ ${member.third.toLocaleString()}</b>
            <b id="cart-date">${member.time}</b>
        </div>

        <div class="cart-bottom">
            <div class="num-set">
                <button onclick="numMin(${index})">-</button>
                <p id="num">${member.bought}</p>
                <button onclick="numAdd(${index})">+</button>
            </div>
            <button id=del onclick="order(event, ${index}, ${member.third}, '${member.second
        }', ${member.bought}, ${member.goodIndex}, '${member.first}', ${member.stock
        })">Order</button>
            <button id="del" onclick="buy(event, ${index}, ${member.third}, '${member.second
        }', ${member.bought}, ${member.goodIndex}, '${member.first}', ${member.stock
        })">Buy</button>
            <button id="del" onclick="delCart(${index}, '${member.second
        }')">Remove Item</button>
        </div>
    </div>`;
    }
  });
}

function delCart(params, name) {
  let conf = confirm(`You are deleting ${name} from the cart`);
  if (conf) {
    database.ref(`carts/${UID}/${params}`).remove();
    dispCart();
  }
}

let receipt = document.getElementById("receipt");

function buy(ev, index, one, two, three, last, flew, stock) {
  let sum = one * three;
  let conf = confirm(
    `You are about to pay ₦${sum.toLocaleString()} for the purchase of ${two}`
  );

  if (!conf) {
    return;
  }

  ev.preventDefault();
  const handler = PaystackPop.setup({
    key: "pk_test_cab2bc163fc8179d3d79930ca24a7b6b4faa52f3",
    email: "adebayoq12345@email.com",
    amount: sum * 100,
    callback: (transaction) => {
      const type = "Purchased";
      var moneyRef = database.ref(`money/${UID}`);
      moneyRef.once("value").then((snapshot) => {
        const data = snapshot.val();
        if (!data) {
          firebase.database().ref(`money/${UID}`).set({
            payed: sum,
          });
        } else {
          let newPayed = +data.payed + sum;

          database.ref(`money/${UID}`).update({
            payed: newPayed,
          });
        }
      });

      var totalRef = database.ref(`totalMoney`);
      totalRef.once("value").then((snapshot) => {
        const data = snapshot.val();
        if (!data) {
          firebase.database().ref("totalMoney").set({
            earned: sum,
          });
        } else {
          let newEarned = +data.earned + sum;

          database.ref(`totalMoney`).update({
            earned: newEarned,
          });
        }
      });

      var goodRef = database.ref(`goods/${last}`);
      goodRef.once("value").then((snapshot) => {
        const data = snapshot.val();
        let newSold = +data.sold + three;

        database
          .ref(`goods/${last}`)
          .update({
            sold: newSold,
            stock: +data.stock - three,
          })
          .then(() => {
            database.ref(`carts/${UID}/${index}`).remove();
          })
          .catch((error) => {
            alert(error.message);
          });
      });



      receipt.style.left = 0;
      hist.style.right = "100%";
      receipt.innerHTML = `<h1>Receipt</h1>
                    <span
                        onclick="backRep()"
                        class="winners"
                        style="
                          display: flex;
                          width: 35px;
                          height: 35px;
                          border-radius: 50%;
                          align-items: center;
                          justify-content: center;
                        "
                    >
                       <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="white"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
                    </span>
                    <div class="receipt-body">
                        <div class="receipt-head">
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />

                            <div class="amount-rec">
                                <h2>₦${sum.toLocaleString()}</h2>
                            </div>
                        </div>
                        <div class="receipt-details">
                            <div class="each">
                                <h3>Name</h3>
                                <b>${userName}</b>
                            </div>

                            <div class="each">
                                <h3>Product</h3>
                                <b>${two}</b>
                            </div>

                            <div class="each">
                                <h3>Product Quantity</h3>
                                <b>${three}</b>
                            </div>

                            <div class="each">
                <h3>Type</h3>
                <b>${type}</b>
              </div>

                            <div class="each">
                                <h3>Time</h3>
                                <b>${new Date().toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      })}</b>
                            </div>

                            <div class="each">
                                <h3>Date</h3>
                                <b>${new Date().toLocaleDateString()}</b>
                            </div>

                            <div class="each">
                                <h3>Status</h3>
                                <b>Successful</b>
                            </div>

                            <div class="each">
                                <h3>Provider</h3>
                                <b>Sparkle Tech</b>
                            </div>
                        </div>
                    </div>`;


      read.style.width = 0;
      read.style.transition = "all 3s linear"
      document.querySelector(".alert").style.top = "10px";
      document.querySelector(".small").innerHTML = "Transaction Successful";
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

      var purRef = firebase.database().ref(`purchased/${UID}`);
      purRef.once("value").then((snapshot) => {
        const data = snapshot.val() ? snapshot.val().length : 0;

        database.ref(`purchased/${UID}/${data}`).set({
          name: two,
          price: +sum,
          quantity: +three,
          image: flew,
          userName,
          type,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
      });

      var purcRef = firebase.database().ref(`totalPurchased`);
      purcRef.once("value").then((snapshot) => {
        const data = snapshot.val() ? snapshot.val().length : 0;

        database.ref(`totalPurchased/${data}`).set({
          name: two,
          price: +sum,
          quantity: +three,
          type,
          image: flew,
          user: userName,
          time: new Date().toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: new Date().toLocaleDateString(),
        });
      });

      dispCart();
      product();
    },
    onClose: () => {
      alert("Transaction was not completed.");
    },
    onError: (error) => {
      alert(`Transaction failed: ${error.message}`);
    },
  });

  handler.openIframe();
}

function pay(ev, name, price, params, flew, stock, data) {
  data.innerHTML = `<div class="roller"></div>`;

  data.disabled = true;
  setTimeout(() => {
    data.disabled = false;
    data.innerHTML = `Buy`;
    let conf = confirm(
      `You are about to pay ₦${price.toLocaleString()} for the purchase of ${name}`
    );
    if (!conf) {
      return;
    }
    ev.preventDefault();
    const handler = PaystackPop.setup({
      key: "pk_test_cab2bc163fc8179d3d79930ca24a7b6b4faa52f3",
      email: "adebayoq12345@email.com",
      amount: price * 100,
      callback: (transaction) => {
        var cartRef = firebase.database().ref(`carts`);
        cartRef.once("value").then((snapshot) => {
          const datas = snapshot.val()
          let findCart = {}
          const data = datas ? datas[UID] : [];

          const findIndex = data.findIndex((member) => {

            if (member) {
              return (
                member.second == name &&
                member.first == flew &&
                member.stock == stock
              )
            }

          });

          if (findIndex != -1) findCart = data[findIndex]

          if (findCart != 1 && (+findCart.stock > +findCart.bought)) {
            firebase
              .database()
              .ref(`carts/${UID}/${findIndex}`)
              .update({
                stock: +findCart.stock - 1,
              });

          } else if (findCart != 1 && (findCart.stock == findCart.bought)) {
            firebase
              .database()
              .ref(`carts/${UID}/${findIndex}`)
              .update({
                bought: +findCart.bought - 1,
                stock: +findCart.stock - 1,
              });
          }
        });

        dispCart();

        const type = "Purchased";
        var moneyRef = database.ref(`money/${UID}`);
        moneyRef.once("value").then((snapshot) => {
          const data = snapshot.val();
          if (!data) {
            firebase.database().ref(`money/${UID}`).set({
              payed: price,
            });
          } else {
            let newPayed = +data.payed + price;

            database.ref(`money/${UID}`).update({
              payed: newPayed,
            });
          }
        });

        var totalRef = database.ref(`totalMoney`);
        totalRef.once("value").then((snapshot) => {
          const data = snapshot.val();
          if (!data) {
            firebase.database().ref("totalMoney").set({
              earned: +price,
            });
          } else {
            let newEarned = +data.earned + price;

            database.ref(`totalMoney`).update({
              earned: newEarned,
            });
          }
        });

        var goodRef = firebase.database().ref(`goods/${params}`);
        goodRef.once("value").then((snapshot) => {
          const data = snapshot.val();

          let newSold = +data.sold + 1;

          firebase
            .database()
            .ref(`goods/${params}`)
            .update({
              sold: newSold,
              stock: +data.stock - 1,
            })
            .then(() => {
              product();
              det();
            })
            .catch((error) => {
              alert(error.message);
            });
        });

        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML = "Transaction Successful";
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

        receipt.style.left = 0;
        receipt.innerHTML = `<h1>Receipt</h1>
                    <span
                        onclick="backRep()"
                        class="winners"
                        style="
                          display: flex;
                          width: 35px;
                          height: 35px;
                          border-radius: 50%;
                          align-items: center;
                          justify-content: center;
                        "
                    >
                        <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="white"
            >
              <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
            </svg>
                    </span>
                    <div class="receipt-body">
                        <div class="receipt-head">
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />
                            <img src="pack.png" alt="" />

                            <div class="amount-rec">
                                <h2>₦${price.toLocaleString()}</h2>
                            </div>
                        </div>
                        <div class="receipt-details">
                            <div class="each">
                                <h3>Name</h3>
                                <b>${userName}</b>
                            </div>

                            <div class="each">
                                <h3>Product</h3>
                                <b>${name}</b>
                            </div>

                            <div class="each">
                                <h3>Product Quantity</h3>
                                <b>${1}</b>
                            </div>

                            <div class="each">
                <h3>Type</h3>
                <b>${type}</b>
              </div>

                            <div class="each">
                                <h3>Time</h3>
                                <b>${new Date().toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        })}</b>
                            </div>

                            <div class="each">
                                <h3>Date</h3>
                                <b>${new Date().toLocaleDateString()}</b>
                            </div>

                            <div class="each">
                                <h3>Status</h3>
                                <b>Successful</b>
                            </div>

                            <div class="each">
                                <h3>Provider</h3>
                                <b>Sparkle Tech</b>
                            </div>
                        </div>
                    </div>`;

        var purRef = firebase.database().ref(`purchased/${UID}`);
        purRef.once("value").then((snapshot) => {
          const data = snapshot.val() ? snapshot.val().length : 0;

          database.ref(`purchased/${UID}/${data}`).set({
            name,
            price: +price,
            quantity: 1,
            type,
            userName,
            image: flew,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        });

        var purcRef = firebase.database().ref(`totalPurchased`);
        purcRef.once("value").then((snapshot) => {
          const data = snapshot.val() ? snapshot.val().length : 0;

          database.ref(`totalPurchased/${data}`).set({
            name,
            price: +price,
            quantity: 1,
            type,
            user: userName,
            image: flew,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        });

        document.getElementById("main").style.left = "100%";

        product();
        dispPurchased();
      },
      onClose: () => {
        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML =
          "Transaction was not completed";
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
      },
      onError: (error) => {
        alert(`Transaction failed: ${error.message}`);
      },
    });

    handler.openIframe();
  }, 2500);
}

function order(ev, index, price, name, quantity, goodIndex, image, stock) {
  let promptQty;

  if (quantity === 1) {
    promptQty = prompt(
      `Enter your location for us to deliver ${quantity} ${name} for you!`,
      "Dugbe"
    );
  } else {
    promptQty = prompt(
      `Enter your location for us to deliver ${quantity} ${name}(s) for you!`,
      "Dugbe"
    );
  }

  if (!promptQty) {
    return;
  }

  if (!promptQty.trim()) {
    return;
  }

  let sum = price * quantity;
  let delFee = quantity * 1500;
  let conf;
  if (quantity === 1) {
    conf = confirm(
      `You are about to pay ₦${sum.toLocaleString()} for the purchase of ${quantity + " " + name
      } + ₦${delFee.toLocaleString()} as a delivery fee for the product`
    );
  } else {
    conf = confirm(
      `You are about to pay ₦${sum.toLocaleString()} for the purchase of ${quantity + " " + name
      } + ₦${delFee.toLocaleString()} as a delivery fee for the ${quantity} products`
    );
  }

  if (!conf) {
    return;
  }

  ev.preventDefault();
  const handler = PaystackPop.setup({
    key: "pk_test_cab2bc163fc8179d3d79930ca24a7b6b4faa52f3",
    email: "adebayoq12345@email.com",
    amount: sum * 100 + delFee * 100,
    callback: (transaction) => {
      var starCountRef = firebase.database().ref(`ifOnDelivery`);
      starCountRef.once("value").then((snapshot) => {
        const data = snapshot.val();

        const number = data ? +data[UID].on + quantity : 1;

        firebase.database().ref(`ifOnDelivery/${UID}`).set({
          on: number,
        });
      });

      viewOnDelivery();

      const currentTime = new Date();
      const timeCheck = new Date();
      const final = new Date();
      let count = 60000;
      const event = document.getElementById("event");

      const type = "Ordered";

      read.style.width = 0;
      read.style.transition = "all 3s linear"
      document.querySelector(".alert").style.top = "10px";
      document.querySelector(".small").innerHTML = `${name} is on delivery`;
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

      const firstInc = currentTime.setMinutes(currentTime.getMinutes() + 1);
      const secondInc = currentTime.setMinutes(currentTime.getMinutes() + 2);
      const thirdInc = currentTime.setMinutes(currentTime.getMinutes() + 1);
      const once = new Date(firstInc).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const twice = new Date(secondInc).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const timeNow = new Date(thirdInc).toLocaleTimeString("en-us", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const hist = document.getElementById("hist");

      hist.style.right = "100%";

      event.innerHTML = `<div class="track">
                                <div class="choice-head">
                                  <h1>View Your Delivery</h1>
                                  <p>Real-time updates on your appliance delivery status</p>
                                </div>
                                <div class="track-box">
                                  <div class="track-nav">
                                    <div class="track-det">
                                      <h3>(${quantity}) ${name}</h3>
                                      <span>Scheduled for Today at <b>${final.toLocaleTimeString(
        "en-us",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}</b>, to be delivered to <b>${promptQty}</b></span>
                                   </div>
                                  <b id="state">In Transit</b>
                                 </div>
                                 <div class="track-loc">
                                   <div class="track-area">
                                     <div id="line">
                                       <div id="line1"></div>
                                     </div>
                                     <div class="area-track">
                                       <span class="svg1-hold">
                                         <svg
                                           xmlns="http://www.w3.org/2000/svg"
                                           height="24px"
                                           viewBox="0 -960 960 960"
                                           width="24px"
                                           fill="rgb(0, 98, 255)"
                                           >
                                           <path
                                         d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"
                                       />
                                     </svg>
                                   </span>
                                   <h3 class="conf">Order Confirmed</h3>
                                 </div>
                             <span class="time">${final.toLocaleTimeString(
        "en-us",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      )}</span>
                               </div>

                                   <div class="track-area">
                                     <div id="line">
                                       <div id="line2"></div>
                                     </div>
                                     <div class="area-track">
                                       <span class="svg2-hold">
                                         <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                       height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#2e73b8"
                                      >
                                    <path
                                      d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"
                                    />
                                  </svg>
                                </span>
                                <h3 id="confs">Out for Delivery</h3>
                              </div>
                                  <span class="time" id="once">Pending</span>
                                </div>

                                <div class="track-area">
                                  <div id="line">
                                       <div id="line3"></div>
                                     </div>
                                  <div class="area-track">
                                    <span class="svg3-hold">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#2e73b8"
                                      >
                                    <path
                                      d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
                                    />
                                      </svg>
                                </span>
                                    <h3 id="confss">Arriving Soon</h3>
                                  </div>
                              <span class="time" id="twice">Pending</span>
                            </div>

                    <div class="track-area">
                      <div class="area-track">
                        <span class="svg4-hold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#2e73b8"
                          >
                            <path
                              d="M600-800H360v280h240v-280Zm200 0H680v280h120v-280ZM575-440H320v240h222q21 0 40.5-7t35.5-21l166-137q-8-8-18-12t-21-6q-17-3-33 1t-30 15l-108 87H400v-80h146l44-36q5-3 7.5-8t2.5-11q0-10-7.5-17.5T575-440Zm-335 0h-80v280h80v-280Zm40 0v-360q0-33 23.5-56.5T360-880h440q33 0 56.5 23.5T880-800v280q0 33-23.5 56.5T800-440H280ZM240-80h-80q-33 0-56.5-23.5T80-160v-280q0-33 23.5-56.5T160-520h415q85 0 164 29t127 98l27 41-223 186q-27 23-60 34.5T542-120H309q-11 18-29 29t-40 11Z"
                            />
                          </svg>
                        </span>
                        <h3 id="confsss">Delivered</h3>
                      </div>
                      <span id="time">Pending</span>
                    </div>
                  </div>

                  <div class="track-get">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#2e73b8"
                    >
                      <path
                        d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"
                      />
                    </svg>

                    <div class="get-det">
                      <h3 class="conf">Driver: John Smith</h3>
                      <b>Your delivery is on the way! Contact driver: 0916 306 7741</b>
                    </div>
                  </div>
                </div>
              </div>`;

      location.href = "#event";

      const svg1 = document.querySelector(".svg1-hold");
      const svg2 = document.querySelector(".svg2-hold");
      const svg3 = document.querySelector(".svg3-hold");
      const svg4 = document.querySelector(".svg4-hold");
      const line1 = document.getElementById("line1");
      const line2 = document.getElementById("line2");
      const line3 = document.getElementById("line3");

      svg1.classList.add("svgAdd");
      line1.style.height = "100%";

      setTimeout(() => {
        svg2.classList.add("svgAdd");
        line2.style.height = "100%";
        document.getElementById("confs").style.color = "#2e73b8";
        document.getElementById("once").innerHTML = once;
      }, count);

      setTimeout(() => {
        svg3.classList.add("svgAdd");
        line3.style.height = "100%";
        document.getElementById("confss").style.color = "#2e73b8";
        document.getElementById("twice").innerHTML = twice;
      }, count * 3);

      setTimeout(() => {
        document.getElementById("confsss").style.color = "#2e73b8";
        svg4.classList.add("svgAdd");
        document.getElementById("time").innerHTML = timeNow;
        document.getElementById("state").innerHTML = "Successful";

        var delRef = firebase.database().ref(`ifOnDelivery`);
        delRef.once("value").then((snapshot) => {
          const data = snapshot.val();

          const number = data ? +data[UID].on - quantity : 0;

          firebase.database().ref(`ifOnDelivery/${UID}`).set({
            on: number,
          });
        });

        viewOnDelivery();
      }, count * 4);

      setTimeout(() => {
        event.innerHTML = "";
        var moneyRef = database.ref(`money/${UID}`);
        moneyRef.once("value").then((snapshot) => {
          const data = snapshot.val();
          if (!data) {
            firebase
              .database()
              .ref(`money/${UID}`)
              .set({
                payed: +sum + +delFee,
              });
          } else {
            let newPayed = +data.payed + sum + delFee;

            database.ref(`money/${UID}`).update({
              payed: newPayed,
            });
          }
        });

        var tomRef = database.ref(`totalMoney`);
        tomRef.once("value").then((snapshot) => {
          const data = snapshot.val();
          if (!data) {
            firebase
              .database()
              .ref("totalMoney")
              .set({
                earned: +sum + +delFee,
              });
          } else {
            let newEarned = +data.earned + sum + delFee;

            database.ref(`totalMoney`).update({
              earned: newEarned,
            });
          }
        });

        var goodRef = database.ref(`goods/${goodIndex}`);
        goodRef.once("value").then((snapshot) => {
          const data = snapshot.val();
          let newSold = +data.sold + +quantity;

          database
            .ref(`goods/${goodIndex}`)
            .update({
              sold: newSold,
              stock: +data.stock - +quantity,
            })
            .then(() => {
              database.ref(`carts/${UID}/${index}`).remove();
              dispCart();
              product();
            })
            .catch((error) => {
              alert(error.message);
            });
        });

        var orderRef = firebase.database().ref(`order/${UID}`);
        orderRef.once("value").then((snapshot) => {
          const data = snapshot.val() ? snapshot.val().length : 0;

          database.ref(`order/${UID}/${data}`).set({
            name,
            price: `${+sum + +delFee}`,
            quantity,
            image,
            userName,
            type,
            date: currentTime.toLocaleDateString(),
            time: currentTime.toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        });

        var toOrRef = firebase.database().ref(`totalOrder`);
        toOrRef.once("value").then((snapshot) => {
          const data = snapshot.val() ? snapshot.val().length : 0;

          database.ref(`totalOrder/${data}`).set({
            name,
            price: `${+sum + +delFee}`,
            quantity,
            type,
            image,
            user: userName,
            time: currentTime.toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            date: currentTime.toLocaleDateString(),
          });
        });

        viewDelivered();

        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML = "Delivery Successful";
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

        receipt.style.left = 0;
        receipt.innerHTML = `<h1>Receipt</h1>
                <span
                    onclick="backRep()"
                    class="winners"
                    style="
                      display: flex;
                      width: 35px;
                      height: 35px;
                      border-radius: 50%;
                      align-items: center;
                      justify-content: center;
                    "
                >
                    <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="white"
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
                </span>
                <div class="receipt-body">
                    <div class="receipt-head">
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />

                        <div class="amount-rec">
                            <h2>₦${(sum + delFee).toLocaleString()}</h2>
                        </div>
                    </div>
                    <div class="receipt-details">
                        <div class="each">
                            <h3>Name</h3>
                            <b>${userName}</b>
                        </div>

                        <div class="each">
                            <h3>Product</h3>
                            <b>${name}</b>
                        </div>

                        <div class="each">
                            <h3>Product Quantity</h3>
                            <b>${quantity}</b>
                        </div>

                        <div class="each">
                <h3>Type</h3>
                <b>${type}</b>
              </div>

                        <div class="each">
                            <h3>Time</h3>
                            <b>${timeCheck.toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        })} - ${currentTime.toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        })}</b>
                        </div>

                        <div class="each">
                            <h3>Date</h3>
                            <b>${currentTime.toLocaleDateString()}</b>
                        </div>

                        <div class="each">
                            <h3>Status</h3>
                            <b>Successful</b>
                        </div>

                        <div class="each">
                            <h3>Provider</h3>
                            <b>Sparkle Tech</b>
                        </div>
                    </div>
                </div>`;

        dispCart();
        product();
      }, count * 4 + 3000);
    },
    onClose: () => {
      read.style.width = 0;
      read.style.transition = "all 3s linear"
      document.querySelector(".alert").style.top = "10px";
      document.querySelector(".small").innerHTML =
        "Transaction was not completed";
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
    },
    onError: (error) => {
      alert(`Transaction failed: ${error.message}`);
    },
  });

  handler.openIframe();
}

function dispOrder() {
  let navRec = document.querySelector(".nav-recent");
  let order = document.querySelector(".order-result");
  var starCountRef = firebase.database().ref(`order`);
  starCountRef.on("value", (snapshot) => {
    const data = snapshot.val() || {};
    const userCart = data[UID] || [];

    if (userCart.length === 0) {
      order.innerHTML = "<p class='empty-cart'>No Goods Ordered.</p>";
      navRec.innerHTML = "<p class='empty-car'>No Goods Ordered.</p>";
      return;
    }

    navRec.innerHTML = "";
    order.innerHTML = "";



    for (
      let index = userCart.length - 1;
      index > userCart.length - 3;
      index--
    ) {
      const member = userCart[index];
      if (!member) continue;
      const price = +member.price;
      navRec.innerHTML += ` <div style="width: 100%;" class="cart-each">
              <div class="cart-top">
                <img
                  style="border: 1.5px solid #2e73b8; border-radius: 10px"
                  src="${member.image}"
                  alt=""
                />
                <b id="cart-name">${member.name}</b>
                <b id="cart-price">₦ ${price.toLocaleString()}</b>
                <b id="cart-date">${member.quantity}</b>
              </div>

              <div class="cart-bottom">
                <b>${member.time}</b>
                <b>Successful</b>
                <b>${member.date}</b>
              </div>
            </div>`;
    }
    for (let index = userCart.length - 1; index >= 0; index--) {
      const member = userCart[index];

      if (!member) continue;
      const price = +member.price;

      order.innerHTML += ` <div class="cart-each">
              <div class="cart-top">
                <img
                  style="border: 1.5px solid #2e73b8; border-radius: 10px"
                  src="${member.image}"
                  alt=""
                />
                <b id="cart-name">${member.name}</b>
                <b id="cart-price">₦ ${price.toLocaleString()}</b>
                <b id="cart-date">${member.quantity}</b>
              </div>

              <div class="cart-bottom">
                <b>${member.time}</b>
                <b>Successful</b>
                <b>${member.date}</b>
              </div>
            </div>`;
    }
  });
}

function backReps() {
  receipts.style.left = "100%";
}

function backRep() {
  receipt.style.left = "100%";
  document.getElementById("main").style.left = "100%";
}

function viewReceipts() {
  const rec = document.querySelector(".receipt-son");
  receipts.style.left = 0;
  var discRef = firebase.database().ref(`discount`);
  discRef.on("value", (snapshot) => {
    const slow = snapshot.val() ? snapshot.val() : {};
    const data = slow[UID] ? slow[UID] : [];

    var orderRef = firebase.database().ref(`order`);
    orderRef.on("value", (snapshot) => {
      const tall = snapshot.val() ? snapshot.val() : {};
      const fly = tall[UID] ? tall[UID] : [];

      var purRef = firebase.database().ref(`purchased`);
      purRef.on("value", (snapshot) => {
        const fish = snapshot.val() ? snapshot.val() : {};
        const pig = fish[UID] ? fish[UID] : [];

        let newARR = [...data, ...fly, ...pig];

        newARR.sort((a, b) => {
          const formatDate = (dateStr) => {
            const [day, month, year] = dateStr.split("/");
            return `${year}-${month}-${day}`;
          };

          const d1 = new Date(`${formatDate(a.date)} ${a.time}`);
          const d2 = new Date(`${formatDate(b.date)} ${b.time}`);

          return d2 - d1;
        });

        if (newARR.length === 0) {
          rec.innerHTML = "<h3 class='empty-ca'>No Receipt Yet</h3>";
          rec.style.alignItems = "center";
          return;
        }
        rec.innerHTML = "";
        newARR.forEach((member) => {

          if (!member) return;

          rec.innerHTML += `<div class="receipt-body">
                    <div class="receipt-head">
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />

                        <div class="amount-rec">
                            <h2>₦${(+member.price).toLocaleString()}</h2>
                        </div>
                    </div>
                    <div class="receipt-details">
                        <div class="each">
                            <h3>Name</h3>
                            <b>${member.userName}</b>
                        </div>

                        <div class="each">
                            <h3>Product</h3>
                            <b>${member.name}</b>
                        </div>

                        <div class="each">
                            <h3>Product Quantity</h3>
                            <b>${member.quantity}</b>
                        </div>

                        <div class="each">
                <h3>Type</h3>
                <b>${member.type}</b>
              </div>

                        <div class="each">
                            <h3>Time</h3>
                            <b>${member.time}</b>
                        </div>

                        <div class="each">
                            <h3>Date</h3>
                            <b>${member.date}</b>
                        </div>

                        <div class="each">
                            <h3>Status</h3>
                            <b>Successful</b>
                        </div>

                        <div class="each">
                            <h3>Provider</h3>
                            <b>Sparkle Tech</b>
                        </div>
                    </div>
                </div>`;
        });

        const reciept = document.querySelectorAll(".receipt-body");
        reciept.forEach((member) => {
          const flast = new IntersectionObserver(
            (entry) => {
              if (entry[0].isIntersecting) {
                entry[0].target.style.opacity = 1;
                entry[0].target.style.transform = "translateY(0)";
              } else {
                entry[0].target.style.opacity = 0;
                entry[0].target.style.transform = "translateY(30px)";
              }
            },
            {
              threshold: 0.4,
            }
          );

          flast.observe(member);
        });
      });
    });
  });
}

function preOrder(ev, index, price, name, quantity, image, stock, data) {
  data.innerHTML = `<div class="roller"></div>`;
  data.disabled = true;

  setTimeout(() => {
    data.disabled = false;
    data.innerHTML = `Order`;
    const promptQty = prompt(
      `Enter your location for us to deliver ${quantity} ${name} for you!`,
      "Dugbe"
    );

    if (!promptQty) {
      return;
    }

    if (!promptQty.trim()) {
      return;
    }

    let delFee = quantity * 1500;

    const conf = confirm(
      `You are about to pay ₦${price.toLocaleString()} for the purchase of ${quantity + " " + name
      } + ₦${delFee.toLocaleString()} as a delivery fee for the product`
    );

    if (!conf) {
      return;
    }

    ev.preventDefault();
    const handler = PaystackPop.setup({
      key: "pk_test_cab2bc163fc8179d3d79930ca24a7b6b4faa52f3",
      email: "adebayoq12345@email.com",
      amount: price * 100 + delFee * 100,
      callback: (transaction) => {
        var delRef = firebase.database().ref(`ifOnDelivery`);
        delRef.once("value").then((snapshot) => {
          const data = snapshot.val();

          const number = data ? +data[UID].on + 1 : 1;

          firebase.database().ref(`ifOnDelivery/${UID}`).set({
            on: number,
          });

          console.log(number);

        });

        viewOnDelivery();

        const stand = new Date();

        const currentTime = new Date();
        let count = 60000;
        const event = document.getElementById("event");

        const type = "Ordered";

        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML = `${name} is on delivery`;
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

        const firstInc = currentTime.setMinutes(currentTime.getMinutes() + 1);
        const secondInc = currentTime.setMinutes(currentTime.getMinutes() + 2);
        const thirdInc = currentTime.setMinutes(currentTime.getMinutes() + 1);
        const once = new Date(firstInc).toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const twice = new Date(secondInc).toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const timeNow = new Date(thirdInc).toLocaleTimeString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
        });

        const main = document.getElementById("main");

        main.style.left = "100%";

        event.innerHTML = `<div class="track">
                                <div class="choice-head">
                                  <h1>View Your Delivery</h1>
                                  <p>Real-time updates on your appliance delivery status</p>
                                </div>
                                <div class="track-box">
                                  <div class="track-nav">
                                    <div class="track-det">
                                      <h3>(${quantity}) ${name}</h3>
                                      <span>Scheduled for Today at <b>${stand.toLocaleTimeString(
          "en-us",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )}</b>, to be delivered to <b>${promptQty}</b></span>
                                   </div>
                                  <b id="state">In Transit</b>
                                 </div>
                                 <div class="track-loc">
                                   <div class="track-area">
                                     <div id="line">
                                       <div id="line1"></div>
                                     </div>
                                     <div class="area-track">
                                       <span class="svg1-hold">
                                         <svg
                                           xmlns="http://www.w3.org/2000/svg"
                                           height="24px"
                                           viewBox="0 -960 960 960"
                                           width="24px"
                                           fill="rgb(0, 98, 255)"
                                           >
                                           <path
                                         d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"
                                       />
                                     </svg>
                                   </span>
                                   <h3 class="conf">Order Confirmed</h3>
                                 </div>
                             <span class="time">${stand.toLocaleTimeString(
          "en-us",
          {
            hour: "2-digit",
            minute: "2-digit",
          }
        )}</span>
                               </div>

                                   <div class="track-area">
                                     <div id="line">
                                       <div id="line2"></div>
                                     </div>
                                     <div class="area-track">
                                       <span class="svg2-hold">
                                         <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                       height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#2e73b8"
                                      >
                                    <path
                                      d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"
                                    />
                                  </svg>
                                </span>
                                <h3 id="confs">Out for Delivery</h3>
                              </div>
                                  <span class="time" id="once">Pending</span>
                                </div>

                                <div class="track-area">
                                  <div id="line">
                                       <div id="line3"></div>
                                     </div>
                                  <div class="area-track">
                                    <span class="svg3-hold">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        fill="#2e73b8"
                                      >
                                    <path
                                      d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
                                    />
                                      </svg>
                                </span>
                                    <h3 id="confss">Arriving Soon</h3>
                                  </div>
                              <span class="time" id="twice">Pending</span>
                            </div>

                    <div class="track-area">
                      <div class="area-track">
                        <span class="svg4-hold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#2e73b8"
                          >
                            <path
                              d="M600-800H360v280h240v-280Zm200 0H680v280h120v-280ZM575-440H320v240h222q21 0 40.5-7t35.5-21l166-137q-8-8-18-12t-21-6q-17-3-33 1t-30 15l-108 87H400v-80h146l44-36q5-3 7.5-8t2.5-11q0-10-7.5-17.5T575-440Zm-335 0h-80v280h80v-280Zm40 0v-360q0-33 23.5-56.5T360-880h440q33 0 56.5 23.5T880-800v280q0 33-23.5 56.5T800-440H280ZM240-80h-80q-33 0-56.5-23.5T80-160v-280q0-33 23.5-56.5T160-520h415q85 0 164 29t127 98l27 41-223 186q-27 23-60 34.5T542-120H309q-11 18-29 29t-40 11Z"
                            />
                          </svg>
                        </span>
                        <h3 id="confsss">Delivered</h3>
                      </div>
                      <span id="time">Pending</span>
                    </div>
                  </div>

                  <div class="track-get">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#2e73b8"
                    >
                      <path
                        d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"
                      />
                    </svg>

                    <div class="get-det">
                      <h3 class="conf">Driver: John Smith</h3>
                      <b>Your delivery is on the way! Contact driver: 0916 306 7741</b>
                    </div>
                  </div>
                </div>
              </div>`;

        location.href = "#event";

        const svg1 = document.querySelector(".svg1-hold");
        const svg2 = document.querySelector(".svg2-hold");
        const svg3 = document.querySelector(".svg3-hold");
        const svg4 = document.querySelector(".svg4-hold");
        const line1 = document.getElementById("line1");
        const line2 = document.getElementById("line2");
        const line3 = document.getElementById("line3");

        svg1.classList.add("svgAdd");
        line1.style.height = "100%";

        console.log(once);
        console.log(firstInc);

        setTimeout(() => {
          svg2.classList.add("svgAdd");
          line2.style.height = "100%";
          document.getElementById("confs").style.color = "#2e73b8";
          document.getElementById("once").innerHTML = once;
        }, count);

        setTimeout(() => {
          svg3.classList.add("svgAdd");
          line3.style.height = "100%";
          document.getElementById("confss").style.color = "#2e73b8";
          document.getElementById("twice").innerHTML = twice;
        }, count * 3);

        setTimeout(() => {
          document.getElementById("confsss").style.color = "#2e73b8";
          svg4.classList.add("svgAdd");
          document.getElementById("time").innerHTML = timeNow;
          document.getElementById("state").innerHTML = "Successful";

          var delRef = firebase.database().ref(`ifOnDelivery`);
          delRef.once("value").then((snapshot) => {
            const data = snapshot.val();

            const number = data ? +data[UID].on - 1 : 0;

            firebase.database().ref(`ifOnDelivery/${UID}`).set({
              on: number,
            });
          });

          viewOnDelivery();
        }, count * 4);

        setTimeout(() => {
          event.innerHTML = "";
          var moneyRef = database.ref(`money/${UID}`);
          moneyRef.once("value").then((snapshot) => {
            const data = snapshot.val();
            if (!data) {
              firebase
                .database()
                .ref(`money/${UID}`)
                .set({
                  payed: +price + +delFee,
                });
            } else {
              let newPayed = +data.payed + +price + +delFee;

              database.ref(`money/${UID}`).update({
                payed: newPayed,
              });
            }
          });

          var totalRef = database.ref(`totalMoney`);
          totalRef.once("value").then((snapshot) => {
            const data = snapshot.val();
            if (!data) {
              firebase
                .database()
                .ref("totalMoney")
                .set({
                  earned: +price + +delFee,
                });
            } else {
              let newEarned = +data.earned + +price + +delFee;

              database.ref(`totalMoney`).update({
                earned: newEarned,
              });
            }
          });

          var goodRef = database.ref(`goods/${index}`);
          goodRef.once("value").then((snapshot) => {
            const data = snapshot.val();
            let newSold = +data.sold + +quantity;

            database
              .ref(`goods/${index}`)
              .update({
                sold: newSold,
                stock: +data.stock - +quantity,
              })
              .then(() => {
                dispOrder();
                product();
              })
              .catch((error) => {
                alert(error.message);
              });
          });

          var cartRef = firebase.database().ref(`carts`);
          cartRef.once("value").then((snapshot) => {
            const datas = snapshot.val()
            let findCart = {}
            const data = datas ? datas[UID] : [];

            const findIndex = data.findIndex((member) => {

              if (member) {
                return (
                  member.second == name &&
                  member.first == image &&
                  member.stock == stock
                )
              }

            });

            if (findIndex != -1) findCart = data[findIndex]

            if (findCart != 1 && (+findCart.stock > +findCart.bought)) {
              firebase
                .database()
                .ref(`carts/${UID}/${findIndex}`)
                .update({
                  stock: +findCart.stock - 1,
                });

            } else if (findCart != 1 && (findCart.stock == findCart.bought)) {
              firebase
                .database()
                .ref(`carts/${UID}/${findIndex}`)
                .update({
                  bought: +findCart.bought - 1,
                  stock: +findCart.stock - 1,
                });
            }
          });

          dispCart();

          var starCountRef = firebase.database().ref(`order/${UID}`);
          starCountRef.once("value").then((snapshot) => {
            const data = snapshot.val() ? snapshot.val().length : 0;

            database.ref(`order/${UID}/${data}`).set({
              name,
              price: `${+price + +delFee}`,
              quantity,
              image,
              userName,
              type,
              date: currentTime.toLocaleDateString(),
              time: currentTime.toLocaleTimeString("en-us", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
          });

          var toOrRef = firebase.database().ref(`totalOrder`);
          toOrRef.once("value").then((snapshot) => {
            const data = snapshot.val() ? snapshot.val().length : 0;

            database.ref(`totalOrder/${data}`).set({
              name,
              price: `${+price + +delFee}`,
              quantity,
              type,
              image,
              user: userName,
              time: currentTime.toLocaleTimeString("en-us", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              date: currentTime.toLocaleDateString(),
            });
          });

          viewDelivered();

          read.style.width = 0;
          read.style.transition = "all 3s linear"
          document.querySelector(".alert").style.top = "10px";
          document.querySelector(".small").innerHTML = "Delivery Successful";
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

          receipt.style.left = 0;
          receipt.innerHTML = `<h1>Receipt</h1>
                <span
                    onclick="backRep()"
                    class="winners"
                    style="
                      display: flex;
                      width: 35px;
                      height: 35px;
                      border-radius: 50%;
                      align-items: center;
                      justify-content: center;
                    "
                >
                   <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30px"
          viewBox="0 -960 960 960"
          width="30px"
          fill="white"
        >
          <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
        </svg>
                </span>
                <div class="receipt-body">
                    <div class="receipt-head">
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />
                        <img src="pack.png" alt="" />

                        <div class="amount-rec">
                            <h2>₦${(price + delFee).toLocaleString()}</h2>
                        </div>
                    </div>
                    <div class="receipt-details">
                        <div class="each">
                            <h3>Name</h3>
                            <b>${userName}</b>
                        </div>

                        <div class="each">
                            <h3>Product</h3>
                            <b>${name}</b>
                        </div>

                        <div class="each">
                            <h3>Product Quantity</h3>
                            <b>${+quantity}</b>
                        </div>

                        <div class="each">
                <h3>Type</h3>
                <b>${type}</b>
              </div>

                        <div class="each">
                            <h3>Time</h3>
                            <b>${stand.toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          })} - ${currentTime.toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          })}</b>
                        </div>

                        <div class="each">
                            <h3>Date</h3>
                            <b>${currentTime.toLocaleDateString()}</b>
                        </div>

                        <div class="each">
                            <h3>Status</h3>
                            <b>Successful</b>
                        </div>

                        <div class="each">
                            <h3>Provider</h3>
                            <b>Sparkle Tech</b>
                        </div>
                    </div>
                </div>`;

          dispOrder();
          product();
        }, count * 4 + 3000);
      },
      onClose: () => {
        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML =
          "Transaction was not completed";
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
      },
      onError: (error) => {
        alert(`Transaction failed: ${error.message}`);
      },
    });

    handler.openIframe();
  }, 2500);
}


function dispDiscount() {
  const disc = document.querySelector(".act-result");
  var starCountRef = database.ref(`discount/`);
  starCountRef.on("value", (snapshot) => {
    const show = snapshot.val() ? snapshot.val() : {};
    const data = show[UID] ? show[UID] : [];
    disc.innerHTML = "";

    if (data.length === 0) {
      disc.innerHTML = "<p class='empty-cart'>No Products Here.</p>";
      return;
    }
    disc.innerHTML = "";
    for (let index = data.length - 1; index >= 0; index--) {
      const member = data[index];
      if (!member) continue;

      disc.innerHTML += ` <div style="width: 90%;" class="cart-each">
              <div class="cart-top">
                <img
                  style="border: 1.5px solid #2e73b8; border-radius: 10px"
                  src="${member.image}"
                  alt=""
                />
                <b id="cart-name">${member.name}</b>
                <b id="cart-price">₦ ${member.price.toLocaleString()}</b>
                <b id="cart-date">${member.quantity}</b>
              </div>

              <div class="cart-bottom">
                <b>${member.time}</b>
                <b>${member.type}</b>
                <b>${member.date}</b>
              </div>
            </div>`;
    }
  });
}



function viewDiscount() {
  const disc = document.querySelector(".body-disc");

  document.getElementById("discount").style.left = 0;

  var starCountRef = database.ref("goods/");
  starCountRef.once("value", (snapshot) => {
    const data = snapshot.val() ? snapshot.val() : [];
    let random = Math.floor(Math.random() * (data.length - 3));

    indexDisc = random;
    console.log(random);

    disc.innerHTML = "";

    for (let index = random; index < random + 3; index++) {
      const member = data[index];

      if (!member) continue;
      const price = +member.price;

      disc.innerHTML += `<div class="each-productss">
        <div class="image-part">
        <img src="${member.image}" alt="">
        </div>
        <div class="text-part">
            <b>Name: ${member.name}</b>
            <b>Category: ${member.category}</b>
            <b>Price: ₦ ${(price * 0.8).toLocaleString()}</b>
            <b>Description: ${member.description}</b>
            <b>Stock: ${member.stock}</b>
            <b>Discount: 20%</b>
            <b>Unit: ${member.unit}</b>
            <b>Rating: ${member.rating}</b>
            
            
            </div>
            </div>`;

      const set = document.querySelectorAll(".each-productss");
      set.forEach((member) => {
        const lastest = new IntersectionObserver(
          (entry) => {
            if (entry[0].isIntersecting) {
              entry[0].target.classList.add("flown");
            } else {
              entry[0].target.classList.remove("flown");
            }
          },
          {
            threshold: 0,
          }
        );

        lastest.observe(member);
      });
    }
  });
}

function backCount() {
  discount.style.left = "100%";
}

function buyAll(ev, params) {


  params.disabled = true;
  params.innerHTML = `<div class="roller"></div>`;
  setTimeout(() => {
    params.disabled = false;
    params.innerHTML = "Buy All";
    alert(
      `We are discounting you with 20% for the total products`
    );


    var goodRef = database.ref("goods/");
    goodRef.once("value").then((snapshot) => {
      const data = snapshot.val() ? snapshot.val() : [];

      let value = 0;
      for (let index = indexDisc; index < indexDisc + 3; index++) {
        const member = data[index];

        if (!member) continue;
        value += member.price;
      }

      const sum = value - 0.2 * value;

      ev.preventDefault();
      const handler = PaystackPop.setup({
        key: "pk_test_cab2bc163fc8179d3d79930ca24a7b6b4faa52f3",
        email: "adebayoq12345@email.com",
        amount: sum * 100,
        callback: (transaction) => {
          const type = "Purchased";
          var moneyRef = database.ref(`money/${UID}`);
          moneyRef.once("value").then((snapshot) => {
            const data = snapshot.val();
            if (!data) {
              firebase.database().ref(`money/${UID}`).set({
                payed: +sum,
              });
            } else {
              let newPayed = +data.payed + +sum;

              database.ref(`money/${UID}`).update({
                payed: newPayed,
              });
            }
          });

          var totalRef = database.ref(`totalMoney`);
          totalRef.once("value").then((snapshot) => {
            const data = snapshot.val();
            if (!data) {
              firebase.database().ref("totalMoney").set({
                earned: +sum,
              });
            } else {
              let newEarned = +data.earned + +sum;

              database.ref(`totalMoney`).update({
                earned: newEarned,
              });
            }
          });

          read.style.width = 0;
          read.style.transition = "all 3s linear"
          document.querySelector(".alert").style.top = "10px";
          document.querySelector(".small").innerHTML =
            "Transaction successful. View receipts to check items";
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



          var orderRef = firebase.database().ref(`discount/${UID}`);

          orderRef.once("value").then((snapshot) => {
            const startCount = snapshot.val() ? snapshot.val().length : 0;

            for (let index = indexDisc; index < indexDisc + 3; index++) {
              database
                .ref(`goods/${index}`)
                .once("value")
                .then((goodSnapshot) => {
                  const data = goodSnapshot.val();

                  const arrayPosition = startCount + (index - indexDisc);

                  database.ref(`discount/${UID}/${arrayPosition}`).set({
                    name: data.name,
                    price: +data.price * 0.8,
                    quantity: 1,
                    image: data.image,
                    userName,
                    type,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString("en-us", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  });
                });
            }
          });

          var totalDiscRef = firebase.database().ref(`totalDiscount`);

          totalDiscRef.once("value").then((snapshot) => {
            const startCount = snapshot.val() ? snapshot.val().length : 0;

            for (let index = indexDisc; index < indexDisc + 3; index++) {
              database
                .ref(`goods/${index}`)
                .once("value")
                .then((goodSnapshot) => {
                  const data = goodSnapshot.val();

                  const arrayPosition = startCount + (index - indexDisc);

                  database.ref(`totalDiscount/${arrayPosition}`).set({
                    name: data.name,
                    price: +data.price * 0.8,
                    quantity: 1,
                    image: data.image,
                    user: userName,
                    type: type,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString("en-us", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  });
                });
            }
          });

          setTimeout(() => {

            for (let index = indexDisc; index < indexDisc + 3; index++) {
              var goodRef = database.ref(`goods/${index}`);
              goodRef.once("value").then((snapshot) => {
                const data = snapshot.val();
                let newSold = +data.sold + 1;

                database
                  .ref(`goods/${index}`)
                  .update({
                    sold: newSold,
                    stock: +data.stock - 1,
                  })
                  .then(() => {
                  })
                  .catch((error) => {
                    alert(error.message);
                  });
              });
            }
          }, 2000);


          firebase.database().ref(`checkDisc/${UID}/0`).set({
            state: true,
          });



          for (let index = indexDisc; index < indexDisc + 3; index++) {
            database
              .ref(`goods/${index}`)
              .once("value")
              .then((goodSnapshot) => {
                const product = goodSnapshot.val();

                database
                  .ref(`carts/${UID}`)
                  .once("value")
                  .then((snapshot) => {
                    const cartData = snapshot.val() || [];

                    const findCart = cartData.findIndex(
                      (member) =>
                        member &&
                        member.second === product.name &&
                        member.first === product.image
                    );

                    if (findCart !== -1) {
                      const cartItem = cartData[findCart];
                      let updated = {};

                      if (+cartItem.stock === +cartItem.bought) {
                        updated = {
                          bought: +cartItem.bought - 1,
                          stock: +cartItem.stock - 1,
                        };
                      } else {
                        updated = {
                          stock: +cartItem.stock - 1,
                        };
                      }

                      firebase
                        .database()
                        .ref(`carts/${UID}/${findCart}`)
                        .update(updated)
                        .then(() => {
                          dispCart();
                        });
                    }
                  });
              });
          }

          receipt.style.left = 0;
          document.getElementById("discount").style.left = "100%";
          receipt.innerHTML = `<h1>Receipt</h1>
                              <span
                                  onclick="backRep()"
                                  class="winners"
                                  style="
                                    display: flex;
                                    width: 35px;
                                    height: 35px;
                                    border-radius: 50%;
                                    align-items: center;
                                    justify-content: center;
                                  "
                              >
                                  <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="white"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
                              </span>
                              <div class="receipt-body">
                                  <div class="receipt-head">
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />
                                      <img src="pack.png" alt="" />

                                      <div class="amount-rec">
                                          <h2>₦${sum.toLocaleString()}</h2>
                                      </div>
                                  </div>
                                  <div class="receipt-details">
                                      <div class="each">
                                          <h3>Name</h3>
                                          <b>${userName}</b>
                                      </div>

                                      <div class="each">
                                          <h3>Product</h3>
                                          <b>3 Products All Together</b>
                                      </div>

                                      <div class="each">
                                          <h3>Product Quantity</h3>
                                          <b>3 Products in Bulk</b>
                                      </div>

                                      <div class="each">
                          <h3>Type</h3>
                          <b>${type}</b>
                        </div>

                                      <div class="each">
                                          <h3>Time</h3>
                                          <b>${new Date().toLocaleTimeString(
            "en-us",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )}</b>
                                      </div>

                                      <div class="each">
                                          <h3>Date</h3>
                                          <b>${new Date().toLocaleDateString()}</b>
                                      </div>

                                      <div class="each">
                                          <h3>Status</h3>
                                          <b>Successful</b>
                                      </div>

                                      <div class="each">
                                          <h3>Provider</h3>
                                          <b>Sparkle Tech</b>
                                      </div>
                                  </div>
                              </div>`;

          document.getElementById("checker").style.display = "none";
        },
        onClose: () => {
          read.style.width = 0;
          read.style.transition = "all 3s linear"
          document.querySelector(".alert").style.top = "10px";
          document.querySelector(".small").innerHTML =
            "Transaction was not completed";
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
        },
        onError: (error) => {
          alert(`Transaction failed: ${error.message}`);
        },
      });

      handler.openIframe();
    });
  }, 2500);
}




function orderAll(ev, params) {

  params.innerHTML = `<div class="roller"></div>`;
  params.disabled = true;

  setTimeout(() => {
    params.disabled = false;
    params.innerHTML = "Order All";
    alert(
      `We are discounting you with 20% for both the total products and the delivery fee`
    );


    let pro = prompt("Enter you location", "Dugbe");

    if (!pro) return;
    if (!pro.trim()) return;

    var goodRef = database.ref("goods/");
    goodRef.once("value").then((snapshot) => {
      const data = snapshot.val() ? snapshot.val() : [];

      let value = 0;
      for (let index = indexDisc; index < indexDisc + 3; index++) {
        const members = data[index];
        if (!members) continue;
        value += members.price;
      }

      const add = value - 0.2 * value;

      const delivery = 4500 - 0.2 * 4500;

      const sum = add + delivery;

      ev.preventDefault();
      const handler = PaystackPop.setup({
        key: "pk_test_cab2bc163fc8179d3d79930ca24a7b6b4faa52f3",
        email: "adebayoq12345@email.com",
        amount: sum * 100,
        callback: (transaction) => {
          const type = "Ordered";
          var delRef = firebase.database().ref(`ifOnDelivery`);
          delRef.once("value").then((snapshot) => {
            const data = snapshot.val();
            const number = data ? +data[UID].on + 3 : 3;

            firebase.database().ref(`ifOnDelivery/${UID}`).set({
              on: number,
            });
          });

          viewOnDelivery();

          const statement = new Date();
          const currentTime = new Date();
          const final = new Date();

          const count = 60000;
          const event = document.getElementById("event");
          read.style.width = 0;
          read.style.transition = "all 3s linear"
          document.querySelector(".alert").style.top = "10px";
          document.querySelector(".small").innerHTML =
            "Trasaction successful. Delivery is going on!";
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

          const firstInc = currentTime.setMinutes(currentTime.getMinutes() + 1);
          const secondInc = currentTime.setMinutes(
            currentTime.getMinutes() + 2
          );
          const thirdInc = currentTime.setMinutes(currentTime.getMinutes() + 1);
          const once = new Date(firstInc).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const twice = new Date(secondInc).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const timeNow = new Date(thirdInc).toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          });

          document.getElementById("discount").style.left = "100%";

          location.href = "#event";

          event.innerHTML = `<div class="track">
                                    <div class="choice-head">
                                      <h1>View Your Delivery</h1>
                                      <p>Real-time updates on your appliance delivery status</p>
                                    </div>
                                    <div class="track-box">
                                      <div class="track-nav">
                                        <div class="track-det">
                                          <h3>3 Products In Bulk</h3>
                                          <span>Scheduled for Today at <b>${final.toLocaleTimeString(
            "en-us",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )}</b>, to be delivered to <b>${pro}</b></span>
                                       </div>
                                      <b id="state">In Transit</b>
                                     </div>
                                     <div class="track-loc">
                                       <div class="track-area">
                                         <div id="line">
                                           <div id="line1"></div>
                                         </div>
                                         <div class="area-track">
                                           <span class="svg1-hold">
                                             <svg
                                               xmlns="http://www.w3.org/2000/svg"
                                               height="24px"
                                               viewBox="0 -960 960 960"
                                               width="24px"
                                               fill="rgb(0, 98, 255)"
                                               >
                                               <path
                                             d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"
                                           />
                                         </svg>
                                       </span>
                                       <h3 class="conf">Order Confirmed</h3>
                                     </div>
                                 <span class="time">${final.toLocaleTimeString(
            "en-us",
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          )}</span>
                                   </div>

                                       <div class="track-area">
                                         <div id="line">
                                           <div id="line2"></div>
                                         </div>
                                         <div class="area-track">
                                           <span class="svg2-hold">
                                             <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                           height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#2e73b8"
                                          >
                                        <path
                                          d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"
                                        />
                                      </svg>
                                    </span>
                                    <h3 id="confs">Out for Delivery</h3>
                                  </div>
                                      <span class="time" id="once">Pending</span>
                                    </div>

                                    <div class="track-area">
                                      <div id="line">
                                           <div id="line3"></div>
                                         </div>
                                      <div class="area-track">
                                        <span class="svg3-hold">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            height="24px"
                                            viewBox="0 -960 960 960"
                                            width="24px"
                                            fill="#2e73b8"
                                          >
                                        <path
                                          d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"
                                        />
                                          </svg>
                                    </span>
                                        <h3 id="confss">Arriving Soon</h3>
                                      </div>
                                  <span class="time" id="twice">Pending</span>
                                </div>

                        <div class="track-area">
                          <div class="area-track">
                            <span class="svg4-hold">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#2e73b8"
                              >
                                <path
                                  d="M600-800H360v280h240v-280Zm200 0H680v280h120v-280ZM575-440H320v240h222q21 0 40.5-7t35.5-21l166-137q-8-8-18-12t-21-6q-17-3-33 1t-30 15l-108 87H400v-80h146l44-36q5-3 7.5-8t2.5-11q0-10-7.5-17.5T575-440Zm-335 0h-80v280h80v-280Zm40 0v-360q0-33 23.5-56.5T360-880h440q33 0 56.5 23.5T880-800v280q0 33-23.5 56.5T800-440H280ZM240-80h-80q-33 0-56.5-23.5T80-160v-280q0-33 23.5-56.5T160-520h415q85 0 164 29t127 98l27 41-223 186q-27 23-60 34.5T542-120H309q-11 18-29 29t-40 11Z"
                                />
                              </svg>
                            </span>
                            <h3 id="confsss">Delivered</h3>
                          </div>
                          <span id="time">Pending</span>
                        </div>
                      </div>

                      <div class="track-get">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#2e73b8"
                        >
                          <path
                            d="M240-160q-50 0-85-35t-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280-280q0-17-11.5-28.5T240-320q-17 0-28.5 11.5T200-280q0 17 11.5 28.5T240-240ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm600 120q17 0 28.5-11.5T760-280q0-17-11.5-28.5T720-320q-17 0-28.5 11.5T680-280q0 17 11.5 28.5T720-240Zm-40-200h170l-90-120h-80v120ZM360-540Z"
                          />
                        </svg>

                        <div class="get-det">
                          <h3 class="conf">Driver: John Smith</h3>
                          <b>Your delivery is on the way! Contact driver: 0916 306 7741</b>
                        </div>
                      </div>
                    </div>
                  </div>`;

          location.href = "#event";

          const svg1 = document.querySelector(".svg1-hold");
          const svg2 = document.querySelector(".svg2-hold");
          const svg3 = document.querySelector(".svg3-hold");
          const svg4 = document.querySelector(".svg4-hold");
          const line1 = document.getElementById("line1");
          const line2 = document.getElementById("line2");
          const line3 = document.getElementById("line3");

          svg1.classList.add("svgAdd");
          line1.style.height = "100%";

          setTimeout(() => {
            svg2.classList.add("svgAdd");
            line2.style.height = "100%";
            document.getElementById("confs").style.color = "#2e73b8";
            document.getElementById("once").innerHTML = once;
          }, count);

          setTimeout(() => {
            svg3.classList.add("svgAdd");
            line3.style.height = "100%";
            document.getElementById("confss").style.color = "#2e73b8";
            document.getElementById("twice").innerHTML = twice;
          }, count * 3);

          setTimeout(() => {
            document.getElementById("confsss").style.color = "#2e73b8";
            svg4.classList.add("svgAdd");
            document.getElementById("time").innerHTML = timeNow;
            document.getElementById("state").innerHTML = "Successful";

            var delRef = firebase.database().ref(`ifOnDelivery`);
            delRef.once("value").then((snapshot) => {
              const data = snapshot.val();

              const number = data ? +data[UID].on - 3 : 1;

              firebase.database().ref(`ifOnDelivery/${UID}`).set({
                on: number,
              });
            });

            viewOnDelivery();
          }, count * 4);

          setTimeout(() => {
            event.innerHTML = "";
            var moneyRef = database.ref(`money/${UID}`);
            moneyRef.once("value").then((snapshot) => {
              const data = snapshot.val();
              if (!data) {
                firebase.database().ref(`money/${UID}`).set({
                  payed: +sum,
                });
              } else {
                let newPayed = +data.payed + +sum;

                database.ref(`money/${UID}`).update({
                  payed: newPayed,
                });
              }
            });

            var totalRef = database.ref(`totalMoney`);
            totalRef.once("value").then((snapshot) => {
              const data = snapshot.val();
              if (!data) {
                firebase.database().ref("totalMoney").set({
                  earned: +sum,
                });
              } else {
                let newEarned = +data.earned + +sum;

                database.ref(`totalMoney`).update({
                  earned: newEarned,
                });
              }
            });






            var starCountRef = firebase.database().ref(`discount/${UID}`);

            starCountRef.once("value").then((snapshot) => {
              const startCount = snapshot.val() ? snapshot.val().length : 0;

              for (let index = +indexDisc; index < indexDisc + 3; index++) {
                let goodRef = database.ref(`goods/${index}`);
                goodRef.once("value").then((snapshot) => {
                  const data = snapshot.val();


                  const arrayPosition = startCount + (index - indexDisc);

                  database.ref(`discount/${UID}/${arrayPosition}`).set({
                    name: data.name,
                    price: +data.price * 0.8,
                    quantity: 1,
                    image: data.image,
                    userName,
                    type,
                    date: new Date().toLocaleDateString(),
                    time: new Date().toLocaleTimeString("en-us", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                  });
                });
              }
            });

            var totalDiscRef = firebase.database().ref(`totalDiscount`);

            totalDiscRef.once("value").then((snapshot) => {
              const startCount = snapshot.val() ? snapshot.val().length : 0;

              for (let index = indexDisc; index < indexDisc + 3; index++) {
                database
                  .ref(`goods/${index}`)
                  .once("value")
                  .then((goodSnapshot) => {
                    const data = goodSnapshot.val();

                    const arrayPosition = startCount + (index - indexDisc);

                    database.ref(`totalDiscount/${arrayPosition}`).set({
                      name: data.name,
                      price: +data.price * 0.8,
                      quantity: 1,
                      image: data.image,
                      user: userName,
                      type: type,
                      date: new Date().toLocaleDateString(),
                      time: new Date().toLocaleTimeString("en-us", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }),
                    });
                  });
              }
            });

            for (let index = indexDisc; index < indexDisc + 3; index++) {
              database
                .ref(`goods/${index}`)
                .once("value")
                .then((goodSnapshot) => {
                  const product = goodSnapshot.val();

                  database
                    .ref(`carts/${UID}`)
                    .once("value")
                    .then((snapshot) => {
                      const cartData = snapshot.val() || [];

                      const findCart = cartData.findIndex(
                        (member) =>
                          member &&
                          member.second === product.name &&
                          member.first === product.image
                      );

                      if (findCart !== -1) {
                        const cartItem = cartData[findCart];
                        let updated = {};

                        if (+cartItem.stock === +cartItem.bought) {
                          updated = {
                            bought: +cartItem.bought - 1,
                            stock: +cartItem.stock - 1,
                          };
                        } else {
                          updated = {
                            stock: +cartItem.stock - 1,
                          };
                        }

                        firebase
                          .database()
                          .ref(`carts/${UID}/${findCart}`)
                          .update(updated)
                          .then(() => {
                            dispCart();
                          });
                      }
                    });
                });
            }

            firebase.database().ref(`checkDisc/${UID}/0`).set({
              state: true,
            });

            document.getElementById("checker").style.display = "none";

            document.getElementById("discount").style.left = "100%";

            viewDelivered();



            receipt.style.left = 0;
            receipt.innerHTML = `<h1>Receipt</h1>
                        <span
                            onclick="backRep()"
                            class="winners"
                            style="
                              display: flex;
                              width: 35px;
                              height: 35px;
                              border-radius: 50%;
                              align-items: center;
                              justify-content: center;
                            "
                        >
                           <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="white"
                >
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
                        </span>
                        <div class="receipt-body">
                            <div class="receipt-head">
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />
                                <img src="pack.png" alt="" />

                                <div class="amount-rec">
                                    <h2>₦${sum.toLocaleString()}</h2>
                                </div>
                            </div>
                            <div class="receipt-details">
                                <div class="each">
                                    <h3>Name</h3>
                                    <b>${userName}</b>
                                </div>

                                <div class="each">
                                    <h3>Product</h3>
                                    <b>3 Products In Bulk</b>
                                </div>

                                <div class="each">
                                    <h3>Product Quantity</h3>
                                    <b>3</b>
                                </div>

                                <div class="each">
                        <h3>Type</h3>
                        <b>${type}</b>
                      </div>

                                <div class="each">
                                    <h3>Time</h3>
                                    <b>${statement.toLocaleTimeString("en-us", {
              hour: "2-digit",
              minute: "2-digit",
            })} - ${currentTime.toLocaleTimeString(
              "en-us",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}</b>
                                </div>

                                <div class="each">
                                    <h3>Date</h3>
                                    <b>${currentTime.toLocaleDateString()}</b>
                                </div>

                                <div class="each">
                                    <h3>Status</h3>
                                    <b>Successful</b>
                                </div>

                                <div class="each">
                                    <h3>Provider</h3>
                                    <b>Sparkle Tech</b>
                                </div>
                            </div>
                        </div>`;
            product();
            read.style.width = 0;
            read.style.transition = "all 3s linear"
            document.querySelector(".alert").style.top = "10px";
            document.querySelector(".small").innerHTML = "Delivery Successful";
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

            setTimeout(() => {
              for (let index = indexDisc; index < indexDisc + 3; index++) {
                let goodRef = database.ref(`goods/${index}`);
                goodRef.once("value").then((snapshot) => {
                  const data = snapshot.val();

                  let newSold = +data.sold + 1;

                  database
                    .ref(`goods/${index}`)
                    .update({
                      sold: newSold,
                      stock: +data.stock - 1,
                    })
                    .then(() => {
                      product();
                    })
                    .catch((error) => {
                      alert(error.message);
                    });
                });
              }
            }, 2000);
          }, count * 4 + 3000);
        },
        onClose: () => {
          read.style.width = 0;
          read.style.transition = "all 3s linear"
          document.querySelector(".alert").style.top = "10px";
          document.querySelector(".small").innerHTML =
            "Transaction was not completed.";
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
        },
        onError: (error) => {
          alert(`Transaction failed: ${error.message}`);
        },
      });

      handler.openIframe();
    });
  }, 2500);
}

function animation() {
  const hist = document.querySelectorAll(".histo");
  const set = document.querySelectorAll(".set-box");
  const bottom = document.querySelector(".bottom-set");
  const right = document.querySelector(".right-set");
  const recent = document.querySelector(".recent-orders");
  const acti = document.querySelector(".active");
  const products = document.querySelectorAll(".each-products");
  const setEach = document.querySelectorAll(".set-each");
  const box = document.querySelectorAll(".choice-box");
  const topBox = document.querySelector(".top-box");

  set.forEach((member) => {
    const lastest = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          entry[0].target.classList.add("flown");
        } else {
          entry[0].target.classList.remove("flown");
        }
      },
      {
        threshold: 0.3,
      }
    );

    lastest.observe(member);
  });

  const observer = new IntersectionObserver(
    (entry) => {
      if (entry[0].isIntersecting) {
        entry[0].target.classList.add("flown");
      } else {
        entry[0].target.classList.remove("flown");
      }
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(right);

  hist.forEach((member) => {
    const flast = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          entry[0].target.style.opacity = 1;
          entry[0].target.style.transform = "translateY(0)";
        } else {
          entry[0].target.style.opacity = 0;
          entry[0].target.style.transform = "translateY(30px)";
        }
      },
      {
        threshold: 0.2,
      }
    );

    flast.observe(member);
  });

  setEach.forEach((member) => {
    const flast = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          entry[0].target.style.opacity = 1;
          entry[0].target.style.transform = "translateY(0)";
        } else {
          entry[0].target.style.opacity = 0;
          entry[0].target.style.transform = "translateY(30px)";
        }
      },
      {
        threshold: 0.4,
      }
    );

    flast.observe(member);
  });

  box.forEach((member) => {
    const flast = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          entry[0].target.style.opacity = 1;
          entry[0].target.style.transform = "translateY(0)";
        } else {
          entry[0].target.style.opacity = 0;
          entry[0].target.style.transform = "translateY(30px)";
        }
      },
      {
        threshold: 0.4,
      }
    );

    flast.observe(member);
  });

  const float = new IntersectionObserver(
    (entry) => {
      if (entry[0].isIntersecting) {
        entry[0].target.classList.add("flown");
      } else {
        entry[0].target.classList.remove("flown");
      }
    },
    {
      threshold: 0.7,
    }
  );

  float.observe(bottom);

  const active = new IntersectionObserver(
    (entry) => {
      if (entry[0].isIntersecting) {
        entry[0].target.classList.add("flown");
      } else {
        entry[0].target.classList.remove("flown");
      }
    },
    {
      threshold: 0.7,
    }
  );

  active.observe(acti);

  const activeness = new IntersectionObserver(
    (entry) => {
      if (entry[0].isIntersecting) {
        entry[0].target.classList.add("flown");
      } else {
        entry[0].target.classList.remove("flown");
      }
    },
    {
      threshold: 0.7,
    }
  );

  activeness.observe(recent);

  const amala = new IntersectionObserver(
    (entry) => {
      if (entry[0].isIntersecting) {
        entry[0].target.classList.add("flown");
      } else {
        entry[0].target.classList.remove("flown");
      }
    },
    {
      threshold: 0.7,
    }
  );

  amala.observe(topBox);

  products.forEach((member) => {
    const firstObserve = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          entry[0].target.classList.add("flown");
        } else {
          entry[0].target.classList.remove("flown");
        }
      },
      {
        threshold: 0.3,
      }
    );

    firstObserve.observe(member);
  });
}

function showing(params) {
  const search = params.value.trim().toLowerCase();
  var starCountRef = database.ref("goods/");
  const productHome = document.querySelector(".products");
  starCountRef.on("value", (snapshot) => {
    const data = snapshot.val() ? snapshot.val() : [];
    const newArr = data.filter(
      (member) =>
        member.name.toLowerCase().includes(search) ||
        String(member.price).includes(search) ||
        member.description.toLowerCase().includes(search) ||
        member.category.toLowerCase().includes(search)
    );



    productHome.innerHTML = "";
    if (newArr.length === 0) {
      productHome.innerHTML = `<div class="not">Product does not exist</div>`;
      return;
    }
    newArr.forEach(member => {
      const index = data.indexOf(member)

      if (member.stock > 0) {
        productHome.innerHTML += `<div class="each-products">
        <div class="image-part">
          <img src="${member.image}" alt="">
        </div>
        <div class="text-part">
            <b>Name: ${member.name}</b>
            <b>Category: ${member.category}</b>

            <b>Price: ₦${member.price.toLocaleString()}</b>


        </div>
        <button onclick="det(${index})">Full Details / Purchase</button>
        </div>`;
      }
    });

    animation();
  });
}

function setChanges(params) {
  params.innerHTML = `<div class="roller"></div>`;
  params.disabled = true;

  setTimeout(() => {
    params.innerHTML = `Set Changes`;
    params.disabled = false;
    const user = firebase.auth().currentUser;

    const name = document.getElementById("setName").value.trim();
    const email = document.getElementById("setEmail").value.trim();
    const pass = document.getElementById("setPass").value.trim();

    if (!name || !email || !pass) {
      read.style.width = 0;
      read.style.transition = "all 3s linear"
      document.querySelector(".alert").style.top = "10px";
      document.querySelector(".small").innerHTML = "Please fill the fields";
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
      return;
    }

    const newName = name
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ");
    if (user) {
      if (user.email !== email) {
        user
          .verifyBeforeUpdateEmail(email)
          .then(() => {
            read.style.width = 0;
            read.style.transition = "all 3s linear"
            document.querySelector(".alert").style.top = "10px";
            document.querySelector(".small").innerHTML =
              "Verification link has been sent for confirmation";
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
            updateRest();
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        updateRest();
        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML = "Update Successful!";
        document.getElementById("audio").play();
        setTimeout(() => {
          document.getElementById("audio").pause();
        }, 2000);
        setTimeout(() => {
          document.querySelector(".alert").style.top = "-150px";
          read.style.width = "100%";
          read.style.transition = "none"
        }, 3100);
      }
    }

    async function updateRest() {

      // 1. Update Password if changed
      if (pass.length > 7) {
        await user.updatePassword(pass);
      } else {
        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML = "Password was not updated";
        document.getElementById("audio").play();
        setTimeout(() => {
          document.getElementById("audio").pause();
        }, 2000);
        setTimeout(() => {
          document.querySelector(".alert").style.top = "-150px";
          read.style.width = "100%";
          read.style.transition = "none"
        }, 3100);
      }

      await user.updateProfile({ displayName: newName });

      await firebase.database().ref(`users/${user.uid}`).update({
        name: newName,
        email: email,
      });

      location.href = "form.html";

    }
  }, 2000);
}

let carLeft;
let carTop;
let tops;
let bottoms;
let value;
let pro;
let topvalue;

if (window.innerWidth < 451) {
  carLeft = [17, 90, 165, 240];
  carTop = 380;
  tops = 28;
  value = 38;
  bottoms = 380;
  pro = 350;
  topvalue = 380;
} else {
  carLeft = [23, 100, 185, 270];
  carTop = 440;
  tops = 20;
  value = 60;
  bottoms = 440;
  pro = 300;
  topvalue = 440;
}
let carNumber = 0;
let carSpawner;
let carScore;
let userPosInterval;
let user = document.getElementById("user");

user.style.left = `${carLeft[carNumber]}px`;
user.style.top = `${carTop}px`;

function startGame() {
  carNumber = 0;
  carTop = document.querySelector(".car-store").replaceChildren();
  document.querySelector(".scored").innerHTML = 0;

  document.querySelector(".start-game").style.transform = "scale(0)";

  carSpawner = setInterval(produceCar, pro);

  carScore = setInterval(() => {
    document.querySelector(".scored").innerHTML++;
  }, 100);

  userPosInterval = setInterval(() => {
    if (carTop >= bottoms) carTop = bottoms;
    if (carTop <= tops) carTop = tops;
  }, 200);

  document.getElementById("user").style.top = `${topvalue}px`;
  document.getElementById("user").style.left = `${carLeft[carNumber]}px`;
  checkHit();
}

function produceCar() {
  const random = Math.floor(Math.random() * carLeft.length);
  const car = document.createElement("img");
  car.src = "red.png";
  car.id = "anime";
  car.className = "pursue";
  car.classList.add("opponent");
  car.style.left = `${carLeft[random]}px`;
  car.addEventListener("animationend", () => {
    car.remove();
  });
  document.querySelector(".car-store").appendChild(car);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    if (carNumber === carLeft.length - 1) {
      carNumber = carLeft.length - 1;
    } else {
      carNumber++;
    }

    let user = document.getElementById("user");

    user.style.left = `${carLeft[carNumber]}px`;
  }
});

function right() {
  if (carNumber === carLeft.length - 1) {
    carNumber = carLeft.length - 1;
  } else {
    carNumber++;
  }
  let user = document.getElementById("user");

  user.style.left = `${carLeft[carNumber]}px`;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    if (carNumber === 0) {
      carNumber = 0;
    } else {
      carNumber--;
    }

    let user = document.getElementById("user");

    user.style.left = `${carLeft[carNumber]}px`;
  }
});
function left() {
  if (carNumber === 0) {
    carNumber = 0;
  } else {
    carNumber--;
  }
  let user = document.getElementById("user");

  user.style.left = `${carLeft[carNumber]}px`;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") {
    let user = document.getElementById("user");

    if (carTop <= tops) {
      carTop = tops;
    } else {
      carTop = user.offsetTop - value;
    }

    user.style.top = `${carTop}px`;
  }
});
function up() {
  let user = document.getElementById("user");

  if (carTop <= tops) {
    carTop = tops;
  } else {
    carTop = user.offsetTop - value;
  }

  user.style.top = `${carTop}px`;
}
function down() {
  if (carTop >= bottoms) {
    carTop = bottoms;
  } else {
    carTop = user.offsetTop + value;
  }

  user.style.top = `${carTop}px`;
}
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    let user = document.getElementById("user");

    if (carTop >= bottoms) {
      carTop = bottoms;
    } else {
      carTop = user.offsetTop + value;
    }

    user.style.top = `${carTop}px`;
  }
});

let newInterval;

function checkHit() {
  const userElement = document.getElementById("user");
  newInterval = setInterval(() => {
    const opponents = document.querySelectorAll(".pursue");
    const userRect = userElement.getBoundingClientRect();

    opponents.forEach((enemy) => {
      const oppRect = enemy.getBoundingClientRect();
      if (
        userRect.left < oppRect.right &&
        userRect.right > oppRect.left &&
        userRect.top < oppRect.bottom &&
        userRect.bottom > oppRect.top
      ) {
        stopAllAnimations();
        high();
      }
    });
  }, 100);
}

function stopAllAnimations() {
  clearInterval(carSpawner);
  clearInterval(newInterval);
  clearInterval(carScore);
  clearInterval(userPosInterval);

  const allEnemies = document.querySelectorAll(".pursue");
  allEnemies.forEach((car) => {
    car.classList.remove("opponent");
    car.style.animationPlayState = "paused";
  });

  const finalScore = parseInt(document.querySelector(".scored").innerHTML);
  const starCountRef = firebase.database().ref(`score/${UID}`);

  starCountRef.once("value").then((snapshot) => {
    const data = snapshot.val() ? snapshot.val().score : 0;
    if (data === 0 || finalScore > data) {
      starCountRef.set({
        score: finalScore,
      });
    }
    if (finalScore > data) {
      document.querySelector(".start-game").innerHTML = `<div class="hooray">
            <span class="first-h">⭐</span>
            <span class="second-h">⭐</span>
            <span class="third-h">⭐</span>
            <h3 class="p-a">Your New High Score Is ${finalScore}</h3>
          </div>`;

      setTimeout(() => {
        document.querySelector(".first-h").style.opacity = 1;
      }, 300);
      setTimeout(() => {
        document.querySelector(".second-h").style.opacity = 1;
      }, 2400);
      setTimeout(() => {
        document.querySelector(".third-h").style.opacity = 1;
      }, 4300);
      setTimeout(() => {
        document.querySelector(".p-a").style.opacity = 1;
      }, 5000);

      setTimeout(() => {
        document.querySelector(".start-game").innerHTML = `<div class="score">
        <h2>You Scored: ${finalScore}</h2>
        <button onclick="startGame()">Start Again</button>
      </div>`;
      }, 6000);
    } else {
      document.querySelector(".start-game").innerHTML = `<div class="score">
        <h2>You Scored: ${finalScore}</h2>
        <button onclick="startGame()">Start Again</button>
      </div>`;
    }
  });

  document.querySelector(".start-game").style.transform = "scale(1)";
}

function high() {
  const starCountRef = firebase.database().ref(`score/`);

  starCountRef.once("value").then((snapshot) => {
    const data = snapshot.val() ? snapshot.val()[UID] : null;
    document.querySelector(".high-s").innerHTML =
      data && data.score >= 0 ? `High Score: ${data.score}` : `High Score: 0`;
  });
}

let state = true;
function openMessage() {
  if (state === true) {
    document.querySelector(".message-history").classList.add("renews");
    document.querySelector(
      ".message-nav"
    ).innerHTML = `<span onclick="openMessage()" style="cursor: pointer" id="left-icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z"/></svg>
        </span>`;
    document.querySelector(".message-nav").innerHTML += `<h2>My Chat Box</h2>`;
    document.querySelector(".message-body").innerHTML = `<div class="loading">
            <p>Loading</p>
          </div>`;
    state = false;
  } else {
    document.querySelector(".message-history").classList.remove("renews");
    document.querySelector(".message-body").innerHTML = ``;
    document.querySelector(
      ".message-nav"
    ).innerHTML = `<span onclick="openMessage()" style="cursor: pointer" id="left-icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2e73b8"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
        </span>`;
    state = true;
  }

  dispMessage();
}

function dispMessage() {
  const messageBody = document.querySelector(".message-body");
  var starCountRef = firebase.database().ref(`chat`);
  starCountRef.on("value", (snapshot) => {
    const data = snapshot.val() || [];

    if (data.length === 0) {
      document.querySelector(".message-body").innerHTML = `<div class="loading">
          <p>No Message Yet</p>
        </div>`;
      return;
    }
    document.querySelector(".message-body").innerHTML = ``;
    data.forEach((member, index) => {
      const truth = member.uid === UID;
      const deleted = member.deleted !== true;
      const style = truth && deleted ? "flex" : "none";
      const check = truth ? "my-message disp" : "not-message disp";
      document.querySelector(
        ".message-body"
      ).innerHTML += `<div ondblclick="editMessage(${member.deleted
      }, ${truth}, '${member.message}', ${index})" class="${check}">
          <b>${member.name}</b>
          <h4>${member.deleted ? "This message has been deleted" : member.message
        }</h4>
          <b>${member.time}</b>
          <span onclick="delMessage(${index})" style="display: ${style}" class="message-icon">
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="black"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </span>
        </div>`;
    });
    // start()

    notifications();
    messageBody.scrollTop = messageBody.scrollHeight;
  });
}
start();
function start() {
  newInterval = setInterval(newMessage, 5000);
}
function newMessage() {
  var starCountRef = firebase.database().ref(`chat`);
  starCountRef.once("value").then((snapshot) => {
    const data = snapshot.val() || [];
    data.reverse();

    const find = data.findIndex((member) => {
      return member.uid === UID;
    });

    if (find !== -1 && find > 0) {
      document.getElementById("left-icon").innerHTML = `${find}`;
      document.getElementById("left-icon").style.color = "#0f559cff";
      document.getElementById("left-icon").style.fontSize = "18px";
      document.getElementById("left-icon").style.fontWeight = "bold";
    } else if (find == -1 && data.length > 0) {
      document.getElementById("left-icon").innerHTML = `${data.length}`;
      document.getElementById("left-icon").style.color = "#0f559cff";
      document.getElementById("left-icon").style.fontSize = "18px";
      document.getElementById("left-icon").style.fontWeight = "bold";
    } else {
      if (state === false) {
        document.getElementById(
          "left-icon"
        ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z"/></svg>`;
      } else {
        document.getElementById("left-icon").innerHTML = `<svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#2e73b8"
          >
            <path
              d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"
            />
          </svg>`;
      }
    }
  });
}

function notifications() {
  var starCountRef = firebase.database().ref(`chat`);
  starCountRef.once("value").then((snapshot) => {
    const data = snapshot.val() || [];
    data.reverse();

    const find = data.findIndex((member) => {
      return member.uid === UID;
    });

    if (find !== -1 && find > 0) {
      document.querySelector(".notification").style.top = "10px";
      document.getElementById("audio").play();
      document.getElementById("name-send").innerHTML = data[0].name.slice(0, 1);
      document.getElementById("name-sends").innerHTML = data[0].name;
      document.getElementById("send-message").innerHTML = data[0].message;

      setTimeout(() => {
        document.getElementById("audio").pause();
        document.getElementById('audio').currentTime = 0
      }, 1500);
      setTimeout(() => {
        document.querySelector(".notification").style.top = "-150px";
        document.getElementById("name-send").innerHTML = "";
        document.getElementById("name-sends").innerHTML = "";
        document.getElementById("send-message").innerHTML = "";
      }, 3100);
      return;
    }

    if (find == -1 && data.length > 0) {
      document.querySelector(".notification").style.top = "10px";
      document.getElementById("audio").play();
      document.getElementById("name-send").innerHTML = data[0].name.slice(0, 1);
      document.getElementById("name-sends").innerHTML = data[0].name;
      document.getElementById("send-message").innerHTML = data[0].message;

      setTimeout(() => {
        document.getElementById("audio").pause();
      }, 1500);
      setTimeout(() => {
        document.querySelector(".notification").style.top = "-150px";
        document.getElementById("name-send").innerHTML = "";
        document.getElementById("name-sends").innerHTML = "";
        document.getElementById("send-message").innerHTML = "";
      }, 3100);
    }
  });
}

function sendMessage(params) {
  params.disabled = true;
  params.innerHTML = `<span class="roller"></span>`;
  const messageInput = document.getElementById("messageInput").value.trim();
  setTimeout(() => {
    if (!messageInput) {
      params.disabled = false;
      params.innerHTML = `<svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 -960 960 960"
            width="18px"
            fill="white"
          >
            <path
              d="m226-559 78 33q14-28 29-54t33-52l-56-11-84 84Zm142 83 114 113q42-16 90-49t90-75q70-70 109.5-155.5T806-800q-72-5-158 34.5T492-656q-42 42-75 90t-49 90Zm178-65q-23-23-23-56.5t23-56.5q23-23 57-23t57 23q23 23 23 56.5T660-541q-23 23-57 23t-57-23Zm19 321 84-84-11-56q-26 18-52 32.5T532-299l33 79Zm313-653q19 121-23.5 235.5T708-419l20 99q4 20-2 39t-20 33L538-80l-84-197-171-171-197-84 167-168q14-14 33.5-20t39.5-2l99 20q104-104 218-147t235-24ZM157-321q35-35 85.5-35.5T328-322q35 35 34.5 85.5T327-151q-25 25-83.5 43T82-76q14-103 32-161.5t43-83.5Zm57 56q-10 10-20 36.5T180-175q27-4 53.5-13.5T270-208q12-12 13-29t-11-29q-12-12-29-11.5T214-265Z"
            />
          </svg>`;
      read.style.width = 0;
      read.style.transition = "all 3s linear"
      document.querySelector(".alert").style.top = "10px";
      document.querySelector(".small").innerHTML =
        "Please type a message";
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
      return;
    }

    var starCountRef = firebase.database().ref("chat");
    starCountRef.once("value").then((snapshot) => {
      const data = snapshot.val() ? snapshot.val().length : 0;

      firebase
        .database()
        .ref(`chat/${data}`)
        .set({
          name: userName,
          uid: UID,
          deleted: false,
          message: messageInput,
          time: new Date().toLocaleTimeString("en-us", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })
        .then(() => {
          document.getElementById("messageInput").value = "";
          params.disabled = false;
          params.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="white"><path d="m226-559 78 33q14-28 29-54t33-52l-56-11-84 84Zm142 83 114 113q42-16 90-49t90-75q70-70 109.5-155.5T806-800q-72-5-158 34.5T492-656q-42 42-75 90t-49 90Zm178-65q-23-23-23-56.5t23-56.5q23-23 57-23t57 23q23 23 23 56.5T660-541q-23 23-57 23t-57-23Zm19 321 84-84-11-56q-26 18-52 32.5T532-299l33 79Zm313-653q19 121-23.5 235.5T708-419l20 99q4 20-2 39t-20 33L538-80l-84-197-171-171-197-84 167-168q14-14 33.5-20t39.5-2l99 20q104-104 218-147t235-24ZM157-321q35-35 85.5-35.5T328-322q35 35 34.5 85.5T327-151q-25 25-83.5 43T82-76q14-103 32-161.5t43-83.5Zm57 56q-10 10-20 36.5T180-175q27-4 53.5-13.5T270-208q12-12 13-29t-11-29q-12-12-29-11.5T214-265Z"/></svg>`;
          dispMessage();
        });
    });
  }, 1300);
}

function editMessage(deleted, params, message, index) {
  if (!params) {
    read.style.width = 0;
    read.style.transition = "all 3s linear"
    document.querySelector(".alert").style.top = "10px";
    document.querySelector(".small").innerHTML =
      "You can only edit your messages";
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
    return;
  }

  if (deleted) {
    read.style.width = 0;
    document.querySelector(".alert").style.top = "10px";
    document.querySelector(".small").innerHTML =
      "Cannot edit a deleted message";
    document.getElementById("audio").play();
    setTimeout(() => {
      document.getElementById("audio").pause();
    }, 2000);
    setTimeout(() => {
      document.querySelector(".alert").style.top = "-150px";
      read.style.width = "100%";
    }, 3100);
    return;
  }

  const newMessages = prompt("Edit your message:", message);
  if (newMessages !== null && newMessages.trim() !== "") {
    firebase
      .database()
      .ref(`chat/${index}`)
      .update({
        message: newMessages.trim(),
      })
      .then(() => {
        dispMessage();
      });
  }
}

function delMessage(index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this message?"
  );
  if (confirmDelete) {
    firebase
      .database()
      .ref(`chat/${index}`)
      .update({
        deleted: true,
      })
      .then(() => {
        dispMessage();
      });
  }
}

function logOut() {
  let conf = confirm("Are you sure you want to log out?");

  if (conf) {
    auth
      .signOut()
      .then(() => {
        location.href = "form.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

function deActivate(params) {
  params.innerHTML = `<div class="roller"></div>`;
  params.disabled = true;

  setTimeout(async () => {
    const user = firebase.auth().currentUser;
    if (!user) return;
    const confirmAction = confirm(
      "Are you sure? This will permanently delete your account."
    );

    if (confirmAction) {
      try {
        await firebase.database().ref(`users/${user.uid}`).remove();

        // 2. Delete the user's auth account
        await user.delete();

        read.style.width = 0;
        read.style.transition = "all 3s linear"
        document.querySelector(".alert").style.top = "10px";
        document.querySelector(".small").innerHTML =
          "Account deactivated successfully";
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
        window.location.href = "form.html"; // Redirect to login
      } catch (error) {
        console.error(error);
        if (error.code === "auth/requires-recent-login") {
          alert(
            "For security, please log out and log back in before deleting your account."
          );
        } else {
          alert("Error: " + error.message);
        }
      }
    }
    params.innerHTML = `Deactivate Account`;
    params.disabled = false;
  }, 1300);
}
