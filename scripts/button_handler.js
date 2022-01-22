let btn = document.getElementById('button')

function calculateButtonPosition(){
    let w = ((window.innerWidth-btn.clientWidth) / 2)
    let h = (window.innerHeight-btn.clientHeight) + 50

    btn.style.left = w + 'px'
    btn.style.top = h + 'px'

}


calculateButtonPosition()
window.addEventListener('resize', calculateButtonPosition, true);
btn.addEventListener('click', ()=>{
    document.getElementById('links').scrollIntoView(true)
})

btn.addEventListener('mouseover', ()=>{
    btn.style.top = (window.innerHeight-btn.clientHeight) + 'px'
    btn.style.opacity = 1.0

})

btn.addEventListener('mouseout', ()=>{
    btn.style.top = (window.innerHeight-btn.clientHeight + 50) +  'px'
    btn.style.opacity = 0.6

})

document.addEventListener('scroll', function(e) {
    if(window.scrollY === 0){
        btn.style.visibility = "visible"; 
    }
    else{
        btn.style.visibility = "hidden"; 
    }
})
