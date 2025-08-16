
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Chart from 'chart.js/auto';
import { QuestionService } from '../../../@services/question.service';
import { QuestionListService } from '../../../@services/question-list.service';
import { UserService } from '../../../@services/user.service';
import { HttpClientService } from '../../../@services/http-client.service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-question-result',
  imports: [
    MatButtonModule
  ],
  templateUrl: './question-result.component.html',
  styleUrl: './question-result.component.scss'
})
export class QuestionResultComponent {
  constructor(
    private questionService: QuestionService,
    private questionListService: QuestionListService,
    private userService: UserService,
    private router: Router,
    private httpClientService: HttpClientService,
    private cdRef: ChangeDetectorRef
  ) { }
  questData: any = {}
  adminMode!: boolean

  ngOnInit(): void {
    this.userService.adminMode.subscribe((res) => {
      this.adminMode = res;
    })
    this.questionService.questionResultArray = []

    let index = this.questionService.questListArray.findIndex(index => index.ID == this.questionListService.questionID)
    this.httpClientService.postApi("/quiz/statistics?quizId=" + this.questionListService.questionID, this.questionListService.questionID)
      .subscribe((data: any) => {


        let chartData: Array<any> = []

        for (let item of data.statisticsVoList) {
          let labels = []
          let data = []
          for (let optionCountVoListItem of item.optionCountVoList) {
            labels.push(optionCountVoListItem.option)
            data.push(optionCountVoListItem.count)
          }

          chartData.push({
            ID: item.quesId.toString(),
            questionType: item.type,
            name: item.question,
            labels: labels,
            data: data,
            backgroundColor: [
              '#EA0000',
              '#FFA042',
              '#F9F900',
              '#82D900',
              '#0080FF',
              '#9F35FF',
              '#FF77FF',
              '#BB5E00',
              '#984B4B',
              '#5A5AAD',
              '#949449',
              '#BF0060',
              '#9393FF',
              '#467500',
              '#844200',
              '#FFAF60',
              '#A6A6D2',
              '#97CBFF',
              '#006000',
              '#6C3365'
            ]
          })
        }

        this.questionService.questionResultArray.push(
          {
            ID: this.questionService.questListArray[index].ID,
            title: this.questionService.questListArray[index].title,
            sDate: this.questionService.questListArray[index].sDate,
            eDate: this.questionService.questListArray[index].eDate,
            chartData: chartData
          })

        this.questData = this.questionService.questionResultArray[0]



        this.cdRef.detectChanges();
        this.renderCharts();

      })


  }

  renderCharts(): void {
    Chart.defaults.color = '#000';
    if (this.questData && this.questData.chartData && Array.isArray(this.questData.chartData)) {
      for (let index of this.questData.chartData) {
        let ctx = document.getElementById(index.ID) as HTMLCanvasElement;
        let data = {
          labels: index.labels,
          datasets: [
            {
              // 上方分類文字
              label: '人數',
              // 數據
              data: index.data,
              // 線與邊框顏色
              backgroundColor: index.backgroundColor,
              hoverOffset: 5,
            },
          ],
        };
        if (ctx) {
          let chart = new Chart(ctx, {
            type: 'pie',
            data: data,
          });
        }
      }
    }
  }
  ngAfterViewInit(): void {
    // Chart.defaults.color = '#000';
    // if (this.questData && this.questData.chartData && Array.isArray(this.questData.chartData)) {
    //   for (let index of this.questData.chartData) {
    //     let ctx = document.getElementById(index.ID) as HTMLCanvasElement;
    //     let data = {
    //       labels: index.labels,
    //       datasets: [
    //         {
    //           // 上方分類文字
    //           label: '人數',
    //           // 數據
    //           data: index.data,
    //           // 線與邊框顏色
    //           backgroundColor: index.backgroundColor,
    //           hoverOffset: 5,
    //         },
    //       ],
    //     };
    //     if (ctx) {
    //       let chart = new Chart(ctx, {
    //         type: 'pie',
    //         data: data,
    //       });
    //     }
    //   }
    // }
  }

  goBack() {
    if (this.adminMode) {
      this.router.navigateByUrl('/feedback')
    } else {
      this.router.navigateByUrl('/QuestionList')
    }
  }

  getPercentage(questionData: any, index: number): string {
    // 取得該題的所有選項數據
    const totalVotes = questionData.data.reduce((sum: number, num: number) => sum + num, 0);

    // 如果沒有投票，避免出現 NaN，返回 0%
    if (totalVotes === 0) {
      return "0%";
    }

    // 根據每個選項的數據計算百分比
    const percentage = (questionData.data[index] / totalVotes) * 100;
    return percentage.toFixed(0) + "%";  // 保留兩位小數並加上百分號
  }

}

//labels: index.labels.length > 0 ? index.labels : undefined,
