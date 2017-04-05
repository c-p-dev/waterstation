import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar, Splashscreen ,SQLite } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage = TabsPage;

    constructor(platform: Platform) {
        let db = new SQLite();

        platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
            db.openDatabase({
                name: "data.db",
                location: "default"
            }).then(() => {
                db.executeSql("CREATE TABLE IF NOT EXISTS customer (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, address TEXT, container TEXT)", {}).then((data) => {
                    console.log("TABLE CREATED: ", data);
                }, (error) => {
                    console.error("Unable to execute sql", error);
                })
            }, (error) => {
                console.error("Unable to open database", error);
            });
        });
    }
}
