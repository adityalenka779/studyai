# studyai

## Project Description

**studyai** is a simple web application that helps students quickly understand academic topics. Instead of searching through multiple websites, a student can enter a topic (for example, _Photosynthesis_, _Binary Search_, or _World War II_), and the application will generate a clear and simple explanation.

The system uses an AI model to generate short, student-friendly explanations in real time. The goal of the project is to demonstrate how artificial intelligence can be integrated into educational tools to make learning faster and more accessible.

This project was built using **Next.js**, **TypeScript**, **Tailwind CSS**, and the **Google Gemini AI API** or **Groq API** and is deployed using **Vercel**.

---

## How the AI API Was Used

This project integrates the **Google Gemini AI API** or **Groq API** to generate explanations for study topics.

There was a minor issue from google's server side due to which **Google Gemini AI API** couldn't be used, so for the time being **Groq API** is being used. All though the project can run fine on any one of them.

When a user enters a topic and clicks **Explain Topic**, the following process happens:

1. The frontend sends a **POST** request to a backend API route (`/api/explain`).
2. The API route receives the topic entered by the user.
3. The backend calls the Gemini AI/ Groq AI model using the `@google/generative-ai`/`groq-sdk` SDK.
4. A prompt is sent to the AI model asking it to explain the topic in simple terms suitable for students.
5. The AI generates a response.
6. The explanation is returned to the frontend and displayed on the webpage.

This demonstrates how AI-powered text generation can be integrated into web applications to provide intelligent educational assistance.

---

## Technology Stack

- **Next.js (App Router)** – Full-stack React framework
- **TypeScript** – Type-safe JavaScript development
- **Tailwind CSS** – Utility-first styling framework
- **Google Gemini API** – AI-powered explanation generation
- **Groq API(LLaMA 3.3 70B)** -AI-powered explanation generation
- **Vercel** – Application deployment platform

---

## Setup Instructions

Follow these steps to run the project locally.

### 1. Clone the Repository

```
git clone https://github.com/YOUR_USERNAME/studyai.git
```

Navigate into the project folder:

```
cd studyai
```

---

### 2. Install Dependencies

Install the required Node.js packages:

```
npm install
```

---

### 3. Add Environment Variables

Create a file in the root directory named `.env.local` and add your API key.

**For Groq (default):**

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get a free Groq API key at https://console.groq.com

**To switch to Gemini instead:**

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get a Gemini API key at https://aistudio.google.com/apikey

### 4. Run the Development Server

Start the Next.js development server:

```
npm run dev
```

Open your browser and go to:

```
http://localhost:3000
```

---

### 5. Using the Application

1. Enter a study topic in the input field.
2. Click **Explain Topic** or press **Enter**.
3. The AI generates a simplified, student-friendly explanation of the topic

---

## API Endpoint

**POST** `/api/explain`

Request:

```json
{
  "topic": "Photosynthesis"
}
```

Response:

```json
{
  "explanation": "Photosynthesis is the process by which plants convert sunlight, water, and CO2 into glucose and oxygen..."
}
```

---

## Deployment

The application is deployed using **Vercel**.

Deployment steps:

1. Push the project to GitHub.
2. Connect the repository to Vercel.
3. Add the environment variable `GEMINI_API_KEY`/ `GROQ_API_KEY` in the Vercel project settings.
4. Deploy the application.

After deployment, the project will be accessible via a public URL.

---

## Example Topics to Try

- Photosynthesis
- Binary Search
- Newton's Laws of Motion
- World War II
- Artificial Intelligence

---

## Future Improvements

- Add topic suggestions for students
- Support multiple explanation levels (basic / advanced)
- Add diagrams or visual learning aids
- Enable conversational follow-up questions

---

## Author

Aditya Lenka
Final Year Computer Science Engineering (AI/ML)
