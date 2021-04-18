# Interview task for frontend developers

This is a task for testing your knowledge of React.js, HTML and CSS.

### Technical requirements

- To complete this task, you should use the `create-react-app` application template ([docs](https://create-react-app.dev/docs/getting-started)).
- You are not allowed to use other external libraries to perform the task, except for `node-sass`, `axios`, `classnames`, `react-router-dom`, `prop-types`;
- You have to use the `prop-types` library if you don't use **`TypeScript`**.
- You have to use **`React hooks`**.
- You can use **`css`** or **`scss`** of your choice.

### Functionality requirements

The app is a dashboard page which used to display a list of created A/b tests ([Figma](https://www.figma.com/file/PFdFpIajQbuGibIbEYnE3l/Interview-task-for-frontend-developers)).

![dashboard-mockup](https://user-images.githubusercontent.com/79767549/115148766-c7430300-a069-11eb-9bd8-59df45cf2cd6.png)

- The table is filled with data that is requested from the JSON file using the API in [this repository](https://development.kameleoon.net/oivanov/frontend-interview-task-api). You need to clone the project to your computer and run it.
- When a user hovering over a table row it should be highlighted as shown in the mockup.
- Sites in the site column must be displayed without the **`http`** or **`https`** protocol and **`www`**.
- A user should be able to filter by item name. If the item exists we hide other
records and show only found items in the list. If no records are found there should
be a message with the corresponding text and a reset button (see [Figma](https://www.figma.com/file/PFdFpIajQbuGibIbEYnE3l/Interview-task-for-frontend-developers)).
- A user should be allowed to sort (**`ASC`**, **`DESC`**) by clicking on the titles:
  - for **`name`**, **`type`** and **`site`** in alphabetical order
  - for the **`status`** in:
    - **`ASC`**: Online, Paused, Stopped, Draft
    - **`DESC`**: Draft, Stopped, Paused, Online
- A user should be able to interact with the interface using the keyboard.

### Additional tasks

- Using the `react-router-dom` library, implement routing between three pages: **`dashboard`**, **`results`**, and **`finalize`**. And don't forget to load the necessary data for each page.
- When a user clicks on the **`Results`** or **`Finalize`** button on dashboard page, you should redirect to URLs **`/results/[testId]`** and **`/finalize/[testId]`** accordingly, without reloading the browser window.

It will be a plus if you:
- will use TypeScript to complete the task
- write tests

### The result of executing

The solution to this task is recommended to be posted on any public git service of your choice.

Good luck!
