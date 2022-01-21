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

	const parceStorage = () => {
		const getStorage = localStorage.getItem("order");
		const cartStorage = JSON.parse(`${getStorage}`);

		return cartStorage;
	};

	const renderCart = () => {
		const breadCardList = mainPage.querySelector(
			"aside ul"
		) as HTMLDivElement;
		breadCardList.innerHTML = "";
		const burgerCart = parceStorage();

		const breadCardItem = burgerCart["itensCart"];
		// breadCardItem.forEach((item) => {
		// 	console.log("test");
		// });
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
			totalOrder: 3213,
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

	// hamburguer.forEach((item) => {
	// 	const hamburguerItem = appendChild(
	// 		"li",
	// 		`
	//     <div>${item.name}</div>
	//     <div>${item.price}</div>
	//     <button type="button" aria-label="Remover Hamburguer 1">
	//       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	//         <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black"/>
	//       </svg>
	//     </button>
	//   `,
	// 		hamburguerList
	// 	);
	// });
}
