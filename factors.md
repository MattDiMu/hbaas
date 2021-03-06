# Twelve Factors
1. ✓ Codebase
The whole source code is inside one git repository (and hosted on github). Dependencies are managed using npm and the app can be deployed on multiple stages.

2. ✓/x (partly) Dependencies
All dependencies are declared inside the package.json and the package-lock.json is used for explicitely locking the dependency tree to specific versions.

Unfortunately I am not aware of any dependency isolation tools für the node/npm ecosystem to ensure that every dependency is declared and no system tools are used. Only the dockerization ensures, that nothing of the host OS is used implicitely. Within the docker image itself, the usage of puppeteer actually does rely on certain undeclared packages on order to run correctly (e.g. fonts packages), which is suboptimal, but at least does not leak outside the image.

3. ✓ Config
The configurable parts of the application are handled inside the `./src/configuration.ts` file, where the application checks for corresponding environmental variables or alternatively sets sensible default values. No sensitive information is leaked.

4. ✓ Backing services
The application will connect to other services/webservers depending on the webpages that shall be transformed. All these external services are unessential for the application to work properly.

5. ✓ Build, release, run
The build and run stages are strictly separated. The docker build creates a software artifact (= tagged docker image), which is "readonly" and can then be combined with configuration (= environmental variables) to be executed in whatever stage necessary.

6. ✓ Processes
The application is stateless by design (see #8 and #9) and therefore fullfills this factor without any further adaptions.

7. ✓ Port binding
By using Express.js as web application framework (around the http server provided by Node.js itself), the application does not depend on any runtime injection of a webserver into the execution environment. The application provides a binding to http port 8080 (if not configured otherwise through the environmental variable `HBAAS_PORT`).

8. ✓ Concurrency
This application is designed in a stateless request-response-model, where the result of each request is fully returned in the corresponding http response. This application design allows it to scale horizontally very well as arbitrary docker instances can be started parallel (as long as a load balancer distributes the load between them).

9. ✓ Disposability
This application is designed in a stateless request-response-model, which makes it very robust. New instances can be started very quickly and existing instances shut down gracefully when receiving the SIGTERM signal by shutting down only after the existing requests/jobs are handled (see `./src/server.ts#23`)

10. ✓ Dev/prod parity
The same technology stack (node + npm) is used with the same versions in all stages. Docker helps to ensure this parity in the different stages as well.

11. ✓ Logs
Instead of using a logging framework like winston, the app simply writes all logging information to stdout using the builtin `console` object. The execution environment is then responsible for handling this stream of logging information from the stdout.

12. ✓ (not applicable) Admin processes
As this application does not have any admin/management tasks, they cannot be implemented falsely. In a fictional scenario where a redis db is used to store the current queue of jobs and admin-scripts are then used for managing this queue, I would implement these admin-scripts within the application itself (optionally organized in a separate subdirectory or separate npm module). This way these scripts could use even the same redis connection as the application does.
