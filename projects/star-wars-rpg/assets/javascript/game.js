console.log("i am ready");
var allFighters = [{ name: "Mace Windu", hp: 150, atk: 8, counter: 20, alive: true, picked: false },
{ name: "Kylo Ren", hp: 100, atk: 6, counter: 10, alive: true, picked: false },
{ name: "Jango Fett", hp: 130, atk: 10, counter: 5, alive: true, picked: false},
{ name: "Yoda", hp: 175, atk: 12, counter: 15, alive: true, picked: false}];
//Fighters left is intialized to be the same as all fighters. Items will be removed from this index as they are picked/defeated
// var fightersLeft =  [{ name: "Mace Windu", hp: 150, atk: 8, counter: 25, alive: true, picked: false },
// { name: "Kylo Ren", hp: 100, atk: 6, counter: 10, alive: true, picked: false }];

var fighterSelected = false;
var score = 0;

var playerFighter = {
    indexofFighter: 0,
    setindexofFighter: function (index) {
        this.indexofFighter = index;
    },
    playerHP: 1,
    setplayerHP: function () {
        this.playerHP = allFighters[this.indexofFighter].hp;
    },
    playerAtk: 1,
    setplayerAtk: function () {
        this.playerAtk = allFighters[this.indexofFighter].atk;
    },
    dying: false,

    attack: function () {
        //Subtract current pAtk from defenders health
        enemyFighter.enemyHP -= this.playerAtk
        //if the enemies hp is below zero, change the value of killed in the enemy object to true
        if (enemyFighter.enemyHP <= 0) {
            score++;
            enemyFighter.killed = true;
            $("#info").append("<p  style='margin-bottom: 0px'>You have defeated " + allFighters[enemyFighter.indexofEnemy].name + ", you can now take on a new opponent</p>");
            this.playerAtk += allFighters[this.indexofFighter].atk;
            if (score === 3){
                $("#info").html("<p style='margin-bottom: 0px'> Every challenger has been defeated!</p>")
            }
            $("#defender > div > .healthpoints").text("");
        }
        else{
            $("#info").append("<p style='margin-bottom: 0px'>You attacked " + allFighters[enemyFighter.indexofEnemy].name + " for " + this.playerAtk + " damage. </p>");
            $("#defender > div > .healthpoints").text(enemyFighter.enemyHP);
            debugger
            var width = $("#defender > div > .healthbar-background").width()*( enemyFighter.enemyHP/ allFighters[enemyFighter.indexofEnemy].hp);
            $("#defender > div > div > .healthbar").animate({width: width},500);
        }
        
        this.playerAtk += allFighters[this.indexofFighter].atk;
    },
    die: function () {
        if (this.dying) {
            // cause the game to end
            fighterSelected = false;
            alert("you have died")
        }
    }
}

var enemySelected = false;
var enemyFighter = {
    indexofEnemy: 0,
    enemyHP: 1,
    setindexofEnemy: function (index) {
        this.indexofEnemy = index;
    },
    setenemyHP: function () {
        this.enemyHP = allFighters[this.indexofEnemy].hp;
    },
    enemyAtk: 1,
    setenemyAtk: function () {
        this.enemyAtk = allFighters[this.indexofEnemy].counter;
    },
    counterAtk: function () {
        //subtract enemies counter attack from players hp
        playerFighter.playerHP -= this.enemyAtk;
        //if the player's hp has fallen below zero, change the value of dying in the player object to true
        if(playerFighter.playerHP <=0){
            playerFighter.dying=true;
            $("#info").append("<p  style='margin-bottom: 0px'>" + allFighters[this.indexofEnemy].name + " attacked you back for " + this.enemyAtk + " damage. </p>");
            $("#info").append("<p  style='margin-bottom: 0px'>You have been defeated!!!</p>");
            $("#player > div > .healthpoints").text("");
            $("#player > div > div > .healthbar").animate({width: 0+"px"},500);
        }
        else{
            $("#info").append("<p  style='margin-bottom: 0px'>" + allFighters[this.indexofEnemy].name + " attacked you back for " + this.enemyAtk + " damage. </p>");
            $("#player > div > .healthpoints").text(playerFighter.playerHP);
            var width = $("#player > div > .healthbar-background").width()*( playerFighter.playerHP/ allFighters[playerFighter.indexofFighter].hp);
            $("#player > div > div > .healthbar").animate({width: width},500);
        }
    },
    killed: false,
    kill: function () {
        if (this.killed) {
            //remove the enemy from the dom
            enemySelected = false;
            $("#defender").attr("style","visibility: hidden;");
            $("#defender > div > img").attr("src", "assets/images/placeholder.png");
            if (score === 3){
                $("#instructions").text("You have won! Click the reset button to play again!")
            }
            else{
                $("#instructions").text("Choose the defender!")
            }
        }
    }

}
//This function will add a character to the dom for every charater in the array passed to it
var populateFighters = function(arr){
    $.each(arr, function(i, fighter){
        $("#char-selection").append('<div class="col-2 character" value='+ i + '>'+ 
        '<img class="img-fluid selection-outline" src="assets/images/' + arr[i].name.split(' ').join('').toLowerCase() + '.jpg" alt="playercharacter"/>'+
        '<h6 class="healthpoints text-center" style="bottom: 1%">'+ arr[i].hp +'</h6><h6 class="char-name text-center">' + arr[i].name + '</h6></div>');
    })
}

$(document).ready(function () {
    populateFighters(allFighters);
    //When one of the character icons is clicked this function will be called
    $(document).on("click",".character", function () {
        //If the player has not yet chosen their character, the player character object will have its values reassigned to the same values as the character the player clicked on
        //after that the player will no longer be able to select a fighter
        if (!fighterSelected) {
            var index = parseInt($(this).attr("value"));
            playerFighter.setindexofFighter(index);
            playerFighter.setplayerAtk();
            playerFighter.setplayerHP();
            $("#player").attr("style","visibility: visible;");
            $("#player > div > .char-name").text(allFighters[index].name);
            $("#player > div > img").attr("src", ("assets/images/") + allFighters[index].name.split(' ').join('').toLowerCase() + ".jpg"); //changing the image for the selected fighter
            $("#player > div > .healthpoints").text(playerFighter.playerHP);
            $("#player > div > div > .healthbar").width(100+"%");
            fighterSelected = true;
            // fightersLeft.splice(index,1);
            $(this).remove();//Selection can no longer be made
            $("#char-selection > div > img").attr("style", "border: 5px solid red");
            $("#instructions").text("Choose the defender!")
        }
        //If the player has already chosen their character and they click on a different character, if they are not currently fighting an enemy, the enemy fighter object
        //will have it's values reassigned to the values of the character the player clicked on. The player will not be able to select another enemy until they have defeated
        //the current enemy
        else if (!enemySelected){
            enemyFighter.killed = false;
            var index = parseInt($(this).attr("value"));//grabing the value attribute assigned when the character elements were first added to the dom
            enemyFighter.setindexofEnemy(index);
            enemyFighter.setenemyAtk();
            enemyFighter.setenemyHP();
            $("#defender").attr("style","visibility: visible;");
            $("#defender > div > .char-name").text(allFighters[index].name);
            $("#defender > div > img").attr("src", ("assets/images/") + allFighters[index].name.split(' ').join('').toLowerCase() + ".jpg");//changing the image for the selected enemy
            $("#defender > div > .healthpoints").text(enemyFighter.enemyHP);
            $("#defender > div > div > .healthbar").stop(true, true);
            $("#defender > div > div > .healthbar").width(100+"%");
            enemySelected = true;
            $(this).remove();//Selection can no longer be made
            $("#instructions").text("Defeat the defender!")
            $("#info").empty();
        }
    });
    $("#attack").on("click",function(){
        //If the player has chosen their character and the defender 
        if(enemySelected && fighterSelected){
            //The player fighter attacks the enemy fighter
            $("#info").empty();
            playerFighter.attack();
            
            //The enemy fighter is checked to see if it should be killed
            enemyFighter.kill();
            //If the enemy is still alive, it will counter attack the player
            if(!enemyFighter.killed){
                enemyFighter.counterAtk();   
                //The player character will be checked to see if it should die
                playerFighter.die();
            }
        }
        
    });
    //When the reset button is pressed, the flag booleans are reset, and the score reset. The relevant
    //DOM elements are also updated. The player and enemy objects will not be reset until the player chooses
    // their character and the defender again. 
    $("#reset").on("click", function(){
        fighterSelected = false;
        enemySelected = false;
        playerFighter.dying = false;
        enemyFighter.killed - false;
        score =0;
        $("#char-selection").empty();
        populateFighters(allFighters);
        $("#player").attr("style","visibility: hidden;");
        $("#defender").attr("style","visibility: hidden;");
        $("#instructions").text("Choose the character that you want to fight as!")
        $("#info").empty();
        debugger
    });
    debugger

});