console.log(questions.length) // quantos itens ou questoes tenho no array.

// initial date.

let current_question = 0;

showQuestion();

//functions
//OBS: se usar arrow function tem que chamar a função depois de ela ter sido criada para o javascript entender. 
function showQuestion() {
    if (questions[current_question]) {
        let q = questions[current_question];


        // barra de status das questões.

        let pct = Math.floor((current_question) / questions.length * 100);  //arredonda para baixo; 
        document.querySelector('.progress .progress--bar').style.width = `${pct}%`;
        document.querySelector('.progress .progress--bar').style.marginTop = '25px';
        document.querySelector('.progress .progress--bar').style.textAlign = 'center';
        document.querySelector('.progress .progress--bar').style.fontSize = '25px';
        document.querySelector('.progress .progress--bar').style.color = 'blue';
        document.querySelector('.progress .progress--bar').innerHTML = `${pct}%`;
        document.querySelector('.progress .progress--bar').style.margin = `10px 5px 10px 5px`;



        //esconder area de resultado
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml = '';

        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class = "option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
        }


        document.querySelector('.options').innerHTML = optionsHtml;
        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionclickEvent);
        })


        console.log(q.question); //vai no indice 0 e pega o valor da propiedade em seu objeto.
    } else {
        //acabaram as questions.
        document.querySelector('.progress .progress--bar').style.width = '100%'
        mostraResult();
    }
}
let res_correct = 0;
let current_resp = 0;
function optionclickEvent(e) {
    current_resp = parseInt(e.target.getAttribute('data-op'));
    document.querySelector('.progress').style.display = 'block'; // display block faz com que a barra seja ativada após click na resposta.

    if (questions[current_question].answer === current_resp) {
        res_correct++;
        e.target.style.backgroundColor = 'green';
        console.log('acertou');
    } else {
        e.target.style.backgroundColor = 'red';
        console.log('errou');

    }

    setTimeout(() => {
        current_resp++;
        current_question++;
        console.log('voce acertou :', res_correct, 'de', questions.length);
        showQuestion();
    }, 300);

}


// função para mostra os resultados.
function mostraResult() {
    document.querySelector('.questionArea').style.display = 'flex';
    document.querySelector('.scoreArea').style.display = 'flex';
    document.querySelector('.scoreText2').innerHTML = `voce respondeu ${questions.length} e acertou ${res_correct}`;
    let pctCorrect = (res_correct / questions.length * 100);
    document.querySelector('.scorePct').innerHTML = `Percentual de acertos  =  ${pctCorrect}%`;

    if (pctCorrect >= 60) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns';
    } else {
        document.querySelector('.scoreText1').innerHTML = 'Hummm, infelizmente voce não atingiu a média';
        document.querySelector('.scorePct').style.color = 'red';
    }
}


function resetQuestions() {
    document.getElementById('button').addEventListener('click', () => {
    current_question = 0;
    current_resp = 0;
    res_correct = 0;
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.scoreArea').style.display = 'none';

    showQuestion();
    })
}

resetQuestions();
