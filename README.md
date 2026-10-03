# DevOps Full Pipeline Test Repository

This repository is specifically designed to thoroughly test all features of the Chat App's automated DevOps pipeline. It contains realistic code, dependencies, and deliberate errors designed to trigger every safeguard and scanner in the pipeline.

## How to Test the Pipeline
1. Create a new repository on your GitHub account.
2. Push this local folder to that GitHub repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. Inside your Chat App, create a new server connection and initiate a Push/Deploy for this repository.
4. Watch the DevOps pipeline run!

## What The Pipeline Will Catch
This repository is engineered to fail at various stages so you can verify the Chat App's error reporting:

1. **Gitleaks (Secrets Detection)**: `server.js` contains a hardcoded AWS `AKIA...` key and database password. Gitleaks will flag these and prevent deployment.
2. **Semgrep (Static Analysis)**: `server.js` contains intentional SQL Injection (Line 23) and Command Injection (Line 32) vulnerabilities. Semgrep will block the pipeline.
3. **Trivy (Dependency Scanning)**: `package.json` installs `lodash@4.17.15`, an old version with known CVEs. Trivy will generate a vulnerability report.
4. **Unit Tests (Jest)**: `tests/app.test.js` contains a deliberately failing test. The `npm test` step in the pipeline will fail.
5. **Linting (ESLint)**: `server.js` is missing a semicolon on line 16. The `npm run lint` step will fail.
6. **Git Conflict Management**: See the "Conflict Testing" section below.

## How to Test Git Conflicts
This repository has two branches (`main` and `feature/conflict-demo`) that modify the exact same line in `server.js` differently.

To test the Chat App's conflict resolution UI:
1. Push both branches to GitHub: `git push origin main` and `git push origin feature/conflict-demo`.
2. Use the Chat App's UI to attempt merging `feature/conflict-demo` into `main`.
3. The merge will fail with a Git conflict. You should see the Chat App's conflict UI where you can resolve it.

## Passing the Pipeline
To see the pipeline succeed:
1. Remove the AWS key from `server.js`.
2. Fix the SQL and Command injections in `server.js`.
3. Fix the failing test in `tests/app.test.js`.
4. Add the missing semicolon in `server.js`.
5. Run the pipeline again!
