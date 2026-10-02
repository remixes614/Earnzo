// Earnzo App Core Logic (UC Currency)

// State initialization
let appState = loadState();
let selectedOfferId = null;
let selectedWithdrawUC = 10000;
let selectedPaymentType = "UPI";
let activeCategory = "All";

function loadState() {
  const saved = localStorage.getItem("earnzo_app_state_uc");
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse saved state", e);
    }
  }
  return JSON.parse(JSON.stringify(INITIAL_DATA));
}

function saveState() {
  localStorage.setItem("earnzo_app_state_uc", JSON.stringify(appState));
  renderStateUI();
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderStateUI();
  renderOffersLists();
  renderReferralsList();
  renderTransactions();
  renderRedeemHistory();
  renderNotifications();
  renderFaqs();
});

// Render state to UI elements
function renderStateUI() {
  const ucText = `${appState.wallet.balance.toLocaleString()} UC`;

  // Update all balance displays
  const elemHomeUC = document.getElementById("homeBalanceUC");
  if (elemHomeUC) elemHomeUC.textContent = ucText;

  const elemWalletUC = document.getElementById("walletBalanceUC");
  if (elemWalletUC) elemWalletUC.textContent = ucText;

  const elemWithdrawUC = document.getElementById("withdrawBalanceUC");
  if (elemWithdrawUC) elemWithdrawUC.textContent = ucText;

  // Daily Bonus Button state
  const btnClaim = document.getElementById("btnClaimDaily");
  if (btnClaim) {
    if (appState.wallet.dailyBonusClaimed) {
      btnClaim.textContent = "Claimed";
      btnClaim.disabled = true;
    } else {
      btnClaim.textContent = "Claim Now";
      btnClaim.disabled = false;
    }
  }

  // Referral Code & Stats
  const elemRefCode = document.getElementById("referralCodeDisplay");
  if (elemRefCode) elemRefCode.textContent = appState.user.referralCode;

  const elemTotRef = document.getElementById("statTotalRef");
  if (elemTotRef) elemTotRef.textContent = appState.referralStats.totalReferrals;

  const elemSuccRef = document.getElementById("statSuccessRef");
  if (elemSuccRef) elemSuccRef.textContent = appState.referralStats.successful;

  const elemEarnedUC = document.getElementById("statEarnedUC");
  if (elemEarnedUC) elemEarnedUC.textContent = (appState.referralStats.ucEarned || appState.referralStats.ezcEarned || 2400).toLocaleString();

  // Notification Badge Count
  const unreadNotifs = appState.notifications.filter(n => n.unread).length;
  const notifBadge = document.getElementById("notifBadge");
  if (notifBadge) {
    if (unreadNotifs > 0) {
      notifBadge.style.display = "block";
    } else {
      notifBadge.style.display = "none";
    }
  }
}

// Nav Router
function switchTab(tabName) {
  const pages = document.querySelectorAll(".screen-page");
  pages.forEach(p => p.classList.remove("active"));

  const targetPage = document.getElementById(`screen-${tabName}`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  const navTabs = document.querySelectorAll(".nav-tab");
  navTabs.forEach(t => t.classList.remove("active"));

  const activeNav = document.getElementById(`nav-${tabName}`);
  if (activeNav) {
    activeNav.classList.add("active");
  }

  // Scroll to top of viewport
  const viewport = document.getElementById("screenViewport");
  if (viewport) viewport.scrollTop = 0;
}

function navigateToWithdraw() {
  switchTab("withdraw");
}

// Device Mode Switcher (Mobile frame vs Desktop view)
function setAppMode(mode) {
  const wrapper = document.getElementById("appWrapper");
  const btnMobile = document.getElementById("btnModeMobile");
  const btnDesktop = document.getElementById("btnModeDesktop");

  if (mode === "desktop") {
    wrapper.classList.remove("mobile-mode");
    wrapper.classList.add("desktop-mode");
    btnMobile.classList.remove("active");
    btnDesktop.classList.add("active");
  } else {
    wrapper.classList.remove("desktop-mode");
    wrapper.classList.add("mobile-mode");
    btnDesktop.classList.remove("active");
    btnMobile.classList.add("active");
  }
}

// Daily Bonus Action
function claimDailyBonus() {
  if (appState.wallet.dailyBonusClaimed) return;

  const bonusAmount = appState.wallet.dailyBonusAmount; // 100 UC
  appState.wallet.balance += bonusAmount;
  appState.wallet.dailyBonusClaimed = true;

  // Record transaction
  appState.transactions.unshift({
    id: "tx-" + Date.now(),
    title: "Daily Bonus",
    subtitle: "Claimed daily reward",
    time: "Just Now",
    amount: `+${bonusAmount} UC`,
    type: "credit",
    dateObj: new Date().toISOString()
  });

  // Record notification
  appState.notifications.unshift({
    id: "notif-" + Date.now(),
    icon: "fa-gift",
    iconBg: "bg-green",
    title: "Daily Bonus Claimed",
    desc: `You claimed +${bonusAmount} UC daily reward!`,
    time: "Just Now",
    unread: true
  });

  saveState();
  renderTransactions();
  renderNotifications();
  showToast(`🎉 Daily Bonus Claimed! +${bonusAmount} UC added to wallet`);
}

// Render Offers
function renderOffersLists() {
  const homeOffersList = document.getElementById("homeOffersList");
  const fullOffersList = document.getElementById("fullOffersList");

  if (homeOffersList) {
    const top3 = appState.offers.slice(0, 3);
    homeOffersList.innerHTML = top3.map(offer => createOfferHTML(offer)).join("");
  }

  if (fullOffersList) {
    fullOffersList.innerHTML = appState.offers.map(offer => createOfferHTML(offer)).join("");
  }
}

function createOfferHTML(offer) {
  return `
    <div class="offer-card" onclick="openAppDetailsModal('${offer.id}')">
      <div class="offer-left">
        <div class="offer-icon-wrapper" style="background: ${offer.bgGradient}">
          <i class="fa-solid fa-gamepad" style="color: #fff; font-size: 1.2rem;"></i>
        </div>
        <div class="offer-details">
          <span class="offer-name">${offer.name}</span>
          <span class="offer-tagline">${offer.tagline}</span>
        </div>
      </div>
      <div class="offer-reward-pill">
        <span>${offer.reward.toLocaleString()} UC</span>
      </div>
    </div>
  `;
}

// Filter Offers
function filterOffers() {
  const query = (document.getElementById("offerSearchInput")?.value || "").toLowerCase();
  const fullOffersList = document.getElementById("fullOffersList");

  const filtered = appState.offers.filter(offer => {
    const matchesCategory = activeCategory === "All" || offer.category === activeCategory;
    const matchesSearch = offer.name.toLowerCase().includes(query) || offer.tagline.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (fullOffersList) {
    if (filtered.length === 0) {
      fullOffersList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 30px 10px;">No offers found for "${query}"</div>`;
    } else {
      fullOffersList.innerHTML = filtered.map(offer => createOfferHTML(offer)).join("");
    }
  }
}

function selectCategory(category, element) {
  activeCategory = category;
  const buttons = document.querySelectorAll(".categories-bar .chip-btn");
  buttons.forEach(b => b.classList.remove("active"));
  if (element) element.classList.add("active");
  filterOffers();
}

// App Details Modal
function openAppDetailsModal(offerId) {
  const offer = appState.offers.find(o => o.id === offerId);
  if (!offer) return;

  selectedOfferId = offerId;

  document.getElementById("detailAppName").textContent = offer.name;
  document.getElementById("detailRating").textContent = offer.rating;
  document.getElementById("detailPopular").textContent = offer.popular ? "Popular" : offer.category;
  document.getElementById("detailRewardText").textContent = `${offer.reward.toLocaleString()} UC Reward`;
  document.getElementById("detailCategory").textContent = offer.category;
  document.getElementById("detailTime").textContent = offer.timeToComplete;
  document.getElementById("detailRewardSmall").textContent = `${offer.reward.toLocaleString()} UC`;

  const btnDownload = document.getElementById("btnDownloadNow");
  if (offer.completed) {
    btnDownload.innerHTML = `<i class="fa-solid fa-check"></i> Completed`;
    btnDownload.disabled = true;
    btnDownload.style.background = "#cbd5e1";
  } else {
    btnDownload.innerHTML = `<i class="fa-solid fa-download"></i> Download Now`;
    btnDownload.disabled = false;
    btnDownload.style.background = "var(--primary)";
  }

  const stepsList = document.getElementById("detailStepsList");
  stepsList.innerHTML = offer.steps.map((step, idx) => `
    <div class="step-item">
      <div class="step-num">${idx + 1}</div>
      <div class="step-text">${step}</div>
    </div>
  `).join("");

  openModal("appDetails");
}

function completeCurrentOffer() {
  if (!selectedOfferId) return;
  const offer = appState.offers.find(o => o.id === selectedOfferId);
  if (!offer || offer.completed) return;

  const btnDownload = document.getElementById("btnDownloadNow");
  btnDownload.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing...`;

  setTimeout(() => {
    offer.completed = true;
    appState.wallet.balance += offer.reward;

    appState.transactions.unshift({
      id: "tx-" + Date.now(),
      title: "Offer Reward",
      subtitle: `${offer.name} offer completed`,
      time: "Just Now",
      amount: `+${offer.reward.toLocaleString()} UC`,
      type: "credit",
      dateObj: new Date().toISOString()
    });

    appState.notifications.unshift({
      id: "notif-" + Date.now(),
      icon: "fa-gift",
      iconBg: "bg-green",
      title: "Offer Reward Credited",
      desc: `You earned +${offer.reward.toLocaleString()} UC from ${offer.name}!`,
      time: "Just Now",
      unread: true
    });

    saveState();
    renderOffersLists();
    renderTransactions();
    renderNotifications();
    closeModal();
    showToast(`✅ ${offer.name} Completed! +${offer.reward.toLocaleString()} UC added`);
  }, 1200);
}

// Referrals
function renderReferralsList() {
  const container = document.getElementById("recentReferralsList");
  if (!container) return;

  container.innerHTML = appState.recentReferrals.map(ref => `
    <div class="list-item">
      <div class="list-left">
        <div class="avatar-circle">${ref.name.charAt(0)}</div>
        <div class="list-info">
          <h5>${ref.name}</h5>
          <p>${ref.status === "Completed" ? "Offer Completed" : "Invite Sent"}</p>
        </div>
      </div>
      <span class="status-tag status-${ref.status.toLowerCase()}">${ref.status} (${ref.reward})</span>
    </div>
  `).join("");
}

function copyReferralCode() {
  navigator.clipboard.writeText(appState.user.referralCode);
  showToast(`📋 Referral code ${appState.user.referralCode} copied to clipboard!`);
}

function shareInviteLink() {
  const text = `Join Earnzo app using my code ${appState.user.referralCode} and get free 1,000 UC bonus! Download: https://earnzo.app/invite?code=${appState.user.referralCode}`;
  if (navigator.share) {
    navigator.share({ title: "Earnzo Referral", text: text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showToast("🔗 Invite link copied to clipboard!");
  }
}

// Transactions & Wallet Tabs
function toggleWalletTab(tab) {
  const btnTx = document.getElementById("tabBtnTx");
  const btnRedeem = document.getElementById("tabBtnRedeem");
  const txList = document.getElementById("walletTxList");
  const redeemList = document.getElementById("walletRedeemList");

  if (tab === "tx") {
    btnTx.classList.add("active");
    btnRedeem.classList.remove("active");
    txList.style.display = "flex";
    redeemList.style.display = "none";
  } else {
    btnRedeem.classList.add("active");
    btnTx.classList.remove("active");
    redeemList.style.display = "flex";
    txList.style.display = "none";
  }
}

function renderTransactions() {
  const container = document.getElementById("walletTxList");
  if (!container) return;

  container.innerHTML = appState.transactions.map(tx => `
    <div class="list-item">
      <div class="list-left">
        <div class="avatar-circle" style="background: ${tx.type === 'credit' ? '#dcfce7' : '#fee2e2'}; color: ${tx.type === 'credit' ? '#15803d' : '#b91c1c'};">
          <i class="fa-solid ${tx.type === 'credit' ? 'fa-arrow-down-left' : 'fa-arrow-up-right'}"></i>
        </div>
        <div class="list-info">
          <h5>${tx.title}</h5>
          <p>${tx.time}</p>
        </div>
      </div>
      <div class="tx-amount ${tx.type}">${tx.amount}</div>
    </div>
  `).join("");
}

function renderRedeemHistory() {
  const container = document.getElementById("walletRedeemList");
  if (!container) return;

  container.innerHTML = appState.redeemHistory.map(rd => `
    <div class="list-item">
      <div class="list-left">
        <div class="avatar-circle" style="background: #fef3c7; color: #b45309;">
          <i class="fa-solid fa-money-bill-wave"></i>
        </div>
        <div class="list-info">
          <h5>${rd.amountUC || rd.amountEZC}</h5>
          <p>${rd.date}</p>
        </div>
      </div>
      <span class="status-tag ${rd.statusClass}">${rd.status}</span>
    </div>
  `).join("");
}

// Withdraw Logic
function selectPaymentMethod(method, element) {
  selectedPaymentType = method;
  const chips = document.querySelectorAll(".payment-methods-grid .method-chip");
  chips.forEach(c => c.classList.remove("selected"));
  if (element) element.classList.add("selected");

  const inputLabel = document.getElementById("paymentInputLabel");
  const inputField = document.getElementById("withdrawAccountInput");

  if (method === "UPI") {
    inputLabel.textContent = "Enter UPI ID";
    inputField.placeholder = "Enter your UPI ID (e.g. name@upi)";
  } else if (method === "Paytm") {
    inputLabel.textContent = "Enter Paytm Mobile Number";
    inputField.placeholder = "Enter 10-digit mobile number";
  } else {
    inputLabel.textContent = "Enter Bank Account Details";
    inputField.placeholder = "Account No & IFSC Code";
  }
}

function selectWithdrawAmount(uc, element) {
  selectedWithdrawUC = uc;
  const chips = document.querySelectorAll(".amount-chips-grid .amount-chip");
  chips.forEach(c => c.classList.remove("selected"));
  if (element) element.classList.add("selected");
}

function processWithdrawal() {
  const inputField = document.getElementById("withdrawAccountInput");
  const accountVal = inputField ? inputField.value.trim() : "";

  if (!accountVal) {
    showToast(`⚠️ Please enter your ${selectedPaymentType} details!`);
    return;
  }

  if (appState.wallet.balance < selectedWithdrawUC) {
    showToast(`❌ Insufficient Balance! Minimum required is ${selectedWithdrawUC.toLocaleString()} UC`);
    return;
  }

  // Deduct balance
  appState.wallet.balance -= selectedWithdrawUC;

  // Add debit transaction
  appState.transactions.unshift({
    id: "tx-" + Date.now(),
    title: "Withdraw Request",
    subtitle: `Sent to ${selectedPaymentType}: ${accountVal}`,
    time: "Just Now",
    amount: `-${selectedWithdrawUC.toLocaleString()} UC`,
    type: "debit",
    dateObj: new Date().toISOString()
  });

  // Add redeem history entry
  appState.redeemHistory.unshift({
    id: "rd-" + Date.now(),
    amountUC: `${selectedWithdrawUC.toLocaleString()} UC`,
    date: "Just Now",
    status: "Pending",
    statusClass: "status-pending"
  });

  appState.notifications.unshift({
    id: "notif-" + Date.now(),
    icon: "fa-wallet",
    iconBg: "bg-purple",
    title: "Withdrawal Request Submitted",
    desc: `Request for ${selectedWithdrawUC.toLocaleString()} UC submitted successfully.`,
    time: "Just Now",
    unread: true
  });

  if (inputField) inputField.value = "";

  saveState();
  renderTransactions();
  renderRedeemHistory();
  renderNotifications();
  showToast(`💸 Withdrawal Request of ${selectedWithdrawUC.toLocaleString()} UC Submitted!`);
  switchTab("wallet");
}

// Notifications Drawer
function renderNotifications() {
  const container = document.getElementById("notificationsList");
  if (!container) return;

  container.innerHTML = appState.notifications.map(n => `
    <div class="list-item" style="${n.unread ? 'background: #f0fdf4;' : ''}">
      <div class="list-left">
        <div class="avatar-circle" style="background: var(--primary-light); color: var(--primary);">
          <i class="fa-solid ${n.icon}"></i>
        </div>
        <div class="list-info">
          <h5>${n.title}</h5>
          <p>${n.desc}</p>
          <span style="font-size: 0.65rem; color: var(--text-muted);">${n.time}</span>
        </div>
      </div>
    </div>
  `).join("");
}

function markAllNotificationsRead() {
  appState.notifications.forEach(n => n.unread = false);
  saveState();
  renderNotifications();
  showToast("Notifications marked as read");
}

// FAQs Accordion
function renderFaqs() {
  const container = document.getElementById("faqAccordionList");
  if (!container) return;

  container.innerHTML = appState.faqs.map((faq, idx) => `
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: var(--radius-md); padding: 12px 14px;">
      <div onclick="toggleFaq(${idx})" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-size: 0.85rem; font-weight: 700; color: var(--text-main);">
        <span><i class="fa-regular fa-circle-question" style="color: var(--primary); margin-right: 6px;"></i> ${faq.question}</span>
        <i class="fa-solid fa-chevron-down" id="faqIcon-${idx}" style="font-size: 0.75rem; color: var(--text-muted); transition: 0.2s;"></i>
      </div>
      <div id="faqAns-${idx}" style="display: none; font-size: 0.78rem; color: var(--text-muted); margin-top: 8px; line-height: 1.5; border-top: 1px solid #f1f5f9; padding-top: 8px;">
        ${faq.answer}
      </div>
    </div>
  `).join("");
}

function toggleFaq(idx) {
  const ans = document.getElementById(`faqAns-${idx}`);
  const icon = document.getElementById(`faqIcon-${idx}`);
  if (ans.style.display === "none") {
    ans.style.display = "block";
    icon.style.transform = "rotate(180deg)";
  } else {
    ans.style.display = "none";
    icon.style.transform = "rotate(0deg)";
  }
}

// Modal Helpers
function openModal(modalId) {
  const overlay = document.getElementById("modalOverlay");
  const modalCards = document.querySelectorAll(".modal-card");
  modalCards.forEach(c => c.style.display = "none");

  const capital = modalId.charAt(0).toUpperCase() + modalId.slice(1);
  const targetCard = document.getElementById(`modal${capital}`);
  if (targetCard) {
    targetCard.style.display = "block";
    overlay.classList.add("active");
  }
}

function closeModal() {
  const overlay = document.getElementById("modalOverlay");
  overlay.classList.remove("active");
}

function handleOverlayClick(event) {
  if (event.target.id === "modalOverlay") {
    closeModal();
  }
}

function handleLogout() {
  if (confirm("Are you sure you want to reset and logout?")) {
    localStorage.removeItem("earnzo_app_state_uc");
    appState = JSON.parse(JSON.stringify(INITIAL_DATA));
    saveState();
    showToast("Logged out successfully!");
    switchTab("home");
  }
}

// Toast Notification
function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--primary);"></i> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
