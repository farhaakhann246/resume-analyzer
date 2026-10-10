# AI Resume Analyzer

A production-oriented web application that analyzes PDF resumes against job descriptions and generates structured insights to help candidates understand their skills, experience, and potential job-match gaps.

Built with React, Vite, Node.js, Express, and an interchangeable LLM provider architecture supporting Mock and OpenAI providers.

## Features

- **PDF Resume Upload:** Upload a PDF resume for text extraction and analysis.
- **Resume Text Extraction:** Extract and clean text from text-based PDF documents.
- **Job Description Matching:** Compare resume content with a target job description.
- **Structured Resume Analysis:** Organize extracted information into consistent fields.
- **Skills Analysis:** Categorize technical skills, tools, soft skills, and languages.
- **Experience and Education Extraction:** Present professional experience and educational background.
- **ATS-Style Feedback:** Provide heuristic feedback on keyword coverage, readability, and formatting concerns.
- **Job-Match Insights:** Identify matching keywords, potential gaps, and relevant experience.
- **Actionable Suggestions:** Generate recommendations for improving resume relevance.
- **Provider Abstraction:** Switch between Mock and OpenAI providers through environment configuration.
- **Input Validation:** Validate uploads and job descriptions.
- **Security Middleware:** Use Helmet, CORS restrictions, upload limits, and rate limiting.
- **Request Tracking:** Attach request IDs to API requests for easier troubleshooting.
- **Responsive Interface:** Display analysis results through a React dashboard.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Fetch API

### Backend
- Node.js
- Express
- REST API
- Multer
- Zod
- `pdf-parse`
- Helmet
- CORS
- `express-rate-limit`

### AI Integration
- OpenAI Responses API
- Structured output validation with Zod
- Mock LLM provider for development and testing

## Architecture

```text
Browser
   |
   v
React + Vite Frontend
   |
   | POST /api/resumes
   | Multipart form: PDF + Job Description
   v
Express API
   |
   +--> Request ID Middleware
   +--> Security and Rate Limiting
   +--> Upload and Input Validation
   |
   v
Resume Analysis Service
   |
   +--> PDF Text Extraction
   +--> Text Cleaning
   +--> Resume Input Validation
   |
   v
LLM Provider Layer
   |
   +--> Mock Provider
   |
   +--> OpenAI Provider
   |
   v
Structured Analysis Validation
   |
   v
JSON Response
   |
   v
React Analysis Dashboard
```

## Analysis Workflow

1. The user uploads a PDF resume.
2. The user supplies a job description.
3. The backend validates the file and input.
4. The PDF provider extracts and cleans resume text.
5. The analysis service sends the extracted text and job description to the selected LLM provider.
6. The provider returns structured analysis data.
7. Zod validates the response against the expected schema.
8. The API returns the result to the frontend.
9. The dashboard displays scores, skills, experience, job-match insights, and recommendations.

## Analysis Output

The structured response includes:

- Overall resume score
- Resume summary
- Contact information
- Technical skills, tools, soft skills, and languages
- Professional experience and highlights
- Education
- Job-match score
- Matched and potentially missing keywords
- Relevant experience
- ATS-style feedback
- Strengths and weaknesses
- Improvement suggestions

Scores and keyword comparisons are heuristic insights. They are not official ATS scores or predictions of hiring outcomes.

## Project Structure

```text
resume-analyzer/
├── client/
│   └── src/
│       ├── components/
│       │   ├── ResumeUploader.jsx
│       │   ├── ScoreCard.jsx
│       │   └── AnalysisDashboard.jsx
│       ├── services/
│       │   └── resume.service.js
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── providers/
│   │   ├── document/
│   │   └── llm/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── utils/
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Git
- An OpenAI API key if using the OpenAI provider

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/resume-analyzer.git
cd resume-analyzer
```

Replace `YOUR_USERNAME` with your GitHub username.

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd client
npm install
cd ..
```

### 4. Configure environment variables

Create a local `.env` file in the project root using `.env.example` as a template.

Example configuration:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
LLM_PROVIDER=mock
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
MAX_RESUME_SIZE_MB=5
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=30
```

Keep the real `.env` file out of Git. Never commit API keys or other secrets.

### 5. Start the backend

From the project root:

```bash
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

Health endpoint:

```text
GET http://localhost:3000/health
```

### 6. Start the frontend

Open a second terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite, normally:

```text
http://localhost:5173
```

## AI Provider Configuration

### Mock Provider

```env
LLM_PROVIDER=mock
```

Mock mode returns predefined, schema-valid data. It is useful for testing the upload flow, API integration, frontend dashboard, and response structure without consuming OpenAI API credits.

**Mock mode does not perform real resume extraction or job matching through an LLM.** The PDF is still processed by the document extraction layer, but the displayed analysis is simulated.

### OpenAI Provider

```env
LLM_PROVIDER=openai
OPENAI_API_KEY=your_api_key
OPENAI_MODEL=gpt-4.1-mini
```

Use a valid API key with available API credits. Restart the backend after changing environment variables.

The OpenAI provider uses structured output parsing and validates the result against the application schema. API usage may incur charges according to the selected model and account pricing.

## API

### Health Check

`GET /health`

Checks whether the API server is running.

### Analyze Resume

`POST /api/resumes`

Content type:

`multipart/form-data`

Fields:

| Field | Description |
|---|---|
| `resume` | PDF resume file |
| `jobDescription` | Target job description |

The successful response contains the filename, page count, structured analysis, and request metadata.

## Validation and Security

- Restricts resume uploads by configured file size.
- Checks the uploaded file type and PDF signature.
- Validates job-description length.
- Validates structured analysis with Zod.
- Uses Helmet security headers.
- Restricts browser access through configured CORS.
- Applies API rate limiting.
- Keeps API credentials in environment variables.
- Includes request IDs for troubleshooting.
- Avoids logging resume contents and other unnecessary personal information.

Resume analysis involves sensitive personal data. Use resumes only with appropriate authorization and avoid uploading confidential documents to systems you do not trust.

## Current Status

- [x] Backend API and health endpoint
- [x] PDF text extraction and cleaning
- [x] Resume upload and job-description validation
- [x] Structured analysis schema
- [x] Mock and OpenAI provider architecture
- [x] React upload form and results dashboard
- [x] Local frontend/backend integration tested
- [x] GitHub repository updated

The application has been tested locally using Mock mode. Real OpenAI analysis requires valid API credentials and should be tested separately.

## Future Improvements

- Persistent analysis history and database storage
- Authentication and user-specific access controls
- More advanced resume-to-job semantic matching
- Automated tests and CI workflows
- Production deployment and monitoring
- Additional document formats and scanned-PDF OCR
- More extensive file-content and prompt-injection testing

## Learning Objectives

This project demonstrates practical experience with:

- Designing a full-stack JavaScript application
- Building REST APIs with Express
- Processing PDF documents
- Validating inputs and structured AI outputs
- Separating business logic from provider implementations
- Integrating an LLM into an existing application
- Implementing backend security and error handling
- Connecting a React frontend to a Node.js backend

## Author

**Farha Khan**

Software Developer | PHP, Laravel, Node.js, React, and AI Engineering

GitHub: https://github.com/YOUR_USERNAME
