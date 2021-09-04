# Japanese Vocab Viewer

Build vocabulary lists from a subtitle file, or text that is copied and pasted, or even a link to a webpage. Filter the lists to see exactly what parts you want. The lists can also be saved and even exported for the popular Anki flashcard program.

You can see this project in action [here](https://jamesquillin.github.io) in my portfolio.

## Running

To get the app running, clone the code and install the dependencies with `npm install`. 

Make sure that the `/dict` directory has the appropriate files from the repository for the Kuromoji library to work, and if you run into errors you may need to visit the kuromoji npm module documentation for help initializing the library. For myself, installing the library the first time via NPM didn't include the dictionaries it used, so I added them manually to the repository and hopefully that helps fix any installation issues.

It can be started locally with the start script by running `npm run start`.

If you want to build the application to run as an app on any particular platform you can use the make script in the `package.json`. It uses electron forge so you can look at that documentation as well if you need. It was honestly a lot harder than expected to get the electron app to build, so I have only built it so far for Windows. If you want to build it for Mac or Linux then you will need to either build it directly on one of those types of machines or else look into other ways to get the appropriate files included in the build process, since Windows doesn't have access to many of them.

## Download (Windows)

Currently I have compiled this for Windows, and if you want you can download the program from my google drive [here](https://drive.google.com/file/d/1iXLOMVMU8vwlMhPL7Jmn8wmymT390Ibg/view?usp=sharing) but it is not recommended unless you understand the risks of installing or running software from unknown sources. It is zipped and once unzipped can be run via the .exe file in the folder.
