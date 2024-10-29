import * as THREE from 'three';
import { OrbitControls } from 'OrbitControls';
import { OBJLoader } from 'OBJLoader';
import { MTLLoader } from 'MTLLoader';
import { GLTFLoader } from 'GLTFLoader';
import { FBXLoader } from 'FBXLoader';

const sidebar = document.querySelector('.sidebar');
const list = sidebar.querySelector('.list');
const item_holder = list.querySelector('.item_holder');

const open_folder = document.querySelector('.open_folder');
const open_link = document.querySelector('.open_link');

let sidebar_data = {
    'Discord': {
        url: { 
            mtl: 'preset/discord_qr.mtl', 
            obj: 'preset/discord_qr.obj' 
        },
        icon: 'https://www.kircic.org/3d/preset_img/qr_preview.png',
    },

}

// User Interface
function makeSidebarEntry(url, icon) {
    let image_button = document.createElement('img');
    image_button.classList.add('sidebar_entry');
    if (icon) {
        image_button.src = icon;
    }
    item_holder.appendChild(image_button);
}

function loadSidebar() {
    for (var i in sidebar_data) {
        let this_entry = sidebar_data[i];
        let this_url = this_entry.url;
        let this_icon = this_entry.icon;
        makeSidebarEntry(this_url, this_icon);
    }
}

function clearSidebar() {

}

// Button Functions
function filePopup() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.obj,.mtl,.glb';
    input.click();
}

function linkPopup() {
    let result = prompt('Enter link..');
}

loadSidebar();
open_folder.addEventListener('mouseup', filePopup);
open_link.addEventListener('mouseup', linkPopup);