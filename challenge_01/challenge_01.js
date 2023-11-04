const words = new Map();
const secretMessage = await fetch("https://codember.dev/data/message_01.txt")
    .then(val => val.text())
    .then(val => val.substring(0, val.length-1))
    .then(val=> val.toLowerCase())
    .then(val => val.split(" "));
//const secretMessage = "casas casa casasas".toLowerCase().split(" ");
secretMessage.forEach(act=>{
    const sum = words.get(act);
    if(sum!=undefined){
        words.set(act, sum+1);
    }  
    else{
        words.set(act, 1)
    }
});
let res = "";
words.forEach((val,key)=>{
    res = res.concat(`${key}${val}`);
})
console.log(res);