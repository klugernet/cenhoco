﻿import {Component, View, Input} from 'angular2/angular2';
import {item} from 'content/item/item';
import {widget} from 'content/widget/widget';

@Component({
    selector: 'switchwidgetcontainer'
})
@View({
    directives: [],
    templateUrl: './scripts/modules/content/widget/widgetTypes/switchwidgetcontainer.html'
})
export class switchwidgetcontainer {

    @Input() widgetlocal: widget;

}
