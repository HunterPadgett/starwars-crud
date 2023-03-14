const updatebtn = document.querySelector("#update-button");

async function updateQuote() {
 await fetch("/quotes", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
   name: "Darth Vader",
   quote: "I find your lack of faith disturbing.",
  }),
 })
  .then((res) => res.json())
  .then((data) => {
   console.log(data);
  })
  .catch((err) => console.log(err));
}

// Next, we’re going to send the PUT / UPDATE request when the button is clicked
updatebtn.addEventListener("click", updateQuote);
