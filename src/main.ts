import { Ingredient } from "./types/ingredient";
import { Hamburguer } from "./types/hamburguer";
import appendChild from "./functions/appendChild";
import setFormValues from "./functions/setFormValues";

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

  let hamburguer: Hamburguer[] = [
    {
      name: "Hamburguer 1",
      price: 15,
    },
    {
      name: "Hamburguer 2",
      price: 20,
    },
    {
      name: "Hamburguer 3",
      price: 25,
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

  bread.forEach(item => {
    const breadItem = appendChild(
      "li",
      `
			<label>
				<input type="radio" name="item"/>
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

  const hamburguerList = mainPage.querySelector("aside ul") as HTMLDivElement;

  hamburguerList.innerHTML = "";

  hamburguer.forEach((item) => {
    const hamburguerItem = appendChild(
      "li",
      `
        <div>${item.name}</div>
        <div>${item.price}</div>
        <button type="button" aria-label="Remover Hamburguer 1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black"/>
          </svg>
        </button>
      `,
      hamburguerList
    );
  });

  const breadSelectChange = (e: Event) => {
    const input = e.target as HTMLInputElement;

    if (input.checked) {
      // bread.push(Number(input.value));
    } else {
      
    }
  }

}
