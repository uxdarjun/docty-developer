import { Component, VERSION, ViewChild } from "@angular/core";
import { FlatTreeControl } from "@angular/cdk/tree";

import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";

const TREE_DATA: any[] = [
  {
    name: "My Patients",
    children: [
      { name: "Patient List", method: "Get" },
      { name: "Single Patient", method: "Get" },
      { name: "Patient Consultations", method: "Get" },
      { name: "Patient Medical History", method: "Get" }
    ]
  },
  {
    name: "Consultations",
    children: [
      { name: "Consultation List", method: "Get" },
      { name: "Single Consultation", method: "Get" },
      { name: "HIPAA Forms", method: "Get" },
      { name: "Prescriptions", method: "Get" }
    ]
  },
  {
    name: "Financial",
    children: [
      { name: "Invoices", method: "Get" },
      { name: "Coupons", method: "Get" },
      { name: "Insurance Claims", method: "Get" },
      { name: "Refunds", method: "Get" }
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  method: string;
  level: number;
}
@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("tree") tree;
  private _transformer = (node: any, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      method: node.method
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  data = TREE_DATA;

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngAfterViewInit() {
    this.tree.treeControl.expandAll();
  }
}
