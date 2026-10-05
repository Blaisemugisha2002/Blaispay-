/*
========================================================
BLAISEPAY
AIRTEL MONEY FOCUSED DEMO
========================================================
DEMO ONLY
No real money is transferred.
No PINs, passwords, OTPs or API secrets are stored.
========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

  const appState = {
    balance: 25000,
    transactions: [],
    contacts: [
      { name: "John", phone: "0712345678" },
      { name: "Mama", phone: "0722334455" },
      { name: "Aline", phone: "0700112233" },
      { name: "David", phone: "0799887766" }
    ]
  };


  /* =====================================================
     MESSAGE
  ===================================================== */

  function showMessage(title, message) {
    alert(title + "\n\n" + message);
  }


  /* =====================================================
     SEND MONEY
  ===================================================== */

  window.openSendMoney = function () {

    const recipient = prompt(
      "SEND MONEY\n\nEnter recipient name or phone number:"
    );

    if (recipient === null) return;

    if (!recipient.trim()) {
      showMessage(
        "BlaisePay",
        "Please enter a recipient."
      );
      return;
    }

    const amountText = prompt(
      "SEND MONEY\n\nEnter amount in KES:"
    );

    if (amountText === null) return;

    const amount = Number(amountText);

    if (!Number.isFinite(amount) || amount <= 0) {
      showMessage(
        "Invalid amount",
        "Please enter a valid amount."
      );
      return;
    }

    if (amount > appState.balance) {
      showMessage(
        "Insufficient demo balance",
        "Your demo balance is KES " +
        appState.balance.toLocaleString()
      );
      return;
    }

    const confirmed = confirm(
      "CONFIRM SEND MONEY\n\n" +
      "Recipient: " + recipient + "\n" +
      "Amount: KES " + amount.toLocaleString() +
      "\n\nContinue?"
    );

    if (!confirmed) {
      showMessage(
        "Cancelled",
        "The transfer was cancelled."
      );
      return;
    }

    completeSendMoney(recipient, amount);
  };


  function completeSendMoney(recipient, amount) {

    /*
      Demo security confirmation.
      Real production authentication will be added
      only through approved security/provider systems.
    */

    const security = confirm(
      "SECURITY CONFIRMATION\n\n" +
      "Confirm this demo transfer?\n\n" +
      "Recipient: " + recipient + "\n" +
      "Amount: KES " + amount.toLocaleString()
    );

    if (!security) {
      showMessage(
        "Cancelled",
        "Security confirmation was cancelled."
      );
      return;
    }

    appState.balance -= amount;

    appState.transactions.unshift({
      type: "Sent",
      recipient: recipient,
      amount: amount,
      date: new Date().toLocaleString()
    });

    updateBalance();

    showMessage(
      "✓ Transfer Successful",
      "Demo transfer completed.\n\n" +
      "To: " + recipient + "\n" +
      "Amount: KES " + amount.toLocaleString() +
      "\n\nNo real money was transferred."
    );
  }


  /* =====================================================
     CONTACTS
  ===================================================== */

  window.openContacts = function () {

    let list = "CONTACTS\n\n";

    appState.contacts.forEach((contact, index) => {
      list +=
        (index + 1) + ". " +
        contact.name + " - " +
        contact.phone + "\n";
    });

    const choice = prompt(
      list +
      "\nEnter contact number to send money:"
    );

    if (choice === null) return;

    const index = Number(choice) - 1;

    if (
      !Number.isInteger(index) ||
      !appState.contacts[index]
    ) {
      showMessage(
        "Invalid contact",
        "Please select a valid contact."
      );
      return;
    }

    const contact = appState.contacts[index];

    const amountText = prompt(
      "SEND TO " +
      contact.name +
      "\n\nEnter amount in KES:"
    );

    if (amountText === null) return;

    const amount = Number(amountText);

    if (!Number.isFinite(amount) || amount <= 0) {
      showMessage(
        "Invalid amount",
        "Please enter a valid amount."
      );
      return;
    }

    if (amount > appState.balance) {
      showMessage(
        "Insufficient balance",
        "Your demo balance is not enough."
      );
      return;
    }

    const confirmed = confirm(
      "CONFIRM PAYMENT\n\n" +
      "To: " + contact.name + "\n" +
      "Phone: " + contact.phone + "\n" +
      "Amount: KES " +
      amount.toLocaleString() +
      "\n\nContinue?"
    );

    if (!confirmed) return;

    completeSendMoney(
      contact.name + " (" + contact.phone + ")",
      amount
    );
  };


  /* =====================================================
     RECEIVE MONEY
  ===================================================== */

  window.openReceiveMoney = function () {

    showMessage(
      "Receive Money",
      "Your BlaisePay receiving details would appear here.\n\nDemo only."
    );
  };


  /* =====================================================
     DEPOSIT
  ===================================================== */

  window.openDeposit = function () {

    showMessage(
      "Deposit",
      "Deposit options will be connected to approved Airtel Money services later.\n\nDemo only."
    );
  };


  /* =====================================================
     WITHDRAW
  ===================================================== */

  window.openWithdraw = function () {

    showMessage(
      "Withdraw",
      "Withdraw options will be connected to approved Airtel Money services later.\n\nDemo only."
    );
  };


  /* =====================================================
     AIRTIME
  ===================================================== */

  window.openAirtime = function () {

    const amountText = prompt(
      "AIRTIME\n\nEnter airtime amount in KES:"
    );

    if (amountText === null) return;

    const amount = Number(amountText);

    if (!Number.isFinite(amount) || amount <= 0) {
      showMessage(
        "Invalid amount",
        "Enter a valid airtime amount."
      );
      return;
    }

    showMessage(
      "Airtime",
      "Demo airtime purchase: KES " +
      amount.toLocaleString() +
      "\n\nNo real purchase was made."
    );
  };


  /* =====================================================
     BUNDLES
  ===================================================== */

  window.openBundles = function () {

    showMessage(
      "Bundles",
      "Airtel data and voice bundle options will appear here.\n\nDemo only."
    );
  };


  /* =====================================================
     PAY BILLS
  ===================================================== */

  window.openPayBills = function () {

    showMessage(
      "Pay Bills",
      "Choose a biller and enter the payment amount.\n\nDemo only."
    );
  };


  /* =====================================================
     BUY GOODS
  ===================================================== */

  window.openBuyGoods = function () {

    showMessage(
      "Buy Goods",
      "Merchant payment flow will appear here.\n\nDemo only."
    );
  };


  /* =====================================================
     QR SCANNER
  ===================================================== */

  window.openQR = function () {

    showMessage(
      "QR Scanner",
      "QR scanning will be connected later.\n\nDemo scanner only."
    );
  };


  /* =====================================================
     NUMBER SCANNER
  ===================================================== */

  window.openNumberScanner = function () {

    showMessage(
      "Number Scanner",
      "Camera number recognition will be added later.\n\nDemo only."
    );
  };


  /* =====================================================
     BANKING
  ===================================================== */

  window.openBanking = function () {

    const choice = prompt(
      "BANKING\n\n" +
      "1. Bank → Bank\n" +
      "2. Airtel Money → Bank\n" +
      "3. Bank → Airtel Money\n\n" +
      "Enter 1, 2 or 3:"
    );

    if (choice === null) return;

    if (choice === "1") {
      openBankToBank();
      return;
    }

    if (choice === "2") {
      openAirtelToBank();
      return;
    }

    if (choice === "3") {
      openBankToAirtel();
      return;
    }

    showMessage(
      "Banking",
      "Invalid selection."
    );
  };


  function openBankToBank() {

    const fromBank = prompt(
      "BANK → BANK\n\nEnter sending bank:"
    );

    if (fromBank === null) return;

    const toBank = prompt(
      "BANK → BANK\n\nEnter receiving bank:"
    );

    if (toBank === null) return;

    const account = prompt(
      "BANK → BANK\n\nEnter receiving account number:"
    );

    if (account === null) return;

    const amountText = prompt(
      "BANK → BANK\n\nEnter amount in KES:"
    );

    if (amountText === null) return;

    const amount = Number(amountText);

    if (!Number.isFinite(amount) || amount <= 0) {
      showMessage(
        "Invalid amount",
        "Enter a valid amount."
      );
      return;
    }

    const confirmed = confirm(
      "CONFIRM BANK TRANSFER\n\n" +
      "From: " + fromBank + "\n" +
      "To: " + toBank + "\n" +
      "Account: " + account + "\n" +
      "Amount: KES " +
      amount.toLocaleString() +
      "\n\nDemo only. Continue?"
    );

    if (!confirmed) return;

    showMessage(
      "✓ Demo Bank Transfer",
      "Bank → Bank transfer prepared successfully.\n\n" +
      "No real money was transferred."
    );
  }


  function openAirtelToBank() {

    showMessage(
      "Airtel Money → Bank",
      "Bank selection and approved provider integration will be added later.\n\nDemo only."
    );
  }


  function openBankToAirtel() {

    showMessage(
      "Bank → Airtel Money",
      "Bank selection and approved provider integration will be added later.\n\nDemo only."
    );
  }


  /* =====================================================
     TRANSACTIONS
  ===================================================== */

  window.openTransactions = function () {

    if (appState.transactions.length === 0) {

      showMessage(
        "Transactions",
        "No transactions yet."
      );

      return;
    }

    let history = "TRANSACTION HISTORY\n\n";

    appState.transactions.forEach((tx, index) => {

      history +=
        (index + 1) + ". " +
        tx.type + "\n" +
        "Recipient: " +
        tx.recipient + "\n" +
        "Amount: KES " +
        tx.amount.toLocaleString() +
        "\n" +
        "Date: " +
        tx.date +
        "\n\n";
    });

    showMessage(
      "Transactions",
      history
    );
  };


  /* =====================================================
     SECURITY
  ===================================================== */

  window.openSecurity = function () {

    showMessage(
      "Security",
      "BlaisePay Security\n\n" +
      "✓ Fingerprint / Face ID concept\n" +
      "✓ SIM change protection\n" +
      "✓ Device verification\n" +
      "✓ Transaction confirmation\n\n" +
      "Demo only."
    );
  };


  /* =====================================================
     VOICE ASSISTANT
  ===================================================== */

  window.startVoiceAssistant = function () {

    if (
      !("SpeechRecognition" in window) &&
      !("webkitSpeechRecognition" in window)
    ) {

      showMessage(
        "Voice Assistant",
        "Voice recognition is not supported by this browser."
      );

      return;
    }

    const Recognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition = new Recognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    showMessage(
      "BlaisePay Assistant",
      "Speak a command such as:\n\n" +
      "\"Send John 500\"\n\n" +
      "Demo voice recognition will start after this message."
    );

    recognition.start();

    recognition.onresult = function (event) {

      const text =
        event.results[0][0].transcript;

      processVoiceCommand(text);
    };

    recognition.onerror = function () {

      showMessage(
        "Voice Assistant",
        "Voice recognition could not complete."
      );
    };
  };


  function processVoiceCommand(text) {

    const command =
      text.toLowerCase().trim();

    /*
      Example:
      Send John 500
    */

    const amountMatch =
      command.match(/(\d+(?:\.\d+)?)/);

    const amount =
      amountMatch
        ? Number(amountMatch[1])
        : null;


    if (
      command.includes("send") &&
      amount
    ) {

      let name =
        command
          .replace("send", "")
          .replace(/\d+(?:\.\d+)?/g, "")
          .trim();

      if (!name) {
        name = "Recipient";
      }

      completeSendMoney(
        capitalize(name),
        amount
      );

      return;
    }


    if (
      command.includes("balance")
    ) {

      showMessage(
        "BlaisePay Balance",
        "Demo balance: KES " +
        appState.balance.toLocaleString()
      );

      return;
    }


    if (
      command.includes("transaction")
    ) {

      window.openTransactions();

      return;
    }


    if (
      command.includes("bank")
    ) {

      window.openBanking();

      return;
    }


    showMessage(
      "BlaisePay Assistant",
      "Command not recognized in this demo."
    );
  }


  /* =====================================================
     BALANCE
  ===================================================== */

  function updateBalance() {

    const balanceElements =
      document.querySelectorAll(
        ".balance-amount"
      );

    balanceElements.forEach(element => {

      element.textContent =
        "KES " +
        appState.balance.toLocaleString();

    });
  }


  /* =====================================================
     HELPERS
  ===================================================== */

  function capitalize(text) {

    if (!text) return "";

    return (
      text.charAt(0).toUpperCase() +
      text.slice(1)
    );
  }


  /* =====================================================
     START
  ===================================================== */

  updateBalance();

});
