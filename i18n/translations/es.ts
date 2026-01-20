export default {
  login: {
    title: "Bienvenido",
    subtitle: "Inicia sesión en tu cuenta",
    emailLabel: "Email",
    passwordLabel: "Contraseña",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loginButton: "Iniciar sesión",
    noAccount: "¿No tienes una cuenta?",
    signUp: "Registrarse",
    errors: {
      invalidEmail: "Por favor, introduce un correo válido",
      passwordMin: "La contraseña debe tener al menos 5 caracteres",
      passwordMax: "La contraseña debe tener un máximo de 10 caracteres",
      required: "Campo obligatorio",
    },
  },
  tabs: {
    home: "Inicio",
    profile: "Perfil",
    settings: "Configuración",
  },
  screens: {
    taskList: {
      title: "Lista de tareas",
    },
    myPhotos: {
      title: "Mis Fotos",
      noPhotos: {
        title: "Todavía no hay fotos",
        subtitle:
          "Aún no has tomado ninguna foto. ¡Toca el botón de abajo para comenzar!",
        button: "Tomar foto",
      },
      hasPhotos: {
        button: "Tomar nueva foto",
      },
      deletePhotosAlert: {
        title: "Eliminar fotos",
        subtitle: "¿Desea eliminar sus fotos? Esta acción es irreversible.",
        cancel: "Cancelar",
        confirm: "Confirmar",
      },
      selectedPhotosActions: {
        selectAll: "Seleccionar todo",
        clearSelection: "Limpiar",
        deleteSelected: "Eliminar",
      },
      takenPicture: {
        save: "Guardar",
        retry: "Reintentar",
        discard: "Descartar",
      },
    },
    theme: {
      title: "Tema",
      dark: "Modo oscuro",
      light: "Modo claro",
      device: "Configuración del dispositivo",
      deviceDescription:
        "La aplicación usará la misma configuración que tu teléfono.",
    },
    language: {
      title: "Idioma",
      english: "Inglés",
      portuguese: "Portugués",
      spanish: "Español",
      device: "Idioma del dispositivo",
      deviceDescription:
        "La app usará el idioma de tu dispositivo si es compatible.",
    },
    home: {
      cards: {
        taskList: "Lista de tareas",
        myPhotos: "Mis Fotos",
        map: "Mapa",
        animations: "Animaciones",
      },
    },
    settings: {
      theme: "Tema",
      themeDescription: "Elige entre el modo claro u oscuro",
      language: "Idioma",
      languageDescription: "Cambia el idioma de la aplicación",
      logout: "Cerrar sesión",
      logoutDescription: "Cierra la sesión de tu cuenta",
      logoutActions: {
        title: "Cerrar sesión",
        subtitle: "¿Estás seguro de que quieres cerrar tu sesión?",
        cancel: "Cancelar",
        confirm: "Cerrar sesión",
      },
    },
  },
};
