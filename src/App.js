import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import "normalize.css";
import { background, weatherIcon } from "./public/js/image-data";
import locationIcon from "./public/images/location.svg";
import update from "./public/images/update.svg";
import dayjs from "dayjs";

function App() {
  const { rainyImg, cloudyImg, sunnyImg } = background;

  const [image, setImage] = useState(cloudyImg);
  const [imageState, setImageState] = useState("dark");
  const [imageCode, setImageCode] = useState(0);
  const [weatherElement, setWeatherElement] = useState({
    locationName: "臺北市",
    description: "多雲時晴",
    windSpeed: 1.1,
    temperature: 22.9,
    rainPossibility: 48,
    observationTime: "2020-12-12 22:10:00",
    comfortable: "還好",
    weatherCode: 1,
    isLoading: true,
  });

  const licenceKey = "CWB-324D3EFB-EC08-4BBB-9C6D-AF1173A1D457";

  let LocationName = "永康";
  let LocationNameForecast = "臺南市";

  const fetchWeather = () => {
    setWeatherElement((pre) => ({ ...pre, isLoading: true }));

    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${licenceKey}&locationName=${LocationName}
`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        const locationData = data.records.location[0];
        const weatherElements = locationData.weatherElement.reduce(
          (neededElements, item) => {
            if (["WDSD", "TEMP"].includes(item.elementName)) {
              neededElements[item.elementName] = item.elementValue;
            }
            return neededElements;
          },
          {}
        );

        setWeatherElement((pre) => ({
          ...pre,
          locationName: locationData.locationName,
          windSpeed: weatherElements.WDSD,
          temperature: weatherElements.TEMP,
          observationTime: locationData.time.obsTime,
          isLoading: false,
        }));
      });

    fetch(
      `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${licenceKey}&locationName=${LocationNameForecast}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        const locationData = data.records.location[0];
        const weatherElements = locationData.weatherElement.reduce(
          (neededElements, item) => {
            if (["Wx", "PoP", "CI"].includes(item.elementName)) {
              neededElements[item.elementName] = item.time[0].parameter;
            }
            return neededElements;
          },
          {}
        );

        setWeatherElement((pre) => ({
          ...pre,
          weatherCode: weatherElements.Wx.parameterValue,
          description: weatherElements.Wx.parameterName,
          rainPossibility: weatherElements.PoP.parameterName,
          comfortable: weatherElements.CI.parameterName,
          isLoading: false,
        }));
      });
  };

  const resetLocation = (location, locationForecast) => {
    LocationName = location;
    LocationNameForecast = locationForecast;
    fetchWeather();
    setImage(sunnyImg);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const Container = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url(${image[imageState]});
  `;
  const BackgroundImage = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    backdrop-filter: url(${image[imageState]}#filter);
    backdrop-filter: blur(50px);
  `;
  const BackgroundFilter = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    z-index: 2;
    background-color: rgb(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
  `;
  const WeatherCard = styled.div`
    background-color: #fff;
    background-image: url(${image[imageState]});
    over-flow: hidden;
    background-size: cover;
    filter: none;
    position: fixed;
    width: 60%;
    box-shadow: 10px 10px 30px 0 rgb(0, 0, 0, 0.2);
    box-sizing: border-box;
    z-index: 9999;
    height: 675px;
    display: flex;
    color: #fff;
  `;
  const CardContainer = styled.div`
    height: 100%;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;
  const DetailContainer = styled.div`
    height: 100%;
    width: 40%;
    background-color: rgb(0, 0, 0, 0.3);
    backdrop-filter: url(${image[imageState]}#filter);
    backdrop-filter: blur(8px);

    .locationContainer {
      margin-top: 15px;
    }
  `;
  const NavBar = styled.div`
    padding: 30px 30px;
    h1 {
      font-size: 24px;
      font-weight: 200;
      letter-spacing: 1px;
    }
  `;
  const DescriptionContainer = styled.div`
    padding: 30px 30px;
  `;
  const DescriptionInner = styled.div`
    width: 400px;
    height: 162px;

    display: flex;
  `;
  const Temperature = styled.div`
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    div p {
      font-size: 100px;
      font-weight: 300;
      display: block;
      line-height: 105px;
    }
  `;
  const WeatherIcon = styled.div`
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
  `;
  const TemperatureDetail = styled.div`
    width: 100%;

    div {
      display: flex;
    }

    div p:nth-of-type(1),
    div p:nth-of-type(2) {
      line-height: 30px;
      font-weight: 400;
      font-size: 14px;
      margin-left: 10px;
    }
  `;
  const Title = styled.div`
    margin: 0 30px;
    padding-top: 30px;
    border-bottom: 1px #fff solid;

    h2 {
      font-size: 24px;
      font-weight: 200;
      letter-spacing: 1px;
    }
  `;
  const Location = styled.div`
    p {
      font-size: 16px;
      padding: 15px 0;
      padding-left: 30px;
    }

    p:hover {
      background-color: rgb(255, 255, 255, 0.3);
    }
  `;
  const Detail = styled.div`
    div {
      display: flex;
    }

    p {
      font-size: 16px;
      padding: 0 30px;
      padding-top: 30px;
    }

    display: flex;
    justify-content: space-between;
  `;
  const LastDetail = styled(Detail)`
    p {
      margin: 0;
      padding: 0;
    }

    margin-left: 30px;
    margin-top: 60px;

    div p {
      padding-right: 5px;
    }

    div div {
      margin-left: 10px;
      margin-right: 30px;
    }

    img {
      width: 20px;
      height: 20px;
      align-items: center;
      align-self: center;

      transform-origin: 50% 50%;
      animation: rotate infinite 1.5s linear;
      animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
    }

    img:hover {
      animation: rotate infinite 1s linear;
    }

    @keyframes rotate {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    margin-bottom: 30px;
  `;

  return (
    <Container>
      <BackgroundFilter></BackgroundFilter>
      <BackgroundImage></BackgroundImage>
      <WeatherCard>
        <CardContainer>
          <NavBar>
            <h1>天氣即時狀態</h1>
          </NavBar>
          <DescriptionContainer>
            <DescriptionInner>
              <Temperature>
                <div>
                  <p>{Math.round(weatherElement.temperature)}°C</p>
                </div>
                <TemperatureDetail>
                  <div>
                    <img src={locationIcon} alt="" />
                    <p>{weatherElement.locationName}</p>
                    <p>{weatherElement.description}</p>
                  </div>
                </TemperatureDetail>
              </Temperature>
              <WeatherIcon>
                <img src={weatherIcon[weatherElement.weatherCode]} alt="" />
              </WeatherIcon>
            </DescriptionInner>
          </DescriptionContainer>
        </CardContainer>
        <DetailContainer>
          <Title>
            <h2>其他地標</h2>
          </Title>
          <div className="locationContainer">
            <Location onClick={() => resetLocation("板橋", "新北市")}>
              <p>新北市</p>
            </Location>
            <Location onClick={() => resetLocation("臺中", "臺中市")}>
              <p>台中市</p>
            </Location>
            <Location onClick={() => resetLocation("永康", "臺南市")}>
              <p>台南市</p>
            </Location>
            <Location onClick={() => resetLocation("高雄", "高雄市")}>
              <p>高雄市</p>
            </Location>
          </div>
          <Title>
            <h2>詳細天氣資訊</h2>
          </Title>
          <Detail>
            <p>風速</p>
            <p>{weatherElement.windSpeed} m/s</p>
          </Detail>
          <Detail>
            <p>降雨機率</p>
            <p>{weatherElement.rainPossibility} %</p>
          </Detail>
          <Detail>
            <p>舒適度</p>
            <p>{weatherElement.comfortable}</p>
          </Detail>

          <LastDetail isLoading={weatherElement.isLoading}>
            <p>最後觀測時間</p>
            <div>
              <p>
                {new Intl.DateTimeFormat("zh-TW", {
                  hour: "numeric",
                  minute: "numeric",
                }).format(dayjs(weatherElement.observationTime))}
              </p>
              <div>
                <img src={update} onClick={fetchWeather} alt="" />
              </div>
            </div>
          </LastDetail>
        </DetailContainer>
      </WeatherCard>
    </Container>
  );
}

export default App;
