import Epi from './epi.js';

async function getData() {
    const id = document.querySelector('.id').dataset.id;
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${id}`);
    const result = await response.json();
    const number = result.totalEpisodes;
    const list = document.querySelector('.list');
    const epi = document.querySelectorAll('.epi');
    const iframe = document.querySelector('iframe');
    const link = document.querySelectorAll('.link');
    
    
    for(let i = 0; i < number; i++) {
        list.innerHTML += `
        <div class="row py-4 epi">
        <h5 class="epis" data-epiId=${result.episodes[i].id}>
        Episode ${i+1}
        </h5>
        </div>
        `
    }
    const Vidstreaming = await Epi('tate-no-yuusha-no-nariagari-season-3-episode-1');
    iframe.src = Vidstreaming;


    
    

}

getData();