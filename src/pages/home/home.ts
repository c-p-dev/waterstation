import { Component } from '@angular/core';
import { NavController,Platform} from 'ionic-angular';
import { SQLite } from "ionic-native";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public database: SQLite;
    public customersArray: Array<Object>;

    constructor(public navCtrl: NavController,private platform: Platform) {
        this.platform.ready().then(() => {
            this.database = new SQLite();
            this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
                this.loadCustomers();
            }, (error) => {
                console.log("ERROR: ", error);
            });
        });
    }
    public loadCustomers() {
        this.database.executeSql("SELECT * FROM customer", []).then((data) => {
            this.customersArray = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    this.customersArray.push({name: data.rows.item(i).name, address: data.rows.item(i).address, container: data.rows.items(i).container});
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
    }

}
