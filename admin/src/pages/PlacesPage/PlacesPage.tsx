import React from "react";
import { Container } from "react-bootstrap";

import PlacesList from "../../features/Places/ui/PlacesList";

export default function PlacesPage(): React.JSX.Element {
  return (
    <Container>
      <PlacesList />
    </Container>
  );
}
