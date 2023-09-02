console.log("Welcome to spotify");

//Initialise the variables//
let songIndex = 0;
let audioElement = new Audio('/assets/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Sizume" , filepath: "/assets/1.mp3", coverPath: "/assets/M1.png"},
    {songName: "Nagila-Nagila" , filepath: "/assets/2.mp3", coverPath: "/assets/M2.png"},
    {songName: "Mere-Humsafar" , filepath: "/assets/3.mp3", coverPath: "/assets/M3.png"},
]

songItems.forEach((element, i)=>{
      element.getElementsByTagName("img")[0].src = songs[i].coverPath;
      element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// audioElement.play(); //

// Handle play/pause click //

masterPlay.addEventListener('click', ()=>{
    if ( audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.add("fa-circle-play");
        masterPlay.classList.remove("fa-circle-pause");
        gif.style.opacity = 0;
    }
})
// Listen to events //
audioElement.addEventListener('timeupdate', ()=>{
     // Update seekbar //
      Progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    
      myProgressBar.value = Progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeallPlays = ()=>{

    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-cirle-pause');
        element.classList.add('fa-cirle-play');        
})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeallPlays();
    
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = '/assets/$(songIndex+1).mp3' ;
        masterSongName.innerText=songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=2){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src='/assets/$(songIndex+1).mp3' ;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
     masterPlay.classList.add('fa-circle-pause');

}
)

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=2){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src='/assets/$(songIndex+1).mp3' ;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');

})

