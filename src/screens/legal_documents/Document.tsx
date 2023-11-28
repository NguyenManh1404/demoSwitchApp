import firestore from '@react-native-firebase/firestore';
import {DefaultTheme} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import DocumentCard from '../../components/Document/DocumentCard';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import {APP_COLORS} from '../../themes/colors';
import {normalizeString} from '../../themes/helpers';
import {APP_IMAGES} from '../../themes/images';
import {EMPTY_STRING, HIT_SLOP, SCREEN_WIDTH} from '../../utils/constants';

type DocumentProps = NativeStackScreenProps<RootStackParamList, 'Document'>;

const Document: React.FC<DocumentProps> = ({}) => {
  const documentRef = firestore().collection('Documents');

  const [documents, setDocuments] = useState<IDocumentItem[]>([]);
  const [searchText, setSearchText] = useState<string>(EMPTY_STRING);

  useEffect(() => {
    const fetchCentres = async () => {
      try {
        const querySnapshot = await documentRef.get();
        const documentData: IDocumentItem[] = [];

        querySnapshot.forEach(documentSnapshot => {
          documentData.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          } as IDocumentItem);
        });

        if (searchText.length > 0) {
          const searchItems = documentData.filter(e =>
            normalizeString(e.name.toLowerCase()).includes(
              normalizeString(searchText.toLowerCase()),
            ),
          );
          setDocuments(searchItems);
        } else {
          setDocuments(documentData);
        }
      } catch (error) {}
    };

    fetchCentres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const renderDocumentItem: ListRenderItem<IDocumentItem> = ({item, index}) => {
    return (
      <View style={styles.itemView} key={index}>
        <DocumentCard item={item} />
      </View>
    );
  };

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  const handleClear = () => {
    // Clear the input value
    setSearchText(EMPTY_STRING);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={documents || []}
        renderItem={renderDocumentItem}
        keyExtractor={(__, index) => `${index}`}
        ListEmptyComponent={
          <ListEmptyComponent
            image={APP_IMAGES.icSearchNoResult}
            title={'Rất tiếc, không có dữ liệu hiển thị'}
            containerStyle={styles.listEmptyComponentStyle}
          />
        }
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainerStyle}
        ListHeaderComponent={
          <View style={styles.listHeaderComponent}>
            <View style={styles.searchView}>
              <Image source={APP_IMAGES.icSearch} style={styles.icSearch} />
              <TextInput
                onChangeText={text => onChangeText(text)}
                placeholder="Tìm kiếm văn bản"
                placeholderTextColor={APP_COLORS.placeholderText}
                style={styles.textInput}
                value={searchText}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={handleClear} hitSlop={HIT_SLOP}>
                  <Image source={APP_IMAGES.icCloseText} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        }
      />
      <SafeAreaView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listHeaderComponent: {
    backgroundColor: DefaultTheme.colors.background,
  },

  itemView: {
    alignItems: 'center',
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  listEmptyComponentStyle: {
    marginBottom: 100,
  },
  searchView: {
    alignSelf: 'center',
    width: SCREEN_WIDTH - 36,
    borderWidth: 1,
    padding: 12,
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: APP_COLORS.borderInputSearch,
    marginVertical: 18,
  },
  icSearch: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
  },
});

export default Document;
