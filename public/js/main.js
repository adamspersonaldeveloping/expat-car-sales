document.querySelector('#update').addEventListener('click', showOrNo)

function showOrNo(){
    document.querySelector('#update').classList.toggle("hidden")
    alert('working')
}