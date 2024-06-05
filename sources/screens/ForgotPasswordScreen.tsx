import React from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Display from '../utils/Display';
import Separator from '../components/Separator';

interface ForgotPasswordScreenProps {
    navigation: NavigationProp<ParamListBase>;
}  

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
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
        <Text style={styles.headerTitle}>Quên mật khẩu</Text>
      </View>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <Text style={styles.content}>
        Nhập email bạn dùng để đăng ký, chúng tôi sẽ hổ trợ bạn đặt lại mật khẩu.
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name="mail"
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={styles.inputText}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.signinButton}>
        <Text style={styles.signinButtonText}>Reset Password</Text>
      </TouchableOpacity>
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
  headerTitle: {
    fontSize: 20,
    fontFamily: Fonts.BALO_MEDIUM,
    lineHeight: 20 * 1.4,
    width: Display.setWidth(80),
    textAlign: 'center',
    color: Colors.DEFAULT_BLACK
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.BALO_BOLD,
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
    color: Colors.DEFAULT_BLACK
  },
  content: {
    fontSize: 18,
    fontFamily: Fonts.BALO_MEDIUM,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    color: Colors.DEFAULT_BLACK
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 15,
    textAlignVertical: 'center',
    padding: 0,
    height: Display.setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  signinButton: {
    backgroundColor: Colors.DEFAULT_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: Display.setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signinButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.BALO_MEDIUM,
  },
});

export default ForgotPasswordScreen;