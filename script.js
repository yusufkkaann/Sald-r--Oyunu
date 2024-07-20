function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      winner: null,
      userHP: 100,
      computerHP: 100,
      currentRound: 0,
    };
  },
  computed: {
    computerBarStyles() {
      if (this.computerHP < 0) {
        return { width: "0%" };
      } else {
        return { width: this.computerHP + "%" };
      }
    },
    userBarStyles() {
      if (this.userHP < 0) {
        return { width: "0%" };
      } else {
        return { width: this.userHP + "%" };
      }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 4 !== 0;
    },
  },
  watch: {
    userHP(value) {
      if (value <= 0 && this.computerHP <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "computer";
      }
    },
    computerHP(value) {
      if (value <= 0 && this.userHP <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "user";
      }
    },
  },
  methods: {
    attackToComputer() {
      this.currentRound++;
      const attackPower = getRandomValue(7, 15);
      // this.computerHP = this.computerHP - attackPower;
      this.computerHP -= attackPower;
      this.attackToUser();
    },
    attackToUser() {
      const attackPower = getRandomValue(12, 20);
      // this.userHP = this.userHP - attackPower;
      this.userHP -= attackPower;
    },
    powerAttack() {
      this.currentRound++;
      const attackPower = getRandomValue(15, 30);
      // this.computerHP = this.computerHP - attackPower;
      this.computerHP -= attackPower;
      this.attackToUser();
    },
    healMe() {
      this.currentRound++;
      const healPower = getRandomValue(15, 20);
      if (this.userHP + healPower > 100) {
        this.userHP = 100;
      } else {
        this.userHP += healPower;
      }
      this.attackToUser();
    },
    restart() {
      this.userHP = 100;
      this.computerHP = 100;
      this.currentRound = 0;
      this.winner = null;
    },
  },
});
app.mount("#frontend");
