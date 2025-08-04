document.addEventListener("DOMContentLoaded", () => {
  const checklistData = {
    "Week 1: Core Services & IAM (Aug 1–7)": [
      { text: "AWS Overview + Free Tier Setup", link: "https://www.coursera.org/learn/introduction-to-aws-for-cloud-beginners" },
      { text: "IAM Users, Roles, Policies", link: "https://www.w3schools.com/training/aws/introduction-to-aws-identity-and-access-management-iam.php" },
      { text: "EC2 Basics + Launch Config", link: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/" },
      { text: "S3 Buckets + Lifecycle Rules", link: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/" },
      { text: "CloudWatch + Logs", link: "https://www.udemy.com/course/aws-certified-cloud-practitioner/" },
      { text: "AWS CLI & SDK Setup", link: "https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/" },
      { text: "Quiz + Recap", link: "https://www.w3schools.com/aws/aws_quiz.php" }
    ],
    "Week 2: Developer Tools & Serverless (Aug 8–14)": [
      { text: "Lambda Functions", link: "https://www.udemy.com/course/aws-lambda-serverless-architecture/" },
      { text: "API Gateway Integration", link: "https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html" },
      { text: "DynamoDB Basics", link: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html" },
      { text: "Step Functions", link: "https://www.udemy.com/course/aws-lambda-serverless-developer-guide-with-hands-on-labs/" },
      { text: "SNS vs SQS", link: "https://www.udemy.com/course/aws-lambda-serverless-architecture/" },
      { text: "CloudFormation Templates", link: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/" },
      { text: "Quiz + Mini Project", link: "https://quizlet.com/392359849/aws-cloud-practitioner-exam-questions-flash-cards/" }
    ],
    "Week 3: Monitoring, Deployment & Security (Aug 15–21)": [
      { text: "X-Ray + Tracing", link: "https://www.coursera.org/learn/aws-aws-x-ray-getting-started" },
      { text: "CodeDeploy + CI/CD", link: "https://github.com/nealdct/aws-dva-code" },
      { text: "Secrets Manager", link: "https://aws.amazon.com/secrets-manager/" },
      { text: "Cognito Auth", link: "https://aws.amazon.com/cognito/" },
      { text: "Developer Tools Deep Dive", link: "https://aws.amazon.com/developer/tools/" },
      { text: "Security Best Practices", link: "https://aws.amazon.com/blogs/training-and-certification/category/security-identity-compliance/aws-identity-and-access-management-iam/" },
      { text: "Quiz + Resume Integration", link: "https://www.credly.com/" }
    ],
    "Week 4: Final Prep & Exams (Aug 22–Sep 5)": [
      { text: "Practice Exams + Weak Topic Review", link: "https://digitalcloud.training/free-aws-practice-exam-questions/" },
      { text: "Flashcards + Final Quiz", link: "https://quizlet.com/392359849/aws-cloud-practitioner-exam-questions-flash-cards/" },
      { text: "Mock Exams + Strategy", link: "https://blowstack.com/practice-exams" },
      { text: "Certification Attempt 🎯", link: "https://aws.amazon.com/certification/certification-prep/" }
    ]
  };

  const checklistContainer = document.getElementById("checklist");
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  let totalTasks = 0;
  let completedTasks = 0;

  Object.entries(checklistData).forEach(([weekTitle, tasks]) => {
    const weekDiv = document.createElement("div");
    weekDiv.className = "week";

    const heading = document.createElement("h2");
    heading.textContent = weekTitle;
    weekDiv.appendChild(heading);

    tasks.forEach((task, index) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      const key = `aws-task-${weekTitle}-${index}`;
      checkbox.type = "checkbox";
      checkbox.checked = localStorage.getItem(key) === "true";
      checkbox.addEventListener("change", () => {
        localStorage.setItem(key, checkbox.checked);
        updateProgress();
      });

      label.appendChild(checkbox);

      const link = document.createElement("a");
      link.href = task.link;
      link.target = "_blank";
      link.textContent = task.text;
      label.appendChild(link);

      weekDiv.appendChild(label);
      checklistContainer.appendChild(weekDiv);

      totalTasks++;
      if (checkbox.checked) completedTasks++;
    });
  });

  function updateProgress() {
    const allBoxes = document.querySelectorAll("input[type='checkbox']");
    const checked = Array.from(allBoxes).filter(cb => cb.checked).length;
    const percent = Math.round((checked / allBoxes.length) * 100);
    progressBar.style.width = percent + "%";
    progressText.textContent = `Progress: ${percent}%`;
    localStorage.setItem("aws-overall-percent", percent);
  }

  updateProgress();
});
