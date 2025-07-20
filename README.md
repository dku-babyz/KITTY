<p align="center">
  <img width="300" height="198" alt="image" src="https://github.com/user-attachments/assets/0c430905-4fea-4234-a9f3-af16773a13ae" />
</p>

<br/>
<br/>

# <img src="image/kitty.png" width="24" alt="Kitty Logo" style="vertical-align: middle;"/>  KITTY - Keep It Talk-safe To Youth  <img src="image/kitty.png" width="24" alt="Kitty Logo" style="vertical-align: middle;"/>


> **AI 기반 유해성 탐지, 자동 대체, 그리고 동화 생성까지**  
> 아이들이 안전하고 창의적인 디지털 경험을 누릴 수 있도록 돕는 통합 플랫폼입니다.


![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI_API-0033AD?style=flat&logo=openai&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-121212?style=flat&logo=uvicorn&logoColor=white)
![Torch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)
![Transformers](https://img.shields.io/badge/HuggingFace_Transformers-FCC624?style=flat&logo=python&logoColor=black)
![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat&logo=react&logoColor=black)
![Stability AI](https://img.shields.io/badge/Stability_AI-357EDD?style=flat&logo=stability-ai&logoColor=white)




<br/>
<br/>

## 📁 프로젝트 구조

```
kitty-ai/              # 유해 문장 감지 및 대체 시스템
kitty_ai_agent/        # 일기 및 이미지 생성 AI 에이전트 시스템
report_generator/      # 생성형 AI기반 통계/리포트 생성기 및 GPT 요약 보고서
```

<br/>
<br/>


## 🔧 주요 기능 요약

### 1. 🛡️ 유해 문장 탐지 및 대체 ([Kitty-AI](https://github.com/dku-babyz/kitty-ai))
- 사전 기반 + RoBERTa 모델 기반 다중 클래스 유해성 예측
- OpenAI GPT를 활용한 문장 대체 제안
- API 기반 필터링 서비스 제공

<br/>

### 2. 📊 통계 기반 리포트 생성기 ([Report_Generator](https://github.com/dku-babyz/kitty-report-generator))
- `chat_db`, `site_db` → 유해성 통계 분석
- 사용자별 top 3 유해 단어, 보냄/받음 비율 계산
- GPT를 통한 사용 요약 보고서

  <br/>

### 3. 📚 유해 단어 설명 및 대체 단어 제시 ([Report_Generator](https://github.com/dku-babyz/kitty-report-generator))
- 유해 단어에 대한 간단한 설명 + 친절한 퀴즈 JSON 자동 생성
- GPT 또는 사전 기반으로 학습/교육용 대체 문장 제안
- 어린이 대상의 안전하고 이해 중심적인 교육 목적 포함

  <br/>
  
### 4. 📘 일기 및 이미지 생성 AI AGENT ([kitty_ai_agent](https://github.com/dku-babyz/kitty-ai-agent))
- `risk_score`에 따라 이야기 톤 조정 (Positive / Neutral / Challenge)
- 3회 반복 생성 → GPT로 평가 → 최적 결과 선택 (생성 → 평가 → 선택 → 학습 구조)
- 매일 이어지는 일기 + 아동용 이미지 생성



<br/>
<br/>

## 🔧  기능 설명
<br/>

## 1. 🛡️ 유해 문장 탐지 및 대체 ([Kitty-AI](https://github.com/dku-babyz/kitty-ai))

> **"단순한 검열이 아닌, 교육적이고 의미 있는 수정"**  
> 텍스트 내 유해 표현을 탐지하고, 긍정적이며 중립적인 방향으로 자연스럽게 대체합니다.

<br/>

### 🧩 처리 방식

- **입력 문장**: 일반 사용자 텍스트
- **1차 필터링**: 사전 기반 유해어 탐지 (`DictionaryChecker`)
- **2차 분류**: RoBERTa 기반 유해성 멀티클래스 분류 (`TextPredictor`)
- **3차 대체**: OpenAI GPT를 활용한 문장 개선 (`replace_text()` 함수)
- **출력**: 유해어 + 정제 제안 문장 + 대체 사유

<br/>

### 📝 예시 (`replace_text()` 함수 결과)

| 원문 | 유해어 | 개선 방식 | 대체 문장 |
|------|--------|-----------|------------|
| 멀 꼬라보는 거야 | `['꼬라보는']` | 부정적인 표현을 중립적인 질문 형태로 대체 | _무슨 일이 있어서 그런 표정을 짓고 있는 거야?_ |
| 일기 예보 안 맞는 거 때문에 진짜 개 빡침.. 진짜 일안하고 뭐함? | `['빡침']` | 감정을 표현하되 비속어 없이 | _일기 예보가 맞지 않아서 정말 화가 나.. 도대체 뭐하고 있는 거지?_ |
| 제발 한국에서 짱깨들 다 사라졌으면 좋겠다. | `['짱깨들', '사라졌으면 좋겠다']` | 부적절한 표현 완화 + 다문화 존중 강조 | _한국에서 모두가 함께 행복하게 살아갈 수 있는 환경이 되면 좋겠어요._ |
| 다른 집 남편들은 알아서 잘만 벌어 와 | `['다른 집 남편들']` | 특정 성 역할 강조 제거 | _각자의 가정이 잘 돌아가기를 바라._ |

<br/>

### 🧪 API 사용 예시

```bash
POST /replace
{
  "text": "제발 한국에서 짱깨들 다 사라졌으면 좋겠다."
}
```

**응답:**

```json
{
  "bad_words": ["짱깨들", "사라졌으면 좋겠다"],
  "strategy": "부적절한 표현을 완화하고, 한국의 다양한 문화에 대한 긍정적인 시각을 강조하는 문장으로 대체",
  "suggested_text": "한국에서 모두가 함께 행복하게 살아갈 수 있는 환경이 되면 좋겠어요."
}
```

<br/>

🎯 해당 기능은 단순 검열을 넘어서,  
어린이·청소년 사용자에게 **건강한 커뮤니케이션 습관을 형성**하도록 유도합니다.

> 🧠 AI가 말하는 방식을 바꾸면, **세상을 더 나은 방향으로 이끌 수 있습니다.**




<br/>

## 2. 📊 통계 기반 리포트 생성기 ([Report_Generator](https://github.com/dku-babyz/kitty-report-generator))

> **"숫자로 보는 유해성, GPT가 정리한 리포트까지"**  
> 채팅 및 사이트 활동에서 유해 표현 사용 패턴을 분석하고,  
> GPT를 통해 요약 리포트를 자동 생성합니다.

<br/>

### 💬 Chat 분석 예시 (`generate_chat_report()` output)

```json
"spend_receive_stats": {
  "spend": {
    "total_messages": 4,
    "harmful_messages": 3,
    "clean_messages": 1,
    "harmful_pct": 75.0,
    "clean_pct": 25.0
  },
  "receive": {
    "total_messages": 5,
    "harmful_messages": 4,
    "clean_messages": 1,
    "harmful_pct": 80.0,
    "clean_pct": 20.0
  }
}
```

📌 위 결과는 사용자의 **보낸 메시지 중 75%** , **받은 메시지 중 80%** 가 유해한 표현을 포함하고 있음을 보여줍니다.  
GPT는 이를 바탕으로 다음과 같은 **해석 요약** 을 제공합니다:

> _"최근 대화에서 유해 표현이 높은 비율로 사용되었습니다. 사용자의 보낸 메시지 중 3건(75%)이 유해한 것으로 분석되었으며, 받은 메시지에서도 유해성이 높게 나타났습니다. 향후 커뮤니케이션 시 적절한 표현을 사용하는 것이 권장됩니다."_  


<br/>

### 🌐 Site 분석 예시 (`generate_user_report()` output)

```json
{
  "user_id": 2,
  "highest_avg_category": {
    "category": "discrimination",
    "average": 0.2818
  },
  "top5_sites_by_sum": [
    {
      "site": "www.example2.com",
      "sum": 1.681
    }
  ],
  "category_means": {
    "abuse": 0.2804,
    "censure": 0.2816,
    "discrimination": 0.2818,
    "hate": 0.2790,
    "sexual": 0.2799,
    "violence": 0.2783
  }
}
```

🧾 GPT 리포트 자동 생성 결과:

> 사용자가 방문한 사이트들에서의 유해성 분석 결과, **"discrimination"** 카테고리의 평균 유해도가 **0.282**로 가장 높아, 차별적인 콘텐츠가 상대적으로 많이 존재함을 나타냅니다.  
> 유해성 합계가 가장 높은 사이트는 **www.example2.com** 으로, 총 유해성 점수는 **0.681** 입니다.

<br/>

#### 📊 카테고리별 평균 유해도
- **Abuse**: 0.280  
- **Censure**: 0.282  
- **Discrimination**: 0.282  
- **Hate**: 0.279  
- **Sexual**: 0.280  
- **Violence**: 0.278  

<br/>

### ✅ 권장 대응 방안

1. **사이트 방문 자제**  
   유해성이 높은 사이트는 방문을 피하세요. 예: `www.example2.com`
2. **콘텐츠 필터링**  
   웹 필터링 소프트웨어를 사용해 유해 콘텐츠를 차단하세요.
3. **상담 및 지원 권장**  
   차별, 혐오 경험 시 심리적 지원을 받을 수 있는 경로를 제공하세요.
4. **정보 교육 강화**  
   유해 콘텐츠의 위험성과 대응 방안을 교육하세요.
5. **피드백 제공**  
   유해 콘텐츠가 발견된 경우, 사이트에 알리고 개선을 촉구하세요.

<br/>

🎯 해당 통계는 모두 `chat_db` 또는 `site_db` 기반으로 생성되며,  
GPT를 통해 사람이 이해할 수 있는 형태의 **자연어 요약 보고서**로 변환됩니다.




<br/>

## 3. 📚 유해 단어 설명 및 대체 단어 제시 ([Report_Generator](https://github.com/dku-babyz/kitty-report-generator))

> **"어린이들이 표현을 배우고 바르게 사용할 수 있도록"**  
> Kitty 시스템은 유해 단어를 단순히 차단하지 않고,  
> 그 단어의 **뜻, 기원, 감정적 영향**을 알려주고  
> **자연스러운 퀴즈 학습**으로 대체 표현을 안내합니다.

<br/>

### 🔎 예시: `꼬라보는`

다음은 `QuizGenerator.generate_quiz_for_entry()` 함수의 출력 예시입니다:

```json
{
  "bad_word": "꼬라보는",
  "reason": {
    "explanation": "상대를 기분 나쁘게 노려보거나 깔보는 태도...",
    "origin": "경상도 사투리에서 유래된 표현으로..."
  },
  "quiz": {
    "question1": {
      "question": "가장 관련이 적은 단어는?",
      "choices": ["노려보는", "깔보는", "존중하는", "무시하는"],
      "answer": 3
    },
    "question2": {
      "question": "담고 있는 태도는?",
      "choices": ["공손함", "무관심", "깔봄", "감탄"],
      "answer": 3
    }
  }
}
```

🎯 위 퀴즈는 `QuizGenerator`와 `HarmfulContentPipeline`을 통해 자동 생성되며,  
어린이들이 유해 단어의 문제점을 이해하고  
**긍정적인 표현으로 바꿔 말하는 습관**을 익힐 수 있도록 돕습니다.




<br/>


## 4. 📘 일기 및 이미지 생성 AI AGENT :  [Kitty_Ai_Agent](https://github.com/dku-babyz/kitty-ai-agent)

### 1) 일기/이미지 생성

#### ✅ 첫번째 날

<img src="image/image_2.png" width="500"/>

> **“오늘은 친구들과!”**  
> 이 이야기는 EXP가 높은 경우 (50 이상) 생성되는 **Positive 시나리오**입니다.  
> 햇살 아래 놀이터에서 새 친구들과 신나게 뛰노는 키티의 하루를 그립니다.

```bash

This morning, the blue cat Kitty was full of confidence thanks to yesterday's forest adventure.
This time, she went to the playground with her neighborhood friends, the little birds.
The playground was full of sunshine and brightly lit. Kitty felt happy as she swung high into the sky.
Her friends praised her bravery and laughed together. 'Yesterday was exploring the forest, today I'm flying in the sky!' Kitty thought.
As the day came to an end, Kitty cherished the time spent with her friends. 'Any day can be special when we're together!'
Kitty promised to herself.

```

<br/>


#### ✅ 두번째 날

<img src="image/image_3.png" width="500"/>

> **“어제는 친구들과, 오늘은 물 위에서 반짝반짝!”**  
> 매일 이어지는 일기 같은 이야기, 키티는 평온한 시간을 연못가에서 보냅니다.  
> 이 스토리는 중립적이고 따뜻한 **Neutral 시나리오**입니다.


```bash

Another bright morning arrived.
The blue cat Kitty remembered the fun times at the pond yesterday and decided to take a walk to the nearby forest.
The forest was cool, with gentle sunlight streaming through the trees.
Kitty felt refreshed as she walked, looking at the green leaves.
Suddenly, a small voice came from deep in the forest. 'Help!' It was a little mouse, stuck with its tiny foot caught in a tree root.
Kitty quickly ran over to help the mouse. The mouse shyly smiled, grateful, and Kitty's heart filled with warmth.
'Today, I had a little adventure in the forest. I'm so glad I could help a friend!' Kitty thought as she smiled on her way home.

```



<br/>
<br/>


### 2) AI 피드백 반영 과정

#### 📤 원래 이미지 → 🪄 피드백 이후 이미지

| Before | After |
|--------|-------|
| <img src="image/image_4.png" width="340"/> | <img src="image/image_7.png" width="340"/> |

> AI Agent는 생성된 이미지에 대해 자동 평가(Critic LLM)를 수행합니다.  
> 피드백: `"키티의 외형 특징과 스토리의 구성 요소를 더 명확히 반영하면 좋습니다."`  
> → 해당 피드백을 반영해 다음 루프에서 더 나은 결과를 생성합니다.  
> 이 과정은 Cost를 아끼기 위해, 최대 3회 반복되며 최종 결과만 저장됩니다.


###




<br/>
<br/>

## 🔧 함수/클래스 구조 요약
<br/>

### 📦 report_generator

| 함수명 | 설명 |
|--------|------|
| `generate_chat_report()` | 채팅 로그 기반 유해 사용자 리포트 생성 |
| `generate_user_report()` | 사이트 활동 기반 GPT 요약 생성 |
| `append_row_to_chat_csv()` | 새 채팅 로그 추가 |
| `append_row_to_site_csv()` | 새 사이트 로그 추가 |
| `get_harmful_chat_categories_by_id()` | 채팅 ID 기반 평균 유해 점수 |
| `get_harmful_site_categories_by_id()` | 사이트 ID 기반 평균 유해 점수 |

---

<br/>

### 📦 kitty-ai

| 함수명 / 클래스 | 설명 |
|----------------|------|
| `replace_text()` | 유해 문장을 GPT로 교정 |
| `TextPredictor` | 모델 기반 유해 문장 예측기 |
| `DictionaryChecker` | 사전 기반 유해어 탐지기 |
| `ChatDataManager` | 예측 결과 기록 및 저장 |
| `QuizGenerator` | 유해 표현 퀴즈 생성기 |

---

<br/>

### 📦 kitty_ai_agent

| 함수 / 클래스 | 설명 |
|---------------|------|
| `AgentManager.run_agent(risk_score)` | 전체 생성 파이프라인 실행 |
| `planner_llm.call()` | 프롬프트 조정 및 톤 결정 |
| `story_llm.call()` | 영어/한글 동화 생성 |
| `story_critic_llm.call()` | 스토리 평가 및 피드백 생성 |
| `image_llm.call()` | Stable Diffusion 기반 이미지 생성 |
| `image_critic_llm.call()` | 이미지 품질 평가 |
| `prompt_critic_llm.call()` | 생성 프롬프트 리비전 수행 |

---


