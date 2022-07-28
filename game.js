const numberOfSegments=10;
let game=new Winwheel(getWheel());
function getWheel(){
    return {
        'canvasId':'game',
        'numSegments':numberOfSegments,
        'fillStyle':'white',
        'textAlignment'  : 'outer',
        'textMargin':5, 
        'textFontSize':numberOfSegments,
        'textOrientation':'curved',
        'outerRadius':69,
        'innerRadius':20,
        'strokeStyle':'rgba(0,0,0,0.1)', 
        'segments':getSegments(numberOfSegments),
        'animation':setAnimation()
    };
}
function loadGame(){
    return getWheel();
}
function getSegments(n){
    let segments=new Array();
    const colors=["red","pink","purple","green","skyblue","blue","crimson","gold","yellow","grey"];
    let i=0;
    let k=0;
    while(i<n){
        segments.push({fillStyle:colors[k],text:String(i+1)});
        i++;
        k++;
        if(k>=colors.length){
            k=0;
        }
    }
    return segments;
}

function drawPointer(){
    const g=document.getElementById('game');
    const w=g.width/2;
    const h=g.height/2;
    const context=g.getContext('2d');
    context.beginPath();
    context.fillStyle="gold";
    context.moveTo(w,10);
    context.lineTo(w-10,1);
    context.lineTo(w+10,1);
    context.fill();
    drawTitle();
}
function setAnimation(){
    return {
        'type':'spinToStop',
        'duration':10,
        'spins':5,
        'clearTheCanvas'   : false,
        'callbackFinished' : 'result()',
        'callbackAfter' : 'drawPointer()'
    };
}
drawPointer();
function drawTitle(){
    const g=document.getElementById('game');
    const w=g.width/2;
    const h=g.height/2;
    const context=g.getContext('2d');
    context.beginPath();
    context.fillStyle="white";
    context.arc(w,h,20,0,Math.PI*2);
    context.fill();
    context.beginPath();
    context.font="Times New Roman";
    context.fillStyle="black";
    context.fillText("Game",w-14,h+4,40);


}
function result(){
    //alert("We have a result !");
    let res=game.getIndicatedSegment().text;
    alert("Congratulations You won the  "+res+"  prize !!!");
}
//game.startAnimation();
function restGame(){
    game=new Winwheel(loadGame());
    game.draw();
    drawPointer();
}
console.log(game);