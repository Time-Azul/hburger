import { Ingredient } from "./types/ingredient";
import appendChild from "./functions/appendChild";

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
    {
      name: "Pão de Frances",
      price: 10.0,
    },
  ];

  let ingredient: Ingredient[] = [
    {
      name: "Carne Bovina 125g",
      price: 3,
    },
    {
      name: "Carne de Frango 125g",
      price: 2.5,
    },
    {
      name: "Carne de Peixe 125g",
      price: 2,
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
    const breadItem = appendChild(
      "li",
      `
			<label>
				<input type="radio" name="item" checked />
				<span></span>
				<h3>${item.name}</h3>
				<div>${item.price}</div>
			</label>
		`,
      breadList
    );
  });

  const ingredientList = mainPage.querySelector(
    ".ingredient ul"
  ) as HTMLDivElement;

  ingredientList.innerHTML = "";

  ingredient.forEach((item) => {
    const ingredientItem = appendChild(
      "li",
      `
      <label>
        <input type="checkbox" name="item" />
        <span></span>
        <h3>${item.name}</h3>
        <div>${item.price}</div>
      </label>
      `,
      ingredientList
    );
  });
}
