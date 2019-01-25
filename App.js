import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  WebView,
  View
} from 'react-native';

import codePush from "react-native-code-push";

const welcome = Platform.select({
  ios: 'Welcome to React Native IOS!\n',
  android: 'Welcome to React Native Android!\n',
})

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu\n'
});

const {width, height} = Dimensions.get('window')
const _lImage = [
  require('./assets/images/npmJS.png'),
  require('./assets/images/pic_egit.jpg'),
  require('./assets/images/pic_five.jpeg'),
  require('./assets/images/pic_four.jpeg'),
  require('./assets/images/pic_one.jpeg'),
  require('./assets/images/pic_screen.jpg'),
  require('./assets/images/pic_seven.jpg'),
  require('./assets/images/pic_six.png'),
  require('./assets/images/pic_three.jpg'),
  require('./assets/images/pic_two.png'),
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      useLocal: false,
      index: 0,
    }
  }

  componentDidMount() {
    codePush.sync({
      updateDialog: true, // 是否打开更新提示弹窗
      installMode: codePush.InstallMode.IMMEDIATE,
      mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
      deploymentKey: Platform.select({
        ios: '_ieXBhfJ0fYgkdKByETaqQMV3dRc0868718f-ed10-42c7-a496-b81e700e8aae',
        android: 'mHfSaSdlV91MgkRy6WbkmlPmjp3p0868718f-ed10-42c7-a496-b81e700e8aae'
      })
    });
  }

  checkCodePush = () => {
    console.log("=== checkCodePush ")
    codePush.checkForUpdate()
      .then((update) => {
        if (!update) {
          console.log("app是最新版了");
          alert('已经是最新版了')
        } else {
          console.log("有更新哦");
          alert('有新版本可更新')
        }
      });
  }

  turnNewPage = () => {
    console.log("=== turnNewPage ")
    let index = parseInt(Math.random() * 10)
    this.setState({
      useLocal: !this.state.useLocal,
      index,
    })
  }

  render() {
    console.log("== this.props -=--> ", this.props)
    const {useLocal, index} = this.state

    return (
      <View style={styles.container}>
        <View style={styles.webAreaView}>
          <WebView
            scalesPageToFit={true}
            source={Platform.select({
              ios: require('./assets/html/index.html'),
              android: {uri: 'file:///android_asset/html/index.html'}
            })}
          />
        </View>

        {
          useLocal
            ? <Image source={_lImage[index]} style={styles.codePushImg}/>
            : <Image
              style={styles.codePushImg}
              source={{uri: 'http://wx4.sinaimg.cn/mw690/d8c65175ly1fyr7mipf4ij20kg10cjsl.jpg'}}
            />
        }

        <Text style={styles.welcome}>
          {welcome}
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.checkPushBtn}
          onPress={() => this.checkCodePush()}>
          <Text style={styles.checkTxt}>
            Check Push
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.turnNewPageBtn}
          onPress={() => this.turnNewPage()}>
          <Text style={styles.checkTxt}>
            Change New Pic
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  codePushImg: {
    width: width - 20,
    height: width * 0.4,
    resizeMode: 'cover',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  webAreaView: {
    height: width * 0.6,
    width: width - 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginBottom: 15,
  },
  checkPushBtn: {
    width: width * 0.65,
    height: width * 0.12,
    marginTop: 25,
    borderRadius: width * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37c',
  },
  turnNewPageBtn: {
    width: width * 0.65,
    height: width * 0.12,
    marginTop: 25,
    borderRadius: width * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37c',
  },
  checkTxt: {
    fontSize: 20,
    color: '#fff',
  }
});

export default App