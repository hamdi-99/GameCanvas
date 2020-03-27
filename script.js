const FPS = 30;
var bs = 30;
var bx, by;
var xv, yv;
var canvas, context;
var plopx = [];
var plopy = [];
var plops = 10;
var plopxv = [];
var plopyv = [];
var fruitx = [] ;
var fruity = [] ;
var fruits =15 ;
var event;
var maxW =Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.documentElement.clientWidth );
function playGame() {
    for(let i = 0 ; i<3;i++)
    {
        fruitx[i] =  Math.floor(Math.random() * (701 - fruits / 2) + fruits / 2);
        fruity[i]= Math.floor(Math.random() * (501 - fruits / 2) + fruits / 2);
    }
    canvas = document.getElementById("gameCanvas");
    context = canvas.getContext("2d");
    setInterval(update, 1000 / FPS);
    bx = canvas.width / 2;
    by = canvas.height / 2;
    for (let i = 0; i < 20; i++) {
        plopx[i] = Math.floor(Math.random() * (701 - plops / 2) + plops / 2);
        plopy[i] = Math.floor(Math.random() * (501 - plops / 2) + plops / 2);
    }
    xv = Math.floor(Math.random() * 76 + 25) / FPS;
    yv = Math.floor(Math.random() * 76 + 25) / FPS;
    for (let i = 0; i < 20; i++) {
        plopxv[i] = Math.floor(Math.random() * 76 + 25) / FPS;
        plopyv[i] = Math.floor(Math.random() * 76 + 25) / FPS;
    }
    if (Math.floor(Math.random() * 2) === 0) {
        xv = -xv;
    }
    if (Math.floor(Math.random() * 2) === 0) {
        yv = -yv;
    }

    function update() {
        //move the ball
        // bx += xv;
        //by += yv;
        for (let i = 0; i < 20; i++) {
            plopx[i] += plopxv[i];
            plopy[i] += plopyv[i];
        }

        //bounce the ball off each wall
        if (bx - bs / 2 < 0 && xv < 0) {
            xv = -xv;
        }
        if (bx + bs / 2 > canvas.width && xv > 0) {
            xv = -xv;
        }
        if (by - bs / 2 < 0 && yv < 0) {
            yv = -yv;
        }
        if (by + bs / 2 > canvas.height && yv > 0) {
            yv = -yv;
        }

        for (let i = 0; i < 20; i++) {
            if (plopx[i] - plops / 2 < 0 && plopxv[i] < 0) {
                plopxv[i] = -plopxv[i];
            }
            if (plopx[i] + plops / 2 > canvas.width && plopxv[i] > 0) {
                plopxv[i] = -plopxv[i];
            }
            if (plopy[i] - plops / 2 < 0 && plopyv[i] < 0) {
                plopyv[i] = -plopyv[i];
            }
            if (plopy[i] + plops / 2 > canvas.height && plopyv[i] > 0) {
                plopyv[i] = -plopyv[i];
            }
        }
        //plop crush
        for (let i = 0; i < 20; i++) {
            let a = bx - plopx[i];
            let b = by - plopy[i];
            if (Math.sqrt(a * a + b * b) < plops / 2 + bs / 2)
                loose();
        }

        //fruit crush
        for (let i = 0; i < fruitx.length; i++) {
            let a = bx - fruitx[i];
            let b = by - fruity[i];
            if (Math.sqrt(a * a + b * b) < plops / 2 + bs / 2)
                IncScore(i) ;
        }


        //draw background and ball
        context.fillStyle = "#faf4f4";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "yellow";
        context.fillRect(bx - bs / 2, by - bs / 2, bs, bs);
        for (let i = 0; i < fruitx.length; i++) {
            context.fillStyle="green";
            context.beginPath() ;
            context.arc(fruitx[i] , fruity[i] , fruits/2 , 0 , 2*Math.PI );
            context.fill();
        }
        for (let j = 0; j < plopx.length; j++) {
            context.fillStyle = "red";
            context.fillRect(plopx[j] - plops / 2, plopy[j] - plops / 2, plops, plops);
        }

    }
}

function move(e) {
    bx=e.clientX-(maxW-700)/2 ;
    by=e.clientY;
    document.getElementById("p").innerHTML="(" + e.clientX + "," + e.clientY +")" ;
}

function loose() {
    alert("You lost !");
    window.location ="index.html" ;
}

function IncScore(n) {
    let d = document.getElementById("score") ;
    d.innerHTML = (parseInt(d.innerHTML)+1).toString() ;
    fruitx[n] = Math.floor(Math.random() * (701 - fruits / 2) + fruits / 2);
    fruity[n]= Math.floor(Math.random() * (501 - fruits / 2) + fruits / 2);

}

function resetb() {
    bx = canvas.width / 2;
    by = canvas.height / 2;
}
