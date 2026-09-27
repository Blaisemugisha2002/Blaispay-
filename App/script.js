/* =========================================
   BlaisePay - Main Application Logic
   DEMO / PROTOTYPE
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* -----------------------------------------
     Basic App State
     ----------------------------------------- */

  const appState = {
    balance: 0,
    transactions: [],
    voiceListening: false,
    language: "English"
  };

  /* -----------------------------------------
     Helper: Show Message
     ----------------------------------------- */

  function showMessage(title, message) {
    alert(title + "\n\n" + message);
  }

  /* -----------------------------------------
     Helper: Get Amount
     ----------------------------------------- */

  function askAmount() {
    const amount = prompt("Enter amount:");

    if (amount === null) {
      return null;
    }

    const value = Number(amount.replace(/,/g, ""));

    if (!Number.isFinite(value) || value <= 0) {
      showMessage("Invalid amount", "Please enter a valid amount.");
      return null;
    }

    return value;
  }

  /* -----------------------------------------
     Send Money Demo
     ----------------------------------------- */

  function sendMoney() {

    const recipient = prompt(
      "Who do you want to send money to?\n\n" +
      "Example: John"
    );

    if (!recipient) {
      return;
    }

    const amount = askAmount();

    if (amount === null) {
      return;
    }

    const confirmed = confirm(
      "CONFIRM TRANSFER\n\n" +
      "Recipient: " + recipient + "\n" +
      "Amount: KES " + amount.toLocaleString() + "\n\n" +
      "Do you want to continue?"
    );

    if (!confirmed) {
      showMessage("Cancelled", "The transfer was cancelled.");
      return;
    }

    /*
      IMPORTANT:
      This is only a prototype.
      No real money is transferred.
    */

    appState.transactions.unshift({
      type: "Send Money",
      name: recipient,
      amount: amount,
      date: new Date().toLocaleString()
    });

    showMessage(
      "Demo Transfer",
      "Transfer approved in the BlaisePay prototype.\n\n" +
      "No real money was transferred."
    );
  }

  /* -----------------------------------------
     Withdraw Demo
     ----------------------------------------- */

  function withdrawMoney() {

    const amount = askAmount();

    if (amount === null) {
      return;
    }

    const confirmed = confirm(
      "CONFIRM WITHDRAWAL\n\n" +
      "Amount: KES " + amount.toLocaleString() + "\n\n" +
      "Continue?"
    );

    if (!confirmed) {
      return;
    }

    showMessage(
      "Withdraw Demo",
      "Withdrawal flow opened successfully.\n\n" +
      "No real transaction was performed."
    );
  }

  /* -----------------------------------------
     Deposit Demo
     ----------------------------------------- */

  function depositMoney() {

    const amount = askAmount();

    if (amount === null) {
      return;
    }

    showMessage(
      "Deposit",
      "Deposit flow opened.\n\n" +
      "Amount: KES " +
      amount.toLocaleString() +
      "\n\n" +
      "This is currently a prototype."
    );
  }

  /* -----------------------------------------
     Airtime Demo
     ----------------------------------------- */

  function buyAirtime() {

    const phone = prompt(
      "Enter phone number for airtime:"
    );

    if (!phone) {
      return;
    }

    const amount = askAmount();

    if (amount === null) {
      return;
    }

    const confirmed = confirm(
      "CONFIRM AIRTIME\n\n" +
      "Phone: " + phone + "\n" +
      "Amount: KES " + amount.toLocaleString() + "\n\n" +
      "Continue?"
    );

    if (!confirmed) {
      return;
    }

    showMessage(
      "Airtime Demo",
      "Airtime purchase flow completed in demo mode.\n\n" +
      "No real airtime was purchased."
    );
  }

  /* -----------------------------------------
     Balance
     ----------------------------------------- */

  function showBalance() {

    showMessage(
      "BlaisePay Balance",
      "Demo Balance: KES " +
      appState.balance.toLocaleString() +
      "\n\n" +
      "Later this section will connect to approved financial APIs."
    );
  }

  /* -----------------------------------------
     Transactions
     ----------------------------------------- */

  function showTransactions() {

    if (appState.transactions.length === 0) {

      showMessage(
        "Transactions",
        "No demo transactions yet."
      );

      return;
    }

    let text = "";

    appState.transactions
      .slice(0, 10)
      .forEach(function (transaction, index) {

        text +=
          (index + 1) +
          ". " +
          transaction.type +
          "\n" +
          transaction.name +
          "\n" +
          "KES " +
          transaction.amount.toLocaleString() +
          "\n" +
          transaction.date +
          "\n\n";
      });

    showMessage(
      "Recent Transactions",
      text
    );
  }

  /* -----------------------------------------
     Voice Assistant
     ----------------------------------------- */

  function startVoiceAssistant(button) {

    if (appState.voiceListening) {
      appState.voiceListening = false;

      if (button) {
        button.textContent = "🎤";
      }

      showMessage(
        "Voice Assistant",
        "Voice assistant stopped."
      );

      return;
    }

    appState.voiceListening = true;

    if (button) {
      button.textContent = "⏹️";
    }

    /*
      Prototype voice flow.
      Real AI voice processing will be added later.
    */

    setTimeout(function () {

      appState.voiceListening = false;

      if (button) {
        button.textContent = "🎤";
      }

      const command = prompt(
        "BlaisePay Voice Assistant\n\n" +
        "Type a command for this demo.\n\n" +
        "Example:\n" +
        "Rungikira John 500"
      );

      if (!command) {
        return;
      }

      processVoiceCommand(command);

    }, 500);
  }

  /* -----------------------------------------
     Voice Command Processor
     ----------------------------------------- */

  function processVoiceCommand(command) {

    const lower = command.toLowerCase();

    if (
      lower.includes("send") ||
      lower.includes("rungikira")
    ) {

      showMessage(
        "Voice Command",
        "I understood your send-money request.\n\n" +
        "The next version will connect this command to Contacts."
      );

      return;
    }

    if (
      lower.includes("balance") ||
      lower.includes("nasigaranye")
    ) {

      showBalance();
      return;
    }

    if (
      lower.includes("transaction") ||
      lower.includes("transactions")
    ) {

      showTransactions();
      return;
    }

    showMessage(
      "Voice Assistant",
      "Command received:\n\n" +
      command +
      "\n\n" +
      "This command will be connected to BlaisePay AI in a later stage."
    );
  }

  /* -----------------------------------------
     Contacts Demo
     ----------------------------------------- */

  function openContacts() {

    const contacts = [
      "John",
      "Mama",
      "Peter",
      "Sarah"
    ];

    const selected = prompt(
      "BlaisePay Contacts\n\n" +
      contacts.join("\n") +
      "\n\nType the contact name:"
    );

    if (!selected) {
      return;
    }

    showMessage(
      "Contact Selected",
      selected +
      " selected.\n\n" +
      "The next stage will connect this to the phone's approved contact system."
    );
  }

  /* -----------------------------------------
     Scan Center Demo
     ----------------------------------------- */

  function openScanner() {

    showMessage(
      "BlaisePay Scan Center",
      "Scan Center opened.\n\n" +
      "Future scan types:\n\n" +
      "• Phone number\n" +
      "• Till number\n" +
      "• PayBill number\n" +
      "• Account number\n" +
      "• QR code\n" +
      "• Reference number\n\n" +
      "The user will always verify the detected information before payment."
    );
  }

  /* -----------------------------------------
     Lipa na M-PESA Demo
     ----------------------------------------- */

  function openLipa() {

    const choice = prompt(
      "Lipa na M-PESA\n\n" +
      "Choose:\n\n" +
      "1. Buy Goods / Till\n" +
      "2. PayBill\n" +
      "3. Pochi la Biashara\n" +
      "4. Scan to Pay"
    );

    if (!choice) {
      return;
    }

    showMessage(
      "Lipa na M-PESA",
      "Selected option: " + choice +
      "\n\nThis is currently a prototype."
    );
  }

  /* -----------------------------------------
     Bank
     ----------------------------------------- */

  function openBank() {

    const choice = prompt(
      "BlaisePay Bank\n\n" +
      "1. KCB\n" +
      "2. Equity\n" +
      "3. Other Bank\n" +
      "4. Bank to Bank\n" +
      "5. Bank to M-PESA\n" +
      "6. M-PESA to Bank"
    );

    if (!choice) {
      return;
    }

    showMessage(
      "Bank Services",
      "Selected option: " +
      choice +
      "\n\nReal bank connections will only be added through approved bank APIs and partnerships."
    );
  }

  /* -----------------------------------------
     Loans & Savings
     ----------------------------------------- */

  function openSavings() {

    showMessage(
      "Loans & Savings",
      "BlaisePay will later support approved savings and financial-service integrations.\n\n" +
      "No loan is being offered by this prototype."
    );
  }

  /* -----------------------------------------
     Security
     ----------------------------------------- */

  function openSecurity() {

    showMessage(
      "Security & Authentication",
      "BlaisePay security modules:\n\n" +
      "✓ Face authentication\n" +
      "✓ Fingerprint authentication\n" +
      "✓ New-device verification\n" +
      "✓ SIM-change protection\n" +
      "✓ Transaction confirmation\n" +
      "✓ Security alerts\n\n" +
      "Biometric data will not be stored by BlaisePay."
    );
  }

  /* -----------------------------------------
     Language
     ----------------------------------------- */

  function changeLanguage() {

    const language = prompt(
      "Choose language:\n\n" +
      "1. English\n" +
      "2. Kiswahili\n" +
      "3. Kirundi\n" +
      "4. Kinyarwanda\n" +
      "5. French"
    );

    if (!language) {
      return;
    }

    showMessage(
      "Language",
      "Language selection saved for the prototype.\n\n" +
      "Full multilingual interface will be added later."
    );
  }

  /* -----------------------------------------
     Generic Button Handler
     ----------------------------------------- */

  function handleButton(button) {

    const text = button.innerText
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();

    if (
      text.includes("voice") ||
      text.includes("speak")
    ) {
      startVoiceAssistant(button);
      return;
    }

    if (text.includes("send money")) {
      sendMoney();
      return;
    }

    if (
      text.includes("withdraw") ||
      text.includes("withdraw cash")
    ) {
      withdrawMoney();
      return;
    }

    if (
      text.includes("deposit") ||
      text.includes("add money")
    ) {
      depositMoney();
      return;
    }

    if (
      text.includes("airtime") ||
      text.includes("data")
    ) {
      buyAirtime();
      return;
    }

    if (
      text.includes("lipa") ||
      text.includes("m-pesa")
    ) {
      openLipa();
      return;
    }

    if (
      text.includes("bank")
    ) {
      openBank();
      return;
    }

    if (
      text.includes("scan") ||
      text.includes("qr")
    ) {
      openScanner();
      return;
    }

    if (
      text.includes("contact")
    ) {
      openContacts();
      return;
    }

    if (
      text.includes("balance")
    ) {
      showBalance();
      return;
    }

    if (
      text.includes("transaction") ||
      text.includes("statement")
    ) {
      showTransactions();
      return;
    }

    if (
      text.includes("loan") ||
      text.includes("saving")
    ) {
      openSavings();
      return;
    }

    if (
      text.includes("security") ||
      text.includes("settings")
    ) {
      openSecurity();
      return;
    }

    if (
      text.includes("language")
    ) {
      changeLanguage();
      return;
    }

    showMessage(
      "BlaisePay",
      button.innerText.trim() +
      "\n\nThis feature is connected to the BlaisePay prototype."
    );
  }

  /* -----------------------------------------
     Connect Buttons
     ----------------------------------------- */

  const buttons = document.querySelectorAll(
    "button"
  );

  buttons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {
        handleButton(button);
      }
    );

  });

  /* -----------------------------------------
     Keyboard Shortcut
     ----------------------------------------- */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "/" &&
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {

        const voiceButton =
          document.querySelector(".voice-button");

        if (voiceButton) {
          startVoiceAssistant(voiceButton);
        }

      }

    }
  );

  /* -----------------------------------------
     Start App
     ----------------------------------------- */

  console.log(
    "BlaisePay application initialized successfully."
  );

});
