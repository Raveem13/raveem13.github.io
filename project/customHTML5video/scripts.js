/*Get our elements*/
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const bufferBar = player.querySelector('.buffer__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const muteButton = player.querySelector('.mutebtn');
const fullScrBtn = player.querySelector('.fullscreen');


/*Build out functions*/
let mute = false;

function togglePlay(){
//    if(video.paused){
//        video.play();
//    }else{
//        video.pause();
//    }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
//    console.log('Update button');
    const icon = this.paused ? '►' : '❚ ❚';
//    console.log(icon);
    toggle.textContent = icon;
    
}

function skip(){
    console.log('skipping!');
    console.log(this.dataset.skip);
    video.currentTime += parseFloat(this.dataset.skip); 
}

function handleRangeUpdate(){
//    console.log(this.name);
//    console.log(this.value);
//    console.log(this);
    
    if((this.name == 'volume') && (this.value == 0) ){
        mute = true;
        console.log(mute);
        
    } else{
        video[this.name] = this.value;
        mute = false;
        volVal = ranges[0].value;
    }
    video.muted = mute;
    updateMutebtn();
}

let percent = 0;
function handleProgress(){
    percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

//fun that updates buffer bar
function handleBuffer(){
//    console.log(video.buffered.end(video.currentTime));
//    console.log(bufferBar);
    var duration =  video.duration;
    if (duration > 0) {
      for (var i = 0; i < video.buffered.length; i++) {
            if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                buffPercent = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100;
//                console.log(buffPercent - percent);
                bufferBar.style.flexBasis = `${(buffPercent - percent)}%`;
                break;
            }
        }
    }
}


function scrub(e){
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

//function muteVideo(){
////    const muteOpt = video.muted ? 'false' : 'true';
////    video.muted = muteOpt;
////    console.log(muteOpt);
//    if(video.muted){
//        video.muted = false;
//        muteButton.textContent = '🔈';
//    }
//    else{
//        video.muted = true;
//        muteButton.textContent = '🔇';
//    }
//    console.log(video.volume);
//        video.volume = 0;
//}

function updateMutebtn(){
    console.log('Update mute button');
    
    const icon = mute ? '🔇' : '🔈';
    console.log(icon);
    muteButton.textContent = icon;
    
}
/*Hook up the event listners*/

video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',() => {handleProgress(); 
                                           handleBuffer();});
toggle.addEventListener('click',togglePlay);


skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));


let mouseDown = false;
progress.addEventListener('click',scrub); ///when mouse clicked on progress

progress.addEventListener('mousedown',() => mouseDown = true); 
progress.addEventListener('mouseup',() => mouseDown = false); 
progress.addEventListener('mousemove',(e) => mouseDown && scrub(e)); //when mouse moves on progress (it's checks mouseDown if it's true runs scrub)


//Boolean muteVideo = video.muted;
let volVal = 1;
muteButton.addEventListener('click',() => {mute = !mute;
                                           video.muted = mute;
                                           console.log(mute);
                                           
//                                           console.log(ranges[0].value);
                                           if(mute){ranges[0].value = 0;
                                                    }else{ranges[0].value = volVal;}
//                                           console.log(mute);
                                           updateMutebtn();
                                          });
                                           

// For making video full screen
function fullScreen(e){
//player.style.height = 100%;
//player.style.width = 100%;
    console.log(player.propertyName);
}

//fullScrBtn.addEventListener('click',fullScreen);


