const gameBoardDisplay = (() => {
    const markerBtnX = document.getElementById('x')
    const markerBtnO = document.getElementById('o')
    let selectedMarker;
    
    markerBtnX.addEventListener('click', () => {
        selectedMarker = 'X'
        console.log(selectedMarker)
        markerBtnX.classList.add('active')
        markerBtnO.classList.remove('active')
    })
    
    markerBtnO.addEventListener('click', () => {
        selectedMarker = 'O'
        console.log(selectedMarker)
        markerBtnO.classList.add('active')
        markerBtnX.classList.remove('active')
    })
    
    const fieldList = document.querySelectorAll('.field')
    fieldList.forEach(field => {
        field.addEventListener('click', () => {
            field.textContent = selectedMarker
            console.log(selectedMarker)
        })
    })
})()
