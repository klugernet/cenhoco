﻿import {Component, View, bootstrap, FORM_DIRECTIVES, NgFor} from 'angular2/angular2';  // , ChangeDetectionStrategy
import {RouterOutlet, RouteConfig, RouterLink, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {localStorageService} from 'content/services/localStorageService';
import {cenHoCoConfig} from 'content/configuration/cenHoCoConfig';
import {DataContainer} from 'DataContainer';
import {siteMapService} from 'services/siteMapService';
import {SiteMap} from 'content/home/SiteMap';

@Component({
    selector: 'configuration'
    //changeDetection: ChangeDetectionStrategy.OnPush
})
@View({
    directives: [FORM_DIRECTIVES, NgFor],
    templateUrl: './scripts/modules/content/configuration/configuration.html'
})
export class configuration {

    public config: cenHoCoConfig;
    private storageService: localStorageService;
    private siteMapService: siteMapService;
    public siteMapList: Array<SiteMap>;
    private router;

    constructor(router: Router) {
        this.storageService = new localStorageService();
        this.config = DataContainer.Config;
        this.siteMapService = new siteMapService();
        this.router = router;
        var siteMap = new SiteMap();

        if (this.config.localUrl == '') {  //TODO: behavior for wrong Url - probably needed in siteMapService
            console.log('default sitemap being build');
            siteMap.Label = 'Please enter a valid local Url first';
            siteMap.Url = '';
            siteMap.Name = 'defaultsitemap';
            this.siteMapList = [siteMap];
            console.log('default sitemap name: ' + siteMap.Name);
        }
        else {
            console.log('constructor getSiteMaps call for present localUrl');
            this.siteMapService.getSiteMaps(this.config.localUrl, (siteMapList) => { this.setSiteMapList(siteMapList) }, this.getSiteMapListError);
        }
    }

    public onCancelClick(event) {
        this.router.navigateByUrl('/Home');
    }

    public onSaveClick(event) {
        this.storageService.saveToStorage(this.config);
        DataContainer.Config = this.config; //TODO: verify values + reload server connection
        this.router.navigateByUrl('/Home');
    }

    public onLocalUrlBlur(event) {
        console.log('Blur call');
        this.siteMapService.getSiteMaps(this.config.localUrl, (siteMapList) => { this.setSiteMapList(siteMapList) }, this.getSiteMapListError);
    }

    public setSiteMapList(siteMapData) {
        console.log('setSiteMap ' + siteMapData);
        this.siteMapList = siteMapData;
        console.log('new sitemaplist first label: ' + this.siteMapList[0].Label);
    }

    public getSiteMapListError(data) {
        console.log('getSiteMapError ' + data);
    }

}
