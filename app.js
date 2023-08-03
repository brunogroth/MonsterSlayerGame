
function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min; // Random number between min and max
}

const app = Vue.createApp({
  
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
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

      console.log(this.currentRound);
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
    }
  },
});

app.mount('#game');