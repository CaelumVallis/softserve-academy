export default class ViewItem {
	constructor(addItem) {
		this.addBtn = document.querySelector('.add-btn');
		this.infoBtn = document.querySelector('.info-btn');
		this.infoModal = document.querySelector('#itemInfoModal .modal-body');

		this.addBtn.addEventListener('click', (e) => this.onAddBtnClick(e));
		this.infoBtn.addEventListener('click', (e) => this.onInfoBtnClick(e));

		this.addItem = addItem;
	}

	onAddBtnClick = (e) => {
		const itemTitle = e.target.closest('.item-body').querySelector('.item-title').innerText;
		const itemInfo = e.target.closest('.item-body').querySelector('.item-info').innerText;

		this.addItem(itemTitle, itemInfo);
	};

	onInfoBtnClick = (e) => {
		const itemTitle = e.target.closest('.item-body').querySelector('.item-title').innerText;
		const itemInfo = e.target.closest('.item-body').querySelector('.item-info').innerText;

		this.infoModal.innerHTML = `<h5>${itemTitle}</h5><p>${itemInfo}</p>`;
	};
}
