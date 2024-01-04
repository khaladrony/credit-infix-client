import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Feature } from 'src/app/models/feature.model';
import { Menu } from 'src/app/models/menu.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { FeatureService } from 'src/app/services/feature.service';
import { MenuService } from 'src/app/services/menu.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-feature',
    templateUrl: './feature.component.html',
    styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

    title: string;
    featureForm: UntypedFormGroup;
    selectedRowIndex: number;
    isUpdateMode = false;
    features: Feature[] = [];
    feature: Feature;
    parentFeatureList: Feature[] = [];    
    selectedFeature: Feature = new Feature();
    menus: Menu[] = [];    
    selectedMenu: Menu = new Menu();
    featureId: number;

    constructor(
        private router: Router,
        private formBuilder: UntypedFormBuilder,
        private utilService: UtilService,
        private confirmationModalService: ConfirmationModalService,
        private notifyService: NotificationService,
        private loader: NgxSpinnerService,
        private featureService: FeatureService,
        private menuService: MenuService
    ) {
        this.selectedRowIndex = -1;
        this.feature = new Feature();
    }

    ngOnInit(): void {

        this.title = 'Create Feature';

        this.featureForm = this.formBuilder.group({
            menu: new FormControl(""),
            menuType: new FormControl(""),
            featureId: new FormControl(""),
            featureName: new FormControl('', Validators.required),
            path: new FormControl('', Validators.required),
            parentFeature: new FormControl(''),
            featureIcon: new FormControl(''),
            status: ['Active']
        });

        this.resetForm();
    }

    submit() {
        if (!this.featureForm.valid) {
            this.utilService.validateAllFormFields(this.featureForm);
            return;
        }

        this.feature = new Feature();
        this.feature.name = this.featureForm.value.featureName;
        this.feature.path = this.featureForm.value.path;
        this.feature.menu = this.selectedMenu;
        this.feature.menuType = this.featureForm.value.menuType;
        this.feature.icon = this.featureForm.value.featureIcon;
        this.feature.status = this.featureForm.value.status;

        if (this.featureForm.valid) {
            this.loader.show();

            this.featureService.create(this.feature).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/feature"]);
                },
                complete: () => {
                    this.loader.hide();
                    this.resetForm();
                },
                error: (err) => {
                    console.log(err);
                    this.notifyService.showError("error", err.error?.message);
                    this.loader.hide();
                },
            });
        }
    }

    updateSelectedRow() {
        this.feature.id = this.featureForm.value.featureId;
        this.feature.name = this.featureForm.value.featureName;
        this.feature.path = this.featureForm.value.path;
        this.feature.menu = this.selectedMenu;
        this.feature.menuType = this.featureForm.value.menuType;
        this.feature.icon = this.featureForm.value.featureIcon;
        this.feature.status = this.featureForm.value.status;

        if (this.featureForm.valid) {
            this.loader.show();

            this.featureService.update(this.feature).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/feature"]);
                },
                complete: () => {
                    this.loader.hide();
                    this.resetForm();
                },
                error: (err) => {
                    console.log(err);
                    this.notifyService.showError("error", err.error?.message);
                    this.loader.hide();
                },
            });
        }
    }

    delete() {
        this.featureId = this.featureForm.value.featureId;

        this.confirmationModalService.confirm(
            "Delete confirmation!",
            "Are you sure you want to delete?")
            .subscribe((answer) => {
                if (answer === 'yes') {
                    this.featureService.delete(this.featureId).subscribe({
                        next: () => {
                            this.notifyService.showSuccess(
                                "success",
                                "Deleted Successfully."
                            );

                            this.router.navigate(["admin/feature"]);
                        },
                        complete: () => {
                            this.loader.hide();
                            this.resetForm();
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

    onSelectRow(feature: Feature, index: number) {
        this.isUpdateMode = true;

        this.selectedRowIndex = index == this.selectedRowIndex ? -1 : index;

        if (this.selectedRowIndex == -1) {
            this.resetForm();
            return;
        }

        // this.onFeatureChange(feature?.parentFeatureId)


        this.featureForm.controls['featureId'].setValue(feature.id);
        this.featureForm.controls['featureName'].setValue(feature.name);
        this.featureForm.controls['path'].setValue(feature.path);
        this.featureForm.controls['menu'].setValue(feature.menu.id);
        this.featureForm.controls['menuType'].setValue(feature.menuType);
        this.featureForm.controls['featureIcon'].setValue(feature.icon);
        this.featureForm.controls['status'].setValue(feature.status);

        this.onMenuChange(feature.menu.id);

    }

    loadListData() {
        let data = {};
        this.loader.show();
        this.featureService.getList(data).subscribe({
            next: (data) => {
                this.features = data.data;
            },
            complete: () => {
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    resetForm() {
        this.featureForm.reset();
        this.featureForm.controls['status'].setValue('Active');
        this.isUpdateMode = false;
        this.feature = new Feature();
        this.selectedRowIndex = -1;
        this.loadListData();
        this.loadMenuList();
    }

    // getParentFeatureList() {
    //     let data = {};
    //     this.featureService.getParentFeatureList(data).subscribe({
    //         next: (data) => {
    //             this.parentFeatureList = data.data;
    //         },
    //         complete: () => { },
    //         error: (err) => {
    //             console.log(err);
    //         },
    //     });
    // }

    // onFeatureChange(featureId: number) {
    //     this.selectedFeature = this.parentFeatureList.find((feature) => feature.id === featureId) || new Feature();
    // }

    // onScrollToEnd() {
    //     this.getParentFeatureList();
    // }


    loadMenuList() {
        let data = {};
        this.loader.show();
        this.menuService.getList(data).subscribe({
            next: (data) => {
                this.menus = data.data;
            },
            complete: () => {
                this.loader.hide();
            },
            error: (err) => {
                console.log(err);
                this.loader.hide();
            },
        });
    }

    onMenuChange(menuId: number) {
        this.selectedMenu = this.menus.find((menu) => menu.id === menuId) || new Feature();
    }

    onMenuScrollToEnd() {
        this.loadMenuList();
    }


}
