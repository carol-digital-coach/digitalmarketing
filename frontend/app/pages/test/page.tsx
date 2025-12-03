"use client"


export default function TestPage(){
    const time_now = Date.now()
    console.log(time_now + 1.8e+6)
    function updateTime(): void {
        const current_time = time_now + 0.5e+6
        if (time_now >= current_time){
            alert("Time depleted")
        }       
    }
    updateTime()
    return(
        <div
        className="h-screen mt-25"
        >
            <p>The time now is {time_now}</p>
            
        </div>
    )
}