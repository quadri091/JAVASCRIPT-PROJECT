document.body.addEventListener('mousemove', (event) => {
    const left = event.clientX
    const top = event.clientY
    const div = document.querySelector('.boxed')
    div.style.left = `${left}px`
    div.style.top = `${top}px`
})

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
const database = firebase.database();



let productHome = document.querySelector('.products')
let main = document.getElementById('main')
const messages = [
    "Quality Guaranted,",
    "Latest Models,",
    "Fast Shipping,",
    "Secure Payments,",
    "Affordable Products,",
];
const typewriter = document.getElementById("flow");

let messageIndex = 0;
let charIndex = 0;
let typing = true;

function type() {
    const currentMessage = messages[messageIndex];

    if (typing) {
        // Add letters
        const span = document.createElement("span");
        span.textContent = currentMessage[charIndex];
        span.style.opacity = 0;
        span.style.transition = "opacity 0.3s";
        typewriter.appendChild(span);

        requestAnimationFrame(() => {
            span.style.opacity = 1;
        });

        charIndex++;
        if (charIndex === currentMessage.length) {
            typing = false;
            setTimeout(type, 800);
            return;
        }
        setTimeout(type, 110);
    } else {
        if (charIndex > 0) {
            const lastSpan = typewriter.lastChild;
            lastSpan.style.opacity = 0;
            setTimeout(() => {
                typewriter.removeChild(lastSpan);
                charIndex--;
                type();
            }, 100);
        } else {
            typing = true;
            messageIndex = (messageIndex + 1) % messages.length;
            setTimeout(type, 200);
        }
    }
}



type();









function display(params) {

    const svg = params.querySelector("svg");

    if (params.id === "long") {
        if (params.classList.contains("open")) {
            params.classList.remove('height')
            svg.style.transform = 'rotate(0deg)';
            params.classList.remove("open");
        } else {
            params.classList.add('height')
            svg.style.transform = 'rotate(180deg)';
            params.classList.add("open");
        }
    } else {
        if (params.classList.contains("open")) {
            params.classList.remove('heightt')
            svg.style.transform = 'rotate(0deg)';
            params.classList.remove("open");
        } else {
            params.classList.add('heightt')
            svg.style.transform = 'rotate(180deg)';
            params.classList.add("open");
        }
    }
}

function product() {
    var starCountRef = database.ref("goods/");
    const productHome = document.querySelector('.products')


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

        animationControl()
    });


}
product();


function det(params) {
    main.style.left = '0'

    var starCountRef = database.ref('goods/');
    starCountRef.on('value', (snapshot) => {
        const data = snapshot.val()[params];
        main.innerHTML = `<div id="preview">
    <span onclick="back()" style="display: flex; width: 35px; height: 35px; border-radius: 50%; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="white"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
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
    </div>
    <div class="bottom-prev">
      <button onclick="link()">Order</button>
      <button onclick="link()">Buy</button>
      <button onclick="link()">Add To Cart</button>
    </div>
  </div>`

    });

}
function back() {
    main.style.left = '100%'
}
function link() {
    setTimeout(() => {
        location.href = "form.html"
    }, 1000);
}




document.getElementById("send").addEventListener("click", function () {
    document.getElementById("send").innerHTML = `<span class="roller"></span>`;
    document.getElementById("send").disabled = true;
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!firstName || !lastName || !email || !message) {
        document.getElementById("send").innerHTML = `Send Message`;
        document.getElementById("send").disabled = false;
        alert("Please fill in all required fields.");
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
            alert("Message sent successfully!");
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


function scrollPro() {
    location.href = "#goods"
}




function animationControl() {


    const choiceBox = document.querySelectorAll('.choice-box')
    const dispenser = document.querySelectorAll('.each-dispenser')
    const dispensers = document.querySelectorAll('.each-dispensers')
    const products = document.querySelectorAll('.each-products')
    const box = document.querySelectorAll('.box')
    const question = document.querySelector('.question-box')
    const track = document.querySelector('.track-box')
    const set = document.querySelector('.touch-set')
    const say = document.querySelectorAll('.say-box')
    const why = document.querySelectorAll('.why-box')
    const sets = document.querySelectorAll('.set-box')
    const bottom = document.querySelector('.bottom-set')
    const right = document.querySelector('.right-set')
    sets.forEach((member) => {






        const lastest = new IntersectionObserver((entry) => {

            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('flown')


            } else {
                entry[0].target.classList.remove('flown')
            }
        }, {
            threshold: 0
        })


        lastest.observe(member)
    })



    const flowy = new IntersectionObserver((entry) => {

        if (entry[0].isIntersecting) {
            entry[0].target.classList.add('flown')


        } else {
            entry[0].target.classList.remove('flown')


        }
    }, {
        threshold: 0.5
    })


    flowy.observe(right)


    const flower = new IntersectionObserver((entry) => {

        if (entry[0].isIntersecting) {
            entry[0].target.classList.add('flown')


        } else {
            entry[0].target.classList.remove('flown')


        }
    }, {
        threshold: 0.5
    })


    flower.observe(bottom)


    products.forEach((member) => {



        const hello = new IntersectionObserver((entry) => {


            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('flown')
            } else {
                entry[0].target.classList.remove('flown')
            }
        }, {
            threshold: 0.3
        })

        hello.observe(member)
    })



    choiceBox.forEach((member) => {



        const firstObserve = new IntersectionObserver((entry) => {


            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('flown')
            } else {
                entry[0].target.classList.remove('flown')
            }
        }, {
            threshold: 0.6
        })

        firstObserve.observe(member)
    })


    dispenser.forEach((member) => {

        const firstObserve = new IntersectionObserver((entry) => {


            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('flown')
            } else {
                entry[0].target.classList.remove('flown')
            }
        }, {
            threshold: 0.6
        })

        firstObserve.observe(member)
    })




    dispensers.forEach((member) => {

        const firstObserve = new IntersectionObserver((entry) => {


            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('flown')
            } else {
                entry[0].target.classList.remove('flown')
            }
        }, {
            threshold: 0.6
        })

        firstObserve.observe(member)
    })


    box.forEach((member) => {

        const firstObserve = new IntersectionObserver((entry) => {


            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('flown')
            } else {
                entry[0].target.classList.remove('flown')
            }
        }, {
            threshold: 0.6
        })

        firstObserve.observe(member)
    })

    why.forEach((member) => {

        const firstObserve = new IntersectionObserver((entry) => {


            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('flown')
            } else {
                entry[0].target.classList.remove('flown')
            }
        }, {
            threshold: 0.6
        })

        firstObserve.observe(member)
    })

    say.forEach((member) => {

        const firstObserve = new IntersectionObserver((entry) => {


            if (entry[0].isIntersecting) {
                entry[0].target.classList.add('flown')
            } else {
                entry[0].target.classList.remove('flown')
            }
        }, {
            threshold: 0.6
        })

        firstObserve.observe(member)
    })



    const secondObserve = new IntersectionObserver((entry) => {


        if (entry[0].isIntersecting) {
            entry[0].target.classList.add('flown')
        } else {
            entry[0].target.classList.remove('flown')
        }
    }, {
        threshold: 0.6
    })



    secondObserve.observe(question)




    const thirdObserve = new IntersectionObserver((entry) => {


        if (entry[0].isIntersecting) {
            entry[0].target.classList.add('flown')
        } else {
            entry[0].target.classList.remove('flown')
        }
    }, {
        threshold: 0.5
    })

    thirdObserve.observe(track)





    const lastest = new IntersectionObserver((entry) => {

        if (entry[0].isIntersecting) {
            entry[0].target.classList.add('flown')
        } else {
            entry[0].target.classList.remove('flown')
        }
    }, {
        threshold: 0.5
    })

    lastest.observe(set)





}

animationControl()


function searching(params) {
    if (window.location.hash !== "#goods") {
        window.location.href = "#goods"
    }
    const search = params.value.trim().toLowerCase()
    var starCountRef = database.ref("goods/");
    const productHome = document.querySelector('.products')
    starCountRef.on("value", (snapshot) => {
        const data = snapshot.val() ? snapshot.val() : [];
        const newArr = data.filter(member => member.name.toLowerCase().includes(search) || String(member.price).includes(search) || member.description.toLowerCase().includes(search) || member.category.toLowerCase().includes(search))

        productHome.innerHTML = "";
        if (newArr.length === 0) {
            productHome.innerHTML = `<div class="not">Product does not exist</div>`
            return;
        }
        newArr.forEach((member, index) => {
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

        animationControl()

    });




}