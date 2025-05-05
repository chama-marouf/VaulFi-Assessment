# Technical Assessment: Senior Fullstack Engineer

**Estimated Time:** 4–6 hours
**Format:** Take-home assignment + follow-up interview
**Deadline:** 1 week from the date you received the email

---

## Part 1: Signup Flow Implementation

### Objective:

Implement a signup flow for web and mobile based on the provided Figma design that was shared via email.

### Requirements:

- Use **React** or **Next.js** for web implementation.
- Use **React Native** or **Expo** for Mobile implementation.
- Implement:
  - Email and password entry
  - Phone number entry
  - OTP entry
  - Forms validation and error messages
  - API calls to the provided backend (instructions available in the `README.md` inside the `backend` folder)
  - Navigation to success screen
  - Error handling
- Match the mobile flow design as closely as possible in the web app
- Ensure web app responsiveness
- Add 2–3 unit or integration tests for the signup form

### Expected Folder Structure:

```
.
├── Frontend
│   ├── Mobile                 # Mobile code
│   ├── Shared                 # For components reusable in Web and Mobile
│   └── Web                    # Web code
└── ...
```

### Evaluation Criteria:

- UI accuracy and attention to detail
- Code structure and modularity
- State management approach
- Handling of validation and errors
- Code readability and scalability
- Component abstraction and reuse (preferably using a shared design system or UI library)
- CSS/layout techniques
- Debugging skills
- Git commits

### Deliverables:

- GitHub repo
- `README.md` in each folder with setup instructions and implementation notes (feel free to use backend's README as a template)

---

## Part 2: Feature Architecture — Real-Time In-App Support Chat (For the Follow-up Interview)

### Prompt:

You're tasked with designing and implementing a **real-time in-app support chat** feature for a product that already has core infrastructure in place (authentication, user management, and real-time messaging backbone). Users can reach out to support agents from mobile or web. Support agents respond from a separate internal tool.

Your job is to design how this feature will be integrated into the existing mobile and web apps, and how the backend services will support it within the current architecture. Keep in mind that messages must sync in real-time, support typing indicators, and persist across devices. The system should be scalable, secure, and fault-tolerant.

### Key Functional Requirements:

- Initiate a chat session with support
- Send/receive messages in real time
- Show message history (persistence)
- Display typing indicators and online/offline status
- Sync messages across devices
- Notify users of new responses
- Admin dashboard (internal tool for support agents)

### Assumptions:

- Authentication system already exists
- Core app is already in place
- Real-time messaging infrastructure is already in place but not yet wired into this feature or the app

### Deliverables:

Prepare a short architecture walkthrough (slides are optional). You'll present this during the follow-up interview. It should include:

- Architecture diagram (draw.io, Figma, etc)
- Backend components to build or extend
- Data model (chat sessions, messages, etc)
- API design (REST or GraphQL)
- Real-time event flow
- Frontend integration
- Rollout and testing plan
- Security considerations
- Tradeoffs or potential challenges

### Evaluation Criteria:

- Clear and practical architecture
- Integration with existing systems
- Real-time feature handling
- Consideration for both mobile and web platforms
- Consideration for scalability and fault tolerance
- Security awareness and tradeoff analysis
- Communication clarity

---

## Submission and Extra Instructions

- Start by forking this repo and doing your work in your forked copy
- The deadline mentioned at the top of this document is for part 1 of the assessment. You will present part 2 during the follow-up call, so it only needs to be ready by then
- When you're finished, send me a link to your fork via email (no need to submit a PR)
- If you have any questions, or if you need an extension, feel free to reach out on LinkedIn or email

Thank you! We look forward to reviewing your work.
