<template>
    <div class="card p-3">
    <DataTable :value="cmsUnit" paginator :rows="15" :rowsPerPageOptions="[15,30]" responsiveLayout="scroll" removableSort v-model:filters="filters" 
                  :sortOrder="-1" :globalFilterFields="['name']" paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
          <template #header>
              <div class="flex justify-content-end">
                  <div class="mr-2">
                      <Button @click="openDialog('','new')" class="p-refresh" label="เพิ่ม" severity="danger" icon="pi pi-plus" />
                  </div>
                  <span class="p-input-icon-left">
                      <i class="pi pi-search" />
                      <InputText v-model="filters['global'].value" placeholder="ค้นหา" />
                  </span>
              </div>
          </template>
            <Column style="width:10px">
                <template #body="slotProps">
                    <Button @click="openDialog(slotProps.data,'edit')" class="p-button-text p-button-secondary" icon="pi pi-pencil" />
                </template>
            </Column>
            <Column field="name" header="ชื่อหน่วย"></Column>
      </DataTable>
    </div>
        <Dialog v-model:visible="visibleCMS" modal header="ระบบจัดการ" :style="{ width: '40%' }"
        :closable="false" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :baseZIndex="10" >
            <div class="grid">
                <div class="col-12">
                    <div class="col-12">
                        <span class="titleCMS">ชื่อหน่วย</span>
                    </div>
                    <div class="col-12">
                        <InputText type="text" v-model="nameDialog" style="width: 100%"/>
                    </div>
                </div>
                <div class="col-12">
                    <div class="col-12">
                        <span class="titleCMS">โค้ดหน่วย</span>
                    </div>
                    <div class="col-12">
                        <InputText type="text" v-model="codeDialog" style="width: 100%"/>
                    </div>
                </div>
                <div class="col-12 flex flex-row-reverse mt-2">
                    <Button
                    icon="pi pi-times"
                    severity="danger"
                    @click="cancel()"
                    label="ปิด"
                    autofocus
                    class="btn-size-cancel mr-2"
                    />
                    <Button
                    icon="pi pi-check"
                    type="submit"
                    severity="success"
                    @click="updateCMSStock()"
                    label="บันทึก"
                    autofocus
                    class="btn-size-accept mr-2"
                    />
                </div>
            </div>

           <!-- Action button -->


        </Dialog>
</template>

<script>

import { FilterMatchMode } from 'primevue/api';
import axios from 'axios'
import func from "../../../helpers/func";

export default {
  data() {
    return {
        visibleCMS:false,
        visibleItem:true,
        typeDialog:null,
        idDialog:null,
        nameDialog:null,
        codeDialog:null,
        categoryDialog:null,
        remainUnitDialog:null,
        orderUnitDialog:null,
        unit:[],
        productUnit:[
            {
                name:'ของสด',
                value:'FF'
            },
            {
                name:'ผัก',
                value:'VT'
            }
        ],
        cmsUnit:[],
        filters: {
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { value: null, matchMode: FilterMatchMode.EQUALS },
        }
    };
  },
  methods: {
    formatCategory: func.formatCategory,
    formatVisibleItem: func.formatVisibleItem,
    alertMessage: func.alertMessage,
    show: func.show,
    close: func.close,
    openDialog(e,type){
        this.visibleCMS = true
        this.typeDialog = type
        if(this.typeDialog == 'edit'){
            this.idDialog = e?.id || ''
            this.nameDialog = e?.name || ''
            this.codeDialog = e?.code || ''
            this.visibleItem = e?.visible_item
        }
    },
    updateCMSStock(){
            // console.log("typeDialog "+this.typeDialog)
            // console.log("/master-products/"+this.idDialog)
            // console.log("name",this.nameDialog)
        if(this.nameDialog == null || this.nameDialog == ''){
            this.alertMessage("กรุณากรอกชื่อหน่วย ","warning");
        }else if(this.codeDialog == null || this.codeDialog == ''){
            this.alertMessage("กรุณากรอกโค้ดหน่วย ","warning");
        }else if(this.typeDialog == 'edit'){
            this.show()
            axios
              .put(`${import.meta.env.VITE_API_URL}/units/`+this.idDialog, {
                name: this.nameDialog,
                code: this.codeDialog
              })
              .then((response) => {
                this.cancel()
                this.getCMSUnit()
                this.alertMessage("บันทึกเสร็จสิ้น", "success");
              })
              .catch((error) => {
                console.error(
                  "เกิดข้อผิดพลาด:",
                  error.response?.data || error.message
                );
                this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
              });
        }else{
            this.show()
             axios
              .post(`${import.meta.env.VITE_API_URL}/units/`,{
                name: this.nameDialog,
                code: this.codeDialog
              })
              .then((response) => {
                this.cancel()
                this.getCMSUnit()
                this.alertMessage("บันทึกเสร็จสิ้น", "success");
              })
              .catch((error) => {
                console.error(
                  "เกิดข้อผิดพลาด:",
                  error.response?.data || error.message
                );
                this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
              });
        }
    },
    cancel(){
        this.visibleCMS = false
        this.idDialog = null
        this.nameDialog = null
        this.codeDialog = null
    },
    getCMSUnit(){
        this.show()
        axios.get(`${import.meta.env.VITE_API_URL}/units`)
          .then(response => {
              this.cmsUnit = response.data
              this.close()
          }) .catch(error => {
            console.log("error : ", error);
            this.alertMessage("ติดต่อผู้ที่ดูแลระบบ", "warning");
          })
      },
  },created(){
    this.getCMSUnit()
  }
}
</script>

<style scoped>

.col-12{
    padding-bottom: 0px !important;
}
.titleCMS{
    font-size: 1.15rem;
    font-weight: 500;
}

.btn-size-cancel {
  width:50% !important;
}
.btn-size-accept {
  width: 50% !important;
}

@media (min-width: 1024px) { /* lg */
    .btn-size-cancel {
    width:20% !important;
    }
    .btn-size-accept {
    width: 20% !important;
    }
}
</style>