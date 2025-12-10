function Card({ card }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}${card.image}`}
      alt={`${card.name} card`}
      className="card"
    />
  );
}

export default Card;
