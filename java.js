let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i=1;i<101;i++)
{let excel=document.createElement('div');
field.appendChild(excel);
excel.classList.add('excel');}

let x=1,
    y=10;
let excel = document.getElementsByClassName('excel');
for (let i=0;i<100;i++)
{
    if (x>10)
    {
        x=1;
        y--;
    }
    excel[i].setAttribute('posX',x);
    excel[i].setAttribute('posY',y);
    x++;
}

function generateSnake()
{
    let randomX=Math.round(Math.random()*7+3);
    let randomY=Math.round(Math.random()*9+1);
    return [randomX, randomY];
}
let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX= "'+ coordinates[0] +'"][posY= "'+ coordinates[1] + '"]'), document.querySelector('[posX= "'+ (coordinates[0]-1) +'"][posY= "'+ coordinates[1] + '"]'), document.querySelector('[posX= "'+ (coordinates[0]-2) +'"][posY= "'+ coordinates[1] + '"]')];

for (let i=0;i<snakeBody.length;i++)
{
    snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

let mouse;

function CreateMouse() {

    function generateMouse()
    {
        let randomX=Math.round(Math.random()*7+3);
        let randomY=Math.round(Math.random()*9+1);
        return [randomX, randomY];
    }
let mouseCoordinates = generateMouse();
mouse = document.querySelector('[posX= "'+ mouseCoordinates[0] +'"][posY= "'+ mouseCoordinates[1] + '"]');

if(mouse.classList.contains('snakeBody') && mouse.classList.contains('head'))
{
    let mouseCoordinates = generateMouse();
    mouse = document.querySelector('[posX= "'+ mouseCoordinates[0] +'"][posY= "'+ mouseCoordinates[1] + '"]'); 
}

mouse.classList.add('mouse');
}
CreateMouse();

let napr='right';
let step = false;
let input =document.createElement('input');
input.setAttribute('readonly', true);
document.body.appendChild(input);
input.style.cssText = `
    margin: auto;
    margin-top: 40px;
    font-size: 20px;
    display: block `;
    let score = 0;
    input.value = `Ваш пивной живот: + ${score} кг`;
function Move()
{
    let coordinates=[snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length-1].classList.remove('snakeBody');
    snakeBody.pop();

    if (napr=='right'){
        if (coordinates[0]<10) {
            snakeBody.unshift(document.querySelector('[posX= "'+ (+coordinates[0]+1) +'"][posY= "'+ coordinates[1] + '"]'));

        }  
        else {
        snakeBody.unshift(document.querySelector('[posX= "1"][posY= "'+ coordinates[1] + '"]'));
        }
        
    }
    else if (napr=='left')  
    {
        if (coordinates[0]>1) {
            snakeBody.unshift(document.querySelector('[posX= "'+ (+coordinates[0]-1) +'"][posY= "'+ coordinates[1] + '"]'));

        }
        else {
        snakeBody.unshift(document.querySelector('[posX= "10"][posY= "'+ coordinates[1] + '"]'));
        }
        
    }
    else if (napr=='up')  
    {
        if (coordinates[1]<10) {
            snakeBody.unshift(document.querySelector('[posX= "'+ (coordinates[0]) +'"][posY= "'+ (+coordinates[1]+1) + '"]'));

        }
        else {
        snakeBody.unshift(document.querySelector('[posX= "'+ (coordinates[0]) +'"][posY= "1"]'));
        }
        
    }

    else if (napr=='down')  
    {
        if (coordinates[1]>1) {
            snakeBody.unshift(document.querySelector('[posX= "'+ (coordinates[0]) +'"][posY= "'+ (coordinates[1]-1) + '"]'));

        }
        else {
        snakeBody.unshift(document.querySelector('[posX= "'+ (coordinates[0]) +'"][posY= "10"]'));
        }
        
    }

    if (snakeBody[0].getAttribute('posX')== mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY')== mouse.getAttribute('posY'))
    {
        mouse.classList.remove('mouse');
        let a=snakeBody[snakeBody.length-1].getAttribute('posX');
        let b=snakeBody[snakeBody.length-1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX= "'+ a +'"][posY= "'+ b +'"]'));
        CreateMouse();
        score++;
        input.value = `Ваш пивной живот: + ${score} кг`;
    }

    if (snakeBody[0].classList.contains('snakeBody'))
    {
        setTimeout(()=> {
            alert('Хватит пить пиво!');
        },200);
        
        clearInterval(interval);
    }

    snakeBody[0].classList.add('head');
    for (let i=0;i < snakeBody.length; i++)
    {
        snakeBody[i].classList.add('snakeBody');
        if (snakeBody[i].getAttribute('posX')== mouse.getAttribute('posX') && snakeBody[i].getAttribute('posY')== mouse.getAttribute('posY')) 
        {mouse.classList.remove('mouse');
            CreateMouse();}
    }
step=true;
}
let interval = setInterval(Move,300);

window.addEventListener('keydown',function (e) {
    if (step==true)
    {
        if (e.keyCode=='37' && napr!='right')
        {napr='left';
        step=false;}
        else if (e.keyCode=='38'&& napr!='down')
        {napr='up';
        step=false;}
        else if (e.keyCode=='39'&& napr!='left')
        {napr='right';
        step=false;}
        else if (e.keyCode=='40'&& napr!='up')
        {napr='down';
        step=false;}
}
});