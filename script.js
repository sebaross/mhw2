/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const risposte = {}; //memorizziamo l'id delle risposte possibili

/* Aggiunge un listener a tutti gli elementi della griglia di scelta */
const boxes = document.querySelectorAll('.choice-grid div');
for (const box of boxes) {
    box.addEventListener('click', onBoxClick);
}

/* Funzione per resettare la selezione delle opzioni del quiz */
function resettaQuiz(){
    for (const key in risposte) {
        delete risposte[key];
    }
    const hyde = document.querySelector('#result');
    hyde.classList.add('hidden');
    for (const box of boxes) {
        box.classList.remove('opacity');
        box.classList.remove('selected');
        box.addEventListener('click', onBoxClick);
        box.querySelector('.checkbox').src = "images/unchecked.png";
    }
    scrollTo(0, 0);
}

/* Funzione che seleziona quale risposta inserire in relazione alle scelte dell'utente */
function chooseResult(){
    if(risposte.two === risposte.three)
        return risposte.two;
    return risposte.one;
}

/* Funzione che mostra i possibili risultati e in seguito inserisce l'event listener al bottone per resettare il quiz */
function showResults(key){
    const show = document.querySelector('#result');
    show.querySelector('h1').textContent = RESULTS_MAP[key].title;
    show.querySelector('p').textContent = RESULTS_MAP[key].contents;
    show.classList.remove('hidden');

    const button = document.querySelector('#button');
    button.addEventListener('click',resettaQuiz);
    window.scrollTo(0, document.body.scrollHeight);
}

/* Funzione che rende opache tutte le scelte non selezionate */
function opacità(selected){
    const usAnswerId = selected.dataset.choiceId;
    const answers = selected.parentNode.querySelectorAll('div');
    for (const ans1 of answers) {
        if(ans1.dataset.choiceId !== usAnswerId){
            ans1.classList.add('opacity');
            ans1.querySelector('.checkbox').src = "images/unchecked.png";
            ans1.classList.remove('selected');
        }
    }
}

/* Funzione che regola la selezione delle scelte */
function onBoxClick(event){
    console.log("selezionato"); //controllo che funzioni
    const box = event.currentTarget;
    // inserisco checkbox
    box.querySelector('.checkbox').src = "images/checked.png";
    //abilito lo stile selected
    box.classList.add('selected');
    //disabilito lo stile opaco se c'era stata una scelta precedente mediante la funzione opacità
    box.classList.remove('opacity');
    opacità(box);
    //memorizzo la risposta dell'utente nella mappa
    risposte[box.dataset.questionId] = box.dataset.choiceId;
    //disabilito la possibilità di premere se ho scelto tutto e mostro il risultato
    if(risposte.one && risposte.two && risposte.three){
        for (const box of boxes) {
            box.removeEventListener('click',onBoxClick);
        }
        console.log('Finito selezione'); //debug
        showResults(chooseResult());
    }
}