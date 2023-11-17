import '../index.css'
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "./Main.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import {useEffect, useState} from "react";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import DeleteCardPopup from "./DeleteCardPopup.jsx";

function App() {
    //пишем [переменные is и их внутреннее состояние setIs] для открытия попапов
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
    const [isDeletePopup, setIsDeletePopup] = useState(false) //попап удаления своей карточки

    //функции обработчики событий, которые изменяют внутреннее состояние попапов
    function handleEditProfileClick() { //редактирование профиля
        setIsEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() { //добавление картинки
        setIsAddPlacePopupOpen(true)
    }
    function handleEditAvatarClick() { //редактирование аватара
        setIsEditAvatarPopupOpen(true)
    }

    function handleDeleteCardPopup() { //попап удаления своей карточки заготовка
        setIsDeletePopup(true)
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setSelectedCard({})
    }

    //стейт-переменная открытия карточки на весь экран
    const [selectedCard, setSelectedCard] = useState({})
    function handleOpenFullScreenCard(selectedCard) {
        setSelectedCard(selectedCard)
    }

    // стейт currentUser в корневом компоненте чтобы данные о текущем пользователе были видны во всех местах
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => { //используем хук для монтирования данных на страницу
        api.getUserProfile() //данные пользователя
            .then((res) => setCurrentUser(res))
            .catch(console.error)
    }, [])

    // переменная состояния для массива карточек и запрос на сервер за ними
    const [cards, setCards] = useState([])

    useEffect(() => { //используем хук для монтирования данных на страницу

        api.getInitialCards() // данные карточек
            .then((cards) => {
                setCards(cards)
            })
            .catch(console.error)
    }, []);

    // функционал поддержки лайков и дизлайков
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch(console.error)
    }

    // функциона поддержки удаления карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== card._id))
                closeAllPopups()
            })
            .catch(console.error)
            .finally(() => {})
    }

    //работа с блоком редактирования данных
    function handleUpdateUser(data) {
        api.editProfilePatch(data)
            .then((item) => {
                setCurrentUser(item)
                closeAllPopups()
            })
            .catch(console.error)
    }

    //работа с блоком изменения аватара
    function handleUpdateAvatar(data) {
        api.updateAvatarPatch(data)
            .then((item) => {
                setCurrentUser(item)
                closeAllPopups()
            })
            .catch(console.error)
    }

    //работа с блоком добавления новой карточки
    function handleAddPlaceSubmit(data) {
        api.addNewCardPost(data)
            .then((newCard) => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch(console.error)
    }

  return (
      // оборачиваем все содержимое в контекст с провайдером
      <CurrentUserContext.Provider value={currentUser}>
          <Header/>
          <Main
              onEditProfile={handleEditProfileClick} //редактирование профиля
              onAddPlace={handleAddPlaceClick} //добавление картинки
              onEditAvatar={handleEditAvatarClick} //редактирование аватара
              onCardClick={handleOpenFullScreenCard}
              cards={cards}
              onCardLike={handleCardLike}
              //onDeleteCard={handleCardDelete}
              onCardDeletePopup={handleDeleteCardPopup}
          />
          <Footer/>

          <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
          />

          <DeleteCardPopup
              isOpen={isDeletePopup}
              onClose={closeAllPopups}
              onDeleteCard={handleCardDelete}
          />

          <ImagePopup
              card={selectedCard}
              onClose={closeAllPopups}
              isOpen={selectedCard._id !== undefined}
          />
      </CurrentUserContext.Provider>
  )
}

export default App
