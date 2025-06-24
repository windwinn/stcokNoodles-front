<template>
  <div class="p-3">
      <DataTable :value="worklistStock" paginator :rows="10" :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll" removableSort v-model:filters="filters" 
                  :sortOrder="-1" :globalFilterFields="['create_date','create_by']" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
          <template #header>
              <div class="flex justify-content-end">
                  <div class="mr-3">
                      <Button @click="newDetails()" class="p-refresh" label="เพิ่ม" severity="danger" icon="pi pi-plus" />
                  </div>
                  <span class="p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText v-model="filters['global'].value" placeholder="ค้นหา" />
                  </span>
              </div>
          </template>
          <Column style="width:10px">
              <template #body="slotProps">
                  <Button @click="goDetails(slotProps.data)" class="p-button-text p-button-secondary" icon="pi pi-eye" />
              </template>
          </Column>
          <Column field="create_date" header="วันที่" sortable>
            <template #body="slotProps">
                {{ formatDate(slotProps.data.create_date) }}
            </template>
          </Column>
          <Column field="create_by" header="สร้างโดย" ></Column>
          <Column field="status" header="สถานะ" sortable>
            <template #body="slotProps">
                {{ formatStatus(slotProps.data.status) }}
            </template>
          </Column>
      </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios'
import func from "../helpers/func";

export default {
data() {
      return {
          worklistStock:[
          ],
          filters: {
              'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
              'create_date': { value: null, matchMode: FilterMatchMode.EQUALS },
              'create_by': { value: null, matchMode: FilterMatchMode.EQUALS },
          }
      }
  },
  methods: {
     formatDate: func.formatDate,
     formatStatus: func.formatStatus,
      newDetails(){
        this.$router.push({ path: `/stockDetailsNew`});
      },
      goDetails(data){
          this.$router.push({ path: `/stockDetailsNew/${data.id}`});
      },
      getWorklistStock(){
        axios.get(`${import.meta.env.VITE_API_URL}/stocks/`)
          .then(response => {
              this.worklistStock = response.data
          }) .catch(error => {
            console.log("error : ", error);
            this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
          })
      }
  },created(){
      this.getWorklistStock()
  }
}
</script>

<style scoped>

</style>
