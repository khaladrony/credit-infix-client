import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { Location } from 'src/app/models/financial-info/location.model';
import { LocationService } from 'src/app/services/financial-info/location.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { StoredProcedureExecuteService } from 'src/app/services/stored-procedure-execute.service';
declare const google: any;

@Component({
    selector: 'app-location',
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

    locationList: Location[] = [];
    oldLocationObj: Location;
    newLocationObj: Location;
    companyInfo: CompanyInfo;
    templateBtnShow: boolean = false;

    constructor(
        private router: Router,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private locationService:LocationService,
        private storedProcedureExecuteService: StoredProcedureExecuteService
    ) { 
        this.companyInfo = new CompanyInfo();
    }

    ngOnInit(): void {
        let map = document.getElementById('map-canvas');
        let lat = map.getAttribute('data-lat');
        let lng = map.getAttribute('data-lng');

        var myLatlng = new google.maps.LatLng(lat, lng);
        var mapOptions = {
            zoom: 12,
            scrollwheel: false,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
                { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#444444" }] },
                { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f2f2" }] },
                { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "off" }] },
                { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": -100 }, { "lightness": 45 }] },
                { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }] },
                { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
                { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] },
                { "featureType": "water", "elementType": "all", "stylers": [{ "color": '#5e72e4' }, { "visibility": "on" }] }]
        }

        map = new google.maps.Map(map, mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Hello World!'
        });

        var contentString = '<div class="info-window-content"><h2>Argon Dashboard</h2>' +
            '<p>A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</p></div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

        this.companyInfo = this.sharedService.getCompanyInfoObject();

        this.getList();
    }



    getList() {
        this.loader.show();
        this.locationService.getList(this.companyInfo.id).subscribe({
            next: (data) => {
                this.locationList = data.data;
            },
            complete: () => {
                this.locationList.forEach(obj => {
                    obj.isEdit = false;
                });

                this.templateButtonActivate();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    templateButtonActivate() {
        if (this.locationList.length == 0
            && this.companyInfo.id > 0) {
            this.templateBtnShow = true;
        }
    }

    addTemplate() {
        let templateName = 'location';
        this.storedProcedureExecuteService.execute(templateName, this.companyInfo.id).subscribe({
            next: (response) => {
                console.log(response);
                this.notifyService.showSuccess("success", response.message);

                this.router.navigate(["admin/financial-info"]);
            },
            complete: () => {
                this.getList();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.notifyService.showError("error", err.error?.message);
                this.loader.hide();
            },
        });
    }

    onSave() {
        this.locationList.forEach(obj => {
            obj.companyInfo = this.companyInfo;
        });
        console.log(this.locationList);

        if (this.locationList.length > 0) {
            this.loader.show();

            this.locationService.save(this.locationList, this.companyInfo.id).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.getList();
                    this.loader.hide();
                },
                error: (err) => {
                    console.log(err);
                    this.notifyService.showError("error", err.error?.message);
                    this.loader.hide();
                },
            });
        }
    }

    onEdit(locationObj: Location) {
        this.oldLocationObj = locationObj;
        this.locationList.forEach(obj => {
            obj.isEdit = false;
        });
        locationObj.isEdit = true;

    }

    onDelete(locationObj: Location) {
        this.locationList.splice(this.locationList.findIndex(e => e.id === locationObj.id), 1);
    }

    onAdd() {
        this.oldLocationObj = null;

        this.newLocationObj = new Location();
        this.newLocationObj.id = this.getId();
        this.newLocationObj.itemCode = '';
        this.newLocationObj.itemValue = '';
        this.newLocationObj.isEdit = true;
        this.locationList.push(this.newLocationObj);



    }

    onUpdate(newLocationObj: Location) {
        console.log(newLocationObj);
        newLocationObj.isEdit = false;
    }

    onCancel(newLocationObj: Location) {
        if (this.oldLocationObj == undefined || this.oldLocationObj == null) {
            newLocationObj.isEdit = true;
            this.locationList.splice(this.locationList.findIndex(e => e.id === newLocationObj.id), 1);
        } else {

            newLocationObj.itemCode = this.oldLocationObj.itemCode;
            newLocationObj.itemValue = this.oldLocationObj.itemValue;
            newLocationObj.isEdit = false;
        }

    }

    validateField(item: any) {
        if (item !== '') {
            return false;
        } else {
            return true;
        }

    }

    validateForm(locationObj: Location) {
        if (locationObj.itemCode !== '' && locationObj.itemValue !== '') {
            return false;
        } else {
            return true;
        }
    }

    getId() {
        if (this.locationList.length == 0) {
            return 1;
        } else {
            let lastLocationObj: Location = this.locationList[this.locationList.length - 1];
            return lastLocationObj.id + 1;
        }
    }


}
