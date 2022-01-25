import queryStringToJSON from "./functions/queryStringToJSON";
import { HTMLInputField } from "./types/HTMLInputField";
import IMask from "imask";
import { getDatabase, ref, set } from "firebase/database";


const pagePay = document.querySelector("section.page") as HTMLElement;

if (pagePay) {
	const form = pagePay.querySelector("form") as HTMLFormElement;
	const number = form.querySelector("#number") as HTMLInputField;
	const validate = form.querySelector("#validate") as HTMLInputField;
	const code = form.querySelector("#code") as HTMLInputField;
	const name = form.querySelector("#name") as HTMLInputField;
	const bank = form.querySelector("#bank") as HTMLInputField;
	const installments = form.querySelector("#installments") as HTMLInputField;
	const buttonPay = document.querySelector("#payment") as HTMLButtonElement;

	const orderlocalStorage = localStorage.getItem("order");

	buttonPay.addEventListener("click", (e) => {


		if (orderlocalStorage) {
			const parseOrder = JSON.parse(orderlocalStorage);
			console.log(parseOrder);

			const user = parseOrder.user;
			const order = parseOrder.order;
			const date = parseOrder.date;
			const itens = parseOrder.itens;
			const total = parseOrder.total;

			(user: String, order: Number, date: Date, itens: Object, total: Number) => {
				const db = getDatabase();
				set(ref(db, 'orders/' + user), {
					user,
					order,
					date,
					itens,
					total,
				});
			}
		}
	})

	number.addEventListener("keyup", (e) => {
		number.value.replaceAll(" ", "");
	});

	IMask(number, {
		mask: "0000 0000 0000 0000",
	});

	const year = new Date().getFullYear();

	IMask(validate, {
		mask: "MM/YY",
		blocks: {
			YY: {
				mask: IMask.MaskedRange,
				from: year.toString().substring(2, 4),
				to: (year + 10).toString().substring(2, 4),
			},
			MM: {
				mask: IMask.MaskedRange,
				from: 1,
				to: 12,
			},
		},
	});

	IMask(code, {
		mask: "000[0]",
	});
}
