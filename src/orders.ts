import appendChild from "./functions/appendChild";
import { Order } from "./types/order";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import formatCurrency from "./functions/formatCurrency";

const buttonQuit = document.querySelector("#button-sair") as HTMLButtonElement;
const ordersList = document.querySelector(".no-footer") as HTMLBodyElement;
const userPhoto = document.querySelector("img#avatar") as HTMLImageElement;
const db = getFirestore();

if (ordersList) {
    let orders: Order[] = [];

    const listOrders = ordersList.querySelector("#list-orders") as HTMLDivElement;

    listOrders.innerHTML = "";

    if (orders) {
        const renderOrders = () => {

            orders.forEach((item) => {

                const orderItem = appendChild(
                    "li",
                    `
            <div class="id">#${item.order}</div>
            <div class="content">
                <div class="title">Detalhes do Pedido</div>
                <ul>
                    <li>
                        <span>Data:</span>
                        <span>${new Date(item.date).toLocaleDateString('pt-BR')}</span>
                    </li>
                    <li>
                        <span>Valor:</span>
                        <span>${formatCurrency(item.total)}</span>
                    </li>
                    <li>
                        <span>Itens:</span>
                        <span>${item.itens.length}</span>
                    </li>
                    <li>
                        <span>N°:</span>
                        <span>${item.order}</span>
                    </li>
                </ul>
            </div>
            <div class="actions">
            </div>
            `,
                    listOrders
                );
            });
        }
        onSnapshot(collection(db, "orders"), (collection) => {
            let uid = sessionStorage.getItem("uid");
            orders = [];
            collection.forEach((doc) => {
                const order = doc.data() as Order;
                if (order.user == uid) {
                    orders.push(doc.data() as Order);
                }

            });
            renderOrders();
        });

    }
}
