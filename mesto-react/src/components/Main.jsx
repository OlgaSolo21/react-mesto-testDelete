// !--MAIN - ЭТО РАЗМЕТКА ДЛЯ ОСНОВНОЙ ЧАСТИ СТРАНИЦЫ (ФУТЕР И ХЕДЕР ОТДЕЛЬНО)--! //
import addButton from "../images/addButton.svg";
import Card from "./Card.jsx";
import api from "../utils/api.js";
import {useState, useEffect} from "react";

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {

    // переменная состояния имени, о себе и аватара для запроса их с сервера
    const [userData, setUserData] = useState({
        name: '',
        about: '',
        avatar: ''
    })

    // переменная состояния для массива карточек и запрос на сервер за ними
    const [cardsItem, setCardsItem] = useState([])

    useEffect(() => { //используем хук для монтирования данных на страницу
        api.getUserProfile() //данные пользователя
            .then((data) => {
                setUserData({
                    name: data.name,
                    about: data.about,
                    avatar: data.avatar
                })
            })
            .catch(console.error)

        api.getInitialCards() // данные карточек
            .then((data) => {
                setCardsItem(data)
            })
            .catch(console.error)
    }, []);


    return(
        <main className="content">
            <section className="profile">
                <img
                    src={userData.avatar}
                    alt="Фото профиля"
                    className="profile__avatar"
                    //style={{ backgroundImage: `url(${avatarLink})` }}
                />
                <div className="profile__overlay" onClick={onEditAvatar}>
                    <button
                        type="button"
                        aria-label="EditIcon"
                        className="profile__icon"
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{userData.name}</h1>
                    <button
                        type="button"
                        aria-label="Edit"
                        className="profile__edit-button cursor"
                        onClick={onEditProfile}
                    />
                    <p className="profile__subtitle">{userData.about}</p>
                </div>
                <button
                    type="button"
                    aria-label="Add"
                    className="profile__add-button cursor"
                    onClick={onAddPlace}
                >
                    <img
                        src={addButton}
                        alt="Кнопка добавить"
                    />
                </button>
            </section>
            <section className="cards">
                <ul className="cards__elements">
                    {cardsItem.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                        />
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}

export default Main