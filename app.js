const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      gameOver: false,
      text: "",
      logs: [],
    };
  },
  computed: {
    monsterHealthBar() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    specialAttackButton() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // DRAW
        this.gameOver = true;
        this.text = "It's A Draw!";
      } else if (value <= 0) {
        // player lost
        this.gameOver = true;

        this.text = "Monster Won!";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // DRAW
        this.gameOver = true;
        this.text = "It's A Draw!";
      } else if (value <= 0) {
        // player won
        this.gameOver = true;

        this.text = "You Won!";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.gameOver = false;
      this.text = "";
      this.logs = [];
    },
    getRandomValue(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    attackOnMonster() {
      const attackValue = this.getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.log("Player", "attack", attackValue);
      this.attackOnPlayer();
      this.currentRound++;
    },
    attackOnPlayer() {
      const attackValue = this.getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.log("Monster", "attack", attackValue);
    },
    specialAttack() {
      const attackValue = this.getRandomValue(10, 25);
      this.monsterHealth -= attackValue;
      this.log("Player", "attack", attackValue);
      this.attackOnPlayer();
      this.currentRound++;
    },
    healPlayer() {
      this.currentRound++;

      const healValue = this.getRandomValue(8, 20);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.log("Player", "heal", healValue);

      this.attackOnPlayer();
    },
    surrender() {
      this.playerHealth = 0;
    },
    log(who, what, value) {
      this.logs.unshift({
        by: who,
        type: what,
        value: value,
      });
    },
  },
});

app.mount("#game");
