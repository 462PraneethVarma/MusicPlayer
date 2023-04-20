
    let songInfo = document.getElementById('songInfo');
    let songIndex = 0;
    let audioElement = new Audio('./songs/Bailando.mp3');
   
    let masterPlay = document.getElementById('masterPlay');
    let myProgressBar = document.getElementById('myProgressBar');

    const makeAllPlays= ()=>{
        Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
            element.classList.remove('fa-pause-circle');
            element.classList.add('fa-play-circle');
        })
            
    }

    container = document.getElementsByClassName('container');

    

    let songs = [
        
        {sNo: 0,songName:"Bailando - Enrique Iglesias", filePath: './songs/Bailando.mp3', coverPath:'./covers/c1.jpg'},
        {sNo: 1,songName:"Danza Kuduro - Don Omar",filePath:'./songs/DanzaKuduro.mp3',coverPath:"./covers/danzak.jpg"},
        {sNo: 2,songName:"Sayonara - Sooraj Santosh",filePath:'./songs/1NK.mp3',coverPath:"./covers/MB1.jpg"},
        {sNo: 3,songName:"Whenever Wherever - Shakira",filePath:'./songs/WheneverWherever.mp3',coverPath:"./covers/shak.jpg"},
        {sNo: 4,songName:"Hips Don't Lie - Shakira",filePath:"./songs/HipsDontLie.mp3",coverPath:"./covers/shak.jpg"},
        {sNo: 5,songName:"Waka Waka - Shakira",filePath:'./songs/WakaWaka.mp3',coverPath:"./covers/shak.jpg"},
        {sNo: 6,songName:"CWC 15 Theme - WDL, Mawe",filePath:'./songs/2015cwc.mp3',coverPath:"./covers/cwc15.jpg"},
        {sNo: 7,songName:"Ajab Si - KK",filePath:'./songs/jabSi.mp3',coverPath:"./covers/shar.jpg"},
        {sNo: 8,songName:"Humanos A Marte - Chayyanne",filePath:'./songs/HumanosAMarte.mp3',coverPath:"./covers/c1.jpg"},
    ]

    let songItems = Array.from(document.getElementsByClassName('songItem'));



    // setting up the SongItems : Bailando, Humanos A Marte, DanzaKuduro, Waka Waka, CWC 15 Theme....

    songItems.forEach((element,i)=>{
        element.getElementsByTagName('img')[0].src = songs[i].coverPath;
        element.getElementsByClassName('songNo')[0].innerText = songs[i].songName;
    });

    // Setting up the Master Play Button

    masterPlay.addEventListener('click',()=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            songItems[songIndex].style.backgroundColor = "transparent";
            songItems[songIndex].style.border = "3px solid #1DB954";
            songInfo.innerText = 'Bailando - Enrique Iglesias';        
        }

        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            
        }
    });

    // This section is for playing the songs that are required (i.e.., the songItem that gets clicked will be played)



   
 songEff = Array.from(document.getElementsByClassName('songNo'));
    songItems.forEach((element,i)=>{

        element.addEventListener('click',()=>{
            
            audioElement.currentTime = 0; // the current playing song is getting paused
            audioElement.pause();// the song gets paused
            
            audioElement.src = songs[i].filePath; // assigning the new music(new songItem) to audioElement

            songInfo.innerText = songs[i].songName;// updating the name of song at the bottom bar
            
            songIndex = parseInt(element.id);// song Index is required for Forward and backward operations
            audioElement.play();
            for(j=0;j<songItems.length;j++)
            {
                songItems[j].style.border = "2px solid grey";
                songItems[j].style.backgroundColor = " darkslategray";   
            }
            songItems[i].style.backgroundColor = "transparent"; 
            songItems[i].style.border = "3px solid #1DB954";
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');

                
        })
        element.style.backgroundColor = " darkslategray"
    });

    // FORWARD BUTTON

    masterfrwd = document.getElementById('masterForw');

    masterfrwd.addEventListener('click',()=>{
        if(songIndex === 8){
            songIndex = 0;
        }
        else{
            songIndex += 1;
        }
        
        for(j=0;j<songItems.length;j++)
            {
                songItems[j].style.border = "2px solid grey";
                songItems[j].style.backgroundColor = " darkslategray";   
            }
        songItems[songIndex].style.backgroundColor = "transparent";
        songItems[songIndex].style.border = "3px solid #1DB954";
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();
        songInfo.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');


    });

    // BACKWARD BUTTON 

    masterBack = document.getElementById('masterBack');

    masterBack.addEventListener('click',()=>{
        if(songIndex === 0){
            songIndex = 8;
        }
        else{
            songIndex -= 1;
        }
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        for(j=0;j<songItems.length;j++)
            {
                songItems[j].style.border = "2px solid grey";
                songItems[j].style.backgroundColor = " darkslategray";   
            }
            songItems[songIndex].style.backgroundColor = "transparent";
            songItems[songIndex].style.border = "3px solid #1DB954";
        audioElement.play();
        songInfo.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });



    //  RANGE BAR (OR) PROGRESS BAR
 
    audioElement.addEventListener('timeupdate',()=>{                // it is all about the range bar
        
        progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
        
        myProgressBar.value = progress;

        if(progress === 100){
            if(songIndex === 8){
                songIndex = 0;
            }
            else{
                songIndex += 1;
            }
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            for(j=0;j<songItems.length;j++)
            {
                songItems[j].style.border = "2px solid grey";
                songItems[j].style.backgroundColor = " darkslategray";   
            }
            songItems[songIndex].style.backgroundColor = "transparent";
            songItems[songIndex].style.border = "3px solid #1DB954";
            audioElement.play();
            songInfo.innerText = songs[songIndex].songName;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
       
    })

    myProgressBar.addEventListener('change',()=>{
        audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
        
    })