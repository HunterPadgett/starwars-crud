const updatebtn = document.querySelector("#update-button");
const deletebtn = document.querySelector("#delete-button");
const userMessage = document.querySelector("#message");

async function updateYodaQuote() {
 await fetch("/quotes", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
   name: "Darth Vader",
   quote: "I find your lack of faith disturbing.",
  }),
 })
  .then((res) => {
   if (res.ok) return res.json();
  })
  .then((data) => {
   console.log(data);
   window.location.reload(true);
  })
  .catch((err) => console.log(err));
}

async function deleteDarthQuote() {
 await fetch("/quotes", {
  method: "delete",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
   name: "Darth Vader",
  }),
 })
  .then((res) => {
   if (res.ok) return res.json();
  })
  .then((data) => {
   console.log(data);
   if (data === "no Darth quote to delete") {
    userMessage.textContent = "No Darth Vader quote to delete.";
   } else {
    window.location.reload(true);
   }
  })
  .catch((err) => console.log(err));
}

// Next, we’re going to send the PUT / UPDATE request when the button is clicked
updatebtn.addEventListener("click", updateYodaQuote);
deletebtn.addEventListener("click", deleteDarthQuote);
