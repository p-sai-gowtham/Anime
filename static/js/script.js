import createCsl from "./createcsl.js";
import createTopA from "./createtopa.js";

const innerCsl = document.querySelector('.inner-csl');
const animenames = [];

async function getData() {
    const response = await fetch("https://api.consumet.org/anime/gogoanime/top-airing");
    const result = await response.json();
    const response2 = await fetch("https://api.consumet.org/anime/gogoanime/top-airing?page=2");
    const result2 = await response2.json();
    result.results.push(...result2.results);
    for (let i = 0; i < result.results.length; i++) {
        animenames.push(result.results[i].title);
    }
    var i = 0;

    await createCsl(innerCsl, result.results[i].id, true, i);

    const handleSoptlightIntersection = (entries, spotlightObserver) => {
        entries.forEach(async (entry) => {
            const Csl = document.querySelectorAll('.carousel-item')
            if (entry.isIntersecting && Csl.length < animenames.length/2) {

                i++;
                const j = i * 2;
                await createCsl(innerCsl, result.results[j].id, false, i);
                spotlightObserver.unobserve(entry.target);
                spotlightObserver.observe(document.querySelector('.carousel-item:last-child'));
            }
        });
    };

    const spotlightObserver = new IntersectionObserver(handleSoptlightIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 
    });

    spotlightObserver.observe(document.querySelector('.carousel-item'));


    const topairings = document.querySelectorAll('.topairing-content');


    const handleTopairingIntersection = (entries, topairingObserver) => {
        entries.forEach(async (entry) => {
            if (entry.isIntersecting) {

                await createTopA(entry.target, result.results[entry.target.dataset.i-1].id);
                topairingObserver.unobserve(entry.target);
            }
        });
    }

    const topairingObserver = new IntersectionObserver(handleTopairingIntersection, {
        root: null,
        rootMargin: "100px",
        threshold: 0.1
    });

    topairings.forEach((topairing) => {
        topairingObserver.observe(topairing);
    });

    
    
}
getData();