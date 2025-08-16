import { Router } from '@angular/router';
import { Component, Input, output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserService } from '../@services/user.service';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { QuestionListService } from '../@services/question-list.service';
import { QuestionService } from '../@services/question.service';

@Component({
  selector: 'app-list-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    CommonModule,
    MatSortModule
  ],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.scss'
})
export class ListTableComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private questionListService: QuestionListService,
    private questionService: QuestionService
  ) { }

  @Input() ELEMENT_DATA!: PeriodicElement[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  selectedData = output<any[]>()

  displayedColumns: string[] = ['ID', 'name', 'status', 'sDate', 'eDate', 'go'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  adminMode!: any

  started = true

  ngOnInit(): void {
    this.userService.adminMode.subscribe((result) => {
      this.adminMode = result
      if (this.adminMode) {
        this.displayedColumns.unshift('select')
      } else {
        this.displayedColumns.shift()
      }
    })

    this.dataSource.data = this.ELEMENT_DATA
    for (let startedCheck of this.dataSource.data) {
      if (startedCheck.statusCode == "notStartedYet") {
        this.started = false
      }
    }

  }

  ngOnChanges() {
    this.dataSource.data = this.ELEMENT_DATA;
    this.selection.clear();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.outputSelected()
  }

  getQuestStatsName(type: string): string {
    if (type == 'Multi') return '多選';
    if (type == 'Single') return '單選';
    if (type == 'Text') return '文字';
    return '';
  }

  viewResult(element: any) {
    if (!this.adminMode && element.statusCode == 'notStartedYet') {
      return
    }
    this.questionListService.questionID = element.ID
    if ((this.adminMode && element.statusCode == 'notStartedYet')
      || (this.adminMode && element.statusCode == 'unpublished')
    ) {
      for (let check of this.questionService.questListArray) {
        if (check.ID == element.ID) {
          this.questionService.addQuestionData = check
          this.questionService.editQuestionMode = true

          let push: Array<any> = []
          for (let update of check.questionArray) {
            let questionTypeChinese = this.getQuestStatsName(update.questionType)
            let optionArray: Array<any> = []
            for (let content of update.options) {
              optionArray.push({
                ID: content.questionID,
                question: content.optionName
              })
            }
            push.push({
              id: update.ID,
              questionTitle: update.questName,
              required: update.required,
              checkBox: false,
              questionType: update.questionType,
              questionTypeChinese: questionTypeChinese,
              optionArray: optionArray
            }
            )
          }
          this.questionService.saveQuestArray = push
        }
      }
      this.router.navigateByUrl('/addQuestion')
    }
    else if (this.adminMode) {
      this.router.navigateByUrl('feedback')
    } else {
      this.router.navigateByUrl('/QuestionResult')
    }
  }

  outputSelected() {
    let checkData: Array<any> = [];
    for (let selected of this.selection.selected) {
      checkData.push(selected)
    }
    this.selectedData.emit(checkData);
  }

  goQuestion(element: any) {
    if (element.statusCode == 'progress' && !this.adminMode) {
      this.questionListService.questionID = element.ID
      this.router.navigateByUrl('/QuestionContent')
    }
    else if (this.adminMode) {
      this.questionListService.questionID = element.ID
      this.router.navigateByUrl('/QuestionContent')
    }
  }
}

export interface PeriodicElement {
  ID: number;
  name: string;
  status: string;
  sDate: string;
  eDate: string;
  eductId: string;
  statusCode: string;
}
