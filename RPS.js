// Game variables
let userScore = 0;
let compScore = 0;

// DOM elements
const rockBtn = document.querySelector(".rock");
const paperBtn = document.querySelector(".paper");
const scissorsBtn = document.querySelector(".scissors");
const messageEl = document.getElementById("result-msg");
const userScoreEl = document.getElementById("user-score");
const compScoreEl = document.getElementById("comp-score");
const dominationMsgEl = document.getElementById("domination-message");

// Emoji mapping for display
const emojiMap = {
    rock: "🪨",
    paper: "📄",
    scissors: "✂️"
};

// Game functions
function getCompChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function getWinner(user, comp) {
    if (user === comp) return "draw";
    
    if (
        (user === "rock" && comp === "scissors") ||
        (user === "paper" && comp === "rock") ||
        (user === "scissors" && comp === "paper")
    ) {
        return "user";
    }
    
    return "comp";
}

function getResultMessage(winner, userChoice, compChoice) {
    if (winner === "draw") {
        return `⚖️ Draw! Both chose ${emojiMap[userChoice]}`;
    }
    
    if (winner === "user") {
        return `🎉 You Win! ${emojiMap[userChoice]} beats ${emojiMap[compChoice]}`;
    }
    
    return `💀 You Lose! ${emojiMap[compChoice]} beats ${emojiMap[userChoice]}`;
}

function getMessageColor(winner) {
    if (winner === "draw") return { bg: "#4E8D9C", color: "#1a2a3a" };
    if (winner === "user") return { bg: "#2e7d32", color: "#ffffff" };
    return { bg: "#c62828", color: "#ffffff" };
}

// Score difference background effect
function updateBackgroundByScore() {
    const difference = userScore - compScore;
    const body = document.body;
    
    // Remove existing classes
    body.classList.remove('score-diff-low', 'score-diff-medium', 'score-diff-high', 'score-diff-extreme');
    
    // Hide domination message
    dominationMsgEl.classList.remove('show');
    dominationMsgEl.textContent = "";
    
    if (difference >= 10) {
        // Extreme lead — dark, intense green with pulse
        body.classList.add('score-diff-extreme');
        dominationMsgEl.textContent = "🔥 DOMINATION MODE! 🔥";
        dominationMsgEl.classList.add('show');
    } else if (difference >= 5) {
        // High lead — strong green
        body.classList.add('score-diff-high');
        dominationMsgEl.textContent = "⚡ LEADING STRONG! ⚡";
        dominationMsgEl.classList.add('show');
    } else if (difference >= 3) {
        // Medium lead — noticeable green
        body.classList.add('score-diff-medium');
    } else if (difference >= 1) {
        // Low lead — subtle green
        body.classList.add('score-diff-low');
    }
    // If difference <= 0, no green effect (neutral)
}

function updateUI(winner, userChoice, compChoice) {
    // Update message
    const message = getResultMessage(winner, userChoice, compChoice);
    const colors = getMessageColor(winner);
    
    messageEl.textContent = message;
    messageEl.style.backgroundColor = colors.bg;
    messageEl.style.color = colors.color;
    
    // Update scores
    userScoreEl.textContent = userScore;
    compScoreEl.textContent = compScore;
    
    // Update background based on score difference
    updateBackgroundByScore();
}

function playGame(userChoice) {
    const compChoice = getCompChoice();
    const winner = getWinner(userChoice, compChoice);
    
    // Update scores
    if (winner === "user") {
        userScore++;
    } else if (winner === "comp") {
        compScore++;
    }
    
    // Update UI with results
    updateUI(winner, userChoice, compChoice);
}

function resetGame() {
    userScore = 0;
    compScore = 0;
    
    userScoreEl.textContent = "0";
    compScoreEl.textContent = "0";
    messageEl.textContent = "select any option";
    messageEl.style.backgroundColor = "#4E8D9C";
    messageEl.style.color = "#1a2a3a";
    
    // Remove all green effects
    const body = document.body;
    body.classList.remove('score-diff-low', 'score-diff-medium', 'score-diff-high', 'score-diff-extreme');
    
    // Hide domination message
    dominationMsgEl.classList.remove('show');
    dominationMsgEl.textContent = "";
}

// Event listeners
rockBtn.addEventListener("click", () => playGame("rock"));
paperBtn.addEventListener("click", () => playGame("paper"));
scissorsBtn.addEventListener("click", () => playGame("scissors"));

// Keyboard support (R, P, S keys)
document.addEventListener("keydown", (e) => {
    const key = e.key.toLowerCase();
    if (key === 'r') playGame("rock");
    else if (key === 'p') playGame("paper");
    else if (key === 's') playGame("scissors");
    else if (key === ' ' || key === 'reset') resetGame();
});

// Optional: Double click on message to reset
messageEl.addEventListener("dblclick", resetGame);