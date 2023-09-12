<template>
  <tr>
    <td class="">
      <button class="btn btn-danger btn-md" type="button" @click="deleteUser()">
        <div class="btn-content">X</div>
      </button>
    </td>
    <td class="">
      <a href="#" @click="modalShow = !modalShow">{{ currentUser.name }}</a>
    </td>
    <td class="">{{ currentUser.age }}</td>
    <td class="">
      <div
        class="d-flex align-items-center justify-content-center"
        style="gap: 30px"
      >
        <span>{{ currentUser.score }}</span>
        <div class="d-flex" style="gap: 10px">
          <b-button
            variant="warning"
            @click="updateScore(user, parseInt(currentUser.score) - 1)"
          >
            -
          </b-button>
          <b-button
            variant="primary"
            @click="updateScore(user, parseInt(currentUser.score) + 1)"
          >
            +
          </b-button>
        </div>
      </div>
    </td>
    <td class="">
      {{ currentUser.address }}
    </td>
    <LeaderBoardModal
      :show="modalShow"
      :entity="currentUser"
      :onSave="
        (data) => {
          currentUser = { ...data };
          modalShow = false;
        }
      "
      :onClose="() => (modalShow = false)"
    />
  </tr>
</template>

<script>
import axios from "axios";
import LeaderBoardModal from "./LeaderBoardModal.vue";
const API = "http://localhost:5038/";
export default {
  name: "LeaderBoardItem",
  components: {
    LeaderBoardModal,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    deleteUser: {
      type: Function,
      required: true,
    },
  },
  data: function () {
    return {
      modalShow: false,
      currentUser: {},
    };
  },

  watch: {
    user: {
      handler: function (val) {
        this.currentUser = val;
      },
      immediate: true,
      deep: true,
    },
  },

  methods: {
    async updateScore(user, score) {
      const formData = new FormData();
      score = isNaN(score) ? 0 : parseInt(score);

      formData.append("id", user.id);
      formData.append("score", score);

      this.currentUser = { ...this.currentUser, score: score };
      axios
        .put(API + "api/leaderboard/UpdateUser?id=" + user.id, formData)
        .then((response) => {});
    },
  },
};
</script>
