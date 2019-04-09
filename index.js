document.addEventListener("DOMContentLoaded", ()=>{
  
    let time = new Date();
    let zeroPad = (num) => num.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();

    if (hours > 12) {
        hours -= 12;
    }
    
    
    let hoursSpan = document.querySelector(".clock__hours");
    let minutesSpan = document.querySelector(".clock__minutes");
    let secondsSpan = document.querySelector(".clock__seconds");

    secondsSpan.innerHTML =`${zeroPad(seconds)}`;
    minutesSpan.innerHTML =`${zeroPad(minutes)}`
    hoursSpan.innerHTML =`${zeroPad(hours)}`
    
    function* secGenerator() {
        while(true) {
            seconds++;  
            yield secondsSpan.innerHTML =`${zeroPad(seconds)}`;
            if (seconds === 59) {
                seconds = 0;
                secondsSpan.innerHTML =`${zeroPad(seconds)}`;
                yield* minGenerator();
            }
        }
    }

    function*  minGenerator() {
        minutes++;
        yield minutesSpan.innerHTML =`${zeroPad(minutes)}`;
        if (minutes === 59) {
                minutes = 0;
                minutesSpan.innerHTML =`${zeroPad(minutes)}`
                yield* hourGenerator(); 
        }
        
    }

    function*  hourGenerator() {
        hours++;
        yield hoursSpan.innerHTML =`${zeroPad(hours)}`;
        if (hours === 12) {
            hours = 0;
            hoursSpan.innerHTML =`${zeroPad(hours)}`;
        }

    }
    
    let s = secGenerator();  
    let m = minGenerator();
    let h = hourGenerator();


    
    setInterval(()=>{s.next()}, 1000)
    

});