import { Ingredient } from "./types/ingredient";
import { Hamburguer } from "./types/hamburguer";
import { Orders } from "./types/orders";
import appendChild from "./functions/appendChild";
import setFormValues from "./functions/setFormValues";

const mainPage = document.querySelector(".mainBurger");

const ordersList = document.querySelector(".no-footer");

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

  bread.forEach((item) => {
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

  const renderCart = () => {};

  const breadSelectChange = (e: Event) => {
    const input = e.target as HTMLInputElement;

    if (input.checked) {
      // bread.push(Number(input.value));
    }

    renderCart();
  };
}

if (ordersList) {
  let orders: Orders[] = [
    {
      id: 123456789,
      date: 20220101,
      price: 10000,
      itens: 1000,
    },
    {
      id: 123456789,
      date: 20220202,
      price: 200,
      itens: 20,
    },
    {
      id: 123456789,
      date: 20220303,
      price: 300,
      itens: 30,
    },
    {
      id: 123456789,
      date: 20220404,
      price: 400,
      itens: 40,
    },
    {
      id: 123456789,
      date: 20220404,
      price: 400,
      itens: 40,
    },
    {
      id: 123456789,
      date: 20220404,
      price: 400,
      itens: 40,
    },
    {
      id: 123456789,
      date: 20220404,
      price: 400,
      itens: 40,
    },
    {
      id: 123456789,
      date: 20220404,
      price: 40000,
      itens: 4000,
    },
  ];

  const listOrders = ordersList.querySelector("#list-orders") as HTMLDivElement;

  listOrders.innerHTML = "";

  orders.forEach((item) => {
    const orderItem = appendChild(
      "li",
      `
        <li>
                    <div class="id">#${item.id}</div>
                    <div class="content">
                        <div class="title">Detalhes do Pedido</div>
                        <ul>
                            <li>
                                <span>Data:</span>
                                <span>${item.date}</span>
                            </li>
                            <li>
                                <span>Valor:</span>
                                <span>${item.price}</span>
                            </li>
                            <li>
                                <span>Itens:</span>
                                <span>${item.itens}</span>
                            </li>
                            <li>
                                <span>N°:</span>
                                <span>${item.id}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="actions">
                        <button type="button" aria-label="Compartilhar">
                            <svg width="18" height="20" viewBox="0 0 18 20" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15 14.08C14.24 14.08 13.56 14.38 13.04 14.85L5.91 10.7C5.96 10.47 6 10.24 6 10C6 9.76 5.96 9.53 5.91 9.3L12.96 5.19C13.5 5.69 14.21 6 15 6C16.66 6 18 4.66 18 3C18 1.34 16.66 0 15 0C13.34 0 12 1.34 12 3C12 3.24 12.04 3.47 12.09 3.7L5.04 7.81C4.5 7.31 3.79 7 3 7C1.34 7 0 8.34 0 10C0 11.66 1.34 13 3 13C3.79 13 4.5 12.69 5.04 12.19L12.16 16.35C12.11 16.56 12.08 16.78 12.08 17C12.08 18.61 13.39 19.92 15 19.92C16.61 19.92 17.92 18.61 17.92 17C17.92 15.39 16.61 14.08 15 14.08Z"
                                    fill="#070D0D" />
                            </svg>
                        </button>
                        <button type="button" aria-label="Detalhes">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16 2V16H2V2H16ZM17.1 0H0.9C0.4 0 0 0.4 0 0.9V17.1C0 17.5 0.4 18 0.9 18H17.1C17.5 18 18 17.5 18 17.1V0.9C18 0.4 17.5 0 17.1 0ZM8 4H14V6H8V4ZM8 8H14V10H8V8ZM8 12H14V14H8V12ZM4 4H6V6H4V4ZM4 8H6V10H4V8ZM4 12H6V14H4V12Z"
                                    fill="#070D0D" />
                            </svg>
                        </button>
                        <button type="button" aria-label="Excluir">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
                                    fill="#070D0D" />
                            </svg>
                        </button>
                    </div>
                </li>
      `,
      listOrders
    );
  });
}
