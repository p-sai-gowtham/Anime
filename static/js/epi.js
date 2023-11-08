export default async function Epi(id) {
    const url = `https://api.consumet.org/anime/gogoanime/servers/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    const link  = document.querySelectorAll('.link');
    const iframe = document.querySelector('iframe');
    
    iframe.src = await result[0].url;

    link.forEach((i,idx) => { 
        i.addEventListener('click', () => {
            iframe.src = result[idx].url;
        })
    });


}