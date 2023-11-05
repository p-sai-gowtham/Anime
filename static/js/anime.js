async function getData() {
    const name = 'spy-x-family';
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/info/${name}`);
    const result = await response.json();
    const number = result.totalEpisodes;

    

}

getData();