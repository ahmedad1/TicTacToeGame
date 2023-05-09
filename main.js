let td=document.querySelectorAll('td')
let x=document.createElement('p');
let y=document.createElement('p');
let o=document.createElement('p');
let choose=document.querySelector('.choose')
let addedp=document.querySelector('.container .winner')
let newgame=document.querySelector('.newgame')
let playerx=document.querySelector('#x');
let playero=document.querySelector('#o');
let choosed=document.querySelector('.choosed')
let p1start=document.querySelector('#p1')
let p2start=document.querySelector('#p2')
let playagain=document.querySelector('.playagain')
o.style="width:9.9vh;height: 11.45vh;margin:auto;border-radius:50%;border:solid;position :absolute;  top: 50%;left: 50%;transform: translate(-50%, -50%);"
x.style="width:2px;height:14.5vh;background:black;transform:rotatez(45deg);margin:auto;position:absolute;left:50%";
y.style="width:2px;height:14.5vh;background:black;transform:rotatez(-45deg);margin:auto"
let xo=-1;

let oneOrTwo=document.querySelector('span.oort')
let oneplayer=document.querySelector('#Onep')
let twoplayers=document.querySelector('#Twop')
let arr=[0,0,0,0,0,0,0,0,0];
let multiplayers=0
let game=new Array(9).fill(undefined);
let finish=0;
let player1=null;
let player2=null;
let whostart=-1
let level=null
playerx.onchange=()=>{
   // xo=1;
    player1=1
   // choose.style.display='none'
    choosed.innerText="Player1 : X , Player2 : O"
    //choosed.style="display:block"
    player2=0
    document.querySelector('.cspan').style.display='none'
    oneOrTwo.style.display="inline"
}
playero.onchange=()=>{
   // xo=0;
    player1=0
   // choose.style.display='none'
    choosed.innerText="Player1 : O , Player2 : X"
    //choosed.style="display:block"
    player2=1
    document.querySelector('.cspan').style.display='none'
    oneOrTwo.style.display="inline"
}
oneplayer.onchange=()=>{
document.querySelector('.level').style.display='block'

oneOrTwo.style.display='none'


document.querySelector('#easy').onchange=()=>{
    level='easy'
    // document.querySelector('.level').style.display='none'
    document.querySelector('.level').style.display='none'
    // document.querySelector('.curlevel').innerHTML=`Easy`
    document.querySelector('.starter').style.display='block'
    
}
document.querySelector('#hard').onchange=()=>{
    level='hard'
    document.querySelector('.level').style.display='none'
    // document.querySelector('.curlevel').innerHTML=`Impossible<br>`
    document.querySelector('.starter').style.display='block'
}

}
twoplayers.onchange=()=>{
    multiplayers=1;
    document.querySelector('.starter').style.display='block'
    oneOrTwo.style.display='none'

}
p1start.onchange=()=>{
if ((player1!=null && level!=null&&multiplayers==0)||(player1!=null && level==null&&multiplayers==1)){
    xo=player1
    whostart=xo
    document.querySelector('.starter').style.display='None'
    document.querySelector('.gamestarted').style.display='block'
    choosed.innerHTML=player1==1?`You : X &nbsp&nbsp&nbsp oppenent: O`: `You : O &nbsp&nbsp&nbsp oppenent: X `
    choosed.style.display='block'
    if (multiplayers==0){
        document.querySelector('.curlevel').innerHTML=`Level : ${level}`
        document.querySelector('.curlevel').style.display='block'
       }
        else{
           document.querySelector('.curlevel').style.display='none'
        }

    document.querySelector('.final').style.display='block'
}
}
p2start.onchange=()=>{
    if ((player2!=null && level!=null&&multiplayers==0)||(player2!=null && level==null&&multiplayers==1)){
        xo=player2
        whostart=xo
        document.querySelector('.starter').style.display='None'
        document.querySelector('.gamestarted').style.display='block'
        choosed.innerHTML=player2==1?`You : O &nbsp&nbsp&nbsp oppenent: X`: `You : X &nbsp&nbsp&nbsp oppenent: O `
        choosed.style.display='block'
        if (multiplayers==0){
         document.querySelector('.curlevel').innerHTML=`Level : ${level}`
         document.querySelector('.curlevel').style.display='block'
        }
         else{
            document.querySelector('.curlevel').style.display='none'
         }
        document.querySelector('.final').style.display='block'
    if (xo==player2&&multiplayers!=1){
        paint(parseInt(Math.abs(Math.random()*10)-1))
    }
    }
}

function avail(board){
    result=[]
    for (i=0;i<=8;i++){
        if (board[i]==undefined){
        result.push(i);
        }
    }
    return result
}

function whowinval(board){
    score=whowin(board,0)
    if (score==player1){
        return 1
    }
    else if (score==player2){
        return -1
    }
    else if (score==-1){
        return -2
    }
    else if (score==2){
        return 0;
    }
}

function maximize(arr){
    if (typeof (arr[0])=="object"){
    arr=arr.filter(e=>e[0]==Math.max(...arr.map(e=>e[0])))
    return arr[0]
    }
    else{
        return Math.max(...arr)
    }
}
function minimize(arr){
    if (typeof (arr[0])=='object'){
    arr=arr.filter(e=>e[0]==Math.min(...arr.map(e=>e[0])))
    return arr[0]
}
    else return Math.min(...arr)
}

function shuffle(a){
    let g=null
    for(let i=0;i<a.length ;i++){
         g=parseInt(Math.random()*10)%a.length;
        [a[i],a[g]]=[a[g],a[i]]
    }
}
function minmax(board,curplayer){
    let m=[];
    let score=null
    let rest=avail(board);
    if (whostart==player1)
    shuffle(rest)
    for ( let i of rest ){
        board[i]=curplayer
        score= whowinval(board)
        if (score!=-2){
            
            return [score,i]
        }
        m.push([...minmax(board.slice(),!curplayer),i])
        
        board[i]=undefined
    }
    if (curplayer==player1){
        return maximize(m.slice())
    }else{
        return minimize(m.slice())
    }

}
function whowin(board,notvirt=1){
    arrxo=board
    if (arrxo[0]==0&&arrxo[1]==0&&arrxo[2]==0){
        if (notvirt){
        td[0].style='background:red'
        td[1].style='background:red'
        td[2].style='background:red'
        }
        return 0;
    }
    else if (arrxo[0]==1&&arrxo[1]==1&&arrxo[2]==1){
        if (notvirt){
        td[0].style='background:red'
        td[1].style='background:red'
        td[2].style='background:red'
        }
    return 1;
    }
    else if(arrxo[3]==0&&arrxo[4]==0&&arrxo[5]==0){
        if (notvirt){
        td[3].style='background:red'
        td[4].style='background:red'
        td[5].style='background:red'
        }
    return 0;
    }
    else if (arrxo[3]==1&&arrxo[4]==1&&arrxo[5]==1){
        if (notvirt){
        td[3].style='background:red'
        td[4].style='background:red'
        td[5].style='background:red'
        }
    return 1;
    }
    else if(arrxo[6]==0&&arrxo[7]==0&&arrxo[8]==0){
        if (notvirt){
        td[6].style='background:red'
        td[7].style='background:red'
        td[8].style='background:red'
        }
    return 0
    }
    else if (arrxo[6]==1&&arrxo[7]==1&&arrxo[8]==1){
        if (notvirt){
        td[6].style='background:red'
        td[7].style='background:red'
        td[8].style='background:red'
        }
    return 1;
    }
    else if (arrxo[0]==0&&arrxo[4]==0&&arrxo[8]==0){
        if (notvirt){
        td[0].style='background:red'
        td[4].style='background:red'
        td[8].style='background:red'
        }
    return 0;
    }
    else if (arrxo[0]==1&&arrxo[4]==1&&arrxo[8]==1){
        if (notvirt){
        td[0].style='background:red'
        td[4].style='background:red'
        td[8].style='background:red'
        }
    return 1;
    }
    else if (arrxo[2]==0&&arrxo[4]==0&&arrxo[6]==0){
        if (notvirt){
        td[2].style='background:red'
        td[4].style='background:red'
        td[6].style='background:red'
        }
    return 0;
    }
    else if (arrxo[2]==1&&arrxo[4]==1&&arrxo[6]==1){
        if (notvirt){
        td[2].style='background:red'
        td[4].style='background:red'
        td[6].style='background:red'}
    return 1
    }
    else if (arrxo[0]==0&&arrxo[3]==0&&arrxo[6]==0){
        if (notvirt){
        td[0].style='background:red'
        td[3].style='background:red'
        td[6].style='background:red'}
    return 0;
    }
    else if (arrxo[0]==1&&arrxo[3]==1&&arrxo[6]==1){
        if (notvirt){
        td[0].style='background:red'
        td[3].style='background:red'
        td[6].style='background:red'
        }
    return 1;
    }
    else if(arrxo[1]==0&&arrxo[4]==0&&arrxo[7]==0){
        if (notvirt){
        td[1].style='background:red'
        td[4].style='background:red'
        td[7].style='background:red'
        }
    return 0;
    }
    else if (arrxo[1]==1&&arrxo[4]==1&&arrxo[7]==1){
        if (notvirt){
        td[1].style='background:red'
        td[4].style='background:red'
        td[7].style='background:red'
        }
    return 1;
    }
    else if(arrxo[2]==0&&arrxo[5]==0&&arrxo[8]==0){
        if (notvirt){
        td[2].style='background:red'
        td[5].style='background:red'
        td[8].style='background:red'
        }
    return 0
    }
    else if (arrxo[2]==1&&arrxo[5]==1&&arrxo[8]==1){
        if (notvirt){
        td[2].style='background:red'
        td[5].style='background:red'
        td[8].style='background:red'
        }
    return 1;
    }
    // else if (arr[0]==1&&arr[1]==1&&arr[2]==1&&arr[3]==1&&arr[4]==1&&arr[5]==1&&arr[6]==1&&arr[7]==1&&arr[8]==1){
    //     return 2;
    // } 
    // else{
    //     return -1
    // } 
    for (i of  board){
        if (i==undefined){
            return -1
        }
    }
    return 2;
}
    
    function paint(r){
           
            if(xo==1&&arr[r]!=1&&!finish){
                let i=x.cloneNode()
                let j=y.cloneNode()
                td[r].append(i);
                td[r].append(j);
                arr[r]=1
                game[r]=1;
                xo=0
            }
            else if(xo==0 &&arr[r]!=1&&!finish){
                let k=o.cloneNode();
                td[r].append(k);
                arr[r]=1
                game[r]=0
                xo=1
            }
            let winner=whowin(game)
           if(winner==0 ){
            if(player1==0)
            addedp.innerText='Player 1 Won'
            else{
                addedp.innerText='Player 2 Won'

            }
            finish=1
            
           }
           else if (winner==1){
            if(player1==1)
            addedp.innerText='Player 1 Won'
            else{
                addedp.innerText='Player 2 Won'

            }
            finish=1
            
           }
           else if(winner==2){
            addedp.innerText='No player Won'
            finish=1
           }
           if (finish) return
           if (!multiplayers){
            if (level=='easy'){
                if (xo==player2){
                    rest=avail(game.slice())
                    rand=Math.abs(parseInt(Math.random()*10)-1)%rest.length
                    paint(rest[rand])
                    return
                    
                }
                else{
                    return
                }
            }
            else{
                if (xo==player2){
                    opt=minmax(game.slice(),xo);
                    paint(opt[opt.length-1])
                    return
                }
                else return
            }
           }
    }
    newgame.onclick=()=>{
        finish=0;
        player1=null
        player2=null
        level=null
        arr=[0,0,0,0,0,0,0,0,0];
        game=[]
        addedp.innerText=''
        for(let i of td){
            i.innerHTML=''
            i.style='background:transparent'
        }
        xo=-1;
        player1=undefined
        game=new Array(9).fill(undefined);
        multiplayers=0
        choose.style.display='block'
        document.querySelector('.cspan').style.display='block'
        document.querySelector('.final').style.display='none'
        playerx.checked=0
        playero.checked=0
        oneplayer.checked=0
        twoplayers.checked=0
        choosed.style="display:none"
        p1start.checked=0
        p2start.checked=0
        document.querySelector('#easy').checked=0
        document.querySelector('#hard').checked=0
        oneOrTwo.style.display="none"
        document.querySelector('.starter').style.display='none'
        document.querySelector('.level').style.display='none'
        whostart=-1
    }

    playagain.onclick=()=>{
        if (whostart==-1)
        return
        game=new Array(9).fill(undefined);
        finish=0;
        arr=[0,0,0,0,0,0,0,0,0];
        for(let i of td){
            i.innerHTML=''
            i.style='background:transparent'
        }
        addedp.innerText=''
        
        xo=whostart
        if (multiplayers==0&&whostart==player2){
            
            paint(parseInt(Math.abs(Math.random()*10)-1))

        }
    }

