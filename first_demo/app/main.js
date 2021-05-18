import Publisher from './helpers/publisher.js';
import ControllerCart from './cart/controllerCart.js';
import ControllerGallery from './gallery/controllerGallery.js';
import ControllerHeader from './header/controllerHeader.js';
import ControlelrSide from './side-menu/controllerSide.js';

const gallery = new ControllerGallery(Publisher);

const header = new ControllerHeader(Publisher);

const cart = new ControllerCart(Publisher);

const side = new ControlelrSide(Publisher);
