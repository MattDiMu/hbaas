# Twelve Factors
1. ✓ Codebase
The whole source code is inside one git repository (and hosted on github). Dependencies are managed using npm and the app can be deployed on multiple stages.

2. ✓/x (partly) Dependencies
All dependencies are declared inside the package.json and the package-lock.json is used for explicitely locking the dependency tree to specific versions.

Unfortunately I am not aware of any dependency isolation tools für the node/npm ecosystem to ensure that every dependency is declared and no system tools are used (only docker ensures, that nothing of the host operating system is used).

3. ✓ Config
The configurable parts of the application are handled inside the `./src/configuration.ts` file, where the application checks for corresponding environmental variables or alternatively sets sensible default values. No sensitive information is leaked.

4. ✓ Backing services
The application will connect to other services/webservers depending on the webpages that shall be transformed. All these external services are unessential for the application to work properly.

5. ✓ Build, release, run
The build and run stages are strictly separate. The docker built itself creates a software artifact (tagged docker image), which is "readonly" and can then be combined with configuration (environmental variables) to be executed.   

6. ✓ Processes
The application is stateless by design (see #8 and #9) and therefore fullfills this factor without any further adaptions.

7. ✓ Port binding
Using Express.js as web application framework (around the http server provided by Node.js itself) the application does not depend on any runtime injection of a webserver into the execution environment. The application provides a binding to http port 8080 (optionally configurable via the environmental variable `HBAAS_PORT`).

8. ✓ Concurrency
This application is designed in a stateless request-response-model, where the result of each request is fully returned in the corresponding http response. This application design allow it to scale horizontally very well as arbitrary docker instances can be started parallel (as long as a load balancer distributes the load).

9. ✓ Disposability
This application is designed in a stateless request-response-model, which makes it very robust. New instances can be started very quickly and existing instances shut down gracefully when receiving the SIGTERM signal by shutting down only after the existing Jobs are handled (see `./src/server.ts`)

10. ✓ Dev/prod parity
The same technology stack (node + npm) is used with the same versions in all stages. Docker helps to ensure this parity in the different stages as well.

11. ✓ Logs
Instead of using a logging framework like winston, the app simply writes all logging information to stdout using the builtin object `console` and the provided log-levels on it. The execution environment is then responsible for handling this stream of logging information from then on.

12. ✓ (not applicable) Admin processes
As this application currently does not have any admin/management tasks, they cannot be implemented falsely. In a fictional scenario where a redis db is used to store the current queue of jobs and admin-scripts for managing/purging this queue were necessary, I would implement it within the application and make these scripts executable over an admin gui using the same database connection. 

