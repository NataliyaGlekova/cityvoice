import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  ViewStyle,
  Modal,
} from "react-native";
import YaMap, { Marker } from "react-native-yamap";
import CardMarker from "../card-marker/CardMarker";

type Card = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  rating: number;
  location: string;
  lat: number;
  lon: number;
};

const Map = () => {
  const [zoomLevel, setZoomLevel] = useState(10);
  const mapRef = useRef<any>(null);

  const [isModalVisible, setIsModalVisible] = useState(false); // Состояние для отображения модального окна
  const [currentPlace, setCuurentId] = useState<Card | null>(null); // Состояние для отображения модального окна
  const [selectedPlace, setSelectedPlace] = useState<any>(null); // Состояние для выбранного места

  const places: Card[] = [
    {
      id: 1,
      lat: 55.921498,
      lon: 36.845375,
      name: "Воскресенский Ново-Иерусалимский монастырь",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSysw2H5YRT87tLQKffR8Lw0TYCORsKPV2EiA&ss",
      description: "Основан в 1656 году святейшим патриархом Никоном",
      rating: 5,
      location: "Истра, Россия",
    },
    {
      id: 2,
      lat: 55.917494,
      lon: 36.856185,
      name: "Смотровая площадка",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/5479189/2a0000017c7b29a8dfb07aa37b16f98dfc8a/XXXL",
      description:
        "Эта смотровая площадка расположена в парке, откуда открывается великолепный вид на Ново-Иерусалимский монастырь и реку Истру. Посетители отмечают, что это одно из самых красивых мест в Подмосковье.",
      rating: 5,
      location: "Истра, Россия",
    },
    {
      id: 2,
      lat: 55.919171,
      lon: 36.857,
      name: "Истринский городской парк",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/10470901/2a0000019104916392febf7a222c88c1f529/XXXL",
      description:
        "Истринский городской парк — это уютное место для прогулок, где можно насладиться красивыми видами на Ново-Иерусалимский монастырь и реку Истра.",
      rating: 5,
      location: "Истра, Россия",
    },
    {
      id: 3,
      lat: 55.920577,
      lon: 36.861716,
      name: "Памятник А.П. Чехову",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/4447467/2a000001775391ed655b8b819c51d4caad79/XXXL",
      description:
        "Памятник А. П. Чехову расположен около Истринского драматического театра.",
      rating: 4.9,
      location: "Истра, Россия",
    },
    {
      id: 4,
      lat: 55.926733,
      lon: 36.84458,
      name: "Государственный историко-художественный музей Новый Иерусалим",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/753950/2a00000164f9657c1b5f7e96cb533203505c/XXXL",
      description: "Музей. Культурный центр. Выставочный центр",
      rating: 4.9,
      location: "Истра, Россия",
    },
    {
      id: 5,
      lat: 55.908592,
      lon: 36.861079,
      name: "Молодёжный центр",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/223006/2a0000015b179289c3ea881c856172f0a58c/XXXL",
      description:
        "Кинотеатр «Молодёжный центр» — это место, где можно не только посмотреть кино, но и провести время с семьей или друзьями.",
      rating: 4.9,
      location: "Истра, Россия",
    },
    {
      id: 6,
      lat: 55.905387,
      lon: 36.873626,
      name: "Арена-Истра",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/13308954/2a0000018ff92850c6af09774b37c5f2a9d1/XXXL",
      description:
        "В спортивном комплексе «Арена-Истра» есть 25-метровый бассейн с пятью дорожками для занятий в секциях и одной-двумя дорожками для посетителей.",
      rating: 5,
      location: "Истра, Россия",
    },
    {
      id: 7,
      lat: 55.9152,
      lon: 36.840738,
      name: "Выставка старых автомобилей 1940-70-х годов",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/4416885/2a00000179c93e91dfa40889dd0914056f51/XXXL",
      description: "...",
      rating: 4.6,
      location: "Истра, Россия",
    },
    {
      id: 8,
      lat: 55.921589,
      lon: 36.838506,
      name: "Изба Кокориных",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/1870294/2a0000017212e9269ae977c8d53cd39fdeb0/XXXL",
      description:
        "Изба Кокориных — это памятник деревянного зодчества, расположенный в Истринском районе Московской области.",
      rating: 4.3,
      location: "Истра, Россия",
    },
    {
      id: 9,
      lat: 55.920821,
      lon: 36.834862,
      name: "Новоиерусалимская мельница",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/2408669/2a0000017515c5f5a440ef49986958649206/XXXL",
      description:
        "Новоиерусалимская мельница переехала в Истру из села Кочемлево Тверской области, куда, в свою очередь, попала из соседнего селения, где находилась на балансе колхоза.",
      rating: 4.3,
      location: "Истра, Россия",
    },
    {
      id: 10,
      lat: 55.919388,
      lon: 36.867474,
      name: "Пожарные костюмы и водокачка",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018b4c9bd3db778e043cc175274451/XXXL",
      description:
        "Небольшая выставка исторических предметов, которые использовали пожарные в разное время, расположена за небольшой витриной на территории пожарной части.",
      rating: 4.3,
      location: "Истра, Россия",
    },
    {
      id: 11,
      lat: 55.920519,
      lon: 36.862218,
      name: "Истринский драматический театр",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/372953/2a0000015e5359f6a18d89fdcf080c9e54b6/XXXL",
      description:
        "Истринский драматический театр — это камерный театр с уютной атмосферой и профессиональным актерским составом.",
      rating: 5,
      location: "Истра, Россия",
    },
    {
      id: 12,
      lat: 55.916627,
      lon: 36.857408,
      name: "Истринский культурно-досуговый комплекс",
      imageUrl:
        "https://avatars.mds.yandex.net/get-altay/1773749/2a0000016ae3276d772d8c3bed9ce9e5d24d/XXXL",
      description:
        "Истринский культурно-досуговый комплекс — это место, где проводятся различные мероприятия и концерты, а также работают кружки и секции для детей и взрослых.",
      rating: 5,
      location: "Истра, Россия",
    },
  ];

  const increaseZoom = () => {
    if (mapRef.current && zoomLevel < 18) {
      const newZoom = zoomLevel + 1;
      mapRef.current.setZoom(newZoom, 0.3);
      setZoomLevel(newZoom);
    }
  };

  const decreaseZoom = () => {
    if (mapRef.current && zoomLevel > 1) {
      const newZoom = zoomLevel - 1;
      mapRef.current.setZoom(newZoom, 0.3);
      setZoomLevel(newZoom);
    }
  };

  const handleMarkerPress = (place: any) => {
    setSelectedPlace(place);
    setIsModalVisible(true); // Открываем модальное окно
  };

  return (
    <View style={styles.container}>
      <YaMap
        ref={mapRef}
        initialRegion={{
          lat: 55.91421,
          lon: 36.859635,
          zoom: zoomLevel,
        }}
        showUserPosition={true}
        style={styles.map}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            point={{ lat: place.lat, lon: place.lon }}
            source={require("../../../assets/marker-icon.png")} // Иконка маркера
            scale={0.5} // Масштабирование иконки
            onPress={() => {
              handleMarkerPress(place);

              setCuurentId(place);
            }} // Открытие модального окна при клике на маркер
          />
        ))}
      </YaMap>
      {/* Модальное окно с информацией о месте */}
      {selectedPlace && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)} // Закрытие модального окна
        >
          <View style={styles.modalBackground}>
            <CardMarker
              imageUrl={currentPlace?.imageUrl || ""}
              name={currentPlace?.name || ""}
              description={currentPlace?.description || ""}
              rating={currentPlace?.rating || 0}
              location={currentPlace?.location || ""}
              setIsModalVisible={setIsModalVisible}
            />
            {/* <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedPlace.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedPlace.description}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)} // Закрытие модального окна
              >
                <Text style={styles.closeButtonText}>Закрыть</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </Modal>
      )}
      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={increaseZoom}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={decreaseZoom}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Выравниваем содержимое по центру
    alignItems: "center", // Выравниваем содержимое по горизонтали
  },
  map: Platform.select({
    ios: {
      width: "100%",
      height: 1130, // Устанавливаем фиксированную высоту для iOS
    },
    android: {
      width: "100%",
      height: "100%", // Для Android используем 100% высоты
    },
    default: {
      width: "100%",
      height: "100%", // Резервный вариант, если не удается определить платформу
    },
  }) as ViewStyle, // Указываем тип ViewStyle для предотвращения ошибки
  zoomControls: {
    position: "absolute",
    bottom: 60,
    right: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  zoomButton: {
    width: 50,
    height: 50,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    margin: 5,
    borderRadius: 30,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  zoomText: {
    color: "#fff",
    fontSize: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнение фона
  },
  modalContent: {
    width: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // Тень для модального окна
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Цвет заголовка
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 20,
    color: "#666", // Цвет описания
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Map;
