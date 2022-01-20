import { Ingredient } from "./types/ingredient";
import { Hamburguer } from "./types/hamburguer";
import appendChild from "./functions/appendChild";
import { Order } from "./types/order";
import formatCurrency from "./functions/formatCurrency";

const mainPage = document.querySelector(".mainBurger");

if (mainPage) {
	let breadSelected: number;
	let ingredientSelected: number[] = [];

	let itensCart: object[] = [];
	let cart = {};

	const breadList = mainPage.querySelector(".bread ul") as HTMLDivElement;
	const setBurger = mainPage.querySelector(
		"section footer button"
	) as HTMLButtonElement;

	const renderCart = () => {
		let data = localStorage.getItem("order");

		let dataCart = JSON.parse(`${data}`);

		console.log(dataCart["itensCart"]);
	};

	setBurger.addEventListener("click", () => {
		itensCart.push({
			bread: breadSelected,
			ingredient: ingredientSelected,
		});

		cart = {
			user: 321654987,
			numberOrder: 123456789,
			itensCart,
		};

		localStorage.setItem("order", JSON.stringify(cart));

		renderCart();
	});

	let breads: Ingredient[] = [
		{
			id: 1,
			name: "Pão Tradicional",
			price: 2,
		},
		{
			id: 2,
			name: "Pão Australiano",
			price: 3,
		},
		{
			id: 3,
			name: "Pão de Batata",
			price: 2.5,
		},
		{
			id: 4,
			name: "Pão de Frances",
			price: 10.0,
		},
	];

	let ingredients: Ingredient[] = [
		{
			id: 1,
			name: "Carne Bovina 125g",
			price: 3,
		},
		{
			id: 2,
			name: "Carne de Frango 125g",
			price: 2.5,
		},
		{
			id: 3,
			name: "Carne de Peixe 125g",
			price: 2,
		},
		{
			id: 4,
			name: "Salada",
			price: 1,
		},
		{
			id: 5,
			name: "Bacon",
			price: 2,
		},
	];

	const breadSelectedChange = (e: Event) => {
		const input = e.target as HTMLInputElement;

		if (input.checked) {
			let breadId = Number(input.value);
			breadSelected = Number(breadId);
		}
	};

	breadList.innerHTML = "";
	breads.forEach((item) => {
		const li = document.createElement("li") as HTMLLIElement;
		li.innerHTML = `
    <label>
      <input type="radio" name="item" value="${item.id}"/>
      <span></span>
      <h3>${item.name}</h3>
      <div>${formatCurrency(item.price)}</div>
    </label>
    `;

		const liInput = li.querySelector("input") as HTMLInputElement;
		liInput.addEventListener("change", breadSelectedChange);
		breadList.appendChild(li);
	});

	const ingredientSelectedChange = (e: Event) => {
		const input = e.target as HTMLInputElement;

		if (input.checked) {
			ingredientSelected.push(Number(input.value));
		} else {
			ingredientSelected = ingredientSelected.filter(
				(id) => id !== Number(input.value)
			);
		}
	};

	const ingredientList = mainPage.querySelector(
		".ingredient ul"
	) as HTMLDivElement;
	ingredientList.innerHTML = "";
	ingredients.forEach((item) => {
		const li = document.createElement("li") as HTMLLIElement;
		li.innerHTML = `
      <label>
        <input type="checkbox" name="item" value="${item.id}" />
        <span></span>
        <h3>${item.name}</h3>
        <div>${formatCurrency(item.price)}</div>
      </label>
    `;

		const liInput = li.querySelector("input") as HTMLInputElement;
		liInput.addEventListener("change", ingredientSelectedChange);
		ingredientList.appendChild(li);
	});
}
