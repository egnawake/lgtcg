import cardData from "./card-data.json";

function rollRarity(chances) {
  const weightTotal = chances
    .map((c) => c.weight)
    .reduce((sum, current) => sum + current, 0);

  const sample = Math.random() * weightTotal;

  let sum = 0;
  for (const c of chances) {
    sum = sum + c.weight;
    if (sample < sum) return c;
  }
}

function chooseCard(chances, cards) {
  const rarity = rollRarity(chances);
  const cardsWithRarity = cards.filter((c) => c.rarity === rarity.id);
  const i = Math.floor(Math.random() * cardsWithRarity.length);
  return cardsWithRarity[i];
}

function drawCards(data) {
  const cards = [];
  for (let i = 0; i < 3; i++) {
    const card = chooseCard(data.chances, data.cards);
    cards.push(card);
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
