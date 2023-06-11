import React, {Component, useEffect} from 'react';
import { StyleSheet, Text, View, Image, StatusBar, TouchableOpacity, Button, ScrollView } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { minBy } from "lodash";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { AppImages } from './src/assets';
import SplashScreen from 'react-native-splash-screen';
import Modal from 'react-native-simple-modal';


StatusBar.setBackgroundColor('black');
StatusBar.setBarStyle('light-content');


const API_AUTH = "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json";
const API_TRAD = "https://sgisapi.kostat.go.kr/OpenAPI3/transformation/transcoord.json";
const API_NMT = "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList";
const API_MSRSTN = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";

const CONSUMER_KEY = "d5f63c93777a4344865e";
const CONSUMER_SECRET = "c3171ce29ca745e69c0a";
const SERVICE_KEY = "mPrY%2FpEd3gEOzKvkkqyY50qAgTZL2Q27LpXMDtKbavSWj70vGMlzIzeRL%2B2KP67hRdgoJGBKowbxTZNKXwt8vw%3D%3D";
const DATA_TYPE = 'daily';

const WGS84 = 4326; //경위도
const GRS80 = 5181; //중부원점


let regionNamereal = ""; // 지역 이름
let datereal = ""; // 측정일
let realpm10_Grade = ""; // 미세먼지 등급
let realpm10_Value = ""; // 미세먼지 값
let realpm25_Grade = ""; // 초미세먼지 등급
let realpm25_Value = ""; // 초미세먼지 값
let realkhai_Grade = ""; // 통합대기지수 등급
let realkhai_Value = ""; // 통합대기지수 값
let realo3_Grade = ""; // 오존 등급
let realo3_Value = ""; // 오존 값
let realco_Grade = ""; // 일산화탄소 등급
let realco_Value = ""; // 일산화탄소 값
let realno2_Grade = ""; // 이산화질소 등급
let realno2_Value = ""; // 이산화질소 값
let realso2_Grade = ""; // 아황산가스 등급
let realso2_Value = ""; // 아황산가스 값


export default class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      regionName: null,
      date: null,
      pm10_Grade: null,
      pm10_Value: null,
      pm25_Grade: null,
      pm25_Value: null,
      khai_Grade: null,
      khai_Value: null,
      o3_Grade: null,
      o3_Value: null,
      co_Grade: null,
      co_Value: null,
      no2_Grade: null,
      no2_Value: null,
      so2_Grade: null,
      so2_Value: null,
      open: false,
    };
  }
  componentDidMount() {

    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);

    // Geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //       error: null,
    //       regionName: regionNamereal,
    //       date: datereal,
    //       pm10_Grade: realpm10_Grade,
    //       pm10_Value: realpm10_Value,
    //       pm25_Grade: realpm25_Grade,
    //       pm25_Value: realpm25_Value,
    //       khai_Grade: realkhai_Grade,
    //       khai_Value: realkhai_Value,
    //       o3_Grade: realo3_Grade,
    //       o3_Value: realo3_Value,
    //       co_Grade: realco_Grade,
    //       co_Value: realco_Value,
    //       no2_Grade: realno2_Grade,
    //       no2_Value: realno2_Value,
    //       so2_Grade: realso2_Grade,
    //       so2_Value: realso2_Value,
    //     });
    //     console.log('dd' + this.state.latitude);
    //     console.log('ddddddddddddddd' + this.state.regionName);
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
    
  }
 
  gkatndlqslek() {
    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          regionName: regionNamereal,
          date: datereal,
          pm10_Grade: realpm10_Grade,
          pm10_Value: realpm10_Value,
          pm25_Grade: realpm25_Grade,
          pm25_Value: realpm25_Value,
          khai_Grade: realkhai_Grade,
          khai_Value: realkhai_Value,
          o3_Grade: realo3_Grade,
          o3_Value: realo3_Value,
          co_Grade: realco_Grade,
          co_Value: realco_Value,
          no2_Grade: realno2_Grade,
          no2_Value: realno2_Value,
          so2_Grade: realso2_Grade,
          so2_Value: realso2_Value,
        });
        console.log('dd' + this.state.latitude);
        console.log('ddddddddddddddd' + this.state.regionName);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }


  render() {
    //console.log("rererre");
    return (
      <View style={{ flex: 1, backgroundColor: 'black', }}>
        <View style={{ flex: 3.5, }}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={{ marginLeft: 8 }}
              //android_ripple={{ color: 'grey', radius: 20, borderless: true }}
              //touchOpacity={0.6}
              //onPress={() => navigation.openDrawer()}
            >
              <Icon name="menu" size={25} color="white" />
            </TouchableOpacity>
          </View>
        
          <View style={styles.textContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <Text style={styles.locTxt}>{this.state.regionName}</Text>
              <Ionicon name="location" size={20} color="white" style={{ marginTop: 21,}}></Ionicon>
            </View>
            <Text style={styles.timeTxt}>{this.state.date}</Text>
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
              {/* <Text style={{color: 'white'}}>Latitude: {this.state.latitude}</Text> */}
              {/* <Text>Longitude: {this.state.longitude}</Text> */}
              {/* {this.state.error ? <Text>Error: {this.state.error}</Text> : null} */}
              <Text style={{color: 'white'}}>{fetchAuth(Number(this.state.longitude), Number(this.state.latitude))}</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', }}>
              <Image source={GradeImg(this.state.pm10_Grade)} style={styles.cloudImg}></Image>
              <Text style={{color: "white", fontSize: 25, fontFamily: 'GodoB',}}>{pm10GradeText(this.state.pm10_Grade)}</Text>
              <Text style={{color: "white", fontSize: 15, marginTop: 13, fontFamily: 'GodoM',}}>미세먼지</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1, }}>
          <ScrollView horizontal style={{backgroundColor: '#323232', borderRadius: 10, padding: 8, margin: 5, }}>
            <View style={styles.airItem}>
              <Text style={styles.smallText}>미세먼지</Text>
              <Image source={GradeImg(this.state.pm10_Grade)} style={styles.smallCloudImg}></Image>
              <Text style={styles.numberText}>{this.state.pm10_Value}</Text>
            </View>
            <View style={styles.airItem}>
              <Text style={styles.smallText}>초미세먼지</Text>
              <Image source={GradeImg(this.state.pm25_Grade)} style={styles.smallCloudImg}></Image>
              <Text style={styles.numberText}>{this.state.pm25_Value}</Text>
            </View>
            <View style={styles.airItem}>
              <Text style={styles.smallText}>통합대기지수</Text>
              <Image source={GradeImg(this.state.khai_Grade)} style={styles.smallCloudImg}></Image>
              <Text style={styles.numberText}>{this.state.khai_Value}</Text>
            </View>
            <View style={styles.airItem}>
              <Text style={styles.smallText}>오존</Text>
              <Image source={GradeImg(this.state.o3_Grade)} style={styles.smallCloudImg}></Image>
              <Text style={styles.numberText}>{this.state.o3_Value}</Text>
            </View>
            <View style={styles.airItem}>
              <Text style={styles.smallText}>일산화탄소</Text>
              <Image source={GradeImg(this.state.co_Grade)} style={styles.smallCloudImg}></Image>
              <Text style={styles.numberText}>{this.state.co_Value}</Text>
            </View>
            <View style={styles.airItem}>
              <Text style={styles.smallText}>이산화질소</Text>
              <Image source={GradeImg(this.state.no2_Grade)} style={styles.smallCloudImg}></Image>
              <Text style={styles.numberText}>{this.state.no2_Value}</Text>
            </View>
            <View style={styles.airItem}>
              <Text style={styles.smallText}>아황산가스</Text>
              <Image source={GradeImg(this.state.so2_Grade)} style={styles.smallCloudImg}></Image>
              <Text style={styles.numberText}>{this.state.so2_Value}</Text>
            </View>
          </ScrollView>
        </View>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => this.setState({open:true})}>
            <Text style={styles.buttontext}>ⓘ</Text>
          </TouchableOpacity>
          <Modal
            offset={this.state.offset}
            open={this.state.open}
            modalDidOpen={() => console.log('modal did open')}
            modalDidClose={() => this.setState({open: false})}
            style={{alignItems: 'center'}}>
              <View style={styles.modalui}>
                <View style={styles.topview}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={styles.topText}>미세먼지 4단계</Text>
                    <Text style={styles.topText2}>(한국환경공단 기준)</Text>
                  </View>
                  <TouchableOpacity style={{margin: 3}} onPress={() => this.setState({open: false})}>
                    <Text style={styles.closetext}>X</Text>
                  </TouchableOpacity>
                </View>
                <Image source={AppImages.cloud4} style={{width: '55%', height: '55%', marginTop: 40, marginLeft: 10,}}></Image>
                <Text style={styles.bottomText}>사용자의 현재위치에서 가장 가까운 측정소의 실시간 정보를 제공합니다.</Text>
              </View>
            </Modal>
        </View>
      </View>


    );
  }
}


function fetchAuth(longitude, latitude) {
  let url = `${API_AUTH}?consumer_key=${CONSUMER_KEY}&consumer_secret=${CONSUMER_SECRET}`;
  console.log(url);
  console.log(longitude);
  console.log(latitude);

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("fetchAuth Result");
      console.log(data);
      return fetchCrdTms(data.result.accessToken, longitude, latitude);
    })
    .catch(error => {
      console.log("error");
      console.log(error);
    })
}



function fetchCrdTms(accessToken, longitude, latitude) {
  let url = `${API_TRAD}?accessToken=${accessToken}&src=${WGS84}&dst=${GRS80}&posX=${longitude}&posY=${latitude}`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("fetchCrdTms Result");
      console.log(data);
      return getNearbyMsrstnList(Number(data.result.posX), Number(data.result.posY));
    })
    .catch(error => {
      console.log("error");
      console.log(error);
    })
  //return data.result.posX;
}

async function getNearbyMsrstnList(tmX, tmY) {
  console.log(tmX);
  let url = `${API_NMT}?serviceKey=${SERVICE_KEY}&returnType=json&tmX=${tmX}&tmY=${tmY}`;
  //let url = `${API_NMT}?tmX=${tmX}&tmY=${tmY}&pageNo=1&numOfRows=10&ServiceKey=${SERVICE_KEY}&returnType=json`;
  console.log(url);
  

  let res = await fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.response.body.items);
      //// data.list.
      let tms = minBy(data.response.body.items, 'tm');
      console.log(tms);
      return tms;
    })
    .catch(error => {
      console.log("error");
      console.log(error);
    });
  regionNamereal = res.stationName;
  console.log(regionNamereal);

  return await getMsrstnAcctoRltmMeasureDnsty(res.stationName);
}

async function getMsrstnAcctoRltmMeasureDnsty(stationName) {
  let url = `${API_MSRSTN}?stationName=${encodeURIComponent(stationName)}&dataTerm=${DATA_TYPE}&pageNo=1&numOfRows=1&returnType=json&serviceKey=${SERVICE_KEY}&ver=1.2`;
  console.log(url);
  //console.log(regionName);

  return await fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("getMsrstnAcctoRltmMesureDnsty");
      console.log(data.response.body.items);
      console.log(data.response.body.items[0].mangName); //측정망 정보
      console.log(data.response.body.items[0].dataTime); //측정일
      console.log(data.response.body.items[0].pm10Grade); //미세먼지(PM10) 농도
      console.log(data.response.body.items[0].pm10Value);
      console.log(data.response.body.items[0].pm25Grade); //초미세먼지(PM2.5) 농도
      console.log(data.response.body.items[0].pm25Value);
      console.log(data.response.body.items[0].so2Grade);  //아황산가스 농도
      console.log(data.response.body.items[0].so2Value);
      console.log(data.response.body.items[0].coGrade);   //일산화탄소 농도
      console.log(data.response.body.items[0].coValue);
      console.log(data.response.body.items[0].khaiGrade); //통합대기환경지수
      console.log(data.response.body.items[0].khaiValue);

      datereal = data.response.body.items[0].dataTime;
      realpm10_Grade = data.response.body.items[0].pm10Grade;
      realpm10_Value = data.response.body.items[0].pm10Value;
      realpm25_Grade = data.response.body.items[0].pm25Grade;
      realpm25_Value = data.response.body.items[0].pm25Value;
      realkhai_Grade = data.response.body.items[0].khaiGrade;
      realkhai_Value = data.response.body.items[0].khaiValue;
      realo3_Grade = data.response.body.items[0].o3Grade;
      realo3_Value = data.response.body.items[0].o3Value;
      realco_Grade = data.response.body.items[0].coGrade;
      realco_Value = data.response.body.items[0].coValue;
      realno2_Grade = data.response.body.items[0].no2Grade;
      realno2_Value = data.response.body.items[0].no2Value;
      realso2_Grade = data.response.body.items[0].so2Grade;
      realso2_Value = data.response.body.items[0].so2Value;

      return data.response.body.items[0].dataTime;
    })
    .catch(error => {
      console.log("error");
      console.log(error);
    });


}


function pm10GradeText(pm10_Grade) {
  var gradetxt = "";
  switch (pm10_Grade) {
    case "1":
      gradetxt = "좋음";
      break;
    case "2":
      gradetxt = "보통";
      break;
    case "3":
      gradetxt = "나쁨";
      break;
    case "4":
      gradetxt = "매우나쁨";
      break;
  }
  return gradetxt;
}

function GradeImg(Grade) {
  var gradeImg;
  switch (Grade) {
    case null:
      gradeImg = AppImages.blue;
      break;
    case "1":
      gradeImg = AppImages.blue;
      break;
    case "2":
      gradeImg = AppImages.green;
      break;
    case "3":
      gradeImg = AppImages.orange;
      break;
    case "4":
      gradeImg = AppImages.red;
      break;
  }
  return gradeImg;
}




const styles = StyleSheet.create({
  headerContainer: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 0,
  },
  textContainer: {
      height: 300,
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingBottom: 0,
  },
  locTxt: {
    marginTop: 20,
    fontSize: 27,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'GodoB',
  },
  timeTxt: {
      marginTop: 5,
      fontSize: 15,
      textAlign: 'center',
      color: 'white',
      fontFamily: 'GodoM',
  },
  cloudImg: {
      height: 240,
      width: 240,
  },
  smallCloudImg: {
    width: 55,
    height: 55,
    alignItems: "center",
    marginLeft: 12,
  },
  smallText: {
    color: "black",
    textAlign: "center",
    fontFamily: 'GodoB'

  },
  numberText: {
    fontFamily: 'GodoM',
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
    color: '#1E3269'
  },
  airItem: {
      backgroundColor: "#c8c8c8",
      borderRadius: 10,
      width: 100,
      padding: 10,
      marginRight: 10,
  },
  modalContainer: {
    position:'absolute',
    height:'100%',
    width:'100%',
    justifyContent:"center",
    alignContent:"center",
    alignItems:"center",
  },
  modalui: {
    height: 500,
    alignItems: 'center',
  },
  buttontext:{
    color: 'gray',
    position:'relative',
    left:170,
    fontSize:27,
    marginTop: 320,
    fontFamily: 'GodoB',
  },
  closetext:{
    position:'relative',
    fontSize:30,
    marginLeft: 70,
    fontFamily: 'GodoB'
  },
  topview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 100,
  },
  topText: {
    fontSize: 20,
    marginTop: 17,
    fontFamily: 'GodoB',
    color: 'black',
  },
  topText2: {
    fontSize: 15,
    marginTop: 5,
    fontFamily: 'GodoM',
    marginLeft: 3,
  },
  bottomText: {
    fontSize: 15,
    fontFamily: 'GodoM',
    width: 230,
    marginTop: 50,
    color: 'gray',
  },
});