A complete README summarizing your project and explaining how to run your app and your tests. Consider including any additional information you feel would be helpful to the reviewers (e.g. your overall approach, project scoping, etc.)


Setup instructions
1. Install npm  
2. In terminal, navigate to root folder "GithubIssuesViewer/" and run "npm install" & "npm install --dev" (use sudo or sudo bash if necessary)


Running App in Development Mode
1. In terminal, navigate to root folder "GithubIssuesViewer/" and run "npm run start"
2. Run http://localhost:8090 in browser


Running production build on local machine
1. To build static assets for production, on terminal run "npm run prod-build"
2. Launch the local file from assets/index.html to do a sanity check before prod deploy


Running tests
1. To run unit tests, run this on the terminal: 'mocha test/unit_tests/'



Features
1. Default page URL:
    a. By default the url will be 'http://localhost:8090/#/gitissues/npm/npm/issues'
    b. Using the URL, we can change the repo user and repo name by using a url like this: 
        'http://localhost:8090/#/gitissues/dhiviyadhanasekar/GithubIssuesViewer/issues'
        where dhiviyadhanasekar is the repo user and 'GitIssuesViewer' is the repo name.

2. Repo name and user can also be changed in the UI header (next to the git logo), by click on the text, changing it and pressing enter or clicking anywhere out.

3. On default page, 
    a. hovering over issue number will show a preview of the first 140 characters of the issue body (ending on a clean line or word) - preview display on hover was done to avoid clutter on the default page.
    b. Clicking on reporter will link to the user's github page
    c. Clicking on the issue number will bring up the 'Issue Details Page'.

4. Issue Page URL:
    a. Issue page can reached by either clicking on the issue number on the default page or by directly using a url like: 'http://localhost:8090/#/gitissues/npm/npm/issues/13267', where 'npm/npm' is the user/repo and '13267' is the issue number

5. The rest of the features remain the same as what was specified on the task.


Project Scope:
1. As confirmed over email, this project doesn't have Github oauth implementation and hence allows you to make up to 60 Github requests per hour.


Additional Information












