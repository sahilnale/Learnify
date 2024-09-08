
# Learnify - Custom Learning Plan Generator

**Learnify** is an educational platform that helps users create custom learning plans based on their chosen topics and learning duration. Powered by OpenAI's GPT-4 model, the app curates resources and creates timelines to guide users through the learning process. Learnify simplifies the process of gathering relevant materials and breaking them down into actionable steps.

## Features

- **Custom Learning Plans**: Users can specify topics they want to learn along with the desired learning duration. The app generates a personalized learning plan based on these inputs.
- **Resource Gathering**: The platform automatically collects and organizes relevant materials and sources to assist users in mastering their chosen topics.
- **Progress Tracking**: Users can track their learning progress through the app’s dashboard and progress page.
- **User Dashboard**: Upon login, users are greeted with a personalized dashboard where they can view their ongoing learning plans.
- **Profile and To-Do Pages**: Users can manage their learning profile and keep track of learning tasks with the built-in to-do feature.

## Tech Stack

- **Frontend**: React (MERN Stack)
- **Backend**: Django (as external REST API for Python-based OpenAI integrations)
- **Machine Learning**: OpenAI GPT-4 API for generating learning plans and curating resources
- **Database**: MongoDB for managing user data, learning plans, and progress
- **Deployment**: (To be determined)

## Project Structure

```
/client        # React frontend
/server        # Django backend
/components    # Reusable frontend components (e.g., Dashboard, Learning Page, etc.)
/models        # Data models (MongoDB schemas for user, learning plans)
```

## Current Progress

- **Frontend Development**: 
  - Dashboard, Learn, Progress, Profile, and To-Do pages are linked and under development.
  - Cards for subjects and learning tasks are dynamically synced with the backend.
  
- **Backend Development**: 
  - API endpoints are set up for user authentication, learning plan generation, and progress tracking.
  - Integration with OpenAI API to generate custom learning plans.

## Installation and Setup

To run this project locally, follow these steps:

### Backend (Django)

1. Clone the repository and navigate to the server folder:
   ```bash
   git clone https://github.com/sahilnale/Learnify.git
   cd Learnify/server
   ```

2. Install dependencies and set up a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Set up environment variables for OpenAI API key:
   ```bash
   export OPENAI_API_KEY=your_api_key
   ```

4. Run the Django server:
   ```bash
   python manage.py runserver
   ```

### Frontend (React)

1. Navigate to the `client` folder:
   ```bash
   cd ../client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Planned Features

- **Learning Recommendations**: Suggest additional topics based on the user’s current learning interests.
- **Social Learning**: Allow users to share progress and collaborate with others.
- **Notifications**: Remind users to keep up with their learning plan and suggest when it’s time to move on to the next module.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or want to contribute, feel free to reach out to [Sahil Nale](https://github.com/sahilnale).