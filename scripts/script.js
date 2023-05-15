const shopping_tab = document.querySelector(".shopping_tab");
const transaction_tab = document.querySelector(".transaction_tab");
// const tabHeadings = document.querySelectorAll(".tab_heading");
const tab_body = document.querySelector(".tab_body");

window.addEventListener("load", () => openShoppingcartTab());

const openShoppingcartTab = () => {
  transaction_tab.classList.remove("active_tab");
  shopping_tab.classList.add("active_tab");
};

const openTransactionTab = () => {
  shopping_tab.classList.remove("active_tab");
  transaction_tab.classList.add("active_tab");
};

const makeTicketCard = () => {
  const card = document.createElement("div");
  card.className = "ticket_card";
  card.innerHTML = `
      <h3 class="ticket_name ticket_text">
        All Access Ticket for Startups (less than $20M ARR)
      </h3>
      <h3 class="ticket_price ticket_text">
        120 <span class="ticket_currency ticket_text">eur</span>
      </h3>
  
      <div class="counter_button">
        <i class="fa-solid fa-minus btn"></i>
        <h2 class="counter ticket_text ticket_currency">2</h2>
        <i class="fa-solid fa-plus btn"></i>
      </div>
    `;
  return card;
};

const makeSummaryCard = () => {
  const ticketCard = document.createElement("div");
  ticketCard.classList.add("ticket_card");

  ticketCard.innerHTML = `
      <div class="ticket_name ticket_text">
        All Access Ticket for Startups (less than $20M ARR)
      </div>
      <div class="ticket_price ticket_text">
        120 <span class="ticket_currency ticket_text">eur</span>
      </div>
      <div class="counter_button">
        <i class="fa-solid fa-minus btn"></i>
        <h2 class="counter ticket_text ticket_currency">2</h2>
        <i class="fa-solid fa-plus btn"></i>
      </div>
    `;

  return ticketCard;
};

console.log(makeSummaryCard())
