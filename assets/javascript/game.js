
var game = {
    // Controls overall gameness
    "isActive" : false,
    // control reset game - clear letter states, clear hangman state
    "reset" : function() {
        // deactivate game
        this.isActive = false;
        // reset all letters
        alphabet.forEach(function(thisLetter){
            letters[thisLetter].reset();
        })

        // reset hangman
        hangman.reset();
    },

    // control game setup - grab word, set letter states, set hangman state
    "setUp" : function(){
        // pick a word
        var wordIndex = Math.floor(Math.random() * wordList.length);
        this.currentWord = wordList[wordIndex];

        // Tell the hangman how many letters there are
        hangman.setLetterCount(this.currentWord.length);

        // Tell the letters that they are special now
        for(letterIndex = 0; letterIndex < this.currentWord.length; letterIndex++){
            letterLetter = game.currentWord.charAt(letterIndex);
            letters[letterLetter].setIsAnswer();
        }
        this.isActive = true;
    },
    // there is a word for this type of functio
    "getIsActive" : function(){
        return this.isActive;
    }
}

var hangman = {
    "remainingLetters" : 0,
    "remainingGuesses" : 0,
    // control hangman display
    "reset" : function(){
        this.remainingLetters = 0;
        this.remainingGuesses = 6;
    },
    "badGuess" : function(){

    },
    "youLose" : function(){

    },
    "goodGuess" : function(){

    },
    "setLetterCount" : function(letterCount){
        this.letterCount = letterCount;
    }
}


// I don't know if classes are super overkill here, but I've learned a lot about OOP/OOD since I had the time to play with JS,
// so I wanted to explore it. Also, when did JS get classes? I thought you had to do hackey stuff with the prototype object to do this?!
class letter {
    constructor(letter) {
        // set initial var values
        this.isGuessed = false;
        this.isAnswer = false;
        this.letter = letter;

        // create display tag
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", this.letter);
        newDiv.setAttribute("class", "letter-guessed letter");
        newDiv.innerHTML = this.letter;

        // Decide if we're a left or right letter
        if(alphabetLeft.indexOf(this.letter) != -1)
        {
            var alphabetDiv = document.getElementById("alphabet-left");
        }
        else if(alphabetRight.indexOf(this.letter) != -1)
        {
            var alphabetDiv = document.getElementById("alphabet-right");
        }

        alphabetDiv.appendChild(newDiv);

        // Now that it exists, let's make it easy to select it.
        this.div = document.getElementById(this.letter);

        // Set an onClick to trigger when this div is clicked - that's a guess
        this.div.onclick = function(event){
            letters[this.id].guess();
        }
    }

    reset() {
        // set to default state
        this.isGuessed = false;
        this.isAnswer = false;
        document.getElementById(this.letter)
    }

    setIsAnswer() {
        // sets this as a correct answer
        console.log("I'm special!", this.letter)
    }

    getIsAnswer() {
        // Returns selected state
    }

    guess()
    {
        // This runs when the letter is guessed
        // check if it's guessed
            // if so, check if it's an answer
                // if so, let hangman know
                // if not, let hangman know
    }


}

// I have summoned the *entire* alphabet!
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var alphabetLeft = ["a","b","c","d","e","f","g","h","i","j","k","l","m"];
var alphabetRight = ["n","o","p","q","r","s","t","u","v","w","x","y","z"];
var letters = [];

// BUILD THE LETTERS
alphabet.forEach(function(thisLetter){
    letters[thisLetter] = new letter(thisLetter);
});

// The letters handle their own onClicks, but we need a global onKeyUp to get it from keypress too, since clicking letters sucks
document.onkeyup = function(event){
    try {
        letters[event.key].guess();
    }
    catch {
        // do nothing
    }
};

game.setUp();