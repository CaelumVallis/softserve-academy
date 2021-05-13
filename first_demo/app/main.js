import ControllerGallery from './gallery/controllerGallery.js';
import ControllerItem from './galleryItem/controllerItem.js';

//console.log(document.querySelector('#galleryCardTemplate').innerHTML);

const item = new ControllerItem();

const gallery = new ControllerGallery();
gallery.load();
