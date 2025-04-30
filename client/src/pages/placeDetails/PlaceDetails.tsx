import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useAppSelector } from '@/shared/hooks/hooks';
import { AudioPlayer } from '../../widget/player/AudioPlayer';
import { audioMap } from '../../shared/utils/audioMap';
import { EntityT } from '@/entities/place/model/shema';
import CommentsWidget from '@/widget/comments-widget/CommentsWidget';

export default function PlaceDetails() {
  const place = useAppSelector((state) => state.markers.activePlace);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<EntityT | null>(null);

  const renderDescription = (description: string, entities: EntityT[] = []) => {
    let parts: (string | { text: string; entity: EntityT })[] = [description];
    const processedEntities = new Set<string>(); // Отслеживаем обработанные сущности

    entities.forEach((entity) => {
      const newParts: (string | { text: string; entity: EntityT })[] = [];
      parts.forEach((part) => {
        if (typeof part === 'string') {
          const splitParts = part.split(entity.name);
          splitParts.forEach((splitPart, index) => {
            if (index > 0) {
              // Если это первое вхождение entity.name
              if (!processedEntities.has(entity.name)) {
                newParts.push({ text: entity.name, entity });
                processedEntities.add(entity.name); // Помечаем как обработанное
              } else {
                newParts.push(entity.name); // Второе и последующие вхождения как текст
              }
            }
            if (splitPart) {
              newParts.push(splitPart);
            }
          });
        } else {
          newParts.push(part); // Сохраняем уже кликабельные части
        }
      });
      parts = newParts;
    });

    return parts.map((part, index) => {
      if (typeof part === 'string') {
        return <Text key={index} style={styles.description}>{part}</Text>;
      }
      return (
        <Text
          key={index}
          style={[styles.description, styles.entityText]}
          onPress={() => {
            setSelectedEntity(part.entity);
            setModalVisible(true);
          }}
        >
          {part.text}
        </Text>
      );
    });
  };

  if (!place) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Место не выбрано</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{place.name}</Text>
      <Text style={styles.location}>{place.location}</Text>
      <Text style={styles.rating}>★ {place.rating}</Text>
      <View style={styles.descriptionContainer}>
        {renderDescription(place.description, place.Entities)}
      </View>
      <AudioPlayer
        audioSource={audioMap[place.name]}
        showCard={false}
        place={place}
      />
      <CommentsWidget foundPlace={place} />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            {selectedEntity ? (
              <>
                <Text style={styles.modalTitle}>{selectedEntity.name}</Text>
                <Text style={styles.modalDescription}>{selectedEntity.description}</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Закрыть</Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text>Сущность не найдена</Text>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  location: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 12,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
  },
  entityText: {
    textDecorationLine: 'underline',
    color: '#007AFF',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 12,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF', 
    fontSize: 16,
    fontWeight: '600',
  },
});