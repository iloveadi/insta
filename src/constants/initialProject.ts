import type { CardNewsProject } from '../types/cardnews';

export const INITIAL_PROJECT: CardNewsProject = {
  topic: '직장인 영혼 탈곡되는 순간 TOP 5 💀',
  target_audience: 'K-직장인',
  card_type: 'curation',
  theme_type: 'studio_editorial',
  aspect_ratio: '4:5',
  brand_handle: '@kimppungsamssi',
  slide_count: 5,
  instagram_caption: '📌 "직장인 영혼 탈곡되는 순간 TOP 5"\n\n월요일 출근길부터 금요일 퇴근길까지... 진짜 나만 이러는 거 아니지? ㅠㅠ\n뼈 맞아서 순살된 직장인 동료들 소환하고 저장 💾 필수!\n\n#직장인스타그램 #직장인공감 #회사원 #퇴사각 #월급날 #유머 #현실격공 #카드뉴스',
  slides: [
    {
      id: 'slide-1-init',
      page: 1,
      type: 'cover',
      tag: '🔥 현실 격공 100%',
      main_title: '직장인 영혼 탈곡되는 순간 TOP 5',
      sub_title: '월요일 출근길부터 퇴근 10분 전까지... 뼈 맞아서 순살될 준비하세요 💀'
    },
    {
      id: 'slide-2-init',
      page: 2,
      type: 'content',
      tag: '💀 모먼트 01',
      step_or_num: '01',
      title: '퇴근 10분 전 "잠깐 이것만 좀..."',
      body: '가방 다 싸고 외투 입고 모니터 끄기 3초 전, 부장님의 나지막한 한 마디... 내 영혼은 이미 지하철 개찰구 통과했는데 야근의 늪으로 강제 소환.',
      tip: '대처법: 5시 45분부터 화장실 칸에 피신해 있거나, 심각한 표정으로 거래처 전화 통화하는 척하기.'
    },
    {
      id: 'slide-3-init',
      page: 3,
      type: 'content',
      tag: '💀 모먼트 02',
      step_or_num: '02',
      title: '전사 메일에 "네 넵!" 전체 회신 클릭',
      body: '임원 포함 부서원 300명 참조된 공지 메일에 1초 만에 쾌속 답장 발송. 보낸 편지함 확인하자마자 식은땀 2리터 방출... 회수 버튼 광클하지만 이미 70명이 읽음.',
      tip: '대처법: 손가락이 미끄러졌다는 변명은 더 추함. 모니터 끄고 빠른 칼퇴가 유일한 답.'
    },
    {
      id: 'slide-4-init',
      page: 4,
      type: 'content',
      tag: '💀 모먼트 03',
      step_or_num: '03',
      title: '월급 입금 30분 만에 잔고의 최후',
      body: '오전 9시 "월급 입금 완료" 알림에 입꼬리 승천. 9시 30분 카드값, 월세, 대출이자, 공과금이 1초 컷으로 퍼나름. 내 통장은 그저 돈이 스쳐 지나가는 하이패스 톨게이트.',
      tip: '현실 조언: "로그인하셨습니다"와 "로그아웃되었습니다"가 3초 간격으로 일어나는 삶의 진리.'
    },
    {
      id: 'slide-5-init',
      page: 5,
      type: 'cta',
      tag: '😭 같이 고통받자',
      main_title: '나만 이런 거 아니지? ㅠㅠ',
      sub_title: '지금 당장 같이 영혼 탈곡당하고 있는 동료/친구 소환하고 [@저장] 해두기!'
    }
  ]
};
