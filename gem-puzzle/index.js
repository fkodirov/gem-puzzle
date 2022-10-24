function addElement(elem,elemclass,inelem){
a=document.createElement(elem);
a.className = elemclass;
inelem.append(a);
}
addElement("div",'results_block',document.body);
document.querySelector('.results_block').style.width='-webkit-fill-available';
document.querySelector('.results_block').style.height='-webkit-fill-available';
document.querySelector('.results_block').style.position='absolute';
document.querySelector('.results_block').style.zIndex='1';
document.querySelector('.results_block').style.backgroundColor='white';
document.querySelector('.results_block').style.display='none';
addElement("HEADER",'',document.body);
addElement("div",'container',document.getElementsByTagName('header')[0]);
addElement("div",'buttons_block',document.querySelector('.container'));
addElement("div",'buttons_block',document.querySelector('.container'));
addElement("div",'options_block',document.querySelector('.container'));
addElement("button",'shuffle-start',document.querySelectorAll('.buttons_block')[0]);
document.querySelector('.shuffle-start').innerHTML='Shuffle and start';
addElement("button",'stop',document.querySelectorAll('.buttons_block')[0]);
document.querySelector('.stop').innerHTML='Stop';
addElement("button",'results',document.querySelectorAll('.buttons_block')[0]);
document.querySelector('.results').innerHTML='Results';
addElement("button",'save',document.querySelectorAll('.buttons_block')[1]);
document.querySelector('.save').innerHTML='Save';
addElement("button",'load',document.querySelectorAll('.buttons_block')[1]);
document.querySelector('.load').innerHTML='Load';
addElement("div",'moves',document.querySelector('.options_block'));
document.querySelector('.moves').innerHTML='Moves: 0';
addElement("div",'time',document.querySelector('.options_block'));
document.querySelector('.time').innerHTML='00 : 00';
addElement("MAIN",'',document.body);
addElement("div",'container',document.getElementsByTagName('main')[0]);
addElement("div",'puzzle_field',document.querySelectorAll('.container')[1]);
addElement("FOOTER",'',document.body);
addElement("div",'container',document.getElementsByTagName('footer')[0]);
addElement("div",'sizes_block',document.querySelectorAll('.container')[2]);
addElement("button",'three',document.querySelector('.sizes_block'));
document.querySelector('.three').innerHTML='3x3';
addElement("button",'four',document.querySelector('.sizes_block'));
document.querySelector('.four').innerHTML='4x4';
addElement("button",'eight',document.querySelector('.sizes_block'));
document.querySelector('.eight').innerHTML='8x8';
addElement("audio",'sound',document.querySelectorAll('.container')[2]);
document.querySelector('.sound').src='button.m4a';
function getRandomInt(max) {
    number=Math.floor(Math.random() * max)
    if(exc.includes(number)){getRandomInt(max);}
    else{exc.push(number);
    arr.push(number);}
    return number;
  }
function moveElement(arr,from,to) {
  arr.splice(to,0,arr.splice(from,1)[0]);
  return arr;
};  

function swap(arr, a, b) {
  arr[a] = arr.splice(b, 1, arr[a])[0];
}
let windowInnerWidth = document.documentElement.clientWidth;
let solvable=0;
let arr=[];
let exc=[];  
let max = 16;
let l = 0;
let t = 0;
let moves=1;
let zeroindex=0;
let w=0;
let mobile=0;
if (localStorage.getItem('top10') !== null) {
 top10=JSON.parse(localStorage.getItem("top10"));}
else{
 top10=[];
}
console.log(top10);
function start(){
  do{
    if(windowInnerWidth>470){
      mobile=0;
      document.querySelector(".puzzle_field").style.width='400px';
      document.querySelector(".puzzle_field").style.height='400px';
    if(max==9){
      w=134;  
    }
    else if(max==16){
      w=100;    
    }
    else if(max==64){
      w=50;    
    }}
    else{
      document.querySelector(".puzzle_field").style.width='300px';
      document.querySelector(".puzzle_field").style.height='300px';
      mobile=1;
    if(max==9){
      w=100;  
    }
    else if(max==16){
      w=75;    
    }
    else if(max==64){
      w=37.5;    
    }
    }    
arr=[];
exc=[];  
l = 0;
t = 0;  
for(let i=0;i<max;i++){
if(i % max ** 0.5 == 0){l = 0}
else{l += w;}
t = Math.floor(i/max**0.5)*w;
const cell = document.createElement("div");
cell.className = "cell";
cell.style.width=`${w}px`;
cell.style.height=`${w}px`;
n=getRandomInt(max);
cell.innerHTML=n;
cell.style.transition='all 0.15s ease-in-out';
cell.style.left=`${l}px`;
cell.style.top=`${t}px`;
if(n==0){
zeroindex=i;
cell.style.border='none';
cell.style.color='rgb(233, 242, 233)';
cell.style.zIndex='-1';}
cell.setAttribute('draggable','true')
document.querySelector(".puzzle_field").append(cell);
}
checksolve();
if(solvable==0)document.querySelector(".puzzle_field").innerHTML='';
  }while(solvable==0);
}


//Время
let timer = 0;
let timerInterval;
let time = document.querySelector(".time");

function starttime() {
  stoptime();
  timerInterval = setInterval(function() {
    timer += 1/60;
    msVal = Math.floor((timer - Math.floor(timer))*100);
    secondVal = Math.floor(timer) - Math.floor(timer/60) * 60;
    minuteVal = Math.floor(timer/60);
    time.innerHTML = `${minuteVal < 10 ? "0" + minuteVal.toString() : minuteVal} : ${secondVal < 10 ? "0" + secondVal.toString() : secondVal}`;
  }, 1000/60); 
}

function stoptime() {
  clearInterval(timerInterval);
}


start();
starttime();



const cells=document.querySelectorAll(".cell");
let empty=cells[arr.indexOf(0)];
let getLeft=empty.style.left;
let getTop=empty.style.top;


function getNumber(str){
  return Number(str.slice(0, -2));  
} 

//Move
function move(){
  const cells=document.querySelectorAll(".cell");
  let empty=cells[arr.indexOf(0)];
  let getLeft=empty.style.left;
  let getTop=empty.style.top;  

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", function() {
        cells[i].style.transition='all 0.15s ease-in-out';  
        empty=cells[zeroindex];
        getLeft=empty.style.left;
        getTop=empty.style.top;
        if((getLeft==cells[i].style.left && (getNumber(getTop)==getNumber(cells[i].style.top)-w || getNumber(getTop)==getNumber(cells[i].style.top)+w)) ||  (getTop==cells[i].style.top && (getNumber(getLeft)==getNumber(cells[i].style.left)-w || getNumber(getLeft)==getNumber(cells[i].style.left)+w))){
        const newemptyLeft=cells[i].style.left;
        const newemptyTop=cells[i].style.top;
        cells[i].style.left=getLeft;
        cells[i].style.top=getTop;
        empty.style.left=newemptyLeft;
        empty.style.top=newemptyTop;
        document.querySelector('.moves').innerHTML=`Moves: ${moves++}`;
        //[arr[arr.indexOf(0)], arr[arr.indexOf(Number(cells[i].textContent))]]  = [arr[arr.indexOf(Number(cells[i].textContent))], arr[arr.indexOf(0)]];
        //moveElement(arr,arr.indexOf(0),arr.indexOf(Number(cells[i].textContent)));
        swap(arr,arr.indexOf(0),arr.indexOf(Number(cells[i].textContent)));
        playSound();
        win();
      }
  });
}
}
move();
  document.querySelector('.shuffle-start').addEventListener("click",function(){
  //document.querySelector('.puzzle_field').innerHTML='';
  document.querySelector('.moves').innerHTML='Moves: 0';
  time.innerHTML='00:00';
  document.querySelector(".puzzle_field").innerHTML='';
  start();
  starttime();
  move();
  moves=1;
  timer = 0;
});
document.querySelector('.stop').addEventListener("click",function(){
  stoptime();
});

function restart(){
  do{
  arr=[];
  exc=[];  
  l = 0;
  t = 0;  
  for(let i=0;i<max;i++){
  if(i % max ** 0.5 == 0){l = 0}
  else{l += w;}
  t = Math.floor(i/max**0.5)*w;
  n=getRandomInt(max);
  cells[i].style.width=`${w}px`;
  cells[i].style.height=`${w}px`;
  cells[i].style.transition='none';
  cells[i].style.left=`${l}px`;
  cells[i].style.top=`${t}px`;
  cells[i].style.color='#000000';
  cells[i].style.zIndex='1';
  cells[i].style.border='2px solid #000';
  if(n==0){
  zeroindex=i;  
  cells[i].style.border='none';
  cells[i].style.color='rgb(233, 242, 233)';
  cells[i].style.zIndex='-1';
 }
  cells[i].innerHTML=n;
  }
checksolve();
  }while(solvable==0);

}

function win(){
  let winarr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0];
  let winarr2=[1,2,3,4,5,6,7,8,0];
  let winarr3=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,0];
  if((JSON.stringify(arr) === JSON.stringify(winarr)) || (JSON.stringify(arr) === JSON.stringify(winarr2)) || (JSON.stringify(arr) === JSON.stringify(winarr3))){
    let win=[];
    win[0]=moves-1;win[1]=`${minuteVal < 10 ? "0" + minuteVal.toString() : minuteVal} : ${secondVal < 10 ? "0" + secondVal.toString() : secondVal}`;
    if (localStorage.getItem('top10') !== null) {
    if(JSON.parse(localStorage.getItem("top10")[0][0]<win[0])){top10.push(win);}else{top10.unshift(win);}}
    else{top10.push(win);}
    localStorage.setItem('top10', JSON.stringify(top10));
    alert(`Ура! Вы решили головоломку за ${minuteVal < 10 ? "0" + minuteVal.toString() : minuteVal} : ${secondVal < 10 ? "0" + secondVal.toString() : secondVal} и ${moves-1} ходов!`);}
}

function checksolve(){
  let sum=0;
  let ryad=1;
  for(let i=0;i<max;i++){
    for(let j=0;j<max;j++){
      if(arr[i]>arr[j] && j>i && arr[i]!=0 && arr[j]!=0)sum++;
    }
  }
  switch (zeroindex) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 8:
    case 9:
    case 10:
    case 11:     
      ryad=2;
      break;
    default:
      ryad=1;
  }
if((max%2==0 && ryad==2 && sum%2!=0) || (max%2==0 && ryad==1 && sum%2==0) || (max%2!=0 && sum%2==0))solvable=1;
else solvable=0;
}

document.querySelector('.three').addEventListener("click",function(){
  max=9;
  document.querySelector(".puzzle_field").innerHTML='';
  timer=0;moves=0;
  document.querySelector('.moves').innerHTML=`Moves: ${moves++}`;
  start();
  starttime();
  move();
});
document.querySelector('.four').addEventListener("click",function(){
  max=16;
  document.querySelector(".puzzle_field").innerHTML='';
  timer=0;moves=0;
  document.querySelector('.moves').innerHTML=`Moves: ${moves++}`;
  start();
  starttime();
  move();
});
document.querySelector('.eight').addEventListener("click",function(){
  max=64;
  document.querySelector(".puzzle_field").innerHTML='';
  timer=0;moves=0;
  document.querySelector('.moves').innerHTML=`Moves: ${moves++}`;
  start();
  starttime();
  move();
});

window.addEventListener(`resize`, event => {
  const cells=document.querySelectorAll(".cell");
  windowInnerWidth = document.documentElement.clientWidth;
  if(windowInnerWidth<=470 && mobile==0){
    document.querySelector(".puzzle_field").style.width='300px';
    document.querySelector(".puzzle_field").style.height='300px';
    if(max==9){
      w=100;  
    }
    else if(max==16){
      w=75;    
    }
    else if(max==64){
      w=37.5;    
    }
    for(let i=0;i<max;i++){
      cells[i].style.width=`${w}px`;
      cells[i].style.height=`${w}px`;
        if(i % max ** 0.5 == 0){l = 0}
        else{l += w;}
        t = Math.floor(i/max**0.5)*w;
        cells[i].style.left=`${getNumber(cells[i].style.left)*300/400}px`;
        cells[i].style.top=`${getNumber(cells[i].style.top)*300/400}px`;
    }
    mobile = 1;   
  }
  else if(windowInnerWidth>470 & mobile==1){

    document.querySelector(".puzzle_field").style.width='400px';
    document.querySelector(".puzzle_field").style.height='400px';
    if(max==9){
      w=134;  
    }
    else if(max==16){
      w=100;    
    }
    else if(max==64){
      w=50;    
    }
    for(let i=0;i<max;i++){
      cells[i].style.width=`${w}px`;
      cells[i].style.height=`${w}px`;
        if(i % max ** 0.5 == 0){l = 0}
        else{l += w;}
        t = Math.floor(i/max**0.5)*w;
        cells[i].style.left=`${getNumber(cells[i].style.left)*400/300}px`;
        cells[i].style.top=`${getNumber(cells[i].style.top)*400/300}px`;
    }mobile = 0;    
  }
  moves=0;
   }, false);


  document.querySelector('.save').addEventListener("click",function(){
    localStorage.setItem('arr', JSON.stringify(arr));
    localStorage.setItem('max', max);
    localStorage.setItem('moves', moves);
    localStorage.setItem('timer', timer);
    localStorage.setItem('w', w);
    localStorage.setItem('zeroindex', zeroindex);
  });

  document.querySelector('.load').addEventListener("click",function(){
    arr=JSON.parse(localStorage.getItem("arr"));
    max=Number(localStorage.getItem("max"));
    moves=Number(localStorage.getItem("moves"));
    timer=Number(localStorage.getItem("timer"));
    w=Number(localStorage.getItem("w"));
    zeroindex=Number(localStorage.getItem("zeroindex"));
    document.querySelector(".puzzle_field").innerHTML='';
    document.querySelector('.moves').innerHTML=`Moves: ${moves++}`;
    l=0;t=0;
    for(let i=0;i<max;i++){
      if(i % max ** 0.5 == 0){l = 0}
      else{l += w;}
      t = Math.floor(i/max**0.5)*w;
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.width=`${w}px`;
      cell.style.height=`${w}px`;
      cell.innerHTML=arr[i];
      cell.style.transition='all 0.15s ease-in-out';
      cell.style.left=`${l}px`;
      cell.style.top=`${t}px`;
      if(arr[i]==0){
      zeroindex=i;
      cell.style.border='none';
      cell.style.color='rgb(233, 242, 233)';
      cell.style.zIndex='-1';}
      cell.setAttribute('draggable','true')
      document.querySelector(".puzzle_field").append(cell);
      }
      move();
      starttime();

  });


  function playSound() {
    document.querySelector('.sound').play();
  }

  document.querySelector('.results').addEventListener("click",function(){
    document.querySelector('.results_block').style.display='block';  
  });

  document.querySelector('.results_block').addEventListener("click",function(){
    document.querySelector('.results_block').style.display='none';  
  });








































































//Drag&drop
document.addEventListener('DOMContentLoaded', (event) => {

  var dragSrcEl = null;
  
  function handleDragStart(e) {
    this.style.opacity = '0.4';
    
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    
    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('over');
  }

  function handleDragLeave(e) {
    this.classList.remove('over');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }
    
    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }
    
    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    
    items.forEach(function (item) {
      item.classList.remove('over');
    });
  }
  
  
  let items = document.querySelectorAll('.cell');
  items.forEach(function(item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
});
