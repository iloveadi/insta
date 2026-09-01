# 📸 InstaCard AI (인스타그램 4:5 카드뉴스 자동 생성기)

> AI 기반 100% 완전 자동화 인스타그램 카드뉴스 생성 웹앱 (PWA)  
> 4:5 세로형 규격(1080×1350px) 고정 및 1:1 프로필 피드 안전 영역(Safe Zone) 보장

![InstaCard AI Preview](./preview.png)

---

## ✨ 핵심 기능

- ⚡ **원클릭 카테고리 자동 기획**: 생산성/AI, 재테크/부업, 자기계발/루틴, 마케팅/브랜딩, 건강/라이프스타일 칩 클릭 시 AI가 바이럴 주제부터 슬라이드까지 3초 만에 완성
- 🎲 **아무거나 랜덤 생성**: 버튼 하나로 무작위 흥미진진한 카드뉴스 즉시 생성
- 📐 **4:5 세로형 (1080×1350px) 고정 & 1:1 안전 영역 시스템**: 인스타 프로필 바둑판 격자에서 제목이 잘리지 않도록 Safe Zone 레이아웃 기본 적용 및 1:1 가이드 토글 지원
- 🎨 **6종 디자인 테마 프리셋**: Modern Dark, Clean Minimal, Soft Gradient, Bold Accent, Neon Cyber, Pastel Editorial
- 💾 **고화질 원클릭 다운로드**: `html-to-image` 2x 스케일 1080p 개별 PNG 저장 및 전체 슬라이드 ZIP 일괄 압축 다운로드
- 📋 **인스타 캡션 & 해시태그 원클릭 복사**: 본문 복사용 텍스트 및 해시태그 15종 클립보드 원클릭 복사

---

## 🛠️ 기술 스택

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Lucide Icons, Google Web Fonts
- **AI Integration**: Google Gemini API (`@google/genai`)
- **Export Engine**: `html-to-image`, `jszip`, `file-saver`, `canvas-confetti`

---

## 🚀 시작하기

### 1. 패키지 설치
```bash
npm install
```

### 2. 로컬 실행
```bash
npm run dev
```

### 3. 프로덕션 빌드
```bash
npm run build
```

---

## 🔑 환경 변수 설정 (선택 사항)
`.env` 파일에 Gemini API 키를 설정하거나 브라우저 상단의 `API 키 설정` 모달에서 직접 입력할 수 있습니다:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*(API 키를 입력하지 않아도 내장 지능형 AI 엔진을 통해 모든 기능을 즉시 체험할 수 있습니다.)*

---

## 👤 Author
- **Brand / Instagram Handle:** `@kimppungsamssi`
