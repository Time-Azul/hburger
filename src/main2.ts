import { Ingredient } from "./types/ingredient";
import { Breads } from "./types/breads";
import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";
import { Hamburguer } from "./types/hamburguer";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";

const mainPage = document.querySelector(".mainBurger");

if (mainPage) {
	const db = getFirestore();
	let itensSelected: number[] = [];
	let breads: Breads[] = [];
	let ingredients: Ingredient[] = [];
	let hamburguer: Hamburguer[] = [];

	const calcTotal = () => {
		const totalElement = mainPage.querySelector(".price") as HTMLDivElement;

		const selected = ingredients.filter((ingredients) =>
			itensSelected.find((id) => ingredients.id === id)
		);

		const total = selected
			.map((ingredients) => ingredients.price)
			.reduce((a, b) => a + b, 0);
		console.log(total);
		totalElement.innerHTML = formatCurrency(total);
	};

	const renderCart = () => {
		const ulCart = mainPage.querySelector(
			"#cart ul"
		) as HTMLTableSectionElement;

		ulCart.innerHTML = "";

		hamburguer.forEach((item) => {
			const createHamburguers = appendChild(
				"li",
				`
      		<div>Hamburguer 1</div>
      		<div>R$ 15,00</div>
      		<button type="button" aria-label="Remover Hamburguer 2">
      			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      				<path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black" />
      			</svg>
      		</button>
      	`,
				ulCart
			);
		});
	};

	const ulBreads = mainPage.querySelector(".bread ul") as HTMLDivElement;
	ulBreads.innerHTML = "";

	const renderBreads = () => {
		ulBreads.innerHTML = "";
		breads.forEach((item) => {
			const createBreads = appendChild(
				"li",
				`
          <label>
            <input type="radio" name="item" />
            <span></span>
            <h3>${item.name}</h3>
            <div>${formatCurrency(item.price)}</div>
          </label>
		`,
				ulBreads
			);
		});
	};

	const ulIngredients = mainPage.querySelector(
		".ingredient ul"
	) as HTMLDivElement;
	ulIngredients.innerHTML = "";
	const renderIngredients = () => {
		ulIngredients.innerHTML = "";
		ingredients.forEach((item) => {
			const createIngredients = appendChild(
				"li",
				`
        <label>
          <input type="checkbox" name="item" value="${item.id}" />
          <span></span>
          <h3>${item.name}</h3>
          <div>${formatCurrency(item.price)}</div>
        </label>
			`,
				ulIngredients
			);
			const labelInput = createIngredients.querySelector(
				"input"
			) as HTMLInputElement;
			labelInput.addEventListener("change", itensSelectedChange);
		});
	};

	const itensSelectedChange = (e: Event) => {
		const input = e.target as HTMLInputElement;
		if (input.checked) {
			itensSelected.push(Number(input.value));
			console.log(itensSelected); // verifica como está montando o array
		} else {
			itensSelected = itensSelected.filter(
				(id) => id !== Number(input.value)
			);
		}

		renderCart();
		calcTotal();
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
	});

	onSnapshot(collection(db, "pedidos"), (collection) => {
		hamburguer = [];

		collection.forEach((doc) => {
			hamburguer.push(doc.data() as Hamburguer);
		});

		renderCart();
	});
}
