new Vue({
  el: '#app',
  data: {
    indexContact: 0,
    newMessage: '',
    textSearch: '',
    user: {
      name: 'Davide',
      avatar: '_io'
    },
    contacts: [
        {
            name: 'Michele',
            avatar: '_1',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent',
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                }
            ],
        },
        {
            name: 'Fabio',
            avatar: '_2',
            visible: true,
            messages: [
                {
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent',
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent',
                }
            ],
        },
        {
            name: 'Samuele',
            avatar: '_3',
            visible: true,
            messages: [
                {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received',
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received',
                }
            ],
        },
        {
            name: 'Luisa',
            avatar: '_4',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                }
            ],
        },
    ]
  },
  methods: {

    changeContact: function(index) {
      this.indexContact = index;
    },

    contactLastDate: function(index) {
      const messages = this.contacts[index].messages
      const lastIndex = messages.length - 1
      const lastDate = messages[lastIndex].date
      return lastDate;
    },

    currentDate: function () {
      const d = new Date();
      let dateString = d.toLocaleString();
      dateString = dateString.replace(',', '')
      return dateString;
    },

    // mettendo la cdn day.js, mi esce "invalid date"
    // getTime(dateString) {
    //   return dayjs(dateString, "DD/MM/YYYY HH:mm:ss").format('HH:mm');
    // },

    autoReply: function () {
      // creo nuovo oggetto messaggio bot
      let botMessage = {
        date: this.currentDate(),
        message: 'ok',
        status: 'received',
      };
      let chat = this.contacts[this.indexContact].messages;
      // e metto il nuovo oggetto messaggio bot nell'array dei messaggi precedenti
      chat.push(botMessage);
    },

    sendMessage: function() {

      if (this.newMessage.length !== 0) {

        // creo nuovo oggetto messaggio
        let newMessageObj = {
          date: this.currentDate(),
          message: this.newMessage,
          status: 'sent',
        };
        // prendo array dei messaggi precedenti,
        // metto il nuovo oggetto messaggio dentro l'array dei messaggi precedenti
        // e poi resetto l'input
        let chat = this.contacts[this.indexContact].messages;
        chat.push(newMessageObj);
        this.newMessage = '';

        let that = this;
        // arriiva la risposta del bot dopo un secondo
        setTimeout( function() {
          that.autoReply()
        }, 1000);
      }
    },

    search: function() {
      this.contacts.forEach((contact) => {
        let contactName = contact.name.toLowerCase();
        let searchName = this.textSearch.toLowerCase();
        if (contactName.includes(searchName)) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      });
    },

    lastMsg: function(contact) {
      return contact.messages[contact.messages.length - 1].message;
    },

    lastMsgTime: function(contact) {
      return contact.messages[contact.messages.length - 1].date;
    },

    
  },
});
Vue.config.devtools = true;
