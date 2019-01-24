import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View
} from 'react-native';

import codePush from "react-native-code-push";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu\n' +
    'If you can see it , CodePush Done',
});

const {width, height} = Dimensions.get('window')

class App extends Component {
  constructor(props) {
    super(props)

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

  render() {
    console.log("== this.props -=--> ", this.props)

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
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
  checkTxt: {
    fontSize: 20,
    color: '#fff',
  }
});

export default App