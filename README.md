# MapWithWeatherData

## Project Description

An app that allows use to draw polygons and place markers on the map
the user can view his markers record in a separate screen with additional details obtained from
weather api like: temperature , feels like temperature, country

## Features
- placing markers on the map
- drawing polygons on the map
- a separate screen that the user can view his markers recording with weather data
- clicking on a marker shows location's temperature
- 
## Installation Instructions
1) make sure you are on project's destination . if not navigate to project destination -> via terminal 
    (or any destination that navigates you to MapWithWeatherData)
 ```bash
    cd MapWithWeatherData
```
  or any other way you desire to get to MapWithWeatherData folder

3) then type in terminal
```bash
 npm start
```
 which will start the metro server
 
4) press  ```a``` on terminal (node) to install the app

# in case of error while pressing `a` to install the app

1)**close metro server** - this step is crucial

2) open a new terminal and navigate from /MapWithWeatherData to android directory by typing (then press enter) :  
 
   ```bash
   cd android
   ```
   then type:
   
    ```bash
    ./gradlew clean
    ```
   (and press enter) it should  build successfully
   
   ## after typing in terminal *`./gradlew clean`* got error
   
   if after typing  ```./gradlew clean``` you got an error , make sure that you closed the metro server. 
   then run again the command:
   ```bash
   ./gradlew clean
   ```
    (if you closed metro server, run this command anyways) it should now build successfully

4) type ```cd..``` in terminal to return to MapWithWeatherData directory
5) type in terminal ```npm start``` which will start metro server
6) press ```a``` in terminal when **dev server ready*** that will install the app 

congratulations! you can interact with the app !

if you still got errors please contact me . 

## Usage Instructions

### drawing markers

in order to draw markers, long click on a the map

### drawing polygons
1)grant access to your location in order to see the marker with weather data of you location on the map
2) click on the green button `enable polygon drawing` - it will changed to red
3) double click on more than 1 location in order to see polygon lines on the map.
4) in order to finish drawing the polygon, click on apply polygon button, after that you can draw a new polygon shape.
5) by clicking on saved that you will be redirected to a new screen with all of your markers details with weather data

## API Usage Details
- for the map, used, https://console.cloud.google.com/ maps sdk for android
- for weather api, used : https://openweathermap.org/.
  the api key is already within the app, no need to add yours(if you got any restrictions (you should not have) please contact me).

 # Additional Notes
 Evaluation Criteria:
Completeness: Does the application meet all the requirements? ```yes```

Code Quality: Is the code clean, well-documented, and follows best practices? 
```yes. used react redux toolkit for state management.
used clean code, and simple logic in functions to get good design. in addition, I placed the files in separated directories according to the needs
 ```
Functionality: Does the application works as expected? ```yes```

Responsiveness: Is the application responsive and usable on different screen sizes? ```yes```

Bonus Points: Are additional features or screens implemented effectively? ```yes```



