import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/auth.service';
import { WebStorageService } from '../../services/web-storage/web-storage.service';
import {_} from "underscore";
import * as go from "gojs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;
  showSpinner: boolean;
  appObject: any;

  constructor(private authService: AuthService, private webStorageService: WebStorageService) { }

  ngOnInit() {
    this.username = this.authService.getToken().split("@")[0];
    
    //setting this to true will show the loading/busy animation
    this.showSpinner = false;
      
    this.webStorageService.setHomepageAppObject({
        tech : "Angular",
        version : "6"
    });
      
    this.appObject = this.webStorageService.getHomepageAppObject();
    this.initGoJSSample();
  }
    
  initGoJSSample() {
    var $ = go.GraphObject.make;
    var myDiagram =
      $(go.Diagram, "myDiagramDiv",
        {
          "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
        });

    // define a simple Node template
    myDiagram.nodeTemplate =
      $(go.Node, "Auto",  // the Shape will go around the TextBlock
        $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "white" },
          // Shape.fill is bound to Node.data.color
          new go.Binding("fill", "color")),
        $(go.TextBlock,
          { margin: 8 },  // some room around the text
          // TextBlock.text is bound to Node.data.key
          new go.Binding("text", "key"))
      );

    // but use the default Link template, by not setting Diagram.linkTemplate

    // create the model data that will be represented by Nodes and Links
    myDiagram.model = new go.GraphLinksModel(
    [
      { key: "Alpha", color: "lightblue" },
      { key: "Beta", color: "orange" },
      { key: "Gamma", color: "lightgreen" },
      { key: "Delta", color: "pink" }
    ],
    [
      { from: "Alpha", to: "Beta" },
      { from: "Alpha", to: "Gamma" },
      { from: "Beta", to: "Beta" },
      { from: "Gamma", to: "Delta" },
      { from: "Delta", to: "Alpha" }
    ]);
  }

}
