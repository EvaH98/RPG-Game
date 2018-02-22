//Make an array of playable characters
//Object the characters to specify their specs

//1. Have the player choose a character 
//2. Once the player chooses a character, have said character move to the "Your Character" Section and begin the game
//3. Just as the chosen character has been moved to the designated area, have the rest of the chracters not chosen move to the enemies section
//4. After everyone is settled, have player choose on opponent.
//5. Opponent is now moved to the defender area
//6. Have player click the attack button to fight the enemy in the defender area
//7. When the player clicks attack, the enemies HP will go down but they will counter attack too, lowering your HP as well.
//8. Keep hitting the attack button in an effort to defeat the defendor
//9. If the enemy's HP goes down to zero, they have been defeated and will be removed from the defendor area.
//10. Have player choose another enemy 
//11. Repreat steps 7 and 8 until there a no more enemies or if the player's HP has gone to 0.
//12. If the player defeats all enemies, alert them that they have won, if not then alert them that they have lost

//Global Variables for Game FLow
var charSelected = false;
var yourChar;

var enemySelected = false;
var yourEnemy;
var enemyName;
var readyToAttack = false;

var bodyCount = 0;


//Global Variables for Character attributes
var yourHealth;
var enemyHealth;


//Enemy Counter Attacks
var enemyAttack;
var brideCountAttack = 20;
var billCountAttack = 17;
var orenCountAttack = 12;
var elleCountAttack = 9;

//Chosen Player Counter Attacks
var yourAttack = 0;
var yourBaseAttack;
var brideBaseAttack = 20;
var billBaseAttack = 10;
var orenBaseAttack = 7
var elleBaseAttack = 5;


$(document).ready(function() {
    // all custom jQuery will go here

	//Move Characters to Enemy Div on Selection of your chracter
	$(".stats_card").on("click", function(){ 
		if(charSelected === false){

			//Remove any old Battle commentary
			$('.commented').remove();

			//Blindly move all characters to enemy section
			$("#bride").appendTo("#enemy_list").addClass("enemy_stats_card");
			$("#bill").appendTo("#enemy_list").addClass("enemy_stats_card");
			$("#oren").appendTo("#enemy_list").addClass("enemy_stats_card");
			$("#elle").appendTo("#enemy_list").addClass("enemy_stats_card");


			//Move slected chracter back to your div
			$(this).removeClass("enemy_stats_card").addClass("your_stats_card").appendTo("#char_list");


			//Collect id of your character and attributes
			yourChar = this.id;
			yourHealth = $(this).attr('value');

			//Set your base attack 

			if(yourChar == 'bride'){
				yourBaseAttack = brideBaseAttack;
			}
			if(yourChar == 'bill'){
				yourBaseAttack = billBaseAttack;
			}
			if(yourChar == 'oren'){
				yourBaseAttack = orenBaseAttack;
			}
			if(yourChar == 'elle'){
				yourBaseAttack = elleBaseAttack;
			}


			//Change global variable and return
			charSelected = true;
			return;
		}
	});


	//Move Selected Enemy to Defender Div 
	$(".stats_card").on("click", function(){
		if(this.id != yourChar && enemySelected == false){

			//Move enemy to defend area
			$(this).appendTo("#defend_list").removeClass('enemy_stats_card').addClass('defender_stats_card');

			//Collect id of your enemy and attributes
			yourEnemy = this.id;
			enemyHealth = $(this).attr('value');

			//Remove any old Battle commentary
			$('.commented').remove();

			//Change global variable and return 
			enemySelected = true;
			readyToAttack = true;
			return;
		}

	});

	//Let the fight begin!
	$("#attack").on("click", function(){

		if(readyToAttack){

			//Tests if your character and defender are alive
			if(yourHealth > 0 && enemyHealth > 0){
				//Remove any old Battle commentary 
				$('.commented').remove();

				//Increase your attack
				yourAttack += yourBaseAttack;



				//Determine Enemy Counter Attack
				if(yourEnemy == 'bride'){
					enemyAttack = brideCountAttack;
				}
				if(yourEnemy == 'bill'){
					enemyAttack = billCountAttack;
				}
				if(yourEnemy == 'oren'){
					enemyAttack = orenCountAttack;
				}
				if(yourEnemy == 'elle'){
					enemyAttack = elleCountAttack;
				}

				//Fight Logic 
				yourHealth = yourHealth - enemyAttack;
				enemyHealth = enemyHealth - yourAttack;

				//Change Enemy Stats on the screen 
				if(yourEnemy == 'bride'){
					$('#bride_hp').html(enemyHealth);
					enemyName = "The Bride";
				}
				if(yourEnemy == 'bill'){
					$('#bill_hp').html(enemyHealth);
					enemyName = "Bill";
				}
				if(yourEnemy == 'oren'){
					$('#oren_hp').html(enemyHealth);
					enemyName = "Oren Ishii"
				}
				if(yourEnemy == 'elle'){
					$('#elle_hp').html(enemyHealth);
					enemyName = "Elle Driver"
				}


				//Change your stats on the sceen
				if(yourChar == 'bride'){
					$('#bride_hp').html(yourHealth);
				}
				if(yourChar == 'bill'){
					$('#bill_hp').html(yourHealth);
				}
				if(yourChar == 'oren'){
					$('#oren_hp').html(yourHealth);
				}
				if(yourChar == 'elle'){
					$('#oren_hp').html(yourHealth);
				}


				//Display battle commentary 
				$('#battle_comments').append("<p class = 'commented'>You attacked " + "<span class = inline_bold>" + enemyName + "</span>" + " for " + "<span class = inline_bold>" + yourAttack + "</span>" + " damage.</p>");
				$('#battle_comments').append("<p class = 'commented'>" + enemyName + " attacked <span class = inline_bold>you</span> back for " + "<span class = inline_bold>" + enemyAttack + "</span>" + " damage.</p>");

			}

			//If you lose, you are dead
			if(yourHealth <= 0) {

				//Remove any old battle commentary
				$('.commented').remove();


				//Display losing message
				$('#battle_comments').append("<p>You have been defeated... Game Over!</p>");
				$('#battle_comments').append("<button id = 'restart'>Try Again!</button>");


					//Restart the page for loss
					$("#restart").on("click", function(){
						location.reload();
					});

				//Change global variables and return
				readyToAttack = false;
				return;
			}


			//If the defender is dead you win
			if(enemyHealth <= 0){

				//Increase body count
				bodyCount += 1;

				//Removeany old battle commentary
				$('.commented').remove();

				//Shhh...hide the dead body
				if(yourEnemy == 'bride'){
					$('#bride').addClass('hide_dead_enemy');
					enemyName = "The Bride";
				}
				if(yourEnemy == 'bill'){
					$('#bill').addClass('hide_dead_enemy');
					enemyName = "Bill";
				}
				if(yourEnemy == 'oren'){
					$('#oren').addClass('hide_dead_enemy');
					enemyName = "Oren Ishii";
				}
				if(yourEnemy == 'elle'){
					$('#elle').addClass('hide_dead_enemy');
					enemyName = "Elle Driver";
				}

				//Check to see if all enemies are dead
				if(bodyCount < 3){

					//Ask user to challenge someone else
					$('#battle_comments').append("<p class = 'commented'>You have defeated " + "<span class = inline_bold>" + enemyName + "</span>" + ", choose another opponent!</p>");


					//change global variable and return
					readyToAttack = false;
					enemySelected = false;
					return;
				} else {

					//Remove any old Battle commentary 
					$('.commented').remove();

					$('#battle_comments').append("<p class = 'commented'>You have defeated everyone! You Win!</p>");
					$('#battle_comments').append("<button id = 'replay'>Play Again?</button>");

						//Restart the page 
						$("#replay").on("click", function(){
							location.reload();
						});

					//Change global variable and return
					readyToAttack = false;
					return;
				}

			}

		}

		//If No Character is Selected 

		else if(charSelected == false){
			// Remove any old Battle commentary
			$('.commented').remove();
			$('#replay').remove();

			// Display idiot message
			$('#battle_comments').append("<p class = commented>No player selected! Please click on your character!</p>");
		}
		//No enemy to attack 
		else if(enemySelected == false){
			// Remove any old Battle commentary
			$('.commented').remove();
			$('#replay').remove();

			// Display idiot message
			$('#battle_comments').append("<p class = commented>No enemy here! Please click on your opponent!</p>");
		}

	});
 });