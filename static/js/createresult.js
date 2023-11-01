export default async function createResult(results, data) {
    for (let i = 0; i < 4; i++) {
        if (data[i]) {
            const id = data[i].id;
            const url = `https://api.consumet.org/anime/gogoanime/info/${id}`;
            const result = await getData(url);
            const card = document.createElement('div');
            card.classList.add('card', 'mb-3', 'bg-dark', 'result-content');
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

            const innerColDiv2 = document.createElement('div');
            innerColDiv2.classList.add('card-text');
            const otherName = document.createElement('h3');
            otherName.classList.add('other-name');
            otherName.textContent = result.otherName;
            otherName.textContent = 'Synonyms: ' + otherName.textContent;
            const genres = document.createElement('h3');
            genres.classList.add('genres');
            genres.textContent = result.genres.join(', ');
            genres.textContent = 'Genres: ' + genres.textContent;
            const details = document.createElement('p');
            details.classList.add('details');
            details.innerHTML = `
    ${result.releaseDate} ${result.status} ${result.subOrDub}
    `;

            cardBody.appendChild(cardTitle);
            innerColDiv2.appendChild(otherName);
            innerColDiv2.appendChild(genres);
            innerColDiv2.appendChild(details);
            cardBody.appendChild(innerColDiv2);
            colDiv2.appendChild(cardBody);
            rowDiv.appendChild(colDiv1);
            rowDiv.appendChild(colDiv2);
            card.appendChild(rowDiv);
            await results.appendChild(card);
        } else {
            return [];
        }
    }
    return data.slice(4, data.length + 1);

}


async function getData(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}
