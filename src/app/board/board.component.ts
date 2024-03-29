import { Component, OnInit } from '@angular/core';
import { COLUMNS } from './@shared/mock/column.mock';
import { Card, Column } from './@shared/models';
import { BoardService } from './@shared/services/board.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateColumnComponent } from './update-column/update-column.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  columns: Column[] = [];
  columnIds!: string[];
  constructor(private boardService: BoardService, public dialog: MatDialog) { }
  

  ngOnInit(): void {
    this.getColumns();
  }

  columnUpdated(column: Column) {
    console.log('this.columns > ', this.columns)
    console.log('column > ', column)
    const columnIndex = this.columns.findIndex(c => c._id == column?._id);
        console.log('columnIndex > ', columnIndex)
        if (columnIndex != -1) {
          this.columns[columnIndex] = column;
          console.log('this.columns > ', this.columns)
        }
  }

  columnUpdatedWithCard(card: Card) {
    this.getColumns();
  }

  delete(column:Column){
    this.getColumns();
  }

  //Drag and drop
  drop(event: CdkDragDrop<Column[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  // Recuperation des colonnes
  private getColumns() {
    this.boardService.getColumns().subscribe(response => {
      this.columns = response;
      this.generateColumnsIds();
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  private generateColumnsIds() {
    this.columnIds = this.columns.map(c => c._id);
  }

}

