// recover of createApp method
const { createApp } = Vue;

// app creation
const app = createApp({
  data() {
    return {
      contacts: [
        {
          name: "Michele",
          avatar: "./img/avatar_1.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:55",
              message: "Ricordati di stendere i panni",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "./img/avatar_2.jpg",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "sent",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "./img/avatar_3.jpg",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro B.",
          avatar: "./img/avatar_4.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
        {
          name: "Alessandro L.",
          avatar: "./img/avatar_5.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ricordati di chiamare la nonna",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Va bene, stasera la sento",
              status: "received",
            },
          ],
        },
        {
          name: "Claudia",
          avatar: "./img/avatar_6.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao Claudia, hai novità?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Non ancora",
              status: "received",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "Nessuna nuova, buona nuova",
              status: "sent",
            },
          ],
        },
        {
          name: "Federico",
          avatar: "./img/avatar_7.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Fai gli auguri a Martina che è il suo compleanno!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Grazie per avermelo ricordato, le scrivo subito!",
              status: "received",
            },
          ],
        },
        {
          name: "Davide",
          avatar: "./img/avatar_8.jpg",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Ciao, andiamo a mangiare la pizza stasera?",
              status: "received",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "No, l'ho già mangiata ieri, ordiniamo sushi!",
              status: "sent",
            },
            {
              date: "10/01/2020 15:51:00",
              message: "OK!!",
              status: "received",
            },
          ],
        },
      ],
      activeChat: 0,

      newSentMessage: {
        date: "",
        message: "",
        status: "sent",
        typed: false,
      },

      searchInput: "",
    };
  },

  computed: {
    // recover the object of the active chat
    getActiveChat() {
      return this.contacts[this.activeChat];
    },
  },

  methods: {
    /**
     *
     * @param {number} index new active chat
     */
    goToChat(index) {
      this.activeChat = index;
    },

    // when the user click enter a new message istance will be add in the activeChat's messages array
    sendMessage() {
      this.inputCheck();
      if (this.newSentMessage.typed) {
        this.newSentMessage.date = this.getMessageTime();
        this.getActiveChat.messages.push({ ...this.newSentMessage });
        this.newSentMessage.message = "";
        this.newSentMessage.typed = false;
        setTimeout(() => this.receivedMessage(), 1000);
      }
    },

    // methods thant check if the user typed something in the input text
    inputCheck() {
      if (this.newSentMessage.length <= 0) {
        return;
      } else {
        let i = 0;
        while (
          i < this.newSentMessage.message.length &&
          !this.newSentMessage.typed
        ) {
          if (this.newSentMessage.message.charAt(i) !== " ")
            this.newSentMessage.typed = true;
          i++;
        }
      }
    },

    // received message from the computer after 1 second
    receivedMessage() {
      const newGeneratedMessage = {
        date: "",
        message: "ok",
        status: "received",
      };
      newGeneratedMessage.date = this.getMessageTime();
      this.getActiveChat.messages.push(newGeneratedMessage);
    },

    /**
     *
     * @param {number} index value of the chat where i need to recover the last message
     * @returns {string} string of the last message on the chat
     */
    getLastMessage(index) {
      return this.contacts[index].messages.at(-1);
    },

    /**
     *
     * @returns {Date} time when i sent the message
     */
    getMessageTime() {
      const date = new Date();
      return `${date.getHours()}:${date.getMinutes()}`;
    },

    /**
     *
     * @returns {string} last access of the user equals to the last received message
     */
    getLastAccess() {
      const receivedMessage = this.getActiveChat.messages.filter(
        (message) => message.status == "received"
      );

      const lastAccess =
        receivedMessage.length > 0 ? receivedMessage.at(-1).date : "";

      return lastAccess;
    },

    /**
     *
     * @param {number} index equals of the index of the message that I need to delete
     */
    deleteMessage(index) {
      this.getActiveChat.messages.splice(index, 1);
    },
  },
});

// running the app
app.mount("#app");
