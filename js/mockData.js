// Earnzo Mock Data Store (Currency: UC)

const INITIAL_DATA = {
  user: {
    name: "Rahul Kumar",
    email: "rahulkumar@email.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    verified: true,
    referralCode: "EARNZO567"
  },
  wallet: {
    balance: 2540, // 2,540 UC
    dailyBonusClaimed: false,
    dailyBonusAmount: 100
  },
  referralStats: {
    totalReferrals: 32,
    successful: 18,
    ucEarned: 2400
  },
  recentReferrals: [
    { name: "Amit Sharma", status: "Completed", reward: "+100 UC", type: "success" },
    { name: "Priya Verma", status: "Completed", reward: "+100 UC", type: "success" },
    { name: "Rohit Kumar", status: "Pending", reward: "+50 UC", type: "warning" },
    { name: "Neha Singh", status: "Completed", reward: "+100 UC", type: "success" }
  ],
  offers: [
    {
      id: "coin-master",
      name: "Coin Master",
      tagline: "Install & complete",
      icon: "https://cdn-icons-png.flaticon.com/512/3612/3612543.png",
      bgGradient: "linear-gradient(135deg, #FF9900, #FF5500)",
      reward: 1000,
      rewardText: "1,000 UC Reward",
      rating: "4.5 ★",
      popular: true,
      category: "Games",
      timeToComplete: "1-7 Days",
      steps: [
        "Click on \"Download Now\" button",
        "Download and install the app",
        "Complete village 3",
        "Reward will be credited instantly"
      ],
      completed: false
    },
    {
      id: "dream11",
      name: "Dream11",
      tagline: "Install & create account",
      icon: "https://cdn-icons-png.flaticon.com/512/888/888841.png",
      bgGradient: "linear-gradient(135deg, #E11D48, #9F1239)",
      reward: 1000,
      rewardText: "1,000 UC Reward",
      rating: "4.8 ★",
      popular: true,
      category: "Finance",
      timeToComplete: "1 Day",
      steps: [
        "Click on \"Download Now\" button",
        "Install Dream11 app",
        "Register with your mobile number",
        "Get 1,000 UC instantly in your wallet"
      ],
      completed: false
    },
    {
      id: "winzo",
      name: "WinZO",
      tagline: "Install & register",
      icon: "https://cdn-icons-png.flaticon.com/512/1041/1041022.png",
      bgGradient: "linear-gradient(135deg, #10B981, #047857)",
      reward: 1000,
      rewardText: "1,000 UC Reward",
      rating: "4.6 ★",
      popular: false,
      category: "Games",
      timeToComplete: "Instant",
      steps: [
        "Click on \"Download Now\" button",
        "Install WinZO app",
        "Play 1 casual game",
        "Receive 1,000 UC reward"
      ],
      completed: false
    },
    {
      id: "mpl-pro",
      name: "MPL Pro",
      tagline: "Install & register",
      icon: "https://cdn-icons-png.flaticon.com/512/808/808439.png",
      bgGradient: "linear-gradient(135deg, #EF4444, #B91C1C)",
      reward: 1000,
      rewardText: "1,000 UC Reward",
      rating: "4.4 ★",
      popular: false,
      category: "Games",
      timeToComplete: "1 Day",
      steps: [
        "Download and install MPL Pro",
        "Sign up with new phone number",
        "Play your first match",
        "Claim reward instantly"
      ],
      completed: false
    },
    {
      id: "rummycircle",
      name: "RummyCircle",
      tagline: "Install & register",
      icon: "https://cdn-icons-png.flaticon.com/512/3063/3063822.png",
      bgGradient: "linear-gradient(135deg, #F59E0B, #D97706)",
      reward: 1000,
      rewardText: "1,000 UC Reward",
      rating: "4.3 ★",
      popular: false,
      category: "Games",
      timeToComplete: "Instant",
      steps: [
        "Click Download Now",
        "Register account",
        "Verify OTP",
        "Instant UC reward added"
      ],
      completed: false
    },
    {
      id: "upstox",
      name: "Upstox",
      tagline: "Open Demat account",
      icon: "https://cdn-icons-png.flaticon.com/512/2830/2830289.png",
      bgGradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
      reward: 1000,
      rewardText: "1,000 UC Reward",
      rating: "4.7 ★",
      popular: true,
      category: "Finance",
      timeToComplete: "1-2 Days",
      steps: [
        "Click on Link",
        "Complete KYC online",
        "Open Demat account",
        "Receive bonus UC"
      ],
      completed: false
    },
    {
      id: "groww",
      name: "Groww",
      tagline: "Register & verify",
      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      bgGradient: "linear-gradient(135deg, #06B6D4, #0891B2)",
      reward: 1000,
      rewardText: "1,000 UC Reward",
      rating: "4.9 ★",
      popular: true,
      category: "Finance",
      timeToComplete: "1 Day",
      steps: [
        "Install Groww app",
        "Verify Email & PAN",
        "Complete registration",
        "Reward credited automatically"
      ],
      completed: false
    }
  ],
  transactions: [
    {
      id: "tx-1",
      title: "Offer Reward",
      subtitle: "Coin Master completed",
      time: "Today, 12:30 PM",
      amount: "+1,000 UC",
      type: "credit",
      dateObj: new Date().toISOString()
    },
    {
      id: "tx-2",
      title: "Refer Reward",
      subtitle: "Friend signup bonus",
      time: "Today, 10:20 AM",
      amount: "+500 UC",
      type: "credit",
      dateObj: new Date().toISOString()
    },
    {
      id: "tx-3",
      title: "App Reward",
      subtitle: "Daily streak bonus",
      time: "Today, 09:15 AM",
      amount: "+1,000 UC",
      type: "credit",
      dateObj: new Date().toISOString()
    },
    {
      id: "tx-4",
      title: "Daily Bonus",
      subtitle: "Claimed daily reward",
      time: "Yesterday, 08:00 AM",
      amount: "+100 UC",
      type: "credit",
      dateObj: new Date().toISOString()
    },
    {
      id: "tx-5",
      title: "Withdraw Request",
      subtitle: "Sent to UPI: rahul@upi",
      time: "02 May 2024, 11:30 AM",
      amount: "-10,000 UC",
      type: "debit",
      dateObj: "2024-05-02T11:30:00"
    },
    {
      id: "tx-6",
      title: "Referral Bonus",
      subtitle: "Level 1 network bonus",
      time: "01 May 2024, 07:45 PM",
      amount: "+450 UC",
      type: "credit",
      dateObj: "2024-05-01T19:45:00"
    }
  ],
  redeemHistory: [
    {
      id: "rd-1",
      amountUC: "10,000 UC",
      date: "02 May 2024, 11:45 AM",
      status: "Pending",
      statusClass: "status-pending"
    },
    {
      id: "rd-2",
      amountUC: "1,000 UC",
      date: "28 Apr 2024, 10:30 AM",
      status: "Approved",
      statusClass: "status-approved"
    },
    {
      id: "rd-3",
      amountUC: "10,000 UC",
      date: "25 Apr 2024, 09:20 AM",
      status: "Paid",
      statusClass: "status-paid"
    },
    {
      id: "rd-4",
      amountUC: "20,000 UC",
      date: "20 Apr 2024, 07:10 PM",
      status: "Approved",
      statusClass: "status-approved"
    },
    {
      id: "rd-5",
      amountUC: "10,000 UC",
      date: "15 Apr 2024, 06:50 PM",
      status: "Paid",
      statusClass: "status-paid"
    }
  ],
  notifications: [
    {
      id: "notif-1",
      icon: "fa-gift",
      iconBg: "bg-green",
      title: "Offer Reward",
      desc: "You earned 1,000 UC from Coin Master",
      time: "Today, 12:30 PM",
      unread: true
    },
    {
      id: "notif-2",
      icon: "fa-user-plus",
      iconBg: "bg-blue",
      title: "Refer Reward",
      desc: "Amit Sharma completed an offer",
      time: "Today, 10:20 AM",
      unread: true
    },
    {
      id: "notif-3",
      icon: "fa-trophy",
      iconBg: "bg-gold",
      title: "App Reward",
      desc: "You claimed 1,000 UC streak bonus",
      time: "Yesterday, 08:00 AM",
      unread: false
    },
    {
      id: "notif-4",
      icon: "fa-wallet",
      iconBg: "bg-purple",
      title: "Withdraw Request",
      desc: "Your withdrawal request is pending approval",
      time: "02 May 2024",
      unread: false
    },
    {
      id: "notif-5",
      icon: "fa-check-circle",
      iconBg: "bg-green",
      title: "Offer Completed",
      desc: "Your offer has been verified",
      time: "01 May 2024",
      unread: false
    },
    {
      id: "notif-6",
      icon: "fa-gift",
      iconBg: "bg-pink",
      title: "Referral Bonus",
      desc: "You earned 450 UC referral commission",
      time: "30 Apr 2024",
      unread: false
    }
  ],
  faqs: [
    {
      question: "How to earn UC?",
      answer: "You can earn UC by downloading apps, completing easy tasks, claiming daily rewards, and inviting your friends using your referral code."
    },
    {
      question: "How to withdraw UC?",
      answer: "Go to the Withdraw tab, select your preferred payment mode (UPI, Paytm, Bank Transfer), enter your payment details, pick the withdrawal amount and click 'Withdraw Now'."
    },
    {
      question: "Withdrawal not received?",
      answer: "Withdrawals are typically processed within 24 to 48 hours. If your transaction status says Paid, please check your payment account statement."
    },
    {
      question: "How to use referral code?",
      answer: "Share your unique referral code with friends. When they enter your code during signup and complete their first offer, both of you earn bonus UC!"
    },
    {
      question: "Offer not credited?",
      answer: "Ensure you followed all steps mentioned in the offer details. Apps must be downloaded for the first time on your device. Verification takes up to 2 hours."
    }
  ]
};
