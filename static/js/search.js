import createResult from './createresult.js';

const results = document.querySelector('.result');
const name = document.querySelector('.name');
const id = name.dataset.id

var i = 1;

async function getData() {
    const response = await fetch(`https://api.consumet.org/anime/gogoanime/${id}?page=${i}`);
    const result = await response.json();
    var hasNext = result.hasNextPage;

    if (result.results.length == 0) {
        results.innerHTML = `<h1 class="m-5 px-5">Sorry, no results found</h1>`;
        return;
    }

    while (hasNext && i < 4) {
        i++;
        const response2 = await fetch(`https://api.consumet.org/anime/gogoanime/${id}?page=${i}`);
        const result2 = await response2.json();
        result.results.push(...result2.results);
        hasNext = result2.hasNextPage;
    }

    await creatingResults(results, result.results);


    const handleResultsIntersection = (entries, resultsObserver) => {
        entries.forEach(async (entry) => {
            if (entry.isIntersecting && result.results.length) {

                await creatingResults(results, result.results);
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

    resultsObserver.observe(document.querySelector('.result'));

}

getData();

async function creatingResults(div, data) {
    const cards = [];
    if (data) {
        for (let i = 0; i < 4; i++) {
            const col = document.createElement('div');
            col.classList.add('col');
            col.innerHTML = `<div class="card mb-3 bg-dark result-content cshadow" style="max-width: 540px;">
                <div id="container-loader">
                    <div id="square" class="shimmer"></div>
                    <div id="content">
                        <div id="content-title" class="shimmer"></div>
                        <div id="content-desc">
                            <div class="line shimmer"></div>
                            <div class="line shimmer"></div>
                            <div class="line shimmer"></div>
                            <div class="line shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>`;
            div.appendChild(col);
        }
        for (let i = 0; i < 4; i++) {
            if (data) {
                cards.push(await createResult(data));
            }
        }
        for (let i = 0; i < 4; i++) {
            await div.removeChild(div.lastElementChild)
        }
        cards.forEach(card => {
            if (card!=null) {
                div.appendChild(card);
            }
        });
    }
}