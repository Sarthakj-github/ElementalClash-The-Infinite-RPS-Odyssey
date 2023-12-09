let userMove='';

let computerMove='';

function generateComputerMove(){
    randNum=Math.random();
    if(randNum<=1/3)   computerMove="Rock";
    else if(randNum<=2/3)  computerMove="Paper";
    else    computerMove="Scissors";
}

let result='';

function evaluateMoves(){
    if(userMove===computerMove) result='Tie';
    else if(userMove==='Rock' && computerMove==='Scissors' || userMove==='Paper' && computerMove==='Rock' || userMove==='Scissors' && computerMove==='Paper')
        result='Win';
    else    result='Lose';
}

const gamescore=JSON.parse(localStorage.getItem('gamescore'))||{
    wins:0,
    loses:0,
    ties: 0
};

const gamehistory=JSON.parse(localStorage.getItem('gamehistory'))|| [];
renderGameSummary();

function updategamescore(){
    if(result==='Win')  gamescore.wins++;
    else if(result==='Lose')  gamescore.loses++;
    else    gamescore.ties++;
    const gamehisitem={userMove:userMove,computerMove:computerMove,result:result};
    gamehistory.push(gamehisitem);

    localStorage.setItem('gamescore',JSON.stringify(gamescore));
    localStorage.setItem('gamehistory',JSON.stringify(gamehistory));
}

function renderGameSummary(c=1){
    const gamesplayed=gamescore.wins+gamescore.loses+gamescore.ties;
    document.getElementById('wins').innerHTML=gamescore.wins;
    document.getElementById('loses').innerHTML=gamescore.loses;
    document.querySelector('#ties').innerHTML=gamescore.ties;
    document.getElementById('gamesplayed').innerHTML=gamesplayed;
    if(c)   renderGameHistory();
}

function renderGameHistory(){
    let finalgamehistory=
    `<tr>
            <th>#</th>
            <th>User Move</th>
            <th>Computer Move</th>
            <th>Result</th>
    </tr>`;
    console.log(`userMove: ${userMove} computerMove: ${computerMove}`);
    console.log(`Result: ${result}`);
    for(let i=gamehistory.length-1;i>=0;i--){
        finalgamehistory+=
        `<tr>
        <td>${i+1}</td>
        <td>${gamehistory[i].userMove}</td>
        <td>${gamehistory[i].computerMove}</td>
        <td>${gamehistory[i].result}</td>
        </tr>`;
    }
    document.querySelector('#gamehistory').innerHTML=finalgamehistory;
}
function resetscores(){
    gamescore.wins=0;
    gamescore.loses=0;
    gamescore.ties=0;
    renderGameSummary(c=0);
}
//     gamenumber:1,
//     usermove:null,
//     computerMove:null,
//     result:null
// }

