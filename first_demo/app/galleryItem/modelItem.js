export default class ModelItem {
	addToCart = (order) => {
		console.log({ ...order, id: Math.random() });
	};
}
