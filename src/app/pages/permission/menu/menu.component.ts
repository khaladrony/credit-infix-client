import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Menu } from 'src/app/models/menu.model';
import { ConfirmationModalService } from 'src/app/services/confirmation-modal/confirmation-modal.service';
import { MenuService } from 'src/app/services/menu.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    title: string;
    menuId: number;
    menusForm: UntypedFormGroup;
    menus: Menu[] = [];
    menu: Menu;
    selectedRowIndex: number;
    isUpdateMode = false;

    constructor(
        private router: Router,
        private formBuilder: UntypedFormBuilder,
        private utilService: UtilService,
        private confirmationModalService: ConfirmationModalService,
        private notifyService: NotificationService,
        private loader: NgxSpinnerService,
        private menuService: MenuService
    ) {
        this.selectedRowIndex = -1;
        this.menu = new Menu();
    }

    ngOnInit(): void {
        this.title = "Create Menu";

        this.menusForm = this.formBuilder.group({
            menusName: new FormControl("", Validators.required),
            status: ["Active"],
            menuId: new FormControl("")
        });

        this.loadListData();
    }

    submit() {
        if (!this.menusForm.valid) {
            this.utilService.validateAllFormFields(this.menusForm);
            return;
        }

        this.menu = new Menu();
        this.menu.name = this.menusForm.value.menusName;
        this.menu.status = this.menusForm.value.status;

        if (this.menusForm.valid) {
            this.loader.show();

            this.menuService.create(this.menu).subscribe({
                next: (response) => {
                    console.log(response);
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/menu"]);
                },
                complete: () => {
                    this.loadListData();
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
        this.menu.name = this.menusForm.value.menusName;
        this.menu.status = this.menusForm.value.status;
        this.menu.id = this.menusForm.value.menuId;

        if (this.menusForm.valid) {
            this.loader.show();

            this.menuService.update(this.menu).subscribe({
                next: (response) => {
                    this.notifyService.showSuccess("success", response.message);

                    this.router.navigate(["admin/menu"]);
                },
                complete: () => {
                    this.loadListData();
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
        this.menuId = this.menusForm.value.menuId;
        this.confirmationModalService
            .confirm("Delete confirmation!", "Are you sure you want to delete?")
            .subscribe((answer) => {
                if (answer === "yes") {
                    this.menuService.delete(this.menuId).subscribe({
                        next: () => {
                            this.notifyService.showSuccess(
                                "success",
                                "Deleted Successfully."
                            );

                            this.router.navigate(["admin/menu"]);
                        },
                        complete: () => {
                            this.loadListData();
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

    onSelectRow(menu: Menu, index: number) {
        this.isUpdateMode = true;

        this.selectedRowIndex = index == this.selectedRowIndex ? -1 : index;

        if (this.selectedRowIndex == -1) {
            this.resetForm();
            return;
        }

        this.menusForm.controls["menusName"].setValue(menu.name);
        this.menusForm.controls["status"].setValue(menu.status);
        this.menusForm.controls["menuId"].setValue(menu.id);
    }

    loadListData() {
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

    resetForm() {
        this.menusForm.reset();
        this.menusForm.controls["status"].setValue("Active");
        this.isUpdateMode = false;
        this.menu = new Menu();
        this.selectedRowIndex = -1;
    }

}
