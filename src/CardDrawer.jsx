import cardData from "./card-data.json";

function drawCards(data) {
  const cards = [];
  for (let i = 0; i < 3; i++) {
    const id = Math.floor(Math.random() * data.cards.length);
    cards.push(data.cards[id]);
  }

  return cards;
}

function CardDrawer() {
  const cards = drawCards(cardData);

  return (
    <div className="card-drawer">
      {cards.map((card, i) => (
        <img key={i} src={card.image} className="card" />
      ))}
    </div>
  );
}

export default CardDrawer;
