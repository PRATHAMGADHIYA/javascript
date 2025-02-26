import getValue, { createTag } from "../components/helper.js";
import Navbar from "../components/Navbar.js";

document.getElementById("navbar").innerHTML = Navbar()


let isLogin = localStorage.getItem("isLogin") || false;

if (isLogin == false) {
    window.location.href = "/Project-1/pages/login.html"
}

let products = JSON.parse(localStorage.getItem("products")) || [];


let cart=JSON.parse(localStorage.getItem("cart")) || [];


const Exist = (id) => {
    // const product = cart.filter((ele) => ele.id == id)
    // if (product.length > 0) {
    //     
    //     return true;
    // }
    // else {
    //     return false;
    // }

    let flag = false;
    cart.map((ele, i) => {

        if (ele.id === id) {
            cart[i].qty = cart[i].qty + 1
            flag = true;
            alert("Product already exists");
        }
    })
    return flag;
}
const handlecart = (ele) => {
    if (Exist(ele.id)) {

    }
    else {
        cart.push({ ...ele, qty: 1 });
        alert("Product added to cart");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);

}

const mapper = (data) => {
    document.getElementById("productlist").innerHTML = ""
    data.map((ele) => {

        let img = createTag("img", ele.img)
        let title = createTag("h3", ele.title)
        let price = createTag("p", ele.price)
        let category = createTag("p", ele.category)
        let BuyBtn = createTag("button", "Buy")
        BuyBtn.addEventListener("click", () => handlecart(ele))
        let div = document.createElement("div")
        div.append(img, title, price, category, BuyBtn)
        document.getElementById("productlist").append(div)
    })
}

mapper(products);

const handlesort = (orderby) => {
    if (orderby == "lth") {
        let temp = products.sort((a, b) => a.price - b.price);

        mapper(temp);
    }
    else {
        let temp = products.sort((a, b) => b.price - a.price);

        mapper(temp);
    }
};

const handlecategory = (category) => {

    let temp = products.filter((ele) => ele.category == category);

    mapper(temp);
};

document.getElementById("lth").addEventListener("click", () => handlesort("lth"));

document.getElementById("htl").addEventListener("click", () => handlesort("htl"));

document.getElementById("mens").addEventListener("click", () => handlecategory("mens"));

document.getElementById("womens").addEventListener("click", () => handlecategory("womens"));

document.getElementById("kids").addEventListener("click", () => handlecategory("kids"));

const search = (e) => {
    e.preventDefault();

    let searchvalue = getValue("#search");
    let temp = products.filter((ele) => ele.title.toLowerCase().includes(searchvalue.toLowerCase()));

    mapper(temp);
}

document.getElementById("Search").addEventListener("submit", search);

document.getElementById("search").addEventListener("keypress", (e) => {

    if (e.key === "Enter") {

    }

});