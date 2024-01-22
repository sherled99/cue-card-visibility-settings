import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class TranslateByLocale {
    constructor() { };

    public getTranslateWord(locale: any, label: any)
    {
        let arrayWords : any = 
        {
            'placeholder': {
                'ru-RU': 'Написать сообщение...',
                'en-US': 'Write a message...'
            },
            'month': {
                'ru-RU': [
                    'Янв',
                    'Фев',
                    'Мар',
                    'Апр',
                    'Мая',
                    'Июн',
                    'Июл',
                    'Авг',
                    'Сен',
                    'Окт',
                    'Ноя',
                    'Дек'
                ], 
                'en-US': [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ]
            },
            'template': {
                'ru-RU': 'Отправить приветственное сообщение',
                'en-US': 'Send a welcome message'
            },
            'toDay': {
                'ru-RU': 'Сегодня',
                'en-US': 'Today'
            },
            'noMessage': {
                'ru-RU': 'Сообщений пока нет...',
                'en-US': 'No messages yet...'
            },
            'mediaMessageInbound': {
                'ru-RU': 'Вам прислали файл или голосовое сообщение',
                'en-US': 'You received file or audio message'
            },
            'mediaMessageOutbound': {
                'ru-RU': 'Вы отправили файл',
                'en-US': 'You sent file'
            },
            'phonerequest':{
                'ru-RU': 'Предоставить номер телефона.',
                'en-US': 'Provide a phone number.'
            },
            'changeoperatorbuttoncaption':{
                'ru-RU': 'Сменить оператора',
                'en-US': 'Change operator'
            },
            'changeoperatorsuccess':{
                'ru-RU': 'Оператор успешно изменен',
                'en-US': 'Operator changed successfully'
            }
        };

        return arrayWords[label][locale];
    };

};
