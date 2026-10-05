/*
========================================================
BlaisePay
Airtel Money Focused Application Logic
DEMO / PROTOTYPE
========================================================

IMPORTANT:
- Demo only
- No real money is transferred
- No provider PINs or API secrets are stored
- Real integrations require official provider approval
========================================================
*/

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     BASIC APP STATE
  ===================================================== */

  const appState = {
    balance: 25000,
    transactions: [],
    voiceListening: false,
    simVerified: true,
    selectedContact: null
  };


  /* =====================================================
     DEMO CONTACTS
  ===================================================== */

  const contacts = [
    {
      name: "John",
      phone: "0712345678"
    },
    {
      name: "Mama",
      phone: "0722334455"
    },
    {
      name: "Aline",
      phone: "0700112233"
    },
    {
      name: "David",
      phone: "0799887766"
    }
  ];


  /* =====================================================
     SCREEN NAVIGATION
  ===================================================== */

  window.openScreen = function (id) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen) {
      screen.classList.remove("active");
    });

    const target = document.getElementById(id);

    if (target) {
      target.classList.add("active");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    if (id === "contacts") {
      renderContacts();
    }

    if (id === "history") {
      renderHistory();
    }

    updateBalanceDisplay();
  };


  window.goHome = function () {
    openScreen("home");

    const navHome = document.getElementById("navhome");

    if (navHome) {
      navHome.classList.add("activeNav");
    }
  };


  /* =====================================================
     TOAST / MESSAGE
  ===================================================== */

  window.toast = function (message) {

    let toastBox = document.getElementById("toast");

    if (!toastBox) {
      alert(message);
      return;
    }

    toastBox.textContent = message;
    toastBox.style.display = "block";

    setTimeout(function () {
      toastBox.style.display = "none";
    }, 2800);
  };


  window.demoAction = function (message) {
    toast(message + " — Demo only");
  };


  /* =====================================================
     BALANCE
  ===================================================== */

  function updateBalanceDisplay() {

    const balanceElements = document.querySelectorAll(
      "#balance, .balance-amount"
    );

    balanceElements.forEach(function (element) {

      element.textContent =
        "KSh " +
        Number(appState.balance).toLocaleString();

    });
  }


  /* =====================================================
     SEND MONEY
  ===================================================== */

  window.prepareSend = function () {

    const recipientElement =
      document.getElementById("recipient");

    const amountElement =
      document.getElementById("amount");

    const confirmation =
      document.getElementById("sendConfirm");

    if (!recipientElement || !amountElement || !confirmation) {
      toast("Send Money screen is not ready.");
      return;
    }

    const recipient =
      recipientElement.value.trim();

    const amount =
      Number(amountElement.value);

    if (!recipient) {
      toast("Enter a recipient.");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      toast("Enter a valid amount.");
      return;
    }

    if (amount > appState.balance) {
      toast("Demo balance is not enough.");
      return;
    }


    confirmation.innerHTML = `
      <div class="confirm">

        <b>Confirm Send Money</b>

        <p>
          Recipient:
          <strong>${escapeHtml(recipient)}</strong>
        </p>

        <p>
          Amount:
          <strong>
            KSh ${amount.toLocaleString()}
          </strong>
        </p>

        <p class="note">
          This is a demo confirmation.
          No real money will be transferred.
        </p>

        <button
          class="btn"
          onclick="completeDemoSend()">
          Confirm
        </button>

        <button
          class="btn alt"
          onclick="cancelSend()">
          Cancel
        </button>

      </div>
    `;
  };


  window.cancelSend = function () {

    const confirmation =
      document.getElementById("sendConfirm");

    if (confirmation) {
      confirmation.innerHTML = "";
    }
  };


  window.completeDemoSend = function () {

    const recipientElement =
      document.getElementById("recipient");

    const amountElement =
      document.getElementById("amount");

    const confirmation =
      document.getElementById("sendConfirm");

    const recipient =
      recipientElement.value.trim();

    const amount =
      Number(amountElement.value);


    if (!recipient || !amount) {
      toast("Invalid transfer.");
      return;
    }


    confirmation.innerHTML = `
      <div class="confirm">

        <b>Security Confirmation</b>

        <p class="note">
          Production version will use the phone's
          approved security and provider authentication.
        </p>

        <button
          class="btn"
          onclick="approveDemoSend()">
          Approve Demo Transfer
        </button>

      </div>
    `;
  };


  window.approveDemoSend = function () {

    const recipient =
      document.getElementById("recipient").value.trim();

    const amount =
      Number(document.getElementById("amount").value);

    if (!recipient || !amount) {
      toast("Transfer information is incomplete.");
      return;
    }

    if (amount > appState.balance) {
      toast("Demo balance is not enough.");
      return;
    }


    appState.balance -= amount;


    appState.transactions.unshift({
      type: "Sent",
      name: recipient,
      amount: "- KSh " + amount.toLocaleString(),
      date: new Date().toLocaleString()
    });


    updateBalanceDisplay();
    renderHistory();


    const confirmation =
      document.getElementById("sendConfirm");

    if (confirmation) {

      confirmation.innerHTML = `
        <div class="confirm">

          <b>✓ Demo Transfer Successful</b>

          <p>
            Sent to:
            <strong>${escapeHtml(recipient)}</strong>
          </p>

          <p>
            Amount:
            <strong>
              KSh ${amount.toLocaleString()}
            </strong>
          </p>

          <p class="note">
            No real money was moved.
          </p>

        </div>
      `;
    }

    toast("Demo transfer completed.");
  };


  /* =====================================================
     RECEIVE MONEY
  ===================================================== */

  window.receiveMoneyDemo = function () {

    toast(
      "Receive Money flow opened — Demo only"
    );
  };


  /* =====================================================
     DEPOSIT
  ===================================================== */

  window.depositMoney = function () {

    toast(
      "Deposit flow opened — Demo only"
    );
  };


  /* =====================================================
     WITHDRAW
  ===================================================== */

  window.withdrawMoney = function () {

    toast(
      "Withdraw flow opened — Demo only"
    );
  };


  /* =====================================================
     AIRTIME
  ===================================================== */

  window.buyAirtime = function () {

    toast(
      "Airtime purchase prepared — Demo only"
    );
  };


  /* =====================================================
     PAY BILLS
  ===================================================== */

  window.payBill = function () {

    toast(
      "Bill payment flow opened — Demo only"
    );
  };


  /* =====================================================
     BUY GOODS
  ===================================================== */

  window.buyGoods = function () {

    toast(
      "Merchant payment flow opened — Demo only"
    );
  };


  /* =====================================================
     CONTACTS
  ===================================================== */

  function renderContacts() {

    const contactList =
      document.getElementById("contactList");

    if (!contactList) {
      return;
    }


    contactList.innerHTML =
      contacts.map(function (contact) {

        return `
          <div class="row">

            <div>
              <b>${escapeHtml(contact.name)}</b>

              <span class="muted">
                ${escapeHtml(contact.phone)}
              </span>
            </div>

            <button
              class="btn alt"
              style="width:auto"
              onclick="selectContact('${contact.name}','${contact.phone}')">

              Select

            </button>

          </div>
        `;

      }).join("");
  }


  window.selectContact = function (name, phone) {

    appState.selectedContact = {
      name: name,
      phone: phone
    };

    openScreen("send");


    const recipient =
      document.getElementById("recipient");

    if (recipient) {

      recipient.value =
        name + " • " + phone;
    }

    toast(
      name + " selected."
    );
  };


  /* =====================================================
     SCAN / QR / OCR DEMO
  ===================================================== */

  window.simulateScan = function () {

    const scanNumber =
      document.getElementById("scanNumber");

    if (!scanNumber) {
      return;
    }

    scanNumber.value =
      "0712345678";

    toast(
      "Demo scan recognized a phone number."
    );
  };


  window.useScanned = function () {

    const scanNumber =
      document.getElementById("scanNumber");

    const recipient =
      document.getElementById("recipient");


    if (!scanNumber || !scanNumber.value.trim()) {

      toast(
        "Scan a number first."
      );

      return;
    }


    openScreen("send");


    if (recipient) {

      recipient.value =
        scanNumber.value.trim();
    }

    toast(
      "Number added to Send Money."
    );
  };


  window.scanQrDemo = function () {

    toast(
      "QR scanner opened — Demo only"
    );
  };


  /* =====================================================
     BANKING
  ===================================================== */

  window.openBankTransfer = function () {

    toast(
      "Bank Transfer opened — Demo only"
    );
  };


  window.bankToBankTransfer = function () {

    toast(
      "Bank → Bank transfer opened — Demo only"
    );
  };


  window.airtelToBank = function () {

    toast(
      "Airtel Money → Bank flow opened — Demo only"
    );
  };


  window.bankToAirtel = function () {

    toast(
      "Bank → Airtel Money flow opened — Demo only"
    );
  };


  /* =====================================================
     BANK TRANSFER FORM
  ===================================================== */

  window.prepareBankTransfer = function () {

    const bank =
      document.getElementById("bankName");

    const account =
      document.getElementById("bankAccount");

    const amount =
      document.getElementById("bankAmount");

    if (!bank || !account || !amount) {

      toast(
        "Bank transfer screen is not ready."
      );

      return;
    }


    const bankName =
      bank.value.trim();

    const accountNumber =
      account.value.trim();

    const transferAmount =
      Number(amount.value);


    if (!bankName) {

      toast(
        "Select a bank."
      );

      return;
    }


    if (!accountNumber) {

      toast(
        "Enter the account number."
      );

      return;
    }


    if (
      !Number.isFinite(transferAmount) ||
      transferAmount <= 0
    ) {

      toast(
        "Enter a valid amount."
      );

      return;
    }


    toast(
      "Bank transfer ready for confirmation — Demo only"
    );
  };


  /* =====================================================
     TRANSACTION HISTORY
  ===================================================== */

  function renderHistory() {

    const historyList =
      document.getElementById("historyList");

    if (!historyList) {
      return;
    }


    if (
      !appState.transactions ||
      appState.transactions.length === 0
    ) {

      historyList.innerHTML = `
        <div class="confirm">
          <b>No transactions yet</b>
          <p class="note">
            Demo account
          </p>
        </div>
      `;

      return;
    }


    historyList.innerHTML =
      appState.transactions.map(function (tx) {

        return `
          <div class="row">

            <div>

              <b>
                ${escapeHtml(tx.type)}
              </b>

              <span class="muted">
                ${escapeHtml(tx.name)}
              </span>

              <span class="muted">
                ${escapeHtml(tx.date)}
              </span>

            </div>

            <b>
              ${escapeHtml(tx.amount)}
            </b>

          </div>
        `;

      }).join("");
  }


  /* =====================================================
     SECURITY
  ===================================================== */

  window.simulateSimChange = function () {

    appState.simVerified = false;


    const status =
      document.getElementById("simStatus");


    if (status) {

      status.textContent =
        "Verification required";
    }


    toast(
      "SIM change detected. Sensitive actions are locked in this demo."
    );
  };


  window.verifySimDemo = function () {

    appState.simVerified = true;


    const status =
      document.getElementById("simStatus");


    if (status) {

      status.textContent =
        "Verified";
    }


    toast(
      "Demo verification completed."
    );
  };


  window.biometricDemo = function () {

    toast(
      "Biometric confirmation requested — Demo only"
    );
  };


  /* =====================================================
     VOICE ASSISTANT
  ===================================================== */

  window.startVoice = function () {

    if (
      "webkitSpeechRecognition" in window ||
      "SpeechRecognition" in window
    ) {

      const Recognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


      const recognition =
        new Recognition();


      recognition.lang =
        "en-US";


      recognition.interimResults =
        false;


      recognition.maxAlternatives =
        1;


      appState.voiceListening =
        true;


      toast(
        "Listening..."
      );


      recognition.onresult =
        function (event) {

          appState.voiceListening =
            false;


          const speech =
            event.results[0][0].transcript;


          toast(
            "Heard: " + speech
          );


          parseVoiceCommand(
            speech
          );
        };


      recognition.onerror =
        function () {

          appState.voiceListening =
            false;


          toast(
            "Voice unavailable. Type the command instead."
          );
        };


      recognition.onend =
        function () {

          appState.voiceListening =
            false;
        };


      recognition.start();

    } else {

      toast(
        "Voice recognition is not available in this browser."
      );
    }
  };


  /* =====================================================
     VOICE COMMAND PARSER
  ===================================================== */

  function parseVoiceCommand(text) {

    if (!text) {
      return;
    }


    const normalized =
      text.toLowerCase().trim();


    /*
      Example:
      "Send John 500"
      "Rungikira John 500"
    */


    const amountMatch =
      normalized.match(/(\d+(?:\.\d+)?)/);


    const amount =
      amountMatch
        ? Number(amountMatch[1])
        : null;


    if (
      normalized.includes("send") ||
      normalized.includes("rungikira")
    ) {

      openScreen("send");


      const recipient =
        document.getElementById("recipient");


      const amountInput =
        document.getElementById("amount");


      if (recipient) {

        let name =
          normalized
            .replace("send", "")
            .replace("rungikira", "")
            .replace(/\d+(?:\.\d+)?/g, "")
            .trim();


        if (name) {

          recipient.value =
            capitalize(name);
        }
      }


      if (
        amountInput &&
        amount
      ) {

        amountInput.value =
          amount;
      }


      toast(
        "Send Money details prepared."
      );

      return;
    }


    if (
      normalized.includes("balance") ||
      normalized.includes("nasigaranye")
    ) {

      toast(
        "Demo balance: KSh " +
        appState.balance.toLocaleString()
      );

      return;
    }


    if (
      normalized.includes("transaction") ||
      normalized.includes("transactions")
    ) {

      openScreen("history");

      return;
    }


    if (
      normalized.includes("bank")
    ) {

      openScreen("bank");

      return;
    }


    if (
      normalized.includes("airtime")
    ) {

      openScreen("airtime");

      return;
    }


    toast(
      "I did not understand that command in this demo."
    );
  }


  window.assistantDemo = function () {

    toast(
      "AI demo: Send John 500 → confirmation"
    );
  };


  /* =====================================================
     SIMPLE HELPERS
  ===================================================== */

  function capitalize(text) {

    if (!text) {
      return "";
    }

    return (
      text.charAt(0).toUpperCase() +
      text.slice(1)
    );
  }


  function escapeHtml(value) {

    return String(value)

      .replace(/&/g, "&amp;")

      .replace(/</g, "&lt;")

      .replace(/>/g, "&gt;")

      .replace(/"/g, "&quot;")

      .replace(/'/g, "&#039;");
  }


  /* =====================================================
     INITIALIZE
  ===================================================== */

  updateBalanceDisplay();
  renderHistory();

});
