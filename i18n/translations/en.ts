export default {
  login: {
    title: "Welcome",
    subtitle: "Please login to your account",
    emailLabel: "Email",
    passwordLabel: "Password",
    forgotPassword: "Forgot Password?",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    errors: {
      invalidEmail: "Please enter a valid email",
      passwordMin: "Password must have at least 5 characters",
      passwordMax: "Password must have a maximum of 10 characters",
      required: "Required field",
    },
  },
  tabs: {
    home: "Home",
    profile: "Profile",
    settings: "Settings",
  },
  screens: {
    taskList: {
      title: "Task list",
    },
    myPhotos: {
      title: "My Photos",
      noPhotos: {
        title: "No photos yet",
        subtitle:
          "You haven't taken any photos yet. Tap the button below to get started!",
        button: "Take photo",
      },
      hasPhotos: {
        button: "Take new photo",
      },
      deletePhotosAlert: {
        title: "Delete photos",
        subtitle:
          "Do you want to remove your photos? This action cannot be undone.",
        cancel: "Cancel",
        confirm: "Confirm",
      },
      selectedPhotosActions: {
        selectAll: "Select all",
        clearSelection: "Clear",
        deleteSelected: "Delete",
      },
      takenPicture: {
        save: "Save",
        retry: "Try again",
        discard: "Discard",
      },
    },
    theme: {
      title: "Theme",
      dark: "Dark mode",
      light: "Light mode",
      device: "Device settings",
      deviceDescription: "The app will use the same settings as your phone.",
    },
    language: {
      title: "Language",
      english: "English",
      portuguese: "Portuguese",
      spanish: "Spanish",
      device: "Device language",
      deviceDescription:
        "The app will use your phone's language if it’s supported.",
    },
    home: {
      cards: {
        taskList: "Task list",
        myPhotos: "My Photos",
        map: "Map",
        animations: "Animations",
      },
    },
    settings: {
      theme: "Theme",
      themeDescription: "Choose between light or dark mode",
      language: "Language",
      languageDescription: "Change the app language",
      logout: "Logout",
      logoutDescription: "Sign out of your account",
      logoutActions: {
        title: "Sign out",
        subtitle: "Are you sure you want to sign out of your account?",
        cancel: "Cancel",
        confirm: "Sign out",
      },
    },
  },
};
