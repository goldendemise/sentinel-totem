This tool aims to simplify setting up local reproduction environments for writing and testing Sentinel policies.

At present, navigate to your sentinel policy directory (containing the .hcl) and run `main.js` there.

Current functionality:
Checks the CURRENT DIRECTORY recursively(via vsCode's ripgrep package) 
for references to the Hashicorp governance repo common-functions and 
adds them as http imports to sentinel.hcl if found.

Planned functionality:
WORKING TESTS

Check for v1 imports and print a warning if they're in use

Provide a command line flag to show what values will be `after_unknown`

TBD:
Considering whether an offline/local mode is worth implementing. This would work by replacing the https heredocs with local copies of repo functions included with an 
npm tarball (or just include it directly in this package)
