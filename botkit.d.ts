declare interface Botkit {
    spawn(f: Function): RTM;
}


declare interface RTM {
    startRTM();
    slackbot(param: any);
}
