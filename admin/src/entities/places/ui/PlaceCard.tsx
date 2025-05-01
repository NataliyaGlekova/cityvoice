import { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { PlaceT } from "../model/schema";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { deletePlace, editPlace } from "../model/placesThunk";

type Props = {
  place: PlaceT;
};

function PlaceCard({ place }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [showFull, setShowFull] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleShow = () => setShowFull((prev) => !prev);

  const [formData, setFormData] = useState<PlaceT>(place);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "lat" || name === "lon" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSave = () => {
    void dispatch(editPlace(formData));
    setShowModal(false);
  };

  const handleDelete = () => {
    if (confirm("Вы уверены, что хотите удалить это место?")) {
      void dispatch(deletePlace(place.id));
    }
  };

  const shortText =
    place.description.slice(0, 100) +
    (place.description.length > 150 ? "..." : "");

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={place.imageUrl}
          style={{ height: "180px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{place.name}</Card.Title>
          <Card.Text>{place.location}</Card.Text>
          <Card.Text>★{place.rating}</Card.Text>
          <Card.Text>
            {showFull ? place.description : shortText}
            {place.description.length > 150 && (
              <Button variant="link" size="sm" onClick={toggleShow}>
                {showFull ? "Скрыть" : "Развернуть"}
              </Button>
            )}
          </Card.Text>
          <Card.Text>
            {place.lat} | {place.lon}
          </Card.Text>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Редактировать
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Удалить
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать место</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formPlaceName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaceLocation">
              <Form.Label>Локация</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaceDescription">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaceLat">
              <Form.Label>Широта (lat)</Form.Label>
              <Form.Control
                type="number"
                step="0.000001"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaceLon">
              <Form.Label>Долгота (lon)</Form.Label>
              <Form.Control
                type="number"
                step="0.000001"
                name="lon"
                value={formData.lon}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaceRating">
              <Form.Label>Оценка</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="5"
                step="0.1"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPlaceImageUrl">
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PlaceCard;
