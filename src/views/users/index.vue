<script setup>
import { ref, onMounted, nextTick } from "vue";
import api from "../../api";

// Import jQuery & DataTables
import $ from "jquery";
import "datatables.net-bs5";

let dataTableInstance = null;

const fetchDataUsers = async () => {
  try {
    const response = await api.get("/users?page=1&per_page=100");
    const users = response.data.reverse(); // Membalik array agar data terbaru muncul di atas

    await nextTick(() => {
      if (dataTableInstance) {
        dataTableInstance.destroy();
      }
      dataTableInstance = $("#usersTable").DataTable({
        data: users,
        responsive: true,
        autoWidth: true,
        order: [[0, "desc"]],
        columns: [
          { data: "id" },
          { data: "name" },
          { data: "email" },
          { data: "gender" },
          { data: "status" },
          {
            data: "id",
            title: "Actions",
            render: function (data) {
              return `
          <a href='/users/edit/${data}' class='btn btn-sm btn-primary rounded-sm shadow border-0 me-2' style='min-width: 80px; margin-bottom: 5px;'>EDIT</a>
          <button class='btn btn-sm btn-danger rounded-sm shadow border-0 delete-btn' data-id='${data}' style='min-width: 80px; margin-bottom: 5px;'>DELETE</button>
        `;
            },
          },
        ],
        createdRow: function (row, data) {
          $(row).find("td").addClass("align-middle");
        },
      });

      // Hapus event listener lama untuk menghindari duplikasi
      $("#usersTable tbody").off("click", ".delete-btn");

      // Event delegation untuk menangani tombol DELETE
      $("#usersTable tbody").on("click", ".delete-btn", async function () {
        const userId = $(this).data("id");
        await deleteUser(userId);
      });
    });
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Function untuk menghapus user
const deleteUser = async (id) => {
  if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) {
    return;
  }

  try {
    await api.delete(`/users/${id}`);
    alert("User berhasil dihapus!");
    fetchDataUsers(); // Reload data setelah berhasil menghapus
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Gagal menghapus user. Coba lagi.");
  }
};

// Fetch data saat komponen dimuat
onMounted(() => {
  fetchDataUsers();
});
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-12">
        <router-link
          :to="{ name: 'users.create' }"
          class="btn btn-md btn-success rounded shadow border-0 mb-3"
        >
          ADD NEW USER
        </router-link>

        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <div class="table-container">
              <table id="usersTable" class="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: scroll;
  max-width: 100%;
}
</style>
