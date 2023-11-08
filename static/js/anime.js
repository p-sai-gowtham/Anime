import Epi from './epi.js';

async function getData() {
    const id = document.querySelector('.id').dataset.id;
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`);
    const result = await response.json();
    const number = result.totalEpisodes;
    const list = document.querySelector('.list');
    
    for await (const i of Array(number).keys()) {
        list.innerHTML += `
        <div class="row py-4 epi">
        <h5 class="epis" data-epiId=${result.episodes[i].id}>
        Episode ${i+1}
        </h5>
        </div>
        `
    }
    
    Epi(result.episodes[0].id).then(() => {

        const epis = document.querySelectorAll('.epis');

        epis.forEach(i => {
            i.addEventListener('click', async () => {
                console.log(i);
                await Epi(i.dataset.epiid);
            })
        })
    });

}

getData();