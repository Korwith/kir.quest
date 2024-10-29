const project_placeholder = document.querySelector('#project_placeholder');
const search_placeholder = document.querySelector('#search_placeholder');

const content = document.querySelector('.content');
const all_page = content.querySelectorAll('.page');
const home_page = content.querySelector('.page.home');
const project_page = content.querySelector('.page.projects');
const search_page = content.querySelector('.page.search');

const home = content.querySelector('.page.home');
const featured = home.querySelector('.horizontal_pane');

const header = document.querySelector('header');
const sidebar = document.querySelector('nav.sidebar');
const sidebar_button = header.querySelector('.sidebar_button');
const red_button = sidebar.querySelector('.red');
const yellow_button = sidebar.querySelector('.yellow');
const green_button = sidebar.querySelector('.green');
const page_button = sidebar.querySelectorAll('[pagelink]');

const project_data = {
    'Wordle': {
        description: 'Recreation of Wordle. Use the clues to figure out the select word and solve the puzzle.',
        icon: { url: 'icon/wordle.png', size: '75%' },
        href: 'https://www.kircic.org/sub/wordle/game.html',
        video: 'icon/wordle_preview.mp4',
        featured: true
    },
    'Infinisweeper': {
        description: 'An infinite minesweeper sandbox. Just like the original minesweeper, but with proceduraly generating terrain.',
        icon: { url: 'icon/infinisweeper.png', size: '75%' },
        href: 'https://www.kircic.org/sub/infinisweeper.html',
        video: 'icon/infinite_preview.mp4',
        featured: true
    },
    'Minesweeper': {
        description: 'Recreation of the Windows game minesweeper. Has normal and expert modes, 10x10 and 20x20.',
        icon: { url: 'icon/minesweeper.png', size: '75%' },
        href: 'https://www.kircic.org/sub/minesweeper.html',
        video: 'icon/minesweeper_preview.mp4',
        featured: true
    },
    '3D Viewer': {
        description: '3D File Viewer, supporting OBJ, MTL, OBJ files.',
        icon: { url: 'icon/3dviewer.svg', size: '80%' },
        href: 'https://www.kircic.org/sub/study/index.html',
    },
    'A+ Study Tool': {
        description: 'A simple study assistant for the A+ certification with a general practice test, a study quiz for ports, and a study quiz for the six troubleshooting steps.',
        icon: { url: 'icon/certification1.svg', size: '105%' },
        href: 'https://www.kircic.org/sub/study/index.html'
    },
    'Connections': {
        description: 'Match all the groups of four like terms to solve the puzzle',
        icon: { url: 'icon/connections.svg', size: '105%' },
        href: 'https://www.kircic.org/sub/connections/game.html'
    },
    'Letter Boxed': {
        description: 'Solve the puzzle by using all letters on different sides to make words.',
        icon: { url: 'icon/letterboxed.svg', size: '105%' },
        href: 'https://www.kircic.org/sub/letter-boxed.html'
    },
    'Notilify': {
        description: 'Collaboration with Ariel Araya, a web port of the iOS application Notilify.',
        icon: { url: 'icon/notilify.png', size: '90%' },
        href: 'https://arielaraya.xyz/notilifyPWA/index.html'
    },
    'QR Generator': {
        description: 'Create custom QR codes for any text or URL',
        icon: { url: 'icon/qr.svg', size: '85%' },
        href: 'https://www.kircic.org/qr/gen.html',
    },
    'Snake': {
        description: 'Collect apples without running into the edge or yourself.',
        icon: { url: 'icon/snake.png', size: '80%' },
        href: 'https://www.kircic.org/sub/snake/game.html',
    },
    'Stock Tracker': {
        description: 'Provides real time stock graphs and detailed statistics about the market.',
        icon: { url: 'icon/stock.svg', size: '90%' },
        href: 'https://kir.lol/',
    }
}

const search_data = {
    'Google': 'google.com/search?q=',
    'DuckDuckGo': 'duckduckgo.com/?q=',
    'Brave': 'search.brave.com/search?q=',
    'Bing': 'bing.com/search?q=',
    'Ecosia': 'ecosia.org/search?q=',
    'Yandex': 'yandex.com/search/?text=',
    'Wikipedia': 'wikipedia.org/w/index.php?search=',
    'GitHub': 'github.com/search?q=',
    'MDN Web Docs': 'developer.mozilla.org/en-US/search?q=',
    'Stack Overflow': 'stackoverflow.com/search?q=',
    'YouTube': 'youtube.com/results?search_query=',
    'Twitch': 'twitch.tv/search?term=',
    'Reddit': 'reddit.com/search/?q=',
    'Twitter': 'twitter.com/search?q=',
    'Archive': 'archive.org/search?query=',
    'Dictionary': 'merriam-webster.com/dictionary/',
    'Urban Dictionary': 'urbandictionary.com/define.php?term='
}

function makeProjectFrame(project) {
    let this_data = project_data[project];
    let project_clone = project_placeholder.cloneNode(true);
    let icon = project_clone.querySelector('.title .icon');
    let name = project_clone.querySelector('.title span');
    let info = project_clone.querySelector('.info');
    let link = project_clone.querySelector('a');
    let video = project_clone.querySelector('video');

    name.textContent = project;
    icon.style.backgroundImage = `url(${this_data.icon.url})`;
    icon.style.backgroundSize = this_data.icon.size;
    info.textContent = this_data.description;
    link.setAttribute('href', this_data.href);

    project_clone.removeAttribute('id');
    project_clone.removeAttribute('href', this_data.href);

    if (this_data.video) {
        video.src = this_data.video;
    }

    if (this_data.featured) {
        let make_featured = project_clone.cloneNode(true);
        featured.appendChild(make_featured);
    }

    project_page.appendChild(project_clone);
}

function loadProjects() {
    let sorted = Object.keys(project_data).sort();
    for (var key in sorted) {
        let project = sorted[key];
        makeProjectFrame(project);
    }
}

function loadSearches() {
    for (var i in search_data) {
        let this_info = search_data[i];
        let search_clone = search_placeholder.cloneNode(true);
        let service_link = search_clone.querySelector('a');
        let service_icon = service_link.querySelector('div');
        let search_box = search_clone.querySelector('.search_box');

        search_clone.setAttribute('search', i);
        service_link.href = `https://${this_info.split('/')[0]}`;
        service_icon.style.backgroundImage = `url(icon/${i.toLowerCase().replaceAll(' ', '')}.svg)`
        search_box.setAttribute('placeholder', 'Search ' + i);
        search_clone.removeAttribute('id');
        search_page.appendChild(search_clone);
    }
}

function handleSidebar() {
    sidebar.classList.toggle('shift');
    content.classList.toggle('shift', sidebar.classList.contains('shift'));
    header.classList.toggle('shift', sidebar.classList.contains('shift'));
}

function openPage(name) {
    let open_page = content.querySelector('.page.show');
    let new_page = content.querySelector('.page.' + name);
    if (open_page) {
        open_page.classList.remove('show');
    }
    new_page.classList.add('show');
    updateScrollClass();
}

function handlePageButtons() {
    for (var i = 0; i < page_button.length; i++) {
        let this_button = page_button[i];
        let open = this_button.getAttribute('href').replace('#', '');
        this_button.onclick = function () {
            openPage(open);
        }
    }
}

function updateScrollClass() {
    for (var i = 0; i < all_page.length; i++) {
        let this_page = all_page[i];
        this_page.classList.toggle('scroll', content.scrollHeight > content.clientHeight);
    }
}

function handlePushState() {
    if (!window.location.href.includes('#')) {
        home_page.classList.add('show');
        return;
    };

    let page_name = window.location.href.split('#')[1];
    let found_page = content.querySelector('.page.' + page_name);
    if (found_page) {
        openPage(page_name);
    }
}

function runSearch(name) {
    let search_holder = search_page.querySelector(`[search="${name}"]`);
    let search_box = search_holder.querySelector('.search_box');
    let search_url = search_data[name];
    window.open(`https://${search_url}${search_box.value.replaceAll(' ', '+')}`);
}

function handleKeyDown(event) {
    if (event.which == 13) {
        if (document.activeElement.classList.contains('search_box')) {
            let engine = document.activeElement.parentElement.getAttribute('search');
            runSearch(engine);
        }
    }
}

loadProjects();
handlePageButtons();
loadSearches();
updateScrollClass();
handlePushState();
sidebar_button.addEventListener('mouseup', handleSidebar);
yellow_button.addEventListener('mouseup', handleSidebar);
document.addEventListener('keydown', handleKeyDown);
window.onresize = updateScrollClass;