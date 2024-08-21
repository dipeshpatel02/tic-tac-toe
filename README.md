# Tic-Tac-Toe Game

This repository contains the source code for a simple Tic-Tac-Toe game with a backend built using .NET Core and a frontend using Angular 15.

## Prerequisites

- **Microsoft Visual Studio 2022**: Download and install from [here](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Professional&channel=Release&version=VS2022&source=VSLandingPage&cid=2030&passive=false). This will also install the .NET Core SDK needed for the backend.
- **Node.js**: Ensure you have Node.js installed. You can download it from [Node.js Official Website](https://nodejs.org/).

## Angular Installation

If Angular CLI is not already installed, you can install it globally by running the following command:

```bash
npm install -g @angular/cli
```
After colne open cmd at Front-end path
```bash
npm i
ng s -o
```
## Assumptions and Design Decisions

### User Authentication and Account Creation

As per the project requirements, complex authentication mechanisms were not implemented. The following assumptions and design decisions were made:

1. **Simple User Identification**:
   - Users are identified by their email address and name combination. 
   - If a user enters an email address and name for the first time, a new account is created.

2. **Multiple Accounts for the Same Email**:
   - If a user enters the same email address but a different name on subsequent logins, a new account will be created for each unique name.
   - This allows users to create multiple accounts with the same email address but different names.

3. **No Passwords or Authentication Tokens**:
   - Since the focus was not on complex authentication, no passwords or authentication tokens are required to log in or create an account.
   - The system assumes that the combination of email and name is sufficient for user identification in this context.

