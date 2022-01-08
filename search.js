const $container = document.querySelector(".container");
const $btn = document.getElementById("btn");
const $inputSearch = document.querySelector(".input-search")
const $btnSearch = document.getElementById("btnSearch");


window.onload = async () => {
    try {
        $container.insertAdjacentHTML("beforebegin", "<h1 class='h1-search'><i class='fas fa-exclamation-triangle'></i> Nothing has been searched for</h1>");
    }

    catch (error) {
        console.log(error)
        alert("Ocurrio un error, lo siento")
    }
}


const contentHtml = (json, jsonFirstSeen) => {
    let html = `
    <div class="card" style="width: 18rem;">
        <img src="${json.results[count].image}" loading="lazy" class="img-fluid">
        <div class="card-body">
            <b class="card-title">${json.results[count].name}</b>
            <br>
            <span>${json.results[count].status} - ${json.results[count].species}</span>
            <br>
            <br>
            <div class="last" style="color: #9E9E9E;">Last known location: <br><span style="color: #f5f5f5;">${json.results[count].location.name}</span></div>
            <br>
            <br>
            <div class="first" style="color: #9E9E9E;">First seen in: <br><span style="color: #f5f5f5;">${jsonFirstSeen.name}</span></div>
            <br>
            <span>ㅤㅤ</span>
        </div>
    </div>
    `

    $container.insertAdjacentHTML("beforebegin", html)
}


$btnSearch.addEventListener("click", async () => {
    countPage = 0;
    let card = document.getElementsByClassName("card");
    let h1Search = document.querySelector(".h1-search");
    
    h1Search.style.fontSize = "0px"

    for (let element of card) {
        setTimeout(() => {
            element.remove();
        }, 1000);
    }


    try {
        let api = await fetch(`https://rickandmortyapi.com/api/character/?page=${countPage}&name=${$inputSearch.value}`);
        let json = await api.json();

        let apiFirstSeen = await fetch(json.results[19].episode[0])
        let jsonFirstSeen = await apiFirstSeen.json();


        count = -1;


        json.results.forEach(() => {
            count++;
            contentHtml(json, jsonFirstSeen);
        })

    }

    catch (error) {
        console.log(error)
        alert("An error has occurred")
    }
})

countPageMore = 2;

$btn.addEventListener("click", async () => {
    try {
        let api = await fetch(`https://rickandmortyapi.com/api/character/?page=${countPageMore}&name=${$inputSearch.value}`);
        let json = await api.json();

        if (json.info.pages == countPageMore) {
            alert("You got to the end")
        }else {
            countPageMore += 1;
        
            let apiFirstSeen = await fetch(json.results[19].episode[0])
            let jsonFirstSeen = await apiFirstSeen.json();
            
            count = -1;
            json.results.forEach(() => {
                count++;
                contentHtml(json, jsonFirstSeen);
            })
        }
    }

    catch (error) {
        console.log(error)
        alert("An error has occurred")
    }
});

