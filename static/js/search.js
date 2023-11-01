import createResult from './createresult.js';

const results = document.querySelector('.result');
const name = document.querySelector('.name');
const id = name.dataset.id

var i = 1;

async function getData() {
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/${id}?page=${i}`);
    const result = await response.json();
    var hasNext = result.hasNextPage;
    console.log(result)


    if (result.results.length == 0) {
        results.innerHTML = `<h1 class="m-5 px-5">Sorry, no results found</h1>`;
        return;
    }
    

    while (hasNext && i<4) {
        i++;
        const response2 = await fetch(`https://api.consumet.org/anime/gogoanime/${id}?page=${i}`);
        const result2 = await response2.json();
        result.results.push(...result2.results);
        hasNext = result2.hasNextPage;
    }


    
    results.innerHTML = ``;
    var data = await createResult(results, result.results);


    // console.log(result.results);
    // console.log(data);



    const handleResultsIntersection = (entries, resultsObserver) => {
        entries.forEach(async (entry) => {
            if (entry.isIntersecting && data.length) {

                data = await createResult(results, data);
                resultsObserver.unobserve(entry.target);
                resultsObserver.observe(document.querySelector('.result-content:last-child'));

            }
        });
    }

    const resultsObserver = new IntersectionObserver(handleResultsIntersection, {
        root: null,
        rootMargin: "100px",
        threshold: 0.1
    });

    resultsObserver.observe(document.querySelector('.result-content:last-child'));

}

getData();