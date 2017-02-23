/// <reference path="../botkit.d.ts" />

import {Subject} from 'rxjs/Subject';
import {botToken} from './config';
var Botkit: any = require('botkit');

export default class SlackBot {
    controller: any;
    onStart: Subject<any> = new Subject();
    onStop: Subject<any> = new Subject();


    constructor() {

        this.controller = Botkit.slackbot({
            debug: false
        });

        this.controller.spawn({
            token: botToken
        }).startRTM();
        this.controller.hears('start tail (.*), (.*), (.*)', ['direct_message', 'direct_mention', 'mention'], (bot: any, message: any) => {
            var whichFile = message.match[1];
            var keyword = message.match[2];
            var keyword2 = message.match[3];
            console.log(keyword, keyword2);
            let msg = {
                bot, message, whichFile, keywords: [keyword, keyword2]
            };
            this.onStart.next(msg);
        });
        this.controller.hears('start tail (.*), (.*)', ['direct_message', 'direct_mention', 'mention'], (bot: any, message: any) => {
            var whichFile = message.match[1];
            var keyword = message.match[2];
            console.log(keyword);
            let msg = {
                bot, message, whichFile, keywords: [keyword]
            };
            this.onStart.next(msg);
        });
        this.controller.hears('stop', ['direct_message', 'direct_mention', 'mention'], (bot: any, message: any) => {
            let msg = {
                bot, message
            };
            this.onStop.next(msg);
        });
    }

}
