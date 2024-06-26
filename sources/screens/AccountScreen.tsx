import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import Fonts from '../constants/Fonts';
import Colors from '../constants/Colors';
import Images from '../constants/Images';
import Separator from '../components/Separator';
import ToggleButton from '../components/ToggleButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Display from '../utils/Display';
import {useDispatch} from 'react-redux';
import StorageService from '../services/StorageService';
import GeneralAction from '../actions/GeneralAction';



interface AccountScreenProps {
    navigation: NavigationProp<ParamListBase>;
}

const AccountScreen: React.FC<AccountScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const logout = () => {
    StorageService.setToken('').then(() => {
      dispatch(GeneralAction.setToken(''));
      dispatch(GeneralAction.setUserData(null));
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DEFAULT_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.backgroundCurvedContainer} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={20}
          color={Colors.DEFAULT_WHITE}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Tài khoản</Text>
        <View>
          <Feather name="bell" size={20} color={Colors.DEFAULT_WHITE} />
          <View style={styles.alertBadge}>
            <Text style={styles.alertBadgeText}>12</Text>
          </View>
        </View>
      </View>
      <View style={styles.profileHeaderContainer}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={Images.AVATAR} />
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.nameText}>tên tài khoản của bạn</Text>
          <Text style={styles.emailText}>Email của bạn</Text>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
          <View style={styles.menuIcon}>
            <MaterialCommunityIcons
              name="truck-fast-outline"
              size={18}
              color={Colors.DEFAULT_GREEN}
            />
          </View>
          <Text style={styles.menuText}>Tất cả {'\n'}đơn hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
          <View style={{...styles.menuIcon, backgroundColor: Colors.LIGHT_RED}}>
            <MaterialCommunityIcons
              name="gift-outline"
              size={18}
              color={Colors.SECONDARY_RED}
            />
          </View>
          <Text style={styles.menuText}>Mã giảm giá {'&\n'} khuyến mãi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} activeOpacity={0.8}>
          <View
            style={{...styles.menuIcon, backgroundColor: Colors.LIGHT_YELLOW}}>
            <Ionicons
              name="location-outline"
              size={18}
              color={Colors.DEFAULT_YELLOW}
            />
          </View>
          <Text style={styles.menuText}>Địa chỉ giao hàng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.sectionHeaderText}>Tài khoản của tôi</Text>
        <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <Ionicons
              name="person-outline"
              size={18}
              color={Colors.DEFAULT_GREEN}
            />
            <Text style={styles.sectionText}>Quản lý tài khoản</Text>
          </View>
          <Feather
            name="chevron-right"
            color={Colors.INACTIVE_GREY}
            size={20}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sectionContainer} activeOpacity={0.8}>
          <View style={styles.sectionTextContainer}>
            <Ionicons
              name="card-outline"
              size={18}
              color={Colors.DEFAULT_GREEN}
            />
            <Text style={styles.sectionText}>Thanh toán</Text>
          </View>
          <Feather
            name="chevron-right"
            color={Colors.INACTIVE_GREY}
            size={20}
          />
        </TouchableOpacity>

        <Text style={styles.sectionHeaderText}>Thông báo</Text>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTextContainer}>
            <Feather name="bell" size={18} color={Colors.DEFAULT_GREEN} />
            <Text style={styles.sectionText}>Cài đặt thông báo</Text>
          </View>
          <ToggleButton size={0.5} />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTextContainer}>
            <Feather name="bell" size={18} color={Colors.DEFAULT_GREEN} />
            <Text style={styles.sectionText}>Thông báo mã giảm giá và khuyến mãi</Text>
          </View>
          <ToggleButton size={0.5} />
        </View>

        <Text style={styles.sectionHeaderText}>Khác</Text>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionTextContainer}>
            <Ionicons
              name="moon-outline"
              size={18}
              color={Colors.DEFAULT_GREEN}
            />
            <Text style={styles.sectionText}>Chế độ tối</Text>
          </View>
          <ToggleButton size={0.5} />
        </View>
        <TouchableOpacity style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionTextContainer}
            activeOpacity={0.8}
            onPress={() => logout()}>
            <MaterialCommunityIcons
              name="logout"
              size={18}
              color={Colors.DEFAULT_GREEN}
            />
            <Text style={styles.sectionText}>Đăng xuất</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SECONDARY_WHITE,
  },
  backgroundCurvedContainer: {
    backgroundColor: Colors.DEFAULT_GREEN,
    height: 2000,
    position: 'absolute',
    top: -1 * (2000 - 230),
    width: 2000,
    borderRadius: 2000,
    alignSelf: 'center',
    zIndex: -1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: Fonts.BALO_MEDIUM,
    lineHeight: 20 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  alertBadge: {
    backgroundColor: Colors.DEFAULT_YELLOW,
    position: 'absolute',
    height: 16,
    width: 16,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    right: -2,
    top: -10,
  },
  alertBadgeText: {
    fontSize: 10,
    fontFamily: Fonts.BALO_BOLD,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  profileHeaderContainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  profileImageContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    elevation: 3,
  },
  profileImage: {
    width: Display.setWidth(15),
    height: Display.setWidth(15),
    borderRadius: 32,
  },
  profileTextContainer: {
    marginLeft: 10,
  },
  nameText: {
    fontSize: 14,
    fontFamily: Fonts.BALO_REGULAR,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  emailText: {
    fontSize: 10,
    fontFamily: Fonts.BALO_REGULAR,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_WHITE,
  },
  menuContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
  },
  menuIcon: {
    backgroundColor: Colors.LIGHT_GREEN,
    height: Display.setWidth(8),
    width: Display.setWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  menuText: {
    fontSize: 12,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    lineHeight: 12 * 1.4,
    color: Colors.DEFAULT_BLACK,
    textAlign: 'center',
    marginTop: 5,
  },
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: Colors.DEFAULT_WHITE,
    elevation: 3,
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 20,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontFamily: Fonts.BALO_SEMI_BOLD,
    lineHeight: 14 * 1.4,
    color: Colors.DEFAULT_BLACK,
    marginTop: 25,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  sectionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 13,
    fontFamily: Fonts.BALO_REGULAR,
    lineHeight: 13 * 1.4,
    color: Colors.INACTIVE_GREY,
    marginLeft: 10,
  },
});

export default AccountScreen;
