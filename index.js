document.addEventListener("DOMContentLoaded", ()=>{
  
    let time = new Date();
    let zeroPad = (num) => num.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

    let sec = time.getSeconds();
    let min = time.getMinutes();
    let hr = time.getHours()
    
    let hoursSpan = document.querySelector(".clock__hours");
    let minutesSpan = document.querySelector(".clock__minutes");
    let secondsSpan = document.querySelector(".clock__seconds");

    secondsSpan.innerHTML =`${zeroPad(sec)}`;
    minutesSpan.innerHTML =`${zeroPad(min)}`
    hoursSpan.innerHTML =`${zeroPad(hr)}`
    
    function* secGenerator(seconds) {
        while(true) {
            seconds++;  
            yield secondsSpan.innerHTML =`${zeroPad(seconds)}`;
            if (seconds === 59) {
                seconds = 0;
                secondsSpan.innerHTML =`${zeroPad(seconds)}`;
                yield* m;
            }
        }
    }

    function*  minGenerator(minutes) {
        minutes++;
        yield minutesSpan.innerHTML =`${zeroPad(minutes)}`;
        if (minutes === 59) {
                minutes = 0;
                minutesSpan.innerHTML =`${zeroPad(minutes)}`
                yield* h; 
        }
        
    }

    function*  hourGenerator(hours) {
        hours++;
        yield hoursSpan.innerHTML =`${zeroPad(hours)}`;
        if (hours === 11) {
            hours = 0;
            hoursSpan.innerHTML =`${zeroPad(hours)}`;
        }

    }
    
    let s = secGenerator(sec);  
    let m = minGenerator(min);
    let h = hourGenerator(hr);


    
    setInterval(()=>{s.next()}, 1000)
    

});