# Redback.ai

## Requirements Specification

**Project:** Redback.ai  
**Document Type:** Software Requirements Specification (SRS)  
**Version:** 1.0  
**Status:** Initial Specification  
**Technology Direction:** React + TypeScript + NestJS + Database + AI  

---

## 1. Introduction

### 1.1 Project Overview

Redback.ai is an AI-powered web application that allows users to upload documents, mainly PDF files, and interact with their content using artificial intelligence.

The system extracts information from uploaded documents, processes the content, and allows users to ask questions about the documents through an AI chat interface.

The main idea is:

**Upload → Extract → Process → Retrieve → Ask → Answer**

---

## 2. Problem Statement

Users often work with large documents such as:

* Courses
* Technical documentation
* Books
* Research papers
* Reports
* Manuals
* Business documents

Finding specific information in these documents can be slow and difficult.

Redback.ai provides a simple way to interact with these documents without manually reading the entire file.

For example:

**User uploads:** `networking-course.pdf`

**User asks:**

> What is the difference between TCP and UDP?

**Redback.ai responds:**

> TCP is connection-oriented, while UDP is connectionless...

The answer should be based primarily on the content of the uploaded document.

---

# 3. Objectives

## 3.1 Main Objective

The main objective is to develop an AI-powered document analysis platform that allows users to communicate with their documents.

## 3.2 Specific Objectives

The application must:

1. Allow users to create accounts.
2. Allow users to authenticate securely.
3. Allow users to upload PDF documents.
4. Extract text from PDF files.
5. Process and organize extracted content.
6. Split documents into manageable text chunks.
7. Store document information.
8. Retrieve relevant information from documents.
9. Send relevant context to an AI model.
10. Generate answers based on document content.
11. Store conversations.
12. Provide a simple and modern user interface.

---

# 4. Scope

## 4.1 Included in the MVP

The first version of Redback.ai will include:

### Authentication

* User registration
* User login
* User logout
* User session/authentication management

### Document Management

* PDF upload
* Document listing
* Document details
* Document deletion
* Document processing status

### PDF Processing

* PDF validation
* Text extraction
* Page detection
* Text cleaning
* Text chunking

### AI

* Question answering
* Context retrieval
* AI-generated responses

### Chat

* Create conversations
* Send messages
* Display AI responses
* Store conversation history

---

## 4.2 Future Features

The following features are outside the initial MVP but may be added later:

* DOCX support
* TXT support
* Markdown support
* Image/document OCR
* Multiple document conversations
* Document comparison
* Automatic summaries
* AI-generated document titles
* Citations and page references
* Team workspaces
* Shared documents
* Advanced AI agents

---

# 5. Target Users

Redback.ai is intended for people who regularly work with documents.

Examples include:

* Students
* Developers
* Researchers
* Teachers
* Technical users
* Professionals
* Companies

---

# 6. Functional Requirements

## FR-01 — User Registration

The system shall allow a new user to create an account.

Required information:

* Email
* Password

The system must validate the provided information before creating the account.

---

## FR-02 — User Login

The system shall allow registered users to log in.

The system must verify the user's credentials before granting access.

---

## FR-03 — User Authentication

Protected resources must only be accessible to authenticated users.

A user must not be able to access another user's documents or conversations.

---

# 7. Document Requirements

## FR-04 — Upload Document

The system shall allow authenticated users to upload PDF documents.

The system must validate:

* File type
* File size
* File integrity

Invalid files must be rejected.

---

## FR-05 — Store Document Information

The system shall store document metadata.

Example:

```text
Document
├── id
├── userId
├── name
├── filePath
├── status
├── createdAt
└── updatedAt
```

---

## FR-06 — Document Processing

After upload, the system shall process the document.

Processing stages:

```text
Uploaded
    ↓
Processing
    ↓
Text Extraction
    ↓
Chunking
    ↓
Indexing
    ↓
Ready
```

If processing fails, the document status must become:

```text
FAILED
```

---

# 8. PDF Parser Requirements

## FR-07 — Extract Text

The system shall extract readable text from PDF documents.

The parser should preserve useful information such as:

* Text
* Page number
* Document ID

Example:

```json
{
  "documentId": "doc_123",
  "page": 5,
  "content": "Introduction to databases..."
}
```

---

## FR-08 — Clean Text

The system shall clean extracted text before further processing.

Cleaning may include:

* Removing unnecessary whitespace
* Removing invalid characters
* Normalizing line breaks
* Removing duplicated formatting artifacts

---

## FR-09 — Text Chunking

The system shall divide large documents into smaller chunks.

Example:

```text
PDF
 ↓
Page 1
Page 2
Page 3
 ↓
Extracted text
 ↓
Chunks
 ├── Chunk 1
 ├── Chunk 2
 ├── Chunk 3
 └── Chunk 4
```

Chunking is required to make document retrieval and AI processing more efficient.

---

# 9. AI Requirements

## FR-10 — User Question

The system shall allow the user to ask a question about a document.

Example:

```text
User:
What is normalization?
```

---

## FR-11 — Context Retrieval

Before generating an answer, the system should retrieve the most relevant parts of the document.

Example:

```text
Question
   ↓
Search document
   ↓
Relevant chunks
   ↓
AI model
```

---

## FR-12 — Generate Answer

The AI system shall generate an answer using the retrieved document context.

The system should prioritize information from the user's document.

If sufficient information cannot be found, the system should clearly indicate that the document does not contain enough information.

---

# 10. RAG Requirements

Redback.ai should use a Retrieval-Augmented Generation architecture.

### RAG workflow

```text
Document
    ↓
Text Extraction
    ↓
Chunking
    ↓
Embeddings
    ↓
Vector Storage
    ↓
      ┌─────────────────┐
      │                 │
User Question → Search │
      │                 │
      └───────┬─────────┘
              ↓
       Relevant Chunks
              ↓
          AI Model
              ↓
           Answer
```

The RAG system allows the AI model to use relevant information from the uploaded documents.

---

# 11. Conversation Requirements

## FR-13 — Create Conversation

Users shall be able to create a conversation associated with a document.

---

## FR-14 — Send Message

Users shall be able to send questions.

Example:

```text
User:
Explain this chapter.

AI:
This chapter explains...
```

---

## FR-15 — Store Messages

The system shall store conversation messages.

Each message should contain:

```text
id
conversationId
role
content
createdAt
```

The role can be:

```text
USER
ASSISTANT
```

---

## FR-16 — Conversation History

Users shall be able to view previous conversations and continue them.

---

# 12. Database Requirements

The application should use a relational database.

### Main entities

```text
User
 │
 ├── Documents
 │      │
 │      └── DocumentChunks
 │
 └── Conversations
          │
          └── Messages
```

### User

```text
id
email
password
createdAt
updatedAt
```

### Document

```text
id
userId
name
filePath
status
createdAt
updatedAt
```

### DocumentChunk

```text
id
documentId
page
content
embedding
```

### Conversation

```text
id
userId
documentId
title
createdAt
updatedAt
```

### Message

```text
id
conversationId
role
content
createdAt
```

---

# 13. Backend Requirements

The backend shall be developed using **NestJS and TypeScript**.

The backend should use a modular architecture.

Suggested structure:

```text
src/
│
├── auth/
│
├── users/
│
├── documents/
│
├── parser/
│
├── ai/
│
├── conversations/
│
├── messages/
│
└── main.ts
```

Each module should have a clear responsibility.

---

# 14. API Requirements

## Authentication API

```http
POST /auth/register
POST /auth/login
POST /auth/logout
GET /auth/me
```

## Documents API

```http
POST /documents
GET /documents
GET /documents/:id
DELETE /documents/:id
```

## Processing API

```http
POST /documents/:id/process
GET /documents/:id/status
```

## Chat API

```http
POST /documents/:id/chat
GET /documents/:id/conversations
GET /conversations/:id/messages
```

---

# 15. Frontend Requirements

The frontend shall be developed using React and TypeScript.

## Main pages

### Landing Page

The landing page should explain:

* What Redback.ai is
* What problem it solves
* How it works
* Main benefits

---

### Login Page

Users can log into their account.

---

### Register Page

New users can create an account.

---

### Dashboard

The dashboard should allow users to:

* View documents
* Upload documents
* See processing status
* Open documents
* Delete documents

---

### Document Page

The document page should contain:

```text
Document information
        +
Chat interface
```

Example:

```text
┌─────────────────────────────────────┐
│ networking.pdf                      │
├─────────────────────────────────────┤
│                                     │
│ You: What is TCP?                   │
│                                     │
│ AI: TCP is a connection-oriented... │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ Ask something...              Send  │
└─────────────────────────────────────┘
```

---

# 16. UI/UX Requirements

The interface should be:

* Minimal
* Modern
* Responsive
* Accessible
* Easy to understand
* Consistent

The AI conversation should be the main focus of the document page.

The user should not need to understand the technical AI pipeline.

---

# 17. Security Requirements

## SEC-01 — Password Security

Passwords must never be stored as plain text.

They must be securely hashed.

## SEC-02 — Authorization

Users must only access resources that belong to them.

## SEC-03 — File Validation

Uploaded files must be validated before processing.

## SEC-04 — API Security

Protected API endpoints must require authentication.

## SEC-05 — Input Validation

User input must be validated before being processed.

---

# 18. Error Handling

The system must provide understandable error messages.

### Invalid file

```text
Invalid PDF file.
```

### Empty document

```text
This document does not contain readable text.
```

### Parser failure

```text
Unable to process this document.
```

### AI failure

```text
The AI service is temporarily unavailable.
```

### Unauthorized access

```text
You are not authorized to access this resource.
```

---

# 19. Non-Functional Requirements

## NFR-01 — Performance

The system should process documents efficiently and avoid blocking the main API.

## NFR-02 — Scalability

The architecture should allow the application to support more users and documents in the future.

## NFR-03 — Maintainability

The code should follow:

* Clean Code principles
* SOLID principles
* Modular architecture
* TypeScript best practices

## NFR-04 — Reliability

The application should handle failures without losing user data.

## NFR-05 — Responsiveness

The web application must work on:

* Desktop
* Tablet
* Mobile

---

# 20. System Architecture

The overall architecture should follow this structure:

```text
                 ┌──────────────────┐
                 │      React       │
                 │    Frontend      │
                 └────────┬─────────┘
                          │
                       REST API
                          │
                          ↓
                 ┌──────────────────┐
                 │      NestJS      │
                 │     Backend      │
                 └────────┬─────────┘
                          │
          ┌───────────────┼────────────────┐
          ↓               ↓                ↓
      ┌────────┐    ┌──────────┐     ┌──────────┐
      │  Auth  │    │Documents │     │   Chat   │
      └────────┘    └─────┬────┘     └────┬─────┘
                          │               │
                          ↓               ↓
                    ┌──────────┐    ┌──────────┐
                    │PDF Parser│    │ AI / RAG │
                    └──────────┘    └────┬─────┘
                                         │
                          ┌──────────────┼──────────────┐
                          ↓              ↓              ↓
                     ┌─────────┐   ┌──────────┐   ┌─────────┐
                     │Database │   │  Vector  │   │ AI API  │
                     │         │   │  Store   │   │         │
                     └─────────┘   └──────────┘   └─────────┘
```

---

# 21. Development Phases

## Phase 1 — Project Setup

* Create React project
* Create NestJS project
* Configure TypeScript
* Configure database
* Configure Git

## Phase 2 — Authentication

* Registration
* Login
* Authentication
* Authorization

## Phase 3 — Documents

* PDF upload
* Document database model
* Document listing
* Document deletion

## Phase 4 — PDF Parser

* PDF reading
* Text extraction
* Text cleaning
* Chunking

## Phase 5 — AI / RAG

* Embeddings
* Vector storage
* Retrieval
* AI integration
* Prompt construction

## Phase 6 — Chat

* Conversation creation
* Message system
* AI responses
* Conversation history

## Phase 7 — Frontend

* Dashboard
* Document page
* Chat interface
* Loading states
* Error states

## Phase 8 — Testing

* Unit tests
* API tests
* Integration tests
* Security testing
* User testing

## Phase 9 — Deployment

* Production database
* Backend deployment
* Frontend deployment
* Environment variables
* Monitoring

---

# 22. MVP Success Criteria

The MVP will be considered successful when a user can:

```text
1. Create an account
        ↓
2. Login
        ↓
3. Upload a PDF
        ↓
4. Wait for processing
        ↓
5. Open the document
        ↓
6. Ask a question
        ↓
7. Retrieve relevant content
        ↓
8. Receive an AI answer
        ↓
9. View the conversation later
```

---

# 23. Core Product Principle

The core principle of Redback.ai is:

> **Don't make the user read the document. Let the user talk to it.**

The application should hide the complexity of PDF parsing, embeddings, retrieval, databases, and AI behind a simple user experience.

**User experience:**

```text
Upload a document.
        ↓
Ask a question.
        ↓
Get an answer.
```

**Technical reality:**

```text
PDF
 ↓
Parser
 ↓
Text
 ↓
Chunks
 ↓
Embeddings
 ↓
Vector Search
 ↓
Relevant Context
 ↓
Prompt
 ↓
AI Model
 ↓
Response
```

This separation between the **simple user experience** and the **complex internal AI pipeline** is one of the main design principles of Redback.ai.

