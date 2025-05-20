function cssSetup(){
    const th1=document.getElementById('th1')
    const th2=document.getElementById('th2')
    const th3=document.getElementById('th3')
    const I=document.querySelector('#Innovation_Zone')
    const T=document.querySelector('#Technology_Zone')
    const E=document.querySelector('#Ecology_Zone')
    const ths=document.querySelector('.ths')

    I.setAttribute('style','display:none;');
    E.setAttribute('style','display:none;');
    T.setAttribute('style','display:inline-block;');
    document.getElementById('totalChoicesTable').innerHTML= 'Total number of completed choices: ';
    document.getElementById('time').innerHTML = 'Last change time: ';

    th1.setAttribute('style','background-color:white;color:#845ec2;');
};


function setActiveZone(clicked_th, zoneToShow, zonesToHide) {
    zonesToHide.forEach(zone => {
        document.getElementById(zone).style.display = 'none';});
document.getElementById(zoneToShow).style.display = 'inline-block';
document.querySelectorAll('.ths').forEach(th => {th.style.backgroundColor = '#845ec2'; th.style.color = 'white'; });
clicked_th.style.backgroundColor = 'white';
clicked_th.style.color = '#845ec2';
};

var num=0;
const gapsMap = new Map([
    [1, '1st'],
    [2, '2nd'],
    [3, '3rd']
]);

function updateTable(){
    num++;
    document.getElementById('totalChoicesTable').textContent= 'Total number of completed choices: '+ num;
    document.getElementById('time').innerHTML= 'Last change time: ' + Date();
};

function onSubmit(){
    const error= document.getElementById('error');
    let trows=document.querySelectorAll('tbody tr');
    let first = 1;
    let last = -1;

    if(num==0){
        error.setAttribute('style','color:red;');
        error.innerHTML= 'You have not chosen any company.';
        return;
    }
    for (let i = 9; i >=0; i--){
        if(trows[i].children[0].innerHTML!=''){
            last = i+1;
            break;
        }
    };
    if((last - first + 1) != num){
        let gaps=[]


        for(let j=first-1; j<last;j++){
            if(trows[j].children[0].innerHTML==''){
                gaps.push(j+1);
            }
        };
        error.setAttribute('style','color:red;');
        error.innerHTML='You have not chosen your ' + gaps.map(element => {return gapsMap.get(element) || element + 'th';}) + ' chosen company, you can not leave any gap between your chosen companies'
        return;
    }
    error.setAttribute('style','color: ;');
    error.innerHTML='You have successfully submitted your application at time '+ Date();
    // console.log(first);
    // console.log(last);
    // console.log(num);
    // console.log(gaps);
};

function onClear(){
    const error= document.getElementById('error');
    let trows=document.querySelectorAll('tbody tr');
    for(let i=0;i<=9;i++){
        trows[i].children[0].innerHTML='';
        trows[i].children[1].innerHTML='';
    };
    num=-1;
    updateTable();
    error.innerHTML='';
};


function buttonClick(button){

    const convert = new Map([
        ['first', '1'],
        ['second', '2'],
        ['third', '3'],
        ['forth', '4'],
        ['fifth', '5'],
        ['sixth', '6'],
        ['seventh', '7'],
        ['eighth', '8'],
        ['ninth', '9'],
        ['tenth', '10'],
    ]);
    const form = button.closest('form');
    const value= form.querySelector('input[type="text"]').value.trim();

    var rank;
    if (convert.has(value)){
         rank= parseFloat(convert.get(value));
    }
    else{rank= parseFloat(value)}

    const company = form.querySelector('label').textContent;
    const zone = form.closest('.tr').id.replace('_',' '); 
    
    if(!Number.isInteger(rank)){
        
        alert('Please enter the rank of chosen company');
        return;
    }
    if(rank<1 || rank>10){
        alert('Please enter the rank of chosen between 1 and 10');
        return;
    }

    for (let i = 1; i <= 10; i++) {
        var tableCompany = document.getElementById('company' + i).textContent;
        if(company == tableCompany){
            alert('You have already chosen this company');
            return;
        } 
        else if (i == rank && tableCompany != ''){
            alert('You have already chosen this rank');
            return;
        }};

        if(gapsMap.has(rank)){
            order=gapsMap.get(rank);
        }
        else{order= rank+'th'}

    document.getElementById('zone'+rank).textContent = zone;
    document.getElementById('company'+rank).textContent = company;
    alert('You have chosen '+company+' as your '+order+' chosen compnay in '+zone+' successfully');
    updateTable();
};



function pageload(){
    cssSetup();
    const buttons=document.querySelectorAll('.button');

    th1.addEventListener('click', function() {
        setActiveZone(this, 'Technology_Zone', ['Innovation_Zone', 'Ecology_Zone']);});
    th2.addEventListener('click', function() {
        setActiveZone(this, 'Innovation_Zone', ['Technology_Zone', 'Ecology_Zone']);});
    th3.addEventListener('click', function() {
        setActiveZone(this, 'Ecology_Zone', ['Technology_Zone', 'Innovation_Zone']);});
    
    buttons.forEach(button => {
        button.addEventListener('click', function(event){
            event.preventDefault();
            buttonClick(this);
        });
    });

};


window.onload = pageload;