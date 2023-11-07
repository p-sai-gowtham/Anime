export default async function createCsl(innerCsl, id, act, i) {
    // console.log(id);
    const url = `https://api.consumet.org/anime/gogoanime/info/${id}`;
    const result = await getData(url);
    const div = document.createElement('div');
    div.classList.add('carousel-item');
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('inner-carousel-item');
    if (act) {
        div.classList.add('active');
    }
    
    const details = document.createElement('div');
    const img = result.image
    const imgContainer =
        `<div style="background-image: linear-gradient(to right, #212529,#FF000000),url('${img}');background-size: contain; background-repeat:no-repeat; width:25%; height: 550px"></div>`;




    details.classList.add('carousel-details', 'd-md-block');
    var detailContent = `<h5 class="spotlight">#Spotlight ${i + 1}</h5>`
    detailContent += `<h5 class="title">${result.title}</h5>`;
    detailContent += `<div class="genres"><spam class="gen">Genres: </spam>`;
    for (let i = 0; i < result.genres.length; i++) {
        detailContent += `<span class="genre">${result.genres[i]}, </span>`
        if (i === result.genres.length - 1)
            detailContent += `<span class="genre">${result.genres[i]} </span>`
    }
    detailContent += `<span class="badge bg-success">${result.subOrDub}</span>`;
    detailContent += `</div>`;
    detailContent += `<div><spam class="desc">Description: </spam>`;
    detailContent += `<p class="Desc">${result.description}</p>
    <form action="/anime/${result.id}" method="GET">
    <button class="btn btn-success btn-large" type="submit">Watch Now</button>
    </form>
    `;
    detailContent += `</div>`;
    details.innerHTML = detailContent;
    innerDiv.appendChild(details);
    innerDiv.innerHTML = innerDiv.innerHTML + imgContainer
    div.appendChild(innerDiv);
    innerCsl.appendChild(div);
}


async function getData(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}
