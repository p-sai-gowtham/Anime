export default async function Epi(id) {
    const url = `https://api.consumet.org/anime/gogoanime/servers/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    let Vidstreaming = document.querySelector('.Vidstreaming').dataset.link;
    let GogoServer = document.querySelector('.Gogo-server').dataset.link;
    let Streamwish = document.querySelector('.Streamwish').dataset.link;
    let Mp4upload = document.querySelector('.Mp4Upload').dataset.link;
    
    result.forEach(e => {
        if (e.name === 'Vidstreaming') { 
            Vidstreaming = e.url;
        } else if (e.name === 'Gogo server') {
            GogoServer = e.url;
        } else if (e.name === 'Streamwish') {
            Streamwish = e.url;
        } else if (e.name === 'Mp4Upload') {
            Mp4upload = e.url;
        }
    });
    return Vidstreaming;
}