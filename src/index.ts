/// <reference path="../node_modules/typescript/lib/lib.es6.d.ts" />
import SlackBot from './slack-bot';
import {spawn, ChildProcess} from 'child_process';

export class App {
    tail: ChildProcess;
    grep: ChildProcess;
    bot: SlackBot;
    message: any;
    sender: any;
    startTailTime: Date;
    stopTailTime: Date;

    constructor() {
        this.init();
    }

    private init() {
        this.bot = new SlackBot();
        this.bot.onStart.subscribe(res => {
            this.onMessageStart(res);
        });

        this.bot.onStop.subscribe(res => {
            this.onMessageStop(res);
        });
    }

    private onMessageStop(res: any) {
        this.sender = res.bot;
        this.message = res.message;
        if (!this.tail) {
            this.say('Use `start tail [fileName], [grepArg]` to start it. Say stop to terminate.');
        } else if (!this.isAlive()) {
            this.say('It looks like it is already stopped!');
        } else {
            this.stopTailTime = new Date();
            let allTime: any = this.stopTailTime.getTime() - this.startTailTime.getTime();
            this.say("Ending to tail at: " + this.stopTailTime.toTimeString());
            this.say("Overall time: " + allTime + " ms.");
        }
        this.stopTail();
    }

    private onMessageStart(res: any) {
        this.startTailTime = new Date();
        this.sender = res.bot;
        this.message = res.message;
        if (this.tail && this.isAlive()) {
            this.say('It looks like process is already running. Please say `stop` to terminate current process.');
        } else {
            this.startTail(res.whichFile, res.keywords);
            this.say("Starting to tail `" + res.keywords.map(key => key) +
                "` in `" + res.whichFile + "` at: " + this.startTailTime.toTimeString());
        }
    }

    private startTail(file: any, grepArgs: any) {
        var argumenti = ['--line-buffered', '-A', '5', '-C', '5'];
        grepArgs.forEach(arg => {
            argumenti.push('-e');
            argumenti.push(arg);
        });
        console.log(argumenti);
        this.tail = spawn('tail', ['-100f', file]);
        this.grep = spawn('grep', argumenti);

        this.tail.stdout.pipe(this.grep.stdin);

        this.grep.stdout.on("data", r => {
            this.say(r.toString());
        });


    }

    private stopTail() {
        if (this.tail) {
            this.tail.kill();
            this.grep.kill();
            this.tail['killed'] = true;
        }
    }

    private isAlive() {
        return !this.tail['killed'];
    }

    private say(text: string) {
        text = text.trim().replace(/(?:\r\n|\r|\n)/g, '\n>');
        this.message.text = ">" + text;
        this.sender.say(this.message);
    }
}

new App();
