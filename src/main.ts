import { Ingredient } from "./types/ingredient";
import { Breads } from "./types/breads";
import formatCurrency from "./functions/formatCurrency";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";

const mainPage = document.querySelector(".mainBurger");

if (mainPage) {
	const db = getFirestore();
	let breads: Breads[] = [];
	let ingredients: Ingredient[] = [];
	let breadSelected: number;
	let ingredientSelected: number[] = [];
	let cart = {};
	let itensCart: object[] = [];

	const addCart = mainPage.querySelector(
		"section footer button"
	) as HTMLButtonElement;

	const ulBreads = mainPage.querySelector(".bread ul") as HTMLDivElement;
	ulBreads.innerHTML = "";

	const breadSelectedChange = (e: Event) => {
		const input = e.target as HTMLInputElement;

		if (input.checked) {
			let breadId = Number(input.value);
			breadSelected = Number(breadId);
		}
	};

	const renderCart = () => {
		const ulCart = mainPage.querySelector("#cart ul") as HTMLUListElement;
		let count = 1;
		ulCart.innerHTML = "";

		const getItensStorage = localStorage.getItem("itensCart");
		const itensCartStorage = JSON.parse(`${getItensStorage}`);

		if (itensCartStorage) {
			itensCartStorage.forEach((item: any) => {
				const li = document.createElement("li");

				const breadItem = breads.find(
					(price) => price.id === item["bread"]
				);

				const ingredientItem = item.ingredients
					.map((ingredient: any) =>
						ingredients.find(
							(ingredientItem) => ingredientItem.id === ingredient
						)
					)
					.map((ingredient: any) => ingredient.price)
					.reduce((a: any, b: any) => a + b, 0);

				const breadPrice = Number(breadItem?.["price"]);
				const ingredientsPrice = ingredientItem;

				li.innerHTML = `
          <div id="item">${`Hamburger ${count}`}</div>
            <div id="price">${formatCurrency(
					breadPrice + ingredientsPrice
				)}</div>
            <button type="button" aria-label="Remover Hamburguer 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black"/>
            </svg>
          </button>
        `;
				ulCart.appendChild(li);

				count++;
			});
		}
	};

	addCart.addEventListener("click", () => {
		setBurger();
		renderCart();
	});

	const renderBreads = () => {
		ulBreads.innerHTML = "";
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
			ulBreads.appendChild(li);
		});
	};

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

	const ulIngredients = mainPage.querySelector(
		".ingredient ul"
	) as HTMLDivElement;
	ulIngredients.innerHTML = "";
	const renderIngredients = () => {
		ulIngredients.innerHTML = "";
		ingredients.forEach((item) => {
			const li = document.createElement("li");

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
			ulIngredients.appendChild(li);
		});
	};

	const setBurger = () => {
		const getItens = localStorage.getItem("itensCart");

		const includeItem = () => {
			const getItens = localStorage.getItem("itensCart");
			const parceItens = JSON.parse(`${getItens}`);
			const burger = {
				bread: breadSelected,
				ingredients: ingredientSelected,
			};

			parceItens.push(burger);
			localStorage.setItem("itensCart", JSON.stringify(parceItens));
		};

		if (getItens === null) {
			localStorage.setItem("itensCart", JSON.stringify(itensCart));
			includeItem();
		} else {
			includeItem();
		}
	};

	onSnapshot(collection(db, "breads"), (collection) => {
		breads = [];

		collection.forEach((doc) => {
			breads.push(doc.data() as Breads);
		});

		renderBreads();
	});

	onSnapshot(collection(db, "Ingredientes"), (collection) => {
		ingredients = [];

		collection.forEach((doc) => {
			ingredients.push(doc.data() as Ingredient);
		});

		renderIngredients();
		renderCart();
	});

	window.addEventListener("load", () => {
		cart = {
			user: 123456789,
			order: 987654321,
		};

		localStorage.setItem("order", JSON.stringify(cart));
	});
}
