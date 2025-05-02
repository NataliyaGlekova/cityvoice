import { Button, Col, Row } from "react-bootstrap";
import PlaceCard from "../../../entities/places/ui/PlaceCard";
import AddPlaceModal from "../../addPlace/ui/AddPlaceModal";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { useEffect, useState } from "react";
import { fetchPlaces } from "../../../entities/places/model/placesThunk";

export default function PlacesList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const places = useAppSelector((state) => state.place.places);
  const [showAddModal, setShowAddModal] = useState(false); // Состояние для управления модальным окном

  useEffect(() => {
    void dispatch(fetchPlaces("place"));
  }, [dispatch]);

  // Открытие модального окна
  const handleAddPlace = () => {
    setShowAddModal(true);
  };

  // Закрытие модального окна
  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleAddPlace}
        style={{ marginTop: "1rem" }}
      >
        Добавить место
      </Button>

      <Row className="g-3" style={{ marginTop: "2rem" }}>
        {places.map((place) => (
          <Col key={place.id} xs={12} sm={6} md={4} lg={3}>
            <PlaceCard place={place} />
          </Col>
        ))}
      </Row>

      {/* Добавляем компонент модального окна */}
      <AddPlaceModal show={showAddModal} onClose={handleCloseAddModal} />
    </>
  );
}
