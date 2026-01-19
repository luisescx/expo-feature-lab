export default {
  login: {
    title: "Bem-vindo",
    subtitle: "Faça login na sua conta",
    emailLabel: "E-mail",
    passwordLabel: "Senha",
    forgotPassword: "Esqueceu a senha?",
    loginButton: "Entrar",
    noAccount: "Não tem uma conta?",
    signUp: "Cadastrar-se",
    errors: {
      invalidEmail: "Por favor, insira um e-mail válido",
      passwordMin: "A senha deve ter pelo menos 5 caracteres",
      passwordMax: "A senha deve ter no máximo 10 caracteres",
      required: "Campo obrigatório",
    },
  },
  tabs: {
    home: "Início",
    profile: "Perfil",
    settings: "Configurações",
  },
  screens: {
    taskList: {
      title: "Lista de tarefas",
    },
    myPhotos: {
      title: "Minhas Fotos",
      noPhotos: {
        title: "Nenhuma foto ainda",
        subtitle:
          "Você ainda não tirou nenhuma foto. Toque no botão abaixo para começar!",
        button: "Tirar foto",
      },
      hasPhotos: {
        button: "Tirar nova foto",
      },
      deletePhotosAlert: {
        title: "Excluir fotos",
        subtitle: "Deseja remover suas fotos? Essa ação é irreversível.",
        cancel: "Cancelar",
        confirm: "Confirmar",
      },
      selectedPhotosActions: {
        selectAll: "Selecionar todas",
        clearSelection: "Limpar",
        deleteSelected: "Excluir",
      },
    },
    theme: {
      title: "Tema",
      dark: "Modo escuro",
      light: "Modo claro",
      device: "Configuração do celular",
      deviceDescription:
        "O aplicativo usará as mesmas configurações do seu celular.",
    },
    language: {
      title: "Idioma",
      english: "Inglês",
      portuguese: "Português",
      spanish: "Espanhol",
      device: "Idioma do celular",
      deviceDescription:
        "O app usará o idioma do seu celular, se for compatível.",
    },
    home: {
      cards: {
        taskList: "Lista de tarefas",
        myPhotos: "Minhas Fotos",
        map: "Mapa",
        animations: "Animações",
      },
    },
    settings: {
      theme: "Tema",
      themeDescription: "Escolha entre o modo claro ou escuro",
      language: "Idioma",
      languageDescription: "Altere o idioma do aplicativo",
      logout: "Sair",
      logoutDescription: "Encerre a sessão da sua conta",
      logoutActions: {
        title: "Sair da conta",
        subtitle: "Tem certeza de que deseja sair da sua conta?",
        cancel: "Cancelar",
        confirm: "Sair",
      },
    },
  },
};
