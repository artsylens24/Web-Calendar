const date=new Date();

const rendercalendar=()=>{

    date.setDate(1);

const monthdays=document.querySelector(".days");

const lastday=new Date(date.getFullYear(),date.getMonth()+1,0).getDate();

const prevlastday=new Date(date.getFullYear(),date.getMonth(),0).getDate();

const firstdayindex=date.getDay();

const lastdayindex=new Date(date.getFullYear(),date.getMonth()+1,0).getDay();

const nextdays=((lastdayindex<6)?7-lastdayindex-1:7);

console.log(nextdays);

const months=[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

document.querySelector(".date h1").innerHTML=months[date.getMonth()];

document.querySelector(".date p").innerHTML=new Date().toDateString();

let days="";

for(let x=firstdayindex;x>0;x--)
{
    days+=`<div class="prev-date" onMouse>${prevlastday-x+1}</div>`;
}

for(let i=1;i<=lastday;i++)
{
    if(i===new Date().getDate()&&date.getMonth()===new Date().getMonth())
    {
        days+=`<div class="today">${i}<div class="hiddentoday" onmouseover="info(this,${i})" onmouseout="hide(this)">sensitive</div></div>`;
    }
    else
    {
        days+=`<div>${i}<div class="hidden" onmouseover="info(this,${i})" onmouseout="hide(this)" style="font-size:65%">sensitive</div></div>`;
    }
}

for(let j=1;j<=nextdays;j++)
{
    days+=`<div class="next-date">${j}</div>`;
    monthdays.innerHTML=days;
}
}

function info(x,i)
{
    x.style.display='flex';
    x.style.position='absolute';
    x.style.width='10rem';
    x.style.height='8rem';
    x.style.opacity=1;
    x.innerHTML = userAction(fmt(i));
}

function hide(x)
{
    x.style.display = 'flex';
    x.style.position='absolute';
    x.style.opacity=0;
}

function fmt(i){
    curr = new Date();
    return curr.getFullYear() + "-" + (curr.getMonth()+1) + "-" + i;
}

function  userAction(date) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://localhost:3456/events?date='+date, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

let btn=document.getElementById("entry-btn");
let input_left=document.getElementById("input_left");
btn.addEventListener("click",()=>{
    input_left.style.display='flex';
    input_left.classList.add('animate-input_left');
})

let btn1=document.getElementById("close");
btn1.addEventListener("click",()=>{
    input_left.style.opacity=0;
    input_left.style.display='none';
})

let start=document.getElementById('start-date');
let end=document.getElementById('end-date');
start.addEventListener('change', ()=> {
    if (start.value)
        end.min = start.value;
});

document.querySelector(".arrow-left").addEventListener("click",()=>{date.setMonth(date.getMonth()-1);rendercalendar();});
document.querySelector(".arrow-right").addEventListener("click",()=>{date.setMonth(date.getMonth()+1);rendercalendar();});

rendercalendar();