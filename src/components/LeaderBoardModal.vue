<template>
  <b-modal
    v-model="modalShow"
    :title="!editMode ? `Add User` : `Update User`"
    hide-footer="true"
    :ref="`userModal-${user.id}`"
  >
    <form @submit.prevent="saveUser()">
      <div class="modal-body">
        <b-form-group label="Name" label-for="name">
          <b-form-input
            id="name"
            v-model="user.name"
            type="name"
            placeholder="Name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Age" label-for="age">
          <b-form-input
            id="age"
            v-model="user.age"
            type="age"
            placeholder="20"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Address" label-for="address">
          <b-form-textarea
            id="address"
            v-model="user.address"
            type="address"
            placeholder=""
            required
          ></b-form-textarea>
        </b-form-group>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-danger"
          data-dismiss="modal"
          @click="modalShow = !modalShow"
        >
          Close
        </button>

        <button
          v-show="editMode"
          :disabled="submitting"
          type="submit"
          class="btn btn-success"
        >
          Update
        </button>
        <button
          v-show="!editMode"
          :disabled="submitting"
          type="submit"
          class="btn btn-primary"
        >
          Create
        </button>
      </div>
    </form>
  </b-modal>
</template>

<script>
import axios from "axios";
const API = "http://localhost:5038/";

export default {
  name: "Leaderboard",
  components: {},
  props: {
    entity: {
      type: Object,
      default: {
        id: null,
        name: "",
        age: 0,
        address: "",
      },
    },
    show: {
      type: Boolean,
      required: false,
    },
    onSave: {
      type: Function,
      required: false,
    },
    onClose: {
      type: Function,
      required: false,
    },
  },
  data() {
    return {
      editMode: false,
      submitting: false,
      modalShow: false,
      user: {
        id: null,
        name: "",
        age: 0,
        address: "",
      },
    };
  },

  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.modalShow = val;
        this.editMode = !!this.user.id;
      },
    },
    entity: {
      immediate: true,
      handler(val) {
        this.user = { ...val };
      },
    },

    modalShow: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.onClose();
        }
      },
    },
  },

  methods: {
    async saveUser() {
      this.submitting = true;
      const formData = new FormData();
      formData.append("name", this.user.name);
      formData.append("age", this.user.age);
      formData.append("address", this.user.address);

      if (!!this.user.id) {
        axios
          .put(API + "api/leaderboard/UpdateUser?id=" + this.user.id, formData)
          .then((response) => {
            alert(response.data);
            this.submitting = false;
            this.modalShow = false;
            this.onSave(this.user);
          });
      } else {
        axios
          .post(API + "api/leaderboard/AddUser", formData)
          .then((response) => {
            alert(response.data);
            this.submitting = false;
            this.modalShow = false;
            this.onSave(this.user);
          });
      }
    },
  },
};
</script>
