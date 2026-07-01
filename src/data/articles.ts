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
  { id: "workflows", title: "Workflows & Approvals" },
  { id: "firefighter-access", title: "Firefighter Access" },
  { id: "audit-logs", title: "Audit & Logs" },
  { id: "sox-compliance", title: "SOX Compliance" },
  { id: "sap-systems", title: "SAP Systems" }
];

export const helpArticles: HelpArticle[] = [
  {
    "id": "login",
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
        "title": "Two-Factor Authentication (Otp)",
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
        "title": "Select User And Profile",
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
        "title": "Review Role Information",
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
        "title": "Save Assignment",
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
        "title": "Click Assign In Roles Tab",
        "action": "In Roles tab Click \"Assign\"",
        "image": "/images/workflows/How_to_Assign_Roles_in_Roles_Tab_Workflow/step1.png"
      },
      {
        "title": "Assign Sap Roles To User",
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
        "title": "Assign Sap Roles To User",
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
        "title": "Start New Comparison",
        "action": "Navigate to Access Control \u2192 Role Lens and click Start New Comparison.",
        "image": "/images/workflows/How_to_Compare_Roles_and_Analyze_Risk_Workflow/step1a.png"
      },
      {
        "title": "Select Roles To Compare",
        "action": "Search for and select 2\u20134 SAP roles to compare, then click Compare Roles.",
        "image": "/images/workflows/How_to_Compare_Roles_and_Analyze_Risk_Workflow/step2.png"
      },
      {
        "title": "Review Comparison Results",
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
        "title": "Navigate To Access Control",
        "action": "Navigate to Access Control",
        "image": "/images/workflows/How_to_Create_Users_Workflow/step1.png"
      },
      {
        "title": "Select Users Tab",
        "action": "Select the \"Users\" tab",
        "image": "/images/workflows/How_to_Create_Users_Workflow/step2.png"
      },
      {
        "title": "Select Add User",
        "action": "Go to Actions Tab and Select \"Add User\"",
        "image": "/images/workflows/How_to_Create_Users_Workflow/step3.png"
      },
      {
        "title": "Fill In User Details",
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
        "title": "Click Revoke In Roles Tab",
        "action": "In Roles tab Click \"Revoke\"",
        "image": "/images/workflows/How_to_Revoke_Roles_in_Roles_Tab_Workflow/step1.png"
      },
      {
        "title": "Select User And Role To Revoke",
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
        "title": "Select User And Role To Revoke",
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
        "title": "Select Target User",
        "action": "Open Role Simulator and select the target user."
      },
      {
        "title": "Add Or Remove Roles",
        "action": "Add or remove roles to create the proposed access scenario.",
        "image": "/images/workflows/How_to_Simulate_Role_Changes_Analyze_Risks_Workflow/step1.png"
      },
      {
        "title": "Run Simulation",
        "action": "Click Run Simulation to evaluate access and SoD impact.",
        "image": "/images/workflows/How_to_Simulate_Role_Changes_Analyze_Risks_Workflow/step2.png"
      },
      {
        "title": "Review Risk Score",
        "action": "Review the risk score, new violations, and resolved violations.",
        "image": "/images/workflows/How_to_Simulate_Role_Changes_Analyze_Risks_Workflow/step3a.png"
      }
    ]
  }
,

  {
    id: 'how-to-access-and-manage-my-requests',
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
    id: 'how-to-check-and-review-request-approvals',
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
    id: 'how-to-configure-high-level-approvers',
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
    id: 'how-to-configure-sign-off-escalations',
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
    id: 'how-to-create-a-new-request',
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
    id: 'how-to-view-and-manage-active-sessions',
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
    id: 'how-to-view-escalation-approvals',
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
,
{
    "id": "11-how-to-create-a-new-firefighter-access-request-workflow",
    "categoryId": "firefighter-access",
    "title": "How To Create A New Firefighter Access Request",
    "excerpt": "Step-by-step guide on how to how to create a new firefighter access request.",
    "content": "This document outlines the step-by-step process for: How To Create A New Firefighter Access Request.",
    "steps": [
      {
        "title": "Click Workflow From The Top",
        "action": "Click Workflow from the top navigation menu and Select New Request.",
        "image": "/images/workflows/11_How_To_Create_A_New_Firefighter_Access_Request_Workflow/step1.png"
      },
      {
        "title": "Select The Target System",
        "action": "Select the Target System, Module, Firefighter ID, and other required details to create the request.",
        "image": "/images/workflows/11_How_To_Create_A_New_Firefighter_Access_Request_Workflow/step2.png"
      },
      {
        "title": "Check The Request Summary",
        "action": "Check the Request Summary and Click Submit Request to submit the request for approval.",
        "image": "/images/workflows/11_How_To_Create_A_New_Firefighter_Access_Request_Workflow/step3.png"
      }
    ]
  },
  {
    "id": "12-how-to-track-manage-your-firefighter-access-requests-workflow",
    "categoryId": "firefighter-access",
    "title": "How To Track & Manage Your Firefighter Access Requests",
    "excerpt": "Step-by-step guide on how to how to track & manage your firefighter access requests.",
    "content": "This document outlines the step-by-step process for: How To Track & Manage Your Firefighter Access Requests.",
    "steps": [
      {
        "title": "Click Workflow From The Top",
        "action": "Click Workflow from the top navigation menu and Select My Requests.",
        "image": "/images/workflows/12_How_To_Track_Manage_Your_Firefighter_Access_Requests_Workflow/step1.png"
      },
      {
        "title": "Here You Can Manage",
        "action": "Here You can manage and track the status of the firefighter access request also view the AI risk assessment score.",
        "image": "/images/workflows/12_How_To_Track_Manage_Your_Firefighter_Access_Requests_Workflow/step2.png"
      }
    ]
  },
  {
    "id": "13-how-to-view-the-sap-logs-of-the-request-workflow",
    "categoryId": "firefighter-access",
    "title": "How To View The Sap Logs Of The Request",
    "excerpt": "Step-by-step guide on how to how to view the sap logs of the request.",
    "content": "This document outlines the step-by-step process for: How To View The Sap Logs Of The Request.",
    "steps": [
      {
        "title": "Click Workflow From The Top",
        "action": "Click Workflow from the top navigation menu and Select My Requests.",
        "image": "/images/workflows/13_How_To_View_The_Sap_Logs_Of_The_Request_Workflow/step1.png"
      },
      {
        "title": "Click On The Logs",
        "action": "Click on the Logs button near the right corner of the My Requests page.",
        "image": "/images/workflows/13_How_To_View_The_Sap_Logs_Of_The_Request_Workflow/step2.png"
      },
      {
        "title": "The Sap Logs Provides",
        "action": "The SAP LOGS provides a consolidated view of system logs and user activities with filtering and severity tracking options.",
        "image": "/images/workflows/13_How_To_View_The_Sap_Logs_Of_The_Request_Workflow/step3.png"
      }
    ]
  },
  {
    "id": "14-how-to-view-the-request-approval-workflow",
    "categoryId": "firefighter-access",
    "title": "How To View The Request Approval",
    "excerpt": "Step-by-step guide on how to how to view the request approval.",
    "content": "This document outlines the step-by-step process for: How To View The Request Approval.",
    "steps": [
      {
        "title": "Click Workflow From The Top",
        "action": "Click Workflow from the top navigation menu and Select Approvals.",
        "image": "/images/workflows/14_How_To_View_The_Request_Approval_Workflow/step1.png"
      },
      {
        "title": "Here You Can Review",
        "action": "Here you can Review firefighter access requests, track approval status, view AI Risk Assessment results, and access request details.",
        "image": "/images/workflows/14_How_To_View_The_Request_Approval_Workflow/step2.png"
      }
    ]
  },
  {
    "id": "15-how-to-view-and-manage-the-active-firefighter-session-workflow",
    "categoryId": "firefighter-access",
    "title": "How To View And Manage The Active Firefighter Session",
    "excerpt": "Step-by-step guide on how to how to view and manage the active firefighter session.",
    "content": "This document outlines the step-by-step process for: How To View And Manage The Active Firefighter Session.",
    "steps": [
      {
        "title": "Click Workflow From The Top",
        "action": "Click Workflow from the top navigation menu and select Sessions.",
        "image": "/images/workflows/15_How_To_View_And_Manage_The_Active_Firefighter_Session_Workflow/step1.png"
      },
      {
        "title": "The Sessions Page Is",
        "action": "The Sessions page is used to monitor and manage the Firefighter sessions across configured SAP system.",
        "image": "/images/workflows/15_How_To_View_And_Manage_The_Active_Firefighter_Session_Workflow/step2.png"
      },
      {
        "title": "Locate The Active Session",
        "action": "Locate the active session that needs to be terminated. Click Revoke Session to terminate.",
        "image": "/images/workflows/15_How_To_View_And_Manage_The_Active_Firefighter_Session_Workflow/step3.png"
      }
    ]
  },
  {
    "id": "16-how-to-add-the-high-level-approver-workflow",
    "categoryId": "firefighter-access",
    "title": "How To Add The High-Level Approver",
    "excerpt": "Step-by-step guide on how to how to add the high-level approver.",
    "content": "This document outlines the step-by-step process for: How To Add The High-Level Approver.",
    "steps": [
      {
        "title": "Click Workflow From The Top",
        "action": "Click Workflow from the top navigation menu and Select High Level Approvers.",
        "image": "/images/workflows/16_How_To_Add_The_High_Level_Approver_Workflow/step1.png"
      },
      {
        "title": "Click Add Approver In The Top",
        "action": "Click Add Approver in the top right corner of the page.",
        "image": "/images/workflows/16_How_To_Add_The_High_Level_Approver_Workflow/step2.png"
      },
      {
        "title": "Select The Approver, Scope",
        "action": "Select the approver, Scope of authority, time limit and click Add Approver button at the bottom right corner to add the approver.",
        "image": "/images/workflows/16_How_To_Add_The_High_Level_Approver_Workflow/step3.png"
      }
    ]
  },
  {
    "id": "17-how-to-add-the-sign-off-escalation-workflow",
    "categoryId": "firefighter-access",
    "title": "How To Add The Sign Off Escalation",
    "excerpt": "Step-by-step guide on how to how to add the sign off escalation.",
    "content": "This document outlines the step-by-step process for: How To Add The Sign Off Escalation.",
    "steps": [
      {
        "title": "Click Workflow From The Top",
        "action": "Click Workflow from the top navigation menu and Select Sign-off Escalations.",
        "image": "/images/workflows/17_How_To_Add_The_Sign_Off_Escalation_Workflow/step1.png"
      },
      {
        "title": "In The Systems Panel",
        "action": "In the Systems panel on the left, select the required SAP system and then Click Add First Level in the center of the page.",
        "image": "/images/workflows/17_How_To_Add_The_Sign_Off_Escalation_Workflow/step2.png"
      },
      {
        "title": "Fill All The Details",
        "action": "Fill All the details required for the Escalation. You can also add another Escalation level if needed.",
        "image": "/images/workflows/17_How_To_Add_The_Sign_Off_Escalation_Workflow/step3.png"
      },
      {
        "title": "After Completing All Escalation",
        "action": "After completing all escalation levels, click on the Save icon located in the top right corner of the page.",
        "image": "/images/workflows/17_How_To_Add_The_Sign_Off_Escalation_Workflow/step4.png"
      }
    ]
  },
  {
    "id": "18-how-to-view-the-stored-audit-logs-workflow",
    "categoryId": "audit-logs",
    "title": "How To View The Stored Audit Logs",
    "excerpt": "Step-by-step guide on how to how to view the stored audit logs.",
    "content": "This document outlines the step-by-step process for: How To View The Stored Audit Logs.",
    "steps": [
      {
        "title": "Navigate To Stored Audit",
        "action": "Navigate to Stored Audit Logs Click on Analytics and Select Stored Audit Logs.",
        "image": "/images/workflows/18_How_To_View_The_Stored_Audit_Logs_Workflow/step1.png"
      },
      {
        "title": "Review Audit Logs View",
        "action": "Review Audit Logs View SAP audit log entries and event details.",
        "image": "/images/workflows/18_How_To_View_The_Stored_Audit_Logs_Workflow/step2.png"
      },
      {
        "title": "Filter The Log Data",
        "action": "Filter the Log data Use the available filters to refine log results. Step 4: Analyze Log Information Review user activities, event messages, and audit records."
      }
    ]
  },
  {
    "id": "19-how-to-view-the-audit-workspace-workflow",
    "categoryId": "audit-logs",
    "title": "How To View The Audit Workspace",
    "excerpt": "Step-by-step guide on how to how to view the audit workspace.",
    "content": "This document outlines the step-by-step process for: How To View The Audit Workspace.",
    "steps": [
      {
        "title": "Navigate To Audit Workspace",
        "action": ". Navigate to Audit Workspace Click on Analytics. Select the Audit Workspace.",
        "image": "/images/workflows/19_How_To_View_The_Audit_Workspace_Workflow/step1.png"
      },
      {
        "title": "Select A Request Choose",
        "action": ". Select a Request Choose a request from the request list to view its audit information.",
        "image": "/images/workflows/19_How_To_View_The_Audit_Workspace_Workflow/step2.png"
      },
      {
        "title": "Review Request Details View",
        "action": ". Review Request Details View access identity, request information, approval status, and access window. Step 4. Review AI Risk Assessment Analyze the AI-generated risk score, summary, and transactions used. Step 5. Review Audit Information Use the Timeline, Approval Trail, SAP Logs, and Notes tabs to review audit-related details."
      }
    ]
  },
  {
    "id": "20-how-to-view-the-audit-logs-workflow",
    "categoryId": "audit-logs",
    "title": "How To View The Audit Logs",
    "excerpt": "Step-by-step guide on how to how to view the audit logs.",
    "content": "This document outlines the step-by-step process for: How To View The Audit Logs.",
    "steps": [
      {
        "title": "Navigate To Audit Logs",
        "action": "Navigate to Audit Logs Click on Analytics. Select the Audit Logs.",
        "image": "/images/workflows/20_How_To_View_The_Audit_Logs_Workflow/step1.png"
      },
      {
        "title": "View Audit Log Entries",
        "action": "View Audit Log Entries Review the audit log list to see recorded activities like Timestamp, Application, Module, etc.",
        "image": "/images/workflows/20_How_To_View_The_Audit_Logs_Workflow/step2.png"
      },
      {
        "title": "View Audit Log Details",
        "action": "View Audit Log Details Click a log entry to open the Audit Log Detail panel",
        "image": "/images/workflows/20_How_To_View_The_Audit_Logs_Workflow/step3.png"
      }
    ]
  },
  {
    "id": "21-how-to-view-the-sox-compliance-dashboard-workflow",
    "categoryId": "sox-compliance",
    "title": "How To View The Sox Compliance Dashboard",
    "excerpt": "Step-by-step guide on how to how to view the sox compliance dashboard.",
    "content": "This document outlines the step-by-step process for: How To View The Sox Compliance Dashboard.",
    "steps": [
      {
        "title": "Navigate To The Sox",
        "action": "Navigate to the SOX Compliance Dashboard Click Analytics and Select the SOX Compliance.",
        "image": "/images/workflows/21_How_To_View_The_Sox_Compliance_Dashboard_Workflow/step1.png"
      },
      {
        "title": "Review Compliance Information Review",
        "action": "Review Compliance Information Review the compliance summary displayed on the dashboard. Scroll down to view risk findings, user violations, compliance coverage, firefighter activities, and audit information.",
        "image": "/images/workflows/21_How_To_View_The_Sox_Compliance_Dashboard_Workflow/step2.png"
      }
    ]
  },
  {
    "id": "22-how-to-generate-sox-compliance-report-workflow",
    "categoryId": "sox-compliance",
    "title": "How To Generate Sox Compliance Report",
    "excerpt": "Step-by-step guide on how to how to generate sox compliance report.",
    "content": "This document outlines the step-by-step process for: How To Generate Sox Compliance Report.",
    "steps": [
      {
        "title": "Navigate To The Sox",
        "action": "Navigate to the SOX Compliance Click Analytics and Select the SOX Compliance.",
        "image": "/images/workflows/22_How_To_Generate_Sox_Compliance_Report_Workflow/step1.png"
      },
      {
        "title": "Click On Generate Click",
        "action": "Click on Generate Click the Generate Button on the top right corner.",
        "image": "/images/workflows/22_How_To_Generate_Sox_Compliance_Report_Workflow/step2.png"
      },
      {
        "title": "Click Generate Now Select",
        "action": "Click Generate Now Select the SAP System and all the required details. Click Generate Now.",
        "image": "/images/workflows/22_How_To_Generate_Sox_Compliance_Report_Workflow/step3.png"
      },
      {
        "title": "The Sox Compliance Report",
        "action": "The SOX Compliance Report is generated and delivered according to the selected options."
      }
    ]
  },
  {
    "id": "23-how-to-create-a-scheduled-sox-compliance-report-workflow",
    "categoryId": "sox-compliance",
    "title": "How To Create A Scheduled Sox Compliance Report",
    "excerpt": "Step-by-step guide on how to how to create a scheduled sox compliance report.",
    "content": "This document outlines the step-by-step process for: How To Create A Scheduled Sox Compliance Report.",
    "steps": [
      {
        "title": "Navigate To The Sox",
        "action": "Navigate to the SOX Compliance Click Analytics and Select the SOX Compliance.",
        "image": "/images/workflows/23_How_To_Create_A_Scheduled_Sox_Compliance_Report_Workflow/step1.png"
      },
      {
        "title": "Open Schedule Configuration Click",
        "action": "Open Schedule Configuration Click Schedules & History. In the top right corner, click the New Schedule to open the schedule configuration window.",
        "image": "/images/workflows/23_How_To_Create_A_Scheduled_Sox_Compliance_Report_Workflow/step2.png"
      },
      {
        "title": "Configure Schedule Details Enter",
        "action": "Configure Schedule Details Enter the schedule name. Select the SAP system and report frequency. Configure the execution time and delivery of preferences.",
        "image": "/images/workflows/23_How_To_Create_A_Scheduled_Sox_Compliance_Report_Workflow/step3.png"
      },
      {
        "title": "Create The Schedule Click",
        "action": "Create the Schedule Click Create Schedule."
      }
    ]
  },
  {
    "id": "24-view-reports-analytics-dashboard-workflow",
    "categoryId": "sox-compliance",
    "title": "View Reports & Analytics Dashboard",
    "excerpt": "Step-by-step guide on how to view reports & analytics dashboard.",
    "content": "This document outlines the step-by-step process for: View Reports & Analytics Dashboard.",
    "steps": [
      {
        "title": "Open The Reports",
        "action": "Open the Reports & Analytics Page Navigate to Analytics and select the Report.",
        "image": "/images/workflows/24_View_Reports_Analytics_Dashboard_Workflow/step1.png"
      },
      {
        "title": "Generate A Report Locate",
        "action": "Generate a Report Locate the required report from the available report cards. Click Generate.",
        "image": "/images/workflows/24_View_Reports_Analytics_Dashboard_Workflow/step2.png"
      },
      {
        "title": "Enter The Details",
        "action": "Enter the details. Select the required SAP System, Preferred dates, and all the other required details to generate the Report. Now Click the Generate Report at the bottom right Corner.",
        "image": "/images/workflows/24_View_Reports_Analytics_Dashboard_Workflow/step3.png"
      },
      {
        "title": "Export A Report Click",
        "action": "Export a Report Click the Export CSV on the required report to download the Required Report.",
        "image": "/images/workflows/24_View_Reports_Analytics_Dashboard_Workflow/step4.png"
      }
    ]
  },
  {
    "id": "25-how-to-view-the-sap-system-details-workflow",
    "categoryId": "sap-systems",
    "title": "How To View The Sap System Details",
    "excerpt": "Step-by-step guide on how to how to view the sap system details.",
    "content": "This document outlines the step-by-step process for: How To View The Sap System Details.",
    "steps": [
      {
        "title": "Navigate To The Sap",
        "action": "Navigate to the SAP Systems Page Navigate to Operations and Select SAP Systems.",
        "image": "/images/workflows/25_How_To_View_The_Sap_System_Details_Workflow/step1.png"
      },
      {
        "title": "Open The System Details",
        "action": "Open the System Details On the SAP Systems page, locate the required SAP system. Click Manage.",
        "image": "/images/workflows/25_How_To_View_The_Sap_System_Details_Workflow/step2.png"
      },
      {
        "title": "Review The System Configuration",
        "action": "Review the System Configuration Review the system information, OData configuration, configured modules, and assigned approvers.",
        "image": "/images/workflows/25_How_To_View_The_Sap_System_Details_Workflow/step3.png"
      }
    ]
  },
  {
    "id": "26-how-to-view-the-sap-system-overview-workflow",
    "categoryId": "sap-systems",
    "title": "How To View The Sap System Overview",
    "excerpt": "Step-by-step guide on how to how to view the sap system overview.",
    "content": "This document outlines the step-by-step process for: How To View The Sap System Overview.",
    "steps": [
      {
        "title": "Navigate To The Sap",
        "action": "Navigate to the SAP Systems Page Navigate to Operations and Select SAP Systems.",
        "image": "/images/workflows/26_How_To_View_The_Sap_System_Overview_Workflow/step1.png"
      },
      {
        "title": "Open The System Overview",
        "action": "Open the System Overview On the SAP Systems page, click Overview for the required system.",
        "image": "/images/workflows/26_How_To_View_The_Sap_System_Overview_Workflow/step2.png"
      },
      {
        "title": "Review The System Status",
        "action": "Review the System Status Review the synchronization status, SAP call history, and system health information. Click Health Check to verify the system's connectivity if required.",
        "image": "/images/workflows/26_How_To_View_The_Sap_System_Overview_Workflow/step3.png"
      }
    ]
  },
  {
    "id": "27-how-to-test-the-sap-system-connection-workflow",
    "categoryId": "sap-systems",
    "title": "How To Test The Sap System Connection",
    "excerpt": "Step-by-step guide on how to how to test the sap system connection.",
    "content": "This document outlines the step-by-step process for: How To Test The Sap System Connection.",
    "steps": [
      {
        "title": "Navigate To The Sap",
        "action": "Navigate to the SAP Systems Page Navigate to Operations and Select SAP Systems.",
        "image": "/images/workflows/27_How_To_Test_The_Sap_System_Connection_Workflow/step1.png"
      },
      {
        "title": "Test The Connection On The Sap",
        "action": "Test the Connection On the SAP Systems page, click Test for the required SAP system.",
        "image": "/images/workflows/27_How_To_Test_The_Sap_System_Connection_Workflow/step2.png"
      }
    ]
  },
  {
    "id": "28-how-to-connect-a-new-sap-system-workflow",
    "categoryId": "sap-systems",
    "title": "How To Connect A New Sap System",
    "excerpt": "Step-by-step guide on how to how to connect a new sap system.",
    "content": "This document outlines the step-by-step process for: How To Connect A New Sap System.",
    "steps": [
      {
        "title": "Navigate To The Sap",
        "action": "Navigate to the SAP Systems Page Navigate to Operations and Select SAP Systems.",
        "image": "/images/workflows/28_How_To_Connect_A_New_Sap_System_Workflow/step1.png"
      },
      {
        "title": "Open The Connect System",
        "action": "Open the Connect System Window On the SAP Systems page, click + Connect button on the top right corner.",
        "image": "/images/workflows/28_How_To_Connect_A_New_Sap_System_Workflow/step2.png"
      },
      {
        "title": "Configure The Sap System",
        "action": "Configure the SAP System Enter the required system details, SAP connection information, and credentials. Click Create System.",
        "image": "/images/workflows/28_How_To_Connect_A_New_Sap_System_Workflow/step3.png"
      }
    ]
  }
];
