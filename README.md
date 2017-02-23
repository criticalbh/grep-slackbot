# Grep Slackbot
Slackbot to tail and grep files

##Requirements
* node v4.3.1 or higher

##Setup
* Rename config.ts.example under src dir to config.ts and insert your slack token.
* `npm install`
* `npm run build`

##Run
`npm run start`

##Usage
`@tailbot start tail /var/log/output.txt, Error, Exception` -> Will tail output.txt and grep for Error or Exception
>Starting to tail `Error, Exception ` in `/var/log/output.txt` at: 11:28:48 GMT+0100 (CET)
>...NullPointerException...

>...MyCustomException...
etc

`@tailbot start tail /var/log/output.txt, Error` -> Will grep only for Error
>Starting to tail `Error` in `/var/log/output.txt` at: 11:28:48 GMT+0100 (CET)

`@tailbot stop`
>Overall time: 10126 ms.

>Ending to tail at: 11:28:58 GMT+0100 (CET)
