// Requirements

// (1) 5글자 단어 (존재하는 단어가 아니어도 됨)
// (2) 6번의 시도 가능
// (3) 존재하면 노란색, 위치도 맞으면 초록색으로 표시
// (4) 게임 종료 판단
// (추가) 상단에 게임 시간 표시하기

// (선택) 기보드에도 동일하게 표시
// (선택) 키보드 클릭으로도 입력

const 정답 = "APPLE";

let index = 0;
let attempts = 0;
let timer;

function appStart(){
const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style = 
        "display: flex; justify-contents: center; align-items: center; position: absolute; top: 40vh; left: 38vw; background-color: white; width: 200px; height: 100px;";
    document.body.appendChild(div);
};

    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
        clearInterval(timer);
    };

    const nextLine = () => {
        if(attempts === 6) return gameover();
        attempts += 1;
        index = 0;
    };

    const handleEnterKey = () => {
        let 맞은_개수 = 0;

        for(let i=0; i<5; i++){
            const block = document.querySelector(
                `.board-column[data-index='${attempts}${i}']`
            );
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            if(입력한_글자 === 정답_글자) block.style.background = "#6AAA64";
            else if(정답.includes(입력한_글자)) block.style.background = "#C9B458";
            else block.style.background = "#787C7E";
            block.style.color = "white";
        }

        if(맞은_개수 === 5) gameover();
        else nextLine();
    };

    const handleBackspace = () => {
        if (index  > 0){
            const preBlock = document.querySelector(
                `.board-column[data-index='${attempts}${index - 1}']`
            );
            preBlock.innerText = "";
        }
        if (index !== 0) index -= 1;
    };

    const handleKeydown = (event) => {
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(
            `.board-column[data-index='${attempts}${index}']`
        );

        if (event.key === "Backspace") handleBackspace();

        if (index === 5){
          if(event.key === "Enter") handleEnterKey();
          else return;
        } else if (65 <= keyCode && keyCode <=90) {
          thisBlock.innerText = key;
          index += 1;
        }
    };

    const startTimer = () => {
        const 시작_시간 = new Date();

        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const timerDiv = document.querySelector("#timer");
            timerDiv.innerText = `${분}:${초}`;
        }

        timer = setInterval(setTime, 1000);
        console.log(timer);
    };

    startTimer();
    window.addEventListener("keydown", handleKeydown);
}

appStart();