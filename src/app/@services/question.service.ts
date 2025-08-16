import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor() { }

  questionData!: any;
  addQuestionData!: any;
  saveQuestArray!: any
  editQuestionMode = false



  questListArray: Array<any> = [
    // {
    //   ID: 1,
    //   title: '現代人購物習慣調查',
    //   directions: '調查在現今社會中人民的購物習慣',
    //   sDate: '2025-03-10',
    //   eDate: '2025-04-30',
    //   questionArray: [
    //     {
    //       ID: 1,
    //       questName: '您通常在哪個平台購物？(多選)',
    //       required: true,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '實體店面', questionID: 1 },
    //         { optionName: '網路購物平台（如：Amazon、momo、蝦皮等）', questionID: 2 },
    //         { optionName: '自家電商網站', questionID: 3 },
    //         { optionName: '其他', questionID: 4 },
    //       ]
    //     },
    //     {
    //       ID: 2,
    //       questName: '您每月在網上購物的頻率是多少？ (單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '每週一次以上', questionID: 1 },
    //         { optionName: '每月一次', questionID: 2 },
    //         { optionName: '偶爾購物', questionID: 3 },
    //         { optionName: '幾乎不購物', questionID: 4 }
    //       ]
    //     },
    //     {
    //       ID: 3,
    //       questName: '您選擇購物平台時，最重視的因素是什麼？ (多選)',
    //       required: true,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '價格優惠', questionID: 1 },
    //         { optionName: '產品多樣性', questionID: 2 },
    //         { optionName: '客戶評價', questionID: 3 },
    //         { optionName: '物流配送速度', questionID: 4 },
    //         { optionName: '退換貨政策', questionID: 5 },
    //         { optionName: '網站使用便利性', questionID: 6 }
    //       ]
    //     },
    //     {
    //       ID: 4,
    //       questName: '您希望品牌在行銷活動中提供哪些優惠或服務？ (多選)',
    //       required: false,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '限時折扣', questionID: 1 },
    //         { optionName: '免費運送', questionID: 2 },
    //         { optionName: '贈品或優惠券', questionID: 3 },
    //         { optionName: '分期付款選項', questionID: 4 },
    //         { optionName: '會員積分回饋', questionID: 5 },
    //         { optionName: '售後服務保障', questionID: 6 }
    //       ]
    //     },
    //     {
    //       ID: 5,
    //       questName: '您購物時最常關注的產品類別是：',
    //       required: false,
    //       questionType: 'Text',
    //       options: []
    //     },
    //     {
    //       ID: 6,
    //       questName: '您覺得改善購物體驗最重要的因素是：',
    //       required: false,
    //       questionType: 'Text',
    //       options: []
    //     }
    //   ]
    // },
    // {
    //   ID: 2,
    //   title: '手搖飲愛好調查',
    //   directions: '市場調查現代人喝手搖飲料的習慣',
    //   sDate: '2025-03-20',
    //   eDate: '2025-06-20',
    //   questionArray: [
    //     {
    //       ID: 1,
    //       questName: '請問您是哪裡人？(單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '北部', questionID: 1 },
    //         { optionName: '中部', questionID: 2 },
    //         { optionName: '南部', questionID: 3 },
    //         { optionName: '東部', questionID: 4 },
    //         { optionName: '外島', questionID: 5 },
    //         { optionName: '外國', questionID: 6 }
    //       ]
    //     },
    //     {
    //       ID: 2,
    //       questName: '您多久會購買手搖飲料一次？(單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '每天', questionID: 1 },
    //         { optionName: '每週幾次', questionID: 2 },
    //         { optionName: '每月幾次', questionID: 3 },
    //         { optionName: '很少/幾乎不喝', questionID: 4 }
    //       ]
    //     },
    //     {
    //       ID: 3,
    //       questName: '您最常購買哪一類型的手搖飲料？(多選)',
    //       required: true,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '純茶', questionID: 1 },
    //         { optionName: '水果茶', questionID: 2 },
    //         { optionName: '奶茶', questionID: 3 },
    //         { optionName: '咖啡', questionID: 4 },
    //         { optionName: '冰沙', questionID: 5 },
    //         { optionName: '其他', questionID: 6 }
    //       ]
    //     },
    //     {
    //       ID: 4,
    //       questName: '您喜歡的手搖飲料甜度是？(單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '0%（無糖）', questionID: 1 },
    //         { optionName: '30%(微糖)', questionID: 2 },
    //         { optionName: '50%(半糖)', questionID: 3 },
    //         { optionName: '70%(少糖)', questionID: 4 },
    //         { optionName: '100%（全糖）', questionID: 5 }
    //       ]
    //     },
    //     {
    //       ID: 5,
    //       questName: '您通常選擇哪些品牌的手搖飲料？',
    //       required: false,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '50嵐', questionID: 1 },
    //         { optionName: 'Milksha 迷客夏', questionID: 2 },
    //         { optionName: 'CoCo都可', questionID: 3 },
    //         { optionName: 'KUNG FU TEA功夫茶', questionID: 4 },
    //         { optionName: 'MACU 麻古茶坊', questionID: 5 },
    //         { optionName: 'Dejeng 得正', questionID: 6 },
    //         { optionName: '其他', questionID: 7 }
    //       ]
    //     },
    //     {
    //       ID: 6,
    //       questName: '請輸入希望飲料店可以加入的品項',
    //       required: false,
    //       questionType: 'Text',
    //       options: []
    //     }
    //   ]
    // },
    // {
    //   ID: 3,
    //   title: '運動問卷',
    //   directions: '了解當今流行之運動',
    //   sDate: '2025-03-09',
    //   eDate: '2025-06-20',
    //   questionArray: [
    //     {
    //       ID: 1,
    //       questName: '請選擇最喜歡的運動(多選)',
    //       required: true,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '籃球', questionID: 1 },
    //         { optionName: '足球', questionID: 2 },
    //         { optionName: '桌球', questionID: 3 },
    //         { optionName: '羽球', questionID: 4 },
    //         { optionName: '保齡球', questionID: 5 },
    //         { optionName: '跑步', questionID: 6 }
    //       ]
    //     },
    //     {
    //       ID: 2,
    //       questName: '請選擇最喜歡的運動員(多選)',
    //       required: false,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '梅吸', questionID: 1 },
    //         { optionName: '太谷祥平', questionID: 2 },
    //         { optionName: '摳鼻布萊恩', questionID: 3 },
    //         { optionName: '鈴墓一郎', questionID: 4 }
    //       ]
    //     },
    //     {
    //       ID: 3,
    //       questName: '請輸入你想跟他們說的話',
    //       required: false,
    //       questionType: 'Text',
    //       options: []
    //     }
    //   ]
    // },
    // {
    //   ID: 4,
    //   title: '電玩遊戲調查',
    //   directions: '了解現代電玩遊戲趨勢',
    //   sDate: '2025-03-01',
    //   eDate: '2025-05-03',
    //   questionArray: [
    //     {
    //       ID: 1,
    //       questName: '您平常會玩遊戲嗎？(單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '會', questionID: 1 },
    //         { optionName: '不會', questionID: 2 },
    //         { optionName: '偶爾，有空的時候才玩', questionID: 3 },
    //         { optionName: '以前玩過，現在沒時間玩了', questionID: 4 }
    //       ]
    //     },
    //     {
    //       ID: 2,
    //       questName: '您平常都是在哪個平台上遊玩？(多選)',
    //       required: true,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '電腦', questionID: 1 },
    //         { optionName: '手機', questionID: 2 },
    //         { optionName: '家機', questionID: 3 },
    //         { optionName: '掌機', questionID: 4 }
    //       ]
    //     },
    //     {
    //       ID: 3,
    //       questName: '您喜歡玩哪些類型的遊戲？(多選)',
    //       required: false,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: 'RPG(角色扮演)', questionID: 1 },
    //         { optionName: 'RTS(即時戰略)', questionID: 2 },
    //         { optionName: 'FPS(第一人稱射擊)', questionID: 3 },
    //         { optionName: 'FTG(格鬥遊戲)', questionID: 4 },
    //         { optionName: 'SLG(策略遊戲)', questionID: 5 }
    //       ]
    //     },
    //     {
    //       ID: 4,
    //       questName: '請輸入您覺得目前電腦遊戲越來越式微的原因',
    //       required: false,
    //       questionType: 'Text',
    //       options: []
    //     }
    //   ]
    // },
    // {
    //   ID: 6,
    //   title: '熱炒店愛好投票',
    //   directions: '台式熱炒店是台灣餐飲文化中重要的一環，因其價格實惠、口味多樣及用餐氣氛熱鬧，受到了廣泛的喜愛，此投票目的在於了解消費者的選擇，從而決定開發新菜色的方向。',
    //   sDate: '2025-01-01',
    //   eDate: '2025-03-01',
    //   questionArray: [
    //     {
    //       ID: 1,
    //       questName: '請選擇喜歡的料理(多選)',
    //       required: true,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '炒高麗菜', questionID: 1 },
    //         { optionName: '生魚片', questionID: 2 },
    //         { optionName: '沙茶牛肉', questionID: 3 },
    //         { optionName: '三杯雞', questionID: 4 },
    //         { optionName: '鳳梨蝦球', questionID: 5 },
    //         { optionName: '鹹豬肉', questionID: 6 },
    //         { optionName: '客家小炒', questionID: 7 },
    //         { optionName: '宮保雞丁', questionID: 8 },
    //         { optionName: '炸雞塊', questionID: 9 }
    //       ]
    //     },
    //     {
    //       ID: 2,
    //       questName: '通常會搭配什麼飲品？(多選)',
    //       required: true,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '酒', questionID: 1 },
    //         { optionName: '碳酸飲料', questionID: 2 },
    //         { optionName: '果汁', questionID: 3 },
    //         { optionName: '茶', questionID: 4 },
    //         { optionName: '水', questionID: 5 }
    //       ]
    //     },
    //     {
    //       ID: 3,
    //       questName: '通常會和誰一起用餐？(多選)',
    //       required: false,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '家人', questionID: 1 },
    //         { optionName: '同事', questionID: 2 },
    //         { optionName: '朋友', questionID: 3 },
    //         { optionName: '伴侶', questionID: 4 }
    //       ]
    //     },
    //     {
    //       ID: 4,
    //       questName: '大概多久會光顧一次熱炒店？(單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '2-3天', questionID: 1 },
    //         { optionName: '1週', questionID: 2 },
    //         { optionName: '1個月', questionID: 3 },
    //         { optionName: '2-3個月', questionID: 4 },
    //         { optionName: '半年', questionID: 5 },
    //         { optionName: '半年以上', questionID: 6 }
    //       ]
    //     },
    //     {
    //       ID: 5,
    //       questName: '您會推薦熱炒店給外國人嗎？為什麼',
    //       required: false,
    //       questionType: 'Text',
    //       options: []
    //     }
    //   ]
    // },
    // {
    //   ID: 7,
    //   title: '現代人結婚意願問券',
    //   directions: '瞭解現代人對於結婚的想法',
    //   sDate: '2025-03-21',
    //   eDate: '2025-06-21',
    //   questionArray: [
    //     {
    //       ID: 1,
    //       questName: '請問您目前居住在什麼區域？(單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '北部', questionID: 1 },
    //         { optionName: '中部', questionID: 2 },
    //         { optionName: '南部', questionID: 3 },
    //         { optionName: '東部', questionID: 4 },
    //         { optionName: '外島', questionID: 5 },
    //         { optionName: '外國', questionID: 6 }
    //       ]
    //     },
    //     {
    //       ID: 2,
    //       questName: '您的結婚意願是？(單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '想', questionID: 1 },
    //         { optionName: '不想', questionID: 2 },
    //         { optionName: '還在考慮', questionID: 3 },
    //         { optionName: '隨緣，遇到對的人就結婚', questionID: 4 }
    //       ]
    //     },
    //     {
    //       ID: 3,
    //       questName: '是否會有生小孩的意願？(單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '有', questionID: 1 },
    //         { optionName: '沒有', questionID: 2 },
    //         { optionName: '還在考慮', questionID: 3 },
    //         { optionName: '看對方想法', questionID: 4 },
    //         { optionName: '隨緣', questionID: 5 }
    //       ]
    //     },
    //     {
    //       ID: 4,
    //       questName: '對方哪些項目會構成您的參考條件？(多選)',
    //       required: false,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '性格', questionID: 1 },
    //         { optionName: '年收', questionID: 2 },
    //         { optionName: '生活習慣', questionID: 3 },
    //         { optionName: '興趣', questionID: 4 },
    //         { optionName: '外觀', questionID: 5 }
    //       ]
    //     },
    //     {
    //       ID: 5,
    //       questName: '請輸入您認為現代社會少子化的原因',
    //       required: false,
    //       questionType: 'Text',
    //       options: []
    //     }
    //   ]
    // },
    // {
    //   ID: 9,
    //   title: '休閒娛樂調查',
    //   directions: '瞭解現代人休閒娛樂選擇',
    //   sDate: '2025-06-07',
    //   eDate: '2025-08-07',
    //   questionArray: [
    //     {
    //       ID: 1,
    //       questName: '請問您目前居住在什麼區域？(單選)',
    //       required: true,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '北部', questionID: 1 },
    //         { optionName: '中部', questionID: 2 },
    //         { optionName: '南部', questionID: 3 },
    //         { optionName: '東部', questionID: 4 },
    //         { optionName: '外島', questionID: 5 },
    //         { optionName: '外國', questionID: 6 }
    //       ]
    //     },
    //     {
    //       ID: 2,
    //       questName: '除了工作/讀書以外，您喜歡出門在戶外活動嗎？(單選)',
    //       required: false,
    //       questionType: 'Single',
    //       options: [
    //         { optionName: '喜歡', questionID: 1 },
    //         { optionName: '不喜歡', questionID: 2 },
    //         { optionName: '和朋友有約才出門', questionID: 3 },
    //         { optionName: '不討厭，偶爾會自己出門走走', questionID: 4 }
    //       ]
    //     },
    //     {
    //       ID: 3,
    //       questName: '您平常喜歡做哪些休閒娛樂？(多選)',
    //       required: false,
    //       questionType: 'Multi',
    //       options: [
    //         { optionName: '運動', questionID: 1 },
    //         { optionName: '健身', questionID: 2 },
    //         { optionName: '跳舞', questionID: 3 },
    //         { optionName: '玩電玩', questionID: 4 },
    //         { optionName: '玩桌遊', questionID: 5 },
    //         { optionName: '唱歌', questionID: 6 },
    //         { optionName: '看書', questionID: 7 },
    //         { optionName: '逛街', questionID: 8 },
    //         { optionName: '上網', questionID: 9 },
    //         { optionName: '旅遊', questionID: 10 },
    //         { optionName: '看演唱會', questionID: 11 },
    //         { optionName: '其他', questionID: 12 }
    //       ]
    //     }
    //   ]
    // }

  ]

  questionResultArray: Array<any> = [
    {
      ID: 1,
      title: '現代人購物習慣調查',
      sDate: '2025-03-10',
      eDate: '2025-04-30',
      chartData: [
        {
          ID: '1',
          questionType: 'Multi',
          name: '您通常在哪個平台購物？(多選)',
          labels: ['實體店面', '網路購物平台（如：Amazon、momo、蝦皮等）', '自家電商網站', '其他'],
          data: [6, 10, 3, 1],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900'
          ]
        },
        {
          ID: '2',
          questionType: 'Single',
          name: '您每月在網上購物的頻率是多少？ (單選)',
          labels: ['每週一次以上', '每月一次', '偶爾購物', '幾乎不購物'],
          data: [1, 10, 5, 1],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900'
          ]
        },
        {
          ID: '3',
          questionType: 'Multi',
          name: '您選擇購物平台時，最重視的因素是什麼？ (多選)',
          labels: ['價格優惠', '產品多樣性', '客戶評價', '物流配送速度', '退換貨政策', '網站使用便利性'],
          data: [5, 10, 7, 6, 5, 7],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF'
          ]
        },
        {
          ID: '4',
          questionType: 'Multi',
          name: '您希望品牌在行銷活動中提供哪些優惠或服務？ (多選)',
          labels: ['限時折扣', '免費運送', '贈品或優惠券', '分期付款選項', '會員積分回饋', '售後服務保障'],
          data: [7, 20, 1, 9, 11, 14],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF'
          ]
        },
        {
          ID: '5',
          questionType: 'Text',
          name: '您購物時最常關注的產品類別是：',
          labels: [],
          data: ['家電', '遊戲', '3C', '食品'],
          backgroundColor: [
          ]
        },
        {
          ID: '6',
          questionType: 'Text',
          name: '您覺得改善購物體驗最重要的因素是：',
          labels: [],
          data: ['賣家出貨速度', '賣家服務態度'],
          backgroundColor: [
          ]
        }
      ]
    },
    {
      ID: 2,
      title: '手搖飲愛好調查',
      sDate: '2025-03-20',
      eDate: '2025-06-20',
      chartData: [
        {
          ID: '1',
          questionType: 'Single',
          name: '請問您是哪裡人？(單選)',
          labels: ['北部', '中部', '南部', '東部', '外島', '外國'],
          data: [5, 3, 3, 2, 1, 1],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF'
          ]
        },
        {
          ID: '2',
          questionType: 'Single',
          name: '您多久會購買手搖飲料一次？(單選)',
          labels: ['每天', '每週幾次', '每月幾次', '很少/幾乎不喝'],
          data: [1, 10, 5, 1],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900'
          ]
        },
        {
          ID: '3',
          questionType: 'Multi',
          name: '您最常購買哪一類型的手搖飲料？(多選)',
          labels: ['純茶', '水果茶', '奶茶', '咖啡', '冰沙', '其他'],
          data: [5, 10, 7, 6, 5, 7],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF'
          ]
        },
        {
          ID: '4',
          questionType: 'Single',
          name: '您喜歡的手搖飲料甜度是？(單選)',
          labels: ['0%（無糖）', '30%(微糖)', '50%(半糖)', '70%(少糖)', '100%（全糖）'],
          data: [7, 20, 1, 9, 11],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF'
          ]
        },
        {
          ID: '5',
          questionType: 'Multi',
          name: '您通常選擇哪些品牌的手搖飲料？',
          labels: ['50嵐', 'Milksha 迷客夏', 'CoCo都可', 'KUNG FU TEA功夫茶', 'MACU 麻古茶坊', 'Dejeng 得正', '其他'],
          data: [1, 2, 1, 3, 4, 1, 2],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF',
            '#FF77FF'
          ]
        },
        {
          ID: '6',
          questionType: 'Text',
          name: '請輸入希望飲料店可以加入的品項：',
          labels: [],
          data: ['濃湯'],
          backgroundColor: []
        }
      ]
    },
    {
      ID: 3,
      title: '運動問卷',
      sDate: '2025-03-20',
      eDate: '2025-06-20',
      chartData: [
        {
          ID: '1',
          questionType: 'Multi',
          name: '請選擇最喜歡的運動(多選)',
          labels: ['籃球', '足球', '桌球', '羽球', '保齡球', '跑步'],
          data: [4, 2, 6, 7, 5, 9],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF'
          ]
        },
        {
          ID: '2',
          questionType: 'Multi',
          name: '請選擇最喜歡的運動員(多選)',
          labels: ['梅吸', '太谷祥平', '摳鼻布萊恩', '鈴墓一郎'],
          data: [6, 10, 5, 8],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900'
          ]
        },
        {
          ID: '3',
          questionType: 'Text',
          name: '請輸入你想跟他們說的話',
          labels: [],
          data: ['好想被太谷祥平拿球棒打'],
          backgroundColor: []
        }
      ]
    },
    {
      ID: 5,
      title: '電玩遊戲調查',
      sDate: '2025-03-01',
      eDate: '2025-05-03',
      chartData: [
        {
          ID: '1',
          questionType: 'Single',
          name: '您平常會玩遊戲嗎？(單選)',
          labels: ['會', '不會', '偶爾，有空的時候才玩', '以前玩過，現在沒時間玩了'],
          data: [4, 2, 6, 7],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900'
          ]
        },
        {
          ID: '2',
          questionType: 'Multi',
          name: '您平常都是在哪個平台上遊玩？(多選))',
          labels: ['電腦', '手機', '家機', '掌機'],
          data: [6, 10, 5, 8],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900'
          ]
        },
        {
          ID: '3',
          questionType: 'Multi',
          name: '您喜歡玩哪些類型的遊戲？(多選)',
          labels: ['RPG(角色扮演)', 'RTS(即時戰略)', 'FPS(第一人稱射擊)', 'FTG(格鬥遊戲)', 'SLG(策略遊戲'],
          data: [4, 6, 7, 4, 5],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF'
          ]
        },
        {
          ID: '4',
          questionType: 'Text',
          name: '請輸入您覺得目前電腦遊戲越來越式微的原因',
          labels: [],
          data: ['馬桶才是我的電競椅'],
          backgroundColor: []
        }
      ]
    },
    {
      ID: 9,
      title: '休閒娛樂調查',
      sDate: '2025-06-07',
      eDate: '2025-08-07',
      chartData: [
        {
          ID: '1',
          questionType: 'Single',
          name: '請問您目前居住在什麼區域？(單選)',
          labels: ['北部', '中部', '南部', '東部', '外島', '外國'],
          data: [0, 0, 0, 0, 0, 0],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF'
          ]
        },
        {
          ID: '2',
          questionType: 'Single',
          name: '除了工作/讀書以外，您喜歡出門在戶外活動嗎？(單選)',
          labels: ['喜歡', '不喜歡', '和朋友有約才出門', '不討厭，偶爾會自己出門走走'],
          data: [0, 0, 0, 0],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900'
          ]
        },
        {
          ID: '3',
          questionType: 'Multi',
          name: '您平常喜歡做哪些休閒娛樂？(多選)',
          labels: ['運動', '健身', '跳舞', '玩電玩', '玩桌遊', '唱歌', '看書', '逛街', '上網', '旅遊', '看演唱會', '其他'],
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
        },
        {
          ID: '4',
          questionType: 'Single',
          name: '大概多久會光顧一次熱炒店？(單選)',
          labels: ['2-3天', '1週', '1個月', '2-3個月', '半年', '半年以上'],
          data: [7, 10, 6, 9, 5, 4],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF'
          ]
        },
        {
          ID: '5',
          questionType: 'Text',
          name: '您認為熱炒店適合推薦給外國人嗎？為什麼',
          labels: [],
          data: ['環境熱鬧，可以感受到台灣人的熱情'],
          backgroundColor: []
        }
      ]
    },
    {
      ID: 6,
      title: '熱炒店愛好投票',
      sDate: '2025-01-01',
      eDate: '2025-03-01',
      chartData: [
        {
          ID: '1',
          questionType: 'Multi',
          name: '請選擇喜歡的料理(多選)',
          labels: ['炒高麗菜', '生魚片', '沙茶牛肉', '三杯雞', '鳳梨蝦球', '鹹豬肉', '客家小炒', '宮保雞丁', '炸雞塊'],
          data: [10, 7, 6, 4, 3, 2, 5, 8, 4],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF',
            '#FF77FF',
            '#BB5E00',
            '#984B4B'
          ]
        },
        {
          ID: '2',
          questionType: 'Single',
          name: '通常會搭配什麼飲品？(單選)',
          labels: ['酒', '碳酸飲料', '果汁', '茶', '水'],
          data: [10, 4, 5, 1, 6],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF'
          ]
        },
        {
          ID: '3',
          questionType: 'Multi',
          name: '通常會和誰一起用餐？(多選)',
          labels: ['家人', '同事', '朋友', '伴侶'],
          data: [5, 10, 7, 6],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900'
          ]
        },
        {
          ID: '4',
          questionType: 'Single',
          name: '大概多久會光顧一次熱炒店？(單選)',
          labels: ['2-3天', '1週', '1個月', '2-3個月', '半年', '半年以上'],
          data: [7, 10, 6, 9, 5, 4],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF'
          ]
        },
        {
          ID: '5',
          questionType: 'Text',
          name: '您會推薦熱炒店給外國人嗎？為什麼',
          labels: [],
          data: ['環境熱鬧，可以感受到台灣人的熱情'],
          backgroundColor: []
        }
      ]
    },
    {
      ID: 7,
      title: '現代人結婚意願問券',
      sDate: '2025-03-21',
      eDate: '2025-06-21',
      chartData: [
        {
          ID: '1',
          questionType: 'Single',
          name: '請問您目前居住在什麼區域？(單選)',
          labels: ['北部', '中部', '南部', '東部', '外島', '外國'],
          data: [10, 7, 6, 4, 3, 2],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF',
            '#9F35FF'
          ]
        },
        {
          ID: '2',
          questionType: 'Single',
          name: '您的結婚意願是？(單選)',
          labels: ['想', '不想', '還在考慮', '隨緣，遇到對的人就結婚'],
          data: [3, 10, 5, 1],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900'
          ]
        },
        {
          ID: '3',
          questionType: 'Single',
          name: '是否會有生小孩的意願？(單選)',
          labels: ['有', '沒有', '還在考慮', '看對方想法', '隨緣'],
          data: [5, 10, 7, 6, 5],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF'
          ]
        },
        {
          ID: '4',
          questionType: 'Multi',
          name: '對方哪些項目會構成您的參考條件？(多選)',
          labels: ['性格', '年收', '生活習慣', '興趣', '外觀'],
          data: [7, 10, 6, 9, 5],
          backgroundColor: [
            '#EA0000',
            '#FFA042',
            '#F9F900',
            '#82D900',
            '#0080FF'
          ]
        },
        {
          ID: '5',
          questionType: 'Text',
          name: '請輸入您認為現代社會少子化的原因',
          labels: [],
          data: ['萬物皆漲，薪水不漲'],
          backgroundColor: []
        }
      ]
    }
  ]

}
