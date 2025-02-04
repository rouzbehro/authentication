# 🔐 Next.js 15 Custom Authentication Workflow  

This project is a **custom authentication workflow** built with **Next.js 15**, using **TypeScript, Prisma, Clerk Authentication, Tailwind CSS, and ShadCN UI**. It provides a seamless authentication experience with a clean, modern UI.

## 🚀 Features  

- **Next.js 15** – App Router-based authentication  
- **TypeScript** – Type-safe development  
- **Prisma** – Database ORM for user data storage  
- **Clerk Authentication** – Secure and customizable authentication  
- **Tailwind CSS** – Modern, utility-first styling  
- **ShadCN UI** – Beautiful, pre-styled components  
- **Full Authentication Flow**:
  - **Sign-in**
  - **Sign-up (SSO callback included)**
  - **Forgot Password**
  - **OTP Verification**
  - **Onboarding Flow**

## 📂 Folder Structure  

```
/app
  /dashboard             # User dashboard
  /(auth)               # Authentication-related pages
    /sign-up
      /sso-callback     # Handles social sign-up redirects
    /forgot-password    # Password recovery flow
    /sign-in            # Sign-in page
  /onboarding           # User onboarding flow

/components
  /ui                   # Reusable UI components (ShadCN)
  /form
    /shared             # Shared form utilities
    /fields             # Custom form fields
  /forms
    /forgotPassword     # Forgot password form
    /signUp            # Sign-up form
    /signIn            # Sign-in form
    /onboarding        # Onboarding form
  /auth                # Authentication-specific UI components
  /shared              # Shared reusable components

/hooks
  /auth                # Authentication hooks
  /onboarding          # Hooks for onboarding logic

/actions
  /user                # User-related API actions
  /helpers             # Helper functions

/context               # Context providers
/constants             # Global constants

/lib                   # Shared utility functions
/validation
  /schemas             # Zod validation schemas
/public                # Public assets (logos, images)
```

## 💡 About Me  

👋 Hi, I'm **Rouzbeh Roshanravan**, a **Lead Front-End Engineer** with over **10 years of experience** working with **startups and large corporations**.  

I have worked on **numerous projects**, leading **front-end development, optimizing performance, and improving user experience**. My expertise extends to **React, Next.js, TypeScript, and backend technologies like Node.js and Prisma**.  

Beyond development, I have **mentored engineers and taught students**, helping them grow in their careers. My passion lies in **data analytics, UX design, and understanding user behavior** to create intuitive and high-performing applications.  

### 🔹 My Expertise:
- **React.js, Next.js, React Native**
- **Performance Optimization & State Management (XState, Zustand)**
- **Backend Development with Node.js, Express.js, Prisma, MongoDB**
- **AWS Cloud Services & CI/CD Pipelines**
- **A/B Testing & UX/UI Enhancements**
- **Mentorship, Agile Methodology & Team Leadership**

📩 **Contact Me**:  
- **LinkedIn**: [linkedin.com/in/roshanravan](https://linkedin.com/in/roshanravan/)  

## 📜 License  

This project is licensed under the **MIT License**.
