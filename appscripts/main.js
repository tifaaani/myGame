
require(
    [],
    function () {
        
        var sound = new Audio('resources/folk.mp3');
            sound.loop= true;
            sound.play();

        console.log("yo, I'm alive!");

        var paper = new Raphael(document.getElementById("mySVGCanvas"));

        var pWidth = paper.canvas.offsetWidth -78;
        var pHeight = paper.canvas.offsetHeight -85;

        var clickcount = 0;
        var clickText = paper.text(580,380, "");
        clickText.attr({
            'fill': 'white',
            'font-size': 40,
            'font-family':'sunn'

        });


        var timer = 30;
        var timerText = paper.text(580,28, "");
        timerText.attr({
            'fill': 'white',
            'font-size': 40,
            'font-family':'sunn'

        });

        var startButton = paper.circle(300, 200, 60);
        var startText = paper.text(300, 200, 'START');
        startButton.attr({
        	'stroke': '#ffffff',
            'stroke-width': 5,
        	'fill': '#4cba6f'
        });

        startText.attr({
            'font-family': 'sunn',
            'fill': '#ffffff',
            'font-size': 60
        });

        var jellyfish = paper.image("http://images.clipartpanda.com/cute-jellyfish-clipart-jellyfish_christmas_xmas_stuffed_animal-555px.png",0,0,100,100);
        var posX = pWidth/2;
        var posY = pHeight/2;
        var xrate = 0.8;
        var yrate = 0.8; 
        var difficulty;
       

        var jellyfishmove = function(){

         
            console.log("My first jellyfish is x:"+posX+" and y:"+posY+"");
            
            if(posX>=pWidth||posX<=0)
            {
                xrate=xrate*-1;
                posX= posX+(xrate * difficulty);
                console.log("xrate: "+xrate+" yrate: "+yrate+"");

            }else{
                posX = posX + (xrate * difficulty);
            }

            if(posY>=pHeight||posY<=0)
            {
                yrate=yrate*-1;
                posY=posY+(yrate * difficulty);
                console.log("xrate: "+xrate+" yrate: "+yrate+"");
            }else{
                posY = posY + (yrate * difficulty);
            }

            jellyfish.attr({
                x: posX,
                y: posY
            });

            console.log("My second jellyfish is x:"+posX+" and y:"+posY+"");
        };



        //-----------------------------------------

        startButton.hide();
        startText.hide();

        var ready = function(){
        	startButton.show();
        	startText.show();
            jellyfish.hide();

        }



        var start = function (){
            confirm ("Welcome to 'Catch That Jellyfish!' - The aim of the game is to try and click Steve the moving jellyfish as many times as you can in 30 seconds. Good Luck!")
        	console.log("game is starting...");
            difficulty = prompt("Please enter a number from 1 to 10 to adjust your difficulty - 1 is the easiest and 10 is crazy hard!", "1");
            clickcount = 0;
        	startButton.hide();
        	startText.hide();
            jellyfish.show();
            timerText.show();
            clickText.show();
   
            timerText.attr('text',timer.toString());
            clickText.attr('text',clickcount.toString());
            setInterval(jellyfishmove, 20);



            var displayedTicker = setInterval(function(){
                timer --;
                console.log(""+timer+"");
                timerText.attr('text',timer.toString());
                clickText.attr('text',clickcount.toString());
                if (timer<=0){clearInterval(displayedTicker)};
            }, 1000);

            var myTicker = setTimeout(function(){
                confirm ("Congratulations! You've caught Steve "+clickcount+" times! Play on!");
                    clearInterval(myTicker);
                    timerText.attr('text',"");
                    timerText.hide();
                    clickText.attr('text',"");
                    clickText.hide();
                    timer= timer + 30;
                    clickcount = clickcount - clickcount;
                    ready();
                }, 31000);

        }

        startButton.node.addEventListener('click', start);
        startText.node.addEventListener('click', start);

         var randInt = function( m, n ) {
            var range = n-m+1;
            var frand = Math.random()*range;
            return m+Math.floor(frand);
        }

        var addScore = function(){
            clickcount ++;
            console.log("The clickcount is "+ clickcount +"");
        }

        
        jellyfish.node.addEventListener('click', addScore);

  

        ready(); // Put the start button on the screen 
    }
);