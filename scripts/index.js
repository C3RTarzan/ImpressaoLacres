document.addEventListener("DOMContentLoaded", function() { 

    number()
    generateBarcode(localStorage.getItem("myNumber"))
    foco()
});

function number(){
    const number = document.querySelector(".secNumber")
    if(localStorage.getItem("myNumber") == null){
        localStorage.setItem("myNumber", 100);
    }

    var myNumber = localStorage.getItem("myNumber");
    number.value = myNumber
}

function updateNumber(){
    const number = parseInt(document.querySelector(".secNumber").value)
    localStorage.setItem("myNumber", number);
}
function updaterNumber(number){
    localStorage.setItem("myNumber", number);
    document.querySelector(".secNumber").value = number
}

function main(){   
    const router = document.querySelector("#Rota").value
    const amount = document.querySelector('select').value
    const amountInput = document.querySelector('.amonutInput').value
    let quantity

    if(amountInput !== ''){
        quantity = amountInput
    }else{
        quantity = amount
    }
    if(quantity == 0){
        quantity = 1
    }
    document.querySelector('.amonutInput').value = ''

    if(router.length == 3){
        const routerPrint = document.querySelectorAll(".rotaPrint span")
        let number = parseInt(localStorage.getItem("myNumber"))
        for(let i = 0; i < routerPrint.length; i++){
            routerPrint[i].innerHTML = router.toUpperCase()
        }
        nextNumber(number, quantity)  
    }
    foco()
}

function sizeLimit(input){
    const maxLength = parseInt(input.getAttribute("maxlength"));
    if (input.value.length == maxLength) {
        input.value = input.value[3]
    }
}

function generateBarcode(elementoInput){
    if(!elementoInput){
        elementoInput = 0;
    }
    var options = {
        format: "CODE128",
        width: 4, 
        height: 80 
      };
    var options2 = {
    format: "CODE128",
    width: 4, 
    height: 60 
    };
    JsBarcode('#codBarras', elementoInput, options);
    JsBarcode('#codBarrasImpression', elementoInput, options2);
}

function nextNumber(number, quantity, i = 0) {
    let num = number;
    num += 1;
    localStorage.setItem("myNumber", num);
    updaterNumber(num);
    generateBarcode(parseInt(localStorage.getItem("myNumber")));

    window.print()
    if (i < quantity - 1) {
        setTimeout(function() {
            nextNumber(num, quantity, i + 1);
        }, 0);
    }
}

function preset(e){
    const routerPrint = document.querySelectorAll(".rotaPrint span")
    let number = parseInt(localStorage.getItem("myNumber"))
    for(let i = 0; i < routerPrint.length; i++){
        routerPrint[i].innerHTML = e
    }
    nextNumber(number, 1) 
    foco()
}

function foco(){
    document.querySelector("#Rota").focus();
}
