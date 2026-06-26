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
  { id: "getting-started", title: "Get started with the platform" },
  { id: "user-management", title: "User Management" },
  { id: "profile-management", title: "Profile Management" },
  { id: "role-management", title: "Role Management" },
  { id: "risk-simulation", title: "Risk & Simulation" },
  { id: "workflows", title: "Workflows & Approvals" }
];

export const helpArticles: HelpArticle[] = [
  {
    "id": "login-workflow",
    "categoryId": "getting-started",
    "title": "Sign in securely into the Matrix vault",
    "excerpt": "This document outlines the step-by-step process for securely logging into the Matrix vault.",
    "content": "This document outlines the step-by-step process for securely logging into the Matrix vault. 1. Enter Email Address. 2. Enter Password. 3. Submit Credentials. 4. Two-Factor Authentication (OTP).",
    "steps": [
      {
        "title": "Enter Email Address",
        "action": "On the login page, enter your registered email address into the Email field. *(Note: Credentials in screenshots are securely blurred).* ",
        "image": "/images/auth/login_01_email.png"
      },
      {
        "title": "Enter Password",
        "action": "Enter your secure password into the Password field.",
        "image": "/images/auth/login_02_password.png"
      },
      {
        "title": "Submit Credentials",
        "action": "Click the **Sign In / Verify** button to submit your credentials to the system.",
        "image": "/images/auth/login_03_submit.png"
      },
      {
        "title": "Two-Factor Authentication (OTP)",
        "action": "A 6-digit OTP code has been sent to your registered email. Check your inbox and enter the code into the verification field to complete the login process and access your dashboard."
      }
    ]
  },
  {
    "id": "how-to-assign-profile-workflow",
    "categoryId": "profile-management",
    "title": "How to Assign Profile",
    "excerpt": "Step-by-step guide on how to how to assign profile.",
    "content": "This document outlines the step-by-step process for: How to Assign Profile.",
    "steps": [
      {
        "title": "Assign Profile",
        "action": "Go to Actions Tab and select \"Assign Profile\"",
        "image": "/images/workflows/How_to_Assign_Profile_Workflow/step1.png"
      },
      {
        "title": "Select user and profile",
        "action": "Select the user and profile, then perform an SoD analysis to validate compliance before submitting the profile assignment request.\n\nNote: Profiles can only be assigned after completing the SoD (Segregation of Duties) analysis, reviewing any detected violations, and acknowledging the associated risks and responsibilities.",
        "image": "/images/workflows/How_to_Assign_Profile_Workflow/step2_form.jpeg"
      }
    ]
  },
  {
    "id": "how-to-assign-role-manager-workflow",
    "categoryId": "role-management",
    "title": "How to Assign Role Manager",
    "excerpt": "Step-by-step guide on how to how to assign role manager.",
    "content": "This document outlines the step-by-step process for: How to Assign Role Manager.",
    "steps": [
      {
        "title": "Review role information",
        "action": "Open the role details page and review the role information, users, and authorization details.",
        "image": "/images/workflows/How_to_Assign_Role_Manager_Workflow/step1.png"
      },
      {
        "title": "Assign Manager",
        "action": "In the Role Managers section, click Assign Manager.",
        "image": "/images/workflows/How_to_Assign_Role_Manager_Workflow/step2.png"
      },
      {
        "title": "Select Role Manager",
        "action": "Search for and select the user to be assigned as the Role Manager."
      },
      {
        "title": "Enable Escalation Approver",
        "action": "(Optional) Enable Set as Escalation Approver if the manager should handle escalated approval requests.",
        "image": "/images/workflows/How_to_Assign_Role_Manager_Workflow/step3.png"
      },
      {
        "title": "Save assignment",
        "action": "Click Assign to save the Role Manager assignment.",
        "image": "/images/workflows/How_to_Assign_Role_Manager_Workflow/step4.png"
      }
    ]
  },
  {
    "id": "how-to-assign-roles-in-roles-tab-workflow",
    "categoryId": "role-management",
    "title": "How to Assign Roles in \"Roles\" Tab",
    "excerpt": "Step-by-step guide on how to how to assign roles in \"roles\" tab.",
    "content": "This document outlines the step-by-step process for: How to Assign Roles in \"Roles\" Tab.",
    "steps": [
      {
        "title": "Click Assign in Roles tab",
        "action": "In Roles tab Click \"Assign\"",
        "image": "/images/workflows/How_to_Assign_Roles_in_Roles_Tab_Workflow/step1.png"
      },
      {
        "title": "Assign SAP roles to user",
        "action": "Assign SAP roles to a user by selecting the user, choosing required roles, defining validity dates, performing SoD analysis, and providing business justification.\n\nSoD (Segregation of Duties) Analysis detects potential access conflicts and compliance risks before role assignment. Roles can be assigned only after all identified violations are reviewed, acknowledged, and justified, ensuring secure and compliant access provisioning.",
        "image": "/images/workflows/How_to_Assign_Roles_in_Roles_Tab_Workflow/step2a.png"
      }
    ]
  },
  {
    "id": "how-to-assign-roles-workflow",
    "categoryId": "role-management",
    "title": "How to Assign Roles",
    "excerpt": "Step-by-step guide on how to how to assign roles.",
    "content": "This document outlines the step-by-step process for: How to Assign Roles.",
    "steps": [
      {
        "title": "Select Assign Role",
        "action": "Go to Actions Tab and select \"Assign Role\"",
        "image": "/images/workflows/How_to_Assign_Roles_Workflow/step1.png"
      },
      {
        "title": "Assign SAP roles to user",
        "action": "Assign SAP roles to a user by selecting the user, choosing required roles, defining validity dates, performing SoD analysis, and providing business justification.\n\nSoD (Segregation of Duties) Analysis detects potential access conflicts and compliance risks before role assignment. Roles can be assigned only after all identified violations are reviewed, acknowledged, and justified, ensuring secure and compliant access provisioning.",
        "image": "/images/workflows/How_to_Assign_Roles_Workflow/step2a.png"
      }
    ]
  },
  {
    "id": "how-to-compare-roles-and-analyze-risk-workflow",
    "categoryId": "risk-simulation",
    "title": "How to Compare Roles and Analyze Risk",
    "excerpt": "Step-by-step guide on how to how to compare roles and analyze risk.",
    "content": "This document outlines the step-by-step process for: How to Compare Roles and Analyze Risk.",
    "steps": [
      {
        "title": "Start new comparison",
        "action": "Navigate to Access Control \u2192 Role Lens and click Start New Comparison.",
        "image": "/images/workflows/How_to_Compare_Roles_and_Analyze_Risk_Workflow/step1a.png"
      },
      {
        "title": "Select roles to compare",
        "action": "Search for and select 2\u20134 SAP roles to compare, then click Compare Roles.",
        "image": "/images/workflows/How_to_Compare_Roles_and_Analyze_Risk_Workflow/step2.png"
      },
      {
        "title": "Review comparison results",
        "action": "Review the comparison results, including T-Code overlap, Authorization Objects, and Permissions across the selected roles.",
        "image": "/images/workflows/How_to_Compare_Roles_and_Analyze_Risk_Workflow/step3.png"
      }
    ]
  },
  {
    "id": "how-to-create-users-workflow",
    "categoryId": "user-management",
    "title": "How to Create Users",
    "excerpt": "Step-by-step guide on how to how to create users.",
    "content": "This document outlines the step-by-step process for: How to Create Users.",
    "steps": [
      {
        "title": "Navigate to Access Control",
        "action": "Navigate to Access Control",
        "image": "/images/workflows/How_to_Create_Users_Workflow/step1.png"
      },
      {
        "title": "Select Users tab",
        "action": "Select the \"Users\" tab",
        "image": "/images/workflows/How_to_Create_Users_Workflow/step2.png"
      },
      {
        "title": "Select Add User",
        "action": "Go to Actions Tab and Select \"Add User\"",
        "image": "/images/workflows/How_to_Create_Users_Workflow/step3.png"
      },
      {
        "title": "Fill in user details",
        "action": "Fill in SAP user details, assign roles/profiles, and configure account settings to create a new user.",
        "image": "/images/workflows/How_to_Create_Users_Workflow/step4.png"
      }
    ]
  },
  {
    "id": "how-to-revoke-profile-workflow",
    "categoryId": "profile-management",
    "title": "How to Revoke Profile",
    "excerpt": "Step-by-step guide on how to how to revoke profile.",
    "content": "This document outlines the step-by-step process for: How to Revoke Profile.",
    "steps": [
      {
        "title": "Select Revoke Profile",
        "action": "Go to Actions Tab and select \"Revoke Profile\"",
        "image": "/images/workflows/How_to_Revoke_Profile_Workflow/step1.png"
      },
      {
        "title": "Select User",
        "action": "Select the user, choose the profile(s) to remove, provide a valid business justification, and submit the profile removal request for approval.",
        "image": "/images/workflows/How_to_Revoke_Profile_Workflow/step2.png"
      }
    ]
  },
  {
    "id": "how-to-revoke-roles-in-roles-tab-workflow",
    "categoryId": "role-management",
    "title": "How to Revoke Roles in \"Roles\" Tab",
    "excerpt": "Step-by-step guide on how to how to revoke roles in \"roles\" tab.",
    "content": "This document outlines the step-by-step process for: How to Revoke Roles in \"Roles\" Tab.",
    "steps": [
      {
        "title": "Click Revoke in Roles tab",
        "action": "In Roles tab Click \"Revoke\"",
        "image": "/images/workflows/How_to_Revoke_Roles_in_Roles_Tab_Workflow/step1.png"
      },
      {
        "title": "Select user and role to revoke",
        "action": "Select the user and role to be revoked, then provide a business justification to submit the role removal request for approval and processing.",
        "image": "/images/workflows/How_to_Revoke_Roles_in_Roles_Tab_Workflow/step2.png"
      }
    ]
  },
  {
    "id": "how-to-revoke-roles-workflow",
    "categoryId": "role-management",
    "title": "How to Revoke Roles",
    "excerpt": "Step-by-step guide on how to how to revoke roles.",
    "content": "This document outlines the step-by-step process for: How to Revoke Roles.",
    "steps": [
      {
        "title": "Select Revoke Role",
        "action": "Go to Actions Tab and select \"Revoke Role\"",
        "image": "/images/workflows/How_to_Revoke_Roles_Workflow/step1.png"
      },
      {
        "title": "Select user and role to revoke",
        "action": "Select the user and role to be revoked, then provide a business justification to submit the role removal request for approval and processing.",
        "image": "/images/workflows/How_to_Revoke_Roles_Workflow/step2.png"
      }
    ]
  },
  {
    "id": "how-to-simulate-role-changes-analyze-risks-workflow",
    "categoryId": "risk-simulation",
    "title": "How to Simulate Role Changes & Analyze Risks",
    "excerpt": "Step-by-step guide on how to how to simulate role changes & analyze risks.",
    "content": "This document outlines the step-by-step process for: How to Simulate Role Changes & Analyze Risks.",
    "steps": [
      {
        "title": "Select target user",
        "action": "Open Role Simulator and select the target user."
      },
      {
        "title": "Add or remove roles",
        "action": "Add or remove roles to create the proposed access scenario.",
        "image": "/images/workflows/How_to_Simulate_Role_Changes_Analyze_Risks_Workflow/step1.png"
      },
      {
        "title": "Run simulation",
        "action": "Click Run Simulation to evaluate access and SoD impact.",
        "image": "/images/workflows/How_to_Simulate_Role_Changes_Analyze_Risks_Workflow/step2.png"
      },
      {
        "title": "Review risk score",
        "action": "Review the risk score, new violations, and resolved violations.",
        "image": "/images/workflows/How_to_Simulate_Role_Changes_Analyze_Risks_Workflow/step3a.png"
      }
    ]
  }
,

  {
    id: 'workflow-8',
    title: 'How to Access and Manage My Requests',
    excerpt: 'Follow these steps to access and manage your requests.',
    content: 'How to Access and Manage My Requests',
    categoryId: 'workflows',
    readTime: '3 min read',
    tags: ['Workflow', 'Matrx Vault'],
    steps: [
      {
        title: "Navigate to My Requests",
        action: `Click **Workflow** from the top navigation menu, then select **My Requests** from the dropdown list.`,
        image: "/images/workflows/Steps_to_Access_and_Manage_My_Requests/imagec.png"
      },
      {
        title: "View Requests",
        action: `View your requests under the **All**, **Pending**, **Approved**, or **Rejected** tabs to filter by status.`,
        image: "/images/workflows/Steps_to_Access_and_Manage_My_Requests/image6.png"
      },
      {
        title: "Refine and Search",
        action: `Use the **Search** field to find a specific request. Click **Filter** to select date ranges to refine the request list. You can view the details, workflow status, access window, AI Risk Assessment score, and risk level.`,
        image: "/images/workflows/Steps_to_Access_and_Manage_My_Requests/image8.png"
      },
      {
        title: "View Sessions",
        action: `Click **Sessions** to view the details of an active firefighter session.`,
        image: "/images/workflows/Steps_to_Access_and_Manage_My_Requests/image9.png"
      },
      {
        title: "View Logs",
        action: `Click **Logs** to view the recorded activity of the selected request.`,
        image: "/images/workflows/Steps_to_Access_and_Manage_My_Requests/image5.png"
      },
      {
        title: "Review SAP Logs",
        action: `The SAP LOGS provides a consolidated view of system logs and user activities with filtering and severity tracking options.`,
        image: "/images/workflows/Steps_to_Access_and_Manage_My_Requests/image7.png"
      },
      {
        title: "View Request Details",
        action: `Click **Details** to view the complete information and workflow status of the selected request.`,
        image: "/images/workflows/Steps_to_Access_and_Manage_My_Requests/imaged.png"
      },
      {
        title: "Check Approval History",
        action: `The Request Details panel displays request information, current status, and the complete approval history.`,
        image: "/images/workflows/Steps_to_Access_and_Manage_My_Requests/imagef.png"
      }
    ]
  },
  {
    id: 'workflow-9',
    title: 'How to Check and Review Request Approvals',
    excerpt: 'Follow these steps to check and review request approvals.',
    content: 'How to Check and Review Request Approvals',
    categoryId: 'workflows',
    readTime: '3 min read',
    tags: ['Workflow', 'Matrx Vault'],
    steps: [
      {
        title: "Navigate to Approvals",
        action: `From the top navigation menu, click **Workflow**, then select **Approvals** from the dropdown menu.`,
        image: "/images/workflows/Steps_to_check_and_review_the_Approval_of_the_requests/image10.png"
      },
      {
        title: "Review Requests",
        action: `Review the list of requests displayed on the Approvals page. Use the status tabs (All, Pending, Approved, Rejected, or Sign Off) to narrow down the requests if required. Identify the request you want to review and click the **Details** button.`,
        image: "/images/workflows/Steps_to_check_and_review_the_Approval_of_the_requests/image11.png"
      },
      {
        title: "View Request Details",
        action: `The Request Details panel opens, displaying complete request information for your review.`,
        image: "/images/workflows/Steps_to_check_and_review_the_Approval_of_the_requests/image12.png"
      }
    ]
  },
  {
    id: 'workflow-10',
    title: 'How to Configure High-Level Approvers',
    excerpt: 'Follow these steps to configure high-level approvers.',
    content: 'How to Configure High-Level Approvers',
    categoryId: 'workflows',
    readTime: '3 min read',
    tags: ['Workflow', 'Matrx Vault'],
    steps: [
      {
        title: "Navigate to High-Level Approvers",
        action: `From the top navigation menu, click **Workflow**, then select **High Level Approvers** from the Configuration section.`,
        image: "/images/workflows/Steps_to_Configure_High_Level_Approvers/image17.png"
      },
      {
        title: "Add a New Approver",
        action: `Click **Add Approver** in the upper-right corner of the page.`,
        image: "/images/workflows/Steps_to_Configure_High_Level_Approvers/image18.png"
      },
      {
        title: "Fill Details and Save",
        action: `Fill in all the requested High Level Approver details, then click **Add Approver** to save the configuration.`,
        image: "/images/workflows/Steps_to_Configure_High_Level_Approvers/image19.png"
      }
    ]
  },
  {
    id: 'workflow-11',
    title: 'How to Configure Sign-Off Escalations',
    excerpt: 'Follow these steps to configure sign-off escalations.',
    content: 'How to Configure Sign-Off Escalations',
    categoryId: 'workflows',
    readTime: '4 min read',
    tags: ['Workflow', 'Matrx Vault'],
    steps: [
      {
        title: "Navigate to Sign-Off Escalations",
        action: `From the top navigation menu, click **Workflow**, then select **Sign-Off Escalations** from the dropdown menu.`,
        image: "/images/workflows/Steps_to_Configure_Sign_Off_Escalations/image1a.png"
      },
      {
        title: "Add the First Escalation Level",
        action: `In the Systems panel on the left, select the required SAP system. Then, click **Add First Level** in the center of the page.`,
        image: "/images/workflows/Steps_to_Configure_Sign_Off_Escalations/image1b.png"
      },
      {
        title: "Add Escalation Details",
        action: `Fill in all the required details for the Escalation. You can also add another Escalation level if needed.`,
        image: "/images/workflows/Steps_to_Configure_Sign_Off_Escalations/image1c.png"
      },
      {
        title: "Save Configuration",
        action: `After completing all escalation levels, click on the **Save** icon located in the upper-right corner of the page.`,
        image: "/images/workflows/Steps_to_Configure_Sign_Off_Escalations/image1d.png"
      }
    ]
  },
  {
    id: 'workflow-12',
    title: 'How to Create a New Request',
    excerpt: 'Follow these steps to create a new request.',
    content: 'How to Create a New Request',
    categoryId: 'workflows',
    readTime: '3 min read',
    tags: ['Workflow', 'Matrx Vault'],
    steps: [
      {
        title: "Navigate to New Request",
        action: `Click **Workflow** from the top navigation menu, then select **New Request** from the dropdown list.`,
        image: "/images/workflows/Steps_to_Create_a_New_Request/imageb.png"
      },
      {
        title: "Enter Request Details",
        action: `Enter the required request details into the provided fields.`,
        image: "/images/workflows/Steps_to_Create_a_New_Request/image3.png"
      },
      {
        title: "Submit Request",
        action: `Click **Submit Request** to create the request.`
      }
    ]
  },
  {
    id: 'workflow-13',
    title: 'How to View and Manage Active Sessions',
    excerpt: 'Follow these steps to view and manage active sessions.',
    content: 'How to View and Manage Active Sessions',
    categoryId: 'workflows',
    readTime: '3 min read',
    tags: ['Workflow', 'Matrx Vault'],
    steps: [
      {
        title: "Navigate to the Sessions Page",
        action: `From the top navigation menu, click **Workflow**, then select **Sessions** from the dropdown menu.`,
        image: "/images/workflows/Steps_to_View_and_Manage_Active_Sessions/image15.png"
      },
      {
        title: "Review and Revoke Sessions",
        action: `Select the **Active** tab to view currently active firefighter sessions. Expand the required system to view active users and session details. To terminate a session, locate it and click **Revoke Session**.`,
        image: "/images/workflows/Steps_to_View_and_Manage_Active_Sessions/image16.png"
      },
      {
        title: "Refresh Session Information",
        action: `Click the **Refresh** icon on the Sessions page to retrieve the latest session data.`
      }
    ]
  },
  {
    id: 'workflow-14',
    title: 'How to View Escalation Approvals',
    excerpt: 'Follow these steps to view the escalation approvals.',
    content: 'How to View Escalation Approvals',
    categoryId: 'workflows',
    readTime: '3 min read',
    tags: ['Workflow', 'Matrx Vault'],
    steps: [
      {
        title: "Navigate to Escalation Approvals",
        action: `From the top navigation menu, click **Workflow**, then select **Escalation Approvals** from the dropdown menu.`,
        image: "/images/workflows/Steps_to_view_the_Escalation_Approvals/image13.png"
      },
      {
        title: "Review Escalation Requests",
        action: `On the Escalation Approvals page, review the list of escalated requests assigned to your scope. Check the request details and approval status before taking action.`,
        image: "/images/workflows/Steps_to_view_the_Escalation_Approvals/image14.png"
      },
      {
        title: "Verify Scope and Refresh Data",
        action: `Review the **My Escalation Rights** section to confirm your assigned escalation scope. If no scope is assigned, contact your system administrator for access. Click **Refresh** to retrieve the latest escalation requests and status updates.`
      }
    ]
  }
];
