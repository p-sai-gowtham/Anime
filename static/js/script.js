import createCsl from "./creatediv.js";

const innerCsl = document.querySelector('.inner-csl');
const url = "https://api.consumet.org/anime/gogoanime/top-airing";
const animenames = [];

async function getData() {
    const response = await fetch(url);
    const result = await response.json();
    for (let i = 0; i < result.results.length; i++) {
        animenames.push(result.results[i].title);
    }
    var i = 0;

    await createCsl(innerCsl, result.results[i].id, true, i);

    const handleIntersection = (entries, observer) => {
        entries.forEach(async (entry) => {
            const Csl = document.querySelectorAll('.carousel-item')
            if (entry.isIntersecting && Csl.length < animenames.length) {

                i++;
                await createCsl(innerCsl, result.results[i].id, false, i);
                observer.unobserve(entry.target);
                observer.observe(document.querySelector('.carousel-item:last-child'));
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersection, {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 0.1 // Specify the threshold for intersection
    });

    observer.observe(document.querySelector('.carousel-item'));

}
getData();