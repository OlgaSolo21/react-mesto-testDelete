// !--MAIN - ЭТО РАЗМЕТКА ДЛЯ ОСНОВНОЙ ЧАСТИ СТРАНИЦЫ (ФУТЕР И ХЕДЕР ОТДЕЛЬНО)--! //
import addButton from "../images/addButton.svg";
import {useEffect, useState} from "react";
import api from "../utils/api.js";
function Main({onEditProfile, onEditAvatar, onAddPlace}) {
    // переменные состояния имени, о себе и аватара для запроси их с сервера
    const [userName, setUserName] = useState('')
    const [userJob, setUserJob] = useState('')
    const [avatarLink, setAvatarLink] = useState('')

    // переменная состояния для массива карточек и запрос на сервер за ними
    const [cardItem, setCardItem] = useState([])

    useEffect(() => { //используем хук для монтирования данных на страницу
        Promise.all([api.getUserProfile(), api.getInitialCards()])
            .then(([user, cards]) => {
                setUserName(user.name)
                setUserJob(user.about)
                setAvatarLink(user.avatar)

                cards.map((data) => {
                    data.userId = user._id
                })
                setCardItem([cards])
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    }, []);

    return(
        <main className="content">
            <section className="profile">
                <img
                    src={avatarLink}
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
                    <h1 className="profile__title">{userName}</h1>
                    <button
                        type="button"
                        aria-label="Edit"
                        className="profile__edit-button cursor"
                        onClick={onEditProfile}
                    />
                    <p className="profile__subtitle">{userJob}</p>
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
                <ul className="cards__elements"></ul>
            </section>
        </main>
    )
}

export default Main