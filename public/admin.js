let push = document.getElementById("pushPick");
let pushed;
let userUid;
let productHome = document.querySelector(".products");
let number = document.getElementById("users");
let available = document.getElementById("products");
let order = document.getElementById("order");
let money = document.getElementById("money");
let navName = document.getElementById("nav-name");
let displayResult = document.querySelector(".display-result");
let goodIndex;
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
const database = firebase.database();
let user = auth.currentUser;



function backs() {
    main.style.left = 0;
}
function goBack() {
    main.style.left = "100%";
}

var starCountRef = firebase.database().ref("users");
starCountRef.on("value", (snapshot) => {
    const data = snapshot.val();
    let state = data ? Object.keys(data).length : 0;

    number.innerHTML = state;
});

var starCountRef = firebase.database().ref("goods");
starCountRef.on("value", (snapshot) => {
    const data = snapshot.val();
    let state = data ? Object.keys(data).length : 0;

    available.innerHTML = state;
});

var starCountRef = firebase.database().ref("totalOrder");
starCountRef.on("value", (snapshot) => {
    const data = snapshot.val();
    let state = data ? Object.keys(data).length : 0;

    order.innerHTML = state;
});

var starCountRef = firebase.database().ref("totalMoney");
starCountRef.on("value", (snapshot) => {
    const data = snapshot.val();
    let state = data ? data.earned : 0;

    money.innerHTML = `₦ ${state.toLocaleString()}`;
});







function checkUserAuth() {
    const navPic = document.getElementById('navPic')
    auth.onAuthStateChanged((user) => {
        if (user) {

            if (user.email != "adebayoq123456@gmail.com") {
                location.href = "dashboard.html"
                return
            }
            userName = user.displayName;
            userUid = user.uid;

            navName.innerHTML = user.displayName;
            navPic.innerHTML = user.displayName.slice(0, 1);
            animation()
            dispMessage();






            var userRef = firebase.database().ref("users");
            userRef.on("value", (snapshot) => {
                const data = snapshot.val() || {};
                const state = Object.values(data)



                if (state.length === 0) {
                    displayResult.innerHTML = "<h3 class='empty-car'>No Users Available</h3>";
                    return;
                }

                displayResult.innerHTML = "";

                state.forEach((member, index) => {
                    displayResult.innerHTML += `<div class="display">
              <div class="display-image">${member.name.slice(0, 1)}</div>
              <b class="display-name">${member.name}</b>
              <b class="display-email">${member.email}</b>
            </div>`;
                });
            });

        } else {
            location.href = "form.html";
        }
    });
}

checkUserAuth();

const products = [
    {
        name: "One Plus 15",
        category: "Phones",
        price: 500000,
        rating: 4.6,
        unit: "Piece",
        description:
            "Affordable Android smartphone with 16GB RAM and 1TB storage.",
        image:
            "https://i.pinimg.com/736x/e3/e7/ff/e3e7ff1f17af2e5227e0c52bcf7eab05.jpg",
        stock: 12,
        sold: 0,
    },
    {
        name: "IPhone 12",
        category: "Phones",
        price: 450000,
        rating: 4.8,
        unit: "Piece",
        description: "Premium Apple smartphone with excellent performance.",
        image:
            "https://i.pinimg.com/736x/af/a5/2d/afa52dc8f0483bf95187ea69e62bd352.jpg",
        stock: 8,
        sold: 0,
    },
    {
        name: "Infinix Hot 40",
        category: "Phones",
        price: 145000,
        rating: 4.7,
        unit: "Piece",
        description: "Powerful Infinix device with long battery life.",
        image:
            "https://i.pinimg.com/1200x/ed/7d/f0/ed7df0115349c2845f69ba7cdda09fe7.jpg",
        stock: 15,
        sold: 0,
    },
    {
        name: "Electric Blender",
        category: "Home Appliances",
        price: 12500,
        rating: 4.6,
        unit: "Piece",
        description: "High-speed blender suitable for smoothies and kitchen use.",
        image:
            "https://i.pinimg.com/736x/4c/f8/75/4cf875dc7327f29853a9301be6ffa01c.jpg",
        stock: 15,
        sold: 0,
    },
    {
        name: "Steam Iron",
        category: "Home Appliances",
        price: 8500,
        rating: 4.4,
        unit: "Piece",
        description: "Durable steam iron with non-stick soleplate.",
        image:
            "https://i.pinimg.com/1200x/86/94/62/8694627bb43bcd802acb7f262bf3deb2.jpg",
        stock: 9,
        sold: 0,
    },
    {
        name: "Standing Fan",
        category: "Cooling Devices",
        price: 18500,
        rating: 4.5,
        unit: "Piece",
        description: "Powerful standing fan with adjustable speed.",
        image:
            "https://i.pinimg.com/736x/d1/cf/78/d1cf7884737d2a0af1985244efbd1061.jpg",
        stock: 10,
        sold: 0,
    },
    {
        name: "Refrigerator 120L",
        category: "Cooling Devices",
        price: 145000,
        rating: 4.7,
        unit: "Piece",
        description: "Energy-efficient refrigerator with fast cooling.",
        image:
            "https://i.pinimg.com/1200x/60/5b/9a/605b9a9dc7bcdc5a28ad1c98583c1d34.jpg",
        stock: 6,
        sold: 0,
    },
    {
        name: "Chest Freezer 292L",
        category: "Cooling Devices",
        price: 265000,
        rating: 4.8,
        unit: "Piece",
        description: "Large capacity chest freezer ideal for home and business.",
        image:
            "https://i.pinimg.com/1200x/ee/91/a4/ee91a439a8e5664052f360d873f6605b.jpg",
        stock: 7,
        sold: 0,
    },
    {
        name: "Microwave Oven",
        category: "Home Appliances",
        price: 38500,
        rating: 4.6,
        unit: "Piece",
        description: "Versatile microwave oven for quick heating.",
        image:
            "https://i.pinimg.com/736x/a1/fc/52/a1fc52f45f70012e84f39cd9d1949bc9.jpg",
        stock: 7,
        sold: 0,
    },
    {
        name: "Cold Water Dispenser",
        category: "Retail",
        price: 44000,
        rating: 4.6,
        unit: "Piece",
        description: "Cold water dispenser ideal for homes and offices.",
        image:
            "https://i.pinimg.com/736x/73/a6/ca/73a6ca271a3d7a74b248e6c638f71dd5.jpg",
        stock: 8,
        sold: 0,
    },
    {
        name: "Hot & Cold Dispenser",
        category: "Retail",
        price: 51000,
        rating: 4.7,
        unit: "Piece",
        description: "Dispenser with both hot and cold water functions.",
        image:
            "https://i.pinimg.com/736x/41/7b/a2/417ba23cf9165d59166cfd3ba5d59f49.jpg",
        stock: 6,
        sold: 0,
    },
    {
        name: "Standing Water Cooler",
        category: "Retail",
        price: 65000,
        rating: 4.8,
        unit: "Piece",
        description: "Tall standing water cooler for continuous supply.",
        image:
            "https://i.pinimg.com/1200x/31/2b/48/312b4817f72a8b77daa2294b14a163dd.jpg",
        stock: 10,
        sold: 0,
    },
    {
        name: "LED Smart TV 43-inch",
        category: "Electronics",
        price: 185000,
        rating: 4.7,
        unit: "Piece",
        description: "Smart TV with vibrant display and streaming apps.",
        image:
            "https://i.pinimg.com/736x/a8/83/ba/a883ba92231b6a4a4b2088394bbf50e9.jpg",
        stock: 9,
        sold: 0,
    },
    {
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 7500,
        rating: 4.4,
        unit: "Piece",
        description: "Portable Bluetooth speaker with deep bass.",
        image:
            "https://i.pinimg.com/1200x/3d/be/a1/3dbea142088441f9a36bb0b528635ad8.jpg",
        stock: 14,
        sold: 0,
    },
    {
        name: "Laptop (Core i7)",
        category: "Computers",
        price: 600000,
        rating: 4.6,
        unit: "Piece",
        description: "Fast and reliable Core i5 laptop for work and school.",
        image:
            "https://i.pinimg.com/736x/8c/33/03/8c330386311ed2adb6d44064ea2bb51d.jpg",
        stock: 9,
        sold: 0,
    },
    {
        name: "Electric Kettle",
        category: "Home Appliances",
        price: 6500,
        rating: 4.3,
        unit: "Piece",
        description: "Automatic electric kettle with fast boil.",
        image:
            "https://i.pinimg.com/736x/ef/8a/f2/ef8af24dae7b44fad8839261b7c2312d.jpg",
        stock: 13,
        sold: 0,
    },
    {
        name: "Air Fryer",
        category: "Home Appliances",
        price: 28500,
        rating: 4.7,
        unit: "Piece",
        description: "Healthy air fryer for oil-free cooking.",
        image:
            "https://i.pinimg.com/736x/70/8d/99/708d996077d28f71f9e08b7ab8a14ecd.jpg",
        stock: 6,
        sold: 0,
    },
    {
        name: "Extension Box (8-way)",
        category: "Accessories",
        price: 5000,
        rating: 4.5,
        unit: "Piece",
        description: "High-quality extension box with surge protection.",
        image:
            "https://i.pinimg.com/736x/d4/36/43/d436431b94d47a6d95e802c932acaf02.jpg",
        stock: 15,
        sold: 0,
    },
    {
        name: "HDMI Cable",
        category: "Accessories",
        price: 1500,
        rating: 4.3,
        unit: "Piece",
        description: "High-speed HDMI cable for TV and laptop connection.",
        image:
            "https://i.pinimg.com/1200x/a4/3b/17/a43b17ff3230b8c3bea2eade06f13fc9.jpg",
        stock: 12,
        sold: 0,
    },
    {
        name: "Wireless Earbuds",
        category: "Electronics",
        price: 9500,
        rating: 4.6,
        unit: "Piece",
        description: "Stereo wireless earbuds with long battery life.",
        image:
            "https://i.pinimg.com/1200x/e0/ad/3e/e0ad3ec225c1801ddbad74600ac4b87e.jpg",
        stock: 7,
        sold: 0,
    },
    {
        name: "Power Bank 20,000mAh",
        category: "Accessories",
        price: 19500,
        rating: 4.8,
        unit: "Piece",
        description: "High-capacity power bank for all devices.",
        image:
            "https://i.pinimg.com/736x/92/69/86/9269867d21c331a588a174385feea6fe.jpg",
        stock: 8,
        sold: 0,
    },
    {
        name: "Air Conditioner 1HP",
        category: "Cooling Devices",
        price: 185000,
        rating: 4.7,
        unit: "Piece",
        description: "Energy-efficient split unit AC with fast cooling.",
        image:
            "https://i.pinimg.com/1200x/46/d3/98/46d3989c874e6ecb84a17c23d8b042f2.jpg",
        stock: 4,
        sold: 0,
    },
    {
        name: "Electric Cooker",
        category: "Home Appliances",
        price: 22500,
        rating: 4.5,
        unit: "Piece",
        description: "Multi-burner electric cooker for fast meal prep.",
        image:
            "https://i.pinimg.com/736x/25/0d/e0/250de082a38ffa56866c6722cc6270e3.jpg",
        stock: 11,
        sold: 0,
    },
    {
        name: "Ceiling Fan",
        category: "Cooling Devices",
        price: 13500,
        rating: 4.4,
        unit: "Piece",
        description: "Efficient ceiling fan for homes and offices with light.",
        image:
            "https://i.pinimg.com/1200x/1f/5d/8a/1f5d8acb8a5d071b369702d79659ac63.jpg",
        stock: 9,
        sold: 0,
    },
    {
        name: "Home Theatre System",
        category: "Electronics",
        price: 55000,
        rating: 4.6,
        unit: "Piece",
        description: "Powerful home theatre system with surround sound.",
        image:
            "https://i.pinimg.com/736x/9a/5a/bb/9a5abb6ece42b81ec21e6a4009d87d31.jpg",
        stock: 5,
        sold: 0,
    },
    {
        name: "Electric Pressure Cooker",
        category: "Home Appliances",
        price: 19500,
        rating: 4.5,
        unit: "Piece",
        description: "Smart pressure cooker for fast cooking.",
        image:
            "https://i.pinimg.com/736x/54/7c/bc/547cbc6c982f2b767486c191226337b3.jpg",
        stock: 7,
        sold: 0,
    },
    {
        name: "USB Rechargeable Fan",
        category: "Cooling Devices",
        price: 6000,
        rating: 4.4,
        unit: "Piece",
        description: "Portable rechargeable fan for personal cooling.",
        image:
            "https://i.pinimg.com/736x/09/c9/73/09c973d1862d3d32a24da281cc67f28c.jpg",
        stock: 10,
        sold: 0,
    },
    {
        name: "Laptop Charger (Universal)",
        category: "Accessories",
        price: 15000,
        rating: 4.6,
        unit: "Piece",
        description: "Universal laptop charger with multiple connectors.",
        image:
            "https://i.pinimg.com/1200x/b6/16/b7/b616b7a637080e8dbc77f0a918ff21f6.jpg",
        stock: 6,
        sold: 0,
    },
    {
        name: "Smartwatch",
        category: "Electronics",
        price: 17500,
        rating: 4.6,
        unit: "Piece",
        description: "Smartwatch with fitness tracking and notifications.",
        image:
            "https://i.pinimg.com/1200x/48/50/01/485001f688319f50f32476a8d738b067.jpg",
        stock: 9,
        sold: 0,
    },
    {
        name: "Wireless Keyboard + Mouse",
        category: "Computers",
        price: 30000,
        rating: 4.5,
        unit: "Piece",
        description: "Combo keyboard and mouse for laptops and desktops.",
        image:
            "https://i.pinimg.com/736x/8d/66/95/8d6695e6768027f20f6d8ad27a934b97.jpg",
        stock: 7,
        sold: 0,
    },
    {
        name: "Gaming Laptop (RTX 4070)",
        category: "Computers",
        price: 750000,
        rating: 4.8,
        unit: "Piece",
        description: "High-performance gaming laptop with RTX graphics card.",
        image:
            "https://i.pinimg.com/736x/3d/c3/91/3dc3916071b5f72c5c2d9efaf0b50dea.jpg",
        stock: 4,
        sold: 0,
    },
    {
        name: "Smart LED Bulb",
        category: "Home Appliances",
        price: 4000,
        rating: 4.5,
        unit: "Piece",
        description: "Wi-Fi controlled smart LED bulb with color options.",
        image:
            "https://i.pinimg.com/1200x/1f/d8/f1/1fd8f1e1f3782e9c4540a6ce2ebf7fca.jpg",
        stock: 14,
        sold: 0,
    },
    {
        name: "Portable Projector",
        category: "Electronics",
        price: 225000,
        rating: 4.6,
        unit: "Piece",
        description: "Compact projector with HD display for home cinema.",
        image:
            "https://i.pinimg.com/1200x/26/02/f3/2602f314ad3cf5a3512c25d6cf5d0dc2.jpg",
        stock: 6,
        sold: 0,
    },
    {
        name: "Electric Scooter",
        category: "Transport",
        price: 250000,
        rating: 4.7,
        unit: "Piece",
        description: "Eco-friendly electric scooter with 40km range.",
        image:
            "https://i.pinimg.com/736x/0a/2a/4c/0a2a4c5cb81ed10ee583fda9e19cb84f.jpg",
        stock: 5,
        sold: 0,
    },
    {
        name: "VR Headset",
        category: "Electronics",
        price: 85000,
        rating: 4.7,
        unit: "Piece",
        description: "Immersive VR headset compatible with PC and console.",
        image:
            "https://i.pinimg.com/736x/63/9d/2e/639d2e7b5a675b43a2b0d1b66c54a7aa.jpg",
        stock: 8,
        sold: 0,
    },
    {
        name: "Smart Door Lock",
        category: "Home Appliances",
        price: 35000,
        rating: 4.5,
        unit: "Piece",
        description: "Keyless smart door lock with fingerprint access.",
        image:
            "https://i.pinimg.com/736x/d5/ae/dd/d5aedd335fc93aca54d2f573955c0e1d.jpg",
        stock: 11,
        sold: 0,
    },
    {
        name: "Bluetooth Headphones",
        category: "Electronics",
        price: 18000,
        rating: 4.6,
        unit: "Piece",
        description:
            "Wireless Bluetooth headphones with noise cancellation and long battery life.",
        image:
            "https://i.pinimg.com/736x/d7/cd/ec/d7cdec94bb1a046f03e1ac36fbd7b7f6.jpg",
        stock: 6,
        sold: 0,
    },
    {
        name: "Digital Camera",
        category: "Electronics",
        price: 155000,
        rating: 4.7,
        unit: "Piece",
        description: "DSLR camera with high resolution and lens kit.",
        image:
            "https://i.pinimg.com/1200x/13/f4/47/13f447b12d02019d1c5feeeb6165fe80.jpg",
        stock: 5,
        sold: 0,
    },
    {
        name: "Portable Solar Lantern",
        category: "Outdoor & Camping",
        price: 7500,
        rating: 4.6,
        unit: "Piece",
        description:
            "Rechargeable solar lantern, perfect for camping or emergency use.",
        image:
            "https://i.pinimg.com/736x/78/8f/26/788f265d59d38e6283af46e2ca77c278.jpg",
        stock: 12,
        sold: 0,
    },
    {
        name: "Wireless Charging Pad",
        category: "Accessories",
        price: 30000,
        rating: 4.5,
        unit: "Piece",
        description: "Fast wireless charger compatible with most smartphones.",
        image:
            "https://i.pinimg.com/1200x/b8/04/0b/b8040babc4d01b6e6553b6a5aaacfd06.jpg",
        stock: 7,
        sold: 0,
    },
];



function save() {
    database.ref("goods").once("value", (snapshot) => {
        if (!snapshot.exists()) {
            products.forEach((member, index) => {
                database.ref(`goods/${index}`).set({
                    name: member.name,
                    stock: member.stock,
                    sold: member.sold,
                    category: member.category,
                    price: member.price,
                    rating: member.rating,
                    unit: member.unit,
                    description: member.description,
                    image: member.image,
                });
            });
        }
    });
}


save();






function product() {
    var starCountRef = database.ref("goods/");
    starCountRef.on("value", (snapshot) => {
        const data = snapshot.val() ? snapshot.val() : [];

        if (data.length === 0) {
            return;
        }

        productHome.innerHTML = "";
        data.forEach((member, index) => {
            if (!member) return;
            productHome.innerHTML += `<div class="each-products" ondblclick="deleteBox(${index})">
        <div class="image-part">
          <img src="${member.image}" alt="">
        </div>
        <div class="text-part">
            <b>Name: ${member.name}</b>
            <b>Category: ${member.category}</b>

            <b>Price: ₦${member.price.toLocaleString()}</b>


        </div>
        <button onclick="det(${index})">Edit</button>
      </div>`;
        });

        const one = document.querySelectorAll(".each-products");
        one.forEach((member) => {
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
    });
}
product();

function det(params) {
    mains.style.left = "0";

    var starCountRef = database.ref("goods/");
    starCountRef.on("value", (snapshot) => {
        const data = snapshot.val()[params];
        mains.innerHTML = `<div id="preview">
    <span onclick="back()" style="display: flex; width: 35px; height: 35px; border-radius: 50%; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="white"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
      </span>
    <div class="choice-head">
      <h1>Product Details</h1>
    </div>
    <div class="top-prev">
      <div class="left-prev">
        <img onclick="document.getElementById('proInp').click()" id="proImg" src="${data.image
            }" alt="">
        <input
          id="proInp"
          type="file"
          onchange="picking(event)"
          style="display: none" />
      </div>
    <div class="right-prev">
      <div contenteditable="true" class="detail-pre">
        <b id="proName">Name: ${data.name}</b>
      </div>
      <div contenteditable="true" class="detail-pre">
        <b id="proCat">Category: ${data.category}</b>
      </div>
      <div contenteditable="true" class="detail-pre">
        <b id="proPri">Price: ₦${data.price.toLocaleString()}</b>
      </div>
      <div contenteditable="true" class="detail-pre">
        <b id="proDes">Description: ${data.description}</b>
      </div>
      <div contenteditable="true" class="detail-pre">
        <b id="proStock">Stock: ${data.stock - data.sold}</b>
      </div>
      <div contenteditable="true" class="detail-pre">
        <b id="proRat">Ratings: ${data.rating}</b>
      </div>
      <div contenteditable="true" class="detail-pre">
        <b id="proPur">Purchased: ${data.sold}</b>
      </div>
      <div contenteditable="true" class="detail-pre">
        <b id="proUnit">Unit: ${data.unit}</b>
      </div>
    </div>
    </div>
    <div class="bottom-prev">
      <button id="proBtn" onclick="addChange(${params})">Add Change</button>
    </div>
  </div>`;
    });
}

function back() {
    mains.style.left = "100%";
}

function addChange(index) {
    proBtn.disabled = true;
    proBtn.innerHTML = `<div class="roller"></div>`;

    setTimeout(() => {
        const updatedData = {
            name: proName.innerHTML.replace("Name: ", "").trim().replace(" ", ""),
            image: proImg.src,
            stock: +proStock.innerHTML.replace("Stock: ", "").trim(),
            category: proCat.innerHTML.replace("Category: ", "").trim(),
            price: +proPri.innerHTML
                .replace("Price: ₦", "")
                .replace(",", "")
                .trim(),
            description: proDes.innerHTML.replace("Description: ", "").trim(),
            rating: +proRat.innerHTML.replace("Ratings: ", "").trim(),
            sold: +proPur.innerHTML.replace("Purchased: ", "").trim(),
            unit: proUnit.innerHTML.replace("Unit: ", "").trim(),
        };

        database
            .ref(`goods/${index}`)
            .update(updatedData)
            .then(() => {
                alert("Changes saved successfully!");
                proBtn.disabled = false;
                productHome.innerHTML = "";
                proBtn.innerHTML = `Add Change`;
                product();

                det(index);
            })
            .catch((error) => {
                alert("Error updating product: " + error.message);
                proBtn.disabled = false;
                proBtn.innerHTML = `Add Change`;
            });
    }, 2000);
}

function pick(ev) {
    let input = ev.target.files[0];
    let reader = new FileReader();
    if (!input) {
        alert("Please attach a file");
        return;
    }
    reader.readAsDataURL(input);
    reader.addEventListener("load", (params) => {
        push.src = params.target.result;
    });
}

function picking(ev) {
    let input = ev.target.files[0];
    let reader = new FileReader();
    if (!input) {
        alert("Please attach a file");
        return;
    }
    reader.readAsDataURL(input);
    reader.addEventListener("load", (params) => {
        proImg.src = params.target.result;
    });
}
function deleteBox(params) {
    var starCountRef = database.ref(`goods/${params}`);
    starCountRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let conf = confirm(
            `You are deleting ${data.name} from the available product`
        );

        if (conf) {
            database
                .ref(`goods/${params}`)
                .remove()
                .then(() => {
                    alert("Product deleted!");
                    productHome.innerHTML = "";
                    product();
                })
                .catch((err) => {
                    console.error(err);
                    alert("Error deleting product");
                });
        }
    });
}

function addProduct() {
    var starCountRef = firebase.database().ref(`goods`);
    starCountRef.once("value").then((snapshot) => {
        const data = snapshot.val();

        firebase
            .database()
            .ref(`goods/${data.length}`)
            .set({
                category: pushCat.innerHTML.replace("Category: ", "").trim(),
                description: pushDesc.innerHTML.replace("Description: ", "").trim(),
                image: pushPick.src,
                name: pushName.innerHTML.replace("Name: ", "").trim(),
                price: +pushPrice.innerHTML.replace("Price: ₦", "").trim(),
                rating: +pushRat.innerHTML.replace("Ratings: ", "").trim(),
                sold: +pushSold.innerHTML.replace("Sold: ", "").trim(),
                stock: +pushStock.innerHTML.replace("Stock: ", "").trim(),
                unit: pushUnit.innerHTML.replace("Unit: ", "").trim(),
            });
    });
}

function viewReceipts() {
    receipt.style.left = "0";
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
}
function backRep() {
    receipt.style.left = "100%";
}
dispRec();

function dispOrder() {
    const dispOrd = document.querySelector(".dispOrder");
    var starCountRef = firebase.database().ref(`totalOrder`);
    starCountRef.on("value", (snapshot) => {
        const first = snapshot.val() || [];
        var starCountRef = firebase.database().ref(`totalDiscount`);
        starCountRef.on("value", (snapshot) => {
            const flown = snapshot.val() || [];
            const second = flown.filter((member) => {
                return member.type.toLowerCase() === "ordered";
            });

            const joined = [...first, ...second];

            if (joined.length === 0) {
                dispOrd.innerHTML = "<h3 class='empty-car'>No Orderies Yet</h3>";
                return;
            }

            joined.sort((a, b) => {
                const formatDate = (dateStr) => {
                    const [day, month, year] = dateStr.split("/");
                    return `${year}-${month}-${day}`;
                };

                const d1 = new Date(`${formatDate(a.date)} ${a.time}`);
                const d2 = new Date(`${formatDate(b.date)} ${b.time}`);

                return d2 - d1;
            });

            dispOrd.innerHTML = "";
            joined.forEach((member) => {
                const price = +member.price;
                dispOrd.innerHTML += `<div class="pur-element">
              <div class="pur-head">
                <img src="${member.image}" alt="" />
                <h4>₦ ${price.toLocaleString()}</h4>
                <h4>${member.quantity}</h4>
              </div>
              <div class="pur-head">
                <h4>${member.time}</h4>
                <h4>Adebayo Quadri</h4>
                <h4>${member.date}</h4>
              </div>
            </div>`;
            });
        });
    });
}

function dispPurchased() {
    const dispOrd = document.querySelector(".dispPur");
    var starCountRef = firebase.database().ref(`totalPurchased`);
    starCountRef.on("value", (snapshot) => {
        const first = snapshot.val() || [];
        var starCountRef = firebase.database().ref(`totalDiscount`);
        starCountRef.on("value", (snapshot) => {
            const flown = snapshot.val() || [];
            const second = flown.filter((member) => {
                return member.type.toLowerCase() === "purchased";
            });

            const joined = [...first, ...second];

            if (joined.length === 0) {
                dispOrd.innerHTML = "<h3 class='empty-car'>Everwhere Blur</h3>";
                return;
            }

            joined.sort((a, b) => {
                const formatDate = (dateStr) => {
                    const [day, month, year] = dateStr.split("/");
                    return `${year}-${month}-${day}`;
                };

                const d1 = new Date(`${formatDate(a.date)} ${a.time}`);
                const d2 = new Date(`${formatDate(b.date)} ${b.time}`);

                return d2 - d1;
            });

            dispOrd.innerHTML = "";
            joined.forEach((member) => {
                const price = +member.price;
                dispOrd.innerHTML += `<div class="pur-element">
              <div class="pur-head">
                <img src="${member.image}" alt="" />
                <h4>₦ ${price.toLocaleString()}</h4>
                <h4>${member.quantity}</h4>
              </div>
              <div class="pur-head">
                <h4>${member.time}</h4>
                <h4>${member.user}</h4>
                <h4>${member.date}</h4>
              </div>
            </div>`;
            });
        });
    });
}
dispPurchased();
dispOrder();
dispDisc();

function dispDisc() {
    const dispDiscount = document.querySelector(".dispDisc");
    var starCountRef = firebase.database().ref(`totalDiscount`);
    starCountRef.on("value", (snapshot) => {
        const array = snapshot.val() || [];

        if (array.length === 0) {
            dispDiscount.innerHTML = "<h3 class='empty-car'>No Receipt Yet</h3>";
            return;
        }

        dispDiscount.innerHTML = "";
        array.forEach((member) => {
            const price = +member.price;

            dispDiscount.innerHTML += `<div class="pur-element">
              <div class="pur-head">
                <img src="${member.image}" alt="" />
                <h4>₦ ${price.toLocaleString()}</h4>
                <h4>${member.quantity}</h4>
              </div>
              <div class="pur-head">
                <h4>${member.time}</h4>
                <h4>${member.user}</h4>
                <h4>${member.date}</h4>
              </div>
            </div>`;
        });
    });
}

function dispRec() {
    let rep = document.querySelector(".receipt-son");
    var starCountRef = firebase.database().ref(`totalPurchased`);
    starCountRef.on("value", (snapshot) => {
        const first = snapshot.val() || [];
        var starCountRef = firebase.database().ref(`totalOrder`);
        starCountRef.on("value", (snapshot) => {
            const second = snapshot.val() || [];
            var starCountRef = firebase.database().ref(`totalDiscount`);
            starCountRef.on("value", (snapshot) => {
                const third = snapshot.val() || [];
                const data = [...first, ...second, ...third];

                data.sort((a, b) => {
                    const formatDate = (dateStr) => {
                        const [day, month, year] = dateStr.split("/");
                        return `${year}-${month}-${day}`;
                    };

                    const d1 = new Date(`${formatDate(a.date)} ${a.time}`);
                    const d2 = new Date(`${formatDate(b.date)} ${b.time}`);

                    return d2 - d1;
                });

                if (data.length === 0) {
                    rep.innerHTML = "<h3 class='empty-car'>No Receipt Yet</h3>";
                    rep.style.alignItems = "center";
                    return;
                }
                rep.innerHTML = "";

                data.forEach((member) => {
                    if (!member) return;
                    const price = +member.price;

                    rep.innerHTML += `
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
              <b>${member.user}</b>
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
            });
        });



    });
}


animation()
let newInterval;
function animation() {
    const user = document.querySelectorAll(".user-each");
    const top = document.querySelectorAll(".hero-box");




    user.forEach((member) => {

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
                threshold: 0.1,
            }
        );

        flast.observe(member);
    });





    top.forEach((member) => {

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
                threshold: 0.8,
            }
        );

        flast.observe(member);
    });
}




//////////////////////////////////////////////////////////////





const topBox = document.querySelector('.top-box');

const showTop = new IntersectionObserver(
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

showTop.observe(topBox);





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
            document.querySelector(
                ".message-body"
            ).innerHTML = `<div class="loading">
          <p>No Message Yet</p>
        </div>`;
            return;
        }
        document.querySelector(".message-body").innerHTML = ``;
        data.forEach((member, index) => {
            const truth = member.uid === userUid;
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

        notifications()
        messageBody.scrollTop = messageBody.scrollHeight;
    });
}
start()
function start() {
    newInterval = setInterval(newMessage, 5000)
}
function newMessage() {
    var starCountRef = firebase.database().ref(`chat`);
    starCountRef.once("value").then((snapshot) => {
        const data = snapshot.val() || [];
        data.reverse();

        const find = data.findIndex((member) => {
            return member.uid === userUid;
        });






        if (find !== -1 && find > 0) {
            document.getElementById('left-icon').innerHTML = `${find}`;
            document.getElementById('left-icon').style.color = "#0f559cff";
            document.getElementById('left-icon').style.fontSize = "18px";
            document.getElementById('left-icon').style.fontWeight = "bold";
        } else if (find == -1 && data.length > 0) {
            document.getElementById('left-icon').innerHTML = `${data.length}`;
            document.getElementById('left-icon').style.color = "#0f559cff";
            document.getElementById('left-icon').style.fontSize = "18px";
            document.getElementById('left-icon').style.fontWeight = "bold";
        } else {
            if (state === false) {
                document.getElementById('left-icon').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#2e73b8"><path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z"/></svg>`;
            } else {
                document.getElementById('left-icon').innerHTML = `<svg
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
            return member.uid === userUid;

        });

        if (find !== -1 && find > 0) {

            document.querySelector('.notification').style.top = "10px"
            document.getElementById('audio').play()
            document.getElementById('name-send').innerHTML = data[0].name.slice(0, 1)
            document.getElementById('name-sends').innerHTML = data[0].name
            document.getElementById('send-message').innerHTML = data[0].message

            setTimeout(() => {
                document.getElementById('audio').pause()
            }, 1500);
            setTimeout(() => {
                document.querySelector('.notification').style.top = "-150px"
                document.getElementById('name-send').innerHTML = ""
                document.getElementById('name-sends').innerHTML = ""
                document.getElementById('send-message').innerHTML = ""
            }, 4000);
            return
        }

        if (find == -1 && data.length > 0) {
            document.querySelector('.notification').style.top = "10px"
            document.getElementById('audio').play()
            document.getElementById('name-send').innerHTML = data[0].name.slice(0, 1)
            document.getElementById('name-sends').innerHTML = data[0].name
            document.getElementById('send-message').innerHTML = data[0].message

            setTimeout(() => {
                document.getElementById('audio').pause()
            }, 1500);
            setTimeout(() => {
                document.querySelector('.notification').style.top = "-150px"
                document.getElementById('name-send').innerHTML = ""
                document.getElementById('name-sends').innerHTML = ""
                document.getElementById('send-message').innerHTML = ""
            }, 4000);
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
            params.innerHTML = `Send`;
            alert("Please type a message");
            return;
        }

        var starCountRef = firebase.database().ref("chat");
        starCountRef.once("value").then((snapshot) => {
            const data = snapshot.val() ? snapshot.val().length : 0;

            firebase
                .database()
                .ref(`chat/${data}`)
                .set({
                    name: "Admin",
                    uid: userUid,
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
    if (deleted) {
        alert("You cannot edit a deleted message");
        return;
    }

    if (!params) {
        alert("You can only edit your messages");
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