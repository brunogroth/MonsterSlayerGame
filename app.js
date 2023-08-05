
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // Random number between min and max
}

const app = Vue.createApp({
  
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  
  computed: {
    monsterBarStyles() {
      if(this.monsterHealth < 0){
        return {
          width: '0%'
        }
      }
      return { 
        width: this.monsterHealth + '%'
      };
    },
    playerBarStyles() {
      if(this.playerHealth < 0){
        return {
          width: '0%'
        }
      }
      return { 
        width: this.playerHealth + '%'
      };
    },
    canUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },

  methods: {

    startGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },

    attackMonster() {
      this.currentRound++;

      const attackValue =  getRandomValue(5, 12);
      this.monsterHealth -= attackValue;

      this.addLogMessages('player', 'attack', attackValue);
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.addLogMessages('monster', 'attack', attackValue);
    },

    specialAttackMonster() {
      this.currentRound++;
  
      const attackValue = getRandomValue(12, 25);
      this.monsterHealth -= attackValue;
      this.addLogMessages('player', 'special-attack', attackValue);
      this.attackPlayer();
    },

    healPlayer() {
      const healValue = getRandomValue(8, 20);
      if(this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessages('player', 'heal', attackValue);
      this.attackPlayer();
    },

    surrender() {
      this.winner = 'monster';
    },

    addLogMessages(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value
      });
    }
  },

  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // Draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Player Lost
        this.winner = 'monster';
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // Draw
        this.winner = 'draw';
      } else if (value <= 0) {
        // Monster lost
        this.winner = 'player';
      }
    }
  }
  
});

app.mount('#game');