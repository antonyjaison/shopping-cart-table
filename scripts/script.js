const shopping_tab = document.querySelector(".shopping_tab");
const transaction_tab = document.querySelector(".transaction_tab");
const tab_body = document.querySelector(".tab_body");
const shoppingTabHeading = document.querySelector(".shopping_tab");
const transactionTabHeading = document.querySelector(".transaction_tab");
const tab_headings = document.querySelector(".tab_headings");

const shopping_cart_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

window.addEventListener("load", () => openShoppingcartTab());

var cartData = [];

let values = [5, 10, 20, 50, 100];
var currentPage = 1;
var recordsPerPage = 5;
var promocodes = [];
var promoErrorMessage = "";

const checkPromoCode = (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const promo = await fetch("./assets/promo.json");
      const json = await promo.json();

      const matchingPromo = json.find((data) => data.code === code);

      if (matchingPromo) {
        resolve({
          status: true,
          promo: matchingPromo,
        });
      } else {
        resolve({
          status: false,
          promo: null,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

async function applyPromoCode() {
  const input = document.querySelector(".input_box");
  const promoError = document.querySelector(".promo_error");

  let value = input.value;

  let promoCode = {
    status: true,
    details: {
      code: "SUMMER50",
      offer: 50,
    },
  };

  if (value) {
    const res = await checkPromoCode(value);
    if (res.status) {
      input.value = "";

      promocodes.push(res.promo);

      const summery_promo_price = document.getElementById(
        `summary_price_promocode`
      );
      const summery_promo_count = document.getElementById(
        `summary_count_promocode`
      );
      summery_promo_count.innerHTML = `
      <p id="summary_count_promocode" class="summery_card_count">${promocodes.length}x</p>
      `;

      summery_promo_price.innerHTML = `
      <h3 id="summary_price_promocode" class="ticket_price ticket_text summery_text">
        ${res.promo.offer} <span id="summary_currn_promocode" class="ticket_currency ticket_text">%</span>
      </h3>
      `;

      const summary_total = document.querySelector(".summary_total");
      summary_total.innerHTML = `
      <h3 class="ticket_price ticket_text summery_text_total">
      Total
    </h3>
    <h3 id="total_amt" class="ticket_price ticket_text summery_text_amount">
      ${
        (res.promo.offer / 100) * getTotal()
      } <span class="ticket_currency ticket_text">eur</span>
    </h3>
      `;
    } else {
      promoError.style.display = "block";
    }
  } else {
  }
}

const openShoppingcartTab = async () => {
  tab_headings.classList.remove("transaction_tab_active");
  transactionTabHeading.classList.remove("active");
  transactionTabHeading.classList.add("not_active_tab");

  tab_headings.classList.add("shopping_tab_active");
  shoppingTabHeading.classList.add("active");
  const response = await fetch("./assets/cart.json");
  const json = await response.json();

  cartData = json;

  tab_body.innerHTML = "";
  transaction_tab.classList.remove("active_tab");
  shopping_tab.classList.add("active_tab");
  tab_body.appendChild(createShoppingCart(cartData));

  const promoError = document.querySelector(".promo_error");
  promoError.style.display = "none";
};

const openTransactionTab = () => {
  tab_headings.classList.add("transaction_tab_active");
  shoppingTabHeading.classList.remove("active");
  transactionTabHeading.classList.add("active");
  shoppingTabHeading.classList.add("not_active_tab");

  shopping_tab.classList.remove("active_tab");
  transaction_tab.classList.add("active_tab");
  tab_body.innerHTML = "";
  createTable();
};

const makeTicketCard = (details) => {
  const card = document.createElement("tr");
  card.innerHTML = `
  <td>
    <h3 class="ticket_name ticket_text">
      ${details.name}
    </h3>
  </td>
  <td>
    <h3 class="ticket_price ticket_text">
      ${details.price} <span class="ticket_currency ticket_text">eur</span>
    </h3>
  </td>
  <td>
    <div class="counter_button">
      <i onclick="subCounter('${details.id}')" class="fa-solid fa-minus btn"></i>
      <h2 class="counter ticket_text ticket_currency" id="count_${details.id}">${details.count}</h2>
      <i onclick="addCounter('${details.id}')" class="fa-solid fa-plus btn"></i>
    </div>
  </td>
    `;
  return card;
};

const makeSummaryCard = (details) => {
  const ticketCard = document.createElement("div");
  ticketCard.classList.add("summery_card");

  ticketCard.innerHTML = `
  <div  class="summery_card_name">
    <p id="summary_count_${details.id}" class="summery_card_count">${
    details.count
  }x</p>
    <p class="summery_card_data">
      ${details.name}
    </p>
  </div>
  <h3 id="summary_price_${
    details.id
  }" class="ticket_price ticket_text summery_text">
    ${details.price} <span id="summary_currn_${
    details.id
  }" class="ticket_currency ticket_text">${
    details.id === "promocode" ? "%" : "eur"
  }</span>
  </h3>
    `;

  return ticketCard;
};

const createTableColumn = (data) => {
  const tableColumn = document.createElement("tr");
  tableColumn.innerHTML = `
    <td>${data.date}</td>
    <td>${data.qty}</td>
    <td>${data.name}</td>
    <td>\$${data.price}</td>
    <td>${data.discount}</td>
    <td>${data.tax}</td>
    <td>\$${data.total}</td>
  `;
  return tableColumn;
};

function subCounter(id) {
  const details = cartData.find((obj) => obj.id === id);
  if (details.count > 0) {
    details.count--;
  }
  const countElement = document.getElementById(`count_${id}`);
  if (countElement) {
    countElement.textContent = details.count;
  }

  const summaryCount = document.getElementById(`summary_count_${details.id}`);
  const summaryPrice = document.getElementById(`summary_price_${details.id}`);
  const totalAmt = document.getElementById("total_amt");

  summaryCount.textContent = `${details.count} x`;

  summaryPrice.innerHTML = `
  ${details.count * details.price}
    <span id="summary_currn_${
      details.id
    }" class="ticket_currency ticket_text">eur</span>
  `;

  totalAmt.innerHTML = `
  ${getTotal()} <span class="ticket_currency ticket_text">eur</span>
`;
}

function addCounter(id) {
  const details = cartData.find((obj) => obj.id === id);
  details.count++;
  const countElement = document.getElementById(`count_${id}`);
  if (countElement) {
    countElement.innerText = details.count;
  }

  const summaryCount = document.getElementById(`summary_count_${details.id}`);
  const summaryPrice = document.getElementById(`summary_price_${details.id}`);
  const totalAmt = document.getElementById("total_amt");

  summaryCount.textContent = `${details.count} x`;

  summaryPrice.innerHTML = `
  ${details.count * details.price}
    <span id="summary_currn_${
      details.id
    }" class="ticket_currency ticket_text">eur</span>
  `;

  totalAmt.innerHTML = `
    ${getTotal()} <span class="ticket_currency ticket_text">eur</span>
  `;
}

async function createTable() {
  const res = await fetch("/assets/transaction.json");
  const transactions = await res.json();
  const table = document.createElement("table");
  table.classList.add("table");

  tab_body.appendChild(table);

  displayData(transactions, table);
}

function createShoppingCart(data) {
  const shoppingCartData = document.createElement("div");
  shoppingCartData.classList.add("shopping_cart_data");

  const ticketsSection = document.createElement("div");
  ticketsSection.classList.add("tickets_section");
  shoppingCartData.appendChild(ticketsSection);

  const cards = document.createElement("div");
  cards.classList.add("cards");
  ticketsSection.appendChild(cards);

  const cart_table = document.createElement("table");
  cart_table.classList.add("cart_table");

  data.forEach((item) => {
    const ticketCard = makeTicketCard(item);
    cart_table.appendChild(ticketCard);
  });

  cards.appendChild(cart_table);

  // Promo section
  const promoSection = document.createElement("div");
  promoSection.classList.add("promo_section");
  ticketsSection.appendChild(promoSection);

  const promoInputContainer = document.createElement("div");
  promoInputContainer.classList.add("promo_input_container");
  promoSection.appendChild(promoInputContainer);

  const promoInput = document.createElement("div");
  promoInput.classList.add("promo_input");
  promoInputContainer.appendChild(promoInput);

  const inputBox = document.createElement("input");
  inputBox.setAttribute("type", "text");
  inputBox.classList.add("input_box");
  inputBox.setAttribute("placeholder", "Enter code");
  promoInput.appendChild(inputBox);

  inputBox.addEventListener("input", function () {
    const inputValue = inputBox.value;
    inputBox.value = inputValue.toUpperCase();
  });

  const promoLabel = document.createElement("div");
  promoLabel.classList.add("promo_label");
  promoLabel.textContent = "Promo code";
  promoInput.appendChild(promoLabel);

  const promoApplyButton = document.createElement("button");
  promoApplyButton.classList.add("promo_apply_button");
  promoApplyButton.textContent = "Apply";
  promoApplyButton.onclick = applyPromoCode;
  promoInput.appendChild(promoApplyButton);

  //
  const promoError = document.createElement("p");
  promoError.classList.add("promo_error");
  promoInputContainer.appendChild(promoError);

  const promoErrIcon = document.createElement("span");
  promoErrIcon.classList.add("promo_err_icon");
  promoError.appendChild(promoErrIcon);

  const faSharpIcon = document.createElement("i");
  faSharpIcon.classList.add("fa-sharp", "fa-light", "fa-circle-exclamation");
  promoErrIcon.appendChild(faSharpIcon);

  const promoErrText = document.createTextNode("Promocode not valid");
  promoErrText.id = "error_text";
  promoError.appendChild(promoErrText);
  //

  // Order summary
  const orderSummary = document.createElement("div");
  orderSummary.classList.add("order_summery");
  shoppingCartData.appendChild(orderSummary);

  const summery_heading = document.createElement("h2");
  summery_heading.textContent = "Order summary";
  summery_heading.classList.add("summery_heading");

  orderSummary.appendChild(summery_heading);

  const summery_data = document.createElement("div");
  summery_data.classList.add("summery_data");

  const summery_cards = document.createElement("div");
  summery_cards.classList.add("summery_cards");

  summery_data.appendChild(summery_cards);

  orderSummary.appendChild(summery_data);

  let total = 0;
  data.forEach((item) => {
    const summery_card = makeSummaryCard(item);
    summery_cards.appendChild(summery_card);
    total += item.price * item.count;
  });

  const summary_total = document.createElement("div");
  summary_total.classList.add("summary_total");

  const summary_ticket = makeSummaryCard({
    id: "promocode",
    price: 0,
    name: "Promo code",
    count: 0,
  });

  summery_cards.appendChild(summary_ticket);

  summary_total.innerHTML = `
  <h3 class="ticket_price ticket_text summery_text_total">
    Total
  </h3>
  <h3 id="total_amt" class="ticket_price ticket_text summery_text_amount">
    ${getTotal()} <span class="ticket_currency ticket_text">eur</span>
  </h3>
  `;

  summery_cards.appendChild(summary_total);

  const summary_button = document.createElement("button");
  summary_button.innerText = "Checkout";
  summary_button.classList.add("summery_button");

  summery_data.appendChild(summary_button);

  return shoppingCartData;
}

function getTotal() {
  let total = 0;
  cartData.forEach((item) => (total += item.count * item.price));
  return total;
}

// pagination
// Number of records to show per page

function displayData(data, table) {
  var startIndex = (currentPage - 1) * recordsPerPage;
  var endIndex = Math.min(startIndex + recordsPerPage, data.length);
  var paginatedData = data.slice(startIndex, endIndex);

  const tbody = document.createElement("tbody");
  tbody.classList.add("tbody");

  paginatedData.forEach((transaction) => {
    const tr = createTableColumn(transaction);
    tbody.appendChild(tr);
  });
  table.innerHTML = `
  <thead class="table_head">
    <tr>
      <th>Date</th>
      <th>Qty</th>
      <th>Product</th>
      <th>Unit price</th>
      <th>Discount</th>
      <th>Tax</th>
      <th>Total</th>
    </tr>
  </thead>
  `;
  table.appendChild(tbody);

  const page = document.createElement("tr");
  page.innerHTML = `
  <td class="table_select_option" colspan="2">
    Showing ${startIndex + 1}-${endIndex} of ${data.length}
    <span>
      <select class="select_section" value="${recordsPerPage}" name="" id="">
      </select>
    </span>
  </td>
  <td colspan="5">
    <div id="pagination-container">
      <ul id="pagination">
      </ul>
    </div>
  </td>
  `;

  const select = page.querySelector("select");
  select.addEventListener("change", (e) => {
    recordsPerPage = Number(e.target.value);
    displayData(data, table);
  });

  values.forEach((value) => {
    const option = document.createElement("option");
    option.innerText = value;
    option.value = value;
    if (recordsPerPage === value) {
      option.selected = true;
    }

    select.appendChild(option);
  });
  tbody.appendChild(page);

  // Display the paginated data on the page
  document.getElementById("pagination").innerHTML = "";
  // Update the pagination links
  var totalRecords = data.length;
  var totalPages = Math.ceil(totalRecords / recordsPerPage);

  console.log({
    currentPage,
    totalPages,
  });
  const pagination = document.getElementById("pagination");

  const leftButton = document.createElement("button");
  leftButton.innerHTML = "&laquo;";


  if (currentPage <= 1) {
    leftButton.disabled = false;
  } else {
    leftButton.disabled = false;
  }

  leftButton.addEventListener("click", () => {
    currentPage -= 1;
    displayData(data, table);
  });
  pagination.appendChild(leftButton);

  for (i = 1; i <= totalPages; i++) {
    let btn = document.createElement("button");
    btn.innerText = i;
    pagination.appendChild(btn);
    btn.addEventListener("click", (e) => {
      currentPage = Number(e.target.innerText);
      displayData(data, table);
    });
    if (i === currentPage) {
      btn.disabled = true;
    }
  }

  const rightButton = document.createElement("button");

  rightButton.innerHTML = "&raquo;";

  rightButton.addEventListener("click", () => {
    currentPage += 1;
    displayData(data, table);
  });

  if (currentPage <= totalPages) {
    rightButton.disabled = false;
  } else {
    rightButton.disabled = true;
  }

  pagination.appendChild(rightButton);
}
