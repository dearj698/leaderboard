<template>
  <b-container fluid>
    <b-row class="mt-5">
      <b-col sm="12">
        <LeaderBoard />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LeaderBoard from "./components/LeaderBoard.vue";

export default {
  name: "App",
  components: {
    LeaderBoard: LeaderBoard,
  },
  data() {
    return {
      users: {},
    };
  },
  mounted() {
    fetch("../users.json")
      .then((res) => res.json())
      .then((res) => (this.users = res.users))
      .catch((err) => console.error("Error:", err));
  },
};
</script>

<style>
/* We're using BEM methodology http://getbem.com */
.message {
  text-align: center;
}
.leaderboard {
  border: 1px solid #bbb;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 10px #777;
  list-style: none;
  margin: 5rem auto 0;
  padding: 2rem;
  width: 20rem;
}
.leaderboard__item {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.25rem;
}
.leaderboard__user {
  text-align: left;
  width: 30%;
}
.leaderboard__score {
  text-align: right;
  width: 30%;
}
.leaderboard__buttons {
  display: flex;
  justify-content: center;
  width: 30%;
}
.leaderboard__button {
  background: #007bff;
  border: 1px solid #007bff;
  color: #fff;
  height: 2rem;
  line-height: 1;
  margin: 0 0.1rem;
  width: 2rem;
}
.leaderboard__button--disabled {
  background: #eee;
  border: 1px solid #ccc;
  color: #ccc;
}
</style>
