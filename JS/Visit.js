
function onSubmit(date,time,number){
    if(!date || !time || !number || number.trim() === ''){
        error.innerHTML='Data not completed; please re-enter';
    }
    else if(number<1 || !Number.isInteger(parseFloat(number.trim()))){
        error.innerHTML='Please enter a valid number of people!';
    }
    else{
        error.innerHTML='';
        if(reserve(date, time,number)){
            setTimeout(() => {
                alert('Your reservation is successful!');
            }, 100); }
        else{
            setTimeout(() => {
                alert('Sorry, the reservation is full!');
            }, 100);
        }
    }
};

function onReset(){
    error.innerHTML='';
};

function pageload(){
    const error = document.getElementById('error');
    const submit = document.getElementById('submit');
    const reset= document.getElementById('reset');
    error.setAttribute('style','color:red;text-align:center;');

    submit.addEventListener('click', function(event) {
        event.preventDefault()

        const date = document.getElementById('d1').value;
        const time = document.getElementById('t1').value;
        const number = document.getElementById('n1').value;

        onSubmit(date,time,number);
    });
    
};

window.onload=pageload;

