import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

import { useAppDispatch } from "../../../shared/lib/hooks";
import { NewPlaceT } from "../../../entities/places/model/schema";
import { addPlace } from "../../../entities/places/model/placesThunk";

type Props = {
  show: boolean;
  onClose: () => void;
};

function AddPlaceModal({ show, onClose }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();

  // Начальные значения для новой карточки
  const [formData, setFormData] = useState<NewPlaceT>({
    name: "",
    description: "",
    category: "place",
    location: "",
    lat: 0,
    lon: 0,
    rating: 5,
    imageUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "lat" || name === "lon" || name === "rating"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleSave = () => {
    console.log(formData);
    dispatch(addPlace(formData)); // Отправка нового места в Redux
    onClose(); // Закрытие модального окна после сохранения
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новое место</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formPlaceName" className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPlaceLocation" className="mb-3">
            <Form.Label>Локация</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPlaceDescription" className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPlaceCategory" className="mb-3">
            <Form.Label>Категория</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPlaceLat" className="mb-3">
            <Form.Label>Широта</Form.Label>
            <Form.Control
              type="number"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPlaceLon" className="mb-3">
            <Form.Label>Долгота</Form.Label>
            <Form.Control
              type="number"
              name="lon"
              value={formData.lon}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formPlaceRating" className="mb-3">
            <Form.Label>Рейтинг</Form.Label>
            <Form.Control
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min={1}
              max={5}
            />
          </Form.Group>

          <Form.Group controlId="formPlaceImageUrl" className="mb-3">
            <Form.Label>Ссылка на изображение</Form.Label>
            <Form.Control
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddPlaceModal;
