const modal = document.getElementById("purchaseModal");
const closeModal = document.getElementById("closeModal");
const modalPack = document.getElementById("modalPack");
const modalPrice = document.getElementById("modalPrice");
const payTitle = document.getElementById("payTitle");
const payAmount = document.getElementById("payAmount");
const paypalButton = document.getElementById("paypalButton");
const steps = [...document.querySelectorAll(".steps i")];
const panels = [...document.querySelectorAll(".step")];

let order = {pack:"", price:"", discord:"", id:""};

function showStep(n){
  panels.forEach(p => p.classList.toggle("active", p.dataset.step === String(n)));
  steps.forEach((s,i) => s.classList.toggle("active", i === n-1));
}

function openPurchase(pack, price){
  order = {pack, price, discord:"", id:""};
  modalPack.textContent = pack;
  modalPrice.textContent = `$${price} USD`;
  payTitle.textContent = `Gilded — ${pack}`;
  payAmount.textContent = `$${price} USD`;

  // Replace this with your own PayPal checkout/payment link.
  paypalButton.href = "https://www.paypal.com/";
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  showStep(1);
}

document.querySelectorAll(".buy").forEach(button => {
  button.addEventListener("click", () => openPurchase(button.dataset.pack, button.dataset.price));
});

function closePurchase(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
}
closeModal.addEventListener("click", closePurchase);
document.getElementById("done").addEventListener("click", closePurchase);
modal.addEventListener("click", e => { if(e.target === modal) closePurchase(); });

document.getElementById("continue").addEventListener("click", () => {
  const discord = document.getElementById("discordUsername").value.trim();
  const id = document.getElementById("discordId").value.trim();
  const terms = document.getElementById("terms").checked;

  if(!discord || !id){ alert("Enter your Discord username and Discord ID."); return; }
  if(!/^\d{15,25}$/.test(id)){ alert("Discord ID should contain digits only."); return; }
  if(!terms){ alert("Please accept the terms before continuing."); return; }

  order.discord = discord;
  order.id = id;
  showStep(2);
});

document.querySelectorAll(".back-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const current = panels.findIndex(p => p.classList.contains("active")) + 1;
    showStep(Math.max(1, current - 1));
  });
});

document.getElementById("submitOrder").addEventListener("click", () => {
  document.getElementById("sumPack").textContent = order.pack;
  document.getElementById("sumPrice").textContent = `$${order.price} USD`;
  document.getElementById("sumDiscord").textContent = order.discord;
  document.getElementById("sumId").textContent = order.id;
  showStep(4);

  /*
    REAL ORDER SUBMISSION:
    Connect this button to your own Cloudflare Pages Function /api/order
    or another backend endpoint. Do not put Discord webhook URLs or other
    secrets directly in this browser JavaScript.
  */
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", () => {
    if(a.getAttribute("href") === "#discord") {
      // Replace the Discord URL in index.html with your actual invite.
    }
  });
});
