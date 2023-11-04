function Card({card, onCardClick}) {

    const handleCardClick = () => {
        onCardClick(card)
    }

    return(
        <li className="cards__item">
            <img className="cards__image cursor" src={card.link} alt={`Фото ${card.name}`} onClick={handleCardClick} />
            <button className="cards__trash cursor" />
            <div className="cards__content">
                <h2 className="cards__title">{card.name}</h2>
                <div className="cards__group-likes">
                    <button type="button" aria-label="Check" className="cards__like" />
                    <span className="cards__like-amount">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card