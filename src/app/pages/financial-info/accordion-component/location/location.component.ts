import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompanyInfo } from 'src/app/models/financial-info/company-info.model';
import { Location } from 'src/app/models/financial-info/location.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
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
    url: any;
    file: File;
    isUpdateMode: boolean = false;
    btnLabel: string = 'Save';

    constructor(
        private sanitizer: DomSanitizer,
        private router: Router,
        private loader: NgxSpinnerService,
        private notifyService: NotificationService,
        private sharedService: SharedService,
        private locationService: LocationService,
        private storedProcedureExecuteService: StoredProcedureExecuteService,
        private fileUploadService: FileUploadService,
        private confirmationModalService: ConfirmationModalService
    ) {
        this.companyInfo = new CompanyInfo();
        // this.companyInfo = this.sharedService.getCompanyInfoObject();
        
    }

    ngOnInit(): void {       
        this.sharedService.data$.subscribe((companyInfo) => {
            this.companyInfo = companyInfo;
            this.getList();
        });
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

                this.getImagePathDTO();
                this.saveAndUpdateBtnChange();
                this.templateButtonActivate();
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    saveAndUpdateBtnChange() {
        this.isUpdateMode = true;
        this.btnLabel = 'Update';
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

            this.locationService.save(this.locationList, this.companyInfo.id, this.btnLabel).subscribe({
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

    onDelete(id: any) {
        this.confirmationModalService
            .confirm("Delete confirmation!", "Are you sure you want to delete?")
            .subscribe((answer) => {
                if (answer === "yes") {
                    this.locationService.delete(id).subscribe({
                        next: () => {
                            this.notifyService.showSuccess(
                                "success",
                                "Deleted Successfully."
                            );

                            this.router.navigate(["admin/financial-info"]);
                        },
                        complete: () => {
                            this.getList();
                            this.loader.hide();
                        },
                        error: (err) => {
                            this.notifyService.showError("error", err.message);
                            console.log(err);
                        },
                    });
                } else {
                    return;
                }
            });
    }

    onEdit(locationObj: Location) {
        this.oldLocationObj = locationObj;
        this.locationList.forEach(obj => {
            obj.isEdit = false;
        });
        locationObj.isEdit = true;
        // this.locationList;
    }

    // onDelete(locationObj: Location) {
    //     this.locationList.splice(this.locationList.findIndex(e => e.id === locationObj.id), 1);
    // }

    onAdd() {
        this.oldLocationObj = null;

        this.newLocationObj = new Location();
        this.newLocationObj.id = this.getId();
        this.newLocationObj.itemCode = '';
        this.newLocationObj.itemValue = '';
        this.newLocationObj.isEdit = true;
        this.locationList.push(this.newLocationObj);
    }

    addRow(index: number) {
        this.oldLocationObj = null;

        this.newLocationObj = new Location();
        this.newLocationObj.id = this.getId();
        this.newLocationObj.itemCode = '';
        this.newLocationObj.itemValue = '';
        this.newLocationObj.isEdit = true;

        this.locationList.splice(index + 1, 0, this.newLocationObj);
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

    selectFile(event: any) {
        if (event.target.files) {
            var reader = new FileReader();
            this.file = event.target.files[0];
            reader.readAsDataURL(this.file);
            reader.onload = (event: any) => {
                this.url = event.target.result;
            }
        }
    }

    onImageFileUpload() {
        let fileName = this.file.name;
        let regex = /(.jpeg|.png)$/;

        // if (regex.test(fileName.toLowerCase())) {
        if (true) {
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('fileName', this.file.name);
            formData.append('type', this.file.type);
            // formData.append('size', event.target.files[0].size);

            this.loader.show();

            this.fileUploadService.uploadImage(formData).subscribe({
                next: (response) => {
                    console.log(response.data);

                    this.imagePreview(response.data.filename);
                    this.saveImagePath(response.data.filename);

                    this.notifyService.showSuccess("success", response.message);
                    this.router.navigate(["admin/financial-info"]);
                },
                complete: () => {
                    this.loader.hide();
                },
                error: (err) => {
                    console.log(err);
                    this.loader.hide();
                    this.notifyService.showError('error', err.error?.message);
                }
            });

        } else {
            this.notifyService.showError('error', 'Please upload a valid Image!');
            this.loader.hide();
        }
    }

    saveImagePath(imageName: string) {
        let locationImage: any = {
            companyInfo: this.companyInfo,
            name: imageName,
            type: imageName.split('.').pop()
        };

        this.locationService.saveImagePath(locationImage).subscribe({
            next: (response) => {
                console.log(response);
            },
            complete: () => { },
            error: (err) => {
                console.log(err);
                this.notifyService.showError("error", err.error?.message);
            },
        });
    }

    getImagePathDTO() {
        this.locationService.getImagePathDTO(this.companyInfo.id).subscribe({
            next: (response) => {
                this.imagePreview(response.data.name);
            },
            complete: () => { },
            error: (err) => {
                console.log(err);
                this.notifyService.showError("error", err.error?.message);
            },
        });
    }

    imagePreview(fileName: string) {
        let fileExtension = fileName.split('.').pop();
        let fileType = '';
        if (fileExtension === 'pdf') {
            fileType = 'application/pdf';
        } else {
            // fileType = 'image/jpeg';
            fileType = 'image/(jpeg|jpg|png|gif|bmp)';
        }
        this.fileUploadService.imagePreview(fileName).subscribe({
            next: (response) => {
                const blob = new Blob([response], { type: fileType });
                this.url = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            },
            complete: () => {
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}
