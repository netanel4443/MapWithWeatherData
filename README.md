# Getting Started
1) make sure you are on project's destination . if not navigate to project destination -> via
   
 ```bash
    cd MapWithWeatherData
```
5)  (or any destination that navigates you to MapWithWeatherData) or any other way you desire to get to MapWithWeatherData folder

6) then type in terminal ```bash npm start ``` which will start the metro server
7) press  ```bash a``` on terminal (node) to install the app

# in case of error while pressing `a` to install the app

1)**close metro server** - this step is crucial

2) open a new terminal and navigate from /MapWithWeatherData to android directory by typing (then press enter) :  
 
   ```bash
   cd android // then type:
    ./gradlew clean
   ```
   (and press enter) it should  build successfully
   
   ## after typing in terminal *`./gradlew clean`* got error
   
   if after typing  ```bash ./gradlew clean``` you got an error , make sure that you closed the metro server. 
   then run again the command ```bash ./gradlew clean``` (if you closed metro server, run this command anyways) it should now build successfully

4) type ```bash cd..``` in terminal to return to MapWithWeatherData directory
5) type in terminal ```bash npm start``` which will start metro server
6) press ```bash a``` in terminal when **dev server ready*** that will install the app 

congratulations! you can interact with the app !

if you still got errors please contact me . 

