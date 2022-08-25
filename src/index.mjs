import './middleware/heroku.mjs';

import express from 'express';
import ora from 'ora';
import gradient from 'gradient-string';
import figlet from 'figlet';

import { BotBlazeWithTelegram } from './middleware/bot.mjs'

figlet('Blaze with Telegram', (_, screen) => {
    console.log(gradient.vice(screen));
    console.log('       ' + gradient.cristal('by: Elizandro Dantas'));
    console.log();
    start();
});

const app = express();

app.get('/', (request, response) => response.status(200).json({ info: "bot blaze with telegram, by: Elizandro Dantas" }));

async function start(){
    let appOra = ora('iniciando client http').start(),
        controllerBot = new BotBlazeWithTelegram(),
        server;

    try{
        server = app.listen(process.env.PORT || 3000, () => appOra.succeed('client http escultando a porta', process.env.PORT || 3000));
    }catch(err){
        appOra.fail("erro ao iniciar client http");
        process.exit();
    }

    await controllerBot.run();

    process.on('SIGINT', () => {
        controllerBot.telegram.close();
        controllerBot.socket.closeSocket();
        process.exit();
    });
    process.on('SIGQUIT', () => {
        controllerBot.telegram.close();
        controllerBot.socket.closeSocket();
        process.exit();
    });
    process.on('SIGTERM', () => {
        controllerBot.telegram.close();
        controllerBot.socket.closeSocket();
        process.exit();
    });
}