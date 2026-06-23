export interface HelpArticle {
  id: string;
  categoryId: string;
  title: string;
  excerpt?: string;
  content: string;
  steps?: {
    title: string;
    action: string;
    image?: string;
  }[];
  tags?: string[];
  isPopular?: boolean;
  readTime?: string;
}

export interface HelpCategory {
  id: string;
  title: string;
  description?: string;
}

export const helpCategories: HelpCategory[] = [
  { id: "risk-intelligence", title: "Secure your system operations" },
  { id: "getting-started", title: "Get started with the platform" },
  { id: "demo-module", title: "Explore the demo features" }
];

export const helpArticles: HelpArticle[] = [
  {
    id: "login-workflow",
    categoryId: "risk-intelligence",
    title: "Sign in securely into the Matrix vault",
    excerpt: "This document outlines the step-by-step process for securely logging into the Matrix vault.",
    content: "This document outlines the step-by-step process for securely logging into the Matrix vault. 1. Enter Email Address. 2. Enter Password. 3. Submit Credentials. 4. Two-Factor Authentication (OTP).",
    steps: [
      {
        title: "Enter Email Address",
        action: "On the login page, enter your registered email address into the Email field. *(Note: Credentials in screenshots are securely blurred).* ",
        image: "/images/login_01_email.png"
      },
      {
        title: "Enter Password",
        action: "Enter your secure password into the Password field.",
        image: "/images/login_02_password.png"
      },
      {
        title: "Submit Credentials",
        action: "Click the **Sign In / Verify** button to submit your credentials to the system.",
        image: "/images/login_03_submit.png"
      },
      {
        title: "Two-Factor Authentication (OTP)",
        action: "A 6-digit OTP code has been sent to your registered email. Check your inbox and enter the code into the verification field to complete the login process and access your dashboard."
      }
    ]
  },
  {
    id: "demo-submodule-1",
    categoryId: "demo-module",
    title: "View the first demo submodule",
    content: "This is a demo submodule without any steps."
  },
  {
    id: "demo-submodule-2",
    categoryId: "demo-module",
    title: "Check out the second demo submodule",
    content: "This is another demo submodule without any steps."
  }
];
