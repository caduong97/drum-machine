// select drum pads
const drumpadCol = document.getElementsByClassName('drum-pad'); //this create a html collection of drum-pad class elements, not an array
const drumpads = [...drumpadCol] // by this, converting a html collection to an array
console.log(drumpads);
// select power switch
const power = document.getElementById("power");
const powerSwitch = power.childNodes[1];

// select display pad
const displayPad = document.getElementById("display");

// select volume slider
const volumeSlider = document.getElementById("volume-slider");
let audioVolume = 50;

// select bank switch 
const bank = document.getElementById("bank");
const bankSwitch = bank.childNodes[1];


// function to display power on/off
powerSwitch.onclick = () => {

    if(powerSwitch.checked != true) {
        //display the "power off" on display element
        displayPad.removeChild(displayPad.childNodes[0]); //remove the current display text first
        const powerOff = document.createTextNode("Power Off");
        const displayPowerOff = document.createElement("DIV");
        displayPowerOff.appendChild(powerOff);
        displayPad.appendChild(displayPowerOff);

        console.log("muted");
    } else {
        //remove the "power off" on display element
        displayPad.removeChild(displayPad.childNodes[0]);
        const powerOff = document.createTextNode(""); 
        const displayPowerOff = document.createElement("DIV");
        displayPowerOff.appendChild(powerOff);
        displayPad.appendChild(displayPowerOff);

        console.log("playing");
    }

}


const playDrum = (id) => {
    const audio = document.getElementById(id);
    
    if (powerSwitch.checked == true) {
        
        audio.muted = false;
        audio.volume = audioVolume / 100;
        audio.play();

        //add the class "drum-pad-on-click" the clicked drum pad (the audio parent node) which make it flash orange in 0.5s
        setTimeout(() => { audio.parentNode.classList.add('drum-pad-on-click'); }, 50);
        audio.parentNode.classList.remove('drum-pad-on-click');
        

        //the text according to each of the checked drum pad is displayed on display element
        displayPad.removeChild(displayPad.childNodes[0]); //remove the current display text first
        const drumPadId = document.createTextNode(audio.parentNode.id);
        const displayDrumPad = document.createElement("DIV");
        displayDrumPad.appendChild(drumPadId);
        displayPad.appendChild(displayDrumPad);


        
        
    }
    else if (powerSwitch.checked != true) 
    {
        audio.muted = true;
    }
    
}


// function that performs actions when a drum pad is checked
// !!!!!!!! drumpads.map(i => i.onclick 
const drumPadOnClick  = (event) => {
    const textChild = event.target.innerText;
        // call play drum
        playDrum(textChild);
}

// function that listens to key press
document.addEventListener('keydown', (event) => {
    if (event.defaultPrevented) 
        return;
    
    const key = event.key || event.keyCode;
    // const drumPadWithKey = drumpads.filter(i => i.innerText == key.toUpperCase());

    // call play drum
    playDrum(key.toUpperCase());
});

// function that change the volume by the volume slider
volumeSlider.oninput = function() {
    // output.innerHTML = this.value;
    audioVolume = this.value;

    displayPad.removeChild(displayPad.childNodes[0]); //remove the current display text first
    const drumPadId = document.createTextNode("Volume: " + audioVolume);
    const displayDrumPad = document.createElement("DIV");
    displayDrumPad.appendChild(drumPadId);
    displayPad.appendChild(displayDrumPad);
}

//function to change bank
bankSwitch.onclick = () => {
    if(bankSwitch.checked != true) {
        
    }
}






