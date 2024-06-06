import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Colors from '../constants/Colors';
import Separator from '../components/Separator';
import Fonts from '../constants/Fonts';
import Display from '../utils/Display';
import StaticImageService from '../services/StaticImageService';
import CountryCode from '../constants/CountryCode';
import FlagItem from '../components/FlagItem';

interface RegisterPhoneScreenProps {
  navigation: NavigationProp<ParamListBase>;
}

interface DropdownLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getDropdownStyle = (y: number) => ({ ...styles.countryDropdown, top: y + 60 });

const RegisterPhoneScreen: React.FC<RegisterPhoneScreenProps> = ({ navigation }) => {

  const [selectedCountry, setSelectedCountry] = useState(
    CountryCode.find(country => country.name === 'Viet Nam') || CountryCode[0],
  );

  const [inputsContainerY, setInputsContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState<DropdownLayout | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');

  const closeDropdown = (pageX: number, pageY: number) => {
    if (isDropdownOpen && dropdownLayout) {
      if (
        pageX < dropdownLayout.x ||
        pageX > dropdownLayout.x + dropdownLayout.width ||
        pageY < dropdownLayout.y ||
        pageY > dropdownLayout.y + dropdownLayout.height
      ) {
        setIsDropdownOpen(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
          color={Colors.DEFAULT_BLACK}
        />
      </View>
      <Text style={styles.title}>Đăng ký số điện thoại</Text>
      <Text style={styles.content}>
        Nhập số điện thoại của bạn để hoàn tất đăng ký.
      </Text>
      <View
        style={styles.inputsContainer}
        onLayout={({
          nativeEvent: {
            layout: { y },
          },
        }) => setInputsContainerY(y)}>
        <TouchableOpacity
          style={styles.countryListContainer}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Image
            source={{ uri: StaticImageService.getFlagIcon(selectedCountry.code) }}
            style={styles.flatIcon}
          />
          <Text style={styles.countryCodeText}>
            {selectedCountry.dial_code}
          </Text>
          <MaterialIcons name="keyboard-arrow-down" size={18} />
        </TouchableOpacity>
        <View style={styles.phoneInputContainer}>
          <TextInput
            placeholder="Nhập số điện thoại"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            keyboardType="number-pad"
            onFocus={() => setIsDropdownOpen(false)}
            style={styles.inputText}
            onChangeText={text =>
              setPhoneNumber(selectedCountry.dial_code + text)
            }
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Verification', { phoneNumber })}>
        <Text style={styles.signinButtonText}>Continue</Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={getDropdownStyle(inputsContainerY)}
          onLayout={({
            nativeEvent: {
              layout: { x, y, height, width },
            },
          }) => setDropdownLayout({ x, y, height, width })}>
          <FlatList
            data={CountryCode}
            keyExtractor={item => item.code}
            renderItem={({ item }) => (
              <FlagItem
                code={item.code}
                name={item.name}
                dial_code={item.dial_code || ''}
                onPress={country => {
                  setSelectedCountry(country);
                  setIsDropdownOpen(false);
                }}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: Fonts.BALO_BOLD,
    lineHeight: 22 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    color: Colors.DEFAULT_BLACK,
    textAlign: 'center'
  },
  content: {
    fontSize: 20,
    fontFamily: Fonts.BALO_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: Colors.DEFAULT_BLACK,
  },
  inputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 50,
  },
  countryListContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    width: Display.setWidth(22),
    marginRight: 10,
    borderRadius: 8,
    height: Display.setHeight(6),
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    flexDirection: 'row',
  },
  phoneInputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
    flex: 1,
  },
  flatIcon: {
    height: 20,
    width: 20,
  },
  countryCodeText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
    fontFamily: Fonts.BALO_MEDIUM,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
  },
  countryDropdown: {
    backgroundColor: Colors.LIGHT_GREY,
    position: 'absolute',
    width: Display.setWidth(80),
    height: Display.setHeight(50),
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    zIndex: 3,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.BALO_MEDIUM,
  },
});

export default RegisterPhoneScreen;
