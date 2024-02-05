// recover of createApp method
const { createApp } = Vue;
const {
  contacts,
  activeChat,
  newSentMessage,
  searchInput,
  generatedMessageList,
  newContactPressed,
  newContact,
} = data;

// app creation
const app = createApp({
  data() {
    return {
      contacts,
      activeChat,
      newSentMessage,
      searchInput,
      generatedMessageList,
      newContactPressed,
      newContact,
      alert: {
        showed: false,
        type: "info",
        msg: "",
      },
      show: true,
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

    /**
     *
     * @param {number} index value of the chat where i need to recover the last message
     * @returns {string} string of the last message on the chat
     */
    getLastMessage(index) {
      const lastMessage = this.contacts[index].messages.at(-1)
        ? this.contacts[index].messages.at(-1)
        : "";
      return lastMessage;
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
        message:
          this.generatedMessageList[
            this.randomNumber(this.generatedMessageList.length - 1, 1)
          ],
        status: "received",
      };
      newGeneratedMessage.date = this.getMessageTime();
      this.getActiveChat.messages.push(newGeneratedMessage);
    },

    randomNumber(max, min) {
      const number = Math.floor(Math.random() * max - min + 1 + min);
      return number;
    },

    searchContact() {
      this.contacts.forEach((contact) => {
        contact.visible = contact.name
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },

    /**
     *
     * @param {number} index equals of the index of the message that I need to delete
     */
    deleteMessage(index) {
      this.getActiveChat.messages.splice(index, 1);
    },

    // open/close the create account tab
    createContact() {
      this.newContactPressed = this.newContactPressed ? false : true;
    },

    // add new contact & reset alert
    addContact() {
      this.contacts.push({ ...this.newContact });
      this.newContact.name = "";
      this.newContact.avatar = "";
      this.newContactPressed = false;
      this.alert.type = "info";
      this.alert.msg = "";
      this.alert.showed = false;
    },

    // when user click the button to save the new contact start a check on the input
    addContactControl() {
      if (!this.newContact.avatar && this.newContact.name) {
        this.newContact.avatar =
          "./img/360_F_509597532_RKUuYsERhODmkxkZd82pSHnFtDAtgbzJ.jpg";
        this.addContact();
      } else if (!this.newContact.name) {
        console.log("errore");
        this.resultOperation(
          "danger",
          "Username is mandatory for user creation"
        );
      } else {
        this.addContact();
      }
    },

    resultOperation(type, msg) {
      this.alert.type = type;
      this.alert.msg = msg;
      this.alert.showed = true;
    },
  },

  mounted() {
    setTimeout(() => {
      this.show = false;
    }, 1000);
  },
});

// running the app
app.mount("#app");
