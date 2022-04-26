let searchButton = document.querySelector("#srch_button");
let searchInput = document.querySelector("#srch_input");
let date;

document.addEventListener("DOMContentLoaded", ()=>{
    getDate();
    document.getElementById("srch_input").value = date;
    sendApiRequest();
});

searchButton.addEventListener("click", ()=>{
    sendApiRequest();
})

searchInput.addEventListener("change", ()=>{
    setDate();
})

function getDate()
{
    date = localStorage.getItem('date');
    if(date === null)
    {
        date = new Date();
        let dd = String(date.getDate()).padStart(2, '0');
        let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = date.getFullYear();
        date = yyyy + '-' + mm + '-' + dd;
        localStorage.setItem('date', `${date}`);
    }
}

function setDate()
{
    date = document.getElementById('srch_input').value;
    localStorage.removeItem('date');
    localStorage.setItem('date', `${date}`);
}

async function sendApiRequest()
{
    if (Date.parse(`${date}`))
    {
        let API_KEY = "IiQb7qkMOZGkzyPwS3lgbjTMtjRb5jhDugdBImp2";
        let response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`);
        let data = await  response.json();
        if(response.status === 400)
        {
            document.querySelector("#content").innerHTML = `<h1>Error: ${data.msg}</h1>`;
        }
        else
        {
            document.querySelector("#content").innerHTML = `<h1>${data.title}</h1>`;
            document.querySelector("#content").innerHTML += `<p>${data.explanation}</p>`;
            document.querySelector("#content").innerHTML += `<img src="${data.url}"/>`;
        }
    }
    else
    {
        document.querySelector("#content").innerHTML = `<h1>"${date}" is not Date!</h1>`;
    }
}