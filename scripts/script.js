const shopping_tab = document.querySelector(".shopping_tab");
const transaction_tab = document.querySelector(".transaction_tab");
// const tabHeadings = document.querySelectorAll(".tab_heading");
const tab_body = document.querySelector(".tab_body");

const shopping_cart_arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

window.addEventListener("load", () => openShoppingcartTab());

const openShoppingcartTab = () => {
  tab_body.innerHTML = "";
  transaction_tab.classList.remove("active_tab");
  shopping_tab.classList.add("active_tab");
  tab_body.appendChild(createShoppingCart());
};

const openTransactionTab = () => {
  shopping_tab.classList.remove("active_tab");
  transaction_tab.classList.add("active_tab");
  tab_body.innerHTML = "";
  createTable();
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
  ticketCard.classList.add("summery_card");

  ticketCard.innerHTML = `
  <div class="summery_card_name">
    <p class="summery_card_count">2x</p>
    <p class="summery_card_data">
      All Access Ticket for Startups (less than $20M ARR)
    </p>
  </div>
  <h3 class="ticket_price ticket_text summery_text">
    120 <span class="ticket_currency ticket_text">eur</span>
  </h3>
    `;

  return ticketCard;
};

const createTableColoumn = () => {
  const tableColoumn = document.createElement("tr");
  tableColoumn.innerHTML = `
  <td>2023-05-01</td>
  <td>2</td>
  <td>All Access Ticket for Startups (less than $20M ARR)</td>
  <td>$250</td>
  <td>0</td>
  <td>20</td>
  <td>$250</td>
  `;
  return tableColoumn;
};

function createTable() {
  const table = document.createElement("table");
  table.classList.add("table");

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

  const tbody = document.createElement("tbody");
  tbody.classList.add("tbody");

  shopping_cart_arr.forEach((data) => {
    const tr = createTableColoumn();
    tbody.appendChild(tr);
  });

  const pagination = document.createElement("tr");
  pagination.innerHTML = `
  <td class="table_select_option" colspan="2">
    Showing 1-5 of 15
    <span>
      <select class="select_section" name="" id="">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    </span>
  </td>
  <td colspan="5">
    <div id="pagination-container">
      <ul id="pagination">
        <li><a id="prev-page" href="#">&laquo;</a></li>
        <li><a id="next-page" href="#">&raquo;</a></li>
      </ul>
    </div>
  </td>
  `;
  tbody.appendChild(pagination);

  table.appendChild(tbody);

  tab_body.appendChild(table);
}

function createShoppingCart() {
  const shoppingCartData = document.createElement("div");
  shoppingCartData.classList.add("shopping_cart_data");

  const ticketsSection = document.createElement("div");
  ticketsSection.classList.add("tickets_section");
  shoppingCartData.appendChild(ticketsSection);

  const cards = document.createElement("div");
  cards.classList.add("cards");
  ticketsSection.appendChild(cards);

  shopping_cart_arr.forEach((data) => {
    const ticketCard = makeTicketCard();
    cards.appendChild(ticketCard);
  });

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

  const promoLabel = document.createElement("div");
  promoLabel.classList.add("promo_label");
  promoLabel.textContent = "Promo code";
  promoInput.appendChild(promoLabel);

  const promoApplyButton = document.createElement("button");
  promoApplyButton.classList.add("promo_apply_button");
  promoApplyButton.textContent = "Apply";
  promoInput.appendChild(promoApplyButton);

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
  promoError.appendChild(promoErrText);

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

  shopping_cart_arr.forEach((data) => {
    const summery_card = makeSummaryCard();
    summery_cards.appendChild(summery_card);
  });

  const summary_total = document.createElement("div");
  summary_total.classList.add("summary_total");

  summary_total.innerHTML = `
  <h3 class="ticket_price ticket_text summery_text_total">
    Total
  </h3>
  <h3 class="ticket_price ticket_text summery_text_amount">
    120 <span class="ticket_currency ticket_text">eur</span>
  </h3>
  `;

  summery_cards.appendChild(summary_total);

  const summary_button = document.createElement("button");
  summary_button.innerText = "Checkout";
  summary_button.classList.add("summery_button");

  summery_data.appendChild(summary_button);

  return shoppingCartData;
}

// pagination

var currentPage = 1;
var recordsPerPage = 5; // Number of records to show per page
var data = []; // Your data array

function displayData() {
  var startIndex = (currentPage - 1) * recordsPerPage;
  var endIndex = startIndex + recordsPerPage;
  var paginatedData = data.slice(startIndex, endIndex);

  // Display the paginated data on the page
  var output = "";
  for (var i = 0; i < paginatedData.length; i++) {
    output += "<li>" + paginatedData[i] + "</li>";
  }
  document.getElementById("pagination").innerHTML = output;

  // Update the pagination links
  var totalRecords = data.length;
  var totalPages = Math.ceil(totalRecords / recordsPerPage);
  var paginationOutput = "";

  // Left arrow button
  if (currentPage > 1) {
    paginationOutput +=
      '<li><a href="#" onclick="changePage(' +
      (currentPage - 1) +
      ')">&laquo;</a></li>';
  } else {
    paginationOutput += '<li><span class="disabled">&laquo;</span></li>';
  }

  // Page numbers
  for (var j = 1; j <= totalPages; j++) {
    if (j === currentPage) {
      paginationOutput += '<li><a class="active" href="#">' + j + "</a></li>";
    } else {
      paginationOutput +=
        '<li><a href="#" onclick="changePage(' + j + ')">' + j + "</a></li>";
    }
  }

  // Right arrow button
  if (currentPage < totalPages) {
    paginationOutput +=
      '<li><a href="#" onclick="changePage(' +
      (currentPage + 1) +
      ')">&raquo;</a></li>';
  } else {
    paginationOutput += '<li><span class="disabled">&raquo;</span></li>';
  }

  document.getElementById("pagination").innerHTML = paginationOutput;
}

function changePage(page) {
  currentPage = page;
  displayData();
}

// Example usage: Set your data and call displayData() initially
data = [
  "Record 1",
  "Record 2",
  "Record 3",
  "Record 4",
  "Record 5",
  "Record 6",
  "Record 7",
  "Record 8",
  "Record 9",
  "Record 10",
  "Record 11",
  "Record 12",
  "Record 13",
  "Record 14",
  "Record 15",
  "Record 16",
];

displayData();
