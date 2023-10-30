export default async function createTopA(topAiringContent, id) {
    const url = `https://api.consumet.org/anime/gogoanime/info/${id}`;
    const result = await getData(url);
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'g-0', 'text-bg-dark');
    const colDiv1 = document.createElement('div');
    colDiv1.classList.add('col-md-4');
    const img = document.createElement('img');
    img.src = result.image;
    img.classList.add('img-fluid', 'rounded-start');
    colDiv1.appendChild(img);
    const colDiv2 = document.createElement('div');
    colDiv2.classList.add('col-md-8');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = result.title;
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = result.description;
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    colDiv2.appendChild(cardBody);
    rowDiv.appendChild(colDiv1);
    rowDiv.appendChild(colDiv2);
    topAiringContent.childNodes[1].remove();
    topAiringContent.appendChild(rowDiv);

}


async function getData(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}
