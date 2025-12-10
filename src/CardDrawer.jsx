import * as yaml from "yaml";
import cardDataYaml from "./card-data.yaml?raw";
import Card from "./Card";

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

  const lastDrawJson = localStorage.getItem("lastDraw");

  if (lastDrawJson !== null) {
    const lastDraw = JSON.parse(lastDrawJson);
    const lastDrawDate = new Date(lastDraw.timestamp);
    const elapsed = Date.now() - lastDrawDate.getTime();
    if (elapsed / 1000 / 60 / 60 < 24) {
      return lastDraw.cards.map((id) =>
        data.cards.find((card) => card.id === id),
      );
    }
  }

  for (let i = 0; i < 3; i++) {
    const card = chooseCard(data.chances, data.cards);
    cards.push(card);
  }

  const drawResult = {
    timestamp: Date.now(),
    cards: cards.map((card) => card.id),
  };
  localStorage.setItem("lastDraw", JSON.stringify(drawResult));

  return cards;
}

function CardDrawer() {
  const cardData = yaml.parse(cardDataYaml);
  const cards = drawCards(cardData);

  return (
    <div className="card-drawer">
      {cards.map((card, i) => (
        <Card key={i} card={card} />
      ))}
    </div>
  );
}

export default CardDrawer;
