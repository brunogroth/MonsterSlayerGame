
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
    };
  },
  
  computed: {
    monsterBarStyles() {
      return { 
        width: this.monsterHealth + '%'
      };
    },
    playerBarStyles() {
      return { 
        width: this.playerHealth + '%'
      };
    },
    canUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },

  methods: {
    attackMonster() {
      this.currentRound++;

      const attackValue =  getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },

    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
    },

    specialAttackMonster() {
      this.currentRound++;
  
      const attackValue = getRandomValue(12, 25);
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },

    healPlayer() {
      const healValue = getRandomValue(8, 20);
      if(this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
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