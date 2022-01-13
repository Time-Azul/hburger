import { Ingredient } from "./types/ingredient";

const mainPage = document.querySelector(".mainBurger");

if (mainPage) {
	let bread: Ingredient[] = [
		{
			name: "Pão Tradicional",
			price: 2,
		},
		{
			name: "Pão Australiano",
			price: 3,
		},
		{
			name: "Pão de Batata",
			price: 2.5,
		},
	];

	const setBurger = mainPage.querySelector(
		"section footer button"
	) as HTMLButtonElement;
	const countBurger = mainPage.querySelector(
		"header strong small"
	) as HTMLElement;

	const totalPrice = mainPage.querySelector(
		"footer div.price"
	) as HTMLDivElement;

	const checkOut = mainPage.querySelector("aside footer button");

	const breadList = mainPage.querySelector(".bread ul") as HTMLDivElement;

	breadList.innerHTML = "";

	bread.forEach((item) => {
		const breadItem = document.createElement("li");
		breadItem.innerHTML = `
			<label>
				<input type="radio" name="item" checked />
				<span></span>
				<h3>${item.name}</h3>
				<div>${item.price}</div>
			</label>
		`;

		breadList.appendChild(breadItem);
	});
}
