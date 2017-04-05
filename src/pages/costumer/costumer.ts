import { Component } from '@angular/core';
import { NavController, NavParams,Platform } from 'ionic-angular';
import { SQLite } from "ionic-native";

/*
Generated class for the Costumer page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
    selector: 'page-costumer',
    templateUrl: 'costumer.html'
})
export class CostumerPage {

    public database: SQLite;
    // public customer: Array<Object>;
    public customer = {
        name:<string> null,
        address: <string> null,
        container: <string> null
    };

    public customersArrayArray : Array<Object>;;

    constructor(public navCtrl: NavController, public navParams: NavParams,private platform: Platform) {
        this.platform.ready().then(() => {
            this.database = new SQLite();
            this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
                // this.refresh();
                this.database.executeSql("CREATE TABLE IF NOT EXISTS customer (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, container TEXT)", {}).then((data) => {
                    console.log("TABLE CREATED: ", data);
                    console.log("asd");
                }, (error) => {
                    console.error("Unable to execute sql", error);
                })
            }, (error) => {
                console.log("ERROR: ", error);
            });

        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CostumerPage');
    }




    public addCustomer() {
        console.log(this.customer);
        this.database.executeSql("INSERT INTO customer (name, address, container) VALUES (?,?,?)", [this.customer.name,this.customer.address,this.customer.container]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
            console.log(error.err);
        });
    }

    public refresh() {
        this.database.executeSql("SELECT * FROM customer", []).then((data) => {
            this.customersArrayArray = [];
            if(data.rows.length > 0) {
                for(var i = 0; i < data.rows.length; i++) {
                    this.customersArrayArray.push({name: data.rows.item(i).name, address: data.rows.item(i).address, container: data.rows.item(i).container});
                }
            }
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
    }




}
