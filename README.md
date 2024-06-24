# Getting Started
1) make sure you are on project's destination . if not navigate to project destination -> 
via **cd MapWithWeatherData** (or any destination that navigates you to MapWithWeatherData) or any other way you desire to get to MapWithWeatherData folder

2) then type in terminal **npm start** which will start the metro server
then press a on terminal (node) to install the app

**in case of error while pressing a to install the app**
1)**close metro server** - this step is crucial

2) open a new terminal and navigate from /MapWithWeatherData to android directory by typing (then press enter) :  *cd android*
   then type :  *./gradlew clean* (and press enter) it should  build successfully
   
   **fter typing *./gradlew clean* got error**
   if after typing *./gradlew clean* throws error , make sure that you closed the metro server. 
   then run again the command *./gradlew clean* (if you closed metro server, run this command anyways) it should now build successfully

3) type cd.. in terminal to return to MapWithWeatherData directory
4) type in terminal npm start which will start metro server
5) press a when *dev server ready*

congratulations! you can interact with the app !

