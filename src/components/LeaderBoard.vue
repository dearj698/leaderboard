<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex justify-content-between">
        <h3 class="card-title">Users</h3>

        <div class="card-tools">
          <button
            class="btn btn-primary"
            v-b-modal.userModal
            @click="openUserModal(null)"
          >
            <b-icon icon="three-dots" animation="cylon" font-scale="4"></b-icon>
            Add New
          </button>
        </div>
      </div>
    </div>
    <div class="card-body table-responsive p-0">
      <b-row class="mt-5">
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Search"
            label-for="search-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="search-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <transition-group move-class="leaderboard__item--move" v-if="true">
            <table
              role="table"
              :class="`table b-table table-hover table-striped b-table-sortable b-table-sort-${sortDirection}`"
              sort-direction="asc"
            >
              <thead>
                <tr>
                  <th scope="col" class="">
                    <div
                      class="d-inline-flex flex-nowrap align-items-center gap-1"
                    >
                      <div></div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="b-table-sortable-column"
                    @click="sortRows('name', 'asc')"
                  >
                    <div
                      class="d-inline-flex flex-nowrap align-items-center gap-1"
                    >
                      <span
                        class="b-table-sort-icon"
                        :class="`${sortBy == 'name' && 'sorted sorted-desc'}`"
                      ></span>
                      <div>Name</div>
                    </div>
                  </th>
                  <th scope="col" class="">
                    <div
                      class="d-inline-flex flex-nowrap align-items-center gap-1"
                    >
                      <div>Age</div>
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="b-table-sortable-column"
                    @click="sortRows('score', 'asc')"
                  >
                    <div
                      class="d-inline-flex flex-nowrap align-items-center gap-1"
                    >
                      <span
                        class="b-table-sort-icon"
                        :class="`${sortBy == 'score' && 'sorted sorted-desc'}`"
                      ></span>
                      <div>Points</div>
                    </div>
                  </th>
                  <th scope="col" class="">
                    <div
                      class="d-inline-flex flex-nowrap align-items-center gap-1"
                    >
                      <div>Address</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <LeaderBoardItem
                  v-for="(u, index) in items"
                  :key="`${index}-${u.id}`"
                  :id="`user-${u.id}`"
                  :ref="`user-${u.id}`"
                  :user="u"
                  :deleteUser="() => deleteUser(u.id)"
                />
              </tbody>
            </table>
          </transition-group>
          <p class="message" v-else>Nothing to show</p>
        </b-col>
      </b-row>
    </div>

    <LeaderBoardModal
      :show="modalShow"
      :entity="this.user"
      :onSave="
        () => {
          modalShow = !modalShow;
          refreshData();
        }
      "
      :onClose="() => (modalShow = false)"
    />
  </div>
</template>

<script>
import axios from "axios";
import { toRaw } from "vue";
import LeaderBoardItem from "./LeaderBoardItem.vue";
import LeaderBoardModal from "./LeaderBoardModal.vue";
const API = "http://localhost:5038/";

export default {
  name: "Leaderboard",
  components: {
    LeaderBoardItem,
    LeaderBoardModal,
  },
  data() {
    return {
      users: [],
      filter: "",
      editMode: false,
      submitting: false,
      modalShow: false,
      user: {
        id: null,
        name: "",
        age: 0,
        address: "",
      },

      sortBy: "name",
      sortDirection: "asc",
    };
  },
  computed: {
    sortedUsers() {
      return [...this.users].sort((a, b) =>
        a.score === b.score
          ? a.name.localeCompare(b.name)
          : a.score > b.score
          ? -1
          : 1
      );
    },

    items() {
      const result = this.users
        .filter((user) => {
          if (this.filter && this.filter != "") {
            return user.name.toLowerCase().includes(this.filter.toLowerCase());
          }

          return true;
        })
        .sort((a, b) => {
          if (this.sortBy == "name") {
            return this.sortDirection == "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (this.sortBy == "score") {
            return this.sortDirection == "asc"
              ? a.score - b.score
              : b.score - a.score;
          }
        });

      return result;
    },
  },
  methods: {
    sortRows(field, direction = "asc") {
      if (this.sortBy == field && this.sortDirection == direction) {
        this.sortDirection = direction == "asc" ? "desc" : "asc";
      } else {
        this.sortDirection = direction;
      }
      this.sortBy = field;
    },

    openUserModal(user = null) {
      this.editMode = !!user;
      this.user = user ? { ...user } : { name: "", age: "", address: "" };
      this.modalShow = true;
    },

    async refreshData() {
      axios.get(API + "api/leaderboard/GetUsers").then((response) => {
        this.users = response.data.map((u) => {
          const user = toRaw(u);
          return {
            id: user.id,
            name: user.name,
            age: user.age,
            score: user.score,
            address: user.address,
          };
        });
      });
    },
    async deleteUser(id) {
      axios
        .delete(API + "api/leaderboard/DeleteUser?id=" + id)
        .then((response) => {
          this.users = this.users.filter((u) => u.id != id);
          this.refreshData();
          alert(response.data);
        });
    },
  },
  mounted() {
    this.refreshData();
  },
};
</script>

<style>
.leaderboard {
  border: 1px solid #bbb;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 10px #777;
  font-family: Arial, Helvetica, sans-serif;
  list-style: none;
  margin: 5rem auto 0;
  padding: 2rem;
  width: 20rem;
}
.leaderboard__item--move {
  transition: transform 0.2s;
}
.message {
  text-align: center;
}
.leaderboard__button {
  background: #007bff;
  border: 1px solid #007bff;
  color: #fff;
  text-align: center;
}
</style>
