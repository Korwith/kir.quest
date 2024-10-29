const sidebar = document.querySelector('.sidebar');
const sidebar_placeholder = document.querySelector('.placeholder.sidebar_entry');

const search_box = sidebar.querySelector('.product_search');
const search_button = sidebar.querySelector('.run_search');
const start_info = sidebar.querySelector('.sidebar_blurb.start');
const location_info = sidebar.querySelector('.sidebar_blurb.location');
const result_info = sidebar.querySelector('.sidebar_blurb.results');
const search_results = sidebar.querySelector('.search_results');

import {chromium} from 'playwright';

async function findLocation() {
    let url = 'http://ip-api.com/json';
    try {
        let response = await fetch(url)
        if (!response.ok) {
            throw new Error(respones.status)
        }

        let json = await response.json();
        updateLocation(json);
    } catch(error) {
        console.error(error.message);
    }
}

function updateLocation(json) {
    let city = json.city;
    let region = json.region;
    location_info.textContent = `${city}, ${region}`;
}

async function handleSearch(event) {
    loadSearch();

    let browser = await chromium.launch({headless: true});
    let context = await browser.newContext();
    let page = await context.newPage();
    await page.goto(`https://www.google.com/search?q=buy+${search_box.value.replaceAll(' ', '+')}`);
    await page.waitForSelector('div');

    let results = await page.evaluate(function() {
        // Find all <div> elements
        let divs = Array.from(document.querySelectorAll('div'));

        // Filter the divs to find the one containing the text "Popular Products"
        let popularProductsDiv = divs.find(function(div) {
            return div.textContent.includes('Popular Products');
        });

        // If the div is found, return its text content or any relevant data
        return popularProductsDiv ? popularProductsDiv.textContent : 'Popular Products section not found';
    });

    await browser.close();
    console.log(results);
}

function loadSearch(json) {
    start_info.classList.add('hide');
    location_info.classList.remove('hide');
    result_info.classList.remove('hide');    
}

function handleEnter(event) {
    if (event.which == 13) {
        search_box.blur();
        event.preventDefault();
        handleSearch();
    }
}

findLocation()
search_box.addEventListener('change', handleSearch);
search_box.addEventListener('keydown', handleEnter);
search_button.addEventListener('mouseup', handleSearch);