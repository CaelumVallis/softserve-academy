import Publisher from './helpers/publisher.js';
import ControllerCart from './cart/controllerCart.js';
import ControllerGallery from './gallery/controllerGallery.js';
import ControllerHeader from './header/controllerHeader.js';
import ControllerSide from './side-menu/controllerSide.js';
import ControllerModal from './modals/ControllerModal.js';

const gallery = new ControllerGallery(Publisher);

const header = new ControllerHeader(Publisher);

const cart = new ControllerCart(Publisher);

const side = new ControllerSide(Publisher);

const modals = new ControllerModal(Publisher);
